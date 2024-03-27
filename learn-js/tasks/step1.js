/**
 * 代表麻将中牌的类型信息，如二万
 */
class CardType {}

/**
 * 代表一副牌中一张牌
 */
class Card {
  // 自行定义
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
