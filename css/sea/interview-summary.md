# CSS 层叠样式表 - 大厂面试知识点总结

## 目录
1. [CSS层叠与继承机制](#1-css层叠与继承机制)
2. [选择器与优先级](#2-选择器与优先级)
3. [定位系统](#3-定位系统)
4. [布局系统](#4-布局系统)
5. [层叠上下文与z-index](#5-层叠上下文与z-index)
6. [CSS变量](#6-css变量)
7. [伪类与伪元素](#7-伪类与伪元素)
8. [CSS动画与过渡](#8-css动画与过渡)
9. [响应式设计](#9-响应式设计)
10. [CSS性能优化](#10-css性能优化)
11. [现代CSS特性](#11-现代css特性)
12. [常见面试题](#12-常见面试题)

---

## 1. CSS层叠与继承机制

### 1.1 什么是层叠（Cascade）

层叠是CSS的核心机制，当多个规则应用到同一个元素时，浏览器通过以下顺序决定最终样式：

1. **来源和重要性**
   - 用户代理样式表（浏览器默认样式）
   - 用户样式表
   - 作者样式表（开发者编写的样式）
   - `!important` 的作者样式
   - `!important` 的用户样式

2. **选择器优先级（Specificity）**
   - 内联样式：1000
   - ID选择器：100
   - 类选择器、属性选择器、伪类：10
   - 元素选择器、伪元素：1
   - 通配符 `*`：0

3. **源码顺序**
   - 后定义的样式会覆盖先定义的样式

### 1.2 继承（Inheritance）

某些CSS属性会从父元素继承到子元素：

**可继承属性：**
- 字体相关：`font-family`、`font-size`、`font-weight`、`line-height`
- 文本相关：`color`、`text-align`、`text-indent`、`letter-spacing`
- 列表相关：`list-style`、`list-style-type`
- 表格相关：`border-collapse`、`border-spacing`
- 可见性：`visibility`、`cursor`

**不可继承属性：**
- 布局相关：`display`、`width`、`height`、`margin`、`padding`、`border`
- 定位相关：`position`、`top`、`left`、`right`、`bottom`
- 背景相关：`background`、`background-color`、`background-image`
- 其他：`overflow`、`z-index`、`float`

**控制继承的关键字：**
```css
.element {
  property: inherit;    /* 强制继承父元素 */
  property: initial;    /* 使用初始值 */
  property: unset;      /* 可继承则继承，否则使用初始值 */
  property: revert;     /* 回退到浏览器默认样式 */
}
```

### 1.3 面试高频问题

**Q: 为什么有些属性会继承，有些不会？**

A: 继承的设计原则是让样式更易维护。文本相关属性继承是合理的（如颜色、字体），因为我们通常希望一致性。但布局属性不继承，因为每个元素的尺寸和位置应该独立控制。

---

## 2. 选择器与优先级

### 2.1 选择器类型

#### 基础选择器
```css
/* 元素选择器 */
div { }

/* 类选择器 */
.class-name { }

/* ID选择器 */
#id-name { }

/* 属性选择器 */
[attr] { }
[attr=value] { }
[attr^=value] { }  /* 以value开头 */
[attr$=value] { }  /* 以value结尾 */
[attr*=value] { }  /* 包含value */
[attr~=value] { }  /* 包含完整单词value */
[attr|=value] { }  /* 等于value或以value-开头 */
```

#### 组合选择器
```css
/* 后代选择器 */
div p { }

/* 子选择器 */
div > p { }

/* 相邻兄弟选择器 */
div + p { }

/* 通用兄弟选择器 */
div ~ p { }
```

#### 伪类选择器
```css
/* 状态伪类 */
:hover, :active, :focus, :visited

/* 结构伪类 */
:first-child, :last-child, :nth-child(n)
:first-of-type, :last-of-type, :nth-of-type(n)
:only-child, :only-of-type

/* 逻辑伪类 */
:not(selector)
:is(selector1, selector2)
:where(selector1, selector2)
:has(selector)  /* CSS4 新特性 */

/* 表单伪类 */
:checked, :disabled, :enabled
:valid, :invalid, :required, :optional
```

### 2.2 优先级计算

**计算规则（Specificity）**

使用 (a, b, c, d) 表示：
- a: 内联样式（1或0）
- b: ID选择器数量
- c: 类、属性、伪类选择器数量
- d: 元素、伪元素选择器数量

**示例：**
```css
/* (0, 0, 0, 1) */
p { color: red; }

/* (0, 0, 1, 1) */
p.class { color: blue; }

/* (0, 1, 0, 1) */
p#id { color: green; }

/* (0, 1, 2, 1) */
#id .class1.class2 p { color: purple; }

/* (1, 0, 0, 0) */
<p style="color: orange;">
```

**注意事项：**
1. `!important` 优先级最高，但会破坏层叠规则
2. `:not()` 本身无优先级，但其参数有
3. `:is()` 和 `:where()` 的区别：`:where()` 优先级为0
4. 通配符 `*` 优先级为0，但仍比继承优先级高

### 2.3 高级选择器技巧

```css
/* :is() 简化选择器 */
:is(header, main, footer) p {
  /* 等同于：header p, main p, footer p */
}

/* :where() 降低优先级 */
:where(#id) .class {
  /* 优先级只计算 .class，忽略 #id */
}

/* :has() 父选择器（CSS4） */
article:has(> img) {
  /* 选择包含直接子元素 img 的 article */
}

/* 否定伪类的高级用法 */
li:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

/* nth-child 的强大表达式 */
li:nth-child(2n)      /* 偶数 */
li:nth-child(2n+1)    /* 奇数 */
li:nth-child(3n)      /* 每3个 */
li:nth-child(n+3)     /* 第3个及之后 */
li:nth-child(-n+3)    /* 前3个 */
```

---

## 3. 定位系统

### 3.1 定位类型

```css
/* static: 默认值，正常文档流 */
position: static;

/* relative: 相对定位，相对于自身原始位置 */
position: relative;
top: 10px;
left: 20px;

/* absolute: 绝对定位，相对于最近的非static祖先元素 */
position: absolute;

/* fixed: 固定定位，相对于视口 */
position: fixed;

/* sticky: 粘性定位，结合relative和fixed */
position: sticky;
top: 0;
```

### 3.2 定位详解

#### relative 相对定位
- 不脱离文档流
- 原始空间仍占据
- 相对于自身原始位置偏移
- 不影响其他元素布局

#### absolute 绝对定位
- 脱离文档流
- 不占据空间
- 定位参考：最近的 `position: relative/absolute/fixed/sticky` 祖先
- 如果没有定位祖先，则相对于初始包含块（通常是 `<html>`）

**重要特性：**
```css
/* 绝对定位元素可以通过设置对立方向实现拉伸 */
.element {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* 如果不设置width/height，元素会被拉伸填充 */
}

/* 居中技巧 */
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 另一种居中方法 */
.center-alt {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 200px;
}
```

#### fixed 固定定位
- 脱离文档流
- 相对于视口定位
- 滚动页面时位置不变
- **例外情况：** 当祖先元素有 `transform`、`perspective`、`filter` 等属性时，fixed会相对于该祖先定位

#### sticky 粘性定位
```css
.sticky-header {
  position: sticky;
  top: 0;
  /* 
   * 工作原理：
   * 1. 元素在容器范围内滚动时表现为relative
   * 2. 当达到阈值（top: 0）时，固定在该位置
   * 3. 当容器滚出视口，元素跟随容器离开
   */
}
```

**sticky 注意事项：**
- 父元素不能有 `overflow: hidden/auto/scroll`
- 必须指定 `top/bottom/left/right` 至少一个值
- 父元素高度必须大于sticky元素

### 3.3 定位相关面试题

**Q: absolute 和 relative 的区别？**

A: 
- `relative` 保留文档流位置，`absolute` 脱离文档流
- `relative` 相对自身偏移，`absolute` 相对定位祖先偏移
- `absolute` 会改变元素的display特性（类似inline-block）

**Q: 为什么 transform 会影响 fixed 定位？**

A: CSS规范规定，当元素应用了某些属性（transform、perspective、filter、will-change等）时，会创建一个新的包含块，fixed元素会相对于这个包含块定位，而不是视口。

---

## 4. 布局系统

### 4.1 Flexbox 弹性布局

#### 容器属性

```css
.container {
  display: flex; /* 或 inline-flex */
  
  /* 主轴方向 */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* 是否换行 */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* 简写 */
  flex-flow: <flex-direction> <flex-wrap>;
  
  /* 主轴对齐 */
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  
  /* 交叉轴对齐 */
  align-items: flex-start | flex-end | center | baseline | stretch;
  
  /* 多行对齐 */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  
  /* 间隙（现代CSS） */
  gap: 10px;
  row-gap: 10px;
  column-gap: 20px;
}
```

#### 项目属性

```css
.item {
  /* 排序 */
  order: 0; /* 默认值，数值越小越靠前 */
  
  /* 放大比例 */
  flex-grow: 0; /* 默认不放大 */
  
  /* 缩小比例 */
  flex-shrink: 1; /* 默认会缩小 */
  
  /* 基础尺寸 */
  flex-basis: auto; /* 默认auto，可设置具体值 */
  
  /* 简写：flex-grow flex-shrink flex-basis */
  flex: 0 1 auto; /* 默认值 */
  flex: 1; /* 等同于 flex: 1 1 0% */
  flex: auto; /* 等同于 flex: 1 1 auto */
  flex: none; /* 等同于 flex: 0 0 auto */
  
  /* 单独对齐 */
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

#### Flex 经典布局

```css
/* 圣杯布局 */
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.header, .footer {
  flex: 0 0 auto;
}
.main {
  flex: 1 0 auto;
}

/* 平均分布 */
.item {
  flex: 1;
}

/* 最后一个元素右对齐 */
.last-item {
  margin-left: auto;
}

/* 居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 4.2 Grid 网格布局

#### 容器属性

```css
.container {
  display: grid; /* 或 inline-grid */
  
  /* 定义行和列 */
  grid-template-columns: 100px 200px auto;
  grid-template-rows: 50px 100px;
  
  /* 使用 repeat() */
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  
  /* 定义区域 */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  
  /* 间隙 */
  gap: 10px;
  row-gap: 10px;
  column-gap: 20px;
  
  /* 对齐 */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
  
  /* 隐式网格 */
  grid-auto-rows: 100px;
  grid-auto-columns: 100px;
  grid-auto-flow: row | column | row dense | column dense;
}
```

#### 项目属性

```css
.item {
  /* 位置 */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  
  /* 简写 */
  grid-column: 1 / 3; /* 或 1 / span 2 */
  grid-row: 1 / 2;
  grid-area: 1 / 1 / 2 / 3; /* row-start / column-start / row-end / column-end */
  
  /* 使用命名区域 */
  grid-area: header;
  
  /* 单独对齐 */
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

#### Grid 高级技巧

```css
/* 响应式网格，无需媒体查询 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 使用 fr 单位 */
.grid {
  grid-template-columns: 1fr 2fr 1fr; /* 1:2:1 比例 */
}

/* 命名网格线 */
.grid {
  grid-template-columns: [start] 1fr [middle] 2fr [end];
  grid-template-rows: [header-start] auto [header-end content-start] 1fr [content-end];
}

/* subgrid（CSS Grid Level 2） */
.item {
  display: grid;
  grid-template-columns: subgrid; /* 继承父网格 */
}
```

### 4.3 Flexbox vs Grid

**何时使用 Flexbox：**
- 一维布局（行或列）
- 内容驱动的布局
- 对齐和分布是主要需求
- 小规模布局，如导航栏、按钮组

**何时使用 Grid：**
- 二维布局（行和列同时控制）
- 布局驱动的设计
- 需要精确控制行和列
- 大规模页面布局

---

## 5. 层叠上下文与z-index

### 5.1 层叠上下文（Stacking Context）

层叠上下文是HTML元素的三维概念，决定了元素在z轴上的显示顺序。

#### 创建层叠上下文的条件

1. 根元素 `<html>`
2. `position: absolute/relative` 且 `z-index` 不为 `auto`
3. `position: fixed/sticky`
4. flex容器的子元素，且 `z-index` 不为 `auto`
5. grid容器的子元素，且 `z-index` 不为 `auto`
6. `opacity` 小于 1
7. `transform` 不为 `none`
8. `filter` 不为 `none`
9. `perspective` 不为 `none`
10. `clip-path` 不为 `none`
11. `mask` / `mask-image` / `mask-border`
12. `mix-blend-mode` 不为 `normal`
13. `isolation: isolate`
14. `will-change` 指定了任意会创建层叠上下文的属性
15. `contain: layout/paint/strict/content`

### 5.2 层叠顺序（Stacking Order）

在同一个层叠上下文中，从底到顶的顺序：

1. 层叠上下文的背景和边框
2. `z-index` 为负值的定位子元素（及其子元素）
3. 非定位的块级子元素
4. 非定位的浮动子元素
5. 非定位的行内子元素
6. `z-index: 0/auto` 的定位子元素
7. `z-index` 为正值的定位子元素（及其子元素）

### 5.3 z-index 详解

```css
/* z-index 只对定位元素有效 */
.positioned {
  position: relative; /* 或 absolute/fixed/sticky */
  z-index: 10;
}

/* 不同层叠上下文中，z-index不可比较 */
.parent1 {
  position: relative;
  z-index: 1;
}
.child1 {
  position: relative;
  z-index: 9999; /* 仍然在 parent2 之下 */
}

.parent2 {
  position: relative;
  z-index: 2;
}
.child2 {
  position: relative;
  z-index: 1;
}
```

### 5.4 常见问题与解决方案

#### 问题1: z-index 不生效

```css
/* 错误：未设置position */
.element {
  z-index: 999; /* 无效 */
}

/* 正确 */
.element {
  position: relative;
  z-index: 999;
}
```

#### 问题2: 子元素无法覆盖其他元素

```css
/* 父元素创建了新的层叠上下文，限制了子元素 */
.parent {
  opacity: 0.99; /* 创建层叠上下文 */
}
.child {
  position: relative;
  z-index: 9999; /* 无法超出父元素的层叠上下文 */
}

/* 解决方案：移除父元素的层叠上下文创建条件 */
.parent {
  opacity: 1;
}
```

#### 问题3: fixed 定位元素被遮挡

```css
/* transform 会创建新的层叠上下文 */
.container {
  transform: translateZ(0); /* 创建层叠上下文 */
}
.fixed-element {
  position: fixed;
  z-index: 999; /* 可能仍被遮挡 */
}
```

---

## 6. CSS变量

### 6.1 定义和使用

```css
/* 全局变量 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 16px;
  --spacing-unit: 8px;
}

/* 局部变量 */
.component {
  --local-padding: 20px;
  padding: var(--local-padding);
}

/* 使用变量 */
.button {
  background-color: var(--primary-color);
  font-size: var(--font-size-base);
  padding: calc(var(--spacing-unit) * 2);
}

/* 提供默认值 */
.element {
  color: var(--text-color, #333);
}
```

### 6.2 CSS变量的特性

#### 继承性
```css
:root {
  --color: blue;
}
.parent {
  --color: red;
}
.child {
  color: var(--color); /* red，从父元素继承 */
}
```

#### 作用域
```css
.component-a {
  --gap: 10px;
}
.component-b {
  gap: var(--gap); /* 无效，变量不在作用域内 */
}
```

#### 动态修改
```javascript
// JavaScript 修改 CSS 变量
document.documentElement.style.setProperty('--primary-color', '#ff0000');

// 读取 CSS 变量
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');
```

### 6.3 高级应用

#### 主题切换
```css
:root {
  --bg-color: #fff;
  --text-color: #333;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
```

```javascript
// 切换主题
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
}
```

#### 响应式设计
```css
:root {
  --container-width: 1200px;
  --font-size: 16px;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
    --font-size: 14px;
  }
}

.container {
  max-width: var(--container-width);
  font-size: var(--font-size);
}
```

#### 与 calc() 结合
```css
:root {
  --base-size: 10px;
}

.element {
  width: calc(var(--base-size) * 5);
  padding: calc(var(--base-size) / 2);
  margin: calc(var(--base-size) * 2 + 5px);
}
```

---

## 7. 伪类与伪元素

### 7.1 伪类（Pseudo-classes）

伪类用于选择元素的特定状态。

#### 用户行为伪类
```css
a:link { }       /* 未访问的链接 */
a:visited { }    /* 已访问的链接 */
a:hover { }      /* 鼠标悬停 */
a:active { }     /* 激活状态 */
input:focus { }  /* 获得焦点 */
input:focus-visible { } /* 通过键盘获得焦点 */
input:focus-within { }  /* 子元素获得焦点 */
```

#### 结构伪类
```css
/* 第一个/最后一个子元素 */
:first-child
:last-child

/* 第一个/最后一个某类型子元素 */
:first-of-type
:last-of-type

/* 唯一子元素 */
:only-child
:only-of-type

/* 第n个 */
:nth-child(n)
:nth-last-child(n)
:nth-of-type(n)
:nth-last-of-type(n)

/* 空元素 */
:empty

/* 根元素 */
:root
```

#### 表单伪类
```css
:checked        /* 选中的 radio/checkbox */
:disabled       /* 禁用的表单元素 */
:enabled        /* 启用的表单元素 */
:required       /* 必填项 */
:optional       /* 可选项 */
:valid          /* 验证通过 */
:invalid        /* 验证失败 */
:in-range       /* 值在范围内 */
:out-of-range   /* 值超出范围 */
:read-only      /* 只读 */
:read-write     /* 可编辑 */
:placeholder-shown /* 显示placeholder */
```

#### 逻辑伪类
```css
/* 否定 */
:not(selector)

/* 匹配列表中任意一个 */
:is(selector1, selector2)

/* 与:is()相同，但优先级为0 */
:where(selector1, selector2)

/* 父选择器（CSS4） */
:has(selector)
```

### 7.2 伪元素（Pseudo-elements）

伪元素用于创建不在DOM中的元素。

```css
/* CSS3 语法使用双冒号 */
::before
::after
::first-letter
::first-line
::selection
::placeholder
::marker        /* 列表标记 */
::backdrop      /* 全屏元素背景 */
```

#### ::before 和 ::after

```css
.element::before {
  content: ""; /* content 是必需的 */
  display: block;
  width: 100px;
  height: 100px;
  background: red;
}

/* 插入文本 */
.quote::before {
  content: """;
}
.quote::after {
  content: """;
}

/* 插入属性值 */
a::after {
  content: " (" attr(href) ")";
}

/* 插入图标 */
.icon::before {
  content: "\f007"; /* Font Awesome */
  font-family: "Font Awesome 5 Free";
}
```

#### ::first-letter 和 ::first-line

```css
/* 首字母样式 */
p::first-letter {
  font-size: 3em;
  font-weight: bold;
  float: left;
  margin-right: 5px;
}

/* 首行样式 */
p::first-line {
  font-weight: bold;
  color: blue;
}
```

#### ::selection

```css
/* 选中文本样式 */
::selection {
  background-color: #ff0;
  color: #000;
}
```

#### ::placeholder

```css
input::placeholder {
  color: #999;
  opacity: 1;
}
```

### 7.3 高级技巧

#### 清除浮动
```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

#### 几何图形
```css
/* 三角形 */
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}

/* 使用伪元素创建复杂形状 */
.arrow::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #000;
}
```

#### 计数器
```css
body {
  counter-reset: section;
}

h2::before {
  counter-increment: section;
  content: "Section " counter(section) ": ";
}
```

---

## 8. CSS动画与过渡

### 8.1 Transition 过渡

```css
.element {
  transition-property: all; /* 或指定属性 */
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
  
  /* 简写 */
  transition: all 0.3s ease 0s;
  
  /* 多个属性 */
  transition: 
    width 0.3s ease,
    height 0.5s ease-in-out 0.1s,
    background-color 0.2s linear;
}
```

#### 缓动函数（Timing Functions）

```css
/* 预定义 */
transition-timing-function: linear;          /* 匀速 */
transition-timing-function: ease;            /* 默认，慢-快-慢 */
transition-timing-function: ease-in;         /* 慢速开始 */
transition-timing-function: ease-out;        /* 慢速结束 */
transition-timing-function: ease-in-out;     /* 慢速开始和结束 */

/* 贝塞尔曲线 */
transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

/* 步进 */
transition-timing-function: steps(4, end);   /* 4步，end/start */
transition-timing-function: step-start;      /* 等同于 steps(1, start) */
transition-timing-function: step-end;        /* 等同于 steps(1, end) */
```

### 8.2 Animation 动画

```css
/* 定义关键帧 */
@keyframes slidein {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 使用百分比 */
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0);
  }
}

/* 应用动画 */
.element {
  animation-name: slidein;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite; /* 或具体数字 */
  animation-direction: normal; /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode: forwards; /* none, forwards, backwards, both */
  animation-play-state: running; /* running, paused */
  
  /* 简写 */
  animation: slidein 1s ease-in-out 0s infinite normal forwards;
}
```

### 8.3 动画最佳实践

#### 性能优化

```css
/* 优先使用 transform 和 opacity，它们不会触发重排 */
.good {
  animation: move 1s;
}
@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

/* 避免动画修改 layout 属性 */
.bad {
  animation: move-bad 1s;
}
@keyframes move-bad {
  from { left: 0; }        /* 触发重排 */
  to { left: 100px; }
}

/* 使用 will-change 提前通知浏览器 */
.optimized {
  will-change: transform, opacity;
}

/* 动画结束后移除 will-change */
.element {
  transition: transform 0.3s;
}
.element:hover {
  transform: scale(1.1);
}
.element:not(:hover) {
  will-change: transform;
}
```

#### 复杂动画示例

```css
/* 加载动画 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

/* 脉冲效果 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* 弹跳效果 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* 淡入淡出 */
@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
```

### 8.4 JavaScript 控制动画

```javascript
// 监听动画事件
element.addEventListener('animationstart', (e) => {
  console.log('Animation started', e.animationName);
});

element.addEventListener('animationiteration', (e) => {
  console.log('Animation iteration', e.elapsedTime);
});

element.addEventListener('animationend', (e) => {
  console.log('Animation ended', e.animationName);
});

// 暂停/恢复动画
element.style.animationPlayState = 'paused';
element.style.animationPlayState = 'running';

// Web Animations API
const animation = element.animate([
  { transform: 'translateX(0px)' },
  { transform: 'translateX(300px)' }
], {
  duration: 1000,
  iterations: Infinity,
  direction: 'alternate',
  easing: 'ease-in-out'
});

animation.pause();
animation.play();
animation.cancel();
```

---

## 9. 响应式设计

### 9.1 媒体查询（Media Queries）

```css
/* 基本语法 */
@media media-type and (media-feature) {
  /* CSS rules */
}

/* 屏幕宽度 */
@media (min-width: 768px) { }
@media (max-width: 1200px) { }
@media (min-width: 768px) and (max-width: 1200px) { }

/* 屏幕高度 */
@media (min-height: 600px) { }

/* 设备方向 */
@media (orientation: portrait) { }  /* 竖屏 */
@media (orientation: landscape) { } /* 横屏 */

/* 设备像素比 */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  /* 视网膜屏幕 */
}

/* 颜色能力 */
@media (min-color: 8) { }

/* 悬停能力 */
@media (hover: hover) { }      /* 支持悬停 */
@media (hover: none) { }       /* 不支持悬停（触摸设备） */

/* 指针精度 */
@media (pointer: fine) { }     /* 精确指针（鼠标） */
@media (pointer: coarse) { }   /* 粗略指针（触摸） */

/* 色彩模式 */
@media (prefers-color-scheme: dark) { }
@media (prefers-color-scheme: light) { }

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* 组合条件 */
@media screen and (min-width: 768px) and (orientation: landscape) { }

/* 逻辑运算符 */
@media (min-width: 768px) and (max-width: 1200px) { }  /* AND */
@media (max-width: 767px), (min-width: 1201px) { }     /* OR */
@media not screen and (color) { }                       /* NOT */
```

### 9.2 响应式断点

```css
/* Mobile First 策略 */
/* 小屏幕（手机）- 默认 */
.container {
  width: 100%;
  padding: 15px;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .container {
    width: 970px;
  }
}

/* 大屏幕 */
@media (min-width: 1280px) {
  .container {
    width: 1170px;
  }
}
```

### 9.3 响应式单位

```css
/* 相对单位 */
em   /* 相对于父元素的font-size */
rem  /* 相对于根元素的font-size */
%    /* 相对于父元素 */

/* 视口单位 */
vw   /* 1% 视口宽度 */
vh   /* 1% 视口高度 */
vmin /* vw 和 vh 中较小的值 */
vmax /* vw 和 vh 中较大的值 */

/* 容器查询单位（CSS Container Queries） */
cqw  /* 1% 容器宽度 */
cqh  /* 1% 容器高度 */
cqi  /* 1% 容器内联尺寸 */
cqb  /* 1% 容器块级尺寸 */

/* 示例 */
.responsive-text {
  font-size: clamp(1rem, 2vw + 1rem, 3rem);
  /* 最小1rem，最大3rem，理想值2vw + 1rem */
}

.full-screen {
  width: 100vw;
  height: 100vh;
}

/* 避免水平滚动条 */
.container {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
```

### 9.4 现代响应式技术

#### Clamp() 函数

```css
/* 响应式字体 */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* 最小1.5rem，最大3rem，理想值5vw */
}

/* 响应式间距 */
.container {
  padding: clamp(1rem, 5%, 3rem);
}

/* 响应式宽度 */
.element {
  width: clamp(300px, 50%, 800px);
}
```

#### 容器查询（Container Queries）

```css
/* 定义容器 */
.container {
  container-type: inline-size; /* 或 size, normal */
  container-name: sidebar;     /* 可选 */
}

/* 容器查询 */
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}

/* 命名容器查询 */
@container sidebar (min-width: 300px) {
  .widget {
    font-size: 1.2em;
  }
}
```

#### Aspect Ratio

```css
/* 固定宽高比 */
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.square {
  aspect-ratio: 1;
}

/* 兼容旧浏览器 */
.video-container {
  aspect-ratio: 16 / 9;
}
@supports not (aspect-ratio: 16 / 9) {
  .video-container::before {
    content: "";
    float: left;
    padding-top: 56.25%; /* 9/16 */
  }
  .video-container::after {
    content: "";
    display: block;
    clear: both;
  }
}
```

---

## 10. CSS性能优化

### 10.1 选择器性能

```css
/* 避免：通用选择器 */
* { }

/* 避免：过度嵌套 */
div > ul > li > a { }

/* 推荐：使用类选择器 */
.nav-link { }

/* 避免：使用标签限定类 */
div.container { }

/* 推荐：直接使用类 */
.container { }

/* 避免：子选择器链 */
.header .nav .list .item .link { }

/* 推荐：扁平化 */
.nav-link { }
```

#### 选择器性能排序（从快到慢）

1. ID选择器：`#id`
2. 类选择器：`.class`
3. 标签选择器：`div`
4. 相邻选择器：`div + p`
5. 子选择器：`div > p`
6. 后代选择器：`div p`
7. 通配符选择器：`*`
8. 属性选择器：`[type="text"]`
9. 伪类选择器：`:hover`

### 10.2 渲染性能

#### 触发重排（Reflow/Layout）的属性

```css
/* 避免频繁修改这些属性 */
width, height
margin, padding
border
position
display
float
font-size
top, left, right, bottom
```

#### 只触发重绘（Repaint）的属性

```css
/* 性能优于重排 */
color
background
background-color
background-image
background-position
background-repeat
background-size
border-color
border-style
outline
outline-color
outline-style
outline-width
visibility
box-shadow
text-decoration
```

#### 只触发合成（Composite）的属性

```css
/* 性能最优 */
transform
opacity
filter
will-change
```

### 10.3 优化技巧

#### 使用 will-change

```css
/* 提前告知浏览器将要变化的属性 */
.element {
  will-change: transform, opacity;
}

/* 动画前添加 */
.element:hover {
  will-change: transform;
}
.element:hover::after {
  transform: scale(1.2);
}

/* 注意：不要滥用 */
/* 错误：应用到太多元素 */
* {
  will-change: transform; /* 会消耗大量内存 */
}
```

#### 使用 transform 代替 position

```css
/* 避免 */
.element {
  position: relative;
  left: 100px; /* 触发重排 */
}

/* 推荐 */
.element {
  transform: translateX(100px); /* 只触发合成 */
}
```

#### 使用 contain 属性

```css
/* 限制元素影响范围 */
.component {
  contain: layout;        /* 布局隔离 */
  contain: paint;         /* 绘制隔离 */
  contain: size;          /* 尺寸隔离 */
  contain: style;         /* 样式隔离 */
  contain: strict;        /* layout + paint + size */
  contain: content;       /* layout + paint */
}
```

#### 硬件加速

```css
/* 开启GPU加速 */
.element {
  transform: translateZ(0);
  /* 或 */
  transform: translate3d(0, 0, 0);
  /* 或 */
  will-change: transform;
}
```

### 10.4 CSS加载优化

```html
<!-- 关键CSS内联 -->
<style>
  /* 首屏关键样式 */
  .header { ... }
  .hero { ... }
</style>

<!-- 异步加载非关键CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- 媒体查询优化加载 -->
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)">
<link rel="stylesheet" href="desktop.css" media="(min-width: 769px)">

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

### 10.5 CSS压缩和优化

```css
/* 开发环境 */
.button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

/* 生产环境（压缩后） */
.button{background-color:#3498db;color:#fff;padding:10px 20px;border-radius:5px}

/* 使用CSS变量减少重复 */
:root {
  --primary: #3498db;
  --border-radius: 5px;
}

.button {
  background: var(--primary);
  border-radius: var(--border-radius);
}

/* 合并选择器 */
.header, .footer { margin: 0; padding: 0; }
```

---

## 11. 现代CSS特性

### 11.1 逻辑属性（Logical Properties）

```css
/* 传统物理属性 */
.element {
  margin-left: 10px;
  margin-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

/* 现代逻辑属性（支持RTL） */
.element {
  margin-inline-start: 10px;   /* LTR中是left，RTL中是right */
  margin-inline-end: 20px;     /* LTR中是right，RTL中是left */
  padding-block-start: 5px;    /* top */
  padding-block-end: 5px;      /* bottom */
}

/* 简写 */
.element {
  margin-inline: 10px 20px;    /* start end */
  margin-block: 5px 10px;      /* start end */
  padding-inline: 15px;        /* 两侧相同 */
  padding-block: 10px;         /* 两侧相同 */
}

/* 尺寸 */
.element {
  inline-size: 300px;          /* width */
  block-size: 200px;           /* height */
  max-inline-size: 100%;       /* max-width */
  min-block-size: 50px;        /* min-height */
}

/* 边框 */
.element {
  border-inline-start: 1px solid black;
  border-block-end: 2px solid red;
}

/* 定位 */
.element {
  inset-inline-start: 0;       /* left */
  inset-inline-end: 0;         /* right */
  inset-block-start: 0;        /* top */
  inset-block-end: 0;          /* bottom */
  
  /* 简写 */
  inset: 0;                    /* 四个方向都为0 */
  inset-inline: 0;             /* 水平方向为0 */
  inset-block: 0;              /* 垂直方向为0 */
}
```

### 11.2 Subgrid

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.grid-item {
  display: grid;
  grid-template-columns: subgrid; /* 继承父网格的列定义 */
  grid-template-rows: subgrid;    /* 继承父网格的行定义 */
}
```

### 11.3 :is() 和 :where()

```css
/* 传统写法 */
h1 > a,
h2 > a,
h3 > a {
  color: blue;
}

/* 使用 :is() */
:is(h1, h2, h3) > a {
  color: blue;
}

/* :is() vs :where() */
:is(#id, .class) {
  /* 优先级为 #id 的优先级（100） */
}

:where(#id, .class) {
  /* 优先级为 0 */
}

/* 实用场景 */
:where(.reset) h1,
:where(.reset) h2,
:where(.reset) p {
  margin: 0;
}
/* 等同于 */
:where(.reset) :is(h1, h2, p) {
  margin: 0;
}
```

### 11.4 :has() 父选择器

```css
/* 包含图片的文章 */
article:has(img) {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

/* 没有子元素的空列表 */
ul:not(:has(li)) {
  display: none;
}

/* 表单验证 */
form:has(input:invalid) {
  border: 2px solid red;
}

/* 悬停子元素时改变父元素 */
.card:has(.button:hover) {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* 选择包含特定子元素的父元素 */
.container:has(> .highlight) {
  background: yellow;
}
```

### 11.5 @layer 层叠层

```css
/* 定义层 */
@layer reset, base, components, utilities;

/* 在层中添加样式 */
@layer reset {
  * {
    margin: 0;
    padding: 0;
  }
}

@layer base {
  body {
    font-family: sans-serif;
  }
}

@layer components {
  .button {
    padding: 10px 20px;
    background: blue;
  }
}

@layer utilities {
  .text-center {
    text-align: center;
  }
}

/* 层的优先级顺序：reset < base < components < utilities */
/* 但所有层的优先级都低于未分层的样式 */
```

### 11.6 color-mix() 和新颜色函数

```css
/* 混合颜色 */
.element {
  background: color-mix(in srgb, red 50%, blue);
}

/* 相对颜色语法 */
.element {
  --base-color: #3498db;
  background: hsl(from var(--base-color) h s calc(l * 1.2));
  /* 基于基础色计算更亮的颜色 */
}

/* oklch 颜色空间 */
.element {
  color: oklch(60% 0.15 30);
  /* 更符合人眼感知的颜色空间 */
}
```

### 11.7 @scope 作用域

```css
/* 限制样式作用域 */
@scope (.card) {
  img {
    border-radius: 8px;
  }
  /* 只影响 .card 内的 img */
}

/* 排除特定区域 */
@scope (.article) to (.sidebar) {
  a {
    color: blue;
  }
  /* 影响 .article 内但不在 .sidebar 内的 a */
}
```

### 11.8 Scroll-driven Animations

```css
/* 滚动时触发动画 */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fade-in linear;
  animation-timeline: scroll();
  /* 随滚动进度播放动画 */
}

/* 视图时间线 */
.element {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
  /* 元素进入视口时播放动画 */
}
```

---

## 12. 常见面试题

### 12.1 CSS基础

**Q1: 解释CSS的层叠规则？**

A: CSS层叠遵循以下优先级：
1. 来源和重要性：!important的用户代理样式 > !important的用户样式 > !important的作者样式 > 作者样式 > 用户样式 > 用户代理样式
2. 选择器优先级：内联样式(1000) > ID(100) > 类/属性/伪类(10) > 元素/伪元素(1)
3. 源码顺序：后定义的覆盖先定义的

**Q2: link和@import的区别？**

A: 
- `link` 是HTML标签，`@import` 是CSS语法
- `link` 在页面加载时同时加载，`@import` 在页面加载完成后加载
- `link` 无兼容性问题，`@import` 是CSS2.1提出的
- `link` 可以通过JS动态插入，`@import` 不能
- `link` 权重高于 `@import`

**Q3: 为什么要初始化CSS样式？**

A: 不同浏览器对标签的默认样式不同，初始化CSS可以：
- 保证在不同浏览器中的一致性
- 去除浏览器默认的margin、padding
- 统一字体、行高等基础样式
- 减少浏览器差异导致的布局问题

### 12.2 布局相关

**Q4: 实现水平垂直居中的方法？**

```css
/* 方法1: Flexbox */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 方法2: Grid */
.parent {
  display: grid;
  place-items: center;
}

/* 方法3: 绝对定位 + transform */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 方法4: 绝对定位 + margin */
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 200px;
}

/* 方法5: table-cell */
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.child {
  display: inline-block;
}
```

**Q5: 三栏布局（左右固定，中间自适应）的实现？**

```css
/* 方法1: Flexbox */
.container {
  display: flex;
}
.left, .right {
  flex: 0 0 200px;
}
.center {
  flex: 1;
}

/* 方法2: Grid */
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}

/* 方法3: 浮动 */
.left {
  float: left;
  width: 200px;
}
.right {
  float: right;
  width: 200px;
}
.center {
  margin: 0 200px;
}

/* 方法4: 绝对定位 */
.container {
  position: relative;
}
.left {
  position: absolute;
  left: 0;
  width: 200px;
}
.right {
  position: absolute;
  right: 0;
  width: 200px;
}
.center {
  margin: 0 200px;
}
```

### 12.3 定位和层叠

**Q6: position的值有哪些？区别是什么？**

A:
- `static`: 默认值，正常文档流，不受top/left等影响
- `relative`: 相对定位，相对自身原位置，保留原空间
- `absolute`: 绝对定位，脱离文档流，相对最近的非static祖先
- `fixed`: 固定定位，脱离文档流，相对视口（特殊情况相对transform等祖先）
- `sticky`: 粘性定位，relative和fixed的混合

**Q7: 什么是BFC？如何创建BFC？**

A: BFC（Block Formatting Context）块级格式化上下文，是一个独立的渲染区域。

创建BFC的方法：
- `float` 不为 `none`
- `position` 为 `absolute` 或 `fixed`
- `display` 为 `inline-block`、`flex`、`grid`、`table-cell`
- `overflow` 不为 `visible`

BFC的特性：
- 内部元素垂直排列
- 同一BFC内的相邻元素margin会重叠
- BFC区域不会与float元素重叠
- BFC是独立容器，内外元素互不影响
- 计算BFC高度时，浮动元素也参与

### 12.4 选择器和优先级

**Q8: CSS选择器优先级如何计算？**

A: 使用(a,b,c,d)表示：
- a: 内联样式，1或0
- b: ID选择器数量
- c: 类、属性、伪类选择器数量
- d: 元素、伪元素选择器数量

比较时从左到右依次比较，大的优先级高。

特殊情况：
- `!important` 优先级最高
- `*` 通配符优先级为0
- 继承的样式无优先级（最低）

**Q9: 如何避免CSS优先级问题？**

A:
- 使用BEM等命名规范
- 避免使用ID选择器
- 避免深层嵌套
- 使用CSS Modules或CSS-in-JS
- 合理使用`:where()`降低优先级
- 使用`@layer`管理层叠层

### 12.5 性能优化

**Q10: CSS性能优化有哪些方法？**

A:
1. **选择器优化**
   - 避免使用通配符
   - 减少选择器层级
   - 使用类选择器而非标签选择器

2. **渲染性能**
   - 优先使用transform和opacity
   - 使用will-change提示浏览器
   - 避免强制同步布局
   - 使用contain属性

3. **加载优化**
   - 压缩CSS文件
   - 关键CSS内联
   - 异步加载非关键CSS
   - 使用媒体查询分离样式

4. **动画优化**
   - 只动画transform和opacity
   - 使用requestAnimationFrame
   - 避免同时动画多个属性

**Q11: 什么属性会触发重排（reflow）？**

A: 几何属性变化会触发重排：
- 尺寸：width、height、padding、margin、border
- 位置：position、top、left、right、bottom
- 布局：display、float、clear、overflow
- 字体：font-size、font-family、font-weight
- 文本：line-height、text-align、vertical-align

优化建议：
- 批量修改样式（使用class）
- 离线DOM修改（documentFragment）
- 使用transform代替position
- 避免逐项读取offsetHeight等属性

### 12.6 响应式和适配

**Q12: 移动端适配方案有哪些？**

A:
1. **viewport + rem**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
```javascript
// 动态设置html的font-size
function setRem() {
  const baseSize = 100;
  const scale = document.documentElement.clientWidth / 375;
  document.documentElement.style.fontSize = baseSize * scale + 'px';
}
```

2. **vw/vh**
```css
.element {
  width: 50vw; /* 50%视口宽度 */
  font-size: calc(16px + 2vw);
}
```

3. **媒体查询**
```css
@media (max-width: 768px) {
  .container { width: 100%; }
}
```

4. **flexbox/grid 响应式布局**

**Q13: 1px问题如何解决？**

A: 在高分辨率屏幕上，1px实际显示比较粗。

解决方案：
```css
/* 方案1: transform缩放 */
.border-1px {
  position: relative;
}
.border-1px::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
  transform: scaleY(0.5);
}

/* 方案2: 媒体查询 + transform */
@media (-webkit-min-device-pixel-ratio: 2) {
  .border-1px::after {
    transform: scaleY(0.5);
  }
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .border-1px::after {
    transform: scaleY(0.333);
  }
}

/* 方案3: box-shadow */
.border-1px {
  box-shadow: 0 0.5px 0 0 #000;
}

/* 方案4: SVG */
.border-1px {
  background: url("data:image/svg+xml...");
  background-size: 100% 1px;
}
```

### 12.7 CSS预处理器

**Q14: CSS预处理器的优缺点？**

A: 

优点：
- 变量管理
- 嵌套规则
- 混合（Mixins）
- 函数和运算
- 模块化
- 代码复用

缺点：
- 需要编译步骤
- 学习成本
- 调试困难（需要source map）
- 可能生成冗余代码

Sass示例：
```scss
$primary-color: #3498db;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;
  background: $primary-color;
  
  .item {
    margin: 10px;
    
    &:hover {
      opacity: 0.8;
    }
  }
}
```

### 12.8 现代CSS

**Q15: CSS变量和预处理器变量的区别？**

A:
- **CSS变量**（自定义属性）
  - 运行时
  - 可以用JS动态修改
  - 支持继承和作用域
  - 可以在媒体查询中改变
  - 浏览器原生支持

- **预处理器变量**（如Sass）
  - 编译时
  - 编译后无法修改
  - 无继承概念
  - 编译前就确定值
  - 需要编译工具

```css
/* CSS变量 */
:root {
  --color: blue;
}
.element {
  color: var(--color);
}

/* JavaScript修改 */
document.documentElement.style.setProperty('--color', 'red');
```

**Q16: 如何实现暗黑模式？**

```css
/* 使用CSS变量 */
:root {
  --bg-color: #fff;
  --text-color: #333;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
}

body {
  background: var(--bg-color);
  color: var(--text-color);
  transition: background 0.3s, color 0.3s;
}

/* 系统偏好 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
  }
}
```

```javascript
// JavaScript切换
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// 初始化
const savedTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
```

---

## 总结

CSS层叠样式表是前端开发的核心技能，掌握以下要点可以应对大厂面试：

1. **深入理解层叠和继承机制**
2. **熟练掌握各种布局方案**（Flexbox、Grid、定位）
3. **理解层叠上下文和z-index**
4. **掌握响应式设计和移动端适配**
5. **关注CSS性能优化**
6. **了解现代CSS特性**
7. **能够解决实际开发中的问题**

持续学习，关注CSS新特性，多实践，多思考。

---

**参考资源：**
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/)

**最后更新：** 2025年11月

