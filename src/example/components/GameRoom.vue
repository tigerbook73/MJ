<template>
  <div class="fit flex column bg-blue-3 text-center">
    <!-- top -->
    <div class="row col-3">
      <q-space />
      <div class="col-6 column flex-center bg-yellow-3">
        <div>北</div>
        <div>north player</div>
      </div>
      <q-space />
    </div>

    <!-- middle -->
    <div class="row col-6">
      <!-- left -->
      <div class="col-3 column flex-center bg-yellow-3">
        <div>西</div>
        <div>west player</div>
      </div>
      <div class="col-6 row flex-center bg-green-3">{{ props.room.name }}</div>
      <div class="col-3 column flex-center bg-yellow-3">
        <div>東</div>
        <div>east player</div>
      </div>
    </div>

    <!-- bottom -->
    <div class="row col-3">
      <q-space />
      <div class="col-6 column flex-center bg-yellow-3">
        <div>南</div>
        <div>south player</div>
      </div>
      <q-space />
    </div>
  </div>
</template>

<script lang="ts">
export interface GameRoomProp {
  id: number;
  name: string;
}
</script>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  room: GameRoomProp;
}>();
</script>
