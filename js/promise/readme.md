# Promise 考点总结（大厂级别）

## 目录
- [1. Promise基础](#1-promise基础)
- [2. Promise核心概念](#2-promise核心概念)
- [3. Promise API](#3-promise-api)
- [4. 手写实现](#4-手写实现)
- [5. async/await](#5-asyncawait)
- [6. 高频面试题](#6-高频面试题)
- [7. 经典输出题](#7-经典输出题)
- [8. 实战应用](#8-实战应用)
- [9. 易错点](#9-易错点)

---

## 1. Promise基础

### 1.1 Promise是什么？
```javascript
// Promise是异步编程的一种解决方案
// 它是一个对象，用来表示一个异步操作的最终完成（或失败）及其结果值

// 解决回调地狱问题
// 回调地狱示例
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});

// Promise 改造
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => console.log(d))
  .catch(err => console.error(err));

// async/await 进一步优化
async function fetchData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    console.log(d);
  } catch (err) {
    console.error(err);
  }
}
```

### 1.2 Promise的三种状态
```javascript
// 1. pending（进行中）
// 2. fulfilled（已成功）
// 3. rejected（已失败）

// 状态特点：
// - 状态只能从 pending -> fulfilled 或 pending -> rejected
// - 状态一旦改变，就不会再变，任何时候都可以得到这个结果
// - 无法取消Promise，一旦新建就会立即执行

const promise = new Promise((resolve, reject) => {
  console.log('Promise立即执行');
  
  // 模拟异步操作
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve('成功'); // pending -> fulfilled
    } else {
      reject('失败'); // pending -> rejected
    }
  }, 1000);
});

console.log('同步代码继续执行');

promise
  .then(value => console.log(value))
  .catch(error => console.log(error));
```

### 1.3 基本用法
```javascript
// 创建Promise
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (/* 成功 */) {
    resolve(value); // 将状态从pending变为fulfilled
  } else {
    reject(error); // 将状态从pending变为rejected
  }
});

// 使用Promise
promise
  .then(value => {
    // 成功时的处理
    return newValue;
  })
  .catch(error => {
    // 失败时的处理
    console.error(error);
  })
  .finally(() => {
    // 无论成功失败都会执行
    console.log('finally');
  });
```

---

## 2. Promise核心概念

### 2.1 then方法的链式调用
```javascript
// then返回一个新的Promise
promise
  .then(value => {
    console.log(value);
    return value + 1; // 返回值会被包装成Promise.resolve(value + 1)
  })
  .then(value => {
    console.log(value); // 上一个then的返回值
    return Promise.resolve(value + 1); // 返回Promise
  })
  .then(value => {
    console.log(value);
    throw new Error('error'); // 抛出错误
  })
  .then(value => {
    console.log('不会执行');
  })
  .catch(error => {
    console.error(error); // 捕获错误
    return 'error handled';
  })
  .then(value => {
    console.log(value); // 'error handled' - catch后可以继续then
  });
```

### 2.2 then的两个参数
```javascript
promise.then(
  // onFulfilled - 成功回调
  value => {
    console.log('Success:', value);
  },
  // onRejected - 失败回调（可选）
  error => {
    console.log('Error:', error);
  }
);

// 等价于
promise
  .then(value => {
    console.log('Success:', value);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// 区别：catch可以捕获then中抛出的错误
promise
  .then(
    value => {
      throw new Error('then中的错误');
    },
    error => {
      console.log('捕获不到then中的错误');
    }
  );

promise
  .then(value => {
    throw new Error('then中的错误');
  })
  .catch(error => {
    console.log('可以捕获到'); // ✅
  });
```

### 2.3 Promise的值穿透
```javascript
Promise.resolve(1)
  .then(2) // 非函数，发生值穿透
  .then(Promise.resolve(3)) // 非函数，发生值穿透
  .then(console.log); // 1

// 正确写法
Promise.resolve(1)
  .then(value => 2)
  .then(value => Promise.resolve(3))
  .then(console.log); // 3
```

### 2.4 错误处理
```javascript
// 方式1：catch捕获
promise
  .then(value => {
    throw new Error('error');
  })
  .catch(error => {
    console.error(error);
  });

// 方式2：then的第二个参数
promise.then(
  value => console.log(value),
  error => console.error(error)
);

// 方式3：try-catch（只能捕获同步错误）
try {
  const promise = new Promise((resolve, reject) => {
    throw new Error('同步错误'); // ✅ 可以被Promise捕获
  });
} catch (e) {
  console.log('捕获不到'); // ❌
}

// Promise内部会自动捕获错误
new Promise((resolve, reject) => {
  throw new Error('error');
}).catch(error => {
  console.log('可以捕获到'); // ✅
});

// 未捕获的Promise错误
new Promise((resolve, reject) => {
  reject('error');
}); // UnhandledPromiseRejectionWarning

// 错误传递
Promise.reject('error1')
  .then(value => console.log(value))
  .then(value => console.log(value))
  .then(value => console.log(value))
  .catch(error => console.log(error)); // error1 - 错误会一直传递到catch
```

---

## 3. Promise API

### 3.1 Promise.resolve()
```javascript
// 将值转为Promise对象
Promise.resolve(1).then(value => console.log(value)); // 1

// 参数是Promise，直接返回
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(p1);
console.log(p1 === p2); // true

// 参数是thenable对象，转为Promise并立即执行then
const thenable = {
  then(resolve, reject) {
    resolve(42);
  }
};
Promise.resolve(thenable).then(value => console.log(value)); // 42

// 不带参数，返回resolved的Promise
Promise.resolve().then(() => console.log('resolved'));
```

### 3.2 Promise.reject()
```javascript
// 返回一个rejected的Promise
Promise.reject('error').catch(error => console.log(error)); // error

// 参数会原封不动地作为reject的理由
const p = Promise.resolve(1);
Promise.reject(p).catch(error => {
  console.log(error === p); // true
});
```

### 3.3 Promise.all()
```javascript
// 所有Promise都成功才成功，有一个失败就失败
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(values => console.log(values)) // [1, 2, 3]
  .catch(error => console.log(error));

// 有一个失败就失败
const p4 = Promise.reject('error');
Promise.all([p1, p2, p4])
  .then(values => console.log(values))
  .catch(error => console.log(error)); // error

// 应用场景：并发请求
async function fetchAll() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  return { users, posts, comments };
}

// 注意：即使某个Promise失败，其他Promise仍会执行
const p5 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p5执行完毕');
    resolve(5);
  }, 1000);
});

Promise.all([p4, p5])
  .catch(error => {
    console.log(error); // 立即输出 error
    // 1秒后仍会输出 p5执行完毕
  });
```

### 3.4 Promise.race()
```javascript
// 第一个完成的Promise决定结果
const p1 = new Promise(resolve => setTimeout(() => resolve(1), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 500));
const p3 = new Promise(resolve => setTimeout(() => resolve(3), 100));

Promise.race([p1, p2, p3])
  .then(value => console.log(value)); // 3

// 应用场景1：请求超时
function requestWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}

// 应用场景2：多源请求，取最快的
function fetchFromFastestServer(urls) {
  return Promise.race(urls.map(url => fetch(url)));
}
```

### 3.5 Promise.allSettled() - ES2020
```javascript
// 等待所有Promise都结束（无论成功失败）
const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = Promise.resolve(3);

Promise.allSettled([p1, p2, p3])
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'error' },
    //   { status: 'fulfilled', value: 3 }
    // ]
  });

// 应用场景：批量请求，需要知道每个请求的结果
async function batchFetch(urls) {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url))
  );
  
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  
  console.log(`成功: ${successful.length}, 失败: ${failed.length}`);
  return { successful, failed };
}
```

### 3.6 Promise.any() - ES2021
```javascript
// 只要有一个成功就成功，全部失败才失败
const p1 = Promise.reject('error1');
const p2 = Promise.reject('error2');
const p3 = Promise.resolve(3);

Promise.any([p1, p2, p3])
  .then(value => console.log(value)) // 3
  .catch(error => console.log(error));

// 全部失败返回AggregateError
Promise.any([p1, p2])
  .catch(error => {
    console.log(error); // AggregateError: All promises were rejected
    console.log(error.errors); // ['error1', 'error2']
  });

// 应用场景：多个备用资源，有一个可用就行
async function loadImageFromCDN(imageUrls) {
  return Promise.any(imageUrls.map(url => loadImage(url)));
}
```

### 3.7 方法对比总结
```javascript
// Promise.all - 全部成功才成功
// Promise.race - 第一个完成决定结果
// Promise.allSettled - 全部完成（不管成功失败）
// Promise.any - 有一个成功就成功

const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = Promise.resolve(3);

// all: 有一个失败就失败
Promise.all([p1, p2, p3]); // reject('error')

// race: 第一个完成决定
Promise.race([p1, p2, p3]); // resolve(1) 或 reject('error')，取决于哪个先完成

// allSettled: 等待全部完成
Promise.allSettled([p1, p2, p3]); // resolve([{...}, {...}, {...}])

// any: 有一个成功就成功
Promise.any([p1, p2, p3]); // resolve(1)
```

---

## 4. 手写实现

### 4.1 手写Promise（简版）
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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    
    return promise2;
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }
  
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;
      
      if (promises.length === 0) {
        resolve(results);
        return;
      }
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = value;
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          },
          reason => reject(reason)
        );
      });
    });
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }
  
  static allSettled(promises) {
    return new MyPromise(resolve => {
      const results = [];
      let count = 0;
      
      if (promises.length === 0) {
        resolve(results);
        return;
      }
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = { status: 'fulfilled', value };
            count++;
            if (count === promises.length) resolve(results);
          },
          reason => {
            results[index] = { status: 'rejected', reason };
            count++;
            if (count === promises.length) resolve(results);
          }
        );
      });
    });
  }
  
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const errors = [];
      let count = 0;
      
      if (promises.length === 0) {
        reject(new AggregateError([], 'All promises were rejected'));
        return;
      }
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => resolve(value),
          reason => {
            errors[index] = reason;
            count++;
            if (count === promises.length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          }
        );
      });
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected'));
  }
  
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

