import { MjPlayer } from "./mjPlayer";
import { MjTile, MjTileList, emptyTile } from "./mjTile";
import { discard } from "./mjDiscard";

class MjTileWall {
  public position: string = "";
  public tiles: MjTile[] = [];
  constructor(position: string) {
    this.position = position;
  }
}

export class MjGame {
  //
  public tiles: MjTile[] = [];
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
    this.tiles = [];
    this.status = "Not Started";
    this.wallIndex = 0;
    this.posIndex = 0;
    this.tiles = MjTileList;
  }

  shuffle() {
    for (const wall of this.walls) {
      wall.tiles = [];
    }
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
    this.tiles.forEach((tile, index) => {
      this.walls[index % this.walls.length].tiles.push(tile);
    });
    this.status = "ready";
  }

  separate() {
    for (const wall of this.walls) {
      wall.tiles = [];
    }
    this.tiles.forEach((tile, index) => {
      this.walls[index % this.walls.length].tiles.push(tile);
    });
  }

  initPlayer() {
    for (let i = 0; i < 3; i++) {
      for (const player of this.players) {
        for (let j = 0; j < 4; j++) {
          player.hand.push(this.getOneTile());
        }
      }
    }
    for (const player of this.players) {
      player.newtile = this.getOneTile();
      player.pushTile();
      player.sorthand();
    }
    this.players[this.playerIndex].newtile = this.getOneTile();
  }

  singlePlayer() {
    for (let i = 0; i < 13; i++) {
      this.players[0].hand.push(this.getOneTile());
    }
    this.players[0].newtile = this.getOneTile();
    this.players[0].sorthand();
  }

  getOneTile() {
    const tempTile = this.walls[this.wallIndex].tiles[this.posIndex];
    this.walls[this.wallIndex].tiles[this.posIndex] = emptyTile;
    this.updateIndex();
    return tempTile;
  }

  getTile() {
    //
    const player = this.players[this.playerIndex];
    if (player.hand.length <= 13) {
      player.newtile = this.getOneTile();
    }
  }

  discardTile() {
    const player = this.players[this.playerIndex];
    if (player.hand.length >= 14 && player.newtile !== emptyTile) {
      return;
    }
    // const temp = player.hand.slice();
    // temp.push(player.newtile);
    // const td = discard(temp);
    player.pushTile();
    const td = discard(player.hand);
    for (const tile of player.hand) {
      if (tile.name === td) {
        player.played.push(tile);
        player.hand.splice(player.hand.indexOf(tile), 1);
        player.sorthand();
        break;
      }
    }
    this.updatePlayer();
  }

  updateIndex() {
    this.posIndex++;
    if (this.posIndex == this.wallLength) {
      this.posIndex = 0;
      this.wallIndex = (this.wallIndex + 1) % 4;
    }
  }

  updatePlayer() {
    if (this.status === "started") {
      this.playerIndex = (this.playerIndex + 1) % 4;
    }
  }

  is_started() {
    if (this.status === "started" || this.status === "single") {
      return true;
    }
    return false;
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

  singleTest() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    this.wallIndex = (dice1 + dice2 - 1) % 4;
    this.posIndex = this.wallLength - (dice1 + dice2) * 2;
    this.singlePlayer();
    this.status = "single";
  }
}

export const mjGame = new MjGame();
