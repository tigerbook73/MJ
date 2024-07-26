import { defineStore } from "pinia";
import { mjGame } from "src/core/mjGame";
import { MjPlayer } from "src/core/mjPlayer";
import { ref } from "vue";

export const useMjStore = defineStore("mj", () => {
  const open = ref(false as boolean);
  const status = ref(false as boolean);

  const topWall = ref([] as string[]);
  const bottomWall = ref([] as string[]);
  const rightWall = ref([] as string[]);
  const leftWall = ref([] as string[]);

  const players = ref([] as MjPlayer[]);

  const p1 = ref([] as string[]);
  const p2 = ref([] as string[]);
  const p3 = ref([] as string[]);
  const p4 = ref([] as string[]);
  const plist = [p1, p2, p3, p4];

  const p1_discard = ref([] as string[]);
  const p1_new = ref("" as string);

  function refresh() {
    topWall.value = mjGame.walls[2].tiles.map((tile) => tile.name);
    rightWall.value = mjGame.walls[1].tiles.map((tile) => tile.name);
    bottomWall.value = mjGame.walls[0].tiles.map((tile) => tile.name);
    leftWall.value = mjGame.walls[3].tiles.map((tile) => tile.name);
    status.value = mjGame.is_started();

    if (mjGame.players[0].newtile.name !== "") {
      p1_new.value = mjGame.players[0].newtile.name;
    }
    p1_discard.value = mjGame.players[0].played.map((tile) => tile.name);
    playerRefresh();
  }

  function playerRefresh() {
    for (let i = 0; i < 4; i++) {
      plist[i].value = mjGame.players[i].display.map((tile) => tile.name);
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

    p1,
    p2,
    p3,
    p4,

    p1_discard,
    p1_new,

    players,
    status,

    // actions
    refresh,
  };
});
