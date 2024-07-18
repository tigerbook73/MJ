<template>
  <q-page class="row">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div class="column fit">
          <q-scroll-area ref="scrollArea" class="q-pa-md column justify-start col">
            <q-chat-message
              v-for="(message, index) in messages"
              :key="index"
              :text="message.text"
              :sent="message.sent"
            />
          </q-scroll-area>
          <div class="q-px-md q-py-sm">
            <q-input v-model="cmd" outlined @keyup.enter="onCommand"></q-input>
          </div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
          <div v-for="n in 2" :key="n" class="q-my-md">
            {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.
          </div>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "ClientPage",
});

import { QScrollArea } from "quasar";
import { ref } from "vue";

const scrollArea = ref<QScrollArea>();

const splitterModel = ref(50);

const messages = ref<{ text: string[]; sent: boolean }[]>([]);
const cmd = ref("");

function onCommand() {
  messages.value.push({ text: [cmd.value], sent: true });
  messages.value.push({ text: ["response to ...", cmd.value], sent: false });

  scrollArea.value?.setScrollPercentage("vertical", 100);
  cmd.value = "";
}
</script>
