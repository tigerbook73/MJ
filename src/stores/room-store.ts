import { defineStore } from "pinia";
import { RoomModel } from "src/common/models/room.model";
import { ref } from "vue";

export const roomStore = defineStore("room", () => {
  const roomList = ref<RoomModel[]>([]);

  function setRooms(rooms: RoomModel[]) {
    roomList.value = rooms;
  }

  return { roomList, setRooms };
});
