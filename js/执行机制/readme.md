# JS 执行机制

## 一、JS引擎与运行时

### 1.1 V8引擎架构
Chrome 浏览器的**V8 引擎** 负责代码的编译和执行         

- **解析器（Parser）**：将源代码解析成抽象语法树（AST）     // 编译有三个阶段，生成AST 是其中之一
- **解释器（Ignition）**：将AST转换为字节码并执行           // 编译三阶段之一，生成可执行代码
- **编译器（TurboFan）**：将热点代码（频繁执行的代码）编译为优化的机器码
- **垃圾回收器（Garbage Collector）**：管理内存


// ？？？
### 1.2 运行时环境
```
┌─────────────────────────────────────┐
│          JavaScript 代码            │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       调用栈（Call Stack）           │
│     执行上下文（Execution Context）  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         堆内存（Heap）               │
│       存储对象和引用类型              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Web APIs / Node APIs           │
│  (setTimeout, Promise, DOM, etc.)   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        任务队列（Task Queue）        │
│   - 宏任务队列（Macrotask Queue）   │
│   - 微任务队列（Microtask Queue）   │
└─────────────────────────────────────┘
```

## 二、执行上下文（Execution Context）

### 2.1 执行上下文的类型

1. **全局执行上下文（Global EC）**
   - 创建全局对象（浏览器中是window，Node中是global）
   - 创建this绑定到全局对象
   - 只有一个

2. **函数执行上下文（Function EC）**
   - 每次函数调用时创建
   - 可以有无数个

// eval 是js 的一个全局函数，可以将字符串作为js代码执行
3. **Eval执行上下文**
   - eval函数内部的代码
   - 不推荐使用

### 2.2 执行上下文的创建过程

执行上下文分为两个阶段：**创建阶段（编译阶段）** 和 **执行阶段**

#### 创建阶段
```javascript
ExecutionContext = {
  // 词法环境
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative", // 或 "Object"
      // 标识符绑定
    },
    outer: <外部环境引用>,
    ThisBinding: <this值>
  },
  
  // 变量环境
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // var声明的变量
    },
    outer: <外部环境引用>,
    ThisBinding: <this值>
  }
}
```

**关键点：**
- `let`、`const`、函数声明 → 词法环境（LexicalEnvironment）   
- `var`、函数表达式 → 变量环境（VariableEnvironment）
- `let`/`const` 存在暂时性死区（TDZ），不会被提升初始化
- `var` 会被提升并初始化为 `undefined`

#### 执行阶段
- 逐行执行代码
- 给变量赋值
- 执行函数调用

##### 编译过程
1. 创建执行上下文
2. 找形参和变量声明，提升到变量环境 undefined
3. 统一形参和实参的值（全局除外）
4. 找函数申明将函数名作为key, 值为函数体

### 2.3 变量提升与暂时性死区

```javascript
// var 的情况 - 变量提升
console.log(a); // undefined（已提升并初始化） 变量环境
var a = 10;

// 等价于：
var a = undefined;
console.log(a);
a = 10;

// let/const 的情况 - 暂时性死区
console.log(b); // ReferenceError: Cannot access 'b' before initialization   词法环境
let b = 20;

// 函数提升
foo(); // "Hello" - 函数声明会完整提升
function foo() {
  console.log("Hello");
}

bar(); // TypeError: bar is not a function
var bar = function() {
  console.log("World");
};
```

## 三、调用栈（Call Stack）

### 3.1 调用栈的工作原理

调用栈是一个**后进先出（LIFO）**的数据结构，用于存储代码执行期间创建的所有执行上下文。

```javascript
function first() {
  console.log("进入first");
  second();
  console.log("离开first");
}

function second() {
  console.log("进入second");
  third();
  console.log("离开second");
}

function third() {
  console.log("进入third");
  console.log("离开third");
}

first();

// 调用栈的变化：
// 1. [Global EC]
// 2. [Global EC, first()]
// 3. [Global EC, first(), second()]
// 4. [Global EC, first(), second(), third()]
// 5. [Global EC, first(), second()]  // third执行完出栈
// 6. [Global EC, first()]           // second执行完出栈
// 7. [Global EC]                    // first执行完出栈
```

### 3.2 栈溢出

