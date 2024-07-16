import { MjCard, voidMjCard } from "./mjCard";

export class MjPlayer {
  constructor(
    public position: string,
    public hand: MjCard[] = [],
    public catchCard: MjCard = voidMjCard,
    public discard: MjCard[] = [],
  ) {}

  init() {
    this.hand = [];
    this.catchCard = voidMjCard;
  }

  sortHand() {
    this.hand.sort((first, next) => {
      if (first.type.type == next.type.type) {
        return first.type.value - next.type.value;
      } else if (first.type.type > next.type.type) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
