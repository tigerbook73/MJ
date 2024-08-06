import { defineStore } from "pinia";
import { voidCard, voidTileId } from "src/core/mjCard";
import { mjGame } from "src/core/mjGame";
import { ref } from "vue";

interface HandCard {
  name: string;
  id: number;
  options: {
    selected: boolean;
  };
}

function copy(playerIndex: number) {
  const cards = mjGame.players[playerIndex].hand.map((tile) => ({
    name: tile.name,
    id: tile.id,
    options: { selected: false },
  }));
  if (cards.length == 0) {
    return cards;
  }
  cards[14] = cards[13] ?? {
    name: "",
    id: voidCard.id,
    options: { selected: false },
  };
  cards[13] = {
    name: "",
    id: voidCard.id,
    options: { selected: false },
  };

  // if (cards.length == 13){
  //   cards.push({
  //     name: "",
  //     id: voidCard.id,
  //     options: { selected: false },
  //   });
  //   cards.push({
  //     name: "",
  //     id: voidCard.id,
  //     options: { selected: false },
  //   });
  // } else if (cards.length == 14) {
  //   cards.splice(13,0,{
  //     name: "",
  //     id: voidCard.id,
  //     options: { selected: false },
  //   });
  // }

  return cards;
}
export const useMjStore = defineStore("mj", () => {
  const open = ref(true);
  const status = ref(Boolean);
  const canHu = ref(false);
  const currentPlayer = ref(mjGame.currentPlayer);

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

  const myLatestPickCard = ref({ name: "", id: voidTileId, options: { selected: false } });
  const selectedCard = ref({ name: "", id: voidTileId, options: { selected: false } });

  function refresh() {
    topWall.value = mjGame.walls[0].cards.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));
    rightWall.value = mjGame.walls[1].cards.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));
    bottomWall.value = mjGame.walls[2].cards.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));
    leftWall.value = mjGame.walls[3].cards.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));
    myCards.value = copy(0);
    p1Cards.value = copy(1);

    p2Cards.value = copy(2);
    p3Cards.value = copy(3);
    myDiscardCards.value = mjGame.players[0].discard.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));
    p1DiscardCards.value = mjGame.players[1].discard.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));
    p2DiscardCards.value = mjGame.players[2].discard.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));
    p3DiscardCards.value = mjGame.players[3].discard.map((tile) => ({
      name: tile.name,
      id: tile.id,
      options: { selected: false },
    }));

    myLatestPickCard.value = {
      name: mjGame.players[0].pick.name,
      id: mjGame.players[0].pick.id,
      options: { selected: false },
    };
    canHu.value = mjGame.canHu();
    currentPlayer.value = mjGame.currentPlayer;
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
    myLatestPickCard,
    status,
    canHu,
    selectedCard,
    currentPlayer,
    // actions
    refresh,
  };
});