```javascript
// 递归调用没有终止条件会导致栈溢出
function recursion() {
  recursion();
}

recursion(); // RangeError: Maximum call stack size exceeded
```

## 四、事件循环（Event Loop）⭐⭐⭐

### 4.1 事件循环机制

**核心概念：** JavaScript是单线程的，但通过事件循环机制实现异步操作。

```
┌───────────────────────────┐
│      调用栈为空？          │
│          ↓                │
│   执行所有微任务           │
│          ↓                │
│   取出一个宏任务执行        │
│          ↓                │
│   执行所有微任务           │
│          ↓                │
│   （重复循环）             │
└───────────────────────────┘
```

### 4.2 宏任务（Macrotask）与微任务（Microtask）

#### 宏任务（Macrotask）
- `script`（整体代码）
- `setTimeout`
- `setInterval`
- `setImmediate`（Node.js）
- I/O操作
- UI渲染
- `requestAnimationFrame`

#### 微任务（Microtask）
- `Promise.then/catch/finally`
- `async/await`（本质是Promise）
- `MutationObserver`（浏览器）
- `process.nextTick`（Node.js，优先级最高）
- `queueMicrotask`

### 4.3 执行顺序

**关键规则：**
1. 同步代码优先执行
2. 每执行一个宏任务后，清空所有微任务
3. 微任务优先级高于宏任务
4. Node.js中 `process.nextTick` 优先级最高

```javascript
console.log('1'); // 同步

setTimeout(() => {
  console.log('2'); // 宏任务
  Promise.resolve().then(() => {
    console.log('3'); // 微任务
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4'); // 微任务
  setTimeout(() => {
    console.log('5'); // 宏任务
  }, 0);
});

console.log('6'); // 同步

// 输出顺序：1 6 4 2 3 5
// 解析：
// 同步代码：1, 6
// 第一轮微任务：4（同时注册了setTimeout 5）
// 第二轮宏任务：2（同时注册了Promise 3）
// 第二轮微任务：3
// 第三轮宏任务：5
```

## 五、经典面试题解析 ⭐⭐⭐⭐⭐

### 5.1 混合题型

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});

console.log('script end');

// 输出顺序：
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

**解析：**
1. 同步代码：`script start` → `async1 start` → `async2` → `promise1` → `script end`
2. 微任务：`async1 end` → `promise2`
3. 宏任务：`setTimeout`

### 5.2 await的本质

```javascript
// async/await 的本质是 Promise + Generator

// 这段代码：
async function foo() {
  console.log('1');
  await bar();
  console.log('2');
}

// 等价于：
function foo() {
  return new Promise((resolve) => {
    console.log('1');
    Promise.resolve(bar()).then(() => {
      console.log('2');
      resolve();
    });
  });
}
```

### 5.3 Promise链式调用

```javascript
Promise.resolve()
  .then(() => {
    console.log('1');
    return Promise.resolve('2');
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log('3');
    return '4';
  })
  .then((res) => {
    console.log(res);
  });

// 输出：1 3 2 4
// 注意：return Promise.resolve() 会导致额外的微任务
```

### 5.4 复杂混合题

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

new Promise((resolve, reject) => {
  console.log('4');
  resolve();
}).then(() => {
  console.log('5');
  setTimeout(() => {
    console.log('6');
  }, 0);
}).then(() => {
  console.log('7');
});

setTimeout(() => {
  console.log('8');
  Promise.resolve().then(() => {
    console.log('9');
  });
}, 0);

console.log('10');

// 输出：1 4 10 5 7 2 3 8 9 6
```

**详细解析：**
```
执行过程：
1. 同步代码：1, 4, 10
2. 微任务队列：[then5]
   执行微任务：5（注册setTimeout6）
3. 微任务队列：[then7]
   执行微任务：7
4. 宏任务队列：[setTimeout2, setTimeout8, setTimeout6]
   执行宏任务：2（注册微任务then3）
5. 微任务队列：[then3]
   执行微任务：3
6. 执行宏任务：8（注册微任务then9）
7. 微任务队列：[then9]
   执行微任务：9
8. 执行宏任务：6
```

### 5.5 Node.js中的特殊情况

```javascript
// Node.js 中 process.nextTick 优先级最高
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

process.nextTick(() => {
  console.log('4');
});

console.log('5');

