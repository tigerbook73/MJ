# old stuff
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
    - done  30/09
  - status of allowMultiSelect need to be updated
    - fixed 27/09
  - after chi pon kan there is bug to discard.
    - fixed 27/09


# 02/10/2025 update

- 游戏操作
  - 出牌规则改为双击，如已选中则直接打出  done  02/10/2025

- store优化
  - 不直接export store.game, 将game拆分，只export必要内容 done  02/10/2025
  - 优化update函数  done  02/10/2025
  - room & room list 去 ref

- 界面优化
  - 修改discard按钮显示条件 done  02/10/2025
  - 赢家须亮牌  done  02/10/2025
  - 放铳家牌诃背景改红
  - recommended discard指示器改成颜色条
  - bug:  waiting action阶段，当前玩家的highlight异常

- quit game不会把玩家direct回lobby页  done  08/10/2025

- user auto login

- tool bar


- 牌效算法
  - 加入副露牌的计算
  - 剔除discard中已经打过的牌的数量
  - 增加对最新打出的牌，纳入手牌中计算牌效，是否吃碰杠
  -

- 玩家加杠 （server 暂不支持）


- lobby页 在刷新后不会自动显示玩家所在房间

- room store?
