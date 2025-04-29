<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/public/svgs/Regular/Chun.svg" />
          </q-avatar>
          Online Mahjong
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <q-list>
        <q-item clickable v-ripple to="/example/connecting">
          <q-item-section>Connecting</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/example/sign-in">
          <q-item-section>Sign In</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/example/rooms">
          <q-item-section>Room</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/example/game">
          <q-item-section>Game</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
