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
  const my_pos = ref(2 as number);

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

  const bottom_discard = ref([] as string[]);
  const right_discard = ref([] as string[]);
  const top_discard = ref([] as string[]);
  const left_discard = ref([] as string[]);
  const discardList = [bottom_discard, right_discard, top_discard, left_discard];

  const bottom_new = ref(emptyTile as MjTile);
  const right_new = ref(emptyTile as MjTile);
  const top_new = ref(emptyTile as MjTile);
  const left_new = ref(emptyTile as MjTile);
  const newList = [bottom_new, right_new, top_new, left_new];

  const bottom_display = ref(emptyTile as MjTile);
  const right_display = ref(emptyTile as MjTile);
  const top_display = ref(emptyTile as MjTile);
  const left_display = ref(emptyTile as MjTile);
  const displayList = [bottom_display, right_display, top_display, left_display];

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
      newList[i].value = mjGame.players[(my_pos.value + i) % 4].newtile;
    }
  }

  function playerDiscardRefresh() {
    for (let i = 0; i < 4; i++) {
      discardList[i].value = mjGame.players[(my_pos.value + i) % 4].played.map((tile) => tile.name);
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
      handList[i].value = mjGame.players[(my_pos.value + i) % 4].hand.map((tile) => tile);
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

    my_pos,
    p1,
    p2,
    p3,
    p4,

    discardList,
    bottom_discard,
    right_discard,
    top_discard,
    left_discard,

    displayList,
    bottom_display,
    right_display,
    top_display,
    left_display,

    newList,
    bottom_new,
    right_new,
    top_new,
    left_new,

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
