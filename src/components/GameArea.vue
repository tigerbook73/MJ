<template>
  <div class="column area-game">
    <!-- top -->
    <div class="row h-10">
      <game-area-a class="w-10" @start-game="start"></game-area-a>
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
      <player-area-bottom class="w-70" @drop-tile="dropTile" @pass-turn="passTurn"></player-area-bottom>
      <game-area-d class="w-10"></game-area-d>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameArea",
});

import BoardArea from "components/BoardArea.vue";
import GameAreaA from "components/GameAreaA.vue";
import GameAreaB from "components/GameAreaB.vue";
import GameAreaC from "components/GameAreaC.vue";
import GameAreaD from "components/GameAreaD.vue";
import PlayerAreaBottom from "components/PlayerAreaBottom.vue";
import PlayerAreaLeft from "components/PlayerAreaLeft.vue";
import PlayerAreaRight from "components/PlayerAreaRight.vue";
import PlayerAreaTop from "components/PlayerAreaTop.vue";
import { clientApi } from "src/client/client-api";
import { Game, Position } from "src/common/core/mj.game";
import { GameEvent } from "src/common/protocols/apis.models";
import { setGame, mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

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

async function dropTile() {
  try {
    if (!mjStore.p4Cards.some((tile) => tile.id === mjStore.selectedCard.id)) {
      console.error("Selected tile is not in hand.");
      return;
    }

    const response = await clientApi.actionDrop(mjStore.selectedCard.id);
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
    if (mjStore.current?.position === Position.East) {
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

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);
  const game = clientApi.findMyGame(event);

  if (!game) {
    console.warn("No game found in event.");
    return;
  }

  handleGameUpdate(game);
});

function handleGameUpdate(game: Game) {
  setGame(game); // 🔁 Sync the global mjGame
  mjStore.refresh(); // 🔃 Refresh the UI

  // ✅ Optional: Handle game flow logic here
  // Example: if (mjGame.canZimo()) showZimoButton();
  // Example: startAutoPlayTimer();
}
</script>
