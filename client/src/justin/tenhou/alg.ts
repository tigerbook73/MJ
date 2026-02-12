/* ukeire-general.ts
 * 只按“一般形（4面子+1雀头）”计算向听与牌效，忽略七对/国士。
 * 依赖：你的 IDTileList 顺序是每种牌连续 4 张（m1..z7 各4张），voidId = -1。
 */

import { TileCore } from "@mj/shared";
import { IDTileList } from "../common/common";

// ================= 工具：TileId <-> 种类索引 =================

/** 0..33: m1..m9(0..8), p1..p9(9..17), s1..s9(18..26), z1..z7(27..33) */
export function tileKind(id: number): number {
  if (id === TileCore.voidId) return -1;
  if (id < 0 || id >= IDTileList.length) throw new Error(`Bad TileId ${id}`);
  return id >>> 2; // == Math.floor(id/4)，因为每种牌连续 4 张
}

/** 把若干 TileId 转成 34 维计数 */
export function toCounts(ids: number[]): number[] {
  const cnt = Array(34).fill(0);
  for (const id of ids) {
    const k = tileKind(id);
    if (k >= 0) cnt[k]++;
  }
  return cnt;
}

// ================= 一般形向听（仅 4 面子 + 1 将） =================

type SuitState = { m: number; t: number; pa: 0 | 1 }; // m 面子数, t 搭子数, pa 本花色能否提供一个“将”

/**
 * 计算“仅一般形”的最小向听数（忽略七对/国士）。
 * 公式：shanten = 8 - 2M - T - P + max(0, M+T-4)
 * 其中：M 面子数, T 搭子数（顺子搭：i,i+1 / i,i+2；对子也可当搭子），P 是否已有将(0/1)
 */
export function shantenNormal(cnt34: number[]): number {
  // 三个数牌花色切片
  const mCnt = cnt34.slice(0, 9);
  const pCnt = cnt34.slice(9, 18);
  const sCnt = cnt34.slice(18, 27);
  // 字牌（honors）
  const zCnt = cnt34.slice(27, 34);

  const mOpts = suitOptions(mCnt);
  const pOpts = suitOptions(pCnt);
  const sOpts = suitOptions(sCnt);
  const honorsInfo = honorsOptions(zCnt); // {mHonors, pairsCount}

  let best = +Infinity;

  // 折叠三个花色的 (m,t,pa)；用“是否已用将”两状态做小 DP
  // 第一步：m花色
  type Node = { m: number; t: number; usedHead: 0 | 1 };
  let dp1: Node[] = [];
  for (const a of mOpts) {
    dp1.push({ m: a.m, t: a.t, usedHead: 0 });
    if (a.pa) dp1.push({ m: a.m, t: a.t, usedHead: 1 });
  }
  dp1 = dedupNodes(dp1);

  // 第二步：叠加 p 花色
  let dp2: Node[] = [];
  for (const n1 of dp1) {
    for (const a of pOpts) {
      // 不在此花色用将
      dp2.push({ m: n1.m + a.m, t: n1.t + a.t, usedHead: n1.usedHead });
      // 在此花色用将（仅当尚未用过将且本花色有 pair 可用）
      if (!n1.usedHead && a.pa) {
        dp2.push({ m: n1.m + a.m, t: n1.t + a.t, usedHead: 1 });
      }
    }
  }
  dp2 = dedupNodes(dp2);

  // 第三步：叠加 s 花色
  let dp3: Node[] = [];
  for (const n2 of dp2) {
    for (const a of sOpts) {
      dp3.push({ m: n2.m + a.m, t: n2.t + a.t, usedHead: n2.usedHead });
      if (!n2.usedHead && a.pa) {
        dp3.push({ m: n2.m + a.m, t: n2.t + a.t, usedHead: 1 });
      }
    }
  }
  dp3 = dedupNodes(dp3);

  // 最后叠加字牌的两种用法：不占将／占将（前提 pairsCount>=1 且尚未占）
  for (const n of dp3) {
    const baseM = n.m + honorsInfo.mHonors;
    // honors 不占将：所有对子都当搭子
    {
      const T = n.t + honorsInfo.pairsCount;
      const M = baseM;
      const P = n.usedHead ? 1 : 0;
      const sh = 8 - 2 * M - T - P + Math.max(0, M + T - 4);
      if (sh < best) best = sh;
    }
    // honors 占将（有对子且没用过将）：少一个搭子，多一个将
    if (!n.usedHead && honorsInfo.pairsCount >= 1) {
      const T = n.t + honorsInfo.pairsCount - 1;
      const M = baseM;
      const P = 1;
      const sh = 8 - 2 * M - T - P + Math.max(0, M + T - 4);
      if (sh < best) best = sh;
    }
  }

  return best;
}

