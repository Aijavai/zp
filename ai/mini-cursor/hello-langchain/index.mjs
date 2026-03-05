import { ChatOpenAI } from "@langchain/openai";
import { config } from 'dotenv';
config();

const model = new ChatOpenAI({
    modelName: 'qwen-coder-turbo',
    apiKey: process.env.API_KEY,
    configuration: {
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    }
});

const response = await model.invoke("介绍一下阿里巴巴集团")
console.log(response.content);