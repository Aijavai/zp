// 值穿透
Promise.resolve(300)
  .then(val => {
    return Promise.resolve(val + 100); // 返回 Promise，透传其最终结果（400）
  })
  .then(val => {
    console.log('第二步：', val); // 第二步：400（穿透 Promise 的 resolved 值）
    return Promise.reject('出错了'); // 返回 rejected Promise，透传错误
  })
  .catch(err => {
    console.log('捕获错误：', err); // 捕获错误：出错了（错误也会穿透 catch 链）
  })
  .then(val => {
    console.log('第四步：', val); // 第四步：undefined（catch 未返回值，透传 undefined）
  });