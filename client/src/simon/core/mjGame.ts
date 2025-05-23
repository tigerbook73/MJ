import { Game } from "@common/core/mj.game";

export class MjGame extends Game {
  constructor() {
    super();
  }
}

export let mjGame = new MjGame();

export function setGame(game: Game) {
  mjGame = game;
}
