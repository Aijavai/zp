function *fruitGenerator() {
    console.log("开始生产水果");
    yield "苹果";
    console.log("生产苹果后，继续生产香蕉");
    yield "香蕉";
    console.log("生产香蕉后，生产结束");
    return "没有水果了";
}

// 生成器对象 迭代器
const fruitMachine = fruitGenerator();
console.log(fruitMachine.next()); // 开始
console.log(fruitMachine.next()); // 苹果
console.log(fruitMachine.next()); // 香蕉