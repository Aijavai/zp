// for in 遍历对象的方法 也可以遍历数组
// 数组也是对象  数组的索引 就是对象的属性名 
// 把数组看成下标为key 的可迭代对象 
// 对象字面量中 key 必须是字符串或符号
const obj = {
    name: '张三',
    age: 18,
    hobbise: ['篮球', '足球', '跑步'],
}
// 设计来迭代对象的属性的
for (let k in obj) {
    console.log(k, obj[k]); 
}