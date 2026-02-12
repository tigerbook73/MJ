import { Game } from "@mj/shared";

export class MjGame extends Game {
  constructor() {
    super();
  }
}

export let mjGame = new MjGame();

export function setGame(game: Game) {
  mjGame = game;
}
