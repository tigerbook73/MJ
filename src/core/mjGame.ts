import { MjTile } from "./mjTile";
import { MjTileType, mjTileTypes } from "./mjTileType";
import { MjTileWall } from "./mjTileWall";

export class MjGame {
  //
  constructor(
    public tiles: MjTile[] = [],
    public tileTypesList: MjTileType[] = [],
    public walls: MjTileWall[] = [],
    public status: boolean = false,
  ) {
    this.walls = [new MjTileWall("East"), new MjTileWall("South"), new MjTileWall("West"), new MjTileWall("North")];
    this.tileTypesList = mjTileTypes;
  }

  init() {
    this.tiles = [];
    this.status = false;

    this.tileTypesList.forEach((type) => {
      for (let i = 0; i < 4; i++) {
        this.tiles.push(new MjTile(type));
      }
    });
  }

  shuffle() {
    for (const wall of this.walls) {
      wall.init();
    }
    // 随机洗牌
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
    this.tiles.forEach((tile, index) => {
      this.walls[index % this.walls.length].add(tile);
    });
    this.status = true;
  }

  separate() {
    for (const wall of this.walls) {
      wall.init();
    }
    this.tiles.forEach((tile, index) => {
      this.walls[index % this.walls.length].add(tile);
    });
  }

  start() {
    //;
  }

  sort() {
    //;
  }
  myTiles() {
    //;
  }

  // print() {
  //   this.walls.forEach((wall) => wall.print());
  // }
}

export const mjGame = new MjGame();