// 输出：1 5 4 3 2
// process.nextTick > Promise.then > setTimeout
```

## 六、this绑定规则

### 6.1 默认绑定
```javascript
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); // 2（非严格模式下this指向window）
```

### 6.2 隐式绑定
```javascript
function foo() {
  console.log(this.a);
}
const obj = {
  a: 2,
  foo: foo
};
obj.foo(); // 2（this指向obj）
```

### 6.3 显式绑定
```javascript
function foo() {
  console.log(this.a);
}
const obj = { a: 2 };
foo.call(obj);  // 2
foo.apply(obj); // 2
const bar = foo.bind(obj);
bar(); // 2
```

### 6.4 new绑定
```javascript
function Foo(a) {
  this.a = a;
}
const bar = new Foo(2);
console.log(bar.a); // 2
```

### 6.5 箭头函数
```javascript
const obj = {
  a: 2,
  foo: function() {
    setTimeout(() => {
      console.log(this.a); // 2（箭头函数this继承自外层）
    }, 0);
  }
};
obj.foo();
```

## 七、闭包与作用域链

### 7.1 作用域链

```javascript
let a = 'global';

function outer() {
  let b = 'outer';
  
  function inner() {
    let c = 'inner';
    console.log(a, b, c); // 'global' 'outer' 'inner'
  }
  
  inner();
}

outer();

// 作用域链：inner scope → outer scope → global scope
```

### 7.2 闭包经典问题

```javascript
// 问题：
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 输出：3 3 3

// 解决方案1：使用let（块级作用域）
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 输出：0 1 2

// 解决方案2：使用IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j);
    }, 0);
  })(i);
}
// 输出：0 1 2

// 解决方案3：使用闭包
for (var i = 0; i < 3; i++) {
  setTimeout(((j) => {
    return () => console.log(j);
  })(i), 0);
}
// 输出：0 1 2
```

## 八、内存管理与垃圾回收

### 8.1 内存生命周期

1. **分配内存**：声明变量、函数、对象时分配
2. **使用内存**：读写操作
3. **释放内存**：垃圾回收

### 8.2 垃圾回收算法

#### 标记清除（Mark-and-Sweep）- 主流算法
```javascript
function foo() {
  let obj = { name: 'test' }; // obj被标记为活动对象
  // 使用obj
} // 函数执行完，obj不再被引用，被标记为垃圾，等待回收
```

#### 引用计数（Reference Counting）
```javascript
// 问题：循环引用导致内存泄漏
function problem() {
  let obj1 = {};
  let obj2 = {};
  obj1.ref = obj2;
  obj2.ref = obj1; // 循环引用
  // 即使函数执行完，引用计数算法无法回收
}
```

### 8.3 常见内存泄漏

```javascript
// 1. 意外的全局变量
function foo() {
  bar = 'hello'; // 没有var/let/const，变成全局变量
}

// 2. 被遗忘的定时器
const timer = setInterval(() => {
  // ...
}, 1000);
// 忘记清除：clearInterval(timer)

// 3. 闭包引用
function outer() {
  let largeData = new Array(1000000);
  return function inner() {
    console.log(largeData[0]); // inner持有largeData引用
  };
}
const fn = outer(); // largeData无法被回收

// 4. DOM引用
let elements = {
  button: document.getElementById('button')
};
document.body.removeChild(elements.button);
// elements.button 仍然引用DOM，导致内存泄漏
// 应该：elements.button = null
```

## 九、浏览器与Node.js事件循环差异

### 9.1 浏览器事件循环
```
宏任务 → 微任务（清空） → 渲染 → 宏任务 → 微任务（清空） → ...
```

### 9.2 Node.js事件循环

Node.js有6个阶段：
```
   ┌───────────────────────────┐
┌─>│           timers          │  setTimeout/setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  系统操作的回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  内部使用
│  └─────────────┬─────────────┘      
│  ┌─────────────┴─────────────┐
│  │           poll            │  I/O回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  socket.on('close')
   └───────────────────────────┘
```

**process.nextTick 和 Promise优先级：**
```
process.nextTick > Promise.then > 事件循环的各个阶段
```

```javascript
// Node.js示例
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

