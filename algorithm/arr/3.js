// forEach   
// 不能使用 break 或 continue 语句
// 函数入栈出栈 性能差
const arr = [1, 2, 3, 4, 5];
arr.forEach((item, index, arr) => {
    if (item === 3) {
        return;
    }
    console.log(item, index, arr);
})