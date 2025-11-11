// arr 在栈内存中 引用地址
// 【1, 2, 3, 4, 5】 在堆内存中
// 数组的创建，申请了5个连续的内存空间，
// 数组里面的值确定了
const arr = [1, 2, 3, 4, 5];
console.log(arr);
const arr1 = new Array();  // 创建一个空数组 构造函数 类似于 const arr = [];
arr1.push(1, 2, 3, 4, 5);
console.log(arr1);

const arr2 = (new Array(5)).fill(0, 1, 2, 3, 4, 5);
console.log(arr2);
