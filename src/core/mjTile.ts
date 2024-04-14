import { MjTileType } from "./mjTileType";

export class MjTile {
  //
  constructor(public type: MjTileType) {
    //
  }

  print() {
    process.stdout.write("|");
    process.stdout.write(this.type.name.padStart(6 - this.type.name.length));
  }
}
