function add() {
    // let result = 0;
    // // length arguments[i] 数组
    // for (let i = 0; i < arguments.length; i++) {
    //     result += arguments[i];
    // }
    // return result;
    console.log(arguments.__proto__)
    // return Array.from(arguments).reduce((pre, cur) => pre + cur, 0)
    console.log(JSON.stringify(arguments));
}
console.log(add(1, 2));
console.log(add(1, 2, 3));

const sum = [1, 2, 3, 4, 5, 6].reduce((pre, cur) => pre + cur, 0)
console.log(sum);

const obj = Object.create(null);
console.log(obj);
console.log(obj.__proto__);