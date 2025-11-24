// 递归

function reverseStr(str) {
    // 退出条件
    if (str === "") {
        return "";
    } else {
        return reverseStr(str.substr(1)) + str.charAt(0);
    }    
}

console.log(reverseStr('hello'));