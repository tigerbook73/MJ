import { MjGame } from "./mjGame";

describe("mjGame", () => {
  let tempGame: MjGame;

  beforeEach(() => {
    tempGame = new MjGame();
  });

  test("init", () => {
    expect(tempGame.tiles).toBe([]);
    expect(tempGame.status).toBe("");
  });

  test("mjwall length", () => {
    expect(tempGame.walls.length).toBe(4);
  });

  test("mjTiles length", () => {
    expect(tempGame.tiles.length).toBe(136);
  });

  test("each mjwall length", () => {
    for (const wall of tempGame.walls) {
      expect(wall.tiles.length).toBe(34);
    }
  });

  test("mjTiles each tiles four copy", () => {
    const set = new Set();
    for (const tile of tempGame.tiles) {
      set.add(tile);
    }
    expect(set.size).toBe(34);
  });
  test("mjGame is an instance of MjGame", () => {
    expect(tempGame instanceof MjGame).toBe(true);
  });
});
