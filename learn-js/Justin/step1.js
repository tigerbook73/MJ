/*草稿
数字
类型，筒条万风三元
宝牌，红宝里宝
是否打出
是否持有
还剩几张
*/

/**
 * 代表麻将中牌的类型信息，如二万
 */

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

//const p1 = new CardType(1, 'p');
//const m2 = new cardType(2,"m")
//const s3 = new cardType(3,"s")
//const f1 = new cardType(1,"z")

class CardTypes {
  constructor() {
    this.types = [
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

  print() {
    /*
    this.types[0].print();
    for (let x of this.types.slice(1)) {
      process.stdout.write(',');
      x.print();
    }
    */

    for (let i = 0; i < this.types.length - 1; i++) {
      this.types[i].print();
      if (this.types[i].type != this.types[i + 1].type) {
        console.log();
        continue;
      }
      process.stdout.write(',');
    }
    process.stdout.write(this.types[this.types.length - 1].name);

    console.log();
  }
}

/*
 * 代表一副牌中一张牌
 */
class CardTile {
  // 自行定义
  constructor(held, withdrawl, dora) {
    this.held = held;
    this.withdrawl = withdrawl;
    this.dora = dora;
  }
}

/*
 * 代表一局麻将游戏
 * 第一步只需要包含一面墙，一个玩家
 */
class CardGame {
  // 初始化牌，选择合适的牌，加入到游戏中（第一步只需要最基本的牌型）
  init() {
    //
  }

  print() {
    // 打印牌
  }

  // 洗牌
  shuffle() {
    //
  }

  // 发牌，函数自行先考虑，暂不做要求
}

/**
 * 代表一面麻将墙，是CardGame的一个子对象
 */
class CardWall {
  // 自行定义
}

const mj = new CardGame();
mj.init();
mj.print();
mj.shuffle();
mj.print();

const testrun = new CardTypes();
testrun.print();
