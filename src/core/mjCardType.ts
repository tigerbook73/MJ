export class MjCardType {
  //
  constructor(
    public type: string,
    public value: number,
    public name: string,
  ) {
    this.type = type;
    this.value = value;
    this.name = name;
  }

  print() {
    process.stdout.write(this.name.padStart(4 - this.name.length));
  }
}
export const mjCardTypes = [
  //
  new MjCardType("万", 1, "一万"),
  new MjCardType("万", 2, "二万"),
  new MjCardType("万", 3, "三万"),
  new MjCardType("万", 4, "四万"),
  new MjCardType("万", 5, "五万"),
  new MjCardType("万", 6, "六万"),
  new MjCardType("万", 7, "七万"),
  new MjCardType("万", 8, "八万"),
  new MjCardType("万", 9, "九万"),
  new MjCardType("筒", 1, "一筒"),
  new MjCardType("筒", 2, "二筒"),
  new MjCardType("筒", 3, "三筒"),
  new MjCardType("筒", 4, "四筒"),
  new MjCardType("筒", 5, "五筒"),
  new MjCardType("筒", 6, "六筒"),
  new MjCardType("筒", 7, "七筒"),
  new MjCardType("筒", 8, "八筒"),
  new MjCardType("筒", 9, "九筒"),
  new MjCardType("条", 1, "一条"),
  new MjCardType("条", 2, "二条"),
  new MjCardType("条", 3, "三条"),
  new MjCardType("条", 4, "四条"),
  new MjCardType("条", 5, "五条"),
  new MjCardType("条", 6, "六条"),
  new MjCardType("条", 7, "七条"),
  new MjCardType("条", 8, "八条"),
  new MjCardType("条", 9, "九条"),
  new MjCardType("风", 1, "东"),
  new MjCardType("风", 2, "南"),
  new MjCardType("风", 3, "西"),
  new MjCardType("风", 4, "北"),
  new MjCardType("箭", 1, "中"),
  new MjCardType("箭", 2, "发"),
  new MjCardType("箭", 3, "白"),
];
