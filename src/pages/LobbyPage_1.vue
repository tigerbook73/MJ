<template>
  <q-page class="column flex-center">
    <q-card class="row" style="width: 90%">
      <q-card-section class="col flex-center">
        <q-card-section class="row">
          <q-btn>1</q-btn>
          <q-btn>1</q-btn>
        </q-card-section>
        <q-card-section class="row">
          <q-btn>1</q-btn>
          <q-btn>1</q-btn>
        </q-card-section>
      </q-card-section>
      <q-separator vertical color="red" />
      <div class="column flex-center">
        <div>current selection:</div>
        <div>{{ currentSelection }}</div>
        <q-btn @click="logout">Sign Out</q-btn>
        <q-btn>Refresh</q-btn>
        <q-btn>New/Delete Room</q-btn>
        <q-btn>Join/Leave</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { sendSignout } from "src/websocket/client.api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import LobbyDiv from "src/components/LobbyDiv.vue";

const currentSelection = ref("None");
const router = useRouter();

async function logout() {
  const response = await sendSignout();
  const userStore = useUserStore();
  if (response.status == "success") {
    userStore.user = null;
    router.push("/login");
  }
}
</script>