// 输出顺序不确定！
// 因为setTimeout(0)实际上是setTimeout(1)
// 如果事件循环启动时间<1ms，先执行timeout
// 如果事件循环启动时间>=1ms，先执行immediate
```

## 十、面试高频问题总结

### 10.1 必须掌握的核心概念
1. ✅ 执行上下文的创建过程
2. ✅ 调用栈的工作原理
3. ✅ 事件循环机制
4. ✅ 宏任务与微任务的区别和执行顺序
5. ✅ Promise的执行原理
6. ✅ async/await的本质
7. ✅ 闭包和作用域链
8. ✅ this绑定规则
9. ✅ 垃圾回收机制

### 10.2 常见面试题类型
- 代码输出顺序题（必考）
- async/await执行顺序
- Promise链式调用
- 事件循环混合题
- 闭包与内存泄漏
- 手写实现系列

### 10.3 答题技巧
1. 遇到代码题：先识别同步/异步
2. 标记宏任务和微任务
3. 按照执行顺序逐步分析
4. 注意await相当于Promise.then
5. 注意返回Promise会产生额外微任务

## 十一、手写实现题

### 11.1 实现一个简单的事件循环模拟

```javascript
class EventLoop {
  constructor() {
    this.macrotaskQueue = [];
    this.microtaskQueue = [];
  }

  // 添加宏任务
  addMacrotask(task) {
    this.macrotaskQueue.push(task);
  }

  // 添加微任务
  addMicrotask(task) {
    this.microtaskQueue.push(task);
  }

  // 执行事件循环
  run() {
    // 执行所有宏任务
    while (this.macrotaskQueue.length || this.microtaskQueue.length) {
      // 取一个宏任务
      if (this.macrotaskQueue.length) {
        const macrotask = this.macrotaskQueue.shift();
        macrotask();
      }

      // 清空所有微任务
      while (this.microtaskQueue.length) {
        const microtask = this.microtaskQueue.shift();
        microtask();
      }
    }
  }
}

// 使用示例
const eventLoop = new EventLoop();

console.log('start');

eventLoop.addMacrotask(() => console.log('macrotask 1'));
eventLoop.addMicrotask(() => console.log('microtask 1'));
eventLoop.addMicrotask(() => console.log('microtask 2'));
eventLoop.addMacrotask(() => console.log('macrotask 2'));

console.log('end');

eventLoop.run();

// 输出：start end microtask 1 microtask 2 macrotask 1 macrotask 2
```

### 11.2 实现Promise

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
}
```

### 11.3 实现async/await

```javascript
// async/await 本质上是Generator + Promise的语法糖

// Generator版本
function* generatorFunc() {
  const result1 = yield fetch('url1');
  const result2 = yield fetch('url2');
  return result2;
}

// 自动执行器
function run(gen) {
  return new Promise((resolve, reject) => {
    const g = gen();

    function step(nextFunc) {
      let next;
      try {
        next = nextFunc();
      } catch (error) {
        return reject(error);
      }

      if (next.done) {
        return resolve(next.value);
      }

      Promise.resolve(next.value).then(
        (value) => step(() => g.next(value)),
        (error) => step(() => g.throw(error))
      );
    }

    step(() => g.next());
  });
}

// 使用
run(generatorFunc).then(result => console.log(result));
```

## 十二、总结与学习路线

### 核心知识图谱
```
JS执行机制
├── 基础概念
│   ├── 执行上下文
│   ├── 调用栈
│   └── 作用域链
├── 异步编程
│   ├── 事件循环
│   ├── 宏任务/微任务
│   ├── Promise
│   └── async/await
├── 内存管理
│   ├── 垃圾回收
│   └── 内存泄漏
└── 高级主题
    ├── this绑定
    ├── 闭包
    └── 浏览器vs Node差异
```

### 学习建议
1. 从基础概念入手，理解执行上下文和调用栈
2. 深入学习事件循环，大量练习输出顺序题
3. 理解Promise原理，手写实现
4. 掌握内存管理，识别常见内存泄漏
5. 对比浏览器和Node.js的差异

### 推荐资源
- 📚 《你不知道的JavaScript》
- 📚 《JavaScript高级程序设计》
- 🌐 MDN Web Docs
- 🎥 [Event Loop可视化工具](http://latentflip.com/loupe/)
- 🎯 LeetCode异步编程专题

---

**持续更新中... 欢迎补充和指正！**