# React 
MVVM 现代前端框架 
组件化、响应式、JSX、虚拟DOM、 Fiber 架构...

- React 底层原理
  最好的方式就是手写Mini React


- react-scripts CRA 类似vite
- JSX 
  JSX 是在JS 里直接写HTML 标签的语法糖
  - 优势
  

## 第三个阶段

### 递归render 的性能问题
- VDOM 树比较巨大 电商详情页的复杂组件树结构
-

### Fiber 机制
VDOM 树 -> Fiber Tree -> render
- 浏览器不忙的时候，
中断、调度
fiber 节点 是 element render 的工作单元 work unit
下一个work unit 指针

## 消息队列 和 事件循环
### Event Loop
事件循环机制

1. 每个页面都有一个渲染进程，启动一个主线程，负责的任务特别多，而且还是单线程
V8 JS 引擎 和渲染引擎(进程内部)， 多进程的通信(网络进程...) 消息的方式

2. 多少事要做
- 处理DOM 解析HTML 生成DOM 树
- 计算样式合并css 规则与元素默认样式，确定每个DOM 节点最终的可视化样式属性值。CSSOM 树
- DOM Tree 和 CSSOM 树 结合 渲染树 render Tree
- 处理布局，盒模型、BFC(弹性、浮动、定位)，Layout Tree DOM 节点在屏幕的精确位置，尺寸
等几何布局信息
- 合并图层 
- 渲染引擎 绘制
- JS 执行 开始于一个script 标签
  <script src="" type="module">
  </script>
  同步代码(尽快运行结束)，异步代码（耗时的，未来的，事件的promise async await setTimeout 
  setInterval, addEventListener, ....）

  - 消息机制
  - Event Loop
    第一个宏任务 script
    同步代码全部执行完，