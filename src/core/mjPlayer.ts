import { MjTile, emptyTile } from "./mjTile";

export class MjPlayer {
  //
  public hand: MjTile[] = [];
  public openhand: MjTile[] = [];
  public newtile: MjTile = emptyTile;
  public display: MjTile[] = [];
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
  sorthand() {
    this.hand.push(this.newtile);
    this.newtile = emptyTile;
    this.hand.sort((a, b) => {
      const typeA = this.typeOrder.indexOf(a.type.type);
      const typeB = this.typeOrder.indexOf(b.type.type);

      if (typeA !== typeB) {
        return typeA - typeB;
      } else {
        return a.type.number - b.type.number;
      }
    });
    this.display = this.hand.slice();
    this.display.push(emptyTile);
    this.display.push(this.newtile);
  }
}

export class Position {
  //
}
