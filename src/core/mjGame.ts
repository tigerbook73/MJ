import { MjTile } from "./mjTile";
import { MjTileType, mjTileTypes } from "./mjTileType";
import { MjTileWall } from "./mjTileWall";

export class MjGame {
  //
  constructor(
    public tiles: MjTile[] = [],
    public cardTypesList: MjTileType[] = [],
    public walls: MjTileWall[] = []
  ) {
    this.walls = [
      new MjTileWall("East"),
      new MjTileWall("South"),
      new MjTileWall("West"),
      new MjTileWall("North"),
    ];
    this.cardTypesList = mjTileTypes;
  }

  init() {
    this.tiles = [];

    this.cardTypesList.forEach((type) => {
      for (let i = 0; i < 4; i++) {
        this.tiles.push(new MjTile(type));
      }
    });
  }

  shuffle() {
    // 随机洗牌
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }

  separate() {
    // walls -> CardWall对象的数组
    this.tiles.forEach((tile, index) => {
      this.walls[index % this.walls.length].add(tile);
    });
  }

  print() {
    this.walls.forEach((wall) => wall.print());
  }
}
