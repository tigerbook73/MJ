/**
 * 代表麻将中牌的类型信息，如二万
 */
class CardType {
  constructor(type, value, name) {
    this.type = type; // 类型，如万、筒、条、风、箭, string
    this.value = value; // 值，如1-9, number
    this.name = name; // 名称，如一万、东、中, string
  }

  print() {
    process.stdout.write(this.name);
  }
}

class CardTypes {
  constructor() {
    this.types = [
      new CardType("万", 1, "一万"),
      new CardType("万", 2, "二万"),
      new CardType("万", 3, "三万"),
      new CardType("万", 4, "四万"),
      new CardType("万", 5, "五万"),
      new CardType("万", 6, "六万"),
      new CardType("万", 7, "七万"),
      new CardType("万", 8, "八万"),
      new CardType("万", 9, "九万"),
      new CardType("条", 1, "一条"),
      new CardType("条", 2, "二条"),
      new CardType("条", 3, "三条"),
      new CardType("条", 4, "四条"),
      new CardType("条", 5, "五条"),
      new CardType("条", 6, "六条"),
      new CardType("条", 7, "七条"),
      new CardType("条", 8, "八条"),
      new CardType("条", 9, "九条"),
      new CardType("筒", 1, "一筒"),
      new CardType("筒", 2, "二筒"),
      new CardType("筒", 3, "三筒"),
      new CardType("筒", 4, "四筒"),
      new CardType("筒", 5, "五筒"),
      new CardType("筒", 6, "六筒"),
      new CardType("筒", 7, "七筒"),
      new CardType("筒", 8, "八筒"),
      new CardType("筒", 9, "九筒"),
      new CardType("箭", 1, "中"),
      new CardType("箭", 2, "发"),
      new CardType("箭", 3, "白"),
      new CardType("风", 1, "东"),
      new CardType("风", 2, "南"),
      new CardType("风", 3, "西"),
      new CardType("风", 4, "北"),
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
    //   "万": [type1, type21, type3] },
    //   "筒": [type4, type533, type6] },
    // }

    const typesDict = {};
    for (const type of this.types) {
      if (typesDict[type.type] === undefined) {
        typesDict[type.type] = [type.name];
      } else {
        typesDict[type.type].push(type.name);
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
  constructor(type, value) {
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
