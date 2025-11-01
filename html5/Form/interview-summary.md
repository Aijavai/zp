# HTML 表单大厂面试考点终极总结

## 目录
1. [表单基础](#表单基础)
2. [表单元素详解](#表单元素详解)
3. [HTML5 新增 Input 类型](#html5-新增-input-类型)
4. [表单属性](#表单属性)
5. [表单验证](#表单验证)
6. [表单提交](#表单提交)
7. [表单安全](#表单安全)
8. [高级特性](#高级特性)
9. [常见面试题](#常见面试题)
10. [实战案例](#实战案例)

---

## 表单基础

### 1. 表单的作用
表单是用户与网站交互的主要方式，用于收集用户输入的数据并提交到服务器。

### 2. 基本结构

```html
<form action="/submit" method="POST" enctype="multipart/form-data">
  <label for="username">用户名:</label>
  <input type="text" id="username" name="username" required>
  
  <button type="submit">提交</button>
</form>
```

### 3. form 标签的核心属性

| 属性 | 说明 | 可选值 |
|-----|------|--------|
| `action` | 表单提交的URL地址 | URL 字符串 |
| `method` | HTTP 请求方法 | GET / POST |
| `enctype` | 表单数据编码类型 | application/x-www-form-urlencoded（默认）<br>multipart/form-data（文件上传）<br>text/plain |
| `target` | 响应的显示位置 | _self / _blank / _parent / _top |
| `autocomplete` | 是否启用自动填充 | on / off |
| `novalidate` | 提交时不进行验证 | 布尔属性 |
| `name` | 表单的名称 | 字符串 |

### 4. method: GET vs POST

#### GET 方法
- 参数附加在URL后面，以 `?` 开始，用 `&` 分隔
- **优点**: 可以被书签保存，可以被缓存
- **缺点**: 
  - URL长度有限制（2048字符）
  - 参数暴露在URL中，不安全
  - 只能发送ASCII字符
- **适用场景**: 查询、搜索等幂等操作

#### POST 方法
- 参数放在请求体中
- **优点**: 
  - 数据量无限制
  - 相对安全（数据不在URL中）
  - 可以发送二进制数据
- **缺点**: 不能被书签保存，不能被缓存
- **适用场景**: 登录、注册、文件上传等修改数据的操作

---

## 表单元素详解

### 1. input 输入框

#### 常用属性
```html
<input 
  type="text"           <!-- 输入类型 -->
  name="username"       <!-- 提交时的字段名 -->
  id="username"         <!-- 元素ID，用于label关联 -->
  value="默认值"        <!-- 默认值 -->
  placeholder="请输入用户名"  <!-- 占位符 -->
  required              <!-- 必填 -->
  disabled              <!-- 禁用 -->
  readonly              <!-- 只读 -->
  maxlength="20"        <!-- 最大长度 -->
  minlength="3"         <!-- 最小长度 -->
  pattern="[A-Za-z0-9]+"  <!-- 正则验证 -->
  autocomplete="off"    <!-- 关闭自动填充 -->
  autofocus             <!-- 自动获取焦点 -->
  size="30"             <!-- 显示宽度 -->
  multiple              <!-- 允许多个值（email、file类型） -->
/>
```

#### 常见 type 类型
- `text`: 单行文本
- `password`: 密码（字符隐藏）
- `email`: 邮箱（自动验证）
- `url`: URL地址
- `tel`: 电话号码
- `number`: 数字
- `range`: 滑块
- `date`: 日期选择器
- `time`: 时间选择器
- `datetime-local`: 日期时间选择器
- `month`: 月份选择器
- `week`: 周选择器
- `color`: 颜色选择器
- `search`: 搜索框
- `checkbox`: 复选框
- `radio`: 单选框
- `file`: 文件上传
- `submit`: 提交按钮
- `reset`: 重置按钮
- `button`: 普通按钮
- `hidden`: 隐藏字段
- `image`: 图片按钮

### 2. textarea 多行文本

```html
<textarea 
  name="description"
  rows="5"              <!-- 可见行数 -->
  cols="50"             <!-- 可见列数 -->
  maxlength="500"       <!-- 最大字符数 -->
  placeholder="请输入描述"
  required
></textarea>
```

### 3. select 下拉选择

```html
<select name="city" id="city" required>
  <option value="">请选择城市</option>
  <option value="beijing">北京</option>
  <option value="shanghai" selected>上海</option>  <!-- 默认选中 -->
  <option value="guangzhou">广州</option>
</select>

<!-- 分组下拉框 -->
<select name="country">
  <optgroup label="亚洲">
    <option value="china">中国</option>
    <option value="japan">日本</option>
  </optgroup>
  <optgroup label="欧洲">
    <option value="uk">英国</option>
    <option value="france">法国</option>
  </optgroup>
</select>

<!-- 多选下拉框 -->
<select name="hobbies" multiple size="4">
  <option value="reading">阅读</option>
  <option value="sports">运动</option>
  <option value="music">音乐</option>
  <option value="travel">旅游</option>
</select>
```

### 4. label 标签

```html
<!-- 方式1: 使用 for 属性 -->
<label for="username">用户名:</label>
<input type="text" id="username" name="username">

<!-- 方式2: 嵌套 -->
<label>
  用户名: <input type="text" name="username">
</label>
```

**优点**:
- 提升用户体验（点击label即可聚焦到输入框）
- 增强可访问性（屏幕阅读器）
- 扩大点击区域（对checkbox和radio特别有用）

### 5. button 按钮

```html
<!-- type="submit" 提交表单（默认） -->
<button type="submit">提交</button>

<!-- type="reset" 重置表单 -->
<button type="reset">重置</button>

<!-- type="button" 普通按钮，不触发表单行为 -->
<button type="button" onclick="doSomething()">点击</button>
```

**button vs input[type="submit"]**:
- `<button>` 可以包含HTML内容（图标、图片等）
- `<button>` 可以更灵活地自定义样式
- `<button>` 默认 type 是 submit（需要注意）

### 6. fieldset 和 legend 分组

```html
<fieldset>
  <legend>个人信息</legend>
  <label>姓名: <input type="text" name="name"></label>
  <label>年龄: <input type="number" name="age"></label>
</fieldset>

<fieldset disabled>  <!-- 禁用整组 -->
  <legend>账户信息</legend>
  <label>账号: <input type="text" name="account"></label>
</fieldset>
```

### 7. datalist 数据列表

```html
<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
  <option value="Opera">
</datalist>
```

---

## HTML5 新增 Input 类型

### 1. email 邮箱

```html
<input type="email" name="email" required>
<!-- 自动验证邮箱格式 -->
<!-- 移动端会显示 @ 符号的键盘 -->

<!-- 支持多个邮箱 -->
<input type="email" name="emails" multiple>
```

### 2. url 网址

```html
<input type="url" name="website" placeholder="https://example.com">
<!-- 自动验证URL格式 -->
<!-- 移动端会显示 .com 等域名快捷键 -->
```

### 3. tel 电话

```html
<input type="tel" name="phone" pattern="[0-9]{11}">
<!-- 移动端会显示数字键盘 -->
<!-- 不会自动验证，需要配合 pattern 使用 -->
```

### 4. number 数字

```html
<input 
  type="number" 
  name="age" 
  min="0"           <!-- 最小值 -->
  max="150"         <!-- 最大值 -->
  step="1"          <!-- 步长 -->
  value="18"        <!-- 默认值 -->
>
<!-- 自动验证数字范围 -->
<!-- 提供上下箭头调整 -->
```

### 5. range 滑块

```html
<input 
  type="range" 
  name="volume" 
  min="0" 
  max="100" 
  step="5" 
  value="50"
  oninput="showValue(this.value)"
>
<output id="volumeValue">50</output>

<script>
function showValue(val) {
  document.getElementById('volumeValue').textContent = val;
}
</script>
```

### 6. date 系列

```html
<!-- 日期 -->
<input type="date" name="birthday" min="1900-01-01" max="2025-12-31">

<!-- 时间 -->
<input type="time" name="appointment">

<!-- 日期时间（本地时间） -->
<input type="datetime-local" name="meeting">

<!-- 月份 -->
<input type="month" name="creditcard-expiry">

<!-- 周 -->
<input type="week" name="week">
```

### 7. color 颜色选择器

```html
<input type="color" name="themeColor" value="#ff0000">
<!-- 返回 #rrggbb 格式的颜色值 -->
```

### 8. search 搜索框

```html
<input type="search" name="q" placeholder="搜索...">
<!-- 与 text 类似，但语义更明确 -->
<!-- 某些浏览器会显示清除按钮 -->
```

### 9. file 文件上传

```html
<!-- 单文件上传 -->
<input type="file" name="avatar" accept="image/*">

<!-- 多文件上传 -->
<input type="file" name="photos" multiple accept="image/png, image/jpeg">

<!-- 限制文件类型 -->
<input type="file" accept=".pdf,.doc,.docx">

<!-- 拍照上传（移动端） -->
<input type="file" accept="image/*" capture="camera">
```

**accept 属性值**:
- `image/*`: 所有图片类型
- `video/*`: 所有视频类型
- `audio/*`: 所有音频类型
- `.pdf`: 特定文件扩展名
- `image/png, image/jpeg`: 指定MIME类型

---

## 表单属性

### 1. HTML5 新增的 input 属性

#### autocomplete 自动填充

```html
<!-- 表单级别 -->
<form autocomplete="off">
  <!-- 所有input都不自动填充 -->
</form>

<!-- 元素级别 -->
<input type="text" name="username" autocomplete="on">
<input type="text" name="code" autocomplete="off">

<!-- 自动填充类型 -->
<input type="text" name="name" autocomplete="name">
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" autocomplete="address-line1">
```

**常用 autocomplete 值**:
- `name`, `given-name`, `family-name`
- `email`, `username`, `new-password`, `current-password`
- `tel`, `tel-country-code`, `tel-national`
- `address-line1`, `address-line2`, `country`, `postal-code`
- `cc-number`, `cc-exp`, `cc-csc` (信用卡)

#### autofocus 自动聚焦

```html
<input type="text" name="search" autofocus>
<!-- 页面加载后自动获得焦点 -->
<!-- 一个页面只应该有一个 autofocus -->
```

#### placeholder 占位符

```html
<input type="text" placeholder="请输入用户名">
<!-- 输入框为空时显示的提示文字 -->
<!-- 不能替代 label -->
```

#### required 必填

```html
<input type="text" name="username" required>
<select name="city" required>
  <option value="">请选择</option>
  <option value="beijing">北京</option>
</select>
```

#### pattern 正则验证

```html
<!-- 手机号 -->
<input type="tel" pattern="1[3-9]\d{9}" title="请输入11位手机号">

<!-- 身份证 -->
<input type="text" pattern="[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]" 
       title="请输入正确的身份证号">

<!-- 邮政编码 -->
<input type="text" pattern="\d{6}" title="请输入6位邮政编码">

<!-- 用户名（字母数字下划线，4-16位） -->
<input type="text" pattern="[A-Za-z0-9_]{4,16}" title="用户名应为4-16位字母数字或下划线">
```

#### min / max / step 数值范围

```html
<!-- 数字范围 -->
<input type="number" min="1" max="100" step="1">

<!-- 日期范围 -->
<input type="date" min="2025-01-01" max="2025-12-31">

<!-- 滑块 -->
<input type="range" min="0" max="100" step="5">
```

#### maxlength / minlength 长度限制

```html
<input type="text" minlength="3" maxlength="20">
<textarea minlength="10" maxlength="500"></textarea>
```

#### multiple 多选

```html
<!-- 多个邮箱 -->
<input type="email" multiple>

<!-- 多文件上传 -->
<input type="file" multiple>

<!-- 多选下拉框 -->
<select multiple>
  <option>选项1</option>
  <option>选项2</option>
</select>
```

### 2. 表单元素的表单属性

HTML5 允许表单元素放在 form 外部，通过属性关联：

```html
<form id="myForm" action="/submit"></form>

<!-- 这些元素在form外部，但通过form属性关联 -->
<input type="text" name="username" form="myForm">
<button type="submit" form="myForm">提交</button>
```

#### formaction 覆盖 action

```html
<form action="/submit">
  <input type="text" name="username">
  
  <!-- 提交到不同的URL -->
  <button type="submit">正常提交</button>
  <button type="submit" formaction="/draft">保存草稿</button>
</form>
```

#### formmethod 覆盖 method

```html
<form method="GET">
  <button type="submit">GET提交</button>
  <button type="submit" formmethod="POST">POST提交</button>
</form>
```

#### formenctype 覆盖 enctype

```html
<form enctype="application/x-www-form-urlencoded">
  <input type="file" name="file">
  <button type="submit" formenctype="multipart/form-data">上传文件</button>
</form>
```

#### formtarget 覆盖 target

```html
<form target="_self">
  <button type="submit">当前窗口</button>
  <button type="submit" formtarget="_blank">新窗口</button>
</form>
```

#### formnovalidate 跳过验证

```html
<form>
  <input type="email" required>
  <button type="submit">验证并提交</button>
  <button type="submit" formnovalidate>跳过验证提交</button>
</form>
```

---

## 表单验证

### 1. HTML5 内置验证

#### 验证类型

```html
<!-- required: 必填验证 -->
<input type="text" required>

<!-- type: 类型验证 -->
<input type="email">   <!-- 验证邮箱格式 -->
<input type="url">     <!-- 验证URL格式 -->
<input type="number">  <!-- 验证数字 -->

<!-- pattern: 正则验证 -->
<input type="text" pattern="[A-Za-z]+">

<!-- min/max: 范围验证 -->
<input type="number" min="1" max="100">
<input type="date" min="2025-01-01">

<!-- minlength/maxlength: 长度验证 -->
<input type="text" minlength="6" maxlength="20">

<!-- step: 步长验证 -->
<input type="number" step="0.01">
```

#### 自定义错误消息

```html
<input 
  type="email" 
  required
  oninvalid="this.setCustomValidity('请输入有效的邮箱地址')"
  oninput="this.setCustomValidity('')"
>
```

### 2. JavaScript 验证 API

#### Constraint Validation API

```javascript
const input = document.querySelector('input');

// 验证状态属性
input.validity.valid          // 是否通过验证
input.validity.valueMissing   // 是否为空（required）
input.validity.typeMismatch   // 类型不匹配（email、url等）
input.validity.patternMismatch // 正则不匹配
input.validity.tooLong        // 超过maxlength
input.validity.tooShort       // 小于minlength
input.validity.rangeUnderflow // 小于min
input.validity.rangeOverflow  // 大于max
input.validity.stepMismatch   // 不符合step
input.validity.customError    // 自定义错误

// 验证方法
input.checkValidity()         // 返回布尔值，触发invalid事件
input.reportValidity()        // 返回布尔值，触发invalid事件并显示提示
input.setCustomValidity('')   // 设置自定义错误消息

// 错误消息
input.validationMessage       // 获取错误消息
```

#### 实例：自定义验证

```javascript
const form = document.querySelector('form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

confirmPassword.addEventListener('input', function() {
  if (this.value !== password.value) {
    this.setCustomValidity('两次密码不一致');
  } else {
    this.setCustomValidity('');
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (!form.checkValidity()) {
    // 表单验证失败
    form.reportValidity();
    return;
  }
  
  // 验证通过，提交表单
  console.log('提交表单');
});
```

### 3. 禁用浏览器默认验证

```html
<!-- 表单级别禁用 -->
<form novalidate>
  <!-- 使用JavaScript自定义验证 -->
</form>

<!-- 提交按钮级别禁用 -->
<button type="submit" formnovalidate>提交</button>
```

### 4. CSS 伪类选择器

```css
/* 必填字段 */
input:required {
  border-left: 3px solid red;
}

input:optional {
  border-left: 3px solid gray;
}

/* 验证状态 */
input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}

/* 范围验证 */
input:in-range {
  border-color: green;
}

input:out-of-range {
  border-color: red;
}

/* 已填写/未填写 */
input:placeholder-shown {
  background-color: #f0f0f0;
}

/* 只读/禁用 */
input:read-only {
  background-color: #e9ecef;
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 焦点 */
input:focus {
  outline: 2px solid blue;
}
```

---

## 表单提交

### 1. 提交方式

#### 方式1: 表单默认提交

```html
<form action="/submit" method="POST">
  <input type="text" name="username">
  <button type="submit">提交</button>
</form>
<!-- 点击提交按钮，页面会跳转 -->
```

#### 方式2: JavaScript 提交

```javascript
const form = document.querySelector('form');

// 方法1: 调用 submit() 方法
form.submit();  // 不会触发submit事件

// 方法2: 触发 submit 事件
form.dispatchEvent(new Event('submit'));

// 方法3: 模拟点击提交按钮
document.querySelector('button[type="submit"]').click();
```

#### 方式3: AJAX 提交

```javascript
const form = document.querySelector('form');

form.addEventListener('submit', async function(e) {
  e.preventDefault(); // 阻止默认提交
  
  const formData = new FormData(form);
  
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });
    
    const result = await response.json();
    console.log('提交成功:', result);
  } catch (error) {
    console.error('提交失败:', error);
  }
});
```

### 2. FormData API

```javascript
const form = document.querySelector('form');

// 创建 FormData 对象
const formData = new FormData(form);

// 添加数据
formData.append('key', 'value');
formData.append('file', fileInput.files[0]);

// 获取数据
formData.get('username');     // 获取单个值
formData.getAll('hobbies');   // 获取所有值（多选）

// 设置数据（会覆盖）
formData.set('username', 'newValue');

// 删除数据
formData.delete('key');

// 检查是否存在
formData.has('username');     // true/false

// 遍历
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}

// 转换为对象
const obj = Object.fromEntries(formData);
console.log(obj);

// 转换为 JSON
const json = JSON.stringify(Object.fromEntries(formData));
```

### 3. 文件上传

#### 单文件上传

```html
<form id="uploadForm">
  <input type="file" name="avatar" id="fileInput" accept="image/*">
  <button type="submit">上传</button>
</form>

<script>
const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const file = fileInput.files[0];
  if (!file) {
    alert('请选择文件');
    return;
  }
  
  // 文件验证
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert('文件大小不能超过5MB');
    return;
  }
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    alert('只能上传 JPG、PNG、GIF 格式的图片');
    return;
  }
  
  // 上传文件
  const formData = new FormData();
  formData.append('avatar', file);
  
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log('上传成功:', result);
  } catch (error) {
    console.error('上传失败:', error);
  }
});

// 预览图片
fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      document.body.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});
</script>
```

#### 多文件上传

```html
<input type="file" multiple id="multipleFiles">

<script>
const input = document.getElementById('multipleFiles');

input.addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  
  files.forEach(file => {
    console.log('文件名:', file.name);
    console.log('文件大小:', file.size);
    console.log('文件类型:', file.type);
    console.log('最后修改时间:', file.lastModified);
  });
  
  // 批量上传
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`file${index}`, file);
    // 或者使用同一个字段名
    // formData.append('files[]', file);
  });
});
</script>
```

#### 拖拽上传

```html
<div id="dropZone" style="border: 2px dashed #ccc; padding: 50px; text-align: center;">
  拖拽文件到这里上传
</div>

<script>
const dropZone = document.getElementById('dropZone');

// 阻止默认行为
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// 高亮显示
['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, () => {
    dropZone.style.backgroundColor = '#e0e0e0';
  });
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, () => {
    dropZone.style.backgroundColor = '';
  });
});

// 处理文件
dropZone.addEventListener('drop', function(e) {
  const files = Array.from(e.dataTransfer.files);
  
  files.forEach(file => {
    uploadFile(file);
  });
});

async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    console.log('上传成功');
  } catch (error) {
    console.error('上传失败:', error);
  }
}
</script>
```

### 4. 表单序列化

```javascript
// 方法1: 使用 FormData
function serializeForm(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

// 方法2: 手动遍历
function serializeFormManual(form) {
  const formData = {};
  const elements = form.elements;
  
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const name = element.name;
    const type = element.type;
    
    if (!name || element.disabled) continue;
    
    if (type === 'checkbox' || type === 'radio') {
      if (element.checked) {
        formData[name] = element.value;
      }
    } else if (type === 'select-multiple') {
      formData[name] = Array.from(element.selectedOptions).map(option => option.value);
    } else if (type !== 'submit' && type !== 'button' && type !== 'reset') {
      formData[name] = element.value;
    }
  }
  
  return formData;
}

// 方法3: 转换为 URLSearchParams
function serializeToURLParams(form) {
  const formData = new FormData(form);
  return new URLSearchParams(formData).toString();
  // 输出: username=admin&password=123456
}
```

---

## 表单安全

### 1. CSRF（跨站请求伪造）防护

```html
<!-- 添加 CSRF Token -->
<form method="POST" action="/submit">
  <input type="hidden" name="csrf_token" value="<%= csrfToken %>">
  <input type="text" name="username">
  <button type="submit">提交</button>
</form>
```

```javascript
// 使用 meta 标签存储 token
// <meta name="csrf-token" content="token-value">

fetch('/api/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
  },
  body: JSON.stringify(data)
});
```

### 2. XSS（跨站脚本攻击）防护

```javascript
// 对用户输入进行转义
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 使用 textContent 而不是 innerHTML
element.textContent = userInput;  // 安全
element.innerHTML = userInput;    // 危险

// 使用 CSP（Content Security Policy）
// 在 HTTP 响应头中设置:
// Content-Security-Policy: default-src 'self'; script-src 'self'
```

### 3. SQL 注入防护

```javascript
// 永远不要直接拼接 SQL 语句
// 错误示例:
const sql = `SELECT * FROM users WHERE username = '${username}'`;

// 正确做法：使用参数化查询（后端）
// const sql = 'SELECT * FROM users WHERE username = ?';
// db.query(sql, [username]);
```

### 4. 敏感数据保护

```html
<!-- 密码字段使用 autocomplete="new-password" -->
<input type="password" name="password" autocomplete="new-password">

<!-- 禁用缓存敏感表单 -->
<form autocomplete="off">
  <input type="text" name="credit-card" autocomplete="off">
</form>
```

```javascript
// HTTPS 传输
// 密码加密后传输
async function submitLogin(username, password) {
  // 前端加密（额外的安全层）
  const hashedPassword = await hashPassword(password);
  
  await fetch('https://api.example.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: hashedPassword })
  });
}
```

### 5. 输入验证

```javascript
// 白名单验证
function validateUsername(username) {
  // 只允许字母、数字、下划线
  return /^[A-Za-z0-9_]{4,16}$/.test(username);
}

// 长度限制
function validateInput(input, minLen, maxLen) {
  return input.length >= minLen && input.length <= maxLen;
}

// 类型检查
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

## 高级特性

### 1. 表单状态管理

```javascript
class FormState {
  constructor(form) {
    this.form = form;
    this.initialState = this.getState();
  }
  
  // 获取当前表单状态
  getState() {
    const formData = new FormData(this.form);
    return Object.fromEntries(formData);
  }
  
  // 检查表单是否修改
  isDirty() {
    const currentState = this.getState();
    return JSON.stringify(currentState) !== JSON.stringify(this.initialState);
  }
  
  // 重置到初始状态
  reset() {
    this.form.reset();
  }
  
  // 保存当前状态为初始状态
  saveState() {
    this.initialState = this.getState();
  }
}

// 使用
const formState = new FormState(document.querySelector('form'));

window.addEventListener('beforeunload', (e) => {
  if (formState.isDirty()) {
    e.preventDefault();
    e.returnValue = '您有未保存的更改，确定要离开吗？';
  }
});
```

### 2. 表单自动保存（草稿）

```javascript
class AutoSave {
  constructor(form, storageKey, interval = 5000) {
    this.form = form;
    this.storageKey = storageKey;
    this.interval = interval;
    this.timer = null;
    
    this.init();
  }
  
  init() {
    // 加载草稿
    this.loadDraft();
    
    // 监听输入事件
    this.form.addEventListener('input', () => {
      this.scheduleAutoSave();
    });
    
    // 提交时清除草稿
    this.form.addEventListener('submit', () => {
      this.clearDraft();
    });
  }
  
  scheduleAutoSave() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.saveDraft();
    }, this.interval);
  }
  
  saveDraft() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    localStorage.setItem(this.storageKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    console.log('草稿已保存');
  }
  
  loadDraft() {
    const draft = localStorage.getItem(this.storageKey);
    if (!draft) return;
    
    try {
      const { data, timestamp } = JSON.parse(draft);
      
      // 草稿有效期 24 小时
      if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
        this.clearDraft();
        return;
      }
      
      // 询问用户是否恢复草稿
      if (confirm('发现未保存的草稿，是否恢复？')) {
        Object.keys(data).forEach(key => {
          const element = this.form.elements[key];
          if (element) {
            element.value = data[key];
          }
        });
      } else {
        this.clearDraft();
      }
    } catch (error) {
      console.error('加载草稿失败:', error);
    }
  }
  
  clearDraft() {
    localStorage.removeItem(this.storageKey);
  }
}

// 使用
new AutoSave(document.querySelector('form'), 'myForm-draft', 3000);
```

### 3. 动态表单

```javascript
// 动态添加/删除字段
class DynamicForm {
  constructor(container) {
    this.container = container;
    this.count = 0;
  }
  
  addField(template) {
    this.count++;
    const html = template.replace(/\{index\}/g, this.count);
    this.container.insertAdjacentHTML('beforeend', html);
  }
  
  removeField(button) {
    const field = button.closest('.field-group');
    field.remove();
  }
}

// 使用
const dynamicForm = new DynamicForm(document.getElementById('fields'));

document.getElementById('addField').addEventListener('click', () => {
  const template = `
    <div class="field-group">
      <input type="text" name="item_{index}" placeholder="项目 {index}">
      <button type="button" onclick="this.closest('.field-group').remove()">删除</button>
    </div>
  `;
  dynamicForm.addField(template);
});
```

### 4. 表单联动

```javascript
// 省市区三级联动
const regions = {
  '北京': ['东城区', '西城区', '朝阳区', '海淀区'],
  '上海': ['黄浦区', '徐汇区', '长宁区', '静安区'],
  '广东': ['广州市', '深圳市', '东莞市', '佛山市']
};

const provinceSelect = document.getElementById('province');
const citySelect = document.getElementById('city');

provinceSelect.addEventListener('change', function() {
  const province = this.value;
  const cities = regions[province] || [];
  
  // 清空城市选项
  citySelect.innerHTML = '<option value="">请选择城市</option>';
  
  // 添加新选项
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
});
```

### 5. 条件显示/隐藏

```javascript
// 根据选择显示不同的表单字段
const userTypeSelect = document.getElementById('userType');
const personalFields = document.getElementById('personalFields');
const companyFields = document.getElementById('companyFields');

userTypeSelect.addEventListener('change', function() {
  if (this.value === 'personal') {
    personalFields.style.display = 'block';
    companyFields.style.display = 'none';
    // 清空并禁用公司字段
    companyFields.querySelectorAll('input, select').forEach(el => {
      el.value = '';
      el.disabled = true;
    });
    // 启用个人字段
    personalFields.querySelectorAll('input, select').forEach(el => {
      el.disabled = false;
    });
  } else if (this.value === 'company') {
    personalFields.style.display = 'none';
    companyFields.style.display = 'block';
    // 清空并禁用个人字段
    personalFields.querySelectorAll('input, select').forEach(el => {
      el.value = '';
      el.disabled = true;
    });
    // 启用公司字段
    companyFields.querySelectorAll('input, select').forEach(el => {
      el.disabled = false;
    });
  }
});
```

---

## 常见面试题

### 1. GET 和 POST 的区别？

**答案**:

| 特性 | GET | POST |
|-----|-----|------|
| 数据位置 | URL参数（查询字符串） | 请求体 |
| 数据长度 | 受URL长度限制（~2048字符） | 无限制 |
| 安全性 | 参数暴露在URL中，不安全 | 相对安全 |
| 缓存 | 可以被缓存 | 不会被缓存 |
| 书签 | 可以保存为书签 | 不能保存 |
| 历史记录 | 参数保留在浏览器历史中 | 不保留 |
| 幂等性 | 幂等（多次请求结果相同） | 非幂等 |
| 数据类型 | 只允许ASCII字符 | 无限制（可以是二进制） |
| 使用场景 | 查询、搜索、获取数据 | 提交、修改、删除数据 |

### 2. form 的 enctype 属性有哪些值？

**答案**:

1. **application/x-www-form-urlencoded** (默认)
   - 表单数据被编码为键值对
   - 格式: `key1=value1&key2=value2`
   - 特殊字符会被转义
   - 适用于普通表单提交

2. **multipart/form-data**
   - 不对字符编码
   - 用于文件上传
   - 数据分为多个部分，每个部分都有自己的Content-Type
   - 必须用于包含文件上传的表单

3. **text/plain**
   - 数据以纯文本形式发送
   - 空格转换为 "+"，但不对特殊字符编码
   - 很少使用

```html
<!-- 普通表单 -->
<form enctype="application/x-www-form-urlencoded">

<!-- 文件上传 -->
<form enctype="multipart/form-data">

<!-- 纯文本 -->
<form enctype="text/plain">
```

### 3. label 标签有什么作用？

**答案**:

1. **增强可访问性**
   - 屏幕阅读器可以读取label内容
   - 帮助视障用户理解表单

2. **扩大点击区域**
   - 点击label即可聚焦到关联的input
   - 对checkbox和radio特别有用

3. **提升用户体验**
   - 提供清晰的字段说明
   - 改善表单的可用性

4. **语义化**
   - 明确标注字段的含义
   - 代码更易维护

```html
<!-- 方式1: for + id -->
<label for="username">用户名</label>
<input type="text" id="username" name="username">

<!-- 方式2: 嵌套 -->
<label>
  <input type="checkbox" name="agree">
  我同意服务条款
</label>
```

### 4. 如何禁用表单的自动填充？

**答案**:

```html
<!-- 方法1: 表单级别禁用 -->
<form autocomplete="off">
  <!-- 所有字段都不自动填充 -->
</form>

<!-- 方法2: 字段级别禁用 -->
<input type="text" autocomplete="off">

<!-- 方法3: 使用随机 name（浏览器可能识别不出） -->
<input type="text" name="username_random123">

<!-- 方法4: 使用 readonly，在获得焦点时移除 -->
<input type="text" readonly onfocus="this.removeAttribute('readonly')">

<!-- 方法5: 延迟添加 name 属性 -->
<script>
setTimeout(() => {
  document.querySelector('input').name = 'username';
}, 500);
</script>
```

**注意**: 浏览器可能会忽略 `autocomplete="off"`，这是为了用户体验。

### 5. required 和 pattern 的区别？

**答案**:

```html
<!-- required: 必填验证 -->
<input type="text" required>
<!-- 只验证是否为空，不验证内容格式 -->

<!-- pattern: 正则验证 -->
<input type="text" pattern="[A-Za-z]+">
<!-- 验证内容是否符合正则表达式 -->
<!-- 空值不会触发验证（除非加上required） -->

<!-- 组合使用 -->
<input type="text" required pattern="[0-9]{11}" title="请输入11位手机号">
<!-- 必填，且必须是11位数字 -->
```

### 6. input 的 name 和 id 的区别？

**答案**:

| 属性 | 用途 | 唯一性 |
|-----|------|--------|
| **name** | 表单提交时的字段名 | 可以重复（radio、checkbox） |
| **id** | DOM元素的唯一标识符 | 必须唯一 |

```html
<!-- name: 用于表单提交 -->
<input type="text" name="username">
<!-- 提交时发送: username=value -->

<!-- id: 用于JavaScript、CSS选择器、label关联 -->
<label for="username">用户名</label>
<input type="text" id="username" name="user_name">

<!-- radio 同组必须有相同的 name -->
<input type="radio" name="gender" value="male" id="male">
<input type="radio" name="gender" value="female" id="female">

<!-- checkbox 多选可以使用相同的 name -->
<input type="checkbox" name="hobbies" value="reading">
<input type="checkbox" name="hobbies" value="sports">
```

### 7. readonly 和 disabled 的区别？

**答案**:

| 特性 | readonly | disabled |
|-----|----------|----------|
| 能否聚焦 | 可以 | 不可以 |
| 能否选中 | 可以 | 不可以 |
| 能否提交 | 会提交 | **不会提交** |
| 适用元素 | input、textarea | 所有表单元素 |
| 外观 | 正常 | 灰色/变淡 |
| 光标 | 正常 | not-allowed |
| 可否修改 | 不可以 | 不可以 |

```html
<!-- readonly: 只读，但会提交 -->
<input type="text" name="id" value="123" readonly>
<!-- 提交时会发送: id=123 -->

<!-- disabled: 禁用，不会提交 -->
<input type="text" name="username" value="admin" disabled>
<!-- 提交时不会发送这个字段 -->

<!-- 如果需要禁用但提交，使用 readonly + 样式 -->
<input type="text" readonly style="cursor: not-allowed; opacity: 0.6;">

<!-- 或者使用 hidden -->
<input type="text" disabled>
<input type="hidden" name="username" value="admin">
```

### 8. button 的 type 属性有哪些值？

**答案**:

```html
<!-- type="submit" (默认) -->
<button type="submit">提交</button>
<!-- 点击会提交表单 -->

<!-- type="reset" -->
<button type="reset">重置</button>
<!-- 点击会重置表单到初始值 -->

<!-- type="button" -->
<button type="button" onclick="doSomething()">点击</button>
<!-- 普通按钮，不会触发表单行为 -->

<!-- 注意：如果不指定 type，默认是 submit -->
<button>点击</button>  <!-- 会提交表单！ -->
<button type="button">点击</button>  <!-- 不会提交 -->
```

**面试技巧**: 强调 `<button>` 默认 type 是 submit，容易踩坑！

### 9. 如何实现表单的自定义验证？

**答案**:

```javascript
const form = document.querySelector('form');
const input = document.getElementById('username');

// 方法1: 使用 setCustomValidity
input.addEventListener('input', function() {
  if (this.value.length < 3) {
    this.setCustomValidity('用户名至少3个字符');
  } else if (!/^[A-Za-z0-9_]+$/.test(this.value)) {
    this.setCustomValidity('用户名只能包含字母、数字和下划线');
  } else {
    this.setCustomValidity(''); // 清除错误
  }
});

// 方法2: 在 submit 事件中验证
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // 自定义验证逻辑
  if (!validateForm()) {
    return;
  }
  
  // 验证通过，提交表单
  this.submit();
});

function validateForm() {
  const username = document.getElementById('username').value;
  
  if (username.length < 3) {
    alert('用户名至少3个字符');
    return false;
  }
  
  return true;
}

// 方法3: 使用 Constraint Validation API
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (!form.checkValidity()) {
    // 触发浏览器的默认验证UI
    form.reportValidity();
    return;
  }
  
  console.log('验证通过');
});
```

### 10. FormData 的使用场景？

**答案**:

1. **AJAX 表单提交**
```javascript
const formData = new FormData(form);
fetch('/api/submit', {
  method: 'POST',
  body: formData
});
```

2. **文件上传**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('description', 'My file');
```

3. **动态添加数据**
```javascript
const formData = new FormData();
formData.append('username', 'admin');
formData.append('timestamp', Date.now());
```

4. **修改表单数据**
```javascript
const formData = new FormData(form);
formData.set('username', 'newValue');  // 覆盖
formData.delete('password');           // 删除
```

5. **遍历表单数据**
```javascript
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
```

### 11. 如何防止表单重复提交？

**答案**:

```javascript
// 方法1: 禁用提交按钮
const form = document.querySelector('form');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // 禁用按钮
  submitBtn.disabled = true;
  submitBtn.textContent = '提交中...';
  
  // 提交数据
  fetch('/submit', {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    console.log('提交成功');
  })
  .finally(() => {
    // 重新启用按钮
    submitBtn.disabled = false;
    submitBtn.textContent = '提交';
  });
});

// 方法2: 使用标志位
let isSubmitting = false;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (isSubmitting) return;
  
  isSubmitting = true;
  
  submitForm()
    .finally(() => {
      isSubmitting = false;
    });
});

// 方法3: 使用 token（后端验证）
// 生成一次性 token，提交后失效

// 方法4: 防抖
const submitForm = debounce(function() {
  // 提交逻辑
}, 300);

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### 12. 表单验证的最佳实践？

**答案**:

1. **前后端双重验证**
   - 前端验证提升用户体验
   - 后端验证保证安全性
   - **永远不要只依赖前端验证**

2. **实时反馈**
```javascript
input.addEventListener('blur', function() {
  validate(this);
});

input.addEventListener('input', function() {
  if (this.classList.contains('error')) {
    validate(this);  // 实时清除错误
  }
});
```

3. **清晰的错误提示**
```html
<input type="text" id="username" required pattern="[A-Za-z0-9_]{4,16}">
<span class="error-message"></span>
```

```javascript
function showError(input, message) {
  input.classList.add('error');
  input.nextElementSibling.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  input.nextElementSibling.textContent = '';
}
```

4. **使用合适的验证时机**
   - `blur`: 失去焦点时验证
   - `input`: 实时验证（用于清除错误）
   - `submit`: 提交前验证

5. **渐进增强**
```html
<!-- HTML5 原生验证作为基础 -->
<input type="email" required>

<!-- JavaScript 增强验证 -->
<script>
if (!supportsHTML5Validation()) {
  // 使用 JavaScript 验证
}
</script>
```

---

## 实战案例

### 案例1: 完整的注册表单

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>用户注册</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    .container {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      max-width: 500px;
      width: 100%;
    }
    
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-weight: bold;
    }
    
    input, select {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      transition: border-color 0.3s;
    }
    
    input:focus, select:focus {
      outline: none;
      border-color: #667eea;
    }
    
    input.error {
      border-color: #e74c3c;
    }
    
    input.success {
      border-color: #27ae60;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 12px;
      margin-top: 5px;
      display: none;
    }
    
    .error-message.show {
      display: block;
    }
    
    .success-message {
      color: #27ae60;
      font-size: 12px;
      margin-top: 5px;
      display: none;
    }
    
    .success-message.show {
      display: block;
    }
    
    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    button:hover {
      transform: translateY(-2px);
    }
    
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .password-strength {
      margin-top: 5px;
      height: 5px;
      background: #ddd;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .password-strength-bar {
      height: 100%;
      width: 0%;
      transition: all 0.3s;
    }
    
    .strength-weak { width: 33%; background: #e74c3c; }
    .strength-medium { width: 66%; background: #f39c12; }
    .strength-strong { width: 100%; background: #27ae60; }
  </style>
</head>
<body>
  <div class="container">
    <h1>用户注册</h1>
    <form id="registerForm" novalidate>
      <div class="form-group">
        <label for="username">用户名 *</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          required
          minlength="4"
          maxlength="16"
          pattern="[A-Za-z0-9_]+"
          autocomplete="username"
        >
        <span class="error-message"></span>
        <span class="success-message"></span>
      </div>
      
      <div class="form-group">
        <label for="email">邮箱 *</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
          autocomplete="email"
        >
        <span class="error-message"></span>
        <span class="success-message"></span>
      </div>
      
      <div class="form-group">
        <label for="password">密码 *</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required
          minlength="8"
          autocomplete="new-password"
        >
        <div class="password-strength">
          <div class="password-strength-bar"></div>
        </div>
        <span class="error-message"></span>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">确认密码 *</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          required
          autocomplete="new-password"
        >
        <span class="error-message"></span>
      </div>
      
      <div class="form-group">
        <label for="phone">手机号 *</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          required
          pattern="1[3-9]\d{9}"
          autocomplete="tel"
        >
        <span class="error-message"></span>
      </div>
      
      <div class="form-group">
        <label for="gender">性别 *</label>
        <select id="gender" name="gender" required>
          <option value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
          <option value="other">其他</option>
        </select>
        <span class="error-message"></span>
      </div>
      
      <button type="submit" id="submitBtn">注册</button>
    </form>
  </div>

  <script>
    const form = document.getElementById('registerForm');
    const inputs = form.querySelectorAll('input, select');
    
    // 验证规则
    const validators = {
      username: {
        required: true,
        minLength: 4,
        maxLength: 16,
        pattern: /^[A-Za-z0-9_]+$/,
        messages: {
          required: '请输入用户名',
          minLength: '用户名至少4个字符',
          maxLength: '用户名最多16个字符',
          pattern: '用户名只能包含字母、数字和下划线'
        },
        async: async function(value) {
          // 模拟异步验证（检查用户名是否已存在）
          return new Promise((resolve) => {
            setTimeout(() => {
              const exists = ['admin', 'test', 'user'].includes(value.toLowerCase());
              resolve({
                valid: !exists,
                message: exists ? '用户名已存在' : '用户名可用'
              });
            }, 500);
          });
        }
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
          required: '请输入邮箱',
          pattern: '请输入有效的邮箱地址'
        },
        async: async function(value) {
          return new Promise((resolve) => {
            setTimeout(() => {
              const exists = value === 'test@example.com';
              resolve({
                valid: !exists,
                message: exists ? '邮箱已被注册' : '邮箱可用'
              });
            }, 500);
          });
        }
      },
      password: {
        required: true,
        minLength: 8,
        messages: {
          required: '请输入密码',
          minLength: '密码至少8个字符',
          weak: '密码强度太弱，请包含大小写字母、数字和特殊字符'
        }
      },
      confirmPassword: {
        required: true,
        match: 'password',
        messages: {
          required: '请确认密码',
          match: '两次密码不一致'
        }
      },
      phone: {
        required: true,
        pattern: /^1[3-9]\d{9}$/,
        messages: {
          required: '请输入手机号',
          pattern: '请输入有效的手机号'
        }
      },
      gender: {
        required: true,
        messages: {
          required: '请选择性别'
        }
      }
    };
    
    // 验证函数
    async function validateField(input) {
      const name = input.name;
      const value = input.value.trim();
      const rules = validators[name];
      
      if (!rules) return true;
      
      const errorMsg = input.parentElement.querySelector('.error-message');
      const successMsg = input.parentElement.querySelector('.success-message');
      
      // 清除之前的状态
      clearFieldState(input);
      
      // 必填验证
      if (rules.required && !value) {
        showError(input, rules.messages.required);
        return false;
      }
      
      // 最小长度
      if (rules.minLength && value.length < rules.minLength) {
        showError(input, rules.messages.minLength);
        return false;
      }
      
      // 最大长度
      if (rules.maxLength && value.length > rules.maxLength) {
        showError(input, rules.messages.maxLength);
        return false;
      }
      
      // 正则验证
      if (rules.pattern && !rules.pattern.test(value)) {
        showError(input, rules.messages.pattern);
        return false;
      }
      
      // 匹配验证（确认密码）
      if (rules.match) {
        const matchInput = document.getElementById(rules.match);
        if (value !== matchInput.value) {
          showError(input, rules.messages.match);
          return false;
        }
      }
      
      // 密码强度验证
      if (name === 'password' && value) {
        const strength = checkPasswordStrength(value);
        updatePasswordStrength(strength);
        
        if (strength < 2) {
          showError(input, rules.messages.weak);
          return false;
        }
      }
      
      // 异步验证
      if (rules.async && value) {
        const result = await rules.async(value);
        if (!result.valid) {
          showError(input, result.message);
          return false;
        }
        showSuccess(input, result.message);
      }
      
      // 验证通过
      if (!rules.async) {
        showSuccess(input);
      }
      return true;
    }
    
    // 显示错误
    function showError(input, message) {
      input.classList.add('error');
      input.classList.remove('success');
      const errorMsg = input.parentElement.querySelector('.error-message');
      errorMsg.textContent = message;
      errorMsg.classList.add('show');
    }
    
    // 显示成功
    function showSuccess(input, message = '✓') {
      input.classList.add('success');
      input.classList.remove('error');
      const successMsg = input.parentElement.querySelector('.success-message');
      if (successMsg) {
        successMsg.textContent = message;
        successMsg.classList.add('show');
      }
    }
    
    // 清除状态
    function clearFieldState(input) {
      input.classList.remove('error', 'success');
      const errorMsg = input.parentElement.querySelector('.error-message');
      const successMsg = input.parentElement.querySelector('.success-message');
      if (errorMsg) {
        errorMsg.classList.remove('show');
        errorMsg.textContent = '';
      }
      if (successMsg) {
        successMsg.classList.remove('show');
        successMsg.textContent = '';
      }
    }
    
    // 检查密码强度
    function checkPasswordStrength(password) {
      let strength = 0;
      
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      
      return strength;
    }
    
    // 更新密码强度显示
    function updatePasswordStrength(strength) {
      const bar = document.querySelector('.password-strength-bar');
      bar.className = 'password-strength-bar';
      
      if (strength === 1) {
        bar.classList.add('strength-weak');
      } else if (strength === 2 || strength === 3) {
        bar.classList.add('strength-medium');
      } else if (strength >= 4) {
        bar.classList.add('strength-strong');
      } else {
        bar.style.width = '0%';
      }
    }
    
    // 监听输入事件
    inputs.forEach(input => {
      // 失去焦点时验证
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      // 输入时清除错误（实时验证）
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
      
      // 密码实时显示强度
      if (input.id === 'password') {
        input.addEventListener('input', function() {
          if (this.value) {
            const strength = checkPasswordStrength(this.value);
            updatePasswordStrength(strength);
          } else {
            document.querySelector('.password-strength-bar').style.width = '0%';
          }
        });
      }
    });
    
    // 表单提交
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';
      
      // 验证所有字段
      let isValid = true;
      for (const input of inputs) {
        const valid = await validateField(input);
        if (!valid) isValid = false;
      }
      
      if (!isValid) {
        submitBtn.disabled = false;
        submitBtn.textContent = '注册';
        return;
      }
      
      // 收集表单数据
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      delete data.confirmPassword; // 不需要提交确认密码
      
      // 模拟提交
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('注册成功', data);
        alert('注册成功！');
        form.reset();
      } catch (error) {
        alert('注册失败，请重试');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '注册';
      }
    });
  </script>
</body>
</html>
```

### 案例2: 文件上传（带预览和进度）

见 `file-upload.html`

### 案例3: 动态表单（添加/删除字段）

见 `dynamic-form.html`

---

## 总结

### 关键要点

1. **表单基础**
   - 理解 GET vs POST
   - 掌握 enctype 的使用场景
   - 熟悉各种表单元素

2. **HTML5 新特性**
   - 新的 input 类型（email、date、color等）
   - 表单验证属性（required、pattern等）
   - FormData API

3. **表单验证**
   - HTML5 内置验证
   - JavaScript 自定义验证
   - 前后端双重验证

4. **表单安全**
   - CSRF 防护
   - XSS 防护
   - 输入验证

5. **用户体验**
   - 实时反馈
   - 清晰的错误提示
   - 防止重复提交
   - 自动保存草稿

### 面试高频考点

1. GET 和 POST 的区别
2. form 的 enctype 属性
3. label 的作用
4. readonly vs disabled
5. button 的 type 属性
6. 表单验证的方式
7. FormData 的使用
8. 防止表单重复提交
9. 文件上传的实现
10. 表单安全防护

### 学习建议

1. **动手实践**: 完成上面的实战案例
2. **阅读文档**: MDN 表单相关文档
3. **关注细节**: 注意浏览器兼容性
4. **安全意识**: 永远不要只依赖前端验证
5. **用户体验**: 站在用户角度思考表单设计

---

**文档版本**: v1.0  
**最后更新**: 2025-11-01  
**作者**: 前端开发者  
**参考资料**: MDN、W3C、个人实战经验

