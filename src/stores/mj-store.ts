import { defineStore } from "pinia";
import { TileCore } from "src/common/core/mj.tile-core";
import { voidCard } from "src/core/mjCard";
import { mjGame } from "src/core/mjGame";
import { ref } from "vue";

interface HandCard {
  name: string;
  id: number;
  options: {
    selected: boolean;
  };
}

function mapTile(tileId: number): HandCard {
  const tile = TileCore.fromId(tileId);
  return {
    name: tile.name,
    id: tile.id,
    options: { selected: false },
  };
}

function copy(playerIndex: number) {
  const player = mjGame.players[playerIndex];
  if (!player || !player.handTiles) return [];

  const cards = player.handTiles.map((tileId) => {
    return mapTile(tileId);
  });
  if (cards?.length == 0) {
    return cards;
  }

  cards.splice(13, 0, {
    name: "",
    id: voidCard.id,
    options: { selected: false },
  });

  // Append the 14th (picked) card at the end
  cards.push(mapTile(player.picked));
  return cards;
}

export const useMjStore = defineStore("mj", () => {
  const open = ref(true);
  const canHu = ref(false);
  const current = ref(mjGame.current);
  const activePositions = mjGame.players.filter((player) => player !== null).map((player) => player!.position);

  // const paused = ref(false);

  const topWall = ref([] as HandCard[]);
  const bottomWall = ref([] as HandCard[]);
  const rightWall = ref([] as HandCard[]);
  const leftWall = ref([] as HandCard[]);

  const p1Cards = ref([] as HandCard[]);
  const p2Cards = ref([] as HandCard[]);
  const p3Cards = ref([] as HandCard[]);
  const p4Cards = ref([] as HandCard[]); // 以前是mycards

  const p1DiscardCards = ref([] as HandCard[]);
  const p2DiscardCards = ref([] as HandCard[]);
  const p3DiscardCards = ref([] as HandCard[]);
  const p4DiscardCards = ref([] as HandCard[]); // 以前是 myDiscardCards

  const myLatestPickCard = ref({ name: "", id: TileCore.voidId, options: { selected: false } });
  const selectedCard = ref({ name: "", id: TileCore.voidId, options: { selected: false } });

  function refresh() {
    topWall.value = mjGame.walls[0].tiles.map((tileId) => {
      return mapTile(tileId);
    });
    rightWall.value = mjGame.walls[1].tiles.map((tileId) => {
      return mapTile(tileId);
    });
    bottomWall.value = mjGame.walls[2].tiles.map((tileId) => {
      return mapTile(tileId);
    });
    leftWall.value = mjGame.walls[3].tiles.map((tileId) => {
      return mapTile(tileId);
    });
    p4Cards.value = copy(0); // 以前是mycards
    p1Cards.value = copy(1);

    p2Cards.value = copy(2);
    p3Cards.value = copy(3);

    //以前是myDiscardCards
    p4DiscardCards.value = mjGame.discards[0].tiles.map((tileId) => {
      return mapTile(tileId);
    });
    p1DiscardCards.value = mjGame.discards[1].tiles.map((tileId) => {
      return mapTile(tileId);
    });

    p2DiscardCards.value = mjGame.discards[2].tiles.map((tileId) => {
      return mapTile(tileId);
    });

    p3DiscardCards.value = mjGame.discards[3].tiles.map((tileId) => {
      return mapTile(tileId);
    });

    // myLatestPickCard.value = {
    //   name: mjGame.players[0].pick.name,
    //   id: mjGame.players[0].pick.id,
    //   options: { selected: false },
    // };
    canHu.value = mjGame.canHu(mjGame.current?.handTiles ?? []);
    current.value = mjGame.current;
    // paused.value = mjGame.isPaused();
  }

  mjGame.init(activePositions);

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
    p4Cards,
    p4DiscardCards,
    myLatestPickCard,
    canHu,
    selectedCard,
    current,
    // paused,
    // actions
    refresh,
  };
});
