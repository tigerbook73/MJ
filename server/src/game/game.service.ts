import { Injectable } from "@nestjs/common";
import { ActionResult, Game, GameState, Player } from "src/common/core/mj.game";
import {
  ActionType,
  TileCore,
  type TileId,
} from "src/common/core/mj.tile-core";
import { UserType } from "src/common/models/common.types";
import { RoomModel } from "src/common/models/room.model";

@Injectable()
export class GameService {
  constructor() {
    //
  }

  startGame(player: Player, game: Game): Game {
    // player is in current game
    if (!game.players.includes(player)) {
      throw new Error("Player is not in current game");
    }

    game.start();
    return game;
  }

  resetGame(player: Player, game: Game): Game {
    // player is in current game
    if (!game.players.includes(player)) {
      throw new Error("Player is not in current game");
    }
    const positions = game.players
      .filter((player) => player)
      .map((player) => (player as Player).position);
    game.init(positions);
    return game;
  }

  actionDrop(player: Player, game: Game, tileId: TileId): Game {
    // player is the current player
    if (game.current !== player) {
      throw new Error("Player is not the current player");
    }

    game.drop(tileId);
    return game;
  }

  actionAngang(
    player: Player,
    game: Game,
    tileIds: [TileId, TileId, TileId, TileId],
  ): Game {
    // player is the current player
    if (game.current !== player) {
      throw new Error("Player is not the current player");
    }

    game.angang(tileIds);
    return game;
  }

  actionZimo(player: Player, game: Game): Game {
    // player is the current player
    if (game.current !== player) {
      throw new Error("Player is not the current player");
    }

    game.zimo();
    return game;
  }

  actionPass(player: Player, game: Game): Game {
    // player is in current game and not the current player
    if (player === game.current || !game.players.includes(player)) {
      throw new Error("Player is not in current game or is the current player");
    }

    game.pass(player);
    return game;
  }

  actionChi(player: Player, game: Game, tileIds: [TileId, TileId]): Game {
    // player is the next player of the current player
    if (game.getNextPlayer() !== player) {
      throw new Error("Player is not the next player of the current player");
    }

    game.chi(tileIds);
    return game;
  }

  actionPeng(player: Player, game: Game, tileIds: [TileId, TileId]): Game {
    // player is not the current and in current game
    if (player === game.current || !game.players.includes(player)) {
      throw new Error("Player is the current player or not in current game");
    }

    game.peng(player, tileIds);
    return game;
  }

  actionGong(
    player: Player,
    game: Game,
    tileIds: [TileId, TileId, TileId],
  ): Game {
    // player is not the current and in current game
    if (player === game.current || !game.players.includes(player)) {
      throw new Error("Player is the current player or not in current game");
    }

    game.gang(player, tileIds);
    return game;
  }

  actionHu(player: Player, game: Game): Game {
    game.hu(player);
    return game;
  }

  autoPlayOneStep(room: RoomModel): boolean {
    const game = room.game;
    if (!game) {
      return false;
    }

    if (
      game.state !== GameState.WaitingAction &&
      game.state !== GameState.WaitingPass
    ) {
      return false;
    }

    // find the current player
    const currentPlayer = game.current;
    if (!currentPlayer) {
      throw new Error("Current player not found");
    }
    const currentPlayerModel = room.findPlayerByPosition(
      currentPlayer.position,
    );
    if (!currentPlayerModel) {
      throw new Error("Current player model not found");
    }

    /**
     * if state === GameState.WaitingAction && current player is robot, drop one tile
     */
    if (
      game.state === GameState.WaitingAction &&
      currentPlayerModel.type === UserType.Bot
    ) {
      const tiles = [...currentPlayer.handTiles, currentPlayer.picked].sort(
        (a, b) => a - b,
      );
      if (TileCore.canHu(tiles)) {
        game.zimo();
        return true;
      }

      const toDrop = TileCore.decideDiscard(tiles);
      if (toDrop === null) {
        game.zimo();
        return true;
      }
      game.drop(toDrop);
      return true;
    }

    /**
     * if state === GameState.WaitingPass, find the right actions for robots
     */
    if (game.state === GameState.WaitingPass) {
      const candidateRobots = new Set(
        game.queuedActions
          .filter(
            (action) =>
              room.findPlayerByPosition(action.player.position)?.type ===
              UserType.Bot,
          )
          .map((action) => action.player),
      );

      let someActions = false;
      for (const robot of candidateRobots) {
        // find allowed actions for robot
        const allowedActions = game.queuedActions
          .filter(
            (action) =>
              action.player === robot && action.type !== ActionType.Pass,
          )
          .map((action) => action.type);

        // skip if no allowed actions
        if (allowedActions.length === 0) {
          continue;
        }

        const action = TileCore.decideAction(
          robot.handTiles,
          game.latestTile,
          allowedActions,
        );
        if (action?.action === ActionType.Peng) {
          game.peng(robot, action.tiles as [TileId, TileId]);
          someActions = true;
        } else if (action?.action === ActionType.Chi) {
          game.chi(action.tiles as [TileId, TileId]);
          someActions = true;
        } else if (action?.action === ActionType.Hu) {
          game.hu(robot);
          someActions = true;
        } else {
          game.pass(robot);
          someActions = true;
        }
      }

      return someActions;
    }
    return false;
  }
}
