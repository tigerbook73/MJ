<template>
  <div class="mj-tile flex justify-center items-center" :style="tileStyle">
    <q-img :src="src" :ratio="1 / 1" fit="scale-down" :width="width" :style="imgStyle"></q-img>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  id?: string;
  type: string;
  position?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
  type: "",
  position: "bottom",
});

const imageNames: Record<string, string> = {
  一条: "Sou1.svg",
  二条: "Sou2.svg",
  三条: "Sou3.svg",
  四条: "Sou4.svg",
  五条: "Sou5.svg",
  六条: "Sou6.svg",
  七条: "Sou7.svg",
  八条: "Sou8.svg",
  九条: "Sou9.svg",
  一筒: "Pin1.svg",
  二筒: "Pin2.svg",
  三筒: "Pin3.svg",
  四筒: "Pin4.svg",
  五筒: "Pin5.svg",
  六筒: "Pin6.svg",
  七筒: "Pin7.svg",
  八筒: "Pin8.svg",
  九筒: "Pin9.svg",
  一万: "Man1.svg",
  二万: "Man2.svg",
  三万: "Man3.svg",
  四万: "Man4.svg",
  五万: "Man5.svg",
  六万: "Man6.svg",
  七万: "Man7.svg",
  八万: "Man8.svg",
  九万: "Man9.svg",
  东: "Ton.svg",
  南: "Nan.svg",
  西: "Shaa.svg",
  北: "Pei.svg",
  中: "Chun.svg",
  發: "Hatsu.svg",
  白: "Haku.svg",
};

const randomType = () => {
  const keys = Object.keys(imageNames);
  return keys[Math.floor(Math.random() * keys.length)];
};

const src = computed(() => {
  const type = imageNames[props.type] ? props.type : randomType();
  return `/svgs/Regular/${imageNames[type]}`;
});

console.log(src.value);

const width = "3vh";
const height = "4.2vh";

const tileStyle = computed(() =>
  props.position == "left" || props.position == "right"
    ? { width: height, height: width }
    : { width, height }
);

const imgStyle = ref({
  width: width,
  transform:
    props.position == "top"
      ? "rotate(180deg)"
      : props.position == "right"
      ? "rotate(-90deg)"
      : props.position == "left"
      ? "rotate(90deg)"
      : "none",
});
</script>

<style lang="scss">
.mj-tile {
  // margin: 1px;
  background-color: #f0f0f0;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
  &:hover {
    background-color: #000;
    color: #f0f0f0;
  }
}
</style>
