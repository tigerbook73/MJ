const Tile_IDs: { [key: string]: number } = {
  p1: 0,
  p2: 1,
  p3: 2,
  p4: 3,
  p5: 4,
  p6: 5,
  p7: 6,
  p8: 7,
  p9: 8,
  s1: 9,
  s2: 10,
  s3: 11,
  s4: 12,
  s5: 13,
  s6: 14,
  s7: 15,
  s8: 16,
  s9: 17,
  m1: 18,
  m2: 19,
  m3: 20,
  m4: 21,
  m5: 22,
  m6: 23,
  m7: 24,
  m8: 25,
  m9: 26,
  z1: 27,
  z2: 28,
  z3: 29,
  z4: 30,
  z5: 31,
  z6: 32,
  z7: 33,
};

function have_pairs(hand: number[]) {
  //
  const tile_count = Array(34).fill(0);
  for (const tile of hand) {
    tile_count[tile]++;
  }

  for (let i = 0; i < 34; i++) {
    if (tile_count[i] >= 2) {
      tile_count[i] -= 2;
      if (is_winning(tile_count)) {
        return true;
      }
      tile_count[i] += 2;
    }
  }

  return false;
}

function is_winning(tile_count: number[]) {
  const temp_count = [...tile_count];
  for (let i = 0; i < 34; i++) {
    //
    while (temp_count[i] > 0) {
      if (temp_count[i] >= 3) {
        temp_count[i] -= 3;
      } else if (i < 27 && i % 9 <= 6 && temp_count[i] > 0 && temp_count[i + 1] > 0 && temp_count[i + 2] > 0) {
        temp_count[i]--;
        temp_count[i + 1]--;
        temp_count[i + 2]--;
      } else {
        return false;
      }
    }
  }
  return true;
}

function convert_ID(hand: string[]): number[] {
  return hand.map((tile) => Tile_IDs[tile]);
}

const handStr = ["p1", "p1", "p1", "s2", "s3", "s4", "m5", "m6", "m7", "z1", "z1", "m9", "m9", "m9"];
const handIds = convert_ID(handStr);
console.log(have_pairs(handIds));
