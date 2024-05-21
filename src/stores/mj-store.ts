import { defineStore } from "pinia";
import { mjGame } from "src/core/mjGame";
import { MjPlayer } from "src/core/mjPlayer";
import { ref } from "vue";

export const useMjStore = defineStore("mj", () => {
  const open = ref(false);
  const status = ref(String);

  const topWall = ref([] as string[]);
  const bottomWall = ref([] as string[]);
  const rightWall = ref([] as string[]);
  const leftWall = ref([] as string[]);

  const myTiles = ref([] as string[]);
  const players = ref([] as MjPlayer[]);

  const p1 = ref([] as string[]);
  const p2 = ref([] as string[]);
  const p3 = ref([] as string[]);
  const p4 = ref([] as string[]);
  const plist = [p1, p2, p3, p4];

  function refresh() {
    topWall.value = mjGame.walls[2].tiles.map((tile) => tile.type.name);
    rightWall.value = mjGame.walls[1].tiles.map((tile) => tile.type.name);
    bottomWall.value = mjGame.walls[0].tiles.map((tile) => tile.type.name);
    leftWall.value = mjGame.walls[3].tiles.map((tile) => tile.type.name);
    playerRefresh();
  }

  function playerRefresh() {
    for (let i = 0; i < 4; i++) {
      const tempList = mjGame.players[i].display;
      plist[i].value = tempList.map((tile) => tile.type.name);
    }
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

    myTiles,
    p1,
    p2,
    p3,
    p4,

    players,
    status,

    // actions
    refresh,
  };
});
