import { defineStore } from "pinia";
import { mjGame } from "src/core/mjGame";
import { ref } from "vue";

export const useMjStore = defineStore("mj", () => {
  const open = ref(true);
  const status = ref(Boolean);

  const topWall = ref([] as string[]);
  const bottomWall = ref([] as string[]);
  const rightWall = ref([] as string[]);
  const leftWall = ref([] as string[]);

  const myTiles = ref([] as string[]);

  function refresh() {
    topWall.value = mjGame.walls[0].cards.map((tile) => tile.type.name);
    rightWall.value = mjGame.walls[1].cards.map((tile) => tile.type.name);
    bottomWall.value = mjGame.walls[2].cards.map((tile) => tile.type.name);
    leftWall.value = mjGame.walls[3].cards.map((tile) => tile.type.name);
  }

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
    "",
    "中",
    "?",
  ];

  mjGame.init();
  mjGame.shuffle();
  refresh();

  return {
    // state
    open,
    topWall,
    rightWall,
    bottomWall,
    leftWall,
    myTiles,
    status,
    // actions
    refresh,
  };
});
