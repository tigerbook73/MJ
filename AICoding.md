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

**实现方向：纯前端动画**（不修改后端和 shared）
- 前端检测游戏状态从 `Init` → `WaitingAction` 的变化
- 在动画期间逐步"揭示"手牌，模拟发牌节奏
- 使用项目已有的 **Framer Motion** 库驱动动画

---

## 三、Claude Code 指令步骤

> 以下为依次输入给 Claude Code 的提示语，每一步等待 Claude 完成后再进行下一步。

---

**第 1 步：建立上下文**

```
请阅读以下文件，理解当前发牌流程，不要修改任何代码：
1. shared/src/core/mj.game.ts 中的 dispatch() 方法和 GameState 定义
2. mj-next/src/store/game-store.ts
3. mj-next/src/lib/app-service.ts 中处理 GAME_UPDATED 事件的部分
4. mj-next/src/components/HandTilesBottom.tsx（或 PlayerTilesBottom）
5. mj-next/src/store/ui-store.ts

阅读完成后，用中文描述：游戏开始后数据从后端到前端渲染的完整链路。
```

---

**第 2 步：制定实现方案**

```
基于你对代码的理解，我希望在游戏开始时展示发牌动画：
- 游戏状态从 Init 变为 WaitingAction 时触发
- 四位玩家的手牌（每人13张）按照真实发牌顺序（庄家优先，每轮4张×3轮+1张）逐张出现
- 使用 Framer Motion 实现每张牌的飞入动画
- 动画期间不影响游戏逻辑，动画结束后正常进入游戏

要求：
1. 不修改 shared/ 和 server/ 的任何代码
2. 尽量只在 mj-next/ 中修改
3. 动画状态用 React state 管理，不污染 Zustand game-store

请分析可行性，给出具体实现计划（涉及哪些文件、每个文件改什么），
不要写代码，先等我确认方案。
```

---

**第 3 步：确认方案后执行**

```
方案看起来不错，请按计划实现。
注意：
- 每次修改一个文件后说明做了什么
- 如果遇到类型错误，先修复再继续
- 完成后告诉我如何在本地验证效果
```

---

**第 4 步（可选）：调整动画参数**

```
发牌动画速度太快/太慢，请调整：
- 每张牌的间隔时间改为 80ms
- 动画持续时间改为 200ms
- 同时确保底部玩家（自己）的牌最后发，且正面朝上
```

---

> **演示要点：** 重点展示 Claude Code 如何通过读取代码建立上下文、如何在 Plan 模式下给出架构方案、以及如何通过自然语言迭代调整细节——这正是 AI 辅助编程的核心工作流。
