# 盒子模型 box-sizing

- 盒子在页面（文档流）的占位
- margin 
- border
- padding
- content

- positon
## 标准盒模型 VS　IE盒模型
box-sizing: content-box
box-sizing: border-box


## 考点
- 块级元素水平居中 margin: 0 auto 
 /* 为什么 margin: auto 不能垂直居中？*/
 /* 原因: 块级元素的高度由内容决定，垂直方向没有剩余空间可分配 */

 行内元素 垂直margin 无效
 行内元素 padding 四个方向都有效，但垂直padding 不会影响行高和布局流。

 margin 可以为负 padding 不能为负值


 ## 外边距合并/塌陷

 - 只有垂直方向的margin 会合并，水平方向不会。


## bfc

- BFC 是css  布局中一个独立渲染区域，拥有一套渲染规则，决定了其子元素如何定位，以及与其他元素的关系。