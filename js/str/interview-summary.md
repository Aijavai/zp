# JavaScript 字符串 - 大厂面试知识点总结

## 📚 目录
1. [字符串的本质与特性](#1-字符串的本质与特性)
2. [字符串创建方式](#2-字符串创建方式)
3. [字符串常用API](#3-字符串常用api)
4. [模板字符串](#4-模板字符串)
5. [字符串不可变性](#5-字符串不可变性)
6. [类型检测](#6-类型检测)
7. [常见面试题](#7-常见面试题)
8. [性能优化](#8-性能优化)

---

## 1. 字符串的本质与特性

### 核心特性
```javascript
// ✅ 字符串是原始类型（Primitive Type）
typeof "hello"  // "string"

// ✅ 字符串不可变（Immutable）
let str = "hello";
str[0] = "H";  // 无效，不会改变原字符串
console.log(str);  // "hello"

// ✅ 字符串是类数组（Array-like）
let s = "abc";
s.length;    // 3
s[0];        // "a"
s.charAt(1); // "b"

// ⚠️ 但字符串不是数组
Array.isArray("abc");  // false
```

### 面试考点
- **问：字符串是基本类型还是引用类型？**
  - 答：基本类型，但可以通过包装对象访问方法
- **问：为什么字符串可以调用方法？**
  - 答：自动装箱（Auto-boxing），临时转换为String对象

---

## 2. 字符串创建方式

### 三种创建方式对比
```javascript
// 1. 字面量（推荐） ⭐
let str1 = 'hello';
let str2 = "world";

// 2. 模板字符串（ES6+）⭐
let str3 = `hello ${name}`;

// 3. 构造函数（不推荐）❌
let str4 = new String('hello');

// 类型对比
typeof str1;  // "string"
typeof str4;  // "object" ⚠️
str1 === str4;  // false
str1 == str4;   // true (类型转换)
```

### 面试陷阱
```javascript
let a = "hello";
let b = new String("hello");

console.log(a == b);   // true  (值相等)
console.log(a === b);  // false (类型不同)
console.log(typeof a); // "string"
console.log(typeof b); // "object"

// 最佳实践：永远使用字面量！
```

---

## 3. 字符串常用API

### 3.1 查找相关
```javascript
let str = "hello world";

// indexOf / lastIndexOf
str.indexOf('o');      // 4 (第一次出现)
str.lastIndexOf('o');  // 7 (最后一次出现)
str.indexOf('x');      // -1 (不存在)

// includes (ES6) ⭐
str.includes('world'); // true
str.includes('xyz');   // false

// startsWith / endsWith (ES6) ⭐
str.startsWith('hello');  // true
str.endsWith('world');    // true

// search (支持正则)
str.search(/world/);   // 6
```

### 3.2 提取相关
```javascript
let str = "hello world";

// slice(start, end) - 推荐 ⭐
str.slice(0, 5);    // "hello"
str.slice(6);       // "world"
str.slice(-5);      // "world" (负数从末尾算)

// substring(start, end) - 类似slice，但不支持负数
str.substring(0, 5); // "hello"

// substr(start, length) - 已废弃 ❌
str.substr(0, 5);    // "hello"

// charAt / charCodeAt
str.charAt(0);       // "h"
str.charCodeAt(0);   // 104 (ASCII码)
str[0];              // "h" (推荐)

// 面试重点：记住 slice 即可！
```

### 3.3 转换相关
```javascript
let str = "Hello World";

// 大小写转换
str.toLowerCase();   // "hello world"
str.toUpperCase();   // "HELLO WORLD"

// 去除空格
"  hello  ".trim();      // "hello"
"  hello  ".trimStart(); // "hello  " (ES2019)
"  hello  ".trimEnd();   // "  hello" (ES2019)

// 重复
"abc".repeat(3);     // "abcabcabc" (ES6)

// 填充
"5".padStart(3, '0');  // "005" (ES2017)
"5".padEnd(3, '0');    // "500" (ES2017)
```

### 3.4 拆分与拼接
```javascript
// split - 字符串转数组 ⭐⭐⭐
"a,b,c".split(',');        // ["a", "b", "c"]
"hello".split('');         // ["h", "e", "l", "l", "o"]
"a-b-c".split('-', 2);     // ["a", "b"] (限制返回数量)

// concat - 拼接（不推荐，用 + 或模板字符串）
"hello".concat(" ", "world"); // "hello world"
"hello" + " " + "world";      // 更简洁

// join 是数组方法（面试常考）
["a", "b", "c"].join(',');    // "a,b,c"
```

### 3.5 替换相关
```javascript
let str = "hello world world";

// replace - 只替换第一个
str.replace('world', 'JS');  // "hello JS world"

// replaceAll (ES2021) ⭐
str.replaceAll('world', 'JS'); // "hello JS JS"

// 或使用正则 + g标志
str.replace(/world/g, 'JS');   // "hello JS JS"
```

### 3.6 匹配相关
```javascript
let str = "hello123world456";

// match
str.match(/\d+/);     // ["123"]
str.match(/\d+/g);    // ["123", "456"]

// matchAll (ES2020)
[...str.matchAll(/\d+/g)]; // 迭代器，返回详细匹配信息
```

---

## 4. 模板字符串

### 基础用法
```javascript
let name = "张三";
let age = 25;

// 变量插值
let msg = `我叫${name}，今年${age}岁`;

// 表达式计算
let result = `1 + 1 = ${1 + 1}`;  // "1 + 1 = 2"

// 函数调用
let upper = `名字: ${name.toUpperCase()}`;

// 多行字符串
let html = `
  <div>
    <h1>${name}</h1>
    <p>年龄: ${age}</p>
  </div>
`;
```

### 标签模板（高级）
```javascript
// 自定义处理逻辑
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<b>${values[i]}</b>` : '');
  }, '');
}

let name = "张三";
let html = highlight`姓名: ${name}`;  
// "姓名: <b>张三</b>"
```

---

## 5. 字符串不可变性

### 核心概念 ⭐⭐⭐
```javascript
// ✅ 字符串不可变
let str = "hello";
str[0] = "H";  // 无效操作
console.log(str);  // "hello" (未改变)

// ✅ 任何"修改"都返回新字符串
let str1 = "hello";
let str2 = str1.toUpperCase();  // 返回新字符串
console.log(str1);  // "hello" (原字符串不变)
console.log(str2);  // "HELLO" (新字符串)

// ⚠️ 性能问题：大量拼接用数组
// 错误示范
let result = "";
for (let i = 0; i < 10000; i++) {
  result += "a";  // 每次创建新字符串，性能差
}

// 正确做法
let arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push("a");
}
let result = arr.join("");  // 一次性拼接
```

### 面试题
**问：为什么字符串不可变？**
- 安全性：可作为 HashMap 的 key
- 共享性：字符串常量池，节省内存
- 线程安全：天然不可变，无需同步

---

## 6. 类型检测

### 多种检测方式对比
```javascript
let str1 = "hello";
let str2 = new String("hello");

// 1. typeof - 区分原始类型 vs 对象
typeof str1;  // "string" ✅
typeof str2;  // "object" ⚠️

// 2. instanceof - 检测对象实例
str1 instanceof String;  // false
str2 instanceof String;  // true

// 3. Object.prototype.toString.call() - 最准确 ⭐⭐⭐
Object.prototype.toString.call(str1);  // "[object String]"
Object.prototype.toString.call(str2);  // "[object String]"

// 4. constructor
str1.constructor === String;  // true
str2.constructor === String;  // true

// 最佳实践
function isString(val) {
  return typeof val === 'string' || val instanceof String;
}
```

---

## 7. 常见面试题

### 7.1 反转字符串 ⭐⭐⭐
```javascript
// 方法1: 数组法（推荐）
function reverse1(str) {
  return str.split('').reverse().join('');
}

// 方法2: 循环法
function reverse2(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// 方法3: 递归法
function reverse3(str) {
  if (str.length <= 1) return str;
  return reverse3(str.slice(1)) + str[0];
}
```

### 7.2 判断回文字符串 ⭐⭐⭐
```javascript
function isPalindrome(str) {
  // 去除空格和标点，转小写
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // 方法1: 反转比较
  return str === str.split('').reverse().join('');
  
  // 方法2: 双指针
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

### 7.3 统计字符出现次数 ⭐⭐⭐
```javascript
function countChars(str) {
  // 方法1: 对象计数
  const map = {};
  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
  }
  return map;
  
  // 方法2: Map
  const map = new Map();
  for (let char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  return map;
}

// 找出现最多的字符
function mostFrequentChar(str) {
  const map = countChars(str);
  let maxChar = '';
  let maxCount = 0;
  
  for (let [char, count] of Object.entries(map)) {
    if (count > maxCount) {
      maxCount = count;
      maxChar = char;
    }
  }
  return maxChar;
}
```

### 7.4 实现 trim() ⭐⭐
```javascript
// 去除首尾空格
function myTrim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

// 只去开头
function trimStart(str) {
  return str.replace(/^\s+/, '');
}

// 只去结尾
function trimEnd(str) {
  return str.replace(/\s+$/, '');
}
```

### 7.5 字符串压缩 ⭐⭐
```javascript
// "aaabbcccc" => "a3b2c4"
function compress(str) {
  if (!str) return str;
  
  let result = '';
  let count = 1;
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      result += str[i] + (count > 1 ? count : '');
      count = 1;
    }
  }
  
  // 如果压缩后更长，返回原字符串
  return result.length < str.length ? result : str;
}
```

### 7.6 千分位格式化 ⭐⭐⭐
```javascript
// 12345678 => "12,345,678"
function formatNumber(num) {
  // 方法1: 正则
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // 方法2: toLocaleString (推荐)
  return num.toLocaleString();
  
  // 方法3: 手动实现
  let str = num.toString();
  let result = '';
  let count = 0;
  
  for (let i = str.length - 1; i >= 0; i--) {
    count++;
    result = str[i] + result;
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }
  return result;
}
```

### 7.7 驼峰与短横线转换 ⭐⭐
```javascript
// camelCase => camel-case
function toKebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// camel-case => camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
}
```

---

## 8. 性能优化

### 8.1 字符串拼接 ⭐⭐⭐
```javascript
// ❌ 慢：循环中使用 +=
let result = '';
for (let i = 0; i < 10000; i++) {
  result += 'a';  // 每次创建新字符串
}

// ✅ 快：使用数组 + join
let arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push('a');
}
let result = arr.join('');

// ✅ 快：模板字符串（少量拼接）
let result = `${a}${b}${c}`;
```

### 8.2 字符串比较
```javascript
// ❌ 慢：逐字符比较
function equals1(str1, str2) {
  if (str1.length !== str2.length) return false;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) return false;
  }
  return true;
}

// ✅ 快：直接比较（引擎优化）
function equals2(str1, str2) {
  return str1 === str2;
}
```

### 8.3 正则表达式
```javascript
// ❌ 慢：重复创建正则
for (let str of strings) {
  if (/pattern/.test(str)) { /* ... */ }
}

// ✅ 快：复用正则对象
const regex = /pattern/;
for (let str of strings) {
  if (regex.test(str)) { /* ... */ }
}
```

---

## 9. 易错点与陷阱 ⚠️

### 9.1 字符串是不可变的
```javascript
let str = "hello";
str[0] = "H";  // 无效！
console.log(str);  // "hello"
```

### 9.2 == vs ===
```javascript
"123" == 123;   // true  (类型转换)
"123" === 123;  // false (严格比较)
```

### 9.3 split 的坑
```javascript
"".split(',');  // [""] ⚠️ 不是 []
"a".split('');  // ["a"]
"a,".split(','); // ["a", ""] ⚠️
```

### 9.4 slice vs substring vs substr
```javascript
let str = "hello";

str.slice(-2);      // "lo"  (支持负数)
str.substring(-2);  // "hello" (负数当0)
str.substr(-2);     // "lo"  (已废弃)

// 结论：只用 slice！
```

---

## 10. 面试高频考点总结 🎯

| 知识点 | 难度 | 重要性 | 说明 |
|--------|------|--------|------|
| 字符串不可变性 | ⭐⭐ | ⭐⭐⭐ | 必考基础 |
| 模板字符串 | ⭐ | ⭐⭐⭐ | ES6+ 必会 |
| 类型检测 | ⭐⭐ | ⭐⭐⭐ | toString.call() |
| slice/substring | ⭐ | ⭐⭐ | API熟练度 |
| split/join | ⭐ | ⭐⭐⭐ | 数组字符串转换 |
| 反转字符串 | ⭐ | ⭐⭐⭐ | 算法题高频 |
| 回文判断 | ⭐⭐ | ⭐⭐⭐ | 算法题高频 |
| 字符统计 | ⭐⭐ | ⭐⭐⭐ | Map/对象应用 |
| 正则表达式 | ⭐⭐⭐ | ⭐⭐ | 高级应用 |
| 性能优化 | ⭐⭐ | ⭐⭐ | 大厂必问 |

---

## 11. 学习建议 📖

1. **基础先行**: 掌握 API，理解不可变性
2. **多做练习**: LeetCode 字符串专题
3. **理解原理**: 知其然知其所以然
4. **性能意识**: 大数据量场景的优化
5. **代码规范**: 统一使用字面量和 slice

---

## 12. 推荐资源

- [MDN String 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
- LeetCode 字符串标签题目
- 《JavaScript高级程序设计》第5章

---

**记住：字符串是 JavaScript 中使用最频繁的类型之一，基础扎实才能游刃有余！** 💪

