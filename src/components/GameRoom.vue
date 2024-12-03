<template>
  <q-card class="room column q-pa-sm bg-blue-1">
    <div class="col-3">
      <div class="row full-height">
        <q-space />
        <div class="row flex-center">
          <q-btn color="primary">{{ props.players[3] }}</q-btn>
        </div>
        <q-space />
      </div>
    </div>

    <div class="col-6 row">
      <div class="col-3 row flex-center">
        <q-btn color="primary">{{ props.players[2] }}</q-btn>
      </div>

      <div class="col-6 row flex-center bg-grey-3">
        <div class="">{{ props.name }}</div>
      </div>

      <div class="col-3 row flex-center">
        <q-btn color="primary"> {{ props.players[1] }} </q-btn>
      </div>
    </div>

    <div class="col-3">
      <div class="row full-height">
        <q-space />
        <div class="row flex-center">
          <q-btn color="primary">{{ props.players[0] }}</q-btn>
        </div>
        <q-space />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameRoom",
});

interface Props {
  name: string;
  players: string[];
}

const props = withDefaults(defineProps<Props>(), {
  name: "default",
  players: () => ["", "", "", ""],
});
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
}
</style>
