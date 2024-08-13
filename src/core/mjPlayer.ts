import { MjTile, emptyTile } from "./mjTile";

export class MjPlayer {
  //
  public hand: MjTile[] = [];
  public openhand: MjTile[] = [];
  public newtile: MjTile = emptyTile;
  //
  public played: MjTile[] = [];
  public turn: boolean = false;
  //
  typeOrder = ["m", "s", "t", "z"];

  constructor(public position: string) {
    //
  }
  init() {
    //
    this.hand = [];
    this.openhand = [];
    this.newtile = emptyTile;
    this.played = [];
  }

  pushTile() {
    //
    if (this.newtile != emptyTile) {
      this.hand.push(this.newtile);
      this.newtile = emptyTile;
    }
  }

  sortHand() {
    // this.pushTile();
    this.hand.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }

      return a.id - b.id;
    });

    if (this.hand[0].name == "") {
      this.hand.shift();
    }
  }
}

export class Position {
  //
}
