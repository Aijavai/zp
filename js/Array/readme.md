# JavaScript 数组考点总结（大厂级别）

## 目录
- [1. 数组基础](#1-数组基础)
- [2. 数组方法分类](#2-数组方法分类)
- [3. 高频面试题](#3-高频面试题)
- [4. 手写实现](#4-手写实现)
- [5. 性能优化](#5-性能优化)
- [6. 算法应用](#6-算法应用)
- [7. 易错点](#7-易错点)

---

## 1. 数组基础

### 1.1 数组的本质
```javascript
// 数组是特殊的对象
const arr = [1, 2, 3];
console.log(typeof arr); // "object"
console.log(Array.isArray(arr)); // true

// 数组的索引本质是字符串属性
arr[0] === arr['0']; // true
```

### 1.2 创建数组的方式
```javascript
// 1. 字面量（推荐）
const arr1 = [1, 2, 3];

// 2. 构造函数
const arr2 = new Array(3); // [empty × 3]
const arr3 = new Array(1, 2, 3); // [1, 2, 3]

// 3. Array.of() - ES6
const arr4 = Array.of(3); // [3]
const arr5 = Array.of(1, 2, 3); // [1, 2, 3]

// 4. Array.from() - ES6
const arr6 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arr7 = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]

// 5. 扩展运算符
const arr8 = [...'hello']; // ['h', 'e', 'l', 'l', 'o']
```

### 1.3 稀疏数组 vs 密集数组
```javascript
// 稀疏数组（有空洞）
const sparse = new Array(3); // [empty × 3]
const sparse2 = [1, , 3]; // [1, empty, 3]

// 密集数组
const dense = Array.from({ length: 3 }); // [undefined, undefined, undefined]
const dense2 = Array(3).fill(undefined); // [undefined, undefined, undefined]

// 区别
sparse.map(x => x * 2); // [empty × 3] - 跳过空洞
dense.map(x => x * 2); // [NaN, NaN, NaN]
```

---

## 2. 数组方法分类

### 2.1 改变原数组的方法（9个）
```javascript
const arr = [1, 2, 3, 4, 5];

// 1. push() - 末尾添加
arr.push(6); // 返回新长度 6

// 2. pop() - 末尾删除
arr.pop(); // 返回删除的元素

// 3. unshift() - 头部添加
arr.unshift(0); // 返回新长度

// 4. shift() - 头部删除
arr.shift(); // 返回删除的元素

// 5. splice() - 添加/删除/替换
arr.splice(1, 2, 'a', 'b'); // 从索引1删除2个，插入'a','b'

// 6. reverse() - 反转
arr.reverse();

// 7. sort() - 排序
arr.sort((a, b) => a - b);

// 8. fill() - 填充
arr.fill(0, 1, 3); // 从索引1到3填充0

// 9. copyWithin() - 复制
arr.copyWithin(0, 3, 4); // 将索引3-4的元素复制到索引0
```

### 2.2 不改变原数组的方法（重要）
```javascript
const arr = [1, 2, 3, 4, 5];

// 1. concat() - 合并数组
const arr2 = arr.concat([6, 7]); // [1, 2, 3, 4, 5, 6, 7]

// 2. slice() - 截取
const arr3 = arr.slice(1, 3); // [2, 3]

// 3. join() - 转字符串
const str = arr.join('-'); // "1-2-3-4-5"

// 4. toString()
arr.toString(); // "1,2,3,4,5"

// 5. indexOf() / lastIndexOf()
arr.indexOf(3); // 2
arr.lastIndexOf(3); // 2

// 6. includes() - ES7
arr.includes(3); // true

// 7. flat() - ES2019 扁平化
[1, [2, [3, 4]]].flat(2); // [1, 2, 3, 4]

// 8. flatMap() - ES2019
arr.flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
```

### 2.3 遍历方法（都不改变原数组）
```javascript
const arr = [1, 2, 3, 4, 5];

// 1. forEach() - 无返回值
arr.forEach((item, index, array) => {
  console.log(item);
});

// 2. map() - 返回新数组
const doubled = arr.map(x => x * 2); // [2, 4, 6, 8, 10]

// 3. filter() - 过滤
const even = arr.filter(x => x % 2 === 0); // [2, 4]

// 4. reduce() - 累计
const sum = arr.reduce((acc, cur) => acc + cur, 0); // 15

// 5. reduceRight() - 从右往左累计
const result = arr.reduceRight((acc, cur) => acc + cur, 0);

// 6. some() - 是否有一个满足
const hasEven = arr.some(x => x % 2 === 0); // true

// 7. every() - 是否全部满足
const allPositive = arr.every(x => x > 0); // true

// 8. find() - 找到第一个满足的元素
const found = arr.find(x => x > 3); // 4

// 9. findIndex() - 找到第一个满足的索引
const foundIndex = arr.findIndex(x => x > 3); // 3

// 10. findLast() - ES2023
const lastFound = arr.findLast(x => x > 3); // 5

// 11. findLastIndex() - ES2023
const lastFoundIndex = arr.findLastIndex(x => x > 3); // 4
```

---

## 3. 高频面试题

### 3.1 数组去重（多种方法）
```javascript
const arr = [1, 2, 2, 3, 3, 4, 5, 5];

// 方法1：Set（最简洁）
const unique1 = [...new Set(arr)];

// 方法2：filter + indexOf
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);

// 方法3：reduce
const unique3 = arr.reduce((acc, cur) => {
  return acc.includes(cur) ? acc : [...acc, cur];
}, []);

// 方法4：Map
const unique4 = [...new Map(arr.map(item => [item, item])).values()];

// 方法5：双层循环（性能差）
function unique5(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let flag = true;
    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        flag = false;
        break;
      }
    }
    if (flag) result.push(arr[i]);
  }
  return result;
}

// 对象数组去重
const objArr = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 1, name: 'a' }
];

const uniqueObj = objArr.reduce((acc, cur) => {
  const found = acc.find(item => item.id === cur.id);
  return found ? acc : [...acc, cur];
}, []);

// 或使用 Map
const uniqueObj2 = [...new Map(objArr.map(item => [item.id, item])).values()];
```

### 3.2 数组扁平化（多种深度）
```javascript
const nested = [1, [2, [3, [4, 5]]]];

// 方法1：flat() - ES2019
nested.flat(Infinity); // [1, 2, 3, 4, 5]

// 方法2：递归
function flatten(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

// 方法3：栈
function flattenStack(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  
  return result;
}

// 方法4：toString（仅数字数组）
function flattenToString(arr) {
  return arr.toString().split(',').map(Number);
}

// 方法5：正则（仅数字数组）
function flattenRegex(arr) {
  return JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
}
```

### 3.3 类数组转数组
```javascript
// 类数组对象
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

// 方法1：Array.from()
const arr1 = Array.from(arrayLike);

// 方法2：扩展运算符（需要有迭代器）
// const arr2 = [...arrayLike]; // 报错

// 方法3：Array.prototype.slice.call()
const arr3 = Array.prototype.slice.call(arrayLike);

// 方法4：[].slice.call()
const arr4 = [].slice.call(arrayLike);

// 方法5：Array.prototype.concat.apply()
const arr5 = Array.prototype.concat.apply([], arrayLike);

// 常见类数组
function demo() {
  // arguments
  const args = Array.from(arguments);
  
  // NodeList
  const divs = Array.from(document.querySelectorAll('div'));
  
  // HTMLCollection
  const items = Array.from(document.getElementsByTagName('div'));
}
```

### 3.4 数组排序
```javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];

// 1. 升序
arr.sort((a, b) => a - b);

// 2. 降序
arr.sort((a, b) => b - a);

// 3. 对象数组排序
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];

users.sort((a, b) => a.age - b.age); // 按年龄升序

// 4. 多条件排序
const data = [
  { name: 'John', age: 30, score: 85 },
  { name: 'Jane', age: 30, score: 90 },
  { name: 'Bob', age: 25, score: 85 }
];

data.sort((a, b) => {
  if (a.age !== b.age) return a.age - b.age;
  return b.score - a.score;
});

// 5. 中文排序
const chinese = ['张三', '李四', '王五'];
chinese.sort((a, b) => a.localeCompare(b, 'zh-CN'));

// 6. 稳定排序（保持相对顺序）
// Array.prototype.sort() 在 ES2019+ 是稳定的
```

### 3.5 数组交集、并集、差集
```javascript
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

// 并集
const union = [...new Set([...arr1, ...arr2])]; // [1, 2, 3, 4, 5, 6, 7]

// 交集
const intersection = arr1.filter(x => arr2.includes(x)); // [3, 4, 5]
// 或
const intersection2 = [...new Set(arr1)].filter(x => new Set(arr2).has(x));

// 差集（arr1 中有但 arr2 中没有的）
const difference = arr1.filter(x => !arr2.includes(x)); // [1, 2]

// 对称差集（并集减去交集）
const symmetricDiff = [...arr1, ...arr2].filter(
  x => !arr1.includes(x) || !arr2.includes(x)
); // [1, 2, 6, 7]
```

---

## 4. 手写实现

### 4.1 手写 map
```javascript
Array.prototype.myMap = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const O = Object(this);
  const len = O.length >>> 0; // 转为无符号32位整数
  const result = new Array(len);
  
  for (let i = 0; i < len; i++) {
    if (i in O) { // 跳过稀疏数组的空洞
      result[i] = callback.call(thisArg, O[i], i, O);
    }
  }
  
  return result;
};

// 测试
[1, 2, 3].myMap(x => x * 2); // [2, 4, 6]
```

### 4.2 手写 filter
```javascript
Array.prototype.myFilter = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const O = Object(this);
  const len = O.length >>> 0;
  const result = [];
  
  for (let i = 0; i < len; i++) {
    if (i in O) {
      const value = O[i];
      if (callback.call(thisArg, value, i, O)) {
        result.push(value);
      }
    }
  }
  
  return result;
};

// 测试
[1, 2, 3, 4].myFilter(x => x % 2 === 0); // [2, 4]
```

### 4.3 手写 reduce
```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const O = Object(this);
  const len = O.length >>> 0;
  let accumulator = initialValue;
  let k = 0;
  
  // 如果没有提供初始值
  if (arguments.length < 2) {
    // 找到第一个存在的元素作为初始值
    while (k < len && !(k in O)) {
      k++;
    }
    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = O[k++];
  }
  
  while (k < len) {
    if (k in O) {
      accumulator = callback(accumulator, O[k], k, O);
    }
    k++;
  }
  
  return accumulator;
};

// 测试
[1, 2, 3, 4].myReduce((acc, cur) => acc + cur, 0); // 10
```

### 4.4 手写 flat
```javascript
Array.prototype.myFlat = function(depth = 1) {
  if (depth <= 0) return this.slice();
  
  return this.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(cur.myFlat(depth - 1));
    }
    return acc.concat(cur);
  }, []);
};

// 测试
[1, [2, [3, [4]]]].myFlat(2); // [1, 2, 3, [4]]
```

### 4.5 手写 forEach
```javascript
Array.prototype.myForEach = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const O = Object(this);
  const len = O.length >>> 0;
  
  for (let i = 0; i < len; i++) {
    if (i in O) {
      callback.call(thisArg, O[i], i, O);
    }
  }
  
  // forEach 不返回值
};
```

### 4.6 手写 find
```javascript
Array.prototype.myFind = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const O = Object(this);
  const len = O.length >>> 0;
  
  for (let i = 0; i < len; i++) {
    if (i in O) {
      const value = O[i];
      if (callback.call(thisArg, value, i, O)) {
        return value;
      }
    }
  }
  
  return undefined;
};
```

---

## 5. 性能优化

### 5.1 避免在循环中使用 push
```javascript
// 不好 - 频繁修改数组长度
const arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push(i);
}

// 好 - 预分配空间
const arr2 = new Array(10000);
for (let i = 0; i < 10000; i++) {
  arr2[i] = i;
}

// 更好 - 使用 Array.from
const arr3 = Array.from({ length: 10000 }, (_, i) => i);
```

### 5.2 大数组操作优化
```javascript
const largeArr = new Array(1000000).fill(0);

// 不好 - map 创建新数组
const result1 = largeArr.map((x, i) => i * 2);

// 好 - 直接修改（如果允许）
for (let i = 0; i < largeArr.length; i++) {
  largeArr[i] = i * 2;
}

// 不好 - filter + map 两次遍历
const result2 = largeArr.filter(x => x % 2 === 0).map(x => x * 2);

// 好 - reduce 一次遍历
const result3 = largeArr.reduce((acc, cur) => {
  if (cur % 2 === 0) acc.push(cur * 2);
  return acc;
}, []);
```

### 5.3 使用 includes 代替多个 ||
```javascript
const value = 'a';

// 不好
if (value === 'a' || value === 'b' || value === 'c') {
  // ...
}

// 好
if (['a', 'b', 'c'].includes(value)) {
  // ...
}
```

### 5.4 慎用 splice
```javascript
// splice 会导致后续元素移动，性能差
const arr = [1, 2, 3, 4, 5];
arr.splice(0, 1); // [2, 3, 4, 5]

// 如果不需要保持顺序，可以用尾部替换
function fastRemove(arr, index) {
  const last = arr.length - 1;
  if (index !== last) {
    arr[index] = arr[last];
  }
  arr.length = last;
  return arr;
}
```

### 5.5 数组长度缓存
```javascript
// 不好 - 每次循环都访问 length
for (let i = 0; i < arr.length; i++) {
  // ...
}

// 好 - 缓存长度
for (let i = 0, len = arr.length; i < len; i++) {
  // ...
}

// 或使用 for...of（现代推荐）
for (const item of arr) {
  // ...
}
```

---

## 6. 算法应用

### 6.1 数组旋转
```javascript
// 方法1：使用 splice + unshift
function rotate1(arr, k) {
  k = k % arr.length;
  arr.unshift(...arr.splice(-k));
  return arr;
}

// 方法2：使用 slice
function rotate2(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}

// 方法3：三次反转（最优，O(1)空间）
function rotate3(arr, k) {
  k = k % arr.length;
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

// 测试
rotate3([1, 2, 3, 4, 5], 2); // [4, 5, 1, 2, 3]
```

### 6.2 数组分组
```javascript
// 按大小分组
function chunk(arr, size) {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
  );
}

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// 按条件分组
function groupBy(arr, key) {
  return arr.reduce((acc, cur) => {
    const groupKey = typeof key === 'function' ? key(cur) : cur[key];
    (acc[groupKey] = acc[groupKey] || []).push(cur);
    return acc;
  }, {});
}

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];

groupBy(users, 'age');
// { '25': [{name: 'Jane', age: 25}], '30': [{name: 'John', age: 30}, {name: 'Bob', age: 30}] }
```

### 6.3 数组洗牌（Fisher-Yates）
```javascript
function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

shuffle([1, 2, 3, 4, 5]); // 随机顺序
```

### 6.4 移动零到末尾
```javascript
function moveZeroes(nums) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }
  return nums;
}

moveZeroes([0, 1, 0, 3, 12]); // [1, 3, 12, 0, 0]
```

### 6.5 最大子数组和（Kadane算法）
```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6 ([4, -1, 2, 1])
```

---

## 7. 易错点

### 7.1 数组空洞
```javascript
const arr = new Array(3);

// 空洞会被跳过
arr.map(x => x); // [empty × 3]
arr.forEach(x => console.log(x)); // 不执行

// 但一些方法会处理空洞
arr.join('-'); // "--"
arr.length; // 3
```

### 7.2 sort() 默认字符串排序
```javascript
const nums = [1, 2, 10, 20];

nums.sort(); // [1, 10, 2, 20] ❌
nums.sort((a, b) => a - b); // [1, 2, 10, 20] ✅
```

### 7.3 map() 不能中断
```javascript
// map() 无法提前终止
[1, 2, 3, 4, 5].map(x => {
  if (x === 3) return; // 返回 undefined，但继续执行
  return x * 2;
}); // [2, 4, undefined, 8, 10]

// 需要用 for 或 for...of
function processArray(arr) {
  const result = [];
  for (const item of arr) {
    if (item === 3) break;
    result.push(item * 2);
  }
  return result;
}
```

### 7.4 forEach() 无法 break
```javascript
// forEach 不能使用 break 和 continue
[1, 2, 3].forEach(x => {
  if (x === 2) break; // ❌ SyntaxError
});

// 使用 some 模拟 break
[1, 2, 3].some(x => {
  if (x === 2) return true; // 相当于 break
  console.log(x);
});

// 使用 every 也可以
[1, 2, 3].every(x => {
  if (x === 2) return false; // 相当于 break
  console.log(x);
  return true;
});
```

### 7.5 reduce() 初始值问题
```javascript
// 无初始值时，空数组报错
[].reduce((acc, cur) => acc + cur); // TypeError

// 有初始值就安全
[].reduce((acc, cur) => acc + cur, 0); // 0

// 对象累加记得提供初始值
const arr = [1, 2, 3];
arr.reduce((acc, cur) => {
  acc[cur] = cur;
  return acc;
}, {}); // { '1': 1, '2': 2, '3': 3 }
```

### 7.6 数组引用问题
```javascript
// 数组是引用类型
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] ❌

// 浅拷贝
const arr3 = [...arr1]; // 或 arr1.slice()
const arr4 = Array.from(arr1);

// 深拷贝
const nested = [1, [2, 3]];
const deep1 = JSON.parse(JSON.stringify(nested));
const deep2 = structuredClone(nested); // 现代浏览器
```

### 7.7 数组判断
```javascript
// 不要用 typeof
typeof []; // "object" ❌

// 使用 Array.isArray()
Array.isArray([]); // true ✅

// 或使用 instanceof（跨 iframe 有问题）
[] instanceof Array; // true

// 或使用 Object.prototype.toString
Object.prototype.toString.call([]) === '[object Array]'; // true
```

### 7.8 length 可写
```javascript
const arr = [1, 2, 3, 4, 5];

// 减少 length 会截断数组
arr.length = 3; // [1, 2, 3]

// 增加 length 会产生空洞
arr.length = 10; // [1, 2, 3, empty × 7]

// 清空数组
arr.length = 0; // []
```

---

## 8. ES6+ 新特性

### 8.1 扩展运算符
```javascript
// 数组拷贝
const arr = [1, 2, 3];
const copy = [...arr];

// 数组合并
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];

// 字符串转数组
const chars = [...'hello'];

// 对象转数组
const obj = { a: 1, b: 2 };
const entries = Object.entries(obj);

// 数组解构
const [first, ...rest] = [1, 2, 3, 4];
// first: 1, rest: [2, 3, 4]
```

### 8.2 解构赋值
```javascript
// 基本用法
const [a, b] = [1, 2];

// 默认值
const [x = 0, y = 0] = [1];

// 跳过元素
const [first, , third] = [1, 2, 3];

// 剩余参数
const [head, ...tail] = [1, 2, 3, 4];

// 交换变量
let a = 1, b = 2;
[a, b] = [b, a];

// 函数参数
function sum([a, b]) {
  return a + b;
}
sum([1, 2]); // 3
```

### 8.3 Array.from() 高级用法
```javascript
// 生成序列
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
Array.from({ length: 5 }, (_, i) => i * 2); // [0, 2, 4, 6, 8]

// 类数组转换
const divs = document.querySelectorAll('div');
Array.from(divs, el => el.textContent);

// 去重
Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]
```

### 8.4 at() 方法
```javascript
const arr = [1, 2, 3, 4, 5];

// 正向索引
arr.at(0); // 1
arr[0]; // 1

// 负向索引
arr.at(-1); // 5 ✅
arr[arr.length - 1]; // 5 （旧方法）

arr.at(-2); // 4
```

### 8.5 with() 方法 - ES2023
```javascript
const arr = [1, 2, 3, 4, 5];

// 不改变原数组的替换
const newArr = arr.with(2, 99); // [1, 2, 99, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

### 8.6 toReversed(), toSorted(), toSpliced() - ES2023
```javascript
const arr = [3, 1, 2];

// 不改变原数组的操作
const reversed = arr.toReversed(); // [2, 1, 3]
const sorted = arr.toSorted(); // [1, 2, 3]
const spliced = arr.toSpliced(1, 1); // [3, 2]

console.log(arr); // [3, 1, 2] 原数组不变
```

---

## 9. 常见笔试题

### 9.1 两数之和
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

### 9.2 合并两个有序数组
```javascript
function merge(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;
  
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
}
```

### 9.3 数组中第K大的元素
```javascript
function findKthLargest(nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
}

// 使用快速选择（更优）
function findKthLargestQuickSelect(nums, k) {
  const targetIndex = k - 1;
  
  function quickSelect(left, right) {
    const pivot = nums[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
      if (nums[j] >= pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }
    
    [nums[i], nums[right]] = [nums[right], nums[i]];
    
    if (i === targetIndex) return nums[i];
    if (i < targetIndex) return quickSelect(i + 1, right);
    return quickSelect(left, i - 1);
  }
  
  return quickSelect(0, nums.length - 1);
}
```

### 9.4 滑动窗口最大值
```javascript
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // 存储索引
  
  for (let i = 0; i < nums.length; i++) {
    // 移除窗口外的元素
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }
    
    // 移除比当前元素小的元素
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // 窗口形成后记录结果
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}
```

### 9.5 全排列
```javascript
function permute(nums) {
  const result = [];
  
  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      
      path.push(nums[i]);
      used[i] = true;
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }
  
  backtrack([], {});
  return result;
}
```

---

## 10. 总结

### 核心要点
1. **理解数组本质**：对象、引用类型、length可写
2. **掌握方法分类**：改变/不改变原数组、遍历方法
3. **注意性能**：大数组操作、避免不必要的拷贝
4. **熟练手写**：map、filter、reduce、flat等
5. **算法应用**：双指针、滑动窗口、回溯等
6. **ES6+特性**：扩展运算符、解构、新方法

### 面试准备
- 熟练手写常见方法实现
- 理解时间空间复杂度
- 掌握常见算法模式
- 注意边界情况处理
- 了解新特性和最佳实践

### 推荐练习
- LeetCode 数组标签题目
- 手写实现所有遍历方法
- 练习常见算法模式
- 阅读 MDN 官方文档

