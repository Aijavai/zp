// 子集
// 树 不能重复 从startIndex 开始循环

function B(nums) {
    const result = [];
    const path = [];

    function backtrack(startIndex) {
        result.push([...path]);

        for (let i = startIndex, n = nums.length; i < n; i++) {
            path.push(nums[i]);

            backtrack(i + 1);
            
            path.pop();
        }
    }

    backtrack(0);
    return result;
}