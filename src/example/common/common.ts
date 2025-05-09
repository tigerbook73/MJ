import { Position } from "src/common/core/mj.game";

export enum Direction {
  Top = "top",
  Bottom = "bottom",
  Right = "right",
  Left = "left",
}

export class CommonUtil {
  static mapPosition(myPosition: Position, direction: Direction): Position {
    //        TOP
    // LEFT         RIGHT
    //       BOTTOM (myPostion)
    //
    // Position: East/0 -> South/1 -> West/2 -> North/4
    // bottom => myPosition (fixed)
    // left   => (myPosition + 1 + 4) % 4
    // top    => (myPosition + 2 + 4) % 4
    // right  => (myPosition + 3 + 4) % 4

    if (direction === Direction.Bottom) {
      return ((myPosition + 4) % 4) as Position;
    } else if (direction === Direction.Left) {
      return ((myPosition + 1 + 4) % 4) as Position;
    } else if (direction === Direction.Top) {
      return ((myPosition + 2 + 4) % 4) as Position;
    } else {
      return ((myPosition + 3 + 4) % 4) as Position;
    }
  }

  static extendArrayToLength<T>(array: T[], length: number, fillValue: T): T[] {
    if (array.length >= length) {
      return array;
    }
    const extendedArray = [...array];
    for (let i = array.length; i < length; i++) {
      extendedArray.push(fillValue);
    }
    return extendedArray;
  }
}
