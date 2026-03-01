# feature: adjust the delay after drop

## background

When one player drops an tile, there is no delay between this drop and the next player's pick if there is no other possible actions, e.g. peng/chi/gang/....

currently, there is a delay of ~1500ms after most other actions, which is define in mj-game.gateway.ts MjGameGateway.autoPlay()

## proposal

1. add new ActionType: "pick". this action shall be added to the action queue in Game.prepareQueueActions() only when there is no other possible actions after a drop. 

2. remove handleQueuedActions() from Game.drop() and let it to be called from autoPlay() only.

## possible files affected
1. mj.game.ts
2. mj-game.gateway.ts
3. game.service.ts

## actions

1. analyze the proposal and planing the implementation steps 
2. update this document if necessary (just main ideals, no details of code implementation)
3. details of plan shall be prepared and can be reviewed in traditional way of Claude Code's plan mode

