import { defineStore } from "pinia";
import { mjGame } from "src/core/mjGame";
import { ref } from "vue";

export const useMjStore = defineStore("mj", () => {
  const open = ref(false);

  const topWall = ref([] as string[]);
  const bottomWall = ref([] as string[]);
  const rightWall = ref([] as string[]);
  const leftWall = ref([] as string[]);

  const myTiles = ref([] as string[]);

  // const wallPointer = ref(0);
  // const tilePointer = ref(0);

  function refresh() {
    topWall.value = mjGame.walls[0].tiles.map((tile) => tile.type.name);
    rightWall.value = mjGame.walls[1].tiles.map((tile) => tile.type.name);
    bottomWall.value = mjGame.walls[2].tiles.map((tile) => tile.type.name);
    leftWall.value = mjGame.walls[3].tiles.map((tile) => tile.type.name);
  }

  // function append() {
  //   if (tilePointer.value == 34) {
  //     tilePointer.value = 0;
  //     wallPointer.value = wallPointer.value + 1;
  //   }
  //   const picked = mjGame.walls[wallPointer.value].tiles[tilePointer.value];
  //   myTiles.value.push(picked.name);
  // }

  myTiles.value = [
    // test data
    "东",
    "东",
    "东",
    "南",
    "南",
    "南",
    "西",
    "西",
    "西",
    "北",
    "北",
    "北",
    "中",
    "中",
    "",
    "?",
  ];

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

    // actions
    refresh,
  };
});
