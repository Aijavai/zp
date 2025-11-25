// es5 没有类 class 
// JS 中函数是一等对象
// 首字母大写的 构造函数 函数用new 运行
// 属性的定义在构造函数中
function Car(color) {
    // this 指向新创建的对象
    this.color = color;
    // this.drive
    // this.name = 'su7';
    // this.height = 1.4;
    // this.weight = 1.5;
    // this.log = 4800;
}
// 方法的定义在prototype 中
// 共享的方法
// Car.prototype = {
//     drive() {
//         console.log('drive, 下赛道');
//     },
//     name: 'su7',
//     height: 1.4,
//     weight: 1.5,
//     long: 4800,
// }

const car1 = new Car('霞光紫');
console.log(Car.__proto__);
console.log(Object.prototype);
// console.log(car1);
// car1.drive();
// const car2 = new Car('海湾蓝');
// console.log(car2);
// console.log(car2, car2.prototype, car2.weight, car2.__proto__)
