import { ClientApi } from "../../../server/src/common/protocols/apis.models";
import { GameSocket } from "../../../server/src/common/protocols/game-socket";

export const clientApi = new ClientApi(new GameSocket());
