<template>
  <div class="row flex-center" :class="tileClass" :style="tileStyle">
    <q-img v-if="showImage" :src="imgSrc" :ratio="0.95" fit="scale-down" :width="width" :class="imageClass"></q-img>
  </div>
</template>

<script lang="ts">
export interface GameTileProp {
  id: TileId;
  direction: Direction;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  back?: boolean;
  selected?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { TileCore, type TileId } from "@common/core/mj.tile-core";
import { Direction } from "../common/common";

const props = withDefaults(defineProps<{ tile: GameTileProp }>(), {
  tile: () => ({
    // default values
    id: TileCore.voidId,
    direction: Direction.Bottom,
    size: "sm",
    back: false,
    selected: false,
  }),
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
  发: "Hatsu.svg",
  白: "Haku.svg",
};

const imgSrc = computed(() => {
  const name = TileCore.fromId(props.tile.id).name;
  return imageNames[name] ? `/svgs/Regular/${imageNames[name]}` : "/svgs/Black/Blank.svg";
});

const showImage = computed(() => {
  return props.tile.id !== TileCore.voidId && !props.tile.back;
});

const sizeMap = {
  xs: 2.8,
  sm: 3,
  md: 3.5,
  lg: 4,
  xl: 5,
};
const size = typeof props.tile.size === "number" ? props.tile.size : sizeMap[props.tile.size || "md"];
const width = `${size}vmin`;
const height = `${(size * 4) / 3}vmin`;

const tileClass = computed(() => ({
  tile: props.tile.id !== TileCore.voidId && !props.tile.back,
  tile_back: props.tile.id !== TileCore.voidId && props.tile.back,
  tile_selected: props.tile.selected,
}));

const tileStyle = {
  width: props.tile.direction == Direction.Top || props.tile.direction == Direction.Bottom ? width : height,
  height: props.tile.direction == Direction.Top || props.tile.direction == Direction.Bottom ? height : width,
};

const imageClass = computed(() => ({
  image_top: props.tile.direction == Direction.Top,
  image_bottom: props.tile.direction == Direction.Bottom,
  image_left: props.tile.direction == Direction.Left,
  image_right: props.tile.direction == Direction.Right,
}));
</script>

<style lang="scss">
.tile {
  background-color: #f0f0f0;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
  &:hover {
    filter: invert(1);
  }
}

.tile_back {
  background-color: darkslategray;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
}

.tile_selected {
  position: relative;
  top: -8px;
}

.image_top {
  transform: rotate(180deg);
}

.image_bottom {
  transform: none;
}

.image_left {
  transform: rotate(90deg);
}

.image_right {
  transform: rotate(-90deg);
}
</style>
