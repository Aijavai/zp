# CSS 盒模型大厂面试知识点总结

## 目录
1. [盒模型基础](#盒模型基础)
2. [标准盒模型 vs IE盒模型](#标准盒模型-vs-ie盒模型)
3. [box-sizing 属性](#box-sizing-属性)
4. [margin 深度解析](#margin-深度解析)
5. [padding 深度解析](#padding-深度解析)
6. [border 深度解析](#border-深度解析)
7. [外边距合并/塌陷](#外边距合并塌陷)
8. [BFC (块级格式化上下文)](#bfc-块级格式化上下文)
9. [常见面试题](#常见面试题)
10. [实战案例](#实战案例)

---

## 盒模型基础

### 什么是盒模型？

CSS 盒模型（Box Model）是 CSS 布局的基础，它描述了元素在页面中占据空间的方式。每个元素都被视为一个矩形盒子，包含以下四个部分：

```
┌─────────────────────────────────────┐
│           margin (外边距)            │
│  ┌───────────────────────────────┐  │
│  │     border (边框)              │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   padding (内边距)       │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │  content (内容)    │  │  │  │
│  │  │  │   width × height  │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 四个组成部分

1. **Content (内容区域)**
   - 包含元素的实际内容（文本、图片等）
   - 由 `width` 和 `height` 属性控制

2. **Padding (内边距)**
   - 内容区域与边框之间的空间
   - 背景颜色会延伸到 padding 区域
   - 不能为负值

3. **Border (边框)**
   - 围绕在 padding 外的边框
   - 可设置宽度、样式、颜色

4. **Margin (外边距)**
   - 元素与其他元素之间的距离
   - 透明的，不显示背景
   - 可以为负值

---

## 标准盒模型 vs IE盒模型

### 1. 标准盒模型 (W3C 盒模型)

**特点**: `width` 和 `height` 只包含 content 区域

```css
box-sizing: content-box; /* 默认值 */
```

**计算公式**:
```
元素总宽度 = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
元素总高度 = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom

实际占据的宽度(不含margin) = width + padding + border
```

**示例**:
```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
}
```
- 内容宽度: 200px
- 盒子总宽度(不含margin): 200 + 20×2 + 5×2 = 250px
- 占据空间: 250 + 10×2 = 270px

### 2. IE盒模型 (怪异盒模型)

**特点**: `width` 和 `height` 包含 content + padding + border

```css
box-sizing: border-box;
```

**计算公式**:
```
元素总宽度 = width + margin-left + margin-right
元素总高度 = height + margin-top + margin-bottom

内容实际宽度 = width - padding-left - padding-right - border-left - border-right
```

**示例**:
```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
}
```
- 盒子总宽度(不含margin): 200px
- 内容宽度: 200 - 20×2 - 5×2 = 150px
- 占据空间: 200 + 10×2 = 220px

### 对比图示

```
标准盒模型 (content-box):
┌──────────────────────────────┐
│ margin: 10px                 │
│ ┌──────────────────────────┐ │
│ │ border: 5px              │ │
│ │ ┌──────────────────────┐ │ │
│ │ │ padding: 20px        │ │ │
│ │ │ ┌──────────────────┐ │ │ │
│ │ │ │ width: 200px     │ │ │ │  总宽度: 270px
│ │ │ │ (content)        │ │ │ │
│ │ │ └──────────────────┘ │ │ │
│ │ └──────────────────────┘ │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘

IE盒模型 (border-box):
┌────────────────────┐
│ margin: 10px       │
│ ┌────────────────┐ │
│ │ width: 200px   │ │  (包含border+padding+content)
│ │ ┌────────────┐ │ │  总宽度: 220px
│ │ │ content    │ │ │  内容宽度: 150px
│ │ │ 150px      │ │ │
│ │ └────────────┘ │ │
│ └────────────────┘ │
└────────────────────┘
```

---

## box-sizing 属性

### 三个可选值

```css
/* 1. 标准盒模型 (默认) */
box-sizing: content-box;

/* 2. IE盒模型 (最常用) */
box-sizing: border-box;

/* 3. 继承父元素 */
box-sizing: inherit;
```

### 最佳实践

在实际开发中，推荐使用全局重置：

```css
/* 方案1: 直接设置所有元素 */
* {
  box-sizing: border-box;
}

/* 方案2: 继承方式 (推荐) */
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

### 为什么推荐 border-box？

1. **更符合直觉**: 设置 width: 200px，盒子就是 200px
2. **布局更简单**: 不用担心 padding 和 border 撑大盒子
3. **响应式友好**: 百分比宽度更容易计算
4. **避免计算错误**: 不需要手动计算总宽度

**示例对比**:
```css
/* 标准盒模型 - 会超出容器 */
.container { width: 1000px; }
.col { 
  width: 50%;        /* 500px */
  padding: 20px;     /* 盒子实际宽度 540px，会换行！ */
  border: 10px solid;
}

/* border-box - 完美适配 */
.container { width: 1000px; }
.col { 
  box-sizing: border-box;
  width: 50%;        /* 盒子总宽度 500px */
  padding: 20px;     /* 内容宽度自动调整为 440px */
  border: 10px solid;
}
```

---

## margin 深度解析

### 1. 基本语法

```css
/* 四个值: 上 右 下 左 (顺时针) */
margin: 10px 20px 30px 40px;

/* 三个值: 上 左右 下 */
margin: 10px 20px 30px;

/* 两个值: 上下 左右 */
margin: 10px 20px;

/* 一个值: 四个方向 */
margin: 10px;

/* 单独设置 */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 30px;
margin-left: 40px;

/* 水平居中 */
margin: 0 auto;

/* 可以为负值 */
margin-left: -10px;
```

### 2. margin 的特性

#### (1) 可以为负值

```css
.box {
  margin-left: -20px;  /* 向左移动 20px */
  margin-top: -10px;   /* 向上移动 10px */
}
```

用途：
- 元素重叠效果
- 负边距布局
- 修正定位偏差

#### (2) margin: auto 水平居中

```css
/* 块级元素水平居中 */
.center {
  width: 200px;
  margin: 0 auto;
}

/* 为什么 margin: auto 不能垂直居中？*/
/* 原因: 块级元素的高度由内容决定，垂直方向没有剩余空间可分配 */

/* 垂直居中的替代方案 */
/* 方案1: flex */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 方案2: grid */
.parent {
  display: grid;
  place-items: center;
}

/* 方案3: 绝对定位 + margin auto */
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 100px;
}
```

#### (3) 百分比基于父元素宽度

```css
.parent {
  width: 1000px;
}
.child {
  margin-top: 10%;    /* 100px (基于父元素宽度！) */
  margin-left: 10%;   /* 100px */
}
```

**注意**: 所有方向的百分比 margin 都基于父元素的**宽度**，包括 margin-top 和 margin-bottom！

#### (4) 内联元素的 margin

```css
span {
  margin-top: 10px;     /* 无效 */
  margin-bottom: 10px;  /* 无效 */
  margin-left: 10px;    /* 有效 */
  margin-right: 10px;   /* 有效 */
}
```

内联元素的 **垂直 margin 无效**，水平 margin 有效。

---

## padding 深度解析

### 1. 基本语法

```css
/* 语法与 margin 相同 */
padding: 10px 20px 30px 40px;  /* 上 右 下 左 */
padding: 10px 20px 30px;       /* 上 左右 下 */
padding: 10px 20px;            /* 上下 左右 */
padding: 10px;                 /* 四个方向 */

/* 单独设置 */
padding-top: 10px;
padding-right: 20px;
padding-bottom: 30px;
padding-left: 40px;
```

### 2. padding 的特性

#### (1) 不能为负值

```css
padding: -10px;  /* 无效！会被忽略 */
```

#### (2) 背景延伸到 padding

```css
.box {
  background-color: lightblue;
  padding: 20px;  /* 背景色会覆盖 padding 区域 */
}
```

#### (3) 百分比基于父元素宽度

```css
.parent {
  width: 1000px;
  height: 500px;
}
.child {
  padding-top: 10%;    /* 100px (基于父元素宽度！) */
  padding-left: 10%;   /* 100px */
}
```

**重要**: 与 margin 相同，所有方向的百分比 padding 都基于父元素的**宽度**。

#### (4) 常用技巧: 百分比 padding 实现固定宽高比

```css
/* 16:9 比例的响应式容器 */
.aspect-ratio-16-9 {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;  /* 9/16 = 0.5625 */
  position: relative;
}

.aspect-ratio-16-9 > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

#### (5) 内联元素的 padding

```css
span {
  padding: 10px;  /* 水平和垂直都有效，但垂直不占据空间流 */
}
```

内联元素的 padding **四个方向都有效**，但垂直 padding 不会影响行高和布局流。

---

## border 深度解析

### 1. 基本语法

```css
/* 简写 */
border: 1px solid #000;

/* 完整写法 */
border-width: 1px;
border-style: solid;
border-color: #000;

/* 单边设置 */
border-top: 2px dashed red;
border-right: 3px dotted blue;
border-bottom: 4px double green;
border-left: 5px groove orange;

/* 更细粒度控制 */
border-top-width: 2px;
border-top-style: solid;
border-top-color: red;
```

### 2. border-style 的值

```css
border-style: none;      /* 无边框 (默认) */
border-style: solid;     /* 实线 */
border-style: dashed;    /* 虚线 */
border-style: dotted;    /* 点线 */
border-style: double;    /* 双线 */
border-style: groove;    /* 3D凹槽 */
border-style: ridge;     /* 3D脊线 */
border-style: inset;     /* 3D内嵌 */
border-style: outset;    /* 3D外凸 */
```

### 3. border 的特性

#### (1) border 占据空间

```css
.box {
  width: 200px;
  border: 10px solid #000;
  /* 实际宽度: 220px (content-box) 或 200px (border-box) */
}
```

#### (2) border 不能为百分比

```css
border-width: 10%;  /* 无效！ */
border-width: 10px; /* 只能用绝对单位 */
```

#### (3) border 三角形技巧

```css
/* 向下的三角形 */
.triangle-down {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 50px solid red;
}

/* 向右的三角形 */
.triangle-right {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 50px solid blue;
}
```

#### (4) border-radius 圆角

```css
/* 四个角相同 */
border-radius: 10px;

/* 分别设置: 左上 右上 右下 左下 */
border-radius: 10px 20px 30px 40px;

/* 椭圆圆角 */
border-radius: 50px / 25px;  /* 水平半径 / 垂直半径 */

/* 圆形 */
border-radius: 50%;

/* 单角设置 */
border-top-left-radius: 10px;
border-top-right-radius: 20px;
border-bottom-right-radius: 30px;
border-bottom-left-radius: 40px;
```

---

## 外边距合并/塌陷

### 什么是外边距合并？

**外边距合并 (Margin Collapse)** 是指当两个垂直外边距相遇时，它们会合并成一个外边距，其大小为两者中的较大值。

**注意**: 只有**垂直方向**的 margin 会合并，水平方向不会！

### 三种合并场景

#### 1. 相邻兄弟元素

```html
<div class="box1"></div>
<div class="box2"></div>
```

```css
.box1 {
  margin-bottom: 30px;
}
.box2 {
  margin-top: 20px;
}
/* 实际间距: 30px (不是 50px) */
```

**规则**: 取较大值

#### 2. 父子元素 (首尾子元素)

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  margin-top: 20px;
  background: lightblue;
}
.child {
  margin-top: 30px;
  background: pink;
}
/* 父元素实际 margin-top: 30px */
/* 子元素的 margin-top 与父元素合并 */
```

**现象**: 子元素的 margin-top 会"溢出"到父元素外面

#### 3. 空元素自身

```html
<div class="empty"></div>
```

```css
.empty {
  margin-top: 20px;
  margin-bottom: 30px;
  /* 实际上下 margin: 30px (合并了) */
}
```

### 如何阻止 margin 合并？

#### 方法1: 创建 BFC (最推荐)

```css
/* 父元素创建 BFC */
.parent {
  overflow: hidden;  /* 或 auto */
}

/* 或 */
.parent {
  display: flow-root;  /* 最新的 BFC 触发方式 */
}
```

#### 方法2: 添加 border 或 padding

```css
.parent {
  border-top: 1px solid transparent;
  /* 或 */
  padding-top: 1px;
}
```

#### 方法3: 浮动或绝对定位

```css
.parent {
  float: left;
  /* 或 */
  position: absolute;
}
```

#### 方法4: 使用 inline-block

```css
.parent {
  display: inline-block;
}
```

#### 方法5: flex 或 grid 布局

```css
.parent {
  display: flex;  /* flex 容器内的项目不会 margin 合并 */
  /* 或 */
  display: grid;
}
```

---

## BFC (块级格式化上下文)

### 什么是 BFC？

**BFC (Block Formatting Context)** 是 CSS 布局中的一个独立渲染区域，拥有一套渲染规则，决定了其子元素如何定位，以及与其他元素的关系。

### BFC 的特性

1. **内部盒子垂直排列**
2. **垂直方向的距离由 margin 决定，同一 BFC 内相邻元素 margin 会合并**
3. **BFC 区域不会与浮动元素重叠**
4. **BFC 是独立容器，内外元素互不影响**
5. **计算 BFC 高度时，浮动元素也参与计算**

### 如何创建 BFC？

```css
/* 1. 根元素 (html) */

/* 2. float 不为 none */
float: left;
float: right;

/* 3. position 为 absolute 或 fixed */
position: absolute;
position: fixed;

/* 4. display 为以下值 */
display: inline-block;
display: table-cell;
display: table-caption;
display: flex;
display: inline-flex;
display: grid;
display: inline-grid;
display: flow-root;  /* 专门用于创建 BFC */

/* 5. overflow 不为 visible */
overflow: hidden;
overflow: auto;
overflow: scroll;

/* 6. contain 属性 */
contain: layout;
contain: content;
contain: paint;
```

### BFC 的应用场景

#### 1. 清除浮动

```html
<div class="parent">
  <div class="float-child"></div>
</div>
```

```css
.parent {
  overflow: hidden;  /* 创建 BFC，包含浮动子元素 */
}
.float-child {
  float: left;
}
```

#### 2. 防止 margin 合并

```html
<div class="box1"></div>
<div class="bfc-wrapper">
  <div class="box2"></div>
</div>
```

```css
.bfc-wrapper {
  overflow: hidden;  /* 创建 BFC */
}
.box1 {
  margin-bottom: 20px;
}
.box2 {
  margin-top: 30px;
  /* 现在间距是 50px，不会合并 */
}
```

#### 3. 自适应两栏布局

```html
<div class="container">
  <div class="sidebar"></div>
  <div class="main"></div>
</div>
```

```css
.sidebar {
  float: left;
  width: 200px;
}
.main {
  overflow: hidden;  /* 创建 BFC，不会被浮动元素覆盖 */
}
```

#### 4. 防止父子元素 margin 塌陷

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  overflow: hidden;  /* 创建 BFC */
  background: lightblue;
}
.child {
  margin-top: 20px;  /* 不会溢出父元素 */
}
```

---

## 常见面试题

### 1. 标准盒模型和 IE 盒模型有什么区别？

**答案**:

**标准盒模型 (content-box)**:
- `width/height` 只包含 content
- 总宽度 = width + padding + border + margin

**IE盒模型 (border-box)**:
- `width/height` 包含 content + padding + border
- 总宽度 = width + margin

**示例**:
```css
.box {
  width: 200px;
  padding: 20px;
  border: 10px solid #000;
}

/* content-box: 盒子总宽 = 200 + 40 + 20 = 260px */
/* border-box: 盒子总宽 = 200px, 内容宽 = 140px */
```

**推荐**: 实际开发中使用 `box-sizing: border-box` 更符合直觉。

---

### 2. 如何让一个元素水平垂直居中？

**答案**:

```css
/* 方法1: Flexbox (推荐) */
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

/* 方法4: 绝对定位 + margin auto (需要固定宽高) */
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 100px;
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

---

### 3. 什么是外边距合并？如何避免？

**答案**:

**外边距合并**: 两个垂直方向的 margin 相遇时会合并成一个，取较大值。

**三种情况**:
1. 相邻兄弟元素
2. 父子元素 (首尾子元素)
3. 空元素自身

**避免方法**:
```css
/* 1. 创建 BFC (推荐) */
.parent {
  overflow: hidden;
  /* 或 display: flow-root; */
}

/* 2. 添加 border 或 padding */
.parent {
  border-top: 1px solid transparent;
  /* 或 padding-top: 1px; */
}

/* 3. 使用 flex/grid */
.parent {
  display: flex;
  flex-direction: column;
}
```

---

### 4. 什么是 BFC？如何触发？有什么应用？

**答案**:

**BFC (Block Formatting Context)** = 块级格式化上下文，是一个独立的渲染区域。

**触发条件**:
```css
float: left/right;
position: absolute/fixed;
display: inline-block/flex/grid/flow-root;
overflow: hidden/auto/scroll;
```

**应用场景**:
1. **清除浮动**: 让父元素包含浮动子元素
2. **防止 margin 合并**: 隔离两个元素的 margin
3. **自适应布局**: BFC 不会与浮动元素重叠
4. **防止文字环绕**: 创建独立的布局区域

---

### 5. margin: auto 为什么不能垂直居中？

**答案**:

**原因**: 块级元素在普通流中，垂直方向的高度由内容决定，没有"剩余空间"可分配。

**水平可以居中的原理**:
- 块级元素宽度默认填充父元素
- 设置固定 width 后，剩余空间 = 父元素宽度 - 子元素宽度
- `margin: auto` 将剩余空间平分给左右 margin

**垂直居中的替代方案**:
```css
/* 方案1: flex */
.parent {
  display: flex;
  align-items: center;
}

/* 方案2: 绝对定位 */
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 100px;  /* 必须设置高度 */
}
```

---

### 6. padding 和 margin 的百分比是相对于谁？

**答案**:

**都相对于父元素的宽度！**

```css
.parent {
  width: 1000px;
  height: 500px;
}
.child {
  margin-top: 10%;     /* 100px (基于父元素宽度) */
  margin-left: 10%;    /* 100px */
  padding-top: 10%;    /* 100px (基于父元素宽度) */
  padding-left: 10%;   /* 100px */
}
```

**应用**: 利用这个特性可以实现固定宽高比:
```css
/* 16:9 比例容器 */
.aspect-ratio {
  width: 100%;
  padding-bottom: 56.25%;  /* 9/16 = 0.5625 */
}
```

---

### 7. 行内元素设置 margin 和 padding 有效吗？

**答案**:

**margin**:
- 水平方向 (left/right): ✅ 有效
- 垂直方向 (top/bottom): ❌ 无效

**padding**:
- 水平方向 (left/right): ✅ 有效
- 垂直方向 (top/bottom): ✅ 有效，但不影响行高

```html
<span class="inline">文本</span>
```

```css
.inline {
  margin: 10px 20px;    /* 只有左右有效 */
  padding: 10px 20px;   /* 四个方向都显示，但上下不占据布局空间 */
}

/* 如果需要垂直方向生效 */
.inline {
  display: inline-block;  /* 转为行内块元素 */
}
```

---

### 8. 如何实现一个三角形？

**答案**:

利用 border 的特性，当元素宽高为 0 时，border 会形成三角形。

```css
/* 向下的三角形 */
.triangle-down {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 50px solid red;
}

/* 向上的三角形 */
.triangle-up {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid blue;
}

/* 向右的三角形 */
.triangle-right {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 50px solid green;
}

/* 向左的三角形 */
.triangle-left {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-right: 50px solid orange;
}
```

---

### 9. 负 margin 的作用和应用场景？

**答案**:

**作用**:
- 向指定方向移动元素
- 可以让元素重叠
- 可以拉伸元素

**应用场景**:

```css
/* 1. 元素重叠 */
.overlap {
  margin-left: -20px;  /* 向左移动，与前一个元素重叠 */
}

/* 2. 去除列表间距 */
.row {
  margin-left: -15px;
  margin-right: -15px;
}
.col {
  padding-left: 15px;
  padding-right: 15px;
}

/* 3. 等高列布局 */
.col {
  padding-bottom: 9999px;
  margin-bottom: -9999px;
}
.row {
  overflow: hidden;
}

/* 4. 负 margin 实现居中 */
.center {
  position: relative;
  left: 50%;
  margin-left: -100px;  /* 宽度的一半 */
  width: 200px;
}
```

---

### 10. box-sizing 的最佳实践是什么？

**答案**:

**推荐全局设置 border-box**:

```css
/* 方案1: 直接设置 (简单) */
* {
  box-sizing: border-box;
}

/* 方案2: 继承方式 (灵活，推荐) */
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

**为什么推荐方案2？**
- 允许局部覆盖
- 组件内部可以切换盒模型
- 更符合 CSS 继承原则

**示例**:
```css
/* 全局是 border-box */
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}

/* 某个组件需要 content-box */
.special-component {
  box-sizing: content-box;
}
.special-component * {
  /* 子元素自动继承 content-box */
}
```

---

### 11. 清除浮动有哪些方法？

**答案**:

```css
/* 方法1: BFC (overflow) - 最常用 */
.parent {
  overflow: hidden;  /* 或 auto */
}

/* 方法2: 伪元素清除浮动 (最推荐) */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
/* 兼容性更好的写法 */
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}

/* 方法3: 添加空元素 (不推荐) */
<div style="clear: both;"></div>

/* 方法4: 父元素也浮动 (不推荐) */
.parent {
  float: left;
}

/* 方法5: display: flow-root (现代方案) */
.parent {
  display: flow-root;
}
```

**对比**:
- `overflow: hidden` - 简单但可能隐藏内容
- `clearfix` - 兼容性好，无副作用，最推荐
- `display: flow-root` - 专门用于清除浮动，现代浏览器推荐

---

### 12. 如何实现两栏布局（左侧固定，右侧自适应）？

**答案**:

```css
/* 方法1: float + BFC */
.left {
  float: left;
  width: 200px;
}
.right {
  overflow: hidden;  /* 创建 BFC */
}

/* 方法2: float + margin */
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 200px;
}

/* 方法3: flex (推荐) */
.container {
  display: flex;
}
.left {
  width: 200px;
  flex-shrink: 0;  /* 不缩小 */
}
.right {
  flex: 1;  /* 占据剩余空间 */
}

/* 方法4: grid */
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* 方法5: 绝对定位 */
.container {
  position: relative;
}
.left {
  position: absolute;
  width: 200px;
}
.right {
  margin-left: 200px;
}

/* 方法6: calc */
.left {
  float: left;
  width: 200px;
}
.right {
  float: left;
  width: calc(100% - 200px);
}
```

---

### 13. 如何实现固定宽高比的容器？

**答案**:

利用 **padding-top/bottom 百分比基于父元素宽度** 的特性：

```css
/* 16:9 比例 */
.aspect-ratio-16-9 {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;  /* 9/16 = 0.5625 */
  position: relative;
  background: lightblue;
}

/* 内容绝对定位 */
.aspect-ratio-16-9 > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 其他比例 */
.aspect-ratio-1-1 { padding-bottom: 100%; }   /* 正方形 */
.aspect-ratio-4-3 { padding-bottom: 75%; }    /* 4:3 */
.aspect-ratio-21-9 { padding-bottom: 42.86%; } /* 21:9 */

/* 现代方案: aspect-ratio (Chrome 88+) */
.modern {
  aspect-ratio: 16 / 9;
}
```

---

### 14. 一个元素宽度 100%，还能设置 padding 吗？

**答案**:

**取决于 box-sizing**:

```css
/* content-box (默认) - 会超出 */
.box {
  width: 100%;
  padding: 20px;
  /* 总宽度 = 100% + 40px，会超出父元素！ */
}

/* border-box - 不会超出 (推荐) */
.box {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  /* 总宽度 = 100%，内容宽度 = 100% - 40px */
}

/* 或者用 calc */
.box {
  width: calc(100% - 40px);
  padding: 20px;
}
```

---

### 15. outline 和 border 的区别？

**答案**:

| 特性 | border | outline |
|------|--------|---------|
| **占据空间** | ✅ 占据 | ❌ 不占据 |
| **影响布局** | ✅ 影响 | ❌ 不影响 |
| **包含在盒模型中** | ✅ 是 | ❌ 否 |
| **单边设置** | ✅ 可以 | ❌ 不可以 |
| **圆角** | ✅ border-radius | ❌ 不支持 (新版浏览器支持) |
| **常见用途** | 装饰、边框 | 焦点提示、调试 |

```css
/* border - 占据空间 */
.box {
  width: 200px;
  border: 10px solid red;
  /* 盒子总宽 220px (content-box) */
}

/* outline - 不占据空间 */
.box {
  width: 200px;
  outline: 10px solid blue;
  /* 盒子总宽仍是 200px */
}

/* 调试技巧 */
* {
  outline: 1px solid red;  /* 不影响布局的调试方式 */
}

/* 去除焦点 outline (不推荐，影响无障碍) */
button:focus {
  outline: none;  /* 不要这样做！ */
}

/* 更好的做法 */
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

---

## 实战案例

### 案例1: 完美的卡片组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Component</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .card {
      width: 100%;
      max-width: 400px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
    }

    .card-image {
      width: 100%;
      height: 0;
      padding-bottom: 56.25%; /* 16:9 */
      background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
      position: relative;
    }

    .card-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-content {
      padding: 24px;
    }

    .card-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }

    .card-description {
      font-size: 14px;
      line-height: 1.6;
      color: #666;
      margin-bottom: 20px;
    }

    .card-footer {
      display: flex;
      gap: 12px;
    }

    .btn {
      flex: 1;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: white;
      color: #667eea;
      border: 2px solid #667eea;
    }

    .btn-secondary:hover {
      background: #667eea;
      color: white;
    }

    /* 演示不同盒模型 */
    .demo-container {
      display: flex;
      gap: 20px;
      margin-top: 40px;
      flex-wrap: wrap;
    }

    .demo-box {
      width: 200px;
      height: 100px;
      padding: 20px;
      border: 10px solid #667eea;
      background: #f0f0f0;
      background-clip: content-box;
    }

    .content-box {
      box-sizing: content-box;
      /* 总宽: 200 + 40 + 20 = 260px */
    }

    .border-box {
      box-sizing: border-box;
      /* 总宽: 200px */
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-image">
      <!-- 可以放图片 -->
      <!-- <img src="image.jpg" alt="Card Image"> -->
    </div>
    <div class="card-content">
      <h2 class="card-title">CSS 盒模型</h2>
      <p class="card-description">
        掌握盒模型是前端开发的基础。box-sizing: border-box 让布局更简单，
        padding 和 border 不会撑大盒子。
      </p>
      <div class="card-footer">
        <button class="btn btn-primary">学习更多</button>
        <button class="btn btn-secondary">示例代码</button>
      </div>
    </div>
  </div>
</body>
</html>
```

### 案例2: 圣杯布局 (三栏布局)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>圣杯布局</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header, footer {
      background: #333;
      color: white;
      padding: 20px;
      text-align: center;
    }

    .container {
      flex: 1;
      display: flex;
      padding: 20px;
      gap: 20px;
    }

    .sidebar {
      width: 200px;
      background: #f0f0f0;
      padding: 20px;
      flex-shrink: 0;
    }

    .main {
      flex: 1;
      background: white;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .aside {
      width: 250px;
      background: #f0f0f0;
      padding: 20px;
      flex-shrink: 0;
    }

    /* 响应式 */
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
      }
      
      .sidebar,
      .main,
      .aside {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>圣杯布局示例</h1>
  </header>

  <div class="container">
    <aside class="sidebar">
      <h3>左侧栏</h3>
      <p>固定宽度 200px</p>
    </aside>

    <main class="main">
      <h2>主内容区</h2>
      <p>自适应宽度，flex: 1</p>
      <p>使用 box-sizing: border-box，padding 不会撑大盒子。</p>
    </main>

    <aside class="aside">
      <h3>右侧栏</h3>
      <p>固定宽度 250px</p>
    </aside>
  </div>

  <footer>
    <p>&copy; 2025 CSS 盒模型教程</p>
  </footer>
</body>
</html>
```

### 案例3: margin 合并演示

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Margin 合并演示</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      padding: 40px;
      font-family: Arial, sans-serif;
    }

    .section {
      margin-bottom: 60px;
    }

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .example {
      border: 2px dashed #ccc;
      padding: 10px;
      margin-bottom: 30px;
    }

    /* 场景1: 相邻兄弟元素 */
    .box1 {
      background: lightblue;
      padding: 20px;
      margin-bottom: 30px;
    }

    .box2 {
      background: lightcoral;
      padding: 20px;
      margin-top: 20px;
    }

    /* 场景2: 父子元素 - 会塌陷 */
    .parent-collapse {
      background: lightgreen;
      margin-top: 20px;
    }

    .child-collapse {
      background: lightyellow;
      padding: 20px;
      margin-top: 30px;
    }

    /* 场景3: 父子元素 - 不塌陷 (BFC) */
    .parent-no-collapse {
      background: lightgreen;
      margin-top: 20px;
      overflow: hidden; /* 创建 BFC */
    }

    .child-no-collapse {
      background: lightyellow;
      padding: 20px;
      margin-top: 30px;
    }

    .note {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 12px;
      margin-top: 10px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>Margin 合并/塌陷演示</h1>

  <!-- 场景1 -->
  <div class="section">
    <h2>场景1: 相邻兄弟元素</h2>
    <div class="example">
      <div class="box1">
        Box 1 - margin-bottom: 30px
      </div>
      <div class="box2">
        Box 2 - margin-top: 20px
      </div>
    </div>
    <div class="note">
      实际间距是 30px (取较大值)，而不是 50px
    </div>
  </div>

  <!-- 场景2 -->
  <div class="section">
    <h2>场景2: 父子元素 - 会塌陷</h2>
    <div class="example">
      <div class="parent-collapse">
        Parent - margin-top: 20px
        <div class="child-collapse">
          Child - margin-top: 30px
        </div>
      </div>
    </div>
    <div class="note">
      子元素的 margin-top 会"溢出"到父元素外面
    </div>
  </div>

  <!-- 场景3 -->
  <div class="section">
    <h2>场景3: 父子元素 - 不塌陷 (overflow: hidden)</h2>
    <div class="example">
      <div class="parent-no-collapse">
        Parent - overflow: hidden (创建 BFC)
        <div class="child-no-collapse">
          Child - margin-top: 30px
        </div>
      </div>
    </div>
    <div class="note">
      使用 overflow: hidden 创建 BFC，阻止 margin 塌陷
    </div>
  </div>
</body>
</html>
```

---

## 总结

### 核心要点

1. **盒模型 = content + padding + border + margin**
2. **box-sizing: border-box** 是实际开发的最佳实践
3. **margin 可以为负值**，padding 不可以
4. **百分比 margin/padding 都基于父元素宽度**
5. **只有垂直方向的 margin 会合并**
6. **BFC 可以解决浮动、margin 塌陷等问题**
7. **内联元素的垂直 margin 无效**，但垂直 padding 有效(不占据空间)

### 面试高频考点

✅ 标准盒模型 vs IE盒模型  
✅ box-sizing 属性  
✅ margin 合并/塌陷  
✅ BFC 触发条件和应用  
✅ 水平垂直居中  
✅ 清除浮动  
✅ 两栏/三栏布局  
✅ 负 margin 应用  
✅ 百分比相对于谁  
✅ border 实现三角形  

### 推荐学习路径

1. 理解盒模型四个组成部分
2. 掌握两种盒模型的区别
3. 学会使用 box-sizing: border-box
4. 深入理解 margin 合并
5. 掌握 BFC 的概念和应用
6. 实战练习各种布局

---

## 参考资料

- [MDN - CSS Box Model](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)
- [MDN - box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
- [MDN - BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
- [CSS Tricks - Box Sizing](https://css-tricks.com/box-sizing/)

---

**持续更新中...** 如有问题或建议，欢迎提出！

