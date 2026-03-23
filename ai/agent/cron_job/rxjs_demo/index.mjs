import { // 观察者模式是经典的设计模式
    Observable, // 观察者
} from "rxjs";

// 创建了一个Observable 对象 被观察者
// 参数是一个回调函数
// 接受一个subscriber 观察者对象
const stream = new Observable((subscriber) => {
    // next 发送一个数据
    // complete 完成数据流
    subscriber.next("hello");
    subscriber.next("world");
    subscriber.complete();
});

// 订阅数据流
stream.subscribe((value) => {
    // 观察者函数
    console.log(value);
});
