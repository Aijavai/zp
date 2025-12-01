# OOP 面向对象
Object Orient Programming

## 封装
JS 是一种**基于**对象 (Object-based) 的语言，你遇到的几乎所有东西都是对象。（连简单数据类型都有包装类）。
它又不是一种真正的面向对象（OOP），早期连class 关键字都没有(哪怕es6 有了class, 仍然是原型式的面向对象)

- 没有Constructor, 没有 class， 怎么做面向对象？
  最早是 对象字面量
  后面是 构造函数 + prototype属性
  es6 之后是class (本质仍是原型式面向对象，一个语法糖)

## 生成实例对象的原始模式
- 实例生成的过程
  - 函数以new 的方式调用
  - 函数内部创建一个空对象，this 指向这个空对象
  - 执行构造函数里面的代码，空对象就有了类模板的属性
  - 返回这个实例

对象字面量虽好，但是我们还是要封装一下，生成实例对象的过程，Constructor
实例之间关系有了
## Prototype 模式
把不变的属性和公用的方法，都放到原型对象上

## 继承
extends
通过构造函数绑定this (apply)
将父对象的构造函数（Animal）绑定在子对象上（Cat 实例）
- 不好理解
- 没有继承父类的方法


instandof 
hasOwnProperty
for in 遍历可迭代属性

面向对象：
构造函数 + prototype 