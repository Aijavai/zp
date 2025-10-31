// JavaScript 字符串 - 面试题实战练习

console.log('=== 字符串面试题练习 ===\n');

// ==================== 基础题 ====================

// 1. 反转字符串 ⭐⭐⭐
function reverse(str) {
    return str.split('').reverse().join('');
}
console.log('1. 反转字符串:', reverse('hello')); // "olleh"


// 2. 判断回文 ⭐⭐⭐
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return str === str.split('').reverse().join('');
}
console.log('2. 判断回文:', isPalindrome('A man, a plan, a canal: Panama')); // true


// 3. 统计字符出现次数 ⭐⭐⭐
function countChars(str) {
    const map = {};
    for (let char of str) {
        map[char] = (map[char] || 0) + 1;
    }
    return map;
}
console.log('3. 字符统计:', countChars('hello')); 
// { h: 1, e: 1, l: 2, o: 1 }


// 4. 找出现最多的字符 ⭐⭐⭐
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
    return { char: maxChar, count: maxCount };
}
console.log('4. 最多字符:', mostFrequentChar('hello world')); 
// { char: 'l', count: 3 }


// 5. 字符串压缩 ⭐⭐
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
    
    return result.length < str.length ? result : str;
}
console.log('5. 字符串压缩:', compress('aaabbcccc')); 
// "a3b2c4"


// 6. 千分位格式化 ⭐⭐⭐
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
console.log('6. 千分位:', formatNumber(12345678)); 
// "12,345,678"


// 7. 驼峰转短横线 ⭐⭐
function toKebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
console.log('7. 驼峰转短横线:', toKebabCase('camelCaseString')); 
// "camel-case-string"


// 8. 短横线转驼峰 ⭐⭐
function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
}
console.log('8. 短横线转驼峰:', toCamelCase('kebab-case-string')); 
// "kebabCaseString"


// 9. 首字母大写 ⭐
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log('9. 首字母大写:', capitalize('hello')); 
// "Hello"


// 10. 每个单词首字母大写 ⭐⭐
function titleCase(str) {
    return str.split(' ')
        .map(word => capitalize(word))
        .join(' ');
}
console.log('10. 标题化:', titleCase('hello world')); 
// "Hello World"


// ==================== 进阶题 ====================

// 11. 最长公共前缀 ⭐⭐
function longestCommonPrefix(strs) {
    if (!strs.length) return '';
    
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return '';
        }
    }
    return prefix;
}
console.log('11. 最长公共前缀:', 
    longestCommonPrefix(['flower', 'flow', 'flight'])); 
// "fl"


// 12. 字符串相乘 ⭐⭐⭐ (LeetCode 43)
function multiply(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    
    const len1 = num1.length;
    const len2 = num2.length;
    const result = new Array(len1 + len2).fill(0);
    
    for (let i = len1 - 1; i >= 0; i--) {
        for (let j = len2 - 1; j >= 0; j--) {
            const mul = (num1[i] - '0') * (num2[j] - '0');
            const p1 = i + j;
            const p2 = i + j + 1;
            const sum = mul + result[p2];
            
            result[p2] = sum % 10;
            result[p1] += Math.floor(sum / 10);
        }
    }
    
    // 去除前导零
    while (result[0] === 0) result.shift();
    return result.join('');
}
console.log('12. 字符串相乘:', multiply('123', '456')); 
// "56088"


// 13. 有效括号 ⭐⭐⭐ (LeetCode 20)
function isValidParentheses(s) {
    const stack = [];
    const map = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (let char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else {
            if (stack.pop() !== map[char]) return false;
        }
    }
    
    return stack.length === 0;
}
console.log('13. 有效括号:', isValidParentheses('({[]})')); 
// true


// 14. 无重复字符的最长子串 ⭐⭐⭐ (LeetCode 3)
function lengthOfLongestSubstring(s) {
    const map = new Map();
    let maxLen = 0;
    let start = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            start = Math.max(start, map.get(s[i]) + 1);
        }
        map.set(s[i], i);
        maxLen = Math.max(maxLen, i - start + 1);
    }
    
    return maxLen;
}
console.log('14. 无重复最长子串:', lengthOfLongestSubstring('abcabcbb')); 
// 3 ("abc")


// 15. 最长回文子串 ⭐⭐⭐ (LeetCode 5)
function longestPalindrome(s) {
    if (s.length < 2) return s;
    
    let start = 0;
    let maxLen = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLen = right - left + 1;
            if (currentLen > maxLen) {
                start = left;
                maxLen = currentLen;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // 奇数长度
        expandAroundCenter(i, i + 1); // 偶数长度
    }
    
    return s.slice(start, start + maxLen);
}
console.log('15. 最长回文子串:', longestPalindrome('babad')); 
// "bab" 或 "aba"


// ==================== 特殊场景 ====================

// 16. 实现 trim() ⭐⭐
function myTrim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
console.log('16. 自定义trim:', `"${myTrim('  hello  ')}"`); 
// "hello"


// 17. 模板字符串实现 ⭐⭐⭐
function template(str, data) {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] || match;
    });
}
const result = template('Hello {{name}}, you are {{age}} years old', 
    { name: 'Tom', age: 25 });
console.log('17. 模板引擎:', result); 
// "Hello Tom, you are 25 years old"


// 18. URL 参数解析 ⭐⭐⭐
function parseQuery(url) {
    const queryStr = url.split('?')[1];
    if (!queryStr) return {};
    
    const params = {};
    queryStr.split('&').forEach(item => {
        const [key, value] = item.split('=');
        params[key] = decodeURIComponent(value);
    });
    
    return params;
}
console.log('18. URL参数解析:', 
    parseQuery('https://example.com?name=Tom&age=25')); 
// { name: 'Tom', age: '25' }


// 19. 对象转 URL 参数 ⭐⭐
function stringifyQuery(obj) {
    return Object.keys(obj)
        .map(key => `${key}=${encodeURIComponent(obj[key])}`)
        .join('&');
}
console.log('19. 对象转URL:', 
    stringifyQuery({ name: 'Tom', age: 25 })); 
// "name=Tom&age=25"


// 20. 版本号比较 ⭐⭐⭐
function compareVersion(version1, version2) {
    const v1 = version1.split('.').map(Number);
    const v2 = version2.split('.').map(Number);
    const maxLen = Math.max(v1.length, v2.length);
    
    for (let i = 0; i < maxLen; i++) {
        const num1 = v1[i] || 0;
        const num2 = v2[i] || 0;
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }
    
    return 0;
}
console.log('20. 版本号比较:', compareVersion('1.2.0', '1.1.9')); 
// 1 (version1 > version2)


console.log('\n=== 练习完成！===');
console.log('💡 提示：尝试优化每个函数的性能和边界情况处理');


