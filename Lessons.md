- [Lesson 1](#markdown-header-lesson-1)
- [Lesson 2](#markdown-header-lesson-2)
- [Lesson 3](#markdown-header-lesson-3)
  - [学习任务：](#markdown-header-学习任务)
  - [编程任务：](#markdown-header-编程任务)
- [Lesson 4 2024/04/23](#markdown-header-lesson-4-20240423)
  - [学习任务：](#markdown-header-学习任务-1)
  - [编程任务](#markdown-header-编程任务-1)
  - [例会](#markdown-header-例会)
- [Lesson 5 2024/04/30](#markdown-header-lesson-5-20240430)
  - [学习任务：](#markdown-header-学习任务-2)
  - [编程任务:](#markdown-header-编程任务-2)
  - [例会](#markdown-header-例会-1)

# Lesson 1

# Lesson 2

1. 检查各自的开发环境是否已经完成
2. 学习基本的VSCODE技巧
3. 学习GIT工具
4. 练习基本JS语法，包括但不限于：打印、数学计算、逻辑运算、循环、函数
5. 练习基本的数组、字符串操作

# Lesson 3

## 学习任务：

1. 使用下面链接学习JS中数组的使用，修改并尝试其中的例子。重点是其中以Array.prototype.打头的条目
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
2. 使用下面链接学习JS中字符串的使用，修改并尝试其中的例子。重点是其中以String.prototype.打头的条目
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

## 编程任务：

在上次的基础上完成Card、CardWall、CardGame的定义,要求

- CardGame： 代表一局

  - CardGame内部有： 136个Card对象，4个CardWall对象
  - CardGame内部有以下Method
    - init(),初始化136个Card对象
    - shuffle(), 将136个Card对象随机放到4个CardWall对象中，每个Wall中有136/4个Card
    - print(), 分别打印各个Wall对象

- CardWall： 代表四个风向的待取的牌

  - CardWall内部有： 0~34个Card，风向属性
  - CardWall内部有以下Method：
    - init(), 清空所有牌
    - add(),添加牌
    - print（）， 打印所有牌，含风向，位置/牌面，Face Up/Down

- Card： 代表一局游戏中的一张牌
  - Card内部有： 类型（CardType），Value
  - Card内部有以下Method
    - print（）

# Lesson 4 2024/04/23

## 学习任务：

学习HTML基础知识（0.5-1小时）
https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML

学习CSS基础知识（0.5-1小时）
https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/CSS_basics

自学JavaScript语言（长期）
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Introduction
这部分内容比较多，可以从初级开始学习，可以慢慢看。不清楚的时候可以自行温习一遍相关章节。

## 编程任务

暂不布置

## 例会

- 讲解并示范

  - 重构原先代码，基于module实现
  - 和UI结合，实现Model/View/Control的分离

- 编程
  - 完善Reset、Shuffle Button的功能

# Lesson 5 2024/04/30

## 学习任务：

- 自学JavaScript语言（长期）
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Introduction
  这部分内容比较多，可以从初级开始学习，可以慢慢看。不清楚的时候可以自行温习一遍相关章节。

## 编程任务:

- 增加游戏的状态属性

  - ready (按shuffle后的状态)
  - start (在ready状态后，按button后的状态)

- 增加游戏的当前取牌位置属性

  - 当前的wall/tile位置

- 增加玩家的手牌属性

  - 可以用一个数组（或其他方式表示）表示，表明玩家（自己）当前的牌

- 实现start button

  - 增加一个start按钮，表明开始游戏
    - 点击后，掷骰子（随机两个数字，显示出来）(游戏进入start状态)
    - 注意：骰子的结果，确定了取牌的位置
  - start button只有在ready状态才能点击，在start状态下，不可点击（或无效）

- 实现pick button

  - 点击后，从当前位置取一张牌，放到自己的手牌中
  - 新取的牌从wall中去掉
  - 新取的牌放置在自己的牌的最后面（加一个空位 用于区分）
  - pick button只在start状态下有效

- 实现sort button
  - 点击后，整理自己的牌，去掉空位

## 例会

- 学习测试

  - 什么是测试、什么事调试，测试的重要性
  - 讲解并解释jest样例
  - 各自完成各个类的测试的测试

- 编程

  - 完成编程任务
  - 讲解