/** 字牌部分：返回字牌面子数与“对子数量”（这些对子可以作为将或当作搭子） */
function honorsOptions(zCnt: number[]) {
  let mHonors = 0;
  let pairsCount = 0;
  for (let i = 0; i < 7; i++) {
    const c = zCnt[i] | 0;
    mHonors += Math.floor(c / 3);
    if (c % 3 === 2) pairsCount += 1;
  }
  return { mHonors, pairsCount };
}

/** 三个数牌花色：返回若干不被支配的 (m,t,pa) 组合 */
function suitOptions(c9: number[]): SuitState[] {
  // 复制+安全裁剪（最多 4）
  const a = c9.map((x) => (x > 4 ? 4 : x | 0));

  const memo = new Map<string, SuitState[]>();

  function key(arr: number[]): string {
    // 9 长度的小数组可直接 JSON，量很小
    return JSON.stringify(arr);
  }

  function pushPareto(states: SuitState[], s: SuitState) {
    // 去掉被 s 覆盖的状态（m>=, t>=, pa>=）
    for (let i = states.length - 1; i >= 0; i--) {
      const o = states[i];
      if (o.m <= s.m && o.t <= s.t && o.pa <= s.pa && (o.m < s.m || o.t < s.t || o.pa < s.pa)) {
        states.splice(i, 1);
      } else if (o.m >= s.m && o.t >= s.t && o.pa >= s.pa) {
        // s 被已有覆盖，直接返回
        return;
      }
    }
    states.push(s);
  }

  function dfs(arr: number[]): SuitState[] {
    const k = key(arr);
    const hit = memo.get(k);
    if (hit) return hit;

    // 找到第一张有牌的位置
    let i = 0;
    while (i < 9 && arr[i] === 0) i++;
    if (i >= 9) {
      const base: SuitState[] = [{ m: 0, t: 0, pa: 0 }];
      memo.set(k, base);
      return base;
    }

    const res: SuitState[] = [];

    // 选项 1：刻子 i i i
    if (arr[i] >= 3) {
      arr[i] -= 3;
      for (const s of dfs(arr)) pushPareto(res, { m: s.m + 1, t: s.t, pa: s.pa });
      arr[i] += 3;
    }

    // 选项 2：顺子 i,i+1,i+2
    if (i <= 6 && arr[i + 1] > 0 && arr[i + 2] > 0) {
      arr[i]--;
      arr[i + 1]--;
      arr[i + 2]--;
      for (const s of dfs(arr)) pushPareto(res, { m: s.m + 1, t: s.t, pa: s.pa });
      arr[i]++;
      arr[i + 1]++;
      arr[i + 2]++;
    }

    // 选项 3a：对子当“搭子”
    if (arr[i] >= 2) {
      arr[i] -= 2;
      for (const s of dfs(arr)) pushPareto(res, { m: s.m, t: s.t + 1, pa: s.pa });
      arr[i] += 2;
    }

    // 选项 3b：对子当“将资源”
    if (arr[i] >= 2) {
      arr[i] -= 2;
      for (const s of dfs(arr)) pushPareto(res, { m: s.m, t: s.t, pa: (s.pa || 1) as 0 | 1 });
      arr[i] += 2;
    }

    // 选项 4：顺子搭子（两连 i,i+1）
    if (i <= 7 && arr[i + 1] > 0) {
      arr[i]--;
      arr[i + 1]--;
      for (const s of dfs(arr)) pushPareto(res, { m: s.m, t: s.t + 1, pa: s.pa });
      arr[i]++;
      arr[i + 1]++;
    }

    // 选项 5：顺子搭子（坎张 i,i+2）
    if (i <= 6 && arr[i + 2] > 0) {
      arr[i]--;
      arr[i + 2]--;
      for (const s of dfs(arr)) pushPareto(res, { m: s.m, t: s.t + 1, pa: s.pa });
      arr[i]++;
      arr[i + 2]++;
    }

    // 选项 6：把一张当“浮牌”丢掉（用于前进）
    arr[i]--;
    for (const s of dfs(arr)) pushPareto(res, s);
    arr[i]++;

    memo.set(k, res);
    return res;
  }

  return dfs(a);
}

