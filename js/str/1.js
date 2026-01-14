let str = 'hello world';
let str1 = 'hello world2';
let str2 = `hello world3`;

let str3 = `hello`;
let str4 = 'world';
console.log(str3);
console.log('hello' + str4); //es5
console.log(`${str3}world`); //es6

// 类型和类是不同的
let str5 = new String('abc');   // String 类
console.log(
    str5,
    str5.valueOf(), 
    typeof str4,
    typeof str5,
    Object.prototype.toString.call(str5),
    Object.prototype.toString.call(str5).slice()
);

console.log(str5.length, str4.length);