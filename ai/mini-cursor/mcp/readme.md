# mcp
- mini-cursor 
  llm with tools 不太满意？

model context protocol
- llm with tools

    read write listDir exec tool
    llm + tools = Agent
    甜头 llm 真的能干活了 
    - 80% App 会消失
    - 集成第三方mcp 服务， mcp 就是tool
    - node 调用 java/python/rust 等其他语言的tool
    - 远程的tool

## MCP 
Model Context Protocol Anthorpic
在大量的将本地，跨语言、第三方的tool 集成到Agent 里，让llm 强大的同时，也会带来一定的复杂性（对接联调）
大家按一个约定来。

## MCP 协议 还有通信部分
   - stdio 本地命令行
   - http 远程调用

## MCP 最大的特点是可以跨进程调用工具
   - 子进程 node:child-process
   - 跨进程 java/rust
   - 远程进程
   llm 做更强大的任务
   繁杂（本地、跨语言、跨部门、远程）不同的通信方式（stdio,http）
   规范的提供工具和资源，mcp 协议

## 编写满足mcp 协议规范的Tool 

- Model Context Protocol
  tool result, ToolMeessage Context 上下文
- Anthorpic 24 年底 25 年底 贡献给开源社区
- sdk @modelcontextprotocol/sdk


