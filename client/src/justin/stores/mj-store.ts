import { defineStore } from "pinia";
import type { Game, Player } from "@common/core/mj.game";
import { Position } from "@common/core/mj.game";
import type { TileId } from "@common/core/mj.tile-core";
import { TileCore } from "@common/core/mj.tile-core";
import type { RoomModel } from "@common/models/room.model";
import { ref } from "vue";

export enum AppState {
  Unconnected = "UNCONNECTED",
  UnSignedIn = "UNSIGNED_IN",
  InLobby = "IN_LOBBY",
  InGame = "IN_GAME",
}

export const PlayerPosRotation = [
  [0, 3, 2, 1],
  [1, 0, 3, 2],
  [2, 1, 0, 3],
  [3, 2, 1, 0],
];
// [0, 3, 2, 1],
// [1, 0, 3, 2],
// [2, 1, 0, 3],
// [3, 2, 1, 0],

/*
server
    西
  南  北
    东
actual
    西
  北  南
    东

    逆时针 server东北西南，bot right top left
    server enum east0 south1 west2 north3



*/

export const useMjStore = defineStore("mj", () => {
  const game = ref<Game | null>(null);
  const room = ref<RoomModel | null>(null);
  const roomList = ref<RoomModel[]>([]);
  const position = ref<Position>(Position.None);

  const open = ref(false as boolean);
  const status = ref(false as boolean);
  const isWinning = ref(false as boolean);
  const appState = ref<AppState>(AppState.Unconnected);

  const players = ref([] as Player[]);
  const selectedTile = ref(TileCore.voidTile.id);
  const myPos = ref(Position.East as Position);

  const wallBottom = ref([] as TileId[]);
  const wallRight = ref([] as TileId[]);
  const wallTop = ref([] as TileId[]);
  const wallLeft = ref([] as TileId[]);
  const wallList = [wallBottom, wallRight, wallTop, wallLeft];

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

  function refreshAppState() {
    if (!connected.value) {
      appState.value = AppState.Unconnected;
    } else if (!signedIn.value) {
      appState.value = AppState.UnSignedIn;
    } else if (!game.value) {
      appState.value = AppState.InLobby;
    } else {
      appState.value = AppState.InGame;
    }
  }

  // signed in state
  const signedIn = ref(false);
  function setSignedIn(value: boolean) {
    signedIn.value = value;

    if (!value) {
      // reset other value
      // user.value.password = "";
      roomList.value = [];
      room.value = null;
      position.value = Position.None;
      game.value = null;
    }
    refreshAppState();
  }

  // connected state
  const connected = ref(false);
  function setConnected(value: boolean) {
    connected.value = value;

    // reset other value
    signedIn.value = false;
    // user.value.password = "";
    roomList.value = [];
    room.value = null;
    position.value = Position.None;
    game.value = null;
    refreshAppState();
  }

  function setGame(value: Game | null) {
    game.value = value;
    refreshAppState();
  }

  function refresh() {
    wallRefresh();
    playerDiscardRefresh();
    handTileRefresh();
  }

  function IDtoName(id: number) {
    // if (id == -1) {
    //   return "";
    // }
    return IDTileList[id];
  }

  function wallRefresh() {
    game.value?.walls.forEach((wall, index) => {
      wallList[index].value = wall.tiles;
    });
  }

  function refreshAll() {
    const pos = myPos.value;
    const g = game.value;
    const rotation = PlayerPosRotation[myPos.value];

    if (!g || pos === Position.None) return;

    for (let i = 0; i < rotation.length; i++) {
      const gi = rotation[i];

      wallList[i].value = g.walls?.[gi]?.tiles ?? [];
      handList[i].value = g.players?.[gi]?.handTiles ?? [];
      discardList[i].value = g.discards?.[gi]?.tiles ?? [];
    }
  }

  function playerDiscardRefresh() {
    game.value?.discards.forEach((discard, index) => {
      discardList[index].value = discard.tiles;
    });
  }

  function handTileRefresh() {
    game.value?.players.forEach((player, index) => {
      handList[index].value = player?.handTiles || [];
    });
  }

  function clearSelected() {
    selectedTile.value = TileCore.voidTile.id;
  }

  refreshAll();

  return {
    // state
    game,
    room,
    roomList,
    position,
    open,
    myPos,
    appState,

    wallTop,
    wallRight,
    wallBottom,
    wallLeft,

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

    IDtoName,

    clearSelected,
    isWinning,

    refresh,
    refreshAll,

    setConnected,
    setSignedIn,
    setGame,
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
