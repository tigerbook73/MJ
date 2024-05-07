import { MjTileWall } from "./mjTileWall";

describe("mjTileWall", () => {
  test("init", () => {
    const tempWall = new MjTileWall("");
    expect(tempWall.tiles).toBe("");
  });
});
