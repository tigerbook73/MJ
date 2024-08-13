import { checkWinning } from "./mjRong";
import { MjTile } from "./mjTile";

describe("myRong", () => {
  beforeEach(() => {});

  test("init", () => {
    const test = [
      new MjTile("p1"),
      new MjTile("p2"),
      new MjTile("p3"),
      new MjTile("p5"),
      new MjTile("p6"),
      new MjTile("p7"),
      new MjTile("s1"),
      new MjTile("s1"),
      new MjTile("s2"),
      new MjTile("s3"),
      new MjTile("s4"),
      new MjTile("s7"),
      new MjTile("s8"),
      new MjTile("s9"),
    ];

    const z = checkWinning(test);

    expect(z).toBe(true);
  });
});