// 测试
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

p.then(value => {
  console.log(value); // 1
  return value + 1;
}).then(value => {
  console.log(value); // 2
});
```

### 4.2 手写Promise.all
```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    
    const results = [];
    let count = 0;
    
    if (promises.length === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          count++;
          if (count === promises.length) {
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

// 测试
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(values => console.log(values)); // [1, 2, 3]
```

### 4.3 手写Promise.race
```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}

// 测试
promiseRace([
  new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  new Promise(resolve => setTimeout(() => resolve(2), 500)),
  new Promise(resolve => setTimeout(() => resolve(3), 100))
]).then(value => console.log(value)); // 3
```

### 4.4 手写Promise.allSettled
```javascript
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    
    const results = [];
    let count = 0;
    
    if (promises.length === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = { status: 'fulfilled', value };
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        },
        reason => {
          results[index] = { status: 'rejected', reason };
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        }
      );
    });
  });
}
```

### 4.5 手写Promise.any
```javascript
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    
    const errors = [];
    let count = 0;
    
    if (promises.length === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          resolve(value);
        },
        reason => {
          errors[index] = reason;
          count++;
          if (count === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        }
      );
    });
  });
}
```

### 4.6 手写promisify
```javascript
// 将回调函数转为Promise
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
}

