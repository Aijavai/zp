// for 循环
const arr = new Array(6)
arr.fill(0);
const len = arr.length;  // 对象的属性  将rhs 赋值给 lhs
// 计数循环 cpu 工作很契合
for(let i = 0; i < len; i++){
  console.log(arr[i]);
}