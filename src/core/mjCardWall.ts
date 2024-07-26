import { MjCard } from "./mjCard";

export class MjCardWall {
  constructor(
    public position: string,
    public cards: MjCard[] = [],
  ) {
    this.position = position;
  }

  init() {
    this.cards = [];
  }

  add(card: MjCard) {
    this.cards.push(card);
  }
}
