import { MjCard } from "./mjCard";

export class MjHuPai {
  private sortedHand: MjCard[];

  constructor(hand: MjCard[]) {
    this.sortedHand = hand.slice(); // 复制手牌
    this.sortHand(); // 在构造函数中调用 sortHand 方法
  }

  // 对手牌进行排序
  private sortHand() {
    this.sortedHand.sort((first, next) => {
      if (first.type === next.type) {
        return first.index - next.index;
      } else if (first.type > next.type) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  // 判断是否胡牌的主函数
  public isHuPai(): boolean {
    const length = this.sortedHand.length;
    if (length !== 14) {
      return false;
    }

    // 遍历寻找对子并去除
    for (let i = 0; i < this.sortedHand.length - 1; i++) {
      if (
        this.sortedHand[i].index === this.sortedHand[i + 1].index &&
        this.sortedHand[i].type === this.sortedHand[i + 1].type
      ) {
        const newHand = this.sortedHand.slice();
        newHand.splice(i, 2);

        if (this.is3N(newHand)) {
          return true;
        }
      }
    }

    return false;
  }

  // 判断是否是3n牌型
  private is3N(hand: MjCard[]): boolean {
    while (hand.length > 0) {
      const first = hand[0];
      const count = hand.filter((x) => x.index === first.index && x.type === first.type).length;

      if (count === 1 || count === 2) {
        // 尝试去除顺子
        const secondIndex = hand.findIndex((x) => x.index === first.index + 1 && x.type === first.type);
        const thirdIndex = hand.findIndex((x) => x.index === first.index + 2 && x.type === first.type);

        if (secondIndex !== -1 && thirdIndex !== -1) {
          hand.splice(thirdIndex, 1);
          hand.splice(secondIndex, 1);
          hand.splice(hand.indexOf(first), 1);
        } else {
          return false;
        }
      } else if (count >= 3) {
        // 尝试去除刻子
        hand.splice(0, 3);
      }
    }

    return true;
  }
}
