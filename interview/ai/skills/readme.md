# Skills

## MCP  2024 11月
Model Context Protocol 标准协议 让AI 链接外部世界（工具/API/PromptTemplate/文档）的通信规范

简单来说： MCP 就是AI　的“ＵＳＢ 接口标准”

MCP 解决的是能做什么，却无法替代人类或高级智能体所具备的复杂情景判断，创造性策略制定或领略模糊问题。


SKILLs 技能
- 文件夹 ppt 专家
  - SKILL.md 必须的 prompt
  技能声明
  - scripts 文件夹
  完成任务 
  - 资源

SKILLs 等于 可复用的AI　专业能力包（Prompt + 规划 + 工具 + 资源）

- 为什么SKILLs 会火
1. 传统Prompt 的问题
帮我写一个PRD 
问题：
- 每次都要重复去描述
- 不稳定
- 不可复用

skills 解决什么
- 可复用 一次写好，多次使用
- 标准化， 团队统一AI　行为　
- 可组合 多个SKILLs 组成Agent 
- 低成本，不需要开发服务器端，MCP 的区别
SKILLs 是 instructions + scripts + resources 的组合
MCP 可以完成任务，SKILLS 可以将任务怎么做的更好
小龙虾 Manus 的开源版本  智能体管家 opc  的实例
小龙虾 是 智能体的windows 操作系统来了

skills + mcp = 完整 AI Agent


### brand-guidelines
- gemini3 生成landing page 按照这个skill 的要求
  颜色, 风格, 主题, anthorpic
- skills 的名字和文件夹一样 小写，多个单词-连接
- SKILL.md prompt 文件
  - 头部，YAML（JSON）　前置元数据
  name
  description

- 总述它的作用 

### ppt skills 

- 渐进式的
   技能比较复杂, 多种场景, 渐进式的加载
   Skill.md 模块化加载别的md 文件
   省token



## MCP and SKILLS 
### MCP
它规定了一套统一的通信语言。只要你的软件（数据库、文件系统、API）遵循这个标准做成一个 MCP Server，那么任何支持 MCP 的 AI（Claude, Cursor, 等）都能直接插上使用，无需额外开发。

2.
- MCP Server 是独立进程 Client and Server 之间是标准协议通信
任何AI 都可以接任何 MCP　Server

3. 
MCP  改变的是 AI 能力的供给模式

以前： 能力 = 模型训练进去的
现在： 能力 = 模型 + 运行时动态挂载的工具集
一个AI 模型，连接不同的 MCP Server ，就变成了完全不同的“专家”

- 工作原理（三层架构） 
  - MCP Host（客户端） 比如Cursor， HOST 负责理解意图，找干活的工具。
  - MCP Client/Server (传输层) 标准化的通信管道，支持Stdio、SSE 等传输方式。 内置在Host 里面或者作为一个中间层。 负责翻译，将AI　的想法转换成标准的MCP　协议语言，发送给服务器；再把服务器的结果翻译回AI　能懂的内容。
  - MCP Server （服务端） 轻量级独立进程，暴露具体能力。它可以是自己写的脚本，耶可以是官方提供的服务。它直接读取文件、查询数据库、调用API.
  MCP 协议定义了三种交互类型：
    - Resource 资源  感知外部
    - Tools 工具     操作外部系统
    - Prompt 提示词  

LLM 和MCP Client 对话，Client 和 Server 说话，Server 才碰真实系统。

tools/list
tools/call 
这些标准指令

### SKIlLS
- skills 不是Prompt 是“可执行的经验”
- SKILLs (Skills) 是一种将 人类专家的经验、工作流程、工具调用逻辑和参考资源 封装成标准化、可复用模块的技术规范。


#### 标准的SKILLs
brand-guidelines/          (技能名称：品牌指南)
├── SKILL.md               (核心大脑：元数据 + 系统指令)
├── scripts/               (手脚：可执行代码，如 Python/Shell)
│   ├── check_color.py     (检查颜色合规性)
│   └── generate_logo.py   (生成 Logo 脚本)
└── resources/             (记忆：静态参考数据)
    ├── color_palette.json (品牌色值表)
    └── tone_of_voice.txt  (语气风格指南)


- SKILL.md 文件
  - 头部

AI Agent 版本
- 单纯对话  无记忆 无工具
- 工具增强  AI　＋ tools  但每次要重新描述需求
- AI＋SKILLS + MCP  标准化输出 让AI 有了“肌肉记忆”
- AGET OS（小龙虾方向） SKILLS  成为应用，AGENT 是操作系统，MCP Server 是驱动程序