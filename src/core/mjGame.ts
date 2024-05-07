import { MjCard } from "./mjCard";
import { mjCardTypes, voidCardTypes } from "./mjCardType";
import { MjCardWall } from "./mjCardWall";
export enum State {
  Ready,
  Start,
}

export class MjGame {
  //
  state: State = State.Ready;
  wallIndex: number = 0;
  hand: MjCard[] = [];
  pickIndex: number = 0;

  constructor(
    public cards: MjCard[] = [],
    public walls: MjCardWall[] = [],
  ) {
    this.walls = [new MjCardWall("East"), new MjCardWall("South"), new MjCardWall("West"), new MjCardWall("North")];
  }
  // 初始化牌，选择合适的牌，加入到游戏中（第一步只需要最基本的牌型）
  init() {
    this.cards = [];
    this.cards.length = mjCardTypes.length * 4;
    const type = mjCardTypes;
    for (let j = 0; j < type.length; j++) {
      for (let i = 0; i < 4; i++) {
        // this.cards.push(new MjCard(type[j]));
        this.cards[j * 4 + i] = new MjCard(type[j]);
      }
    }
    this.split();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    this.split();
    this.state = State.Ready;
  }

  split() {
    for (const wall of this.walls) {
      wall.init();
    }
    for (let i = 0; i < this.cards.length; i++) {
      const wall = i % 4;
      this.walls[wall].add(this.cards[i]);
    }
  }

  startGame() {
    if (this.state != State.Ready) {
      return;
    }
    const diceOne = Math.floor(Math.random() * 6) + 1;
    const diceTwo = Math.floor(Math.random() * 6) + 1;
    this.wallIndex = (diceOne + diceTwo - 2) % 4;
    this.state = State.Start;
    this.hand = [];
  }

  pickCard() {
    if (this.state === State.Start && this.walls[this.wallIndex].cards.length > 0) {
      if (this.pickIndex < this.walls[this.wallIndex].cards.length && this.pickIndex <= 13) {
        const card = this.walls[this.wallIndex].cards[this.pickIndex]; // Get the first card
        if (card.type.name !== "") {
          // Check if the card is not a void card
          this.hand.push(card); // Add the card to the hand
          this.walls[this.wallIndex].cards[this.pickIndex] = new MjCard(voidCardTypes[0]);
          // Replace with a void card
        }
        this.pickIndex++;
      }
      if (this.pickIndex == this.walls[this.wallIndex].cards.length) {
        this.pickIndex = 0;
        this.wallIndex++;
        if (this.wallIndex > this.walls.length) {
          console.log("Game over");
        }
      }
    }
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

  print() {
    // 打印牌

    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].print();
      process.stdout.write("\n");
    }
  }
}

export const mjGame = new MjGame();
