import { MjPlayer } from "./mjPlayer";
import { MjTile, emptyTile } from "./mjTile";
import { MjTileType, mjTileTypes } from "./mjTileType";
import { MjTileWall } from "./mjTileWall";

export class MjGame {
  //
  public tiles: MjTile[] = [];
  public tileTypesList: MjTileType[] = [];
  public walls: MjTileWall[] = [];
  public status: string = "";
  public wallIndex: number = 0;
  public posIndex: number = 0;
  public playerIndex: number = 0;
  public players: MjPlayer[] = [];
  wallLength: number = 34;

  init() {
    this.walls = [new MjTileWall("East"), new MjTileWall("South"), new MjTileWall("West"), new MjTileWall("North")];
    this.players = [new MjPlayer("P1"), new MjPlayer("P2"), new MjPlayer("P3"), new MjPlayer("P4")];
    this.tileTypesList = mjTileTypes;
    this.tiles = [];
    this.status = "";

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

  initPlayer() {
    for (let i = 0; i < 3; i++) {
      for (const player of this.players) {
        this.getTile(player);
        this.playerIndex = (this.playerIndex + 1) % 4;
        player.sorthand();
        player.display = player.hand;
      }
    }
    for (let i = 0; i < this.players.length; i++) {
      this.addTile();
      this.players[i].hand.push(this.players[i].newtile);
      this.players[i].newtile = emptyTile;
      this.players[i].sorthand();
    }
    this.addTile();
  }

  getTile(player: MjPlayer) {
    for (let i = 0; i < 4; i++) {
      player.hand.push(this.walls[this.wallIndex].tiles[this.posIndex]);
      this.walls[this.wallIndex].tiles[this.posIndex] = emptyTile;
      this.updateIndex();
    }
  }

  addTile() {
    const player = this.players[this.playerIndex];
    if (player.display.length >= 15) {
      return;
    }
    // temp tiles = current tile
    const tempTile = this.walls[this.wallIndex].tiles[this.posIndex];
    // current tile = empty tile
    this.walls[this.wallIndex].tiles[this.posIndex] = emptyTile;
    // temp tile assign to player tile

    player.sorthand();
    player.newtile = tempTile;
    player.display.push(tempTile);

    this.updateIndex();
    this.playerIndex = (this.playerIndex + 1) % 4;
  }

  discard() {}

  updateIndex() {
    this.posIndex++;
    if (this.posIndex == this.wallLength) {
      this.posIndex = 0;
      this.wallIndex = (this.wallIndex + 1) % 4;
    }
  }
  start() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    this.wallIndex = (dice1 + dice2 - 1) % 4;
    this.posIndex = this.wallLength - (dice1 + dice2) * 2;
    this.initPlayer();
    this.status = "started";

    //;
  }
}

export const mjGame = new MjGame();
