/**
 * 代表麻将中牌的类型信息，如二万
 */
class CardType {
  constructor(type, value, name) {
    this.type = type;
    this.value = value;
    this.name = name;
  }

  print() {
    process.stdout.write(this.name.padStart(4 - this.name.length));
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
      new CardType("筒", 1, "一筒"),
      new CardType("筒", 2, "二筒"),
      new CardType("筒", 3, "三筒"),
      new CardType("筒", 4, "四筒"),
      new CardType("筒", 5, "五筒"),
      new CardType("筒", 6, "六筒"),
      new CardType("筒", 7, "七筒"),
      new CardType("筒", 8, "八筒"),
      new CardType("筒", 9, "九筒"),
      new CardType("条", 1, "一条"),
      new CardType("条", 2, "二条"),
      new CardType("条", 3, "三条"),
      new CardType("条", 4, "四条"),
      new CardType("条", 5, "五条"),
      new CardType("条", 6, "六条"),
      new CardType("条", 7, "七条"),
      new CardType("条", 8, "八条"),
      new CardType("条", 9, "九条"),
      new CardType("风", 1, "东"),
      new CardType("风", 2, "南"),
      new CardType("风", 3, "西"),
      new CardType("风", 4, "北"),
      new CardType("箭", 1, "中"),
      new CardType("箭", 2, "发"),
      new CardType("箭", 3, "白"),
    ];
  }

  print() {
    // for i
    //   for (let i = 0; i < this.types.length - 1; i++) {
    //   //   if (this.types[i].type == this.types[i + 1].type) {
    //   //     this.types[i].print();
    //   //     if (i < this.types.length - 1) {
    //   //       process.stdout.write(',');
    //   //     }
    //   //   } else {
    //   //     this.types[i].print();
    //   //     process.stdout.write('\n');
    //   //   }
    //   // }
    //   // this.types[this.types.length - 1].print();
    //   // process.stdout.write('\n');
    // }
    // // for of
    // for(const type of this.types) {
    //   type.print();
    //   }
  }

  // // for in

  // // foreach
  // this.types.forEach(function (type) {
  //   type.print();
  // });
}

// const types = new CardTypes();
// types.print();
/**
 * 代表一副牌中一张牌
 */
class Card {
  constructor(type) {
    this.type = type;
  }

  print() {
    this.type.print();
  }
  // 自行定义
}

/**
 * 代表一局麻将游戏
 * 第一步只需要包含一面墙，一个玩家
 */
class CardGame {
  constructor() {
    this.cards = [];
    this.walls = [new CardWall("East"), new CardWall("South"), new CardWall("West"), new CardWall("North")];
  }
  // 初始化牌，选择合适的牌，加入到游戏中（第一步只需要最基本的牌型）
  init() {
    const type = new CardTypes();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < type.types.length; j++) {
        this.cards.push(new Card(type.types[j]));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    for (let i = 0; i < this.cards.length; i++) {
      const wall = i % 4;
      this.walls[wall].add(this.cards[i]);
    }
  }

  print() {
    // 打印牌

    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].print();
      process.stdout.write("\n");
    }
  }

  // 洗牌

  // 发牌，函数自行先考虑，暂不做要求
}

/**
 * 代表一面麻将墙，是CardGame的一个子对象
 */

class CardWall {
  constructor(direction) {
    this.cards = [];
    this.direction = direction;
  }

  init() {
    this.cards = [];
  }

  add(card) {
    this.cards.push(card);
  }

  print() {
    console.log("Wall direction " + this.direction + ": ");
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].print();
      process.stdout.write(",");

      if (i != 0) {
        if ((i + 1) % 17 == 0) {
          process.stdout.write("\n");
        }
      }
    }
  }
}

const mj = new CardGame();
mj.init();
mj.shuffle();
mj.print();
