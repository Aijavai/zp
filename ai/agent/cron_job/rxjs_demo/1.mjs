import {
    from // 从数组创建Observable 对象
} from "rxjs";

// from 将数组转换为Observable 对象
const stream = from([1,2,3]);
stream.subscribe((value) => {
    // 观察者函数
    console.log(value);
});
