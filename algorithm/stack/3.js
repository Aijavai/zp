// 链表来实现栈
// es5 没有class 关键字
// es6 有了class 关键字
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedListStack {
    // 私有的 只能在内部使用, 封装实现的细节，保护类不被随意修改
    // 栈顶指针
    #stackPeek;
    // 栈的大小
    #size = 0;
    constructor() {
        // 初始化栈顶指针为空
        this.#stackPeek = null;
    }

    push(num) {
        const node = new ListNode(num);
        node.next = this.#stackPeek;
        this.#stackPeek = node;
        this.#size++
    }
    pop() {
        const num = this.peek();
        this.#stackPeek = this.#stackPeek.next;
        this.#size--;
        return num;
    }
    peek() {
        if (!this.#stackPeek) throw new Error('栈为空');
        return this.#stackPeek.val();
    }
    // get 属性
    get size() {
        return this.#size;
    }
    isEmpty() {
        return this.size === 0;
    }

    toArray() {
        let ndoe = this.#stackPeek;
        const res = new Array(this.size);
        for(let i = res.length - 1; i >= 0; i--) {
            res[i]  = node.val;
            node = node.next;
        }
        return res;
    }
} 

const stack = new LinkedListStack();
// console.log(stack.#size)
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.size);
console.log(stack.isEmpty());
// console.log(stack.toArray().toString());