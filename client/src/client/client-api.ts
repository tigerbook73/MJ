import { ClientApi } from "@mj/shared/common/protocols/apis.models";
import { GameSocket } from "@mj/shared/common/protocols/game-socket";

export const clientApi = new ClientApi(new GameSocket());
