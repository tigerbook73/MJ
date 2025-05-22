<template>
  <div :class="{ active: isActive }" class="fit row justify-center items-center">
    <span>{{ player.userName }}</span>

    <q-menu v-model="showingMenu" touch-position anchor="top middle" self="bottom middle">
      <q-list style="min-width: 100px">
        <q-item v-show="player?.type === UserType.Bot" clickable v-close-popup>
          <q-item-section @click="joinRoom">Join the room</q-item-section>
        </q-item>
        <q-item v-show="isActive" clickable v-close-popup>
          <q-item-section @click="leaveRoom">Leave the room</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { UserType } from "src/common/models/common.types";
import { userStore } from "src/simon/stores/user-store";
import { PlayerModel } from "src/common/models/player.model";
import { clientApi } from "src/client/client-api";

const props = defineProps<{
  player: PlayerModel;
}>();

const store = userStore();
const emits = defineEmits(["update"]);
const showingMenu = ref(false);

const isActive = computed(() => props.player?.userName === store.user?.email);

async function joinRoom() {
  try {
    await leaveRoom();

    // Make the socket request to join the room
    const response = await clientApi.joinRoom(props.player.roomName, props.player.position);

    if (response) {
      userStore().myPosition = props.player.position;
      emits("update");
    } else {
      alert(`Failed to join room: ${response}`);
    }
  } catch (error) {
    console.error("Error joining room:", error);
    alert("An error occurred while trying to join the room.");
  }
}

async function leaveRoom() {
  try {
    // Example API call to leave the room
    await clientApi.leaveRoom(props.player.roomName);
  } catch (error) {
    console.error("Error leaving room:", error);
    alert("An error occurred while trying to leave the room.");
  }
}
</script>

<style scoped>
.active {
  color: red;
}
</style>