// 使用示例
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

readFilePromise('./file.txt', 'utf-8')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

---

## 5. async/await

### 5.1 基本用法
```javascript
// async函数返回Promise
async function foo() {
  return 1; // 等价于 return Promise.resolve(1)
}

foo().then(value => console.log(value)); // 1

// await等待Promise完成
async function bar() {
  const value = await Promise.resolve(1);
  console.log(value); // 1
  return value + 1;
}

bar().then(value => console.log(value)); // 2
```

### 5.2 错误处理
```javascript
// 方式1：try-catch
async function foo() {
  try {
    const value = await Promise.reject('error');
  } catch (error) {
    console.log(error); // error
  }
}

// 方式2：catch方法
async function bar() {
  const value = await Promise.reject('error').catch(error => {
    console.log(error); // error
    return 'default value';
  });
  console.log(value); // default value
}

// 方式3：统一错误处理
async function baz() {
  const value = await Promise.reject('error');
  console.log('不会执行');
}

baz().catch(error => console.log(error)); // error
```

### 5.3 并发控制
```javascript
// 串行执行（慢）
async function serial() {
  const r1 = await fetch('/api/1'); // 等待1秒
  const r2 = await fetch('/api/2'); // 等待1秒
  const r3 = await fetch('/api/3'); // 等待1秒
  // 总共3秒
}

// 并行执行（快）
async function parallel() {
  const [r1, r2, r3] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2'),
    fetch('/api/3')
  ]);
  // 总共1秒
}

// 混合：先并行再串行
async function hybrid() {
  const [r1, r2] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2')
  ]);
  
  const r3 = await fetch('/api/3'); // 需要r1和r2的结果
}
```

