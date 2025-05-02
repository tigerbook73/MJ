// import { mjGame } from "src/core/mjGame";
// import { wait } from "src/core/timer";
// import { useMjStore } from "src/justin/stores/mj-store";
// const mjStore = useMjStore();
// export async function autoPlay() {
//   while (mjStore.status) {
//     await waitNref();
//     mjGame.getTile();
//     await waitNref();
//     mjGame.selectTile();
//     await waitNref();
//     mjGame.discardTile();
//     await waitNref();
//     mjGame.sortTile();
//     await waitNref();
//     mjGame.updatePlayer();
//   }
// }

// async function waitNref() {
//   await wait(1500);
//   mjStore.refresh();
// }
