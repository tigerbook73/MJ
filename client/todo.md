# TODO

## 设计调整，完全数据驱动方式编程

- 通过store，管理当前应该处于的页面及页面中的内容

  - store中增加appState，用于表明当前游戏的状态
    - 未连接：自动跳转到连接界面，等待连接（游戏过程中，可能出现断）
    - 未登录：自动跳转到登录界面
    - 在大厅：自动跳转到大厅界面
    - 在游戏中：自动跳转到游戏界面
  - store中增加room数据，用于表明大厅信息
  - store中增加game数据，用于表明game数据（当前mjGame及store的方式OK）

- appState状态

  - 未连接
  - 未登录
  - 在大厅
  - 在游戏

- MainLayout

  - 在MainLayout中，增加socket连接状态管理

    - 连接事件：appState = 未登录
    - 断连事件：appState = 未连接

  - 在MainLayout中，增加GameEvent事件接收处理

    - 如果未登录, 则不处理
    - 如果已登录, 则
      - 自己不在游戏中，更新ROOM信息，appState => 在大厅
      - 自己在游戏中，更新ROOM信息，及Game信息（mjGame），appState => 在游戏

  - 在MainLayout中，Watch appState
    - 根据appState的变化，自动跳转到相应的页面(path)

- 连接页面

  - 显示正在连接状态

- login页面

  - 用户名称及密码存储在store中
  - 如果store中有用户信息，尝试自动登录
  - 如果store中没有用户信息，请求用户登录
  - 登录成功后，存储用户信息，appState => 在大厅
  - 登录失败后，清除用户信息, appState => 保持未登录

- 大厅页面

  - 根据store中的room信息，显示房间列表

- Game页面
  - 根据store中的game信息，显示游戏界面

### Server端调整

- 断连后不直接从游戏中退出，延迟退出，客户端可以重新连接
