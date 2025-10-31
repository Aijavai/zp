// Object.prototype.toString.call() 完整示例

// 1. 基本类型
console.log('=== 基本类型 ===');
console.log(Object.prototype.toString.call(123));           // [object Number]
console.log(Object.prototype.toString.call('hello'));       // [object String]
console.log(Object.prototype.toString.call(true));          // [object Boolean]
console.log(Object.prototype.toString.call(undefined));     // [object Undefined]
console.log(Object.prototype.toString.call(null));          // [object Null]
console.log(Object.prototype.toString.call(Symbol('id')));  // [object Symbol]

// 2. 引用类型
console.log('\n=== 引用类型 ===');
console.log(Object.prototype.toString.call({}));            // [object Object]
console.log(Object.prototype.toString.call([]));            // [object Array]
console.log(Object.prototype.toString.call(function(){}));  // [object Function]
console.log(Object.prototype.toString.call(new Date()));    // [object Date]
console.log(Object.prototype.toString.call(/regex/));       // [object RegExp]
console.log(Object.prototype.toString.call(new Error()));   // [object Error]

// 3. 特殊对象
console.log('\n=== 特殊对象 ===');
console.log(Object.prototype.toString.call(new String('abc')));  // [object String]
console.log(Object.prototype.toString.call(new Number(123)));    // [object Number]
console.log(Object.prototype.toString.call(new Boolean(true)));  // [object Boolean]
console.log(Object.prototype.toString.call(Math));               // [object Math]
console.log(Object.prototype.toString.call(JSON));               // [object JSON]
// console.log(Object.prototype.toString.call(<div>1</div>)
// 4. 对比：原始类型 vs 对象类型
console.log('\n=== 原始 vs 对象 ===');
let str1 = 'hello';              // 字符串字面量（原始类型）
let str2 = new String('hello');  // String 对象

console.log('str1 类型:', typeof str1);                               // string
console.log('str2 类型:', typeof str2);                               // object
console.log('str1 精确类型:', Object.prototype.toString.call(str1));  // [object String]
console.log('str2 精确类型:', Object.prototype.toString.call(str2));  // [object String]

console.log('str1 === str2:', str1 === str2);              // false (类型不同)
console.log('str1 == str2:', str1 == str2);                // true (值相同)
console.log('str1 === str2.valueOf():', str1 === str2.valueOf()); // true

// 5. 封装成工具函数
console.log('\n=== 工具函数 ===');
function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

console.log(getType([]));           // Array
console.log(getType({}));           // Object
console.log(getType(null));         // Null
console.log(getType(new Date()));   // Date
console.log(getType(/test/));       // RegExp

// 6. 实用的类型检测函数
console.log('\n=== 实用检测函数 ===');
const isArray = (val) => Object.prototype.toString.call(val) === '[object Array]';
const isObject = (val) => Object.prototype.toString.call(val) === '[object Object]';
const isNull = (val) => Object.prototype.toString.call(val) === '[object Null]';
const isDate = (val) => Object.prototype.toString.call(val) === '[object Date]';

console.log('isArray([]):', isArray([]));              // true
console.log('isArray({}):', isArray({}));              // false
console.log('isObject({}):', isObject({}));            // true
console.log('isNull(null):', isNull(null));            // true
console.log('isDate(new Date()):', isDate(new Date())); // true

