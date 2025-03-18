<template>
  <div>
    <q-btn :disable="!mjStore.canHu" @click="Hu">Hu</q-btn> <q-btn :disable="!mjStore.canHu" @click="Zimo">Zimo</q-btn>
  </div>
</template>

<script setup lang="ts">
// import { mjGame } from "src/core/mjGame";
import { clientApi } from "src/client/client-api";
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

defineOptions({
  name: "GameAreaC",
});

function Hu() {
  // //
  // mjGame.canHu();
  // mjStore.refresh();
}

async function Zimo() {
  try {
    const response = await clientApi.actionZimo();
    if (response) {
      mjGame.zimo(); // Update game state
      mjStore.refresh(); // Refresh UI
    } else {
      console.error("Zimo failed: No game data in response");
    }
  } catch (error) {
    console.error("Error invoking Zimo:", error);
  }
}
</script>
