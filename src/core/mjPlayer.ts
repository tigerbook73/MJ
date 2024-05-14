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
    // this.hand.push(this.newtile);
    this.hand.sort((a, b) => a.type.name.localeCompare(b.type.name) || a.type.number - b.type.number);
    // this.newtile = emptyTile;
  }
}

export class Position {
  //
}
