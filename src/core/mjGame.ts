import { allTiles, MjCard, voidCard } from "./mjCard";
import { MjCardWall } from "./mjCardWall";
import { MjPlayer } from "./mjPlayer";
import { MjHuPai } from "./mjHuPai";
import { MjDaPai } from "./mjDaPai";

export enum State {
  Ready,
  Start,
  Pause,
}

export class MjGame {
  //
  state: State = State.Ready;
  wallIndex: number = 0;
  players: MjPlayer[] = [];
  pickIndex: number = 0;
  currentPlayer: number = 0;

  constructor(
    public cards: MjCard[] = [],
    public walls: MjCardWall[] = [],
  ) {
    this.walls = [new MjCardWall("East"), new MjCardWall("South"), new MjCardWall("West"), new MjCardWall("North")];
    this.players = [new MjPlayer("East"), new MjPlayer("South"), new MjPlayer("West"), new MjPlayer("North")];
  }
  // 初始化牌，选择合适的牌，加入到游戏中（第一步只需要最基本的牌型）
  init() {
    this.currentPlayer = 0;
    this.cards = allTiles;
    this.wallIndex = 0;
    this.pickIndex = 0;
    this.state = State.Ready;

    for (const player of this.players) {
      player.init();
    }

    for (const wall of this.walls) {
      wall.init();
    }
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

    for (const player of this.players) {
      player.init();
    }
  }

  startGame() {
    if (this.state != State.Ready) {
      return;
    }
    const diceOne = Math.floor(Math.random() * 6) + 1;
    const diceTwo = Math.floor(Math.random() * 6) + 1;
    this.wallIndex = (diceOne + diceTwo - 2) % 4;
    this.pickIndex = Math.min(diceOne, diceTwo);
    this.state = State.Start;
    this.distributeInitialCard();
  }

  distributeInitialCard() {
    for (let round = 0; round < 3; round++) {
      for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
        for (let i = 0; i < 4; i++) {
          this.players[playerIndex].hand.push(this.pickCard());
        }
      }
    }
    for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      this.players[playerIndex].hand.push(this.pickCard());
    }

    for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      this.players[playerIndex].sortHand();
    }

    this.players[0].hand.push(this.pickCard());
  }

  sort() {
    this.players[this.currentPlayer].sortHand();
  }

  pause() {
    if (this.state === State.Start) {
      this.state = State.Pause;
    }
  }

  resume() {
    if (this.state === State.Pause) {
      this.state = State.Start;
    }
  }

  pickCard() {
    if (this.state != State.Start) {
      throw new Error("Game not started");
    }

    // get a card from position (wallIndex, pickIndex)
    // replace the card with a void card
    // return the got card

    const card = this.walls[this.wallIndex].cards[this.pickIndex];
    this.walls[this.wallIndex].cards[this.pickIndex] = voidCard;

    this.pickIndex++;

    if (this.pickIndex >= this.walls[this.wallIndex].cards.length) {
      this.pickIndex = 0;
      this.wallIndex = (this.wallIndex + 1) % 4;
    }

    return card;
  }

  pick() {
    if (
      this.state === State.Start &&
      this.walls[this.wallIndex].cards.length > 0 &&
      this.players[this.currentPlayer].hand.length < 14
    ) {
      const card = this.pickCard();
      if (card.name !== "") {
        this.players[this.currentPlayer].hand.push(card);
        this.players[this.currentPlayer].pick = card;
      }
    }
  }

  discardCard() {
    // selectthrow a card
    // replace the card with a void card
    // return the thrown card
    const player = this.players[this.currentPlayer];
    if (player.hand.length <= 13) {
      throw new Error("No card to discard");
    }

    const strategy = new MjDaPai(player.hand);
    const discardedCard = strategy.discardTile() as MjCard; // Discard the last card in the hand
    return discardedCard;
  }

  discard() {
    if (this.state === State.Start && this.walls[this.wallIndex].cards.length > 0 && !this.canHu()) {
      const card = this.discardCard();
      if (card.name !== "") {
        const player = this.players[this.currentPlayer];
        const cardIndex = player.hand.indexOf(card);
        if (cardIndex !== -1) {
          player.discard.push(card);
          player.hand.splice(cardIndex, 1);
        }
      }
    }
  }

  canHu() {
    // every time I pick up a card
    // I check if I can hu Pai
    // if I can hu Pai, I can hu
    const hand = this.players[this.currentPlayer].hand;
    const huPaiChecker = new MjHuPai(hand);
    return huPaiChecker.isHuPai();
  }
  nextPlayer() {
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
  }
}

export const mjGame = new MjGame();
