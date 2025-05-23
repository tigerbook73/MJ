import { defineStore } from "pinia";
import type { Game, Player } from "@mj/shared/common/core/mj.game";
import { Position } from "@mj/shared/common/core/mj.game";
import type { TileId } from "@mj/shared/common/core/mj.tile-core";
import { TileCore } from "@mj/shared/common/core/mj.tile-core";
import type { RoomModel } from "@mj/shared/common/models/room.model";
import { ref } from "vue";

export enum AppState {
  Unconnected = "UNCONNECTED",
  UnSignedIn = "UNSIGNED_IN",
  InLobby = "IN_LOBBY",
  InGame = "IN_GAME",
}

export const useMjStore = defineStore("mj", () => {
  const game = ref<Game | null>(null);
  const room = ref<RoomModel | null>(null);
  const roomList = ref<RoomModel[]>([]);
  const position = ref<Position | null>(null);
  const open = ref(false as boolean);
  const status = ref(false as boolean);
  const isWinning = ref(false as boolean);

  const players = ref([] as Player[]);
  const selectedTile = ref(TileCore.voidTile.id);
  const my_pos = ref(Position.East as Position);

  const wallEast = ref([] as TileId[]);
  const wallSouth = ref([] as TileId[]);
  const wallWest = ref([] as TileId[]);
  const wallNorth = ref([] as TileId[]);
  const wallList = [wallEast, wallSouth, wallWest, wallNorth];

  const handTileBottom = ref([] as TileId[]);
  const handTileRight = ref([] as TileId[]);
  const handTileTop = ref([] as TileId[]);
  const handTileLeft = ref([] as TileId[]);
  const handList = [handTileBottom, handTileRight, handTileTop, handTileLeft];

  const discardBottom = ref([] as TileId[]);
  const discardRight = ref([] as TileId[]);
  const discardTop = ref([] as TileId[]);
  const discardLeft = ref([] as TileId[]);
  const discardList = [discardBottom, discardRight, discardTop, discardLeft];

  function refresh() {
    wallRefresh();
    playerDiscardRefresh();
    handTileRefresh();
  }

  function IDtoName(id: number) {
    return IDTileList[id];
  }

  function wallRefresh() {
    game.value?.walls.forEach((wall, index) => {
      wallList[index].value = wall.tiles;
    });
  }

  function playerDiscardRefresh() {
    game.value?.discards.forEach((discard, index) => {
      discardList[index].value = discard.tiles;
    });
  }

  function clearSelected() {
    selectedTile.value = TileCore.voidTile.id;
  }

  function handTileRefresh() {
    game.value?.players.forEach((player, index) => {
      handList[index].value = player?.handTiles || [];
    });
  }

  function setGame(value: Game | null) {
    game.value = value;
  }

  // function isCurrentPlayer(position: number) {
  //   return (position === game.value.current?.position) === true;
  // }

  refresh();

  return {
    // state
    game,
    room,
    roomList,
    position,
    open,
    my_pos,

    wallWest,
    wallSouth,
    wallEast,
    wallNorth,

    handTileBottom,
    handTileRight,
    handTileTop,
    handTileLeft,

    discardBottom,
    discardRight,
    discardTop,
    discardLeft,

    players,
    status,
    selectedTile,

    setGame,
    IDtoName,

    clearSelected,
    isWinning,

    refresh,
  };
});

export const IDTileList: string[] = [
  "m1",
  "m1",
  "m1",
  "m1",
  "m2",
  "m2",
  "m2",
  "m2",
  "m3",
  "m3",
  "m3",
  "m3",
  "m4",
  "m4",
  "m4",
  "m4",
  "m5",
  "m5",
  "m5",
  "m5",
  "m6",
  "m6",
  "m6",
  "m6",
  "m7",
  "m7",
  "m7",
  "m7",
  "m8",
  "m8",
  "m8",
  "m8",
  "m9",
  "m9",
  "m9",
  "m9",
  "p1",
  "p1",
  "p1",
  "p1",
  "p2",
  "p2",
  "p2",
  "p2",
  "p3",
  "p3",
  "p3",
  "p3",
  "p4",
  "p4",
  "p4",
  "p4",
  "p5",
  "p5",
  "p5",
  "p5",
  "p6",
  "p6",
  "p6",
  "p6",
  "p7",
  "p7",
  "p7",
  "p7",
  "p8",
  "p8",
  "p8",
  "p8",
  "p9",
  "p9",
  "p9",
  "p9",
  "s1",
  "s1",
  "s1",
  "s1",
  "s2",
  "s2",
  "s2",
  "s2",
  "s3",
  "s3",
  "s3",
  "s3",
  "s4",
  "s4",
  "s4",
  "s4",
  "s5",
  "s5",
  "s5",
  "s5",
  "s6",
  "s6",
  "s6",
  "s6",
  "s7",
  "s7",
  "s7",
  "s7",
  "s8",
  "s8",
  "s8",
  "s8",
  "s9",
  "s9",
  "s9",
  "s9",
  "z1",
  "z1",
  "z1",
  "z1",
  "z2",
  "z2",
  "z2",
  "z2",
  "z3",
  "z3",
  "z3",
  "z3",
  "z4",
  "z4",
  "z4",
  "z4",
  "z5",
  "z5",
  "z5",
  "z5",
  "z6",
  "z6",
  "z6",
  "z6",
  "z7",
  "z7",
  "z7",
  "z7",
];
