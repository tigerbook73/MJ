//

class CardType {
  constructor(type, number, name) {
    this.type = type;
    this.number = number;
    this.name = name;
  }

  print() {
    process.stdout.write(this.name);
  }
}

// class CardTypes {
//   constructor() {
//     this.types = [
//       new CardType('m', 1, '一万'),
//       new CardType('m', 2, '二万'),
//       new CardType('m', 3, '三万'),
//       new CardType('m', 4, '四万'),
//       new CardType('m', 5, '五万'),
//       new CardType('m', 6, '六万'),
//       new CardType('m', 7, '七万'),
//       new CardType('m', 8, '八万'),
//       new CardType('m', 9, '九万'),
//       new CardType('p', 1, '一筒'),
//       new CardType('p', 2, '二筒'),
//       new CardType('p', 3, '三筒'),
//       new CardType('p', 4, '四筒'),
//       new CardType('p', 5, '五筒'),
//       new CardType('p', 6, '六筒'),
//       new CardType('p', 7, '七筒'),
//       new CardType('p', 8, '八筒'),
//       new CardType('p', 9, '九筒'),
//       new CardType('s', 1, '一条'),
//       new CardType('s', 2, '二条'),
//       new CardType('s', 3, '三条'),
//       new CardType('s', 4, '四条'),
//       new CardType('s', 5, '五条'),
//       new CardType('s', 6, '六条'),
//       new CardType('s', 7, '七条'),
//       new CardType('s', 8, '八条'),
//       new CardType('s', 9, '九条'),
//       new CardType('z', 1, '东'),
//       new CardType('z', 2, '南'),
//       new CardType('z', 3, '西'),
//       new CardType('z', 4, '北'),
//       new CardType('z', 5, '中'),
//       new CardType('z', 6, '白'),
//       new CardType('z', 7, '发'),
//     ];
//   }

//   print() {
//     /*
//     this.types[0].print();
//     for (let x of this.types.slice(1)) {
//       process.stdout.write(',');
//       x.print();
//     }
//     */

//     for (let i = 0; i < this.types.length - 1; i++) {
//       this.types[i].print();
//       if (this.types[i].type != this.types[i + 1].type) {
//         console.log();
//         continue;
//       }
//       process.stdout.write(',');
//     }
//     process.stdout.write(this.types[this.types.length - 1].name);

//     console.log();
//   }
// }

class CardTile_temp {
  // 自行定义
  constructor(held, withdrawl, dora) {
    this.held = held;
    this.withdrawl = withdrawl;
    this.dora = dora;
  }
}
class CardTile {
  //基础版本
  constructor(cardType, isFaceUp = false) {
    this.cardType = cardType;
    this.isFaceUp = isFaceUp;
  }

  print() {
    console.log(
      this.cardType.name,
      // `${this.cardType.name} ${this.isFaceUp ? '(Face Up)' : '(Face Down)'}`, //问gpt的
    );
  }
}

class CardGame {
  constructor() {
    this.tiles = [];
    this.cardTypesList = [
      new CardType('m', 1, '一万'),
      new CardType('m', 2, '二万'),
      new CardType('m', 3, '三万'),
      new CardType('m', 4, '四万'),
      new CardType('m', 5, '五万'),
      new CardType('m', 6, '六万'),
      new CardType('m', 7, '七万'),
      new CardType('m', 8, '八万'),
      new CardType('m', 9, '九万'),
      new CardType('p', 1, '一筒'),
      new CardType('p', 2, '二筒'),
      new CardType('p', 3, '三筒'),
      new CardType('p', 4, '四筒'),
      new CardType('p', 5, '五筒'),
      new CardType('p', 6, '六筒'),
      new CardType('p', 7, '七筒'),
      new CardType('p', 8, '八筒'),
      new CardType('p', 9, '九筒'),
      new CardType('s', 1, '一条'),
      new CardType('s', 2, '二条'),
      new CardType('s', 3, '三条'),
      new CardType('s', 4, '四条'),
      new CardType('s', 5, '五条'),
      new CardType('s', 6, '六条'),
      new CardType('s', 7, '七条'),
      new CardType('s', 8, '八条'),
      new CardType('s', 9, '九条'),
      new CardType('z', 1, '东'),
      new CardType('z', 2, '南'),
      new CardType('z', 3, '西'),
      new CardType('z', 4, '北'),
      new CardType('z', 5, '中'),
      new CardType('z', 6, '白'),
      new CardType('z', 7, '发'),
    ];
  }
  init() {
    this.cardTypesList.forEach((type) => {
      for (let i = 0; i < 4; i++) {
        this.tiles.push(new CardTile(type));
      }
    });
  }

  shuffle() {
    // 随机洗牌
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }

  separate(walls) {
    // walls -> CardWall对象的数组
    this.tiles.forEach((tile, index) => {
      walls[index % walls.length].add(tile);
    });
  }

  print() {
    this.tiles.forEach((tile) => tile.print());
  }
}

class CardWall {
  constructor(direction) {
    this.tiles = [];
    this.direction = direction;
  }

  init() {
    this.tiles = [];
  }

  add(tile) {
    this.tiles.push(tile);
  }

  print() {
    console.log(`Wall ${this.direction}:`);
    this.tiles.forEach((tile) => tile.print());
  }
}

// const mj = new CardGame();
// mj.init();
// mj.print();
// mj.shuffle();
// mj.print();

const mj = new CardGame();
const walls = [
  new CardWall('East'),
  new CardWall('South'),
  new CardWall('West'),
  new CardWall('North'),
];

mj.init();
mj.print();
mj.shuffle();
mj.print();
mj.separate(walls);

walls.forEach((wall) => wall.print());
