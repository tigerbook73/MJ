import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";
import { wait } from "src/utils/timer";
// import { voidTileId } from "src/core/mjCard";

const mjStore = useMjStore();

export async function autoplay() {
  //
  while (mjGame.state === State.Start && !mjGame.canHu()) {
    await waitIf();
    mjGame.pick();
    mjStore.refresh();
    await waitIf();
    selectedCard();
    await waitIf();
    mjGame.discard();
    await waitIf();
    mjGame.sort();
    mjStore.refresh();
    await waitIf();
    mjGame.nextPlayer();
    mjStore.refresh();
    await waitIf();
  }
}

function selectedCard() {
  mjStore.selectedCard = {
    name: mjGame.findDiscardCard().name,
    id: mjGame.findDiscardCard().id,
    options: { selected: false },
  };
}

async function waitIf() {
  while (mjGame.paused) {
    await wait(100);
  }
  await wait(1000);
}
