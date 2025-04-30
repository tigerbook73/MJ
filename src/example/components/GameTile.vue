<template>
  <div>
    <div class="flex justify-center items-center" :class="tileClass" :style="tileStyle">
      <q-img :src="imgSrc" :ratio="0.95" fit="scale-down" :width="width" :class="imageClass"></q-img>
    </div>
  </div>
</template>

<script lang="ts">
export interface GameTileProp {
  id: TileId;
  position: "top" | "left" | "right" | "bottom";
  size?: "small" | "large";
  back?: boolean;
  selected?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { TileCore, TileId } from "src/common/core/mj.tile-core";

const props = withDefaults(defineProps<{ tile: GameTileProp }>(), {
  tile: () => ({
    // default values
    id: TileCore.voidId,
    position: "bottom",
    size: "small",
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

// const width = props.tile.size == "small" ? "3vh" : "3.5vh";
// const height = props.tile.size == "small" ? "4vh" : "4.7vh";
const width = props.tile.size == "small" ? "3vh" : "3.5vh";
const height = props.tile.size == "small" ? "4vh" : "4.7vh";

const tileClass = computed(() => ({
  position: "relative",
  tile: !props.tile.back,
  tile_back: props.tile.back,
  tile_top: props.tile.position == "top",
  tile_bottom: props.tile.position == "bottom",
  tile_left: props.tile.position == "left",
  tile_right: props.tile.position == "right",
}));

const tileStyle = {
  width: props.tile.position == "top" || props.tile.position == "bottom" ? width : height,
  height: props.tile.position == "top" || props.tile.position == "bottom" ? height : width,
};

const imageClass = computed(() => ({
  image_top: props.tile.position == "top",
  image_bottom: props.tile.position == "bottom",
  image_left: props.tile.position == "left",
  image_right: props.tile.position == "right",
}));
</script>

<style lang="scss">
.tile {
  background-color: #f0f0f0;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
  &:hover {
    background-color: #000;
    color: #f0f0f0;
  }
}

.tile_back {
  background-color: gray;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
}

.tile_top {
  aspect-ratio: 3 / 4;
}

.tile_bottom {
  aspect-ratio: 3 / 4;
}

.tile_left {
  aspect-ratio: 4 / 3;
}

.tile_right {
  aspect-ratio: 4 / 3;
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
