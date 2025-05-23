import { clientApi } from "src/client/client-api";
import { Game } from "../../../server/src/common/core/mj.game";
import type { GameEvent } from "../../../server/src/common/protocols/apis.models";
import { useMjStore } from "src/justin/stores/mj-store";

class MjGame extends Game {}

export let mjGame = new MjGame();
const mjStore = useMjStore();

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);
  const game = clientApi.findMyGame(event);

  if (!game) {
    console.warn("No game found in event.");
    return;
  }

  handleGameUpdate(game);
});

export function setGame(game: Game) {
  mjGame = game;
}

function handleGameUpdate(game: Game) {
  setGame(game);
  mjStore.refresh();
}
