import { emptyTile, MjTile } from "./mjTile";

const Tile_IDs: { [key: string]: number } = {
  m1: 0,
  m2: 1,
  m3: 2,
  m4: 3,
  m5: 4,
  m6: 5,
  m7: 6,
  m8: 7,
  m9: 8,
  p1: 9,
  p2: 10,
  p3: 11,
  p4: 12,
  p5: 13,
  p6: 14,
  p7: 15,
  p8: 16,
  p9: 17,
  s1: 18,
  s2: 19,
  s3: 20,
  s4: 21,
  s5: 22,
  s6: 23,
  s7: 24,
  s8: 25,
  s9: 26,
  z1: 27,
  z2: 28,
  z3: 29,
  z4: 30,
  z5: 31,
  z6: 32,
  z7: 33,
};
const ID_Tiles: { [key: number]: string } = {};

for (const key in Tile_IDs) {
  ID_Tiles[Tile_IDs[key]] = key;
}

function transform(hand: MjTile[]) {
  const ids = [];
  for (const tile of hand) {
    ids.push(Tile_IDs[tile.name]);
  }
  return ids;
}

// export function discard(hand: MjTile[]) {
export function discard(hand: MjTile[]) {
  const handIds = transform(hand);
  let lastTile = 0;
  const tileCount = Array(34).fill(0);
  for (const id of handIds) {
    tileCount[id]++;
  }

  for (let i = 0; i < tileCount.length; i++) {
    rmThreeStraight(tileCount, i);
    rmTriplet(tileCount, i);
  }

  for (let i = 0; i < tileCount.length; i++) {
    lastTile = rmPair(tileCount, i, lastTile);
    lastTile = rmTwoStraight(tileCount, i, lastTile);
  }
  for (let i = 0; i < tileCount.length; i++) {
    if (tileCount[i] == 1) {
      lastTile = i;
    }
  }

  for (let i = 0; i < hand.length; i++) {
    if (hand[i].name == ID_Tiles[lastTile]) {
      return hand[i];
    }
  }
  return emptyTile;
}

function rmThreeStraight(tileCount: number[], i: number) {
  let remove = true;
  while (remove) {
    //
    if (i < 27 && i % 9 < 7 && tileCount[i] > 0 && tileCount[i + 1] > 0 && tileCount[i + 2] > 0) {
      remove = true;
      tileCount[i]--;
      tileCount[i + 1]--;
      tileCount[i + 2]--;
    } else {
      remove = false;
    }
  }
}
function rmTwoStraight(tileCount: number[], i: number, last: number) {
  let remove = true;
  while (remove) {
    if (i < 27 && i % 9 < 8 && tileCount[i] > 0 && tileCount[i] > 0 && tileCount[i + 1] > 0) {
      remove = true;
      last = i + 1;
      tileCount[i]--;
      tileCount[i + 1]--;
    } else {
      remove = false;
    }
  }
  return last;
}
function rmTriplet(tileCount: number[], i: number) {
  let remove = true;
  while (remove) {
    if (tileCount[i] > 0 && tileCount[i] >= 3) {
      remove = true;
      tileCount[i] -= 3;
    } else {
      remove = false;
    }
  }
}
function rmPair(tileCount: number[], i: number, last: number) {
  let remove = true;
  while (remove) {
    if (tileCount[i] > 0 && tileCount[i] == 2) {
      remove = true;
      last = i;
      tileCount[i] -= 2;
    } else {
      remove = false;
    }
  }
  return last;
}
