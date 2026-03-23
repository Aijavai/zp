import { config } from 'dotenv';
config({ path: path.join(process.cwd(), '.env')});
import {
    ChatOpenAI
} from '@langchain/openai';
import {
    FileSystemChatMessageHistory
} from '@langchain/community/stores/message/file_system';
import {
    HumanMessage,
    AIMessage,
    SystemMessage
} from '@langchain/core/messages';
import path from 'node:path';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    }
})

async function fileHistoryDemo() {
    const filePath = path.join(process.cwd(), "chat-history.json");
    const sessionId = "user_session_001"; // 新一轮会话的会话id 

    const systemMessage = new SystemMessage(
        "你是一个友好的做菜助手，喜欢分享美食和烹饪技巧。"
    )
    console.log("[第一轮对话]");
    const history = new FileSystemChatMessageHistory({filePath, sessionId});
    console.log(history)
    console.log("--------------------------------");
    const userMessage1 = new HumanMessage("可乐鸡翅怎么做？");
    await history.addMessage(userMessage1);

    const message1 = [systemMessage, ...(await history.getMessages())];
    console.log(message1);
    console.log("--------------------------------");

    const response1 = await model.invoke(message1);
    console.log(response1);
    await history.addMessage(response1);
    console.log("--------------------------------");

    const message2 = [systemMessage, ...(await history.getMessages())];
    console.log(message2);
    console.log("--------------------------------");
    const response2 = await model.invoke(message2);
    console.log(response2);
    await history.addMessage(response2);
    console.log("--------------------------------");

}

fileHistoryDemo().
    catch(console.error);