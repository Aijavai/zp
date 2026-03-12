# Agent 记忆模块

- RAG 
  - 最低的成本(embedding) 丰富了LLM 的精准(cosine) 上下文
  - 大模型的微调(finetue)也可以提升LLM 的能力，但是花费巨大，巨复杂

- llm 的拓展
  llm + tool(干活) + RAG(知识库Content) + Memeory(记忆)

- memory 是基石
  messages 数组 最基础的memory
  tool ? 基于Memory
  rag ? prompt 增强 我们之前的对话，能力的积累 修改prompt
  SSD(规范式编程)

- 和llm 的对话 是无状态的 Stateless
  - llm 简单，消费算力、电力、高并发基础设施
    基于请求 AIGC 生成，生成内容返回
  - http 也是这样的
    万物互联
    http 头 带上cookie, Authorization ，http本身仍是无状态的
  - 带上了memory
    messages 数组
- modelWithTools
  messages 数组放入了SystemMessage, 告诉他的角色、功能，
  然后放入HumanMessage 用户的问题（干什么），
  基于智能循环判断 tool_calls
  将Tool 的返回结果，ToolMessage 再加入message
  利用了Memory 把需要多轮对话的复杂任务，无状态的大模型也能搞定

- 单纯messages 数组很简单 但是有问题
  - context 越来越长， token 消耗越来越多，触犯到上下文窗口现在
  
- 解决方案
  - 截断 slice(-n) 最近最关心的对话还在 滑动窗口 LRU 
  - 将要截断的messages 总结一下(summarize) 总结
  当前的多轮对话 Memory 机制够用了
  - 检索 (先存 数据库、文件) 提问 rag?
  cursor 等 超越当前对话，将之前对话存储，rag 利用的场景
  AI Agent 越来越懂我们 

  清空messages 
  新的任务，节省token 