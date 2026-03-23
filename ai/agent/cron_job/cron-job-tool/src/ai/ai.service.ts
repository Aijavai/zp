import { Injectable, Inject } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { Runnable } from '@langchain/core/runnables';
import { 
    BaseMessage, 
    AIMessage, 
    HumanMessage,
    ToolMessage, 
    SystemMessage,
    AIMessageChunk
} from '@langchain/core/messages';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

const queryUserArgsSchema = z.object({
    userId: z.string().describe('用户ID, 例如: 001, 002, 003'),
});

type QueryUserArgs = {
    userId: string;
}

const database = {
    users: {
        '001': { id: '001', name: '张三', email: 'zhangsan@example.com', role: 'admin' },
        '002': { id: '002', name: '李四', email: 'lisi@example.com', role: 'user' },
        '003': { id: '003', name: '王五', email: 'wangwu@example.com', role: 'user' },
      },
};

const queryUserTool = tool(
    async ({ userId }: QueryUserArgs) => {
        const user = database.users[userId];
        if (!user) {
            return `用户ID ${userId} 不存在。可用的 ID: 001, 002, 003`;
        }
        return `用户信息：\n- ID: ${user.id}\n- 姓名: ${user.name}\n
        - 邮箱: ${user.email}\n- 角色: ${user.role}`;
    },
    {
        name: 'query_user',
        description: 
            '查询数据库中的用户信息。输入用户ID， 返回该用户的详细信息(姓名、邮箱、角色)',
        schema: queryUserArgsSchema
    }
)


@Injectable()
export class AiService {
    // Runnable 是langchain 中的一个接口，表示一个可运行的对象
    // BaseMessage[] 是langchain 中的一个基类，表示一个消息数组
    // AIMessage HumanMessage ToolMessage 是langchain 中的一个子类，表示一个消息
    // 输入的类型约束BaseMessage[]  输出的类型约束AIMessage
    private readonly modelWithTools: Runnable<BaseMessage[], AIMessage>;
    // 将llm 和业务逻辑分离  llm 变化太快
    // 注入了 provide 的model 
    constructor(@Inject('CHAT_MODEL') model: ChatOpenAI) {
        this.modelWithTools = model.bindTools([
            queryUserTool
        ]);
    }
    // 同步调用 llm 完全生成后再返回
    // async runChain(query: string): Promise<string> {
        
    // }
    // 流式调用 llm 边生成边返回
    // generator 生成器函数 
    async *runChainStream(query: string): AsyncIterable<string> {
       const messages: BaseMessage[] = [
        new SystemMessage(`你是一个智能助手, 可以在需要时调用工具(如 query_user)
            来查询用户信息，再用结果回答用户的问题。
        `),
        new HumanMessage(query),
       ];
       // agent loop 
       while(true) {
        // stream 流式生成
        const stream = await this.modelWithTools.stream(messages);
        let fullAIMessage: AIMessageChunk | null = null;
        // as 类型断言
        for await (const chunk of stream as AsyncIterable<AIMessageChunk>) {
            fullAIMessage = fullAIMessage ? fullAIMessage.concat(chunk):chunk;
            // 判断是否存在工具调用
            const hasToolCallChunk = !!fullAIMessage.tool_call_chunks &&
                fullAIMessage.tool_call_chunks.length > 0;
            if (!hasToolCallChunk && chunk.content) {
                yield chunk.content as string;
            }
        }
        if (!fullAIMessage) {
            return ;
        }
        // stream , chunk 且不是tool yield 直接返回
        // stream 结束, 一条完整的AIMessage 
        messages.push(fullAIMessage);
        // ?? 空值合并运算符
        const toolCalls = fullAIMessage.tool_calls ?? [];
        if (!toolCalls.length) {
            return ;
        }
        for (const toolCall of toolCalls) {
            const toolCallId = toolCall.id || '';
            const toolName = toolCall.name;
            if (toolName === 'query_user') {
                const args = queryUserArgsSchema.parse(toolCall.args);
                const result = await queryUserTool.invoke(args);
                messages.push(
                    new ToolMessage({
                        content: result,
                        name: toolName,
                        tool_call_id: toolCallId,
                    })
                )
            }
        }

       } 
    }
}