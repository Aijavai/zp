const MiniStack = function() {
    this.stack = [];
    this.stack2 = [];
}
MiniStack.prototype.push = function(x) {
    this.stack.push(x);
    if (this.stack.length === 0 || 
        this.stack2[this.stack2.length - 1] >= x) {
            this.stack2.push(x)
        }
}