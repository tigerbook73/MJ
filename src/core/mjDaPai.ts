import { MjCard } from "./mjCard";

export class MjDaPai {
  constructor(private hand: MjCard[]) {}

  discardTile() {
    // 创建手牌副本以进行操作，而不修改原手牌
    const handCopy = [...this.hand];

    // 1. 保留所有的3顺子（3张连续的牌）
    const shunzis = this.findAllShunzi(handCopy, 3);
    for (const shunzi of shunzis) {
      this.removeFromHand(handCopy, shunzi);
    }

    // 2. 保留所有的刻子（3张相同的牌）
    const kes = this.findAllKe(handCopy);
    for (const ke of kes) {
      this.removeFromHand(handCopy, ke);
    }

    // 3. 保留一个对子（2张相同的牌）
    const dui = this.findDui(handCopy);
    if (dui) {
      this.removeFromHand(handCopy, dui);
    }

    // 4. 保留所有2顺子直到最后一组（2张连续的牌）
    const shunzi2 = this.findShunzi(handCopy, 2);
    if (shunzi2) {
      this.removeFromHand(handCopy, shunzi2);
    }

    // 5. 保留所有对子直到最后一组
    const duis = this.findAllDui(handCopy);
    if (duis.length > 1) {
      this.removeFromHand(handCopy, duis[0]);
    }

    // 根据优先级选择要打出的牌
    const priorityTile = this.findPriorityTile(handCopy);
    if (priorityTile) {
      // 从原手牌中移除选中的牌
      this.removeFromHand(this.hand, [priorityTile]);
      return priorityTile;
    }
  }

  // 根据优先级顺序寻找要打出的牌
  private findPriorityTile(hand: MjCard[]) {
    // 优先级1：单个箭牌和风牌
    const singleJian = this.findSingleJian(hand);
    if (singleJian) {
      return singleJian;
    }

    // 优先级2：单个万、筒、条
    const singleTile = this.findSingleTile(hand);
    if (singleTile) {
      return singleTile;
    }

    // 优先级3：拆最后的对子或顺子打出
    const lastPairOrShunzi = this.findLastPairOrShunzi(hand);
    if (lastPairOrShunzi) {
      return lastPairOrShunzi;
    }

    return undefined;
  }

  // 查找单个箭牌和风牌
  private findSingleJian(hand: MjCard[]) {
    return hand.find((tile) => tile.type.type === "箭" || tile.type.type === "风");
  }

  // 查找单个万、筒、条
  private findSingleTile(hand: MjCard[]) {
    return hand.find((tile) => tile.type.type === "万" || tile.type.type === "筒" || tile.type.type === "条");
  }

  // 查找最后的对子或顺子
  private findLastPairOrShunzi(hand: MjCard[]) {
    const lastPair = this.findDui(hand);
    if (lastPair) {
      return lastPair[0];
    }

    const lastShunzi = this.findShunzi(hand, 3);
    if (lastShunzi) {
      return lastShunzi[0];
    }

    return undefined;
  }

  // 查找刻子（3张相同的牌）
  private findAllKe(hand: MjCard[]) {
    const kes: MjCard[][] = [];
    for (let i = 0; i < hand.length - 2; i++) {
      if (
        hand[i].type.value === hand[i + 1].type.value &&
        hand[i].type.value === hand[i + 2].type.value &&
        hand[i].type.type === hand[i + 1].type.type &&
        hand[i].type.type === hand[i + 2].type.type
      ) {
        kes.push([hand[i], hand[i + 1], hand[i + 2]]);
      }
    }
    return kes;
  }

  // 查找所有顺子（连续的牌）
  private findAllShunzi(hand: MjCard[], count: number) {
    const shunzis: MjCard[][] = [];
    // 分别处理万、筒、条类型的牌
    const types = ["万", "筒", "条"];
    for (const type of types) {
      // 过滤出当前类型的牌
      const filteredHand = hand.filter((card) => card.type.type === type);
      if (filteredHand.length < count) {
        continue; // 当前类型牌数量不足，跳过
      }
      // 移除重复牌
      const uniqueHand: MjCard[] = [];
      for (const card of filteredHand) {
        if (!uniqueHand.some((c) => c.type.value === card.type.value)) {
          uniqueHand.push(card);
        }
      }
      for (let i = 0; i < uniqueHand.length - count + 1; i++) {
        let isShunzi = true;
        for (let j = 0; j < count - 1; j++) {
          if (uniqueHand[i + j].type.value + 1 !== uniqueHand[i + j + 1].type.value) {
            isShunzi = false;
            break;
          }
        }
        if (isShunzi) {
          const shunzi: MjCard[] = [];
          for (let j = 0; j < count; j++) {
            const card = hand.find((c) => c.type.type === type && c.type.value === uniqueHand[i + j].type.value);
            if (card) {
              shunzi.push(card);
            }
          }
          shunzis.push(shunzi);
        }
      }
    }
    return shunzis;
  }

  // 查找对子（2张相同的牌）
  private findDui(hand: MjCard[]) {
    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i].type.value === hand[i + 1].type.value && hand[i].type.type === hand[i + 1].type.type) {
        return [hand[i], hand[i + 1]];
      }
    }
  }

  // 查找所有对子
  private findAllDui(hand: MjCard[]): MjCard[][] {
    const duis: MjCard[][] = [];
    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i].type.value === hand[i + 1].type.value && hand[i].type.type === hand[i + 1].type.type) {
        duis.push([hand[i], hand[i + 1]]);
      }
    }
    return duis;
  }

  // 从手牌中移除指定的牌
  private removeFromHand(hand: MjCard[], tiles: MjCard[]) {
    for (const tile of tiles) {
      const index = hand.indexOf(tile);
      if (index !== -1) {
        hand.splice(index, 1);
      }
    }
  }
}
