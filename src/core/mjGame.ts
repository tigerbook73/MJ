import { Game } from "src/common/core/mj.game";

class MjGame extends Game {
  isWinning(): boolean {
    return this.players[this.playerIndex].hand.length === 0;
  }
  isStarted() {
    if (this.status == "started") {
      return true;
    }
    if (this.status == "single") {
      return true;
    }
    return false;
  }
}

export const mjGame = new MjGame();