### 5.4 循环中使用await
```javascript
// ❌ forEach不支持await
async function foo() {
  [1, 2, 3].forEach(async (item) => {
    await doSomething(item); // 不会等待
  });
  console.log('done'); // 立即执行
}

// ✅ for...of支持await（串行）
async function bar() {
  for (const item of [1, 2, 3]) {
    await doSomething(item); // 依次等待
  }
  console.log('done'); // 全部完成后执行
}

// ✅ map + Promise.all（并行）
async function baz() {
  await Promise.all(
    [1, 2, 3].map(item => doSomething(item))
  );
  console.log('done'); // 全部完成后执行
}

// ✅ reduce（串行）
async function qux() {
  await [1, 2, 3].reduce(async (prev, item) => {
    await prev;
    return doSomething(item);
  }, Promise.resolve());
  console.log('done');
}
```

### 5.5 async/await vs Promise
```javascript
// Promise写法
function fetchData() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => fetch(`/api/posts/${user.id}`))
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.error(error));
}

// async/await写法（更清晰）
async function fetchData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

---

## 6. 高频面试题

### 6.1 实现Promise串行执行
```javascript
// 方式1：reduce
function runPromiseInSequence(promises) {
  return promises.reduce(
    (prev, next) => prev.then(() => next()),
    Promise.resolve()
  );
}

// 方式2：async/await
async function runPromiseInSequence2(promises) {
  for (const promise of promises) {
    await promise();
  }
}

// 测试
const promises = [
  () => new Promise(resolve => setTimeout(() => {
    console.log(1);
    resolve();
  }, 1000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log(2);
    resolve();
  }, 1000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log(3);
    resolve();
  }, 1000))
];

runPromiseInSequence(promises); // 1 2 3（间隔1秒）
```

### 6.2 实现Promise并发限制
```javascript
// 控制并发数量
class PromisePool {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.queue = [];
  }
  
  async add(fn) {
    if (this.count >= this.limit) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    
    this.count++;
    const result = await fn();
    this.count--;
    
    if (this.queue.length) {
      this.queue.shift()();
    }
    
    return result;
  }
}

// 使用
async function fetchWithLimit(urls, limit) {
  const pool = new PromisePool(limit);
  const results = [];
  
  for (const url of urls) {
    results.push(pool.add(() => fetch(url)));
  }
  
  return Promise.all(results);
}

// 测试
const urls = Array.from({ length: 20 }, (_, i) => `/api/data/${i}`);
fetchWithLimit(urls, 3); // 最多3个并发请求

// 方式2：更简洁的实现
async function promiseLimit(promises, limit) {
  const results = [];
  const executing = [];
  
  for (const promise of promises) {
    const p = Promise.resolve(promise());
    results.push(p);
    
    if (limit <= promises.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}
```

### 6.3 实现Promise重试机制
```javascript
// 失败后重试
function retry(fn, times = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt() {
      fn()
        .then(resolve)
        .catch(error => {
          if (times === 0) {
            reject(error);
          } else {
            times--;
            console.log(`剩余重试次数: ${times}`);
            setTimeout(attempt, delay);
          }
        });
    }
    attempt();
  });
}

// 使用
retry(() => fetch('/api/data'), 3, 1000)
  .then(data => console.log(data))
  .catch(error => console.log('重试失败', error));

