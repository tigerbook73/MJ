import { MjCard, voidCard } from "./mjCard";

export class MjPlayer {
  constructor(
    public position: string,
    public hand: MjCard[] = [],
    public pick: MjCard = voidCard,
    public discard: MjCard[] = [],
    public discardCard: MjCard = voidCard,
  ) {}

  init() {
    this.hand = [];
    this.discard = [];
    this.pick = voidCard;
    this.discardCard = voidCard;
  }

  sortHand() {
    this.hand.sort((first, next) => {
      if (first.type == next.type) {
        return first.index - next.index;
      } else if (first.type > next.type) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
