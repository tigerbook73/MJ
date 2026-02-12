<template>
  <div
    :class="[
      'row flex-center justify-around area-player',
      userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Bottom) ? 'bg-blue' : 'bg-red',
    ]"
  >
    <!-- <div class="row flex-center q-gutter-xs" Justify-content="flex-start"> -->

    <!-- </div> -->
    <div class="row items-center justify-start">
      <div v-for="(group, gIdx) in meldGroups" :key="gIdx" class="row q-mr-lg">
        <comp-tile v-for="(tile, index) in group" :key="index" :type="tile" size="small" />
      </div>
    </div>
    <div class="row items-start justify-center q-gutter-xs no-wrap">
      <div class="row flex-center">
        <comp-tile
          v-for="(tile, index) in userMj.pBottomCards"
          :key="index"
          :type="tile"
          size="large"
          :selected="selectedTiles.includes(tile.id)"
          @click="onClick(tile)"
          @dblclick="dropTile(tile.id)"
        ></comp-tile>
        <q-btn v-if="canPass.show" flat @click="passTurn()" :disable="canPass.disabled">Pass</q-btn>
        <q-btn v-if="canChi.show" flat @click="handleChi()" :disable="canChi.disabled">Chi</q-btn>
        <q-btn v-if="canPeng.show" flat @click="handlePeng()" :disable="canPeng.disabled">Peng</q-btn>
        <q-btn v-if="canGang.show" flat @click="handleGang()" :disable="canGang.disabled">Gang</q-btn>
        <q-btn v-if="canHu.show" flat @click="Hu()" :disable="canHu.disabled">Hu</q-btn>
        <q-btn v-if="canZimo.show" flat @click="Zimo()" :disable="canZimo.disabled">Zi Mo</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PlayerAreaBottom" });

import CompTile from "src/simon/components/CompTile.vue";

import type { HandCard } from "src/simon/stores/mj-store";
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
import { ActionType, TileCore, type TileId, GameState } from "@mj/shared";
// import { TileCore } from "@mj/shared/core/mj.tile-core";
import { roomStore } from "../stores/room-store";
import { computed, ref } from "vue";
const room = roomStore();
const userMj = useMjStore();
let lastClickTime = 0;
// 当前是哪位玩家在出牌
const currentPosition = computed(() => userMj.current?.position);
// 我自己的位置
const myPosition = computed(() => room.currentPosition);
// 左边玩家的位置
const leftPosition = computed(() => mapPosition(myPosition.value!, Direction.Left));
// 获取上家打出的牌
// const latestTile = userMj.latestTile;
const latestTile = computed(() => userMj.latestTile);
const state = computed(() => {
  const game = userMj.currentGame; // 假设 `currentGame` 是全局状态
  if (!game || !game.current) {
    return GameState.Init; // 如果游戏或当前玩家不存在，返回初始状态
  }

  if (game.state === GameState.WaitingAction && game.current.position === room.currentPosition) {
    return GameState.WaitingAction; // 当前是我的回合
  } else if (game.state === GameState.WaitingPass && game.current.position !== room.currentPosition) {
    return GameState.WaitingPass; // 当前不是我的回合，但需要等待我操作
  } else {
    return GameState.Init; // 默认返回初始状态
  }
});

const cleanHandIds = computed(() =>
  userMj.pBottomCards.map((c) => c.id).filter((id) => id !== TileCore.voidId && id !== -1),
);
const canPass = computed(() => {
  // 当前游戏状态
  const gameState = state.value;
  console.log("gameState", gameState);

  // 只有在 WaitingPass 状态下才允许过
  if (gameState !== GameState.WaitingPass) {
    return { show: false, disabled: false };
  }
  // 当前出牌者不是bottom的时候可以过
  const isNotFromBottom = currentPosition.value !== myPosition.value;
  if (!isNotFromBottom) {
    return { show: false, disabled: false };
  }

  const hasAnyAction = canChi.value.show || canPeng.value.show || canGang.value.show || canHu.value.show;

  return { show: hasAnyAction, disabled: false };
});

