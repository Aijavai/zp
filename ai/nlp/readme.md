# NLP  Natural Language Processing

- **Brain.js** 是一个用于在**浏览器**和**Node.js** 中训练和运行**神经网络**的 JavaScript 库。
- Javascript , 浏览器端完成机器学习任务 
    - 传统机器学习环境 Python GPU
    - 现在浏览器端也可以了
    - 神经网络实现机器学习

- 基于神经网络实现机器学习的例子
    - brain.js 实现了神经网络
    - 知识/数据，让它学习
    - 基于新学习的内容 回答问题
    - 智能表现
- 拿出样本数据
    - input 输入 
    - brain.js 计算后
    - output 
    - 机器学习中的比较简单的分类问题
    - 数据准确性、丰富性很重要

- Brain.js 
    - Simple API  
    Brain.js 提供了非常简洁的 API。你只需要定义输入和期望的输出，然后调用 train() 方法，库就会自动处理背后的复杂计算。
    const brain = require('brain.js');
    const net = new brain.NeuralNetwork();

    net.train.([
        {input:[], output:[]}
        {input:[], output:[]}
        {input:[], output:[]}
    ]);

    const output = net.run([1, 0]);
## 大模型训练师
    LLM trainer

## 25年AI的发展
- openai 发布了Sora2 冲击 tiktok
- 豆包植入了一键购买 AI电商
- openai发布了 Atlas AI浏览器，冲击Google
- to B 企业端 AI Agents 正在提高效率

使用大模型来搜索，解决问题 LLM 有比百度/淘宝更好的**用户体验**