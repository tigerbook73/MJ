import { ref } from "vue";
import { TileCore } from "@common/core/mj.tile-core";
import { defineStore } from "pinia";
import { GameState, Position } from "@common/core/mj.game";
import { filterDiscards, findDirectionForPostiion } from "src/justin/common/common";
import type { RoomModel } from "@common/models/room.model";
import type { TileId } from "@common/core/mj.tile-core";
import type { Game, OpenedSet } from "@common/core/mj.game";
import { bestDiscards, pickOneIdOfKind } from "../tenhou/alg";

export const useMjStore = defineStore("mj", () => {
  let game: Game | null = null;

  const room = ref<RoomModel | null>(null);
  const roomList = ref<RoomModel[]>([]);

  const myPos = ref<Position>(Position.None);
  const currentPos = ref<Position>(Position.None);

  const open = ref<boolean>(false);
  const state = ref<GameState>();

  const canChi = ref<boolean>(false);
  const canPon = ref<boolean>(false);
  const canKan = ref<boolean>(false);
  const canRon = ref<boolean>(false);
  const canTsumo = ref<boolean>(false);
  const canAnKan = ref<boolean>(false);
  const isMyTurn = ref<boolean>(false);

  const bestDiscardsList = ref<TileId[]>([]);
  const idsToDiscard = ref<TileId[]>([]);

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

  function setGame(value: Game | null) {
    game = value;
  }

  function refreshAll() {
    stateUpdate();
    filterDiscards(game);
    tilesUpdate(game, myPos.value);
    bestDiscardsUpdate(handTileBottom.value, newTileBottom.value);
    checkMyHand(game, handTileBottom.value);
  }

  function stateUpdate() {
    if (!game) return;
    state.value = game.state;
    currentPos.value = game.current?.position ?? Position.None;
  }

  function tilesUpdate(game: Game | null, myPositionIndex: Position) {
    if (!game || myPositionIndex === Position.None) return;

    for (let i = 0; i < 4; i++) {
      const gi = findDirectionForPostiion(myPositionIndex, i);

      wallList[i].value = game.walls?.[gi]?.tiles ?? [];
      handList[i].value = game.players?.[gi]?.handTiles ?? [];
      discardList[i].value = game.discards?.[gi]?.tiles ?? [];
      newList[i].value = game.players?.[gi]?.picked ?? TileCore.voidId;
      meldsList[i].value = game.players?.[gi]?.openedSets ?? [];
    }
  }

  function bestDiscardsUpdate(handTiles: TileId[], newTile: TileId) {
    bestDiscardsList.value = bestDiscards(handTiles, newTile);
    idsToDiscard.value = bestDiscardsList.value
      .map((k) => pickOneIdOfKind(k, handTiles, newTile))
      .filter((x): x is number => x !== null);
  }

  function checkMyHand(game: Game | null, hand: TileId[]) {
    // const hand = handTileBottom.value;

    //首先全false
    //1 全场判断是否有吃碰杠和，如有，进入waiting pass状态，不管是否为自家
    //1.1 根据上条条件，判断自家手牌是否能吃碰杠和
    //1.2 如有，则设置为true
    setAllFalse();

    if (!game || game.current === null) return;

    if (game.state === GameState.WaitingPass) {
      //
      if (game.current.position % 4 === (myPos.value += 1) % 4) {
        canChi.value = TileCore.canChi(hand, game.latestTile);
      }
      canPon.value = TileCore.canPeng(hand, game.latestTile);
      canKan.value = TileCore.canGang(hand, game.latestTile);
      canRon.value = TileCore.canHu(hand, game.latestTile);
    } else if (game.state === GameState.WaitingAction) {
      canTsumo.value = TileCore.canHu(hand, newTileBottom.value);
      canAnKan.value = TileCore.canAngang(hand.concat(newTileBottom.value));
    }

    checkMyTurn();
  }

  function checkMyTurn() {
    isMyTurn.value = canChi.value || canPon.value || canKan.value || canRon.value || canTsumo.value || canAnKan.value;
    allowMultiSelect.value = canChi.value || canPon.value || canKan.value || canAnKan.value || canTsumo.value;
  }

  function setAllFalse() {
    canChi.value = false;
    canPon.value = false;
    canKan.value = false;
    canRon.value = false;
    canAnKan.value = false;
    canTsumo.value = false;
  }

  function selectTile(tile: TileId) {
    const index = selectedList.value.indexOf(tile);
    if (allowMultiSelect.value === false) {
      //
      if (index === -1) {
        selectedList.value = [tile];
      } else if (index !== -1 && myPos.value === currentPos.value) {
        return true;
      } else if (index !== -1 && myPos.value !== currentPos.value) {
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
    return false;
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
    // game,
    room,
    roomList,
    open,
    state,

    myPos,
    currentPos,

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

    bestDiscardsList,
    idsToDiscard,

    allowMultiSelect,
    selectedList,
    selectTile,
    showSelected,

    clearSelected,

    isMyTurn,
    canChi,
    canPon,
    canKan,
    canAnKan,
    canRon,
    canTsumo,
    setAllFalse,

    refreshAll,

    setGame,
  };
});
