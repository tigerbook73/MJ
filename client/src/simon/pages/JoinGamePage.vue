<template>
  <q-page class="page-join q-pa-xl">
    <!-- 顶部标题区 -->
    <div class="hero">
      <h1 class="hero__title">Join a Game Room</h1>
      <p class="hero__subtitle">Pick a room and start a match with bots or friends.</p>
      <q-btn
        class="hero__refresh q-mt-md"
        color="primary"
        unelevated
        :loading="loading"
        icon="refresh"
        label="Refresh Rooms"
        @click="refreshRooms"
      />
    </div>

    <!-- 这里放你原本的房间内容（保持你原有结构，不受网格/卡片限制） -->

    <div class="rooms-flow q-mt-xl">
      <div class="room-item" v-for="(room, index) in rooms" :key="index">
        <GameRoom :roomName="room.name" :players="room.players" @update="refreshRooms" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom from "src/simon/components/GameRoom.vue";
// import { useRouter } from "vue-router";
import { computed, ref } from "vue";
// import { PlayerModel } from "@/common/models/player.model";
import { socketClient } from "src/client/socket-client";
import { roomStore } from "src/simon/stores/room-store";

defineOptions({
  name: "JoinGamePage",
});
// const router = useRouter();
const useRoomStore = roomStore();
/**
 * define room interface
 * define rooms array ref var
 * define refresh() function, which will call listRoomRequest() and update rooms ref var
 * call refresh()
 * define a button to call refresh()
 */

// import roomList from room store

// define room interface
// interface Room {
//   name: string;
//   players: PlayerModel[];
// }

// define rooms array from room store
const rooms = computed(() => useRoomStore.roomList);
const loading = ref<boolean>(false); // Tracks loading state

// define refresh() function, which will call listRoomRequest() and update rooms ref var
// Refresh the list of available rooms
async function refreshRooms() {
  loading.value = true;

  try {
    const response = await socketClient.listRoom();

    if (response && response.length > 0) {
      // rooms = response.map((room) => ({
      //   name: room.name,
      //   players: room.players,
      // }));
      useRoomStore.setRooms(response);
    } else {
      alert(`Failed to fetch rooms: ${JSON.stringify(response)}`);
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    alert("An error occurred while fetching rooms.");
  } finally {
    loading.value = false;
  }
}

refreshRooms();
</script>

<!-- <style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: lightblue;
}
</style> -->
<style scoped>
/* 主题基色（可按需调整） */
:root {
  --c-bg-1: #f6f9ff;
  --c-bg-2: #eef3ff;
  --c-ink: #0f172a;
  --c-muted: #64748b;
  --c-card: #ffffff;
  --shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
}

.page-join {
  min-height: 100%;
  /* 柔和渐变背景 + 轻微网格噪点感 */
  background:
    radial-gradient(1200px 600px at 50% -10%, var(--c-bg-1), transparent 60%),
    radial-gradient(900px 500px at 120% 0%, var(--c-bg-2), transparent 55%),
    linear-gradient(180deg, #fff, #f8fafc 40%, #f1f5f9);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 顶部标题区 */
.hero {
  text-align: center;
  max-width: 980px;
  width: 100%;
  margin-top: 8px;
}

.hero__title {
  margin: 0;
  font-size: clamp(28px, 6vw, 56px);
  line-height: 1.1;
  letter-spacing: 0.3px;
  font-weight: 800;
  background: linear-gradient(90deg, #111827, #334155, #111827);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__subtitle {
  margin: 8px 0 0;
  font-size: clamp(14px, 2.2vw, 18px);
  color: var(--c-muted);
}

.hero__refresh {
  padding: 8px 18px;
  border-radius: 14px;
  box-shadow: var(--shadow);
}

/* 房间网格：自适应列数，卡片大小一致 */
.rooms-grid {
  width: min(1200px, 100%);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* 卡片样式与交互 */
.room-card {
  background: var(--c-card);
  border-radius: 16px;
  box-shadow: var(--shadow);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
  border: 1px solid rgba(2, 6, 23, 0.06);
  overflow: hidden;
}

.room-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.1);
  border-color: rgba(2, 6, 23, 0.12);
}

.room-card__content {
  padding: 16px;
}

.rooms-flow {
  width: min(1200px, 100%);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  /* 每列最小 360px，能并排就并排 */
  gap: 24px;
  justify-items: center;
  /* 卡片居中 */
}

/* 单个房间外层，控制最大宽度（避免拉太宽） */
.room-item {
  width: 100%;
  max-width: 520px;
  /* 依据你的 GameRoom 视觉尺寸可微调 */
}

/* 细节：在较窄屏幕时内边距略小，网格更紧凑 */
@media (max-width: 600px) {
  .page-join {
    padding: 16px;
  }

  .rooms-grid {
    gap: 14px;
  }

  .room-card__content {
    padding: 12px;
  }
}
</style>