/** 去重/去劣化（用于跨花色合并时的中间 DP） */
function dedupNodes(nodes: { m: number; t: number; usedHead: 0 | 1 }[]) {
  // 合并相同 (m,t,usedHead)；去掉明显劣的
  const m = new Map<string, { m: number; t: number; usedHead: 0 | 1 }>();
  for (const n of nodes) {
    const key = `${n.m},${n.t},${n.usedHead}`;
    m.set(key, n);
  }
  const arr = Array.from(m.values());
  arr.sort((a, b) => a.usedHead - b.usedHead || b.m - a.m || b.t - a.t);
  // 简单保留（同 usedHead 下 m、t 越大越好）
  const kept: typeof arr = [];
  const seen = new Set<string>();
  for (const n of arr) {
    const k = `${n.usedHead}:${n.m},${n.t}`;
    if (!seen.has(k)) {
      kept.push(n);
      seen.add(k);
    }
  }
  return kept;
}

// ================= 牌效枚举：最佳打牌（并列） =================

/**
 * 在 14 张（13 手牌 + 1 摸牌）中，找出“按牌效（有效牌张数最多）最该打”的种类索引（可并列）。
 * 只按“一般形”计算，忽略七对/国士；不看役，不看红5。
 *
 * 返回：种类索引数组（0..33）。如果你要具体 TileId，见下方 pickOneIdOfKind。
 */
export function bestDiscards(tiles13: number[], drawn: number): number[] {
  const tiles14 = [...tiles13];
  if (drawn !== TileCore.voidId) tiles14.push(drawn);

  const cnt = toCounts(tiles14);
  const curr = shantenNormal(cnt);

  let best = -1;
  const resultKinds: number[] = [];

  for (let k = 0; k < 34; k++) {
    if (cnt[k] === 0) continue; // 不能打没有的牌
    cnt[k]--;

    let totalLeft = 0;
    for (let p = 0; p < 34; p++) {
      if (cnt[p] >= 4) continue; // 牌山没了
      const left = 4 - cnt[p]; // 打完后的剩余张数
      cnt[p]++;
      const s2 = shantenNormal(cnt);
      cnt[p]--;
      if (s2 === curr - 1) totalLeft += left;
    }

    if (totalLeft > 0) {
      if (totalLeft > best) {
        best = totalLeft;
        resultKinds.length = 0;
        resultKinds.push(k);
      } else if (totalLeft === best) {
        resultKinds.push(k);
      }
    }

    cnt[k]++;
  }

  return resultKinds;
}

// ================= 可选：把“种类索引”映射为具体 TileId =================

/** 常见 tie-break：若新摸就是该种类，优先打新摸，否则打手里最右一张该种类 */
export function pickOneIdOfKind(kind: number, hand: number[], drawn: number): number | null {
  if (kind === tileKind(drawn)) return drawn;
  for (let i = hand.length - 1; i >= 0; i--) {
    const id = hand[i];
    if (tileKind(id) === kind) return id;
  }
  return null;
}
