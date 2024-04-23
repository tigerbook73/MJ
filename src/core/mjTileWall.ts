import { MjTile } from "./mjTile";

export class MjTileWall {
  constructor(
    public position: string,
    public tiles: MjTile[] = [],
  ) {
    //
  }

  init() {
    this.tiles = [];
  }

  add(tile: MjTile) {
    this.tiles.push(tile);
  }

  print() {
    console.log();
    console.log(`${this.position}:`);
    for (const [index, tile] of this.tiles.entries()) {
      if (index % 8 == 0 && index != 0) {
        console.log("|");
      }
      tile.print();
    }
    console.log();
  }
}
