function foo() {
    var a = {name: "极客时间"}  // 引用赋值
    var b = a;  // 引用拷贝
    a.name = "极客邦";
    console.log(a);   // {name: "极客邦"}
    console.log(b);   // {name: "极客邦"}
}

foo();