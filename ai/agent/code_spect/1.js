// 驼峰式函数命名
// ， ； 没有统一
// 打印没有去除
// user中的内容没有缩进有问题
// 没有注释

function get_user_info() {
  let user = {
      name: 'ai',
      age: 18
  }
  console.log(user)
  return user;
}

get_user_info();