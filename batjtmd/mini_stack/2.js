class MinStack {
    constructor() {
        this.stack = [];     // 存储所有元素
        this.minStack = [];  // 存储最小值的历史记录
    }

    push(val) {
        this.stack.push(val);
        // 如果 minStack 为空 或 val <= 当前最小值，则更新最小值栈
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
p
    pop() {
        const val = this.stack.pop();
        // 如果弹出的元素等于当前最小值，则也从 minStack 弹出
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}