import { MjCardType } from "./mjCardType";
import { voidCardType } from "./mjCardType";

export class MjCard {
  //
  public type: string;
  public value: number;
  public name: string;
  public id: string;

  constructor(type: MjCardType, index: number) {
    this.type = type.type;
    this.value = type.value;
    this.name = type.name;
    this.id = `${this.type}-${this.value}-${index}`;
  }

  print() {
    this.type.print();
  }
}

export const voidMjCard = new MjCard(voidCardType);
