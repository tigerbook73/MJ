<template>
  <div @click="select">
    <div class="flex justify-center items-center" :class="tileClass" :style="tileStyle">
      <q-img
        v-if="props.type.name && shouldShowImg"
        :src="imgSrc"
        :ratio="1 / 1"
        fit="scale-down"
        :width="width"
        :style="imgStyle"
      ></q-img>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";
import { computed, ref } from "vue";
import { useMjStore } from "src/simon/stores/mj-store";
import { TileCore } from "@mj/shared";
// import { voidTileId } from "src/simon/core/mjCard";

interface Props {
  id?: string;
  type: { name: string; id: number; options: { selected: boolean } };
  position?: string;
  size?: "small" | "large";
  back?: boolean;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
  type: () => ({ name: "", id: TileCore.voidId, options: { selected: false } }),
  position: "bottom",
  size: "small",
  back: false,
  selected: false,
});

const mjStore = useMjStore();

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
  发: "Hatsu.svg",
  白: "Haku.svg",
};

const imgSrc = computed(() => {
  return imageNames[props.type.name] ? `/svgs/Regular/${imageNames[props.type.name]}` : "/svgs/Black/Blank.svg";
});

const width = props.size == "small" ? "3vh" : "3.5vh";
const height = props.size == "small" ? "4.2vh" : "4.8vh";
const isVoidSlot = computed(() => props.type.id === TileCore.voidId || props.type.id === -1);

// 显示图片的条件：空位一定显示；否则沿用 back/open 的老规则
const shouldShowImg = computed(() => isVoidSlot.value || (!!props.type.name && (!props.back || mjStore.open)));
const tileClass = computed(() => {
  if (!isVoidSlot.value && props.back && !mjStore.open) {
    return "mj-tile-back";
  }
  if (!props.type.name) {
    return "";
  }
  if (props.type.options.selected) {
    return "mj-tile-selected";
  }
  return "mj-tile";
});
const tileStyle = computed(() => {
  if (props.position == "top") {
    return {
      width: width,
      height: height,
      position: "relative",
      top: props.selected ? "20px" : "0px",
    } as StyleValue;
  } else if (props.position == "bottom") {
    return {
      width: width,
      height: height,
      position: "relative",
      bottom: props.selected ? "20px" : "0px",
    } as StyleValue;
  } else if (props.position == "left") {
    return {
      width: props.position == "left" ? height : width,
      height: props.position == "left" ? width : height,
      position: "relative",
      left: props.selected ? "20px" : "0px",
    } as StyleValue;
  }
  return {
    width: props.position == "right" ? height : width,
    height: props.position == "right" ? width : height,
    position: "relative",
    right: props.selected ? "20px" : "0px",
  } as StyleValue;
});

const rotate: Record<string, string> = {
  top: "rotate(180deg)",
  right: "rotate(-90deg)",
  left: "rotate(90deg)",
  bottom: "none",
};
const imgStyle = ref({
  width: width,
  transform: rotate[props.position] || "none",
  position: "relative",
});

function select() {}
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

.mj-tile-selected {
  // margin: 1px;
  background-color: #f0f000;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;

  &:hover {
    background-color: #f0f000;
    color: #f0f0f0;
  }
}

.mj-tile-back {
  background-color: gray;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
}
</style>
