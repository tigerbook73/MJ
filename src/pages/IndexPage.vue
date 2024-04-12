<template>
  <q-page class="row justify-center items-center">
    <div class="column w-90 h-90 bg-blue-2">
      <div class="row h-10">
        <div class="w-10">T1:L1</div>
        <div class="w-70 bg-blue-4">T1:L2-8</div>
        <div class="w-10">T1L9</div>
      </div>
      <div class="row h-70">
        <div class="w-10 bg-blue-4">T2-8:L1</div>
        <div class="column w-70 bg-brown-3">
          <!-- center -->
          <div class="row h-10">
            <div class="w-10 bg-brown-2">T2:L2</div>
            <div class="column justify-center items-center w-50">
              <div class="row">
                <mj-tile v-for="i in 18" :key="i" title=""></mj-tile>
              </div>
              <div class="row">
                <mj-tile v-for="i in 18" :key="i" title=""></mj-tile>
              </div>
            </div>
            <div class="w-10 bg-brown-2">T2L8</div>
          </div>
          <div class="row h-50">
            <div class="row justify-center items-center w-10">
              <div class="column">
                <mj-tile v-for="i in 18" :key="i" title="" :rotate="true"></mj-tile>
              </div>
              <div class="column">
                <mj-tile v-for="i in 18" :key="i" title="" :rotate="true"></mj-tile>
              </div>
            </div>
            <div class="w-50 bg-green-4">T3-7:L3-7</div>
            <div class="row justify-center items-center w-10">
              <div class="column">
                <mj-tile v-for="i in 18" :key="i" title="" :rotate="true"></mj-tile>
              </div>
              <div class="column">
                <mj-tile v-for="i in 18" :key="i" title="" :rotate="true"></mj-tile>
              </div>
            </div>
          </div>
          <div class="row h-10">
            <div class="w-10 bg-brown-2">T7:L2</div>
            <div class="column justify-center items-center w-50">
              <div class="row">
                <mj-tile v-for="i in 18" :key="i" title=""></mj-tile>
              </div>
              <div class="row">
                <mj-tile v-for="i in 18" :key="i" title=""></mj-tile>
              </div>
            </div>
            <div class="w-10 bg-brown-2">T8:L8</div>
          </div>
        </div>
        <div class="w-10 bg-blue-5">T2-8:L9</div>
      </div>
      <div class="row h-10">
        <div class="w-10 bg-brown-2">T9:L1</div>
        <div class="column bg-blue-4">
          <div class="h-5">T9:L2-8</div>
          <div class="row justify-center items-center w-70">
            <mj-tile v-for="i in 13" :key="i" :title="i.toString()"></mj-tile>
          </div>
        </div>
        <div class="w-10">T9:L9</div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MjTile from "components/MjTile.vue";

defineOptions({
  name: "IndexPage",
});
</script>