const canChi = computed(() => {
  // 当前游戏状态
  const gameState = state.value;
  console.log("gameState", gameState);

  // 只有在 WaitingPass 状态下才允许吃
  if (gameState !== GameState.WaitingPass) {
    return { show: false, disabled: false };
  }
  // 当前出牌者是上家，且自己是Bottom
  console.log("userMj.latestTile", userMj.latestTile);
  const isFromLeft = currentPosition.value === leftPosition.value;
  // const isBottom = myPosition.value === mapPosition(currentPosition.value! - 1, Direction.Bottom);

  if (!isFromLeft) {
    return { show: false, disabled: false };
  }

  const chi = TileCore.canChi(cleanHandIds.value, latestTile.value!);

  return {
    show: chi,
    disabled:
      selectedTiles.value.length !== 2 ||
      !TileCore.isConsecutive(selectedTiles.value[0], selectedTiles.value[1], latestTile.value!),
  };
});

const canPeng = computed(() => {
  // 当前游戏状态
  const gameState = state.value;
  console.log("gameState", gameState);

  // 只有在 WaitingPass 状态下才允许碰
  if (gameState !== GameState.WaitingPass) {
    return { show: false, disabled: false };
  }
  // 当前出牌者不是bottom的时候可以碰
  const isNotFromBottom = currentPosition.value !== myPosition.value;
  if (!isNotFromBottom) {
    return { show: false, disabled: false };
  }

  const peng = TileCore.canPeng(cleanHandIds.value, latestTile.value!);

  return {
    show: peng,
    disabled:
      selectedTiles.value.length !== 2 ||
      !TileCore.isSame(selectedTiles.value[0], selectedTiles.value[1], latestTile.value!),
  };
});

const canGang = computed(() => {
  // 当前游戏状态
  const gameState = state.value;
  console.log("gameState", gameState);

  // 只有在 WaitingPass 状态下才允许杠
  if (gameState !== GameState.WaitingPass) {
    return { show: false, disabled: false };
  }
  // 当前出牌者不是bottom的时候可以杠
  const isNotFromBottom = currentPosition.value !== myPosition.value;
  if (!isNotFromBottom) {
    return { show: false, disabled: false };
  }

  const gang = TileCore.canGang(cleanHandIds.value, latestTile.value!);

  return {
    show: gang,
    disabled:
      selectedTiles.value.length !== 3 ||
      !TileCore.isSame(selectedTiles.value[0], selectedTiles.value[1], selectedTiles.value[2], latestTile.value!),
  };
});

const canHu = computed(() => {
  // 当前游戏状态
  const gameState = state.value;
  console.log("gameState", gameState);

  // 只有在 WaitingPass 状态下才允许胡
  if (gameState !== GameState.WaitingPass) {
    return { show: false, disabled: false };
  }
  // 当前出牌者不是bottom的时候可以胡
  const isNotFromBottom = currentPosition.value !== myPosition.value;
  if (!isNotFromBottom) {
    return { show: false, disabled: false };
  }
  const hu = TileCore.canHu(cleanHandIds.value, latestTile.value!);

  return {
    show: hu,
    disabled: false,
  };
});

const canZimo = computed(() => {
  // 当前游戏状态
  const gameState = state.value;
  console.log("gameState", gameState);

  // 只有在 WaitingAction 状态下才允许自摸
  if (gameState !== GameState.WaitingAction) {
    return { show: false, disabled: false };
  }
  // 当前出牌者是bottom的时候可以自摸
  const isFromBottom = currentPosition.value === myPosition.value;
  if (!isFromBottom) {
    return { show: false, disabled: false };
  }
  const zimo = TileCore.canHu(cleanHandIds.value);
  return {
    show: zimo,
    disabled: false,
  };
});

