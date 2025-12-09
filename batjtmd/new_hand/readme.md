# 手写new 

- new 实例运算符
- 实例化的过程
  - new 构造函数 原型式的面向对象
  - 从空对象开始
  - this 指向新创建的对象，运行构造函数
  - __proto__ 指向构造函数的原型对象
  - 返回对象

## 类数组 Arguments 
- 函数运行时候的参数对象
- js 函数的参数也是动态的

- 类数组
  - 有长度属性
  - 可以使用索引访问
    for
  - 不能使用数组的方法
    reduce map join...
  - 变成真的数组
    Array.from(arguments)
    args = [...arguments]



[Object: null prototype] {} 是什么？
这是 Node.js / V8 对“原型为 null 的普通对象”的一种特殊打印格式。