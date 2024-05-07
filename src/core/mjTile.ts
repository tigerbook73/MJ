import { MjTileType, emptyTileType } from "./mjTileType";

export class MjTile {
  //
  constructor(public type: MjTileType) {
    //
  }
}

export const emptyTile = new MjTile(emptyTileType);
