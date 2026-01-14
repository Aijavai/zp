- pnpm i prop-types    // 处理类型的提供

# props

- state 改变的数据 自有
- props 传递的数据 父组件传递

## 组件components 
- 拼乐高积木一样，页面拼出来
- 开发任务的最小单元
- 组件可以封装，components 目录下
  pages 页面级别组件
- 复用
  组件类
- 协作
- 组件可以嵌套
  父子组件
  App.jsx 老板
  Greeting.jsx 员工
- 组件之间就会有数据的传递

## 组件通信
- 父组件一般复杂持有数据 useState 自有
- 子组件 可以拿到父组件传递的 props
  - function 的js 意义，通过参数传递 props 参数对象