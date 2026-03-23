import {
    from,
    map
} from "rxjs";

from([1,2,3]) // Observable 对象
    .pipe(
        map((value) => value * 2)
    )
    .subscribe((value) => {
        // 观察者函数
        console.log(value);
    });
