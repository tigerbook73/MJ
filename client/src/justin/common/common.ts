import type { Game } from "src/common/core/mj.game";
import { Position } from "src/common/core/mj.game";
import type { TileId } from "@common/core/mj.tile-core";

export const PlayerPosRotation = [
  [Position.East, Position.North, Position.West, Position.South],
  [Position.South, Position.East, Position.North, Position.West],
  [Position.West, Position.South, Position.East, Position.North],
  [Position.North, Position.West, Position.South, Position.East],
];

export enum AppState {
  Unconnected = "UNCONNECTED",
  UnSignedIn = "UNSIGNED_IN",
  InLobby = "IN_LOBBY",
  InGame = "IN_GAME",
}

export function findDirectionForPostiion(myPostion: Position, direction: number) {
  return PlayerPosRotation[myPostion][direction];
}

export function IDtoName(id: number) {
  if (id == -1) {
    return "";
  }
  return IDTileList[id];
}

export function filterDiscards(game: Game | null) {
  if (!game) return;

  const meldsTiles = new Set<TileId>();

  for (const player of game.players) {
    if (!player) continue;

    for (const openedSet of player.openedSets) {
      meldsTiles.add(openedSet.target);
    }
  }

  for (const discard of game.discards) {
    discard.tiles = discard.tiles.filter((tile) => !meldsTiles.has(tile));
  }
}

export const IDTileList: string[] = [
  "m1",
  "m1",
  "m1",
  "m1",
  "m2",
  "m2",
  "m2",
  "m2",
  "m3",
  "m3",
  "m3",
  "m3",
  "m4",
  "m4",
  "m4",
  "m4",
  "m5",
  "m5",
  "m5",
  "m5",
  "m6",
  "m6",
  "m6",
  "m6",
  "m7",
  "m7",
  "m7",
  "m7",
  "m8",
  "m8",
  "m8",
  "m8",
  "m9",
  "m9",
  "m9",
  "m9",
  "p1",
  "p1",
  "p1",
  "p1",
  "p2",
  "p2",
  "p2",
  "p2",
  "p3",
  "p3",
  "p3",
  "p3",
  "p4",
  "p4",
  "p4",
  "p4",
  "p5",
  "p5",
  "p5",
  "p5",
  "p6",
  "p6",
  "p6",
  "p6",
  "p7",
  "p7",
  "p7",
  "p7",
  "p8",
  "p8",
  "p8",
  "p8",
  "p9",
  "p9",
  "p9",
  "p9",
  "s1",
  "s1",
  "s1",
  "s1",
  "s2",
  "s2",
  "s2",
  "s2",
  "s3",
  "s3",
  "s3",
  "s3",
  "s4",
  "s4",
  "s4",
  "s4",
  "s5",
  "s5",
  "s5",
  "s5",
  "s6",
  "s6",
  "s6",
  "s6",
  "s7",
  "s7",
  "s7",
  "s7",
  "s8",
  "s8",
  "s8",
  "s8",
  "s9",
  "s9",
  "s9",
  "s9",
  "z1",
  "z1",
  "z1",
  "z1",
  "z2",
  "z2",
  "z2",
  "z2",
  "z3",
  "z3",
  "z3",
  "z3",
  "z4",
  "z4",
  "z4",
  "z4",
  "z5",
  "z5",
  "z5",
  "z5",
  "z6",
  "z6",
  "z6",
  "z6",
  "z7",
  "z7",
  "z7",
  "z7",
];
