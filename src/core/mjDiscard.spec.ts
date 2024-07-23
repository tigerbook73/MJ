import { discard } from "./mjDiscard";
import { MjTile } from "./mjTile";

describe("myDiscard", () => {
  beforeEach(() => {});

  test("init", () => {
    const test = [
      new MjTile("p1"),
      new MjTile("p2"),
      new MjTile("p4"),
      new MjTile("p5"),
      new MjTile("p7"),
      new MjTile("p8"),
      new MjTile("p9"),
      new MjTile("s1"),
      new MjTile("s2"),
      new MjTile("s4"),
      new MjTile("s5"),
      new MjTile("s7"),
      new MjTile("s8"),
      new MjTile("s8"),
    ];

    const z = discard(test);
    console.log(z);
  });
});
