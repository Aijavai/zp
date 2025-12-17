// 有序数组的合并，原地修改

function merge(num1, m, num2, n) {
    // 数组是连续存储的空间，可以从后往前
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;
    while(i >= 0 && j >= 0) {
        if (num1[i] > num2[j] ) {
            num1[k--] = num1[i--];
        } else {
            num1[k--] = num2[j--];
        }
    }
    while(j >= 0) {
        num1[k--] = num2[j--];
    }

}


// 版本二
var merge = function(num1, m, num2, n) {
    let p1 = m - 1;
    let p2 = n - 1;
    let tail = m + n + 1;

    while (p2 >=0) {
        if (p1 >=0 && num1[p1] > num2[p2]) {
            num1[tail] = num1[p1];
            p1--;
        } else {
            nums1[tail] = num2[p2];
            p2--;
        }
        tail--;
    }
};