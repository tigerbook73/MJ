export class MjTileType {
  //
  constructor(
    public type: string,
    public number: number,
    public name: string,
  ) {
    //
  }

  print() {
    process.stdout.write(this.name);
  }
}

export const mjTileTypes = [
  //
  new MjTileType("m", 1, "一万"),
  new MjTileType("m", 2, "二万"),
  new MjTileType("m", 3, "三万"),
  new MjTileType("m", 4, "四万"),
  new MjTileType("m", 5, "五万"),
  new MjTileType("m", 6, "六万"),
  new MjTileType("m", 7, "七万"),
  new MjTileType("m", 8, "八万"),
  new MjTileType("m", 9, "九万"),
  new MjTileType("p", 1, "一筒"),
  new MjTileType("p", 2, "二筒"),
  new MjTileType("p", 3, "三筒"),
  new MjTileType("p", 4, "四筒"),
  new MjTileType("p", 5, "五筒"),
  new MjTileType("p", 6, "六筒"),
  new MjTileType("p", 7, "七筒"),
  new MjTileType("p", 8, "八筒"),
  new MjTileType("p", 9, "九筒"),
  new MjTileType("s", 1, "一条"),
  new MjTileType("s", 2, "二条"),
  new MjTileType("s", 3, "三条"),
  new MjTileType("s", 4, "四条"),
  new MjTileType("s", 5, "五条"),
  new MjTileType("s", 6, "六条"),
  new MjTileType("s", 7, "七条"),
  new MjTileType("s", 8, "八条"),
  new MjTileType("s", 9, "九条"),
  new MjTileType("z", 1, "东"),
  new MjTileType("z", 2, "南"),
  new MjTileType("z", 3, "西"),
  new MjTileType("z", 4, "北"),
  new MjTileType("z", 5, "中"),
  new MjTileType("z", 6, "白"),
  new MjTileType("z", 7, "发"),
];

export const emptyTile = new MjTileType("", -1, "");
