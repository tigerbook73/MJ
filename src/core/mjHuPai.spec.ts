import { MjHuPai } from "./mjHuPai";
import { allTiles, MjCard } from "./mjCard";
import { MjGame } from "./mjGame";

function buildTestCards(names: string[]) {
  const cards: MjCard[] = [];

  const allCards = allTiles.slice(0);

  for (const name of names) {
    for (let i = 0; i < allCards.length; i++) {
      if (allCards[i].name == name) {
        const card = allCards[i];
        allCards.splice(i, 1);
        cards.push(card);
        break;
      }
    }
    throw new Error(`Card ${name} not found`);
  }
  return cards;
}

const game = new MjGame();
game.init();

describe("mjHuPai", () => {
  test("test1", () => {
    const tiles = buildTestCards([
      "一条",
      "一条",
      "一条",
      "二条",
      "三条",
      "四条",
      "五条",
      "五条",
      "六条",
      "七条",
      "八条",
      "九条",
      "九条",
      "九条",
    ]);

    const huPai = new MjHuPai(tiles);
    expect(huPai.isHuPai()).toBe(true);
  });
});

describe("mjHuPai", () => {
  test("test1", () => {
    const tiles1 = buildTestCards([
      "一条",
      "一条",
      "一条",
      "二万",
      "二万",
      "二万",
      "五筒",
      "五筒",
      "五筒",
      "八条",
      "八条",
      "七万",
      "八万",
      "九万",
    ]);
    const huPai = new MjHuPai(tiles1);
    expect(huPai.isHuPai()).toBe(true);
  });
});

describe("mjHuPai", () => {
  test("test1", () => {
    const tiles2 = buildTestCards([
      "一条",
      "一条",
      "一条",
      "二条",
      "二条",
      "二条",
      "五条",
      "五条",
      "五条",
      "八条",
      "八条",
      "九条",
      "九条",
      "九条",
    ]);
    const huPai = new MjHuPai(tiles2);
    expect(huPai.isHuPai()).toBe(true);
  });
});

describe("mjHuPai", () => {
  test("test1", () => {
    const tiles3 = buildTestCards([
      "一万",
      "二万",
      "三万",
      "四万",
      "五万",
      "五条",
      "五条",
      "五条",
      "六条",
      "七条",
      "八条",
      "九条",
      "东",
      "东",
    ]);
    const huPai = new MjHuPai(tiles3);
    expect(huPai.isHuPai()).toBe(true);
  });
});
