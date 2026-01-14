// parseInt callbackFnd
// parseInt(element, index, array)
console.log([1,2,3].map(parseInt));

[1, 2, 3].map(function(item, index, arr) {
    console.log(item, index, arr);
    return item;
})

// parseInt(string, radix)    radix 是大于2小于36之间的，其他都是非法的，0，undefined, 未定义则是10进制或者按照它的规则来。
console.log(parseInt(1, 0, [1, 2, 3]));
console.log(parseInt(2, 1, [1, 2, 3]));
console.log(parseInt(3, 2, [1, 2, 3]));