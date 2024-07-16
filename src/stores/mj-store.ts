import { defineStore } from "pinia";
import { mjGame } from "src/core/mjGame";
import { ref } from "vue";

interface HandCard {
  name: string;
  options: {
    selected: boolean;
  };
}

export const useMjStore = defineStore("mj", () => {
  const open = ref(true);
  const status = ref(Boolean);
  const canHu = ref(false);

  const topWall = ref([] as HandCard[]);
  const bottomWall = ref([] as HandCard[]);
  const rightWall = ref([] as HandCard[]);
  const leftWall = ref([] as HandCard[]);

  const p1Cards = ref([] as HandCard[]);
  const p2Cards = ref([] as HandCard[]);
  const p3Cards = ref([] as HandCard[]);
  const myCards = ref([] as HandCard[]);

  const p1DiscardCards = ref([] as HandCard[]);
  const p2DiscardCards = ref([] as HandCard[]);
  const p3DiscardCards = ref([] as HandCard[]);
  const myDiscardCards = ref([] as HandCard[]);

  function refresh() {
    topWall.value = mjGame.walls[0].cards.map((tile) => ({ name: tile.type.name, options: { selected: false } }));
    rightWall.value = mjGame.walls[1].cards.map((tile) => ({ name: tile.type.name, options: { selected: false } }));
    bottomWall.value = mjGame.walls[2].cards.map((tile) => ({ name: tile.type.name, options: { selected: false } }));
    leftWall.value = mjGame.walls[3].cards.map((tile) => ({ name: tile.type.name, options: { selected: false } }));
    myCards.value = mjGame.players[0].hand.map((tile) => ({ name: tile.type.name, options: { selected: false } }));
    p1Cards.value = mjGame.players[1].hand.map((tile) => ({ name: tile.type.name, options: { selected: false } }));
    p2Cards.value = mjGame.players[2].hand.map((tile) => ({ name: tile.type.name, options: { selected: false } }));
    p3Cards.value = mjGame.players[3].hand.map((tile) => ({ name: tile.type.name, options: { selected: false } }));

    myDiscardCards.value = mjGame.players[0].discard.map((tile) => ({
      name: tile.type.name,
      options: { selected: false },
    }));
    p1DiscardCards.value = mjGame.players[1].discard.map((tile) => ({
      name: tile.type.name,
      options: { selected: false },
    }));
    p2DiscardCards.value = mjGame.players[2].discard.map((tile) => ({
      name: tile.type.name,
      options: { selected: false },
    }));
    p3DiscardCards.value = mjGame.players[3].discard.map((tile) => ({
      name: tile.type.name,
      options: { selected: false },
    }));
    canHu.value = mjGame.canHu();
  }

  mjGame.init();

  return {
    // state
    open,
    topWall,
    rightWall,
    bottomWall,
    leftWall,
    p1Cards,
    p1DiscardCards,
    p2Cards,
    p2DiscardCards,
    p3Cards,
    p3DiscardCards,
    myCards,
    myDiscardCards,
    status,
    canHu,
    // actions
    refresh,
  };
});
