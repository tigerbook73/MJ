# PLAN: 


我希望：

基于当前repo/server，及mj-next (基于nextjs开发，在另外一个repo中)
新建一个新的repo: mj-deploy 作为 “整合构建 + 部署仓库”
每次拉取两个子 repo 的 main 分支
然后 build 成一个 Render service（一个nodejs服务，包含mj server和mj-next的前端）

假定新的repo结构大致如下：（新repo只需要给出大致结构就好）

mj-deploy/        ← 新建聚合 repo
│
├── mj-next/            ← Next webservice
├── mj/                 ← mj repo, include server, common and client (in this case, we only need server)
│
├── package.json
├── render.yaml (可选)  ← 用于部署到 Render 的配置文件


给出建议：
1. 新repo中的文件的结构、内容（不用直接创建文件，给出代码及步骤即可）
2. 本repo的修改，最好不影响当前repo原有功能/流程（如DEV流程等），可以通过创建其他文件来实现新的功能
