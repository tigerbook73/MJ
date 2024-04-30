import { MjCardType } from "./mjCardType";

export class MjCard {
  //
  constructor(public type: MjCardType) {
    this.type = type;
  }

  print() {
    this.type.print();
  }
}
