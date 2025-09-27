import { defineStore } from "pinia";
import { type Game, type Position } from "@common/core/mj.game";
// import { Position } from "@common/core/mj.game";
import { TileCore, type TileId } from "@common/core/mj.tile-core";
import { mjGame } from "src/simon/core/mjGame";
import { ref } from "vue";
import { appStore } from "./app-store";
import { roomStore } from "./room-store";

const useRoomStore = roomStore();

export interface HandCard {
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

export function mapTile(tileId: number): HandCard {
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

export function updateDiscards(game: Game) {
  if (!game?.players || !game?.discards) return;

  // 收集所有 target（每张牌 id 全局唯一）
  const openedIds = new Set<TileId>();
  for (const p of game.players) {
    if (!p?.openedSets) continue;
    for (const s of p.openedSets) {
      if (s?.target != null) openedIds.add(s.target);
    }
  }
  if (openedIds.size === 0) return;

  // 逐家过滤弃牌：命中 target 的直接移除
  for (const d of game.discards) {
    if (!d?.tiles) continue;
    d.tiles = d.tiles.filter((id: TileId) => !openedIds.has(id));
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

  const eatenTiles = ref<TileId[]>([]); // 存储被吃掉的牌的 ID

  const open = ref(true);
  const canHu = ref(false);
  const current = ref(mjGame.current);
  const activePositions = mjGame.players.filter((player) => player !== null).map((player) => player.position);
  const latestTile = ref<TileId | null>(null);
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
    latestTile.value = mjGame.latestTile;
    // paused.value = mjGame.isPaused();
  }

  mjGame.init(activePositions);

  canHu.value = TileCore.canHu(current.value?.handTiles ?? []);
  return {
    currentGame,
    setCurrentGame,
    reset,
    eatenTiles,
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
    latestTile,
    canHu,
    selectedCard,
    current,
    // paused,
    // actions
    refresh,
  };
});
