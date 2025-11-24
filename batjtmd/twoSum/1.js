function twoSum(nums, target) {
    // es6 提供了hashMap 

    const diffs = {}; // es5 没有hashMap  O(1) 时间复杂度
    const len = nums.length;  // 缓存数组的长度
    for(let i = 0; i < len; i++) {
        const complement = target - nums[i]; // 求和问题 -> 求差
        if (diffs[complement] || diffs[complement] === 0) {  // 索引  
            return [diffs[complement], i];
        }

        diffs[nums[i]] = i;
    }

}