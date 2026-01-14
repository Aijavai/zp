// 数组的值拷贝

const arr = [1, 2, 3, 4, 5, 6];
// 重新申请一块空间 开销大
const arr2 = JSON.parse(JSON.stringify(arr));
console.log(arr2);
// concat 会返回一个新数组
const arr1 = [].concat(arr);
arr1[0] =  0;
console.log(arr);
console.log(arr1);