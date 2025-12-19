// es5 构造函数
const MiniStack = function() {
    this.stack = []; // 数组 
}

MiniStack.prototype.push = function(x) {
    this.stack.push(x);
}
MiniStack.prototype.pop = function() {
    return this.stack.pop();
}
MiniStack.prototype.top = function() {
    if(!this.stack || !this.stack.length) {
        return ;
    }
    return this.stack[this.stack.length - 1];
}

// O(n) 
MiniStack.prototype.getMin = function() {
    // - 遍历一遍
    // - Infinity
    let minValue = Infinity; // 无穷大
    const { stack } = this;
    for (let i = 0; i < stack.length; i++) {
        if (stack[i] < minValue) {
            minValue = stack[i];
        }
    }
    return minValue;
}