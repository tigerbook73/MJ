import { MjGame, mjGame } from "./mjGame";

describe("MjGame", () => {
  let myGame: MjGame;

  beforeEach(() => {
    myGame = new MjGame();
  });

  test("MjGame.init(1)", () => {
    myGame.init();

    expect(myGame.tiles.length).toBe(34 * 4);
  });

  test("mjGame is an instance of MjGame", () => {
    expect(mjGame instanceof MjGame).toBe(true);
  });
});
