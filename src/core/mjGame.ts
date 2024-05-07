import { MjTile, emptyTile } from "./mjTile";
import { MjTileType, mjTileTypes } from "./mjTileType";
import { MjTileWall } from "./mjTileWall";

export class MjGame {
  //
  public tiles: MjTile[] = [];
  public tileTypesList: MjTileType[] = [];
  public walls: MjTileWall[] = [];
  public status: string = "";
  public myTiles: MjTile[] = [];
  public wallIndex: number = 0;
  public posIndex: number = 0;
  wallLength: number = 0;
  constructor() {
    this.walls = [new MjTileWall("East"), new MjTileWall("South"), new MjTileWall("West"), new MjTileWall("North")];
    this.tileTypesList = mjTileTypes;
  }

  init() {
    this.tiles = [];
    this.status = "";
    this.myTiles = [];
    this.wallLength = this.walls[0].tiles.length;

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
    this.status = "ready";
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
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    this.wallIndex = (dice1 + dice2 - 1) % 4;
    this.posIndex = this.wallLength - (dice1 + dice2) * 2;
    //;
  }

  sort() {
    //;
  }

  addTile() {
    if (this.myTiles.length < 14) {
      const tempTile = this.walls[this.wallIndex].tiles[this.posIndex];
      this.walls[this.wallIndex].tiles[this.posIndex] = emptyTile;
      this.myTiles.push(tempTile);
      this.posIndex += 1;
      if (this.posIndex == this.wallLength) {
        this.wallIndex += 1;
        this.posIndex = 0;
        if (this.wallIndex == 4) {
          this.wallIndex = 0;
        }
      }
    }
  }
}

export const mjGame = new MjGame();
