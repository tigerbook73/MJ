# Steps

- 初始发牌

  - 玩家位置  done
  - 玩家分牌  done
  - 手牌显示  done

  - 牌山位置
    - 牌山方位  done 19/09
    - 牌山方向  done 22/09
    - 牌山摸牌次序  done  22/09

- 玩家打牌
  - 判断当前是自己  done  19/09
    - added canChi,canPon,canKan,canRon status variable in mjStore
  - 选择/打/  done

- 玩家PASS  done  22/09
- 玩家按钮显示/隐藏 done 22/09
  - need add chi pon kan ron button and corresponding function

- 玩家action
  - button created, function wip
  - 吃 按钮

  - 玩家碰
  - 玩家杠
  - 玩家自摸
  - 别家放铳

- bug/need refine
  - tool bar affected game page height, need adjust
    - deleted 22/09
  - after refresh, sometimes(?) all position will reset
    - fixed by remove duplicated position variable in mjStore
