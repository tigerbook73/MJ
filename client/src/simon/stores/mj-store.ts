import { defineStore } from "pinia";
import type { Game, Position } from "@common/core/mj.game";
// import { Position } from "@common/core/mj.game";
import { TileCore } from "@common/core/mj.tile-core";
import { mjGame } from "src/simon/core/mjGame";
import { ref } from "vue";
import { appStore } from "./app-store";
import { roomStore } from "./room-store";

const useRoomStore = roomStore();

interface HandCard {
  name: string;
  id: number;
  options: { selected: boolean };
}

export enum Direction {
  Top = "top",
  Bottom = "bottom",
  Right = "right",
  Left = "left",
}

function mapTile(tileId: number): HandCard {
  const tile = TileCore.fromId(tileId);
  return { name: tile.name, id: tile.id, options: { selected: false } };
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

  cards.splice(13, 0, { name: "", id: TileCore.voidTile.id, options: { selected: false } });

  // Append the 14th (picked) card at the end
  cards.push(mapTile(player.picked));
  return cards;
}

export function mapPosition(myPosition: number, direction: Direction): Position {
  if (direction === Direction.Bottom) {
    return ((myPosition + 4) % 4) as Position;
  } else if (direction === Direction.Left) {
    return ((myPosition + 1 + 4) % 4) as Position;
  } else if (direction === Direction.Top) {
    return ((myPosition + 2 + 4) % 4) as Position;
  } else {
    return ((myPosition + 3 + 4) % 4) as Position;
  }
}

export const useMjStore = defineStore("mj", () => {
  // game info
  const currentGame = ref<Game | null>(null);

  function setCurrentGame(value: Game | null) {
    currentGame.value = value;
    appStore().refreshAppState();
  }

  function reset() {
    // reset game info
    currentGame.value = null;
    appStore().refreshAppState();
  }

  const open = ref(true);
  const canHu = ref(false);
  const current = ref(mjGame.current);
  const activePositions = mjGame.players.filter((player) => player !== null).map((player) => player.position);

  // const paused = ref(false);

  const topWall = ref([] as HandCard[]);
  const bottomWall = ref([] as HandCard[]);
  const rightWall = ref([] as HandCard[]);
  const leftWall = ref([] as HandCard[]);

  const p1Cards = ref([] as HandCard[]);
  const p2Cards = ref([] as HandCard[]);
  const p3Cards = ref([] as HandCard[]);
  const pBottomCards = ref([] as HandCard[]); // 以前是mycards
  const p1DiscardCards = ref([] as HandCard[]);
  const p2DiscardCards = ref([] as HandCard[]);
  const p3DiscardCards = ref([] as HandCard[]);
  const pBottomDiscardCards = ref([] as HandCard[]); // 以前是 myDiscardCards

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

    const myPos = useRoomStore.currentPosition;

    if (myPos === null) {
      console.warn("myPos is null, cannot map player positions.");
      return;
    }

    pBottomCards.value = copy(mapPosition(myPos, Direction.Bottom));
    p1Cards.value = copy(mapPosition(myPos, Direction.Left));
    p2Cards.value = copy(mapPosition(myPos, Direction.Top));
    p3Cards.value = copy(mapPosition(myPos, Direction.Right));

    pBottomDiscardCards.value = mjGame.discards[mapPosition(myPos, Direction.Bottom)].tiles.map(mapTile);
    p1DiscardCards.value = mjGame.discards[mapPosition(myPos, Direction.Left)].tiles.map(mapTile);
    p2DiscardCards.value = mjGame.discards[mapPosition(myPos, Direction.Top)].tiles.map(mapTile);
    p3DiscardCards.value = mjGame.discards[mapPosition(myPos, Direction.Right)].tiles.map(mapTile);

    // myLatestPickCard.value = {
    //   name: mjGame.players[0].pick.name,
    //   id: mjGame.players[0].pick.id,
    //   options: { selected: false },
    // };
    canHu.value = TileCore.canHu(mjGame.current?.handTiles ?? []);
    current.value = mjGame.current;
    // paused.value = mjGame.isPaused();
  }

  mjGame.init(activePositions);

  canHu.value = TileCore.canHu(current.value?.handTiles ?? []);
  return {
    currentGame,
    setCurrentGame,
    reset,
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
    pBottomCards,
    pBottomDiscardCards,
    myLatestPickCard,
    canHu,
    selectedCard,
    current,
    // paused,
    // actions
    refresh,
  };
});
