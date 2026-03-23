# 通过手写 Mini React 学习 React — 最佳步骤


## 推荐学习环境（二选一）

### 方案 A：最小化 — 单 HTML + 单 JS（最易理解）

- 一个 `index.html`，一个 `main.js`。
- 用 Babel 浏览器版或提前编译：只做一件事 —— 把 JSX 转成 `createElement` 调用。
- **优点**：零构建、零入口概念，所见即所得，适合第一步「把元素画到页面上」。

### 方案 B：Vite + TypeScript（推荐长期使用）

- 不用 CRA，用 Vite 创建项目，只加 TypeScript。
- 命令：`npm create vite@latest mini-react -- --template vanilla-ts`，再手动加 JSX 支持（见下）。
- **优点**：接近真实项目、热更新快、配置简单，适合从「能跑的 React」过渡到「带类型的 Mini React」。

**建议**：先按方案 A 做完「第一步：createElement + render」，再迁到方案 B 做 Fiber 和 Hooks。

---

## 学习路线图（总览）

| 阶段 | 你要理解的概念 | 你要实现的东西 |
|------|----------------|----------------|
| **0** | 为什么要手写、JSX 是什么 | 无代码，只读书/视频 |
| **1** | 虚拟 DOM、createElement、递归渲染 | 用 JS 对象描述 UI，递归挂到真实 DOM |
| **2** | 递归渲染的问题、为什么需要可中断 | 用「工作单元」替代递归，为 Fiber 打基础 |
| **3** | Fiber 是什么、Reconciler 做什么 | 实现 Fiber 树、Reconcile + Commit 两阶段 |
| **4** | 函数组件、Hooks 的调用约定 | 函数组件 + useState（可加 useEffect） |
| **5** | 事件、key、更新优化 | 事件委托、key 的 diff、按需更新 DOM |

下面按阶段给出「最好」的实践步骤。

---

## 阶段 0：先建立心智模型（不写代码）

