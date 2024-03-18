<template>
  <q-page class="column justify-center">
    <div class="row justify-center">
      <mj-tile
        v-for="(item, index) in charTiles"
        :key="index"
        :title="item.title"
        :top="20 + 'px'"
        :left="index * 32 + 20 + 'px'"
      ></mj-tile>

      <mj-tile
        v-for="(item, index) in barTiles"
        :key="index"
        :title="item.title"
        :top="80 + 'px'"
        :left="index * 32 + 20 + 'px'"
      ></mj-tile>

      <mj-tile
        v-for="(item, index) in dotTiles"
        :key="index"
        :title="item.title"
        :top="140 + 'px'"
        :left="index * 32 + 20 + 'px'"
      ></mj-tile>

      <mj-tile
        v-for="(item, index) in windTiles"
        :key="index"
        :title="item.title"
        :top="200 + 'px'"
        :left="index * 32 + 20 + 'px'"
      ></mj-tile>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MjTile from 'components/MjTile.vue';

defineOptions({
  name: 'IndexPage',
});

const charTiles = ref([
  { title: '壹萬' },
  { title: '贰萬' },
  { title: '叁萬' },
  { title: '四萬' },
  { title: '伍萬' },
  { title: '陆萬' },
  { title: '柒萬' },
  { title: '捌萬' },
  { title: '玖萬' },
]);

const barTiles = ref([
  { title: '壹条' },
  { title: '贰条' },
  { title: '叁条' },
  { title: '四条' },
  { title: '伍条' },
  { title: '陆条' },
  { title: '柒条' },
  { title: '捌条' },
  { title: '玖条' },
]);

const dotTiles = ref([
  { title: '壹桶' },
  { title: '贰桶' },
  { title: '叁桶' },
  { title: '四桶' },
  { title: '伍桶' },
  { title: '陆桶' },
  { title: '柒桶' },
  { title: '捌桶' },
  { title: '玖桶' },
]);

const windTiles = ref([
  { title: '東' },
  { title: '南' },
  { title: '西' },
  { title: '北' },
  { title: '中' },
  { title: '發' },
  { title: '白' },
]);
</script>
