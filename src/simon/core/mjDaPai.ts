import { MjCard, TileType } from "./mjCard";

export class MjDaPai {
  constructor(private hand: MjCard[]) {
    // 创建手牌副本以进行操作，而不修改原手牌
    this.hand = hand.slice();
    this.sortHand();
  }

  sortHand() {
    this.hand.sort((first, next) => {
      if (first.type == next.type) {
        return first.index - next.index;
      } else if (first.type > next.type) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  discardTile() {
    // 1. 保留所有的3顺子（3张连续的牌）
    const shunzis = this.findAllShunzi(this.hand, 3);
    for (const shunzi of shunzis) {
      this.removeFromHand(this.hand, shunzi);
    }

    // 2. 保留所有的刻子（3张相同的牌），如果有4张只保留3张
    const kes = this.findAllKe(this.hand);
    for (const ke of kes) {
      this.removeFromHand(this.hand, ke);
    }

    // 3. 保留所有的对子（2张相同的牌）
    const duis = this.findAllDui(this.hand);
    if (duis.length > 0) {
      for (const dui of duis) {
        this.removeFromHand(this.hand, dui);
      }
    }

    // 4. 保留所有2顺子直到最后一组（2张连续的牌）
    const shunzi2s = this.findAllShunzi(this.hand, 2);
    for (const shunzi2 of shunzi2s) {
      this.removeFromHand(this.hand, shunzi2);
    }

    // 根据优先级选择要打出的牌
    const priorityTile = this.findPriorityTile(this.hand);
    if (priorityTile) {
      // 从原手牌中移除选中的牌
      return priorityTile;
    }
  }

  // 根据优先级顺序寻找要打出的牌
  private findPriorityTile(hand: MjCard[]) {
    // 优先级1：单个箭牌
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
    return hand.find((tile) => tile.type === TileType.JIAN);
  }

  // 查找单个万、筒、条
  private findSingleTile(hand: MjCard[]) {
    return hand.find(
      (tile) => tile.type === TileType.WAN || tile.type === TileType.TONG || tile.type === TileType.TIAO,
    );
  }

  // 查找最后的对子或顺子
  private findLastPairOrShunzi(hand: MjCard[]) {
    const lastPair = this.findAllDui(hand);
    if (lastPair.length > 0) {
      return lastPair[lastPair.length - 1][0];
    }

    const lastShunzi = this.findAllShunzi(hand, 3);
    if (lastShunzi.length > 0) {
      return lastShunzi[lastShunzi.length - 1][0];
    }

    return undefined;
  }

  // 查找所有刻子（3张相同的牌），如果有4张只保留3张
  private findAllKe(hand: MjCard[]) {
    const kes: MjCard[][] = [];
    for (let i = 0; i < hand.length - 2; i++) {
      if (
        hand[i].index === hand[i + 1].index &&
        hand[i].index === hand[i + 2].index &&
        hand[i].type === hand[i + 1].type &&
        hand[i].type === hand[i + 2].type
      ) {
        if (i + 3 < hand.length && hand[i].index === hand[i + 3].index && hand[i].type === hand[i + 3].type) {
          kes.push([hand[i], hand[i + 1], hand[i + 2]]); // 如果有4张，只保留3张
          i += 3; // 跳过4张中的前3张
        } else {
          kes.push([hand[i], hand[i + 1], hand[i + 2]]);
          i += 2; // 跳过这3张
        }
      }
    }
    return kes;
  }

  // 查找所有顺子（连续的牌）
  private findAllShunzi(hand: MjCard[], count: number) {
    const shunzis: MjCard[][] = [];
    // 分别处理万、筒、条类型的牌
    const types = [TileType.WAN, TileType.TONG, TileType.TIAO];
    for (const type of types) {
      // 过滤出当前类型的牌
      const filteredHand = hand.filter((card) => card.type === type);
      if (filteredHand.length < count) {
        continue; // 当前类型牌数量不足，跳过
      }
      // 移除重复牌
      const uniqueHand: MjCard[] = [];
      for (const card of filteredHand) {
        if (!uniqueHand.some((c) => c.index === card.index)) {
          uniqueHand.push(card);
        }
      }
      for (let i = 0; i < uniqueHand.length - count + 1; i++) {
        let isShunzi = true;
        for (let j = 0; j < count - 1; j++) {
          if (uniqueHand[i + j].index + 1 !== uniqueHand[i + j + 1].index) {
            isShunzi = false;
            break;
          }
        }
        if (isShunzi) {
          const shunzi: MjCard[] = [];
          for (let j = 0; j < count; j++) {
            const card = hand.find((c) => c.type === type && c.index === uniqueHand[i + j].index);
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

  // 查找所有对子
  private findAllDui(hand: MjCard[]): MjCard[][] {
    const duis: MjCard[][] = [];
    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i].index === hand[i + 1].index && hand[i].type === hand[i + 1].type) {
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