1. **明确 JSX 的本质**  
   - JSX 会被编译成 `createElement(type, props, ...children)`。  
   - 学习资料：React 官网 [Introducing JSX](https://react.dev/learn/writing-markup-with-jsx)、[Build Your Own React](https://pomb.us/build-your-own-react/) 前几节。

2. **明确 React 的两大阶段**  
   - **Render 阶段**：根据 state/props 算出一棵「描述 UI 的数据结构」（虚拟 DOM / Fiber 树），可重做、可中断。  
   - **Commit 阶段**：把算好的结果一次性应用到真实 DOM，尽量少碰 DOM。

3. **知道 Fiber 要解决什么**  
   - 旧版 React 用递归「一口气」把整棵树算完，无法暂停、无法分片。  
   - Fiber 把「一个节点」当作一个工作单元，用「循环 + 下一个指针」替代递归，方便时间切片和优先级。

做到：能用自己的话解释「JSX → 元素对象 → (Fiber) → DOM」这条链路，再进入阶段 1。

---

## 阶段 1：createElement + 递归 render（虚拟 DOM 最小实现）

**目的**：理解「用数据描述 UI」和「一次性递归挂到 DOM」。

### 1.1 环境（方案 A）

- 新建 `index.html`，内联或外链一个脚本；用 Babel 浏览器版把 JSX 转成 `createElement`，或本地用 `babel-cli` 把 `main.jsx` 编译成 `main.js` 再在 HTML 里引用。
- 不引入 React 库，自己实现 `createElement` 和 `render`。

### 1.2 实现 createElement

- 函数签名：`createElement(type, props, ...children)`。
- 把 `children` 拍平后放进 `props.children`。
- 返回一个普通对象：`{ type, props }`。这就是你最初的「虚拟 DOM 节点」。

**要理解**：JSX 只是语法糖，最终就是这样的对象树。

### 1.3 实现 render（递归版）

- `render(element, container)`：根据 `element.type` 创建真实 DOM（文本用 `createTextNode`），把 `props` 里非 `children` 的属性挂到 DOM 上，再对 `props.children` 递归调用 `render(child, dom)`，最后 `container.appendChild(dom)`。

**要理解**：虚拟 DOM 树如何对应到真实 DOM 树；当前是「整棵树一口气递归到底」，没有 diff、没有更新。

### 1.4 跑通一个例子

- 例如：`const el = <div><h1>Hi</h1><p>Hello</p></div>`，`render(el, document.getElementById('root'))`，页面上能看到对应结构。

到这里，你已经实现了「React 最简形态」：数据 → 树结构 → 递归挂 DOM。下一步才会引入「更新」和「可中断」。

---

## 阶段 2：从递归到「工作单元」（为 Fiber 铺路）

**目的**：体会「递归一跑到底」的问题，改成「每次只处理一个节点，并返回下一个要处理的节点」。

### 2.1 保留 createElement，重写 render

- 不再用递归直接挂 DOM。
- 引入「当前工作单元」：从根节点开始，每次只做「当前节点」的 DOM 创建和挂载，然后通过「child → sibling → parent.sibling」决定下一个工作单元，用 `while` 循环推进，直到没有下一个。

### 2.2 不实现 Fiber 结构也可以

- 可以先用「普通元素对象 + 临时指针」模拟「下一个工作单元」。
- 重点理解：**把递归拆成一步步的循环**，这样以后就可以在每一步之间插入 `requestIdleCallback` 或调度逻辑（Fiber 的雏形）。

**要理解**：为什么 React 要搞 Fiber —— 可中断、可分片、可恢复。你这一步就是在模仿「分片」的思想。

---

## 阶段 3：Fiber 架构 + Reconciler（两阶段：Reconcile / Commit）

**目的**：实现真正的 Fiber 树和「渲染阶段 / 提交阶段」分离。

### 3.1 定义 Fiber 节点结构

- 至少包含：`type, props, dom, parent, child, sibling`。
- 再增加：`alternate`（指向上一次渲染的 Fiber，用于 diff）、`effectTag`（如 PLACEMENT / UPDATE / DELETION）。

### 3.2 构建 Fiber 树（Reconcile）

- 从根开始，把「当前 Fiber」当作工作单元：
  - 若没有对应 DOM，先创建 DOM（不挂到文档）；
  - 若有子节点，把第一个子节点设为 `child`，其余子节点通过 `sibling` 串起来；
  - 通过 `child → sibling → return` 找到下一个工作单元，循环直到整棵树遍历完。
- 同时根据「当前 Fiber」和 `alternate` 打上 `effectTag`（新增/更新/删除），为 Commit 阶段准备。

### 3.3 提交到 DOM（Commit）

- 等整棵 Fiber 树 Reconcile 完成，再单独走一遍「只做 DOM 增删改」的提交：
  - 根据 `effectTag` 执行 `appendChild`、`removeChild`、属性更新等。
- 提交完成后，把当前 Fiber 树存下来，作为下次的 `alternate`。

### 3.4 使用 requestIdleCallback（可选但推荐）

- 在「找下一个工作单元」的循环里，每处理完一个 Fiber，用 `requestIdleCallback` 让出主线程，下次空闲时继续。这样就能直观感受「可中断的渲染」。

**要理解**：Render 阶段只算结构 + 打标签，Commit 阶段才动 DOM；Fiber 的「链表 + alternate」是如何支持增量更新的。

---

## 阶段 4：函数组件 + useState（Hooks 入门）

**目的**：理解「组件即函数」和「Hooks 靠调用顺序和闭包存状态」。

### 4.1 在 Fiber 里支持 type 为函数

- 当 `fiber.type` 是函数时，不创建 DOM，而是调用 `fiber.type(fiber.props)` 得到子元素（可能是单个元素或数组），再对这些子元素做 Reconcile（建立 child/sibling）。

### 4.2 实现 useState

- 在 Fiber 上挂一个 `hooks` 数组（或类似结构）。
- 每次执行函数组件时，按「调用顺序」从 `hooks` 里取对应项：第一次用初始值，之后用上一次存的值。
- `setState` 时：把更新加入队列，然后触发一次「从该组件根 Fiber 开始的 Reconcile + Commit」，在下次渲染时再按顺序应用队列里的更新，得到新 state。

**要理解**：Hooks 必须每次在同一个组件、同一顺序调用，所以不能放在 if/循环里；Fiber 上存的是「当前这次渲染」的 hooks 列表，alternate 上存的是上一次的，用于计算新 state。

### 4.3 可选：useEffect 简化版

- 在 Commit 阶段后，根据「本次」的 effect 列表执行；依赖用简单数组比较即可。先不做清理函数也没关系，重点是把「渲染后执行」的时机搞清楚。

---

## 阶段 5：完善体验（事件、key、优化）

**目的**：让 mini-react 更接近「可用」，并理解 React 的常见优化手段。

### 5.1 事件

- 不在每个子节点上绑事件，而在根容器上做**事件委托**：根据 `event.target` 找到对应 Fiber，再在 Fiber 的 props 里找 `onClick` 等并执行。这样和 React 的合成事件思路一致（我们只做委托即可）。

### 5.2 key 与列表 diff

- 在 Reconcile 时，若子节点是列表，根据 `key` 匹配旧 Fiber 和新元素，尽量复用 DOM，只做移动/增删，避免整列表重挂。先实现「有 key 的列表」比「无 key」的复用逻辑即可。

### 5.3 更新粒度

- 只对「有 effectTag 的节点」做 DOM 更新；文本节点只更新 `nodeValue`，避免整棵子树替换。这样理解「最小化 DOM 操作」的意义。

---

## 推荐项目结构（阶段 3 之后，用 Vite + TS）

```
mini-react/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                 # 入口，createRoot(...).render(<App />)
    ├── react/
    │   ├── index.ts             # 对外 API：createElement, createRoot, useState 等
    │   ├── jsx-runtime.ts       # 供 TS/Babel 使用的 jsx / jsxs
    │   ├── element.ts           # createElement、元素类型
    │   ├── fiber.ts             # Fiber 类型、createDOM、updateDOMProps
    │   ├── reconciler.ts        # workLoop, performUnitOfWork, commitRoot
    │   └── hooks.ts             # useState, useEffect
    └── App.tsx                  # 示例组件
```

- 用 Vite 时，在 `tsconfig.json` 里设置 `"jsx": "react-jsx"`，并在 `vite.config.ts` 里用 `esbuild.jsxInject` 或 resolve alias 让 JSX 指向你自己的 `jsx-runtime`，这样所有 JSX 都会走你的 `createElement`/jsx 实现，无需安装 React。

---

## 学习顺序小结（「最好」的步骤）

1. **不写代码**：弄清 JSX、虚拟 DOM、两阶段（Render/Commit）、Fiber 要解决的问题。  
2. **createElement + 递归 render**：用最少环境（单 HTML 或 Vite）跑通「元素对象 → DOM」。  
3. **从递归到工作单元**：用循环 + 下一个指针替代递归，理解可中断。  
4. **Fiber + Reconciler**：实现 Fiber 树、Reconcile、Commit、可选 requestIdleCallback。  
5. **函数组件 + useState（+ useEffect）**：理解 Hooks 与 Fiber 的配合。  
6. **事件、key、DOM 更新优化**：完善体验和心智模型。

这样你是在「先理解、再实现」的前提下，用最小工具链手写一个 mini-react，比在 CRA 里改来改去更利于吃透 React。

---

## 参考资料

- [Build Your Own React](https://pomb.us/build-your-own-react/)（建议按它的顺序做一遍，再对照本提纲补 Fiber）
- [React 官方文档](https://react.dev/)
- [React Fiber 架构](https://github.com/acdlite/react-fiber-architecture)（英文，讲 Fiber 设计动机）

---

## 总结

- **不用 CRA**：用单 HTML+JS 或 Vite+TS，减少黑盒，专注 React 原理。  
- **最好步骤**：概念先行 → createElement + 递归 render → 工作单元 → Fiber Reconciler → 函数组件与 Hooks → 事件与 key。  
- **目标**：通过亲手实现虚拟 DOM、Fiber、Hooks，建立对 React 的稳定理解，而不是只会用 API。
