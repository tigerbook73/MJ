<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <!-- <q-toolbar>
        <q-toolbar-title> MJ App </q-toolbar-title>

        <div>MJ v0.1</div>
      </q-toolbar> -->
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { clientApi } from "src/client/client-api";
import { GameEvent } from "src/common/protocols/apis.models";
import { useMjStore } from "src/justin/stores/mj-store";
defineOptions({
  name: "MainLayout",
});
const mjStore = useMjStore();

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);

  mjStore.setGame(clientApi.findMyGame(event));
  mjStore.room = clientApi.findMyRoom(event);
  mjStore.roomList = event.data.rooms;
  mjStore.position = clientApi.findMyPlayerModel(event)?.position ?? null;
});
</script>
