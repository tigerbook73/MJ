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
  const handList = [p1, p2, p3, p4];

  const p1_discard = ref([] as string[]);
  const p2_discard = ref([] as string[]);
  const p3_discard = ref([] as string[]);
  const p4_discard = ref([] as string[]);
  const discardList = [p1_discard, p2_discard, p3_discard, p4_discard];

  const p1_new = ref("" as string);
  const p2_new = ref("" as string);
  const p3_new = ref("" as string);
  const p4_new = ref("" as string);
  const newList = [p1_new, p2_new, p3_new, p4_new];

  function refresh() {
    bottomWall.value = mjGame.walls[0].tiles.map((tile) => tile.name);
    rightWall.value = mjGame.walls[1].tiles.map((tile) => tile.name);
    topWall.value = mjGame.walls[2].tiles.map((tile) => tile.name);
    leftWall.value = mjGame.walls[3].tiles.map((tile) => tile.name);

    status.value = mjGame.is_started();

    if (mjGame.players[0].newtile.name !== "") {
      p1_new.value = mjGame.players[0].newtile.name;
    }
    discardList[0].value = mjGame.players[0].played.map((tile) => tile.name);
    playerHandRefresh();
  }

  function playerHandRefresh() {
    for (let i = 0; i < 4; i++) {
      handList[i].value = mjGame.players[i].hand.map((tile) => tile.name);
    }
    for (let i = 0; i < 4; i++) {
      if (mjGame.players[i].newtile.name !== "") {
        handList[i].value.push("");
        handList[i].value.push(newList[i].value);
      }
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
