# AI 编程演示：可视化发牌过程

> 演示目标：展示如何用 Claude Code 完成一个真实功能需求的完整工作流——
> 上下文建立 → Plan 模式方案设计 → 执行 → 自然语言迭代调整。

---

## 一、目标（需求）

游戏开始时，牌局初始化（`game.start()`）会把 136 张牌瞬间分配到四位玩家手中，前端直接渲染最终状态，用户看不到任何发牌过程。

**期望效果：** 游戏开始后，牌从牌墙逐张飞向各玩家手牌区，呈现出真实的"发牌"视觉效果，让玩家感受到游戏开始的仪式感。

---

## 二、现状分析（背景知识）

```
game.start()
  → game.dispatch()          ← 瞬间完成：4人各发13张
  → state = WaitingAction    ← 直接跳过 Dispatching
  → 后端广播 GAME_UPDATED（一次，含完整最终状态）
  → 前端一次性渲染所有手牌
```

代码中已预留 `GameState.Dispatching` 状态，并有注释：
```typescript
Dispatching: "dispatching",  // 发牌中，后续可以拆分成更小的状态
```

**实现方向：后端暴露分步发牌事件，前端逐张动画**

- 后端：在 `dispatch()` 过程中广播多次中间状态（`GAME_DISPATCHING` 事件），每次携带新增的一张牌
- 前端：监听 `GAME_DISPATCHING` 事件，利用现有的 **Framer Motion** 动画基础设施（`tile-flight-store` + `TileFlightOverlay`）逐张触发飞牌动画

---

## 三、Claude Code 指令步骤

> 以下为依次输入给 Claude Code 的提示语，每一步等待 Claude 完成后再进行下一步。

---

### ▌后端部分

---

**后端第 1 步：建立后端上下文**

```
请阅读以下文件，理解当前发牌流程，不要修改任何代码：
1. shared/src/core/mj.game.ts 中的 dispatch() 方法和 GameState 定义
2. shared/src/protocols/ 目录下的事件类型定义（GameEventType 等）
3. server/src/game/mj-game.gateway.ts 中处理 START_GAME 的 handler 和广播逻辑

阅读完成后，用中文描述：从客户端发送 START_GAME 指令到后端广播 GAME_UPDATED 的完整链路。
```

---

**后端第 2 步：制定后端实现方案**

```
基于你对代码的理解，我希望后端在发牌过程中逐步广播中间状态：
- 在 shared/src/protocols/ 中新增 GAME_DISPATCHING 事件类型
- 修改 dispatch() 或在 gateway 中包装，使其每发一张牌就广播一次当前状态
- 发牌顺序按真实规则：庄家优先，每轮4张×3轮，再每人1张，最后庄家多1张

要求：
1. 尽量最小化对 shared/src/core/mj.game.ts 的改动
2. 保持 GAME_UPDATED 在发牌完成后仍然广播（兼容现有逻辑）
3. 新事件只在发牌期间发出

请分析可行性，给出具体实现计划（涉及哪些文件、每个文件改什么），
不要写代码，先等我确认方案。
```

---

**后端第 3 步：实现后端**

```
方案看起来不错，请按计划实现后端部分。
注意：
- 每次修改一个文件后说明做了什么
- 如果遇到类型错误，先修复再继续
- 完成后说明如何用 WebSocket 工具或日志验证 GAME_DISPATCHING 事件确实在发出
```

---

### ▌前端部分

---

**前端第 1 步：建立前端上下文**

```
请阅读以下文件，理解前端动画基础设施，不要修改任何代码：
1. mj-next/src/lib/app-service.ts 中处理 GAME_UPDATED 和 ACTION 事件的部分
2. mj-next/src/store/tile-flight-store.ts
3. mj-next/src/components/TileFlightOverlay.tsx
4. mj-next/src/components/HandTilesBottom.tsx（或 HandTiles.tsx）中触发飞牌动画的 useLayoutEffect

阅读完成后，用中文描述：一张牌从"手牌区飞向弃牌区"的完整动画触发链路。
```

---

**前端第 2 步：制定前端实现方案**

```
基于你对代码的理解，我希望前端在收到 GAME_DISPATCHING 事件时展示发牌动画：
- 在 app-service.ts 中新增 GAME_DISPATCHING 事件的处理逻辑
- 每收到一张新牌，用现有的 tile-flight-store.startFlight() 触发从牌墙到手牌区的飞牌动画
- 使用现有的 TileFlightOverlay 渲染飞牌，无需新建 overlay 组件
- 动画期间游戏逻辑正常，动画结束后进入 WaitingAction

要求：
1. 只修改 mj-next/ 中的文件
2. 复用现有 tile-flight-store 和 TileFlightOverlay，不重复造轮子
3. 底部玩家（自己）的牌正面朝上，其他玩家牌背面

请分析可行性，给出具体实现计划（涉及哪些文件、每个文件改什么），
不要写代码，先等我确认方案。
```

---

**前端第 3 步：实现前端**

```
方案看起来不错，请按计划实现前端部分。
注意：
- 每次修改一个文件后说明做了什么
- 如果遇到类型错误，先修复再继续
- 完成后告诉我如何在本地验证效果
```

---

**前端第 4 步（可选）：调整动画参数**

```
发牌动画速度太快/太慢，请调整：
- 每张牌的间隔时间改为 80ms
- 动画持续时间改为 200ms
- 同时确保底部玩家（自己）的牌最后发，且正面朝上
```

---

> **演示要点：** 重点展示 Claude Code 如何通过读取代码建立上下文、如何在 Plan 模式下给出架构方案、以及如何通过自然语言迭代调整细节——这正是 AI 辅助编程的核心工作流。
