function foo(...args) {
    let [x, y, z] = args;
    console.log(arguments);
    console.log(args);
    return x+y+z;
}

console.log(foo(1,2,3,4))