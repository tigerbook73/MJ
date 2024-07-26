/**
 * 代表麻将中牌的类型信息，如二万
 */
class CardType {
  constructor(type, index, name) {
    this.type = type; // 类型，如万、筒、条、风、箭, string
    this.index = index; // 值，如1-9, number
    this.name = name; // 名称，如一万、东、中, string
  }

  print() {
    process.stdout.write(this.name);
  }
}

class CardTypes {
  constructor() {
    this.types = [
      new CardType(TileType.JIAN, 1, "一万"),
      new CardType(TileType.JIAN, 2, "二万"),
      new CardType(TileType.JIAN, 3, "三万"),
      new CardType(TileType.JIAN, 4, "四万"),
      new CardType(TileType.JIAN, 5, "五万"),
      new CardType(TileType.JIAN, 6, "六万"),
      new CardType(TileType.JIAN, 7, "七万"),
      new CardType(TileType.JIAN, 8, "八万"),
      new CardType(TileType.JIAN, 9, "九万"),
      new CardType(TileType.TIAO, 1, "一条"),
      new CardType(TileType.TIAO, 2, "二条"),
      new CardType(TileType.TIAO, 3, "三条"),
      new CardType(TileType.TIAO, 4, "四条"),
      new CardType(TileType.TIAO, 5, "五条"),
      new CardType(TileType.TIAO, 6, "六条"),
      new CardType(TileType.TIAO, 7, "七条"),
      new CardType(TileType.TIAO, 8, "八条"),
      new CardType(TileType.TIAO, 9, "九条"),
      new CardType(TileType.TONG, 1, "一筒"),
      new CardType(TileType.TONG, 2, "二筒"),
      new CardType(TileType.TONG, 3, "三筒"),
      new CardType(TileType.TONG, 4, "四筒"),
      new CardType(TileType.TONG, 5, "五筒"),
      new CardType(TileType.TONG, 6, "六筒"),
      new CardType(TileType.TONG, 7, "七筒"),
      new CardType(TileType.TONG, 8, "八筒"),
      new CardType(TileType.TONG, 9, "九筒"),
      new CardType(TileType.Jian, 1, "中"),
      new CardType(TileType.Jian, 2, "发"),
      new CardType(TileType.Jian, 3, "白"),
      new CardType(TileType.JIAN, 1, "东"),
      new CardType(TileType.JIAN, 2, "南"),
      new CardType(TileType.JIAN, 3, "西"),
      new CardType(TileType.JIAN, 4, "北"),
    ];
  }

  print() {
    for (const type of this.types) {
      type.print();
      process.stdout.write(",");
    }
    process.stdout.write("\n");

    for (let i = 0; i < this.types.length; i++) {
      this.types[i].print();
      if (i < this.types.length - 1) {
        process.stdout.write(",");
      }
    }
    process.stdout.write("\n");

    const text = this.types.map((type) => type.name).join(",");
    console.log(text);
  }

  prettyPrint() {
    // {
    //   TileType.JIAN: [type1, type21, type3] },
    //   TileType.TONG: [type4, type533, type6] },
    // }

    const typesDict = {};
    for (const type of this.types) {
      if (typesDict[type] === undefined) {
        typesDict[type] = [type.name];
      } else {
        typesDict[type].push(type.name);
      }
    }

    for (const key in typesDict) {
      process.stdout.write(key + ":");
      process.stdout.write(typesDict[key].join(","));
      process.stdout.write("\n");
    }
  }
}

const cardTypes = new CardTypes();
cardTypes.print();
cardTypes.prettyPrint();

/**
 * 代表一副牌中一张牌
 */
class Card {
  constructor(type, index) {
    // 自行定义
  }
}

/**
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
