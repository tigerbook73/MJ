<template>
  <div class="column area-game">
    <!-- top -->
    <div class="row h-10">
      <game-area-a class="w-10" @start-game="start" @reset-game="reset"></game-area-a>
      <player-area-top class="w-70"></player-area-top>
      <game-area-b class="w-10"></game-area-b>
    </div>

    <!-- center -->
    <div class="row h-70">
      <player-area-left class="w-10"></player-area-left>
      <board-area class="w-70"></board-area>
      <player-area-right class="w-10"></player-area-right>
    </div>

    <!-- bottom -->
    <div class="row h-10">
      <game-area-c class="w-10" @zi-mo="Zimo"></game-area-c>
      <player-area-bottom class="w-70" @drop-tile="dropTile" @pass-turn="passTurn" @handle-chi="handleChi"
        @handle-peng="handlePeng" @handle-gang="handleGang" @hu="Hu"></player-area-bottom>
      <game-area-d class="w-10"></game-area-d>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "GameArea" });

import BoardArea from "src/simon/components/BoardArea.vue";
import GameAreaA from "src/simon/components/GameAreaA.vue";
import GameAreaB from "src/simon/components/GameAreaB.vue";
import GameAreaC from "src/simon/components/GameAreaC.vue";
import GameAreaD from "src/simon/components/GameAreaD.vue";
import PlayerAreaBottom from "src/simon/components/PlayerAreaBottom.vue";
import PlayerAreaLeft from "src/simon/components/PlayerAreaLeft.vue";
import PlayerAreaRight from "src/simon/components/PlayerAreaRight.vue";
import PlayerAreaTop from "src/simon/components/PlayerAreaTop.vue";
import { clientApi } from "src/client/client-api";
import { setGame, mjGame } from "src/simon/core/mjGame";
import { useMjStore } from "src/simon/stores/mj-store";

const mjStore = useMjStore();
import { Direction, mapPosition } from "src/simon/stores/mj-store";
import { roomStore } from "src/simon/stores/room-store";
import type { TileId } from "src/common/core/mj.tile-core";

async function start() {
  try {
    const response = await clientApi.startGame();

    if (response) {
      setGame(response);
      mjStore.refresh();
    } else {
      console.error("Game start failed: No game data in response");
    }
  } catch (error) {
    console.error("Error starting game:", error);
  }
}

async function reset() {
  try {
    const response = await clientApi.resetGame();

    if (response) {
      setGame(response);
      mjStore.refresh();
    } else {
      console.error("Game start failed: No game data in response");
    }
  } catch (error) {
    console.error("Error starting game:", error);
  }
}

async function dropTile(tileId?: TileId) {
  try {
    // if (!mjStore.pBottomCards.some((tile) => tile.id === mjStore.selectedCard.id)) {
    //   console.error("Selected tile is not in hand.");
    //   return;
    // }

    if (tileId === undefined) {
      console.error("No tileId provided to dropTile");
      return;
    }

    if (!mjStore.pBottomCards.some((tile) => tile.id === tileId)) {
      console.error("No tile selected.");
      return;
    }

    const response = await clientApi.actionDrop(tileId);
    if (response) {
      setGame(response);
      mjStore.refresh();
    } else {
      console.error("Drop failed: No game data in response");
    }
  } catch (error) {
    console.error("Error dropping tile:", error);
  }
}

async function passTurn() {
  try {
    if (!mjGame.current) {
      console.error("Error: No current player found, cannot pass.");
      return;
    }

    if (mjStore.current?.position === mapPosition(roomStore().currentPosition!, Direction.Bottom)) {
      console.error("You cannot pass your own turn!");
      return;
    }

    const response = await clientApi.actionPass();
    if (response) {
      setGame(response);
      mjGame.pass(mjGame.current);
      mjStore.refresh();
    } else {
      console.error("Pass failed: No game data in response");
    }
  } catch (error) {
    console.error("Error passing:", error);
  }
}

async function handleChi(tileIds: [TileId, TileId]) {
  try {
    const response = await clientApi.actionChi(tileIds);
    if (response) {
      setGame(response); // Update game state
      // Add to eat tiles
      mjStore.refresh(); // Refresh UI
    } else {
      console.error("Chi failed: No game data in response");
    }
  } catch (error) {
    console.error("Error invoking Chi:", error);
  }
}

async function handlePeng(tileIds: [TileId, TileId]) {
  try {
    const response = await clientApi.actionPeng(tileIds);
    if (response) {
      setGame(response); // Update game state

      mjStore.refresh(); // Refresh UI
    } else {
      console.error("Peng failed: No game data in response");
    }
  } catch (error) {
    console.error("Error invoking Peng:", error);
  }
}

async function handleGang(tileIds: [TileId, TileId, TileId]) {
  try {
    const response = await clientApi.actionGang(tileIds);
    if (response) {
      setGame(response); // Update game state

      mjStore.refresh(); // Refresh UI
    } else {
      console.error("Gang failed: No game data in response");
    }
  } catch (error) {
    console.error("Error invoking Gang:", error);
  }
}

async function Hu() {
  try {
    const response = await clientApi.actionHu();
    if (response) {
      setGame(response); // Update game state

      mjStore.refresh(); // Refresh UI
    } else {
      console.error("Hu failed: No game data in response");
    }
  } catch (error) {
    console.error("Error invoking Hu:", error);
  }
}
async function Zimo() {
  try {
    const response = await clientApi.actionZimo();
    if (response) {
      setGame(response); // Update game state

      mjStore.refresh(); // Refresh UI
    } else {
      console.error("Zimo failed: No game data in response");
    }
  } catch (error) {
    console.error("Error invoking Zimo:", error);
  }
}

</script>
