import { defineStore } from "pinia";
import { Game, Player, Position } from "src/common/core/mj.game";
import { TileCore, TileId } from "src/common/core/mj.tile-core";
import { mjGame } from "src/core/mjGame";
import { ref } from "vue";

export enum AppState {
  Unconnected = "UNCONNECTED",
  UnSignedIn = "UNSIGNED_IN",
  InLobby = "IN_LOBBY",
  InGame = "IN_GAME",
}

export const useMjStore = defineStore("mj", () => {
  const game = ref<Game | null>(null);
  const open = ref(false as boolean);
  const status = ref(false as boolean);
  const isWinning = ref(false as boolean);

  const players = ref([] as Player[]);
  const selectedTile = ref(TileCore.voidTile.id as TileId);
  const my_pos = ref(Position.East as Position);

  const wallEast = ref([] as TileId[]);
  const wallSouth = ref([] as TileId[]);
  const wallWest = ref([] as TileId[]);
  const wallNorth = ref([] as TileId[]);
  const wallList = [wallEast, wallSouth, wallWest, wallNorth];

  const handTileEast = ref([] as TileId[]);
  const handTileSouth = ref([] as TileId[]);
  const handTileWest = ref([] as TileId[]);
  const handTIleNorth = ref([] as TileId[]);
  const handList = [handTileEast, handTileSouth, handTileWest, handTIleNorth];

  const discardEast = ref([] as TileId[]);
  const discardSouth = ref([] as TileId[]);
  const discardWest = ref([] as TileId[]);
  const discardNorth = ref([] as TileId[]);
  const discardList = [discardEast, discardSouth, discardWest, discardNorth];

  function refresh() {
    wallRefresh();
    playerDiscardRefresh();
    handTileRefresh();
  }

  function IDtoName(id: number) {
    return IDTileList[id];
  }

  function wallRefresh() {
    mjGame.walls.forEach((wall, index) => {
      wallList[index].value = wall.tiles;
    });
  }

  function playerDiscardRefresh() {
    mjGame.discards.forEach((discard, index) => {
      discardList[index].value = discard.tiles;
    });
  }

  function clearSelected() {
    selectedTile.value = TileCore.voidTile.id;
  }

  function handTileRefresh() {
    mjGame.players.forEach((player, index) => {
      handList[index].value = player?.handTiles || [];
    });
  }

  function isCurrentPlayer(position: number) {
    return (position === mjGame.current?.position) === true;
  }

  refresh();

  return {
    // state
    game,
    open,
    wallWest,
    wallSouth,
    wallEast,
    wallNorth,

    my_pos,
    handTileEast,
    handTileSouth,
    handTileWest,
    handTIleNorth,

    discardList,
    discardEast,
    discardSouth,
    discardWest,
    discardNorth,

    players,
    status,
    selectedTile,

    IDtoName,

    clearSelected,
    isCurrentPlayer,
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
