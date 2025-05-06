// import { MjGame, State } from "./mjGame";

// describe("mjGame", () => {
//   let myGame: MjGame;

//   beforeEach(() => {
//     myGame = new MjGame();
//   });

//   test("MjGame init", () => {
//     myGame.init();
//     expect(myGame.cards.length).toBe(136);
//   });

//   test("MjGame shuffle", () => {
//     myGame.init();
//     myGame.shuffle();
//     expect(myGame.cards.length).toBe(136);
//     expect(myGame.walls.length).toBe(4);
//   });

//   test("split should evenly distribute cards to walls", () => {
//     myGame.shuffle(); // Ensures cards are randomized before splitting
//     myGame.split();
//     expect(myGame.walls.length).toBe(4);
//     for (const wall of myGame.walls) {
//       expect(wall.cards.length).toBe(myGame.cards.length / 4);
//     }
//   });

//   test("startGame should set state to Start and initialize wallIndex", () => {
//     myGame.init();
//     myGame.shuffle(); // State must be Ready
//     myGame.startGame();
//     expect(myGame.state).toBe(State.Start);
//     expect(myGame.wallIndex).toBeGreaterThanOrEqual(0);
//     expect(myGame.wallIndex).toBeLessThan(4);
//   });

//   test("pickCard should pick the first card from the correct wall", () => {
//     myGame.init();
//     myGame.shuffle();
//     myGame.split();
//     myGame.startGame();
//     myGame.pickCard();
//     expect(myGame.players.length).toBe(1);
//     expect(myGame.walls[myGame.wallIndex].cards[0].name).toBe("");
//   });
// });
