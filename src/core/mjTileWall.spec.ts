import { MjTileWall } from "./mjTileWall";

describe("mjTileWall", () => {
  test("init", () => {
    const tempWall = new MjTileWall("");
    expect(tempWall.tiles instanceof Array).toBe(true);
    expect(tempWall.tiles.length).toBe(0);
  });
});
