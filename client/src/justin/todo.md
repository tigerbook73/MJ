# Steps

- 初始发牌

  - 玩家位置  done
  - 牌山位置  partially done
    - 牌山方位 done
    - 牌山方向 need to fix order
    - 牌山摸牌次序
  - 玩家分牌  done
  - 手牌显示  done

- 玩家打牌
  - 判断当前是自己 partially done, add isMyTurn variable in mjStore
    - added canChi,canPon,canKan,canRon status variable in mjStore
  - 选择/打/ done
- 玩家PASS done
- 玩家按钮显示/隐藏 partially done
- 玩家吃
  - 判断当前
  - 吃 按钮

- 玩家碰
- 玩家杠
- 玩家自摸
- 别家放铳

- bug/need refine
  - tool bar affected game page height, need adjust
  - after refresh, sometimes(?) all position will reset
    - fixed by remove duplicated position variable in mjStore
