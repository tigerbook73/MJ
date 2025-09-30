- 初始发牌

  - 玩家位置  done
  - 玩家分牌  done
  - 手牌显示  done

  - 牌山位置
    - 牌山方位  done  19/09
    - 牌山方向  done  22/09
    - 牌山摸牌次序  done  22/09

- 玩家打牌
  - 判断当前是自己  done  19/09
    - added canChi,canPon,canKan,canRon variable
    - 选择/打/  done

- 玩家PASS  done  22/09
- 玩家按钮显示/隐藏 done  22/09
  - need add chi pon kan ron button done  22/09
  - corresponding function  WIP 25/09 partially done
    - done  27/09

- 玩家action
  - button & function done  27/09
  - 吃 按钮
    - 多牌选择模式  done  25/09
    - 手牌剔除  done  25/09
    - discard 剔除  done  30/09
    - 加入melds partially done  25/09
      - done 30/09

  - 玩家碰  done  27/09
  - 玩家杠  done  27/09
  - 玩家荣和  done  27/09
  - 玩家暗杠  done  30/09
  - 玩家加杠 （server 暂不支持）
  - 玩家自摸  done  30/09

- 界面
  - 当前玩家highlight done  27/09
  - 玩家荣和显示  done? 30/09

- bug/need refine
  - tool bar affected game page height, need adjust
    - deleted 22/09
  - after refresh, sometimes(?) all position will reset
    - fixed by remove duplicated position variable in mjStore 22/09

  - angang need to filter hand
  - status of allowMultiSelect need to be updated
    - fixed 27/09
  - after chi pon kan there is bug to discard.
    - fixed 27/09
