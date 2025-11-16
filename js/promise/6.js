// then 接收的值必须是函数
Promise.resolve(1)
  .then(2) // 非函数，发生值穿透
  .then(Promise.resolve(3)) // 非函数，发生值穿透
  .then(console.log); // 1
