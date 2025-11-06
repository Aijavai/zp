// ========================================
// JS 执行机制经典面试题实践
// ========================================

console.log('=== 开始执行 ===\n');

// ========================================
// 1. 基础题 - 变量提升
// ========================================
console.log('--- 题目1: 变量提升 ---');
console.log(a); // undefined
var a = 10;
console.log(a); // 10

// console.log(b); // 取消注释会报错: ReferenceError
// let b = 20;

console.log('\n');

// ========================================
// 2. 事件循环基础题
// ========================================
console.log('--- 题目2: 事件循环基础 ---');
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出顺序: 1 4 3 2
console.log('\n');

// ========================================
// 3. async/await经典题
// ========================================
console.log('--- 题目3: async/await ---');

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

// 输出顺序: 
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

console.log('\n');

// ========================================
// 4. 复杂混合题
// ========================================
setTimeout(() => {
  console.log('--- 题目4: 复杂混合题 ---');
  
  console.log('1');

  setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => {
      console.log('3');
    });
  }, 0);

  new Promise((resolve) => {
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
  
  // 输出顺序: 1 4 10 5 7 2 3 8 9 6
  
  console.log('\n');
}, 1000);

// ========================================
// 5. Promise链式调用
// ========================================
setTimeout(() => {
  console.log('--- 题目5: Promise链式调用 ---');
  
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
  
  // 输出: 1 3 2 4
  // 注意：return Promise.resolve() 会导致额外的微任务
  
  console.log('\n');
}, 2000);

// ========================================
// 6. 闭包经典问题
// ========================================
setTimeout(() => {
  console.log('--- 题目6: 闭包问题 ---');
  
  // 问题版本
  console.log('问题版本 (var):');
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log('var:', i);
    }, 0);
  }
  // 输出: 3 3 3
  
  // 解决方案1: let
  console.log('解决方案 (let):');
  for (let j = 0; j < 3; j++) {
    setTimeout(() => {
      console.log('let:', j);
    }, 0);
  }
  // 输出: 0 1 2
  
  console.log('\n');
}, 3000);

// ========================================
// 7. this绑定
// ========================================
setTimeout(() => {
  console.log('--- 题目7: this绑定 ---');
  
  const obj = {
    name: 'obj',
    normalFunc: function() {
      console.log('normalFunc this.name:', this.name);
      setTimeout(function() {
        console.log('setTimeout function this.name:', this.name);
      }, 0);
      setTimeout(() => {
        console.log('setTimeout arrow this.name:', this.name);
      }, 0);
    }
  };
  
  obj.normalFunc();
  
  console.log('\n');
}, 4000);

// ========================================
// 8. 调用栈追踪
// ========================================
setTimeout(() => {
  console.log('--- 题目8: 调用栈 ---');
  
  function first() {
    console.log('进入 first');
    second();
    console.log('离开 first');
  }

  function second() {
    console.log('进入 second');
    third();
    console.log('离开 second');
  }

  function third() {
    console.log('进入 third');
    console.log('离开 third');
  }

  first();
  
  console.log('\n');
}, 5000);

// ========================================
// 9. 微任务执行顺序
// ========================================
setTimeout(() => {
  console.log('--- 题目9: 微任务执行顺序 ---');
  
  Promise.resolve().then(() => {
    console.log('Promise 1');
    Promise.resolve().then(() => {
      console.log('Promise 1-1');
    });
  });

  Promise.resolve().then(() => {
    console.log('Promise 2');
    Promise.resolve().then(() => {
      console.log('Promise 2-1');
    });
  });
  
  // 输出顺序: Promise 1, Promise 2, Promise 1-1, Promise 2-1
  
  console.log('\n');
}, 6000);

// ========================================
// 10. 综合题 - 混合各种概念
// ========================================
setTimeout(() => {
  console.log('--- 题目10: 综合题 ---');
  
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
    })
    .then(() => {
      console.log('外层第二个then');
    });

  // 输出顺序:
  // 外层Promise
  // 外层第一个then
  // 内层Promise
  // 内层第一个then
  // 外层第二个then
  // 内层第二个then
  
  console.log('\n=== 所有题目执行完毕 ===');
}, 7000);

