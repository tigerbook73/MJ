import { defineStore } from "pinia";
import { Position } from "src/common/core/mj.game";
import { TileCore } from "src/common/core/mj.tile-core";
import { mjGame } from "src/core/mjGame";
import { MjPlayer } from "src/core/mjPlayer";
import { emptyTile, IDTileList, MjTile } from "src/core/mjTile";
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

  const p1 = ref([] as TileCore[]);
  const p2 = ref([] as TileCore[]);
  const p3 = ref([] as TileCore[]);
  const p4 = ref([] as TileCore[]);
  const handList = [p1, p2, p3, p4];

  const bottom_discard = ref([] as string[]);
  const right_discard = ref([] as string[]);
  const top_discard = ref([] as string[]);
  const left_discard = ref([] as string[]);
  const discardList = [bottom_discard, right_discard, top_discard, left_discard];

  // const bottom_new = ref(emptyTile as MjTile);
  // const right_new = ref(emptyTile as MjTile);
  // const top_new = ref(emptyTile as MjTile);
  // const left_new = ref(emptyTile as MjTile);
  // const newList = [bottom_new, right_new, top_new, left_new];

  const bottom_display = ref(emptyTile as MjTile);
  const right_display = ref(emptyTile as MjTile);
  const top_display = ref(emptyTile as MjTile);
  const left_display = ref(emptyTile as MjTile);
  const displayList = [bottom_display, right_display, top_display, left_display];

  function refresh() {
    // isWinning.value = mjGame.isWinning();
    // status.value = mjGame.isStarted() && !isWinning.value;
    // selectedTile.value = mjGame.selectedTile;

    wallRefresh();
    // playerNewtileRefresh();
    playerDiscardRefresh();
    handTileRefresh();
  }
  function wallRefresh() {
    for (let i = 0; i < 4; i++) {
      wallList[i].value = mjGame.walls[i].tiles.map((tile) => IDtoName(tile));
    }
  }

  // function playerNewtileRefresh() {
  //   for (let i = 0; i < 4; i++) {
  //     if (mjGame.players[i].newtile !== emptyTile) {
  //       displayList[i].value = mjGame.players[i].newtile;
  //     }
  //     newList[i].value = mjGame.players[(my_pos.value + i) % 4].newtile;
  //   }
  // }
  function mapTile(tileID: number) {
    return TileCore.fromId(tileID);
  }
  function IDtoName(tileID: number) {
    return IDTileList[tileID];
  }

  function playerDiscardRefresh() {
    for (let i = 0; i < 4; i++) {
      discardList[i].value = mjGame.discards[i].tiles.map((tile) => IDtoName(tile));
    }
  }

  // function clearNewtile() {
  //   for (let i = 0; i < 4; i++) {
  //     newList[i].value = emptyTile;
  //   }
  // }

  function clearSelected() {
    selectedTile.value = emptyTile;
  }

  function handTileRefresh() {
    mjGame.players.forEach((player, index) => {
      if (player == null) {
        return;
      }
      handList[index].value = player.handTiles.map((tile) => mapTile(tile));
    });
  }

  function isCurrentPlayer(position: number) {
    return (position === mjGame.current?.position) === true;
  }

  // mySelected.value = ["西"];

  mjGame.init([Position.East]);
  mjGame.start();
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

    // newList,
    // bottom_new,
    // right_new,
    // top_new,
    // left_new,

    players,
    status,
    selectedTile,

    // actions
    // clearNewtile,
    clearSelected,
    isCurrentPlayer,
    isWinning,
    // es,
    // mySelected,
    // canHu,

    // actions
    refresh,
  };
});
