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
   1. game = new Game(); store.refresh();
   2. game.init(players); store.refresh();
   3. game.startGame();store.refresh();
   4. game.drop(tile) store.refresh();
   5. game.pass() store.refresh();
   6. ...
   7. game.zimo() store.refresh();

### step3:
single player mode:
1. invoke api:
    - room.joinGame
    - room.enterGame
2. prepare button (start, pass, drop, zimo)
    - invoke api
    - game = response.data.game;
    - store.fresh();

### step4:
multi player mode:

open 2 pages

