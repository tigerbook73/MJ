import { MjGame, mjGame } from "./mjGame";

describe("mjGame", () => {
  test("init", () => {
    //
  });
  test("mjwall length", () => {
    const tempGame = new MjGame();
    expect(tempGame.walls.length).toBe(4);
  });

  test("mjTiles length", () => {
    expect(mjGame.tiles.length).toBe(136);
  });

  test("each mjwall length", () => {
    for (const wall of mjGame.walls) {
      expect(wall.tiles.length).toBe(34);
    }
  });

  test("mjTiles each tiles four copy", () => {
    const set = new Set();
    for (const tile of mjGame.tiles) {
      set.add(tile);
    }
    expect(set.size).toBe(34);
  });
});
