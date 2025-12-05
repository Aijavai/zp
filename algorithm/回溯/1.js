// 全排列 树 不需要去重
// nums
// [1, 2, 3]
function A(nums) {
    const result = [];
    const path = [];
    const used = new Array(nums.length).fill(false);

    function backTrack() {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        for (let i = 0, n = nums.length; i < n; i++) {
        if (used[i]) continue;
        // 入
        path.push(nums[i]);
        used[i] = true;

        backTrack();

        // 出
        path.pop();
        used[i] = false;
    }
}
    backTrack();
    return result;
}