// 方式2：async/await实现
async function retry2(fn, times = 3, delay = 1000) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === times - 1) throw error;
      console.log(`剩余重试次数: ${times - i - 1}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### 6.4 实现Promise缓存
```javascript
// 缓存Promise结果，避免重复请求
function cachePromise(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const promise = fn(...args)
      .catch(error => {
        cache.delete(key); // 失败时删除缓存
        throw error;
      });
    
    cache.set(key, promise);
    return promise;
  };
}

// 使用
const fetchUser = cachePromise((id) => fetch(`/api/user/${id}`));

fetchUser(1); // 发起请求
fetchUser(1); // 使用缓存
fetchUser(2); // 发起新请求
```

### 6.5 实现Promise超时
```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('timeout')), ms)
    )
  ]);
}

// 使用
timeout(fetch('/api/data'), 5000)
  .then(data => console.log(data))
  .catch(error => console.log(error.message)); // timeout

// 方式2：可取消的超时
function timeoutWithCancel(promise, ms) {
  let timeoutId;
  
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('timeout')), ms);
  });
  
  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    timeoutPromise
  ]);
}
```

### 6.6 实现红绿灯控制
```javascript
// 红灯3秒，绿灯2秒，黄灯1秒，循环
function light(color, duration) {
  return new Promise(resolve => {
    console.log(color);
    setTimeout(resolve, duration);
  });
}

async function trafficLight() {
  while (true) {
    await light('红灯', 3000);
    await light('绿灯', 2000);
    await light('黄灯', 1000);
  }
}

trafficLight();
```

### 6.7 实现睡眠函数
```javascript
// Promise版本
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用
async function demo() {
  console.log('开始');
  await sleep(2000);
  console.log('2秒后');
}

// Generator版本
function* sleepGenerator(ms) {
  yield new Promise(resolve => setTimeout(resolve, ms));
}
```

### 6.8 实现图片加载
```javascript
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
    img.src = url;
  });
}

// 批量加载
async function loadImages(urls) {
  try {
    const images = await Promise.all(urls.map(url => loadImage(url)));
    console.log('所有图片加载完成');
    return images;
  } catch (error) {
    console.error('图片加载失败', error);
  }
}

// 使用allSettled避免一个失败全部失败
async function loadImagesWithFallback(urls) {
  const results = await Promise.allSettled(urls.map(url => loadImage(url)));
  
  const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  const failed = results.filter(r => r.status === 'rejected').map(r => r.reason);
  
  console.log(`成功: ${successful.length}, 失败: ${failed.length}`);
  return { successful, failed };
}
```

---

## 7. 经典输出题

### 7.1 基础输出题
```javascript
// 题目1
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出: 1 4 3 2
// 解析: 同步 -> 微任务 -> 宏任务

// 题目2
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// 输出:
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

### 7.2 then链式调用
```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log);

// 输出: 1
// 解析: then参数不是函数时发生值穿透

Promise.resolve(1)
  .then(value => value + 1)
  .then(value => {
    console.log(value); // 2
    return value + 1;
  })
  .then(value => {
    console.log(value); // 3
  });
```

### 7.3 错误捕获
```javascript
// 题目1
Promise.resolve()
  .then(() => {
    throw new Error('error');
  })
  .then(() => {
    console.log('then1');
  })
  .catch(() => {
    console.log('catch');
  })
  .then(() => {
    console.log('then2');
  });

// 输出: catch then2

// 题目2
Promise.reject('error')
  .then(() => {
    console.log('then1');
  }, () => {
    console.log('then1 reject');
  })
  .catch(() => {
    console.log('catch');
  });

// 输出: then1 reject

// 题目3
Promise.resolve()
  .then(() => {
    return Promise.reject('error');
  })
  .catch(() => {
    console.log('catch1');
  })
  .then(() => {
    console.log('then1');
  })
  .catch(() => {
    console.log('catch2');
  });

// 输出: catch1 then1
```

### 7.4 Promise.all相关
```javascript
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p1');
    resolve('p1');
  }, 1000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p2');
    resolve('p2');
  }, 2000);
});

Promise.all([p1, p2]).then((values) => {
  console.log(values);
});

// 输出:
// 1秒后: p1
// 2秒后: p2
// 2秒后: ['p1', 'p2']
```

