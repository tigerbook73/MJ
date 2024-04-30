import { MjCard } from "./mjCard";
import { mjCardTypes } from "./mjCardType";
import { MjCardWall } from "./mjCardWall";
enum State {
  Ready,
  Start,
}

export class MjGame {
  //
  state: State = State.Ready;
  wallIndex: number = 0;
  constructor(
    public cards: MjCard[] = [],
    public walls: MjCardWall[] = [],
    public status: boolean = false,
  ) {
    this.walls = [new MjCardWall("East"), new MjCardWall("South"), new MjCardWall("West"), new MjCardWall("North")];
  }
  // 初始化牌，选择合适的牌，加入到游戏中（第一步只需要最基本的牌型）
  init() {
    this.cards = [];
    const type = mjCardTypes;
    for (let j = 0; j < type.length; j++) {
      for (let i = 0; i < 4; i++) {
        this.cards.push(new MjCard(type[j]));
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
    this.status = true;
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
    if (!this.status) {
      console.log("Game is not ready to start. Please shuffle first.");
      return;
    }
    const diceOne = Math.floor(Math.random() * 6) + 1;
    const diceTwo = Math.floor(Math.random() * 6) + 1;
    this.wallIndex = (diceOne + diceTwo - 2) % 4;
    this.state = State.Start;
  }

  pickCard() {
    if (this.state === State.Start && this.walls[this.wallIndex].cards.length > 0) {
      const card = this.walls[this.wallIndex].cards.pop();
      this.cards.push(card, null); // Adding a card and a placeholder
    }
  }

  sortHand() {
    this.cards = this.cards.filter((card) => card != null);
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
