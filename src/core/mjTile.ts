import { MjTileType } from "./mjTileType";

export class MjTile {
  //
  constructor(public cardType: MjTileType) {
    //
  }

  print() {
    process.stdout.write("|");
    process.stdout.write(this.cardType.name.padStart(6 - this.cardType.name.length));
  }
}