### 7.5 async/await输出
```javascript
async function foo() {
  console.log('1');
  await bar();
  console.log('2');
}

async function bar() {
  console.log('3');
}

foo();
console.log('4');

// 输出: 1 3 4 2
// 解析: await后的代码相当于放在then中

// 等价于
function foo() {
  console.log('1');
  Promise.resolve(bar()).then(() => {
    console.log('2');
  });
}
```

### 7.6 复杂综合题
```javascript
console.log('start');

setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('promise2');
  setTimeout(() => {
    console.log('setTimeout2');
  }, 0);
});

new Promise((resolve) => {
  console.log('promise3');
  resolve();
}).then(() => {
  console.log('promise4');
});

console.log('end');

// 输出:
// start
// promise3
// end
// promise2
// promise4
// setTimeout1
// promise1
// setTimeout2
```

---

## 8. 实战应用

### 8.1 接口请求封装
```javascript
class Request {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  request(url, options = {}) {
    return fetch(this.baseURL + url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Request failed:', error);
        throw error;
      });
  }
  
  get(url, params) {
    const query = new URLSearchParams(params).toString();
    return this.request(url + (query ? `?${query}` : ''));
  }
  
  post(url, data) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// 使用
const api = new Request('https://api.example.com');

api.get('/users', { page: 1 })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 8.2 请求队列管理
```javascript
class RequestQueue {
  constructor() {
    this.queue = [];
    this.pendingCount = 0;
    this.maxConcurrent = 3;
  }
  
  add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }
  
  process() {
    while (this.pendingCount < this.maxConcurrent && this.queue.length > 0) {
      const { fn, resolve, reject } = this.queue.shift();
      this.pendingCount++;
      
      fn()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingCount--;
          this.process();
        });
    }
  }
}

// 使用
const queue = new RequestQueue();

for (let i = 0; i < 10; i++) {
  queue.add(() => fetch(`/api/data/${i}`))
    .then(data => console.log(data));
}
```

### 8.3 数据预加载
```javascript
class Preloader {
  constructor() {
    this.cache = new Map();
  }
  
  preload(urls) {
    const promises = urls.map(url => {
      if (this.cache.has(url)) {
        return Promise.resolve(this.cache.get(url));
      }
      
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          this.cache.set(url, data);
          return data;
        });
    });
    
    return Promise.all(promises);
  }
  
  get(url) {
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url));
    }
    
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.cache.set(url, data);
        return data;
      });
  }
}

// 使用
const preloader = new Preloader();

// 预加载
preloader.preload(['/api/user', '/api/posts'])
  .then(() => console.log('预加载完成'));

// 获取数据（从缓存）
preloader.get('/api/user')
  .then(data => console.log(data));
```

### 8.4 轮询请求
```javascript
// 方式1：简单轮询
function poll(fn, interval = 1000, maxRetries = 10) {
  let retries = 0;
  
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      fn()
        .then(data => {
          if (data.isComplete || retries >= maxRetries) {
            clearInterval(timer);
            resolve(data);
          }
          retries++;
        })
        .catch(error => {
          clearInterval(timer);
          reject(error);
        });
    }, interval);
  });
}

// 方式2：条件轮询
async function pollUntil(fn, condition, interval = 1000, timeout = 10000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const result = await fn();
    if (condition(result)) {
      return result;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error('Poll timeout');
}

// 使用
pollUntil(
  () => fetch('/api/status').then(r => r.json()),
  data => data.status === 'completed',
  1000,
  30000
).then(data => console.log('完成', data));
```

### 8.5 防抖和节流（Promise版）
```javascript
// Promise防抖
function debouncePromise(fn, delay) {
  let timer = null;
  let pendingPromise = null;
  
  return function(...args) {
    if (pendingPromise) {
      clearTimeout(timer);
    }
    
    pendingPromise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        fn(...args)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            pendingPromise = null;
          });
      }, delay);
    });
    
    return pendingPromise;
  };
}

// Promise节流
function throttlePromise(fn, interval) {
  let lastTime = 0;
  let pendingPromise = null;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastTime >= interval) {
      lastTime = now;
      pendingPromise = fn(...args);
    }
    
    return pendingPromise || Promise.resolve();
  };
}
```

---

## 9. 易错点

### 9.1 Promise构造函数是同步执行
```javascript
console.log('1');

