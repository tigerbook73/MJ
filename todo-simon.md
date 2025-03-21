# TODO List

- [ ] Refactor UI
  - [ ] Start & Reset button: show/hide/merge?
  - [ ] Hu/Zimo button: show/hide
  - [ ] Replace drop with double click
  - [ ] remove unnecessary buttons
  - [ ] fix 明牌功能
  - [ ] fix join and leave game
  - [ ] replace alert with more user-friendly message
- [ ] Fea: leave and join game
- [ ] Fea: 在mainlayout中增加功能，订阅server event事件
    - 如果当前在游戏中，则自动跳到game-page,
    - 如果当前在大厅中, 则自动跳到join-game


<!-- 在mainlayout中增加功能，订阅server event事件

onReceive((event) => {
  if (event.game.status === game)
    router.push('/game-page')
  else if (event.game.status === list room)
    router.push('/join-game')
}) -->
