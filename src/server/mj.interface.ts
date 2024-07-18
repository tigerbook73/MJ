/**
 * common types
 */

export type TileId = number;

export enum TileType {
  WAN = "万",
  TONG = "筒",
  TIAO = "条",
  JIAN = "箭",
  KONG = "空",
}

export enum Position {
  EAST = "east",
  SOUTH = "south",
  WEST = "west",
  NORTH = "north",
}

export enum OpenSetType {
  CHI = "chi",
  PONG = "peng",
  GONG = "gang",
  ANGANG = "angang",
  // HUA = "hua",
}

export enum PickAction {
  CHI = "chi",
  PONG = "peng",
  GONG = "gang",
  ANGANG = "angang",
  FANGCHONG = "fangchong",
}

/**
 * Models for the game
 */

export enum MJTileState {
  OPEN = "open", // whether the tile is open to other players
  CLOSE = "close", // whether the tile is close to other players
  HIDDEN = "hidden", // whether the tile is hidden to all players, in this case, the tile id is unknown
  VOID = "void", // whether the tile is void, in this case, the tile id is void
}

export interface MJTile {
  id: TileId;
  state: MJTileState;
}

export interface MJWall {
  position: Position;
  tiles: MJTile[];
}

export interface MJDiscards {
  position: Position;
  tiles: MJTile[];
}

export interface MJHands {
  tiles: MJTile[];
  picked: MJTile;
}

export interface MJOpenSetTarget {
  position: Position; // from which player
  target: TileId;
}

export interface MJOpenSet {
  type: OpenSetType;
  tiles: MJTile[]; // 3 or 4 tiles
  target: MJOpenSetTarget;
}

export interface MJHandsOpen {
  tiles: MJTile[];
}

export enum MJPlayerState {
  WAITING = "waiting", // waiting for player to confirm ready
  READY = "ready", // the player is ready to play
}

export interface MJPlayer {
  state: MJPlayerState;
  position: Position;
  hands: MJHands;
  openSets: MJOpenSet[];
  discards: MJDiscards;
}

export enum MJGameState {
  WAITING = "waiting",
  DISPATCHING = "dispatching",

  WAITING_CURRENT_PLAYER = "waiting_current_player", // "wait for current player to perform action: discard, gang, hu"
  WAITING_OTHER_PLAYERS = "waiting_other_players", // "wait for all players to perform action: pass, chi, peng, gang, hu"

  END = "end",
}

export interface MJGame {
  players: MJPlayer[];
  walls: MJWall[];
  discards: MJDiscards[];
  dealer: MJPlayer;
  currentPlayer: MJPlayer;
  currentDiscard: MJTile;
  startWall: MJWall;
  startPos: number;
  endWall: MJWall;
  endPos: number;
  state: MJGameState;
}

export interface MJClientHandler {
  onConnect(): void;
  onGameStart(): void;
  onGameData(): void;
}

export class MjClient {
  constructor() {
    //
  }

  joinGame(name: string) {
    //
    name;
  }

  sendReady() {
    //
  }

  onGameData() {
    // all game data
  }

  pass() {
    //
  }

  /**
   *
   * @param tiles the 2 tiles to chi
   */
  chi(tiles: TileId[]) {
    //
    tiles;
  }

  /**
   *
   * @param tiles the 2 tiles to peng
   */
  peng(tiles: TileId[]) {
    //
    tiles;
  }

  /**
   *
   * @param tiles the 3 tiles to gang
   */
  gang(tiles: TileId[]) {
    //
    tiles;
  }

  /**
   *
   * @param tiles the 4 tiles to angang
   */
  angang(tiles: TileId[]) {
    //
    tiles;
  }

  huZimo() {
    //
  }

  huFangchong() {
    //
  }
}