new Promise((resolve) => {
  console.log('2'); // 立即执行
  resolve();
});

console.log('3');

// 输出: 1 2 3
```

### 9.2 then方法返回新Promise
```javascript
const p1 = Promise.resolve(1);
const p2 = p1.then(value => value + 1);

console.log(p1 === p2); // false
```

### 9.3 catch不会捕获后续then的错误
```javascript
Promise.resolve()
  .catch(() => {
    console.log('catch1');
  })
  .then(() => {
    throw new Error('error');
  })
  .catch(() => {
    console.log('catch2'); // ✅ 捕获到
  });
```

### 9.4 finally总是会执行
```javascript
Promise.resolve(1)
  .finally(() => {
    console.log('finally');
    return 2; // 不会影响最终结果
  })
  .then(value => console.log(value)); // 1

Promise.reject('error')
  .finally(() => {
    console.log('finally');
  })
  .catch(error => console.log(error)); // error
```

### 9.5 async函数总是返回Promise
```javascript
async function foo() {
  return 1;
}

console.log(foo()); // Promise {<fulfilled>: 1}

async function bar() {
  return Promise.resolve(2);
}

bar().then(value => console.log(value)); // 2
```

### 9.6 await只能在async函数中使用
```javascript
// ❌ 错误
function foo() {
  await Promise.resolve(1); // SyntaxError
}

// ✅ 正确
async function bar() {
  await Promise.resolve(1);
}

// ✅ 顶层await（ES2022+）
const value = await Promise.resolve(1);
```

### 9.7 Promise.all短路特性
```javascript
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p1完成');
    resolve(1);
  }, 2000);
});

const p2 = Promise.reject('error');

Promise.all([p1, p2])
  .catch(error => {
    console.log(error); // 立即输出 error
  });

// 2秒后仍会输出: p1完成
// Promise.all失败后，其他Promise仍会执行
```

### 9.8 循环中的Promise
```javascript
// ❌ 错误：并行执行
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3 3 3
  }, 1000);
}

// ✅ 正确：使用let或闭包
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0 1 2
  }, 1000);
}

// ❌ 错误：forEach中使用await
async function foo() {
  [1, 2, 3].forEach(async (item) => {
    await doSomething(item); // 不会等待
  });
  console.log('done'); // 立即执行
}

// ✅ 正确：使用for...of
async function bar() {
  for (const item of [1, 2, 3]) {
    await doSomething(item); // 依次等待
  }
  console.log('done'); // 全部完成后执行
}
```

---

## 10. 面试总结

### 核心考点
1. **Promise基础**：三种状态、状态转换、基本用法
2. **Promise API**：all、race、allSettled、any的区别和使用场景
3. **手写实现**：Promise、Promise.all、Promise.race等
4. **async/await**：与Promise的关系、错误处理、并发控制
5. **输出题**：事件循环、微任务宏任务、执行顺序
6. **实战应用**：并发控制、重试、缓存、超时等

### 必须掌握的手写题
1. ✅ 手写Promise（完整版）
2. ✅ 手写Promise.all
3. ✅ 手写Promise.race
4. ✅ 手写Promise.allSettled
5. ✅ 手写Promise并发限制
6. ✅ 手写Promise重试
7. ✅ 手写Promise缓存
8. ✅ 手写Promise超时

### 高频面试问题
1. Promise解决了什么问题？
2. Promise有哪些状态？如何改变状态？
3. then方法的返回值是什么？
4. catch和then第二个参数的区别？
5. Promise.all和Promise.race的区别？
6. async/await的原理是什么？
7. 如何实现Promise并发控制？
8. 如何中断Promise？
9. Promise的错误处理机制？
10. 微任务和宏任务的区别？

### 复习建议
- 熟练手写Promise及其所有静态方法
- 理解事件循环和任务队列
- 掌握async/await的原理和使用
- 练习各种输出题
- 了解实际应用场景
- 阅读Promise/A+规范

### 推荐练习
- 手写实现所有Promise方法
- 完成10道以上输出题
- 实现3个以上实战案例
- 阅读Promise源码实现

