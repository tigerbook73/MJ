import { ClientApi } from "src/common/protocols/apis.models";
import { GameSocket } from "src/common/protocols/game-socket";

export const clientApi = new ClientApi(new GameSocket());
