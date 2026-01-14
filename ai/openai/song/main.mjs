// console.log('hello world!');
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config(); // .env 文件中的配置添加到环境变量
// llm client 实例化
const client = new OpenAI(
  {
    apiKey: 'sk-Nyj0O5YmfQLkcHg0p6L5peB1nDDKvsAp07Q40v1x9IcNF0P8',
    // baseURL:'https://api.openai.com/v1'
    baseURL: 'https://api.302.ai/v1'
  }
);
// 异步的操作
const response = await client.chat.completions.create({
  // 文本模型
  model: 'gpt-3.5-turbo',
  "messages": [
    {
        "role": "system",
        "content": "你是一个诗人，用中文写诗。"
    },
    {
        "role": "user",
        "content": "写一首春天的诗"
    }
  ]
})

console.log(response.choices[0].message);