const maxSelectable = computed(() => {
  if (state.value !== GameState.WaitingPass) return 2;
  // 明确判断一次，避免依赖 canGang 的计算
  const canGangNow =
    currentPosition.value !== myPosition.value &&
    !!latestTile.value &&
    TileCore.canGang(cleanHandIds.value, latestTile.value);
  return canGangNow ? 3 : 2;
});
function onClick(tile: (typeof userMj.pBottomCards)[0]) {
  const now = Date.now();
  if (now - lastClickTime < 500) {
    dropTile(); // 双击清选（模板里还有 @dblclick 会真正丢牌）
    lastClickTime = 0;
    return;
  }
  lastClickTime = now;

  const idx = selectedTiles.value.indexOf(tile.id);
  if (idx !== -1) {
    selectedTiles.value.splice(idx, 1);
  } else {
    if (selectedTiles.value.length < maxSelectable.value) {
      selectedTiles.value.push(tile.id);
    } else {
      selectedTiles.value.shift();
      selectedTiles.value.push(tile.id);
    }
  }
}

const emits = defineEmits<{
  (e: "drop-tile", payload: TileId): void;
  (e: "pass-turn"): void;
  (e: "handle-chi", payload: [tile1: TileId, tile2: TileId]): void;
  (e: "handle-peng", payload: [tile1: TileId, tile2: TileId]): void;
  (e: "handle-gang", payload: [tile1: TileId, tile2: TileId, tile3: TileId]): void;
  (e: "hu"): void;
  (e: "zi-mo"): void;
}>();

function dropTile(tileId?: TileId) {
  if (tileId) {
    emits("drop-tile", tileId);
  }
  selectedTiles.value = [];
}

function passTurn() {
  emits("pass-turn");
}

const selectedTiles = ref<TileId[]>([]);
const player = computed(() => {
  return myPosition.value ? userMj.currentGame?.players.find((p) => p?.position === myPosition.value) : undefined;
});

const meldGroups = computed(() => {
  if (!player.value) return [];
  return player.value.openedSets
    .filter(
      (s) =>
        s.actionType === ActionType.Chi ||
        s.actionType === ActionType.Peng ||
        s.actionType === ActionType.Gang ||
        s.actionType === ActionType.Hu,
    )
    .map((s) =>
      s.tiles.map((tileId) => {
        const t = TileCore.fromId(tileId);
        return {
          name: t.name,
          id: t.id,
          options: { selected: selectedTiles.value.includes(tileId) },
        } as HandCard;
      }),
    );
});

// const eatTiles = computed(() => {
//   if (!player.value) return [];
//   return player.value.openedSets
//     .filter((set) => set.actionType === ActionType.Chi)
//     .map((set): HandCard[] =>
//       set.tiles.map((tileId) => {
//         const tile = TileCore.fromId(tileId);
//         return {
//           name: tile.name,
//           id: tile.id,
//           options: { selected: selectedTiles.value.includes(tileId) },
//         };
//       }),
//     );
// });
// const pengTiles = computed(() => {
//   if (!player.value) return [];
//   return player.value.openedSets
//     .filter((set) => set.actionType === ActionType.Peng)
//     .map((set): HandCard[] =>
//       set.tiles.map((tileId) => {
//         const tile = TileCore.fromId(tileId);
//         return {
//           name: tile.name,
//           id: tile.id,
//           options: { selected: selectedTiles.value.includes(tileId) },
//         };
//       }),
//     );
// });

function handleChi() {
  const tile1 = selectedTiles.value[0];
  const tile2 = selectedTiles.value[1];
  emits("handle-chi", [tile1, tile2]);
  selectedTiles.value = [];
}

function handlePeng() {
  const tile1 = selectedTiles.value[0];
  const tile2 = selectedTiles.value[1];
  emits("handle-peng", [tile1, tile2]);
  selectedTiles.value = [];
}

function handleGang() {
  const tile1 = selectedTiles.value[0];
  const tile2 = selectedTiles.value[1];
  const tile3 = selectedTiles.value[2];
  emits("handle-gang", [tile1, tile2, tile3]);
  selectedTiles.value = [];
}

function Hu() {
  emits("hu");
}

function Zimo() {
  emits("zi-mo");
}
</script>

<style></style>
