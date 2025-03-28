import { defineStore } from "pinia";
import { Game, Player, Position } from "src/common/core/mj.game";
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

  function mapTile(tileID: number) {
    return TileCore.fromId(tileID);
  }
  function IDtoName(tileID: number) {
    return IDTileList[tileID];
  }

  function wallRefresh() {
    for (let i = 0; i < 4; i++) {
      wallList[i].value = mjGame.walls[i].tiles;
    }
  }
  function wallRefresh2() {
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
