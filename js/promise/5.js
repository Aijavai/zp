


// Promise.resolve(100) // 初始值 100
//   .then(val => {
//     // 未写 return，默认返回 undefined
//     console.log('第一步：', val); // 第一步：100
//   })
//   .then(val => {
//     // 接收上一个回调的返回值（undefined），但未处理，继续透传
//     console.log('第二步：', val); // 第二步：undefined
//   })
//   .then(val => {
//     console.log('第三步：', val); // 第三步：undefined（值穿透到底）
//   });



  Promise.resolve(200)
  .then(val => {
    return val * 2; // 显式返回新值，中断当前透传，传递新值
  })
  .then(val => {
    // 接收上一步返回的 400，未显式返回，
    console.log('第二步：', val); // 第二步：400
  })
  .then(val => {
    console.log('第三步：', val); // 第三步：undefined
  });