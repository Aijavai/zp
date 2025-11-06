# JS执行机制 - 大厂高频面试题汇总

## 目录
- [理论问答题](#理论问答题)
- [代码输出题](#代码输出题)
- [手写实现题](#手写实现题)
- [场景应用题](#场景应用题)
- [答案与解析](#答案与解析)

---

## 理论问答题

### Q1: 请解释JavaScript的事件循环机制

**考察点：** 执行栈、任务队列、宏任务、微任务

**答题要点：**
- JavaScript是单线程的
- 事件循环的工作流程
- 宏任务和微任务的区别
- 执行顺序规则

### Q2: 宏任务和微任务有哪些？它们的执行顺序是怎样的？

**考察点：** 任务分类、执行优先级

### Q3: 什么是执行上下文？执行上下文包含哪些内容？

**考察点：** 变量环境、词法环境、this绑定

### Q4: 请解释变量提升和暂时性死区

**考察点：** var、let、const的区别

### Q5: async/await的本质是什么？

**考察点：** Promise、Generator、语法糖

### Q6: 解释JavaScript的垃圾回收机制

**考察点：** 标记清除、引用计数、内存泄漏

### Q7: 浏览器和Node.js的事件循环有什么区别？

**考察点：** 环境差异、process.nextTick

---

## 代码输出题

### 题目1 ⭐⭐
```javascript
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);

// 输出是什么？
```

### 题目2 ⭐⭐⭐
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

// 输出是什么？
```

### 题目3 ⭐⭐⭐⭐
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

// 输出是什么？
```

### 题目4 ⭐⭐⭐⭐⭐ (字节跳动真题)
```javascript
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res);
});

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
});

// 输出是什么？为什么？
```

### 题目5 ⭐⭐⭐ (闭包)
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// 输出是什么？如何修改才能输出 0 1 2？
```

### 题目6 ⭐⭐⭐⭐ (this绑定)
```javascript
var name = 'global';

const obj = {
  name: 'obj',
  foo1: function() {
    console.log(this.name);
  },
  foo2: () => {
    console.log(this.name);
  },
  foo3: function() {
    return function() {
      console.log(this.name);
    };
  },
  foo4: function() {
    return () => {
      console.log(this.name);
    };
  }
};

obj.foo1();       // ?
obj.foo2();       // ?
obj.foo3()();     // ?
obj.foo4()();     // ?

const fn = obj.foo1;
fn();             // ?
```

### 题目7 ⭐⭐⭐⭐ (Promise链)
```javascript
Promise.resolve()
  .then(() => {
    console.log('1');
    throw new Error('error');
  })
  .catch(() => {
    console.log('2');
    return Promise.reject('reject');
  })
  .catch(() => {
    console.log('3');
  })
  .then(() => {
    console.log('4');
  });

// 输出是什么？
```

### 题目8 ⭐⭐⭐⭐⭐ (综合题 - 腾讯真题)
```javascript
new Promise((resolve, reject) => {
  console.log('外层Promise');
  resolve();
})
  .then(() => {
    console.log('外层第一个then');
    new Promise((resolve, reject) => {
      console.log('内层Promise');
      resolve();
    })
      .then(() => {
        console.log('内层第一个then');
      })
      .then(() => {
        console.log('内层第二个then');
      });
    return new Promise((resolve, reject) => {
      console.log('另一个内层Promise');
      resolve();
    })
      .then(() => {
        console.log('另一个内层第一个then');
      })
      .then(() => {
        console.log('另一个内层第二个then');
      });
  })
  .then(() => {
    console.log('外层第二个then');
  });

// 输出是什么？
```

### 题目9 ⭐⭐⭐⭐ (Node.js环境)
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  process.nextTick(() => {
    console.log('3');
  });
  new Promise((resolve) => {
    console.log('4');
    resolve();
  }).then(() => {
    console.log('5');
  });
});

process.nextTick(() => {
  console.log('6');
});

new Promise((resolve) => {
  console.log('7');
  resolve();
}).then(() => {
  console.log('8');
});

setTimeout(() => {
  console.log('9');
  process.nextTick(() => {
    console.log('10');
  });
  new Promise((resolve) => {
    console.log('11');
    resolve();
  }).then(() => {
    console.log('12');
  });
});

// 在Node.js环境下输出是什么？
```

### 题目10 ⭐⭐⭐⭐⭐ (综合难题 - 阿里真题)
```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
  setTimeout(() => {
    console.log('timer1');
  }, 0);
}

async function async2() {
  setTimeout(() => {
    console.log('timer2');
  }, 0);
  console.log('async2');
}

async1();

setTimeout(() => {
  console.log('timer3');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
});

console.log('start');

// 输出是什么？
```

---

## 手写实现题

### 题目1: 实现Promise.all
```javascript
function myPromiseAll(promises) {
  // 请实现
}

// 测试
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]
```

### 题目2: 实现Promise.race
```javascript
function myPromiseRace(promises) {
  // 请实现
}
```

### 题目3: 实现一个简易的EventEmitter
```javascript
class EventEmitter {
  // 请实现
  on(event, callback) {}
  emit(event, ...args) {}
  off(event, callback) {}
  once(event, callback) {}
}
```

### 题目4: 实现Promise.retry（失败后重试）
```javascript
function retry(fn, times = 3, delay = 1000) {
  // 请实现一个重试机制
  // fn是返回Promise的函数
  // times是最大重试次数
  // delay是每次重试的延迟
}

// 测试
function unstableFetch() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('success');
    } else {
      reject('error');
    }
  });
}

retry(unstableFetch, 3, 1000)
  .then(console.log)
  .catch(console.error);
```

### 题目5: 实现一个并发控制的Promise池
```javascript
class PromisePool {
  constructor(max) {
    this.max = max; // 最大并发数
  }
  
  add(promiseCreator) {
    // 请实现
    // promiseCreator是返回Promise的函数
  }
}

// 测试
const pool = new PromisePool(2);
const tasks = [1, 2, 3, 4, 5].map(i => 
  () => new Promise(resolve => {
    console.log(`Task ${i} started`);
    setTimeout(() => {
      console.log(`Task ${i} finished`);
      resolve(i);
    }, 1000);
  })
);

tasks.forEach(task => pool.add(task));
```

---

## 场景应用题

### 场景1: 防抖和节流
实现一个防抖函数和节流函数，说明它们的区别和使用场景。

### 场景2: 请求合并
如何优化多个相同的并发请求，使其只发送一次？

### 场景3: 内存泄漏排查
给出代码，找出可能的内存泄漏点并修复。

### 场景4: 大量数据渲染优化
如何优化一次性渲染10万条数据导致的页面卡顿？

---

## 答案与解析

### 题目1答案
```
输出：1 4 3 2

解析：
1. 同步代码：1, 4
2. 微任务：3 (Promise)
3. 宏任务：2 (setTimeout)
```

### 题目2答案
```
输出：
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout

解析：
1. 同步：script start → async1 start → async2 → promise1 → script end
2. 微任务：async1 end → promise2
3. 宏任务：setTimeout
```

### 题目3答案
```
输出：1 4 10 5 7 2 3 8 9 6

解析过程：
1. 同步代码：1, 4, 10
2. 第一轮微任务：5 (注册setTimeout 6)
3. 第二轮微任务：7
4. 第一个宏任务：2 (注册微任务 3)
5. 执行微任务：3
6. 第二个宏任务：8 (注册微任务 9)
7. 执行微任务：9
8. 第三个宏任务：6
```

### 题目4答案（重点）
```
输出：0 1 2 3 4 5 6

解析：
return Promise.resolve(4) 会产生额外的两个微任务！
这是Promise的特殊规范（thenable处理）

详细过程：
微任务1: console.log(0), 返回Promise.resolve(4)
微任务2: console.log(1)
微任务3: Promise.resolve(4)的第一次展开
微任务4: console.log(2)
微任务5: Promise.resolve(4)的第二次展开
微任务6: console.log(3)
微任务7: console.log(4) [第一个Promise的then]
微任务8: console.log(5)
微任务9: console.log(6)

这是字节跳动的经典题，考察对Promise规范的深入理解！
```

### 题目5答案
```
输出：3 3 3

原因：var没有块级作用域，循环结束后i=3，setTimeout异步执行时访问的都是同一个i

解决方案：
1. 使用let: for (let i = 0; i < 3; i++) {}
2. 使用IIFE: (function(j) { setTimeout(...) })(i)
3. 使用bind: setTimeout(console.log.bind(null, i), 0)
```

### 题目6答案
```
obj.foo1();       // 'obj' (隐式绑定)
obj.foo2();       // 'global' (箭头函数继承外层this)
obj.foo3()();     // 'global' (默认绑定)
obj.foo4()();     // 'obj' (箭头函数继承外层this)
fn();             // 'global' (默认绑定)
```

### 手写Promise.all答案
```javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }
    
    const results = [];
    let completedCount = 0;
    const len = promises.length;
    
    if (len === 0) {
      return resolve([]);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          completedCount++;
          
          if (completedCount === len) {
            resolve(results);
          }
        },
        reason => {
          reject(reason);
        }
      );
    });
  });
}
```

### 手写Promise.race答案
```javascript
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }
    
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}
```

### 手写EventEmitter答案
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(...args);
      });
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        cb => cb !== callback
      );
    }
  }
  
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}
```

### 手写Promise.retry答案
```javascript
function retry(fn, times = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt() {
      fn()
        .then(resolve)
        .catch(err => {
          if (times === 0) {
            reject(err);
          } else {
            times--;
            console.log(`重试中... 剩余次数: ${times}`);
            setTimeout(attempt, delay);
          }
        });
    }
    
    attempt();
  });
}
```

### 手写PromisePool答案
```javascript
class PromisePool {
  constructor(max) {
    this.max = max;
    this.current = 0;
    this.queue = [];
  }
  
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseCreator, resolve, reject });
      this.run();
    });
  }
  
  run() {
    while (this.current < this.max && this.queue.length) {
      this.current++;
      const { promiseCreator, resolve, reject } = this.queue.shift();
      
      promiseCreator()
        .then(resolve, reject)
        .finally(() => {
          this.current--;
          this.run();
        });
    }
  }
}
```

---

## 面试技巧总结

### 1. 答题思路
- **先说原理**：简明扼要说出核心概念
- **再讲流程**：描述执行过程
- **最后总结**：强调关键点

### 2. 加分项
- 能画图说明执行流程
- 能说出浏览器和Node.js的差异
- 能联系实际应用场景
- 能说出性能优化建议

### 3. 常见误区
- ❌ 混淆宏任务和微任务
- ❌ 不理解await的本质
- ❌ 忽略Promise构造函数内部是同步的
- ❌ 忽略return Promise会产生额外微任务

### 4. 推荐学习资源
- 📚 《JavaScript高级程序设计》第25章
- 🎥 [Loupe - Event Loop可视化](http://latentflip.com/loupe/)
- 📝 Jake Archibald的博客文章
- 💻 多刷LeetCode并发题目

---

**持续更新中，祝面试顺利！🚀**

