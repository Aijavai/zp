# DeepSeek

- thinking
  推理 reasoning
- modelscope
  魔搭是阿里云推出的模型开发平台，提供海里机器学习和
  深度学习模型（开源），覆盖语音、视觉、nlp 等。下载
  开源模型，微调或部署模型，致力于降低AI　应用门槛，推动
  模型即服务。
- .ipynb
  - python 天生适合计算和机器学习
  - 可以逐条,随意运行,特别适合实验一个算法、推导一个公式、一个
  大模型的表现
    Jupyter Notebook 文件格式,支持交互编程与数据科学工作流。

## 模块化
<!-- modelscope 预装了 -->
<!-- OpenAI sdk 是绝大多数大模型的api 接口事实标准 -->
<!-- es6 反过来 -->
<!-- 模块化的好处是 分离关注点(一个模块是一个文件干一件事), 提高代码的可维护性和可拓展性。 -->
- from openai import OpenAI

## chat.completions
  - 多轮会话
    - 更好的上下文 messages 传给大模型
  - role
    - system 多轮聊天中,只在最初设置一次, 身份和约定
    - user
    - assistant

## 大模型的数据是训练的
  - 大模型的数据是训练的, 不是收集的
  - 训练数据是 海量的 文本数据, 如 维基百科, 新闻文章, 代码仓库等
  - 训练数据的质量和数量, 直接影响 大模型 的表现

## 大模型如何上网获得实时信息
  - 大模型可以通过 api 调用, 传递 messages 来获得实时信息
  - 也可以通过 插件 来获得实时信息
    - 插件 是一种特殊的 模型, 它可以在 大模型 运行时, 调用 外部的 服务, 如 搜索引擎, 数据库等

## 代码
    https://modelscope.cn/notebook/share/ipynb/94c028fd/未命名.ipynb

    https://modelscope.cn/notebook/share/ipynb/15e7879d/未命名1.ipynb