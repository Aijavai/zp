import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    }
});

inMemoryDemo()
    .catch(console.error);

async function inMemoryDemo() {
    const history = new InMemoryChatMessageHistory();
    const systemMessage = new SystemMessage(
        `你是一个友好、幽默的做菜助手，喜欢分享美食和烹饪技巧`
    );  
    console.log('[第一轮对话]');
    const userMessage1 = new HumanMessage('你今天吃什么？')
    await history.addMessage(userMessage1);
    const messages1 = [systemMessage, ...(await history.getMessages())];
    const response1 = await model.invoke(messages1);
    await history.addMessage(response1);
    console.log(response1.content);
    console.log('[第二轮对话]');
    const userMessage2 = new HumanMessage('你觉得味道如何？')
    await history.addMessage(userMessage2);
    const messages2 = [systemMessage, ...(await history.getMessages())];
    const response2 = await model.invoke(messages2);
    await history.addMessage(response2);
    console.log(response2.content);
    console.log('--------------------------------');
    console.log(messages2);
}