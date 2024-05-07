import { MjGame } from "./mjGame";

describe("mjGame", () => {
  test("init", () => {
    const tempGame = new MjGame();
    expect(tempGame.tiles).toBe([]);
    expect(tempGame.status).toBe("");
  });

  test("mjwall length", () => {
    const tempGame = new MjGame();
    expect(tempGame.walls.length).toBe(4);
  });

  test("mjTiles length", () => {
    const tempGame = new MjGame();
    expect(tempGame.tiles.length).toBe(136);
  });

  test("each mjwall length", () => {
    const tempGame = new MjGame();
    for (const wall of tempGame.walls) {
      expect(wall.tiles.length).toBe(34);
    }
  });

  test("mjTiles each tiles four copy", () => {
    const tempGame = new MjGame();
    const set = new Set();
    for (const tile of tempGame.tiles) {
      set.add(tile);
    }
    expect(set.size).toBe(34);
  });
});
