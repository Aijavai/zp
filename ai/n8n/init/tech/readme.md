# 使用n8n 工作流 生出科技新闻速览

- openai 推出了AI浏览器 Atlas

- npx n8n
    - js 运行环境可以是前端（浏览器），也可以是后端（node 命令行），还是AI sdk 的主流开发语言（JS/Pytho），甚至可以运行在单片机上。
    - n8n 基于node 命令行
    n8n 是一个工具包

- Trigger 节点
- RSS 节点，信息订阅节点
- Filter 节点 过滤出今天的新闻
- Edit Field 节点  添加一个 新字段
- Aggregate 混合节点
- AI agent 节点

- AIGC Generate Content 生成式AI 
    - 生成文本
    - 生成图片
    - 生成视频
    - temperature 参数 控制生成文本的随机性
        0 最确定 1 最随机

- Prompt
## JS Date 类型
- js 内置了日期类型 Date
    - new Date() 可以创建一个日期对象，当前日期时间
    - 接受时间毫秒数，可以创建指定时间的日期对象
    - getTime() 可以获取日期对象的时间毫秒数