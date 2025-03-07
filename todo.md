### step1:
1. pull mj-server
2. pull mj
3. merge web-socket
4. fix all lint errors
5. make current client & server working

### step2:
1. remove existing mjcore class
2. create a new class
     - class mjcore extends Game
3. update core => store code
4. test
   1. gamecore = new Game();
   2. gamecore.init([players]);
   3. call sync function (to store)
   4. gamecore.startGame();
   5. call sync function (to store)
   6. gamecore.drop(..)
   7. ...

### step3:
4. invoke api:
    - room.joinGame
    - game.enterGame
    - invoke api
    - mjcore = response.data.game;
    - sync mjcore to store
5. subscribe event:
   - subscription event
   - parse event
   - update mjcore
   - ...
6. test
    - room.joinGame
    - game.enterGame
    - game.startGame
    - make sure all data can be displayed correctly
    -
