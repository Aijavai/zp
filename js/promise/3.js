import fs from 'fs';

console.log(1);
// 异步代码
// I/O 操作
// 3.js 线程执行时，从硬盘的文件系统调入内存
// readFile a.txt  从内存中又去硬盘的文件系统读取a.txt 

// executor 会自动运行并尝试执行一项工作。
// 尝试结束后，如果成功则调用 resolve，如果出现 error 则调用 reject。
// 一个由executor 完成的工作只能有一个结果或一个error。
const p = new Promise((resolve, reject) => {
    console.log(3) // 同步， 立即执行
    fs.readFile('./a.txt', (err, data)=> {
        if (err) {
            reject(err);
            return;
        }
        resolve(data.toString());  // promise 被解决了 兑现
    });
    // 立即执行的执行函数 executor
})
p.then((data) => {
    console.log(data);
    console.log(4);
}).catch((err) => {
    console.log(err, '/////');
    console.log(5);
})
console.log(2);

// then 
// promise.then(
//   function(result){ handle a successful result},
//   function(error){ handle an error});
// promise.then().catch(f) 是.then(null, f)的简写形式

// finally 无论promise 被解决还是被拒绝，最终都会执行的回调函数