<template>
  <q-card class="room column">
    <!-- Top (North) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <div no-caps flat class="col-6 bg-blue-4 column flex-center area-player">
          <position-player :player="northPlayer" @update="emits('update')" />
        </div>

        <div class="col-3"></div>
      </div>
    </div>

    <!-- Center (West, Room Name, East) -->
    <div class="col-6">
      <div class="row full-height">
        <!-- West -->
        <div no-caps flat class="col-3 bg-blue-4 column flex-center area-player">
          <position-player :player="westPlayer" @update="emits('update')" />
        </div>

        <!-- Room Name -->
        <div class="col-6 bg-green-4 row flex-center">
          <div>{{ roomName }}</div>
          <!-- start game button using startGame-->
          <q-btn color="primary" label="Start Game" @click="startGame" :disable="!canStartGame" class="q-mt-md"></q-btn>
        </div>

        <!-- East -->
        <div no-caps flat class="col-3 bg-blue-4 column flex-center area-player">
          <position-player :player="eastPlayer" @update="emits('update')" />
        </div>
      </div>
    </div>

    <!-- Bottom (South) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <div no-caps flat class="col-6 bg-blue-4 column flex-center area-player">
          <position-player :player="southPlayer" @update="emits('update')" />
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { PlayerPosition, UserType } from "src/common/models/common.types";
import { socketStartGameAndWaitAck } from "src/websocket/client.api";
import { computed } from "vue";
import { useRouter } from "vue-router";
import PositionPlayer from "./PositionPlayer.vue";
import { PlayerModel } from "src/common/models/player.model";

interface Props {
  roomName: string;
  players: PlayerModel[];
}

const emits = defineEmits(["update"]);
const props = withDefaults(defineProps<Props>(), {
  roomName: "",
  players: () => [],
});

const northPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.North) as PlayerModel;
});

const southPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.South) as PlayerModel;
});

const westPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.West) as PlayerModel;
});

const eastPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.East) as PlayerModel;
});

const router = useRouter();

const canStartGame = computed(() => {
  return props.players.some((player) => player.type === UserType.Human);
});

// function startGame using socketStartGameAndWaitAck
async function startGame() {
  try {
    const response = await socketStartGameAndWaitAck(props.roomName);

    if (response.status === "success") {
      router.push("/game-page");
    } else {
      alert(`Failed to start game: ${response.message}`);
    }
  } catch (error) {
    console.error("Error starting game:", error);
    alert("An error occurred while trying to start the game.");
  }
}
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: white;
}
</style>
