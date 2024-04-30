import { MjCard } from "./mjCard";

export class MjCardWall {
  constructor(public position: string, public cards: MjCard[] = []) {
    this.position = position;
  }

  init() {
    this.cards = [];
  }

  add(card: MjCard) {
    this.cards.push(card);
  }

  print() {
    console.log("Wall position " + this.position + ": ");
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].print();
      process.stdout.write(",");

      if (i != 0) {
        if ((i + 1) % 17 == 0) {
          process.stdout.write("\n");
        }
      }
    }
  }
}
