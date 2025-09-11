<template>
  <div>
    <div class="flex justify-center items-center" :class="tileClass" :style="tileStyle">
      <q-img
        v-if="props.type && (mjStore.open || !props.back)"
        :src="imgSrc"
        :ratio="1 / 1"
        fit="scale-down"
        :width="width"
        :style="imgStyle"
      ></q-img>
    </div>
  </div>
</template>
<!-- v-if="props.type && (!props.back || mjStore.open)" -->

<script setup lang="ts">
import type { StyleValue } from "vue";
import { computed, ref } from "vue";
import { useMjStore } from "src/justin/stores/mj-store";

interface Props {
  id?: string;
  type: string | undefined;
  position?: string;
  size?: "small" | "large";
  back?: boolean;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
  type: "",
  position: "bottom",
  size: "small",
  back: false,
  selected: false,
});

const mjStore = useMjStore();

const imageNames: Record<string, string> = {
  m1: "Man1.svg",
  m2: "Man2.svg",
  m3: "Man3.svg",
  m4: "Man4.svg",
  m5: "Man5.svg",
  m6: "Man6.svg",
  m7: "Man7.svg",
  m8: "Man8.svg",
  m9: "Man9.svg",
  p1: "Pin1.svg",
  p2: "Pin2.svg",
  p3: "Pin3.svg",
  p4: "Pin4.svg",
  p5: "Pin5.svg",
  p6: "Pin6.svg",
  p7: "Pin7.svg",
  p8: "Pin8.svg",
  p9: "Pin9.svg",
  s1: "Sou1.svg",
  s2: "Sou2.svg",
  s3: "Sou3.svg",
  s4: "Sou4.svg",
  s5: "Sou5.svg",
  s6: "Sou6.svg",
  s7: "Sou7.svg",
  s8: "Sou8.svg",
  s9: "Sou9.svg",
  z1: "Ton.svg",
  z2: "Nan.svg",
  z3: "Shaa.svg",
  z4: "Pei.svg",
  z5: "Haku.svg",
  z6: "Hatsu.svg",
  z7: "Chun.svg",
};

const imgSrc = computed(() => {
  return imageNames[props.type] ? `/svgs/Regular/${imageNames[props.type]}` : "/svgs/Black/Blank.svg";
});

const width = props.size == "small" ? "3vh" : "3.5vh";
const height = props.size == "small" ? "4.2vh" : "4.8vh";

const tileClass = computed(() => (props.type ? (props.back && !mjStore.open ? "mj-tile-back" : "mj-tile") : ""));
const tileStyle = computed(
  () =>
    ({
      width: props.position == "left" || props.position == "right" ? height : width,
      height: props.position == "left" || props.position == "right" ? width : height,
      position: "relative",
      top: verticalTrans(props.selected, props.position),
      left: horizontalTrans(props.selected, props.position),
    }) as StyleValue,
);
function verticalTrans(selected: boolean, position: string) {
  if (selected) {
    if (position == "bottom") {
      return "-15px";
    }
    if (position == "top") {
      return "15px";
    }
    return "0px";
  }
}
function horizontalTrans(selected: boolean, position: string) {
  if (selected) {
    if (position == "left") {
      return "15px";
    }
    if (position == "right") {
      return "-15px";
    }
    return "0px";
  }
}

const rotate: Record<string, string> = {
  top: "rotate(180deg)",
  right: "rotate(-90deg)",
  left: "rotate(90deg)",
  bottom: "none",
};
const imgStyle = ref({ width: width, transform: rotate[props.position] || "none", position: "relative" });
</script>

<style lang="scss">
.mj-tile {
  // margin: 1px;
  background-color: #f0f0f0;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
  &:hover {
    background-color: #8f8f8f;
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
