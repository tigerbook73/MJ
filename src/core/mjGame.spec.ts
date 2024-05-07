import { MjGame, State } from "./mjGame";

describe("mjGame", () => {
  let myGame: MjGame;

  beforeEach(() => {
    myGame = new MjGame();
  });

  test("MjGame init", () => {
    myGame.init();
    expect(myGame.cards.length).toBe(136);
  });

  test("MjGame shuffle", () => {
    myGame.init();
    myGame.shuffle();
    expect(myGame.cards.length).toBe(136);
    expect(myGame.walls.length).toBe(4);
  });

  test("split divides cards evenly among the four walls", () => {
    myGame.shuffle(); // Ensures shuffle logic is included
    myGame.split();
    expect(myGame.walls.every((wall) => wall.cards.length === 34)).toBe(true);
  });

  test("startGame should not start if state is not Ready", () => {
    myGame.state = State.Start; // Directly setting state to Start
    myGame.startGame();
    expect(myGame.state).not.toBe(State.Start); // Expect state not to change
  });

  test("startGame should set state to Start and initialize wallIndex", () => {
    myGame.shuffle(); // State must be Ready
    myGame.startGame();
    expect(myGame.state).toBe(State.Start);
    expect(myGame.wallIndex).toBeGreaterThanOrEqual(0);
    expect(myGame.wallIndex).toBeLessThan(4);
  });
});
