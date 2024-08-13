import { defineStore } from "pinia";
import { mjGame } from "src/core/mjGame";
import { MjPlayer } from "src/core/mjPlayer";
import { emptyTile, MjTile } from "src/core/mjTile";
import { ref } from "vue";

export const useMjStore = defineStore("mj", () => {
  const open = ref(false as boolean);
  const status = ref(false as boolean);
  const isWinning = ref(false as boolean);

  const players = ref([] as MjPlayer[]);
  const selectedTile = ref(emptyTile as MjTile);

  const topWall = ref([] as string[]);
  const bottomWall = ref([] as string[]);
  const rightWall = ref([] as string[]);
  const leftWall = ref([] as string[]);
  const wallList = [bottomWall, rightWall, topWall, leftWall];

  const p1 = ref([] as MjTile[]);
  const p2 = ref([] as MjTile[]);
  const p3 = ref([] as MjTile[]);
  const p4 = ref([] as MjTile[]);
  const handList = [p1, p2, p3, p4];

  const p1_discard = ref([] as string[]);
  const p2_discard = ref([] as string[]);
  const p3_discard = ref([] as string[]);
  const p4_discard = ref([] as string[]);
  const discardList = [p1_discard, p2_discard, p3_discard, p4_discard];

  const p1_new = ref(emptyTile as MjTile);
  const p2_new = ref(emptyTile as MjTile);
  const p3_new = ref(emptyTile as MjTile);
  const p4_new = ref(emptyTile as MjTile);
  const newList = [p1_new, p2_new, p3_new, p4_new];

  const p1_display = ref(emptyTile as MjTile);
  const p2_display = ref(emptyTile as MjTile);
  const p3_display = ref(emptyTile as MjTile);
  const p4_display = ref(emptyTile as MjTile);
  const displayList = [p1_display, p2_display, p3_display, p4_display];

  function refresh() {
    isWinning.value = mjGame.isWinning();
    status.value = mjGame.isStarted() && !isWinning.value;
    selectedTile.value = mjGame.selectedTile;

    wallRefresh();
    playerNewtileRefresh();
    playerDiscardRefresh();
    playerHandRefresh();
  }
  function wallRefresh() {
    for (let i = 0; i < 4; i++) {
      wallList[i].value = mjGame.walls[i].tiles.map((tile) => tile.name);
    }
  }

  function playerNewtileRefresh() {
    for (let i = 0; i < 4; i++) {
      if (mjGame.players[i].newtile !== emptyTile) {
        displayList[i].value = mjGame.players[i].newtile;
      }
    }
  }

  function playerDiscardRefresh() {
    for (let i = 0; i < 4; i++) {
      discardList[i].value = mjGame.players[i].played.map((tile) => tile.name);
    }
  }

  function clearNewtile() {
    for (let i = 0; i < 4; i++) {
      newList[i].value = emptyTile;
    }
  }

  function clearSelected() {
    selectedTile.value = emptyTile;
  }

  function playerHandRefresh() {
    for (let i = 0; i < 4; i++) {
      handList[i].value = mjGame.players[i].hand.map((tile) => tile);
    }
    for (let i = 0; i < 4; i++) {
      // if (mjGame.players[i].newtile.name !== "") {
      handList[i].value.push(emptyTile);
      handList[i].value.push(newList[i].value);
      // }
    }
  }

  function isCurrentPlayer(index: number) {
    return index === mjGame.playerIndex && status.value === true;
  }

  mjGame.init();
  mjGame.separate();
  refresh();

  return {
    // state
    open,
    topWall,
    rightWall,
    bottomWall,
    leftWall,

    p1,
    p2,
    p3,
    p4,

    p1_discard,
    p2_discard,
    p3_discard,
    p4_discard,

    p1_display,
    p2_display,
    p3_display,
    p4_display,

    p1_new,
    p2_new,
    p3_new,
    p4_new,

    players,
    status,
    selectedTile,

    // actions
    refresh,
    clearNewtile,
    clearSelected,
    isCurrentPlayer,
    isWinning,
  };
});
