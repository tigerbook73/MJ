import { mjCardTypes } from "./mjCardType";

describe("mjCardType", () => {
  test("mjCardTypes length", () => {
    expect(mjCardTypes.length).toBe(34);
  });

  test("mjCardTypes name unique", () => {
    const set = new Set();
    for (const type of mjCardTypes) {
      set.add(type.name);
    }
    expect(set.size).toBe(34);
  });

  test("mjCardTypes type+number unique", () => {
    const set = new Set();
    for (const type of mjCardTypes) {
      set.add(`${type.type}|${type.value}`);
    }
    expect(set.size).toBe(mjCardTypes.length);
  });
});
