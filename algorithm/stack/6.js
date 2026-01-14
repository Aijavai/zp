class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedListStack {
    #stackPeek;
    #size;

    constructor() {
        this.#stackPeek = null;
    }

    push(num) {
        const node = new ListNode(num);
        node.next = this.#stackPeek;
        this.#stackPeek = node;
        this.#size++;
    }
    pop() {
        const num = this.peek();
        this.#stackPeek = this.#stackPeek.next;
        this.#size--;
        return num;
    }
    peek() {
        return this.#stackPeek.val();
        
    }
    get size() {

    }
}