# MJ 项目架构讲解大纲

> 目标受众：有一定 TypeScript/Node.js 基础的学生
> 项目范围：`mj`（server + shared）、`mj-next`（前端）、`mj-deploy`（部署）

---

## 目录

- [一、项目全景](#一项目全景)
  - [1.1 仓库结构](#11-仓库结构)
  - [1.2 mj 仓库：Yarn Workspaces Monorepo](#12-mj-仓库yarn-workspaces-monorepo)
  - [1.3 技术栈一览](#13-技术栈一览)
- [二、shared — 游戏核心](#二shared--游戏核心)
  - [2.1 目录结构](#21-目录结构)
  - [2.2 牌系统](#22-牌系统-mjtile-corets)
  - [2.3 游戏状态机](#23-游戏状态机-mjgamets)
  - [2.4 协议定义](#24-协议定义-apismodelsts)
- [三、server — 后端](#三server--后端)
  - [3.1 NestJS 模块划分](#31-nestjs-模块划分)
  - [3.2 认证体系](#32-认证体系)
  - [3.3 WebSocket 网关（Handler Map 模式）](#33-websocket-网关handler-map-模式)
  - [3.4 房间与断线重连](#34-房间与断线重连)
  - [3.5 数据库](#35-数据库)
- [四、mj-next — 前端](#四mj-next--前端)
  - [4.1 整体架构](#41-整体架构)
  - [4.2 启动流程（关键）](#42-启动流程关键)
  - [4.3 双层路由守卫](#43-双层路由守卫)
  - [4.4 状态管理（Zustand）](#44-状态管理zustand)
  - [4.5 WebSocket 数据流](#45-websocket-数据流)
  - [4.6 API 调用方式](#46-api-调用方式)
  - [4.7 共享代码策略](#47-共享代码策略)
  - [4.8 Storybook — 组件独立开发](#48-storybook--组件独立开发)
  - [4.9 游戏棋盘自适应缩放](#49-游戏棋盘自适应缩放)
- [五、mj-deploy — 部署](#五mj-deploy--部署)
  - [5.1 仓库结构](#51-仓库结构)
  - [5.2 部署架构（单进程同构服务）](#52-部署架构单进程同构服务)
  - [5.3 GitHub Actions — 自动触发部署](#53-github-actions--自动触发部署)
  - [5.4 环境变量](#54-环境变量)
- [六、关键设计模式总结](#六关键设计模式总结)
- [七、推荐讲解顺序](#七推荐讲解顺序)

---

## 一、项目全景

### 1.1 仓库结构

```
mj-deploy/                  ← 部署聚合仓库（含两个 git submodule）
  ├── mj/                   ← submodule：后端 + 共享逻辑
  │   ├── server/           ← NestJS 后端
  │   └── shared/           ← 游戏核心逻辑、协议定义（前后端共用）
  └── mj-next/              ← submodule：Next.js 前端
      └── src/common/       ← shared 的拷贝（构建时同步）
```

### 1.2 mj 仓库：Yarn Workspaces Monorepo

`mj` 本身是一个 **Yarn Workspaces Monorepo**，包含三个 package：

```
mj/                         ← 根 package（private，不发布）
  ├── package.json          ← workspaces: ["server", "client", "shared"]
  ├── server/               ← @mj/server（NestJS 后端）
  ├── client/               ← @mj/client（Quasar/Vue 3，本次不讲）
  └── shared/               ← @mj/shared（游戏核心，前后端共用）
```

**Workspaces 的作用：**
- 三个 package 共享同一个 `node_modules`（提升，避免重复安装）
- `@mj/server` 和 `@mj/client` 可以直接 `import "@mj/shared"` 而无需发布到 npm
- 根目录的 `package.json` 统一管理所有脚本（`yarn dev-server`、`yarn test` 等）

**TypeScript 路径别名（server/tsconfig.json）：**
```json
{
  "paths": {
    "@mj/shared": ["../shared/src/index"]
  }
}
```
编译时 `@mj/shared` 直接指向源码，无需先构建 shared 包。

**client/ 说明（不在讲解范围内）：**
- 这是最初的 Quasar/Vue 3 客户端，包含三套 UI 实现（`example/`、`justin/`、`simon/`）
- 已被 `mj-next`（Next.js/React）替代为主力前端
- 同样通过 Yarn Workspace 引用 `@mj/shared`，通信机制与 `mj-next` 完全相同

### 1.3 技术栈一览

| 层次 | 技术 |
|------|------|
| 后端框架 | NestJS (Express + Socket.IO) |
| 数据库 | SQLite + Prisma ORM |
| 认证 | JWT + argon2 + httpOnly Cookie |
| 实时通信 | Socket.IO (WebSocket) |
| 前端框架 | Next.js 15 (App Router) + React 19 |
| 前端状态 | Zustand |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 共享逻辑 | 纯 TypeScript（无运行时依赖） |
| 部署平台 | Render.com |

---

## 二、shared — 游戏核心

> 重点：这是前后端共用的代码，也是整个项目的"心脏"。

### 2.1 目录结构

```
shared/src/
  ├── core/
  │   ├── mj.tile-core.ts   ← 牌的定义与操作
  │   └── mj.game.ts        ← 游戏状态机（核心）
  ├── models/               ← 数据模型（User/Room/Player/Client）
  ├── protocols/
  │   ├── game-socket.ts    ← Socket.IO 封装
  │   └── apis.models.ts    ← 请求/响应/事件类型 + SocketClient
  └── api/
      └── apis.ts           ← 自动生成的 OpenAPI 类型
```

### 2.2 牌系统 (`mj.tile-core.ts`)

- 136 张牌（万/筒/条各 36 张，字牌 28 张），每张有唯一 `TileId`
- 特殊 ID：`voidId = -1`（空位），`unknownId = 999`（对方未知牌）
- 核心判断函数：`canHu()`、`canChi()`、`canPeng()`、`canGang()`
- AI 决策：`decideDiscard()`、`decideAction()`

### 2.3 游戏状态机 (`mj.game.ts`)

**状态枚举（Const Object 替代 enum）：**
```typescript
export const GameState = {
  Init: "init",
  Dispatching: "dispatching",
  WaitingAction: "waiting_action",   // 当前玩家出牌
  WaitingPass: "waiting-pass",       // 等待其他玩家响应
  End: "end",
} as const;
```

**状态流转：**
```
Init → Dispatching → WaitingAction
                          ↓ drop()
                     WaitingPass
                     [优先队列: Hu > 碰/杠 > 吃]
                          ↓ 全部 pass
                     下一玩家摸牌 → WaitingAction
                          ↓ Hu/自摸
                        End
```

**动作优先队列机制（重点）：**
1. 有人打牌后，系统为所有玩家准备动作队列
2. 优先级：胡 > 碰/杠 > 吃
3. 等待每位玩家决策（接受/跳过）
4. 全部跳过 → 轮到下一玩家

**关键设计模式：不可变历史记录**
```typescript
game.history: GameHistoryRecord[]  // 完整动作日志，用于回放/审计
```

### 2.4 协议定义 (`apis.models.ts`)

```typescript
// 单一事件通道：所有消息都走 "mj:game"
GameRequest  { type: GameRequestType; data?: unknown }
GameResponse { type: GameRequestType; status: "success"|"error"; data?: unknown }

// 服务器推送事件
GameEvent:
  - GAME_UPDATED  ← 状态变化后广播完整游戏状态
  - ACTION        ← 单个动作事件
```

**SocketClient（前端高层封装）：**
- 封装所有游戏操作：`actionDrop()`、`actionChi()`、`startGame()` 等
- 辅助方法：`findMyRoom()`、`findMyPlayer()` 等——从事件中定位自身数据

---

## 三、server — 后端

### 3.1 NestJS 模块划分

```
server/src/
  ├── auth/           ← JWT 认证（REST）
  ├── user/           ← 用户 CRUD
  ├── game/           ← WebSocket 游戏引擎（核心模块）
  │   ├── mj-game.gateway.ts   ← WebSocket 网关
  │   ├── game.service.ts      ← 游戏动作执行
  │   ├── room.service.ts      ← 房间生命周期
  │   ├── client.service.ts    ← 连接追踪
  │   └── user.service.ts      ← 内存用户状态
  ├── prisma/         ← 数据库服务单例
  └── libs/guards/    ← JWT Guard（HTTP + WebSocket）
```

### 3.2 认证体系

**两套 JWT，职责分离：**

```
HTTP 登录 → 生成 7天 JWT → 存入 httpOnly Cookie (auth_token)
                ↓
GET /auth/ws-token → 生成 10分钟 WebSocket JWT (type: "ws")
                ↓
WebSocket 连接 → socket.handshake.auth.token → WsJwtGuard 验证
```

**为什么要两套 Token？**
- HTTP Cookie 不能直接传给 WebSocket
- WebSocket Token 短期有效，降低安全风险
- `type: "ws"` 字段防止 HTTP Token 冒用 WebSocket

**密码安全：** argon2（抗 GPU 暴力破解）

### 3.3 WebSocket 网关（Handler Map 模式）

```typescript
// 核心：单一事件通道 + 路由表
@SubscribeMessage("mj:game")
handleMessage(client: Socket, request: GameRequest) {
  const { handler, update } = this.messageHandlers.get(request.type);
  const response = handler(request, client);
  if (update) {
    // 广播完整状态给所有客户端
    this.server.emit("mj:game", GameEventType.GAME_UPDATED, allState);
  }
  return response;
}
```

**Handler Map 注册（17 个处理器）：**
```typescript
private messageHandlers = new Map([
  [GameRequestType.CREATE_ROOM, { update: true,  handler: this.handleCreateRoom }],
  [GameRequestType.ACTION_DROP, { update: true,  handler: this.handleDrop }],
  [GameRequestType.LIST_ROOM,   { update: false, handler: this.handleListRoom }],
  // ...
]);
```

**设计优势：**
- 扩展新动作只需添加一行
- `update` 标志控制是否广播，逻辑集中
- Handler 是纯函数，易于测试

### 3.4 房间与断线重连

**断线保护（Drop List 机制）：**
```
玩家断线 → 加入 dropList（30秒有效期）
30秒内重连 → 自动回到原房间
30秒后 → Bot 替换该位置
```

**自动托管（1.5秒 interval）：**
```typescript
@Interval(1500)
autoPlay() {
  // Bot 玩家自动决策：摸牌后选择打哪张
  // 超时玩家自动 pass
}
```

### 3.5 数据库

```prisma
// 极简 Schema：游戏状态保存在内存，只持久化用户
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String   // argon2 hash
  createdAt DateTime @default(now())
}
```

**设计取舍：** 游戏状态存内存（重启丢失），简化了实现但不支持服务器重启恢复。

---

## 四、mj-next — 前端

### 4.1 整体架构

```
Next.js App Router
  ├── Middleware (Edge)      ← 服务端路由守卫（Cookie 检查）
  ├── AppInitializer         ← 启动时初始化（认证 + WebSocket）
  ├── AppGuard               ← 客户端路由守卫（状态驱动跳转）
  ├── Zustand Stores         ← 全局状态
  └── Pages
      ├── /         (登录)
      ├── /signup   (注册)
      ├── /lobby    (大厅，受保护)
      └── /game     (游戏，受保护)
```

### 4.2 启动流程（关键）

```
页面加载
  → AppInitializer.useEffect()
  → appService.initialize()
      ├── 创建 SocketClient 单例
      ├── 绑定所有事件监听
      └── authService.initialize()
            ├── GET /api/auth/me  （恢复 Cookie 会话）
            ├── emit "user:signed-in"
            ├── GET /api/auth/ws-token
            └── socketClient.connect(token)  → WebSocket 建立
```

**事件总线（mitt）解耦：**
```
authService → eventBus.emit("user:signed-in")
appService  ← eventBus.on("user:signed-in") → 更新 Zustand stores
stores      ← 变化 → React 组件重渲染
```

### 4.3 双层路由守卫

| 层次 | 位置 | 机制 |
|------|------|------|
| 服务端 | `middleware.ts` (Edge) | 检查 `auth_token` Cookie，无则重定向 |
| 客户端 | `AppGuard.tsx` | 读取 Zustand 状态，app 就绪后精确跳转 |

**为什么需要两层？**
- Middleware 快速拦截未认证请求，SEO 友好
- AppGuard 处理"已登录但在游戏中"等复杂状态

### 4.4 状态管理（Zustand）

```typescript
user-store    // 登录状态、用户信息
room-store    // 房间列表、我的房间、座位
game-store    // 当前游戏完整状态
action-store  // 最近动作（1秒后自动清除）
app-status-store  // 初始化完成标志
ui-store      // 牌的大小、显示模式
```

### 4.5 WebSocket 数据流

```
后端广播 "mj:game" 事件
  → GameSocket.onReceive()
  → SocketClient.parseEvent()     ← 反序列化为模型对象
  → eventBus.emit("socket:data")
  → AppService 监听
      ├── 更新 room-store
      ├── 更新 game-store
      └── 更新 action-store
  → 组件订阅 store → 重渲染
```

### 4.6 API 调用方式

**REST（openapi-fetch）：**
```typescript
// 类型自动从后端 OpenAPI Spec 生成
const { data } = await client.GET("/api/auth/me");
// data 类型完全推断，编译期保证安全
```

**WebSocket（SocketClient）：**
```typescript
await socketClient.actionDrop(tileId);
// 内部：emitWithAck("mj:game", request) 带 2秒超时
```

### 4.7 共享代码策略

```
shared/ 源码
  → 构建时拷贝到 mj-next/src/common/
  → 前后端使用完全相同的游戏逻辑、模型、协议
```

**好处：**
- 一份游戏逻辑代码
- 类型定义完全共享，前后端协议不会不同步
- 可对 `common/` 单独运行测试

### 4.8 Storybook — 组件独立开发

**文件：** `mj-next/src/stories/`

Storybook 允许在无需后端、无需登录的情况下单独渲染和调试 UI 组件。

**已有 Stories：**
```
Tile.stories.tsx           ← 单张麻将牌渲染
HandTilesBottom.stories.tsx ← 底部玩家手牌
ActionPanel.stories.tsx    ← 玩家动作按钮面板
Room.stories.tsx           ← 房间卡片
PlayerActionDisplay.stories.tsx ← 动作提示横幅
GamePage.stories.tsx       ← 完整游戏页面
FloatingButton / SpeedDial ← 浮动按钮
```

**核心机制：Store Decorator**

由于组件依赖 Zustand store，Storybook 通过 Decorator 在渲染前注入假数据：

```typescript
// game-store.decorator.tsx
export const GameStoreDecorator = (Story: any) => {
  const setGame = useGameStore((state) => state.setGame);
  const game = Game.fromJSON(getFakeEvent().data.rooms[0].game);
  setGame(game);          // 用测试假数据初始化 store
  return <Story />;       // 再渲染组件
};

// 使用方式（GamePage.stories.tsx）
decorators: [GameStoreDecorator, UIStoreDecorator],
```

**价值：**
- 组件开发与后端完全解耦
- 可快速验证各种游戏状态下的 UI 表现
- 作为组件的活文档

### 4.9 游戏棋盘自适应缩放

**文件：** `mj-next/src/app/game/page.tsx`

游戏棋盘需要在不同屏幕尺寸上保持合适比例，采用 **ResizeObserver** 实现响应式缩放：

**布局结构：**
```
外层容器 w-[98vmin]  ← 取视口宽/高中较小值的 98%，始终适配屏幕
  └── 嵌套 3 层 3×3 CSS Grid（外→中→内）
        outerEdge：玩家手牌区
        middleEdge：牌墙区
        innerEdge：弃牌区
```

**自适应逻辑：**
```typescript
// 监听底部玩家区容器的宽度变化
const observer = new ResizeObserver(() => {
  const width = containerRef.current.clientWidth / 20;
  setTileSize(width);  // 写入 ui-store
});
observer.observe(containerRef.current);
```

**数据流：**
```
容器宽度变化
  → ResizeObserver 回调
  → tileSize = containerWidth / 20
  → ui-store.setTileSize()
  → 所有 Tile 组件订阅 ui-store → 同步缩放
```

**效果：** 无论窗口大小如何变化，牌的尺寸始终与棋盘等比例缩放，无需手动设置断点。

---

## 五、mj-deploy — 部署

### 5.1 仓库结构

```
mj-deploy/
  ├── mj/       ← git submodule (后端 + shared)
  ├── mj-next/  ← git submodule (前端)
  └── package.json
```

```json
{
  "scripts": {
    "build": "yarn build:mj-next && yarn build:mj-server",
    "build:mj-next":   "cd mj-next && yarn install && yarn build",
    "build:mj-server": "cd mj/server && yarn install && yarn build",
    "start": "cd mj/server && yarn start:render"
  }
}
```

### 5.2 部署架构（单进程同构服务）

```
Render.com  →  node dist/server/src/main.render.js
                        ↓
              Express 服务器（共享实例）
              ┌────────────────────────────────┐
              │  /api/*       → NestJS 处理    │
              │  /socket.io/* → NestJS 处理    │
              │  其他路径     → Next.js SSR    │
              └────────────────────────────────┘
```

**关键设计（`main.render.ts`）：**
1. 先初始化 Next.js（standalone 模式，无需 `next start`）
2. 创建共享 Express 实例，Next.js 中间件优先
3. NestJS 复用同一 Express 实例（`ExpressAdapter`）
4. 一个进程、一个端口服务前后端

**优势：**
- 无跨域问题（同源）
- 无需 Nginx 反向代理
- 部署简单，适合 Render 免费 tier

### 5.3 GitHub Actions — 自动触发部署

**文件：** `mj/.github/workflows/deploy.yml`、`mj-next/.github/workflows/deploy.yml`

两个仓库的 workflow 内容完全相同：

```yaml
name: Trigger Render Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Render Web Service
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_URL }}
```

**完整部署链路：**
```
开发者 push → mj (或 mj-next)
  → GitHub Actions 触发
  → POST Render Deploy Hook（URL 存于 GitHub Secrets）
  → Render 拉取 mj-deploy（含最新 submodule）
  → yarn build（先 mj-next，再 mj server）
  → yarn start（node main.render.js）
```

**设计要点：**
- Render Deploy Hook 是一个一次性 POST URL，无需 Render API Key
- `RENDER_DEPLOY_URL` 存入 GitHub Secrets，不暴露在代码中
- `mj-deploy` 作为聚合仓库，Render 只需配置一个服务
- 两个子仓库任意一个更新都会自动触发重新部署

### 5.4 环境变量

```bash
PORT=3000          # Render 自动注入
RENDER=true        # 触发生产模式入口
CORS_ORIGIN=*      # 或指定域名
DATABASE_URL=...   # SQLite 文件路径
JWT_SECRET=...     # JWT 签名密钥
```

---

## 六、关键设计模式总结

| 模式 | 应用场景 | 关键文件 |
|------|---------|---------|
| **Handler Map** | WebSocket 消息路由 | `server/src/game/mj-game.gateway.ts` |
| **State Machine** | 游戏状态管理 | `shared/src/core/mj.game.ts` |
| **Const as Enum** | 类型安全的常量 | `shared/src/core/mj.game.ts`、`apis.models.ts` 等全局 |
| **Request/Response Envelope** | 单通道消息协议 | `shared/src/protocols/apis.models.ts` |
| **Event Bus** | 服务间解耦 | `mj-next/src/lib/event-bus.ts` |
| **Drop List** | 断线重连容错 | `server/src/game/room.service.ts` |
| **Dual Guard** | 路由保护 | `mj-next/src/middleware.ts` + `src/components/providers/AppGuard.tsx` |
| **Shared Library** | 代码复用（拷贝策略） | `shared/` → `mj-next/src/common/` |
| **同构服务** | 单进程部署 | `server/src/main.render.ts` |
| **ResizeObserver 自适应** | 游戏棋盘响应式缩放 | `mj-next/src/app/game/page.tsx` |
| **Store Decorator** | 组件独立开发/调试 | `mj-next/src/stories/*.decorator.tsx` |

---

## 七、推荐讲解顺序

1. **shared/core** — 从游戏规则开始，最直观
2. **shared/protocols** — 理解通信协议设计
3. **server/auth** — JWT 双 Token 机制
4. **server/game gateway** — Handler Map 模式
5. **server/room.service** — 断线重连、Bot 替换
6. **mj-next 启动流程** — 事件总线 + 状态管理
7. **mj-next 路由守卫** — 双层保护设计
8. **mj-deploy** — 同构部署方案
9. **AI 编程演示** — 参见 [AI-Coding-Workflow.md](./AI-Coding-Workflow.md)
