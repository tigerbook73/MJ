import { MjTileType, mjTileTypes } from "./mjTileType";
import { emptyTile } from "./mjTileType";

describe("mjTileType", () => {
  test("mjTileTypes length", () => {
    expect(mjTileTypes.length).toBe(34);
  });

  test("mjTileTypes name unique", () => {
    const set = new Set();
    for (const type of mjTileTypes) {
      set.add(type.name);
    }
    expect(set.size).toBe(34);
  });

  test("mjTileTypes type+number unique", () => {
    const set = new Set();
    for (const type of mjTileTypes) {
      set.add(`${type.type}|${type.number}`);
    }
    expect(set.size).toBe(mjTileTypes.length);
  });

  test("empty tile exist", () => {
    expect(emptyTile instanceof MjTileType).toBe(true);
  });
});
