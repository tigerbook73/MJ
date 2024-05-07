import { MjGame } from "./mjGame";

describe("mjGame", () => {
  let tempGame: MjGame;

  beforeEach(() => {
    tempGame = new MjGame();
  });

  test("init", () => {
    expect(tempGame.tiles instanceof Array).toBe(true);
    expect(tempGame.tiles.length).toBe(0);
    expect(tempGame.status).toBe("");
  });

  test("mjwall length", () => {
    expect(tempGame.walls.length).toBe(4);
  });

  test("mjTiles length", () => {
    tempGame.init();
    expect(tempGame.tiles.length).toBe(136);
  });

  test("each mjwall length", () => {
    tempGame.init();
    tempGame.separate();
    for (const wall of tempGame.walls) {
      expect(wall.tiles.length).toBe(34);
    }
  });

  test("mjTiles each tiles four copy", () => {
    const set = new Set();
    tempGame.init();
    for (const tile of tempGame.tiles) {
      set.add(tile.type);
    }
    expect(set.size).toBe(34);
  });
  test("mjGame is an instance of MjGame", () => {
    expect(tempGame instanceof MjGame).toBe(true);
  });
});
