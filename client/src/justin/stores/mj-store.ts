import { ref } from "vue";
import { TileCore } from "@common/core/mj.tile-core";
import { AppState } from "src/example/stores/example-store";
import { defineStore } from "pinia";
import { GameState, Position } from "@common/core/mj.game";
import { findDirectionForPostiion } from "src/justin/common/common";
import type { RoomModel } from "@common/models/room.model";
import type { TileId } from "@common/core/mj.tile-core";
import type { Game, OpenedSet } from "@common/core/mj.game";

export const useMjStore = defineStore("mj", () => {
  const game = ref<Game | null>(null);
  const room = ref<RoomModel | null>(null);
  const roomList = ref<RoomModel[]>([]);

  const myPos = ref<Position>(Position.None);

  const open = ref<boolean>(false);
  const state = ref<GameState>(GameState.Init);
  const appState = ref<AppState>(AppState.Unconnected);

  const canChi = ref<boolean>(false);
  const canPon = ref<boolean>(false);
  const canKan = ref<boolean>(false);
  const canRon = ref<boolean>(false);
  const isMyTurn = ref<boolean>(false);

  const selectedList = ref<TileId[]>([]);
  const allowMultiSelect = ref<boolean>(false);

  const wallBottom = ref<TileId[]>([]);
  const wallRight = ref<TileId[]>([]);
  const wallTop = ref<TileId[]>([]);
  const wallLeft = ref<TileId[]>([]);
  const wallList = [wallBottom, wallRight, wallTop, wallLeft];

  const handTileBottom = ref<TileId[]>([]);
  const handTileRight = ref<TileId[]>([]);
  const handTileTop = ref<TileId[]>([]);
  const handTileLeft = ref<TileId[]>([]);
  const handList = [handTileBottom, handTileRight, handTileTop, handTileLeft];

  const discardBottom = ref<TileId[]>([]);
  const discardRight = ref<TileId[]>([]);
  const discardTop = ref<TileId[]>([]);
  const discardLeft = ref<TileId[]>([]);
  const discardList = [discardBottom, discardRight, discardTop, discardLeft];

  const meldsBottom = ref<OpenedSet[]>([]);
  const meldsRight = ref<OpenedSet[]>([]);
  const meldsTop = ref<OpenedSet[]>([]);
  const meldsLeft = ref<OpenedSet[]>([]);
  const meldsList = [meldsBottom, meldsRight, meldsTop, meldsLeft];
  const meldsTiles = ref<TileId[]>([]);

  const newTileBottom = ref<TileId>(TileCore.voidId);
  const newTileRight = ref<TileId>(TileCore.voidId);
  const newTileTop = ref<TileId>(TileCore.voidId);
  const newTileLeft = ref<TileId>(TileCore.voidId);
  const newList = [newTileBottom, newTileRight, newTileTop, newTileLeft];

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
  const signedIn = ref<boolean>(false);
  function setSignedIn(value: boolean) {
    signedIn.value = value;

    if (!value) {
      // reset other value
      roomList.value = [];
      room.value = null;
      myPos.value = Position.None;
      game.value = null;
    }
    refreshAppState();
  }

  // connected state
  const connected = ref<boolean>(false);
  function setConnected(value: boolean) {
    connected.value = value;

    // reset other value
    signedIn.value = false;
    roomList.value = [];
    room.value = null;
    myPos.value = Position.None;
    game.value = null;
    refreshAppState();
  }

  function setGame(value: Game | null) {
    game.value = value;
    refreshAppState();
  }

  function refreshAll() {
    const pos = myPos.value;
    const g = game.value;

    if (!g || pos === Position.None) return;

    for (let i = 0; i < 4; i++) {
      const gi = findDirectionForPostiion(pos, i);

      wallList[i].value = g.walls?.[gi]?.tiles ?? [];
      handList[i].value = g.players?.[gi]?.handTiles ?? [];
      discardList[i].value = g.discards?.[gi]?.tiles ?? [];
      newList[i].value = g.players?.[gi]?.picked ?? TileCore.voidId;
      meldsList[i].value = g.players?.[gi]?.openedSets ?? [];
    }

    checkMyHand();
    checkMyTurn();
  }

  function checkMyHand() {
    const g = game.value;
    const hand = handTileBottom.value;

    //首先全false
    //1 全场判断是否有吃碰杠和，如有，进入waiting pass状态，不管是否为自家
    //1.1 根据上条条件，判断自家手牌是否能吃碰杠和
    //1.2 如有，则设置为true
    setAllFalse();

    if (!g || g.current === null) return;

    if (g.state === GameState.WaitingPass) {
      //
      if (g.current.position % 4 === (myPos.value += 1) % 4) {
        canChi.value = TileCore.canChi(hand, g.latestTile);
      }
      canPon.value = TileCore.canPeng(hand, g.latestTile);
      canKan.value = TileCore.canGang(hand, g.latestTile);
      canRon.value = TileCore.canHu(hand, g.latestTile);
    } else if (g.state === GameState.WaitingAction) {
      // canKan.value = TileCore.canGang(hand, g.latestTile);

      canRon.value = TileCore.canHu(hand, g.latestTile);
    }
  }

  function checkMyTurn() {
    isMyTurn.value = canChi.value || canPon.value || canKan.value || canRon.value;
    allowMultiSelect.value = canChi.value || canPon.value || canKan.value;
  }

  function setAllFalse() {
    canChi.value = false;
    canPon.value = false;
    canKan.value = false;
    canRon.value = false;
  }

  function selectTile(tile: TileId) {
    const index = selectedList.value.indexOf(tile);
    if (allowMultiSelect.value === false) {
      if (index === -1) {
        selectedList.value = [tile];
      } else {
        clearSelected();
      }
    } else if (allowMultiSelect.value === true) {
      //
      if (index === -1) {
        selectedList.value.push(tile);
      } else {
        selectedList.value.splice(index, 1);
      }
    }
  }

  function clearSelected() {
    selectedList.value = [];
  }

  function showSelected(tile: TileId) {
    if (selectedList.value.indexOf(tile) === -1) {
      return false;
    }
    return true;
  }

  refreshAll();

  return {
    // state
    game,
    room,
    roomList,
    open,
    myPos,
    state,
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

    newTileBottom,
    newTileLeft,
    newTileRight,
    newTileTop,

    meldsBottom,
    meldsRight,
    meldsTop,
    meldsLeft,

    meldsTiles,

    allowMultiSelect,
    selectedList,
    selectTile,
    showSelected,

    clearSelected,

    isMyTurn,
    canChi,
    canPon,
    canKan,
    canRon,
    setAllFalse,

    refreshAll,

    setConnected,
    setSignedIn,
    setGame,
  };
});
