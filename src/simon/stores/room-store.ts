import { defineStore } from "pinia";
import type { RoomModel } from "src/common/models/room.model";
import type { Position } from "src/common/core/mj.game";
import { ref } from "vue";

export const roomStore = defineStore("room", () => {
  // room info
  const roomList = ref<RoomModel[]>([]);
  const currentRoom = ref<RoomModel | null>(null);
  const currentPosition = ref<Position | null>(null);

  function setRooms(rooms: RoomModel[]) {
    roomList.value = rooms;
  }

  function reset() {
    // reset room info
    roomList.value = [];
    currentRoom.value = null;
    currentPosition.value = null;
  }

  return {
    roomList,
    currentRoom,
    currentPosition,
    setRooms,
    reset,
  };
});
