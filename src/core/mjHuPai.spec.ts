import { MjHuPai } from "./mjHuPai";
import { MjCard } from "./mjCard";
import { typeFromName } from "./mjCardType";

const tiles = [
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("二条")),
  new MjCard(typeFromName("三条")),
  new MjCard(typeFromName("四条")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("六条")),
  new MjCard(typeFromName("七条")),
  new MjCard(typeFromName("八条")),
  new MjCard(typeFromName("九条")),
  new MjCard(typeFromName("九条")),
  new MjCard(typeFromName("九条")),
];

const tiles1 = [
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("二万")),
  new MjCard(typeFromName("二万")),
  new MjCard(typeFromName("二万")),
  new MjCard(typeFromName("五筒")),
  new MjCard(typeFromName("五筒")),
  new MjCard(typeFromName("五筒")),
  new MjCard(typeFromName("八条")),
  new MjCard(typeFromName("八条")),
  new MjCard(typeFromName("七万")),
  new MjCard(typeFromName("八万")),
  new MjCard(typeFromName("九万")),
];

const tiles2 = [
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("一条")),
  new MjCard(typeFromName("二条")),
  new MjCard(typeFromName("二条")),
  new MjCard(typeFromName("二条")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("八条")),
  new MjCard(typeFromName("八条")),
  new MjCard(typeFromName("九条")),
  new MjCard(typeFromName("九条")),
  new MjCard(typeFromName("九条")),
];

const tiles3 = [
  new MjCard(typeFromName("一万")),
  new MjCard(typeFromName("二万")),
  new MjCard(typeFromName("三万")),
  new MjCard(typeFromName("四万")),
  new MjCard(typeFromName("五万")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("五条")),
  new MjCard(typeFromName("六条")),
  new MjCard(typeFromName("七条")),
  new MjCard(typeFromName("八条")),
  new MjCard(typeFromName("九条")),
  new MjCard(typeFromName("东")),
  new MjCard(typeFromName("东")),
];

describe("mjHuPai", () => {
  test("test1", () => {
    const huPai = new MjHuPai(tiles);
    expect(huPai.isHuPai()).toBe(true);
  });
});

describe("mjHuPai", () => {
  test("test1", () => {
    const huPai = new MjHuPai(tiles1);
    expect(huPai.isHuPai()).toBe(true);
  });
});

describe("mjHuPai", () => {
  test("test1", () => {
    const huPai = new MjHuPai(tiles2);
    expect(huPai.isHuPai()).toBe(true);
  });
});

describe("mjHuPai", () => {
  test("test1", () => {
    const huPai = new MjHuPai(tiles3);
    expect(huPai.isHuPai()).toBe(true);
  });
});
