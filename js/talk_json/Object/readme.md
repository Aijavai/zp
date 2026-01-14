## Object 
数据类型 - 对象

let user = new Object(); //"构造函数" 的语法
let user = {};  // "字面量"的语法

let user = {
    name: '',
    age: ,
    "likes birds": true // 多词属性名使用引号
}

### 方括号
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// 访问变量
alert( user[key] ); // John（如果输入 "name"）

### 计算属性
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};

### 属性值简写
let user {
    name,
    age,
}

### 属性名称限制

### "in"操作符 属性存在性测试  
// js 中读取不存在的属性也不会报错，只会得到undefined。
"key" in object  //in 左边是一个属性名，通常是一个带引号的字符串，如果省略引号，那它是一个变量，变量值应该是要判断的属性名。

let user = { name: "John", age: 30};

alert("age" in user); // true


### for..in 循环

遍历的时候，获取属性的顺序：
整数属性会进行排序，其他属性按照创建的顺序显示（解决整数属性排序问题，在整数前添加一个"+"  例如 "+1";


-- 练习
let user = {}  let user = new Object();
user.name = "John"
user.surname = "Smith"
let key = "Pete"
user[name] = key
delete user.name

let isEmpty = (obj) =>{
    for (let key in obj) {
      retrun false;
    }
    return true;
}

let sum = 0;
if (salaries === undefined)
for(let key in salaries){
    sum += salaries[key];
}


let multiplyNumeric = (obj) =>{
  for(let key in obj){
    if(typeof obj[key] === 'number') {
      obj[key] *= 2;
    }
  }
}

## 第二课

### 对象引用和复制

### 克隆和合并
Obeject.assign(dest, [src1, src2, src3...])

如果被拷贝的属性名已经存在，那么它会被覆盖
简单的克隆 let new = Object.assign({}, old)

**还有其他克隆语法** spread 语法clone = {...user}

### 深层克隆
**面试考点**  递归  Parse....

## 第三课
### 可达性（Reachability）
垃圾回收的基本算法被称为"mark-and-sweep"
定期执行以下“垃圾回收”步骤：

垃圾收集器找到所有的根，并“标记”（记住）它们。
然后它遍历并“标记”来自它们的所有引用。
然后它遍历标记的对象并标记 它们的 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象。
……如此操作，直到所有可达的（从根部）引用都被访问到。
没有被标记的对象都会被删除。

## 第四课
### 方法中的 this
- **方法**可以将对象引用为 this
- 一个函数在声明时，可能就使用了 this， 但是这个 this 只有在函数被调用时才会有值。
- this 的值是在代码运行时计算出来的，它取决于代码上下文。
- 箭头函数没有自己的this,它的this 继承外层作用域
- 使用箭头函数，或者.bind() 避免this 丢失


-- 练习

在没有对象的情况下调用：this == undefined
// 严格模式下this 是undefined 非严格模式this 是全局对象（window）


## 第五课
### 构造函数
- 构造函数的命名以大写字母开头
- 构造函数只能由"new" 操作符来执行
 
当一个函数被使用new 操作符执行时，它按照以下步骤：
- 一个新的空对象被创建并分配给 this 
- 函数体执行。通常它会修改this 为其添加新的属性
- 返回this 值
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}