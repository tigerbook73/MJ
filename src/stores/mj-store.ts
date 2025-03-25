import { posix } from "path";
import { defineStore } from "pinia";
import { Game, Player, Position, Wall } from "src/common/core/mj.game";
import { TileCore, TileId } from "src/common/core/mj.tile-core";
import { mjGame } from "src/core/mjGame";
import { IDTileList } from "src/core/mjTile";
import { ref } from "vue";

export const useMjStore = defineStore("mj", () => {
  const game = ref<Game | null>(null);
  const open = ref(false as boolean);
  const status = ref(false as boolean);
  const isWinning = ref(false as boolean);

  const players = ref([] as Player[]);
  const selectedTile = ref(TileCore.voidTile as TileCore);
  const my_pos = ref(Position.East as Position);

  const wallEast = ref([] as TileId[]);
  const wallSouth = ref([] as TileId[]);
  const wallWest = ref([] as TileId[]);
  const wallNorth = ref([] as TileId[]);
  const wallList = [wallEast, wallSouth, wallWest, wallNorth];

  const handTileEast = ref([] as TileCore[]);
  const handTileSouth = ref([] as TileCore[]);
  const handTileWest = ref([] as TileCore[]);
  const handTIleNorth = ref([] as TileCore[]);
  const handList = [handTileEast, handTileSouth, handTileWest, handTIleNorth];

  const discardEast = ref([] as string[]);
  const discardSouth = ref([] as string[]);
  const discardWest = ref([] as string[]);
  const discardNorth = ref([] as string[]);
  const discardList = [discardEast, discardSouth, discardWest, discardNorth];

  function refresh() {
    wallRefresh();
    playerDiscardRefresh();
    handTileRefresh();
  }

  function mapTile(tileID: number) {
    return TileCore.fromId(tileID);
  }
  function IDtoName(tileID: number) {
    return IDTileList[tileID];
  }

  function wallRefresh() {
    for (let i = 0; i < 4; i++) {
      wallList[i].value = mjGame.walls[i].tiles.map((tile) => IDtoName(tile));
    }
  }
  function wallRefresh2() {
    wallList.forEach((wall, index) => {
      if (game.value?.walls[index].tiles == null) {
        return;
      }
      wallList[index].value = game.value?.walls[index].tiles;
    });
  }

  function playerDiscardRefresh() {
    for (let i = 0; i < 4; i++) {
      discardList[i].value = mjGame.discards[i].tiles.map((tile) => IDtoName(tile));
    }
  }

  function clearSelected() {
    selectedTile.value = TileCore.voidTile;
  }

  function handTileRefresh() {
    mjGame.players.forEach((player, index) => {
      if (player == null) {
        return;
      }
      handList[index].value = player.handTiles.map((tile) => mapTile(tile));
    });
  }
  function handTileRefresh2() {
    mjGame.players.forEach((player, index) => {
      if (game.value == null || game.value?.players[index]?.handTiles == null) {
        return;
      }
      handList[index].value = game.value.players[index].handTiles.map((tile) => mapTile(tile));
    });
  }

  function isCurrentPlayer(position: number) {
    return (position === mjGame.current?.position) === true;
  }

  // mySelected.value = ["西"];

  mjGame.init([Position.East]);
  mjGame.start();
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
