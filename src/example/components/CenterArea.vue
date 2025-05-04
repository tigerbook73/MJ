<template>
  <div class="column bg-green-5">
    <!-- top -->
    <div class="col-3 row flex-center">
      <q-space />
      <q-chip><div class="rotate-180">上</div></q-chip>
      <q-space />
    </div>

    <!-- center -->
    <div class="col-6 row flex-center">
      <div class="col-3 row flex-center">
        <q-chip><div class="rotate-90">左</div></q-chip>
      </div>
      <div class="col row flex-center">
        <q-btn color="dark">start / pause / reset</q-btn>
      </div>
      <div class="col-3 row flex-center">
        <q-chip><div class="rotate-270">右</div></q-chip>
      </div>
    </div>

    <!-- bottom -->
    <div class="col-3 row flex-center">
      <q-space />
      <q-chip>下</q-chip>
      <q-space />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
