# HTML5 大厂面试知识点总结

## 目录
1. [HTML5 新特性](#html5-新特性)
2. [语义化标签](#语义化标签)
3. [表单增强](#表单增强)
4. [多媒体 API](#多媒体-api)
5. [图形绘制](#图形绘制)
6. [本地存储](#本地存储)
7. [离线应用](#离线应用)
8. [Web Workers](#web-workers)
9. [WebSocket](#websocket)
10. [地理定位](#地理定位)
11. [拖放 API](#拖放-api)
12. [常见面试题](#常见面试题)

---

## HTML5 新特性

### 核心新特性
1. **语义化标签**: `<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`
2. **表单增强**: 新的 input 类型和属性
3. **多媒体**: `<audio>`, `<video>` 原生支持
4. **Canvas/SVG**: 图形绘制能力
5. **本地存储**: localStorage, sessionStorage, IndexedDB
6. **离线缓存**: Application Cache (已废弃), Service Worker
7. **Web APIs**: Geolocation, Web Workers, WebSocket 等
8. **拖放 API**: Drag and Drop
9. **历史管理**: History API
10. **跨域通信**: postMessage

---

## 语义化标签

### 为什么要使用语义化标签？

#### 优点
1. **提升可读性和可维护性**
   - 代码结构更清晰
   - 开发者更容易理解页面结构

2. **有利于 SEO**
   - 搜索引擎能更好地理解页面内容
   - 提高搜索排名

3. **无障碍访问**
   - 屏幕阅读器能更好地解析内容
   - 提升用户体验

4. **利于团队协作**
   - 统一的语义化规范
   - 降低沟通成本

### 常用语义化标签

```html
<!-- 页面结构 -->
<header>      <!-- 页眉/头部 -->
<nav>         <!-- 导航 -->
<main>        <!-- 主要内容 -->
<article>     <!-- 独立的文章内容 -->
<section>     <!-- 文档中的节 -->
<aside>       <!-- 侧边栏/附加信息 -->
<footer>      <!-- 页脚 -->

<!-- 内容分组 -->
<figure>      <!-- 图片/图表容器 -->
<figcaption>  <!-- 图片说明 -->
<details>     <!-- 可展开的详情 -->
<summary>     <!-- details 的标题 -->
<mark>        <!-- 高亮文本 -->
<time>        <!-- 时间/日期 -->
```

### 实践示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>语义化示例</title>
</head>
<body>
    <header>
        <h1>网站标题</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <header>
                <h2>文章标题</h2>
                <time datetime="2025-01-01">2025年1月1日</time>
            </header>
            <section>
                <h3>第一节</h3>
                <p>内容...</p>
            </section>
            <footer>
                <p>作者：张三</p>
            </footer>
        </article>
        
        <aside>
            <h3>相关推荐</h3>
            <ul>
                <li>推荐文章1</li>
                <li>推荐文章2</li>
            </ul>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2025 版权所有</p>
    </footer>
</body>
</html>
```

---

## 表单增强

### 新增 input 类型

```html
<!-- 日期时间 -->
<input type="date">         <!-- 日期选择器 -->
<input type="time">         <!-- 时间选择器 -->
<input type="datetime-local"> <!-- 本地日期时间 -->
<input type="month">        <!-- 月份选择器 -->
<input type="week">         <!-- 周选择器 -->

<!-- 数值 -->
<input type="number" min="0" max="100" step="1">
<input type="range" min="0" max="100">

<!-- 颜色 -->
<input type="color">

<!-- 联系方式 -->
<input type="email">
<input type="tel">
<input type="url">

<!-- 搜索 -->
<input type="search">
```

### 新增表单属性

```html
<!-- 必填 -->
<input type="text" required>

<!-- 占位符 -->
<input type="text" placeholder="请输入用户名">

<!-- 自动聚焦 -->
<input type="text" autofocus>

<!-- 自动完成 -->
<input type="text" autocomplete="on">

<!-- 模式匹配 -->
<input type="text" pattern="[0-9]{11}" title="请输入11位手机号">

<!-- 多选文件 -->
<input type="file" multiple>

<!-- 表单验证消息 -->
<input type="email" oninvalid="this.setCustomValidity('请输入有效邮箱')">

<!-- 列表选项 -->
<input type="text" list="browsers">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
</datalist>
```

### 表单验证 API

```javascript
// 检查表单有效性
const form = document.querySelector('form');
const input = document.querySelector('input');

// 表单级别验证
if (form.checkValidity()) {
    console.log('表单有效');
}

// 输入框级别验证
if (input.validity.valid) {
    console.log('输入有效');
}

// 获取验证状态
console.log(input.validity.valueMissing);  // 是否为空
console.log(input.validity.typeMismatch);  // 类型不匹配
console.log(input.validity.patternMismatch); // 模式不匹配
console.log(input.validity.tooLong);       // 太长
console.log(input.validity.tooShort);      // 太短
console.log(input.validity.rangeUnderflow); // 小于min
console.log(input.validity.rangeOverflow);  // 大于max
console.log(input.validity.stepMismatch);   // 不符合step

// 自定义验证消息
input.setCustomValidity('自定义错误消息');

// 阻止默认验证
form.noValidate = true;
```

---

## 多媒体 API

### Video API

```html
<video id="myVideo" width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持 video 标签
</video>

<script>
const video = document.getElementById('myVideo');

// 播放控制
video.play();
video.pause();
video.load();

// 音量控制
video.volume = 0.5;  // 0.0 - 1.0
video.muted = true;

// 播放速度
video.playbackRate = 1.5;  // 1.5倍速

// 跳转
video.currentTime = 30;  // 跳转到30秒

// 事件监听
video.addEventListener('play', () => console.log('播放'));
video.addEventListener('pause', () => console.log('暂停'));
video.addEventListener('ended', () => console.log('结束'));
video.addEventListener('timeupdate', () => {
    console.log('当前时间:', video.currentTime);
});
video.addEventListener('loadedmetadata', () => {
    console.log('总时长:', video.duration);
});

// 全屏
video.requestFullscreen();
document.exitFullscreen();
</script>
```

### Audio API

```html
<audio id="myAudio" controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
</audio>

<script>
const audio = document.getElementById('myAudio');

// 创建音频对象
const sound = new Audio('sound.mp3');
sound.play();

// Web Audio API (高级音频处理)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audio);
const gainNode = audioContext.createGain();

source.connect(gainNode);
gainNode.connect(audioContext.destination);

// 音量控制
gainNode.gain.value = 0.5;
</script>
```

---

## 图形绘制

### Canvas 基础

```html
<canvas id="myCanvas" width="500" height="400"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = '#FF0000';
ctx.fillRect(10, 10, 100, 50);
ctx.strokeRect(120, 10, 100, 50);
ctx.clearRect(15, 15, 50, 25);

// 绘制路径
ctx.beginPath();
ctx.moveTo(10, 100);
ctx.lineTo(100, 100);
ctx.lineTo(55, 150);
ctx.closePath();
ctx.stroke();
ctx.fill();

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 125, 40, 0, 2 * Math.PI);
ctx.stroke();

// 绘制文本
ctx.font = '30px Arial';
ctx.fillText('Hello Canvas', 10, 200);
ctx.strokeText('Canvas Text', 10, 240);

// 绘制图片
const img = new Image();
img.onload = function() {
    ctx.drawImage(img, 10, 250, 100, 100);
};
img.src = 'image.jpg';

// 渐变
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(10, 370, 200, 20);

// 保存为图片
const dataURL = canvas.toDataURL('image/png');
console.log(dataURL);
</script>
```

### SVG vs Canvas

| 特性 | SVG | Canvas |
|------|-----|--------|
| 类型 | 矢量图形 | 位图 |
| DOM | 是 | 否 |
| 事件处理 | 容易 | 需手动计算 |
| 性能 | 对象多时慢 | 对象多时快 |
| 缩放 | 不失真 | 会失真 |
| 适用场景 | 图表、图标 | 游戏、图像处理 |

---

## 本地存储

### localStorage vs sessionStorage

```javascript
// localStorage - 永久存储
localStorage.setItem('key', 'value');
localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();
console.log(localStorage.length);
localStorage.key(0);  // 获取第一个键名

// sessionStorage - 会话存储
sessionStorage.setItem('key', 'value');
sessionStorage.getItem('key');

// 存储对象
const user = { name: '张三', age: 25 };
localStorage.setItem('user', JSON.stringify(user));
const storedUser = JSON.parse(localStorage.getItem('user'));

// 监听存储变化
window.addEventListener('storage', (e) => {
    console.log('键名:', e.key);
    console.log('旧值:', e.oldValue);
    console.log('新值:', e.newValue);
    console.log('URL:', e.url);
});

// 注意事项
// 1. 容量限制: 5-10MB
// 2. 只能存储字符串
// 3. 同步操作，可能阻塞
// 4. 同源策略限制
```

### IndexedDB

```javascript
// 打开数据库
const request = indexedDB.open('MyDatabase', 1);

request.onerror = (e) => {
    console.log('数据库打开失败');
};

request.onsuccess = (e) => {
    const db = e.target.result;
    console.log('数据库打开成功');
};

request.onupgradeneeded = (e) => {
    const db = e.target.result;
    
    // 创建对象仓库
    if (!db.objectStoreNames.contains('users')) {
        const objectStore = db.createObjectStore('users', { 
            keyPath: 'id', 
            autoIncrement: true 
        });
        
        // 创建索引
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
    }
};

// 添加数据
function addUser(db, user) {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.add(user);
    
    request.onsuccess = () => {
        console.log('数据添加成功');
    };
}

// 读取数据
function getUser(db, id) {
    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.get(id);
    
    request.onsuccess = (e) => {
        console.log('用户数据:', e.target.result);
    };
}

// 更新数据
function updateUser(db, user) {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.put(user);
    
    request.onsuccess = () => {
        console.log('数据更新成功');
    };
}

// 删除数据
function deleteUser(db, id) {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.delete(id);
    
    request.onsuccess = () => {
        console.log('数据删除成功');
    };
}

// 遍历数据
function getAllUsers(db) {
    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.openCursor();
    
    request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            console.log('用户:', cursor.value);
            cursor.continue();
        }
    };
}
```

### 存储方案对比

| 方案 | 容量 | 过期时间 | 数据类型 | API |
|------|------|---------|---------|-----|
| Cookie | 4KB | 可设置 | 字符串 | document.cookie |
| localStorage | 5-10MB | 永久 | 字符串 | localStorage API |
| sessionStorage | 5-10MB | 会话 | 字符串 | sessionStorage API |
| IndexedDB | 无限制 | 永久 | 任意类型 | IndexedDB API |

---

## 离线应用

### Service Worker

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('Service Worker 注册成功');
        })
        .catch(error => {
            console.log('Service Worker 注册失败', error);
        });
}

// sw.js - Service Worker 文件
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/main.js',
    '/images/logo.png'
];

// 安装事件 - 缓存资源
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// 拦截请求 - 返回缓存或网络
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 缓存命中，返回缓存
                if (response) {
                    return response;
                }
                // 否则发起网络请求
                return fetch(event.request);
            })
    );
});

// 缓存策略

// 1. Cache First (缓存优先)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// 2. Network First (网络优先)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});

// 3. Stale While Revalidate (返回缓存同时更新)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return response || fetchPromise;
            });
        })
    );
});
```

---

## Web Workers

### 基础用法

```javascript
// main.js - 主线程
const worker = new Worker('worker.js');

// 发送消息给 Worker
worker.postMessage({ 
    type: 'START', 
    data: [1, 2, 3, 4, 5] 
});

// 接收 Worker 消息
worker.onmessage = (e) => {
    console.log('收到 Worker 消息:', e.data);
};

// 错误处理
worker.onerror = (error) => {
    console.error('Worker 错误:', error.message);
};

// 终止 Worker
worker.terminate();

// worker.js - Worker 线程
self.onmessage = (e) => {
    const { type, data } = e.data;
    
    if (type === 'START') {
        // 执行耗时计算
        const result = data.reduce((sum, num) => sum + num, 0);
        
        // 发送结果
        self.postMessage({
            type: 'RESULT',
            result: result
        });
    }
};

// 使用场景示例：大数据处理
// main.js
const worker = new Worker('calculator.js');

worker.postMessage({
    operation: 'fibonacci',
    number: 40
});

worker.onmessage = (e) => {
    console.log('斐波那契结果:', e.data);
};

// calculator.js
self.onmessage = (e) => {
    const { operation, number } = e.data;
    
    if (operation === 'fibonacci') {
        function fib(n) {
            if (n <= 1) return n;
            return fib(n - 1) + fib(n - 2);
        }
        
        const result = fib(number);
        self.postMessage(result);
    }
};
```

### Shared Worker

```javascript
// 多个页面共享的 Worker
const worker = new SharedWorker('shared-worker.js');

worker.port.start();

worker.port.postMessage('Hello from page 1');

worker.port.onmessage = (e) => {
    console.log('收到消息:', e.data);
};

// shared-worker.js
const connections = [];

self.onconnect = (e) => {
    const port = e.ports[0];
    connections.push(port);
    
    port.onmessage = (e) => {
        // 广播给所有连接
        connections.forEach(conn => {
            conn.postMessage(e.data);
        });
    };
    
    port.start();
};
```

---

## WebSocket

```javascript
// 创建连接
const socket = new WebSocket('ws://localhost:8080');

// 连接打开
socket.onopen = (e) => {
    console.log('WebSocket 连接已建立');
    socket.send('Hello Server');
};

// 接收消息
socket.onmessage = (e) => {
    console.log('收到消息:', e.data);
    
    // 如果是 JSON 数据
    try {
        const data = JSON.parse(e.data);
        console.log('解析后的数据:', data);
    } catch (err) {
        console.log('普通文本消息:', e.data);
    }
};

// 错误处理
socket.onerror = (error) => {
    console.error('WebSocket 错误:', error);
};

// 连接关闭
socket.onclose = (e) => {
    console.log('WebSocket 连接已关闭', e.code, e.reason);
};

// 发送数据
socket.send('文本消息');
socket.send(JSON.stringify({ type: 'chat', message: 'Hello' }));
socket.send(new Blob(['binary data']));
socket.send(new ArrayBuffer(8));

// 检查连接状态
console.log(socket.readyState);
// WebSocket.CONNECTING (0)
// WebSocket.OPEN (1)
// WebSocket.CLOSING (2)
// WebSocket.CLOSED (3)

// 关闭连接
socket.close(1000, 'Normal closure');

// 完整示例：聊天室
class ChatClient {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.setupEventHandlers();
    }
    
    setupEventHandlers() {
        this.socket.onopen = () => {
            console.log('连接成功');
            this.onConnected?.();
        };
        
        this.socket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            this.onMessage?.(message);
        };
        
        this.socket.onerror = (error) => {
            console.error('连接错误:', error);
            this.onError?.(error);
        };
        
        this.socket.onclose = () => {
            console.log('连接关闭');
            this.onDisconnected?.();
        };
    }
    
    send(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }
    
    close() {
        this.socket.close();
    }
}

// 使用
const chat = new ChatClient('ws://localhost:8080');
chat.onConnected = () => console.log('已连接');
chat.onMessage = (msg) => console.log('新消息:', msg);
chat.send({ type: 'chat', text: 'Hello' });
```

---

## 地理定位

```javascript
// 检查支持
if ('geolocation' in navigator) {
    // 获取当前位置
    navigator.geolocation.getCurrentPosition(
        // 成功回调
        (position) => {
            console.log('纬度:', position.coords.latitude);
            console.log('经度:', position.coords.longitude);
            console.log('精度:', position.coords.accuracy, '米');
            console.log('海拔:', position.coords.altitude);
            console.log('海拔精度:', position.coords.altitudeAccuracy);
            console.log('方向:', position.coords.heading);
            console.log('速度:', position.coords.speed);
            console.log('时间戳:', position.timestamp);
        },
        // 错误回调
        (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.log('用户拒绝访问位置');
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log('位置信息不可用');
                    break;
                case error.TIMEOUT:
                    console.log('请求超时');
                    break;
            }
        },
        // 选项
        {
            enableHighAccuracy: true,  // 高精度
            timeout: 5000,             // 超时时间
            maximumAge: 0              // 缓存时间
        }
    );
    
    // 监听位置变化
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            console.log('位置更新:', position.coords);
        },
        (error) => {
            console.error('监听错误:', error);
        }
    );
    
    // 停止监听
    navigator.geolocation.clearWatch(watchId);
    
    // 实际应用：显示地图
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // 使用百度地图 API
        const map = new BMap.Map('mapContainer');
        const point = new BMap.Point(longitude, latitude);
        map.centerAndZoom(point, 15);
        
        // 添加标记
        const marker = new BMap.Marker(point);
        map.addOverlay(marker);
    });
}
```

---

## 拖放 API

```html
<div id="draggable" draggable="true">可拖拽元素</div>
<div id="dropzone">放置区域</div>

<script>
const draggable = document.getElementById('draggable');
const dropzone = document.getElementById('dropzone');

// 拖拽开始
draggable.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
    e.target.style.opacity = '0.5';
});

// 拖拽结束
draggable.addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
});

// 拖拽进入
dropzone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.target.style.border = '2px dashed #000';
});

// 拖拽经过
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
});

// 拖拽离开
dropzone.addEventListener('dragleave', (e) => {
    e.target.style.border = '';
});

// 放置
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.target.style.border = '';
    
    const data = e.dataTransfer.getData('text/html');
    e.target.innerHTML = data;
});

// 拖拽文件示例
const fileDropzone = document.getElementById('fileDropzone');

fileDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    
    for (let file of files) {
        console.log('文件名:', file.name);
        console.log('文件大小:', file.size);
        console.log('文件类型:', file.type);
        
        // 读取文件
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log('文件内容:', e.target.result);
        };
        reader.readAsText(file);
    }
});

fileDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
});
</script>
```

---

## 常见面试题

### 1. HTML5 有哪些新特性？

**答案：**
- 语义化标签
- 表单增强（新的input类型、表单验证）
- 多媒体支持（audio、video）
- Canvas/SVG 图形绘制
- 本地存储（localStorage、sessionStorage、IndexedDB）
- 离线应用（Service Worker）
- Web APIs（Geolocation、Web Workers、WebSocket）
- 拖放API
- History API
- 跨文档消息传递

### 2. localStorage 和 sessionStorage 的区别？

**答案：**
| 特性 | localStorage | sessionStorage |
|------|-------------|----------------|
| 生命周期 | 永久保存 | 会话期间 |
| 作用域 | 同源所有标签页共享 | 同一标签页 |
| 容量 | 5-10MB | 5-10MB |
| API | 相同 | 相同 |

### 3. 如何实现浏览器内多个标签页之间的通信？

**答案：**
```javascript
// 方法1: localStorage + storage 事件
// 页面A
localStorage.setItem('message', JSON.stringify({
    text: 'Hello',
    timestamp: Date.now()
}));

// 页面B
window.addEventListener('storage', (e) => {
    if (e.key === 'message') {
        const message = JSON.parse(e.newValue);
        console.log('收到消息:', message);
    }
});

// 方法2: Shared Worker
// 页面A和B
const worker = new SharedWorker('shared-worker.js');
worker.port.postMessage('Hello');
worker.port.onmessage = (e) => console.log(e.data);

// 方法3: BroadcastChannel
const channel = new BroadcastChannel('my_channel');
channel.postMessage('Hello');
channel.onmessage = (e) => console.log(e.data);

// 方法4: postMessage (需要获取其他窗口引用)
const otherWindow = window.open('other.html');
otherWindow.postMessage('Hello', '*');
window.addEventListener('message', (e) => {
    console.log('收到消息:', e.data);
});
```

### 4. 什么是语义化标签？为什么要使用？

**答案：**
语义化标签是具有明确含义的HTML标签，如 `<header>`, `<nav>`, `<article>` 等。

优点：
1. 提高代码可读性和可维护性
2. 有利于SEO优化
3. 提升无障碍访问体验
4. 便于团队协作和代码规范

### 5. Canvas 和 SVG 的区别？

**答案：**
| 特性 | Canvas | SVG |
|------|--------|-----|
| 绘制方式 | 脚本绘制（像素） | 标记语言（矢量） |
| 元素 | 单个HTML元素 | 多个图形元素 |
| 修改方式 | 重新绘制 | 修改属性 |
| 事件处理 | 需要手动处理 | 直接绑定事件 |
| 性能 | 对象多时性能好 | 对象少时性能好 |
| 缩放 | 失真 | 不失真 |
| 适用场景 | 游戏、密集图形 | 图表、图标 |

### 6. Web Worker 的作用和使用场景？

**答案：**
作用：在后台线程执行JavaScript，避免阻塞主线程。

特点：
- 独立线程，不影响页面性能
- 不能操作DOM
- 通过消息传递通信

使用场景：
- 复杂计算
- 大数据处理
- 图像处理
- 数据加密解密
- 实时数据分析

### 7. 如何实现网页离线缓存？

**答案：**
```javascript
// 使用 Service Worker
// 1. 注册
navigator.serviceWorker.register('/sw.js');

// 2. sw.js 中缓存资源
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/css/style.css',
                '/js/main.js'
            ]);
        })
    );
});

// 3. 拦截请求返回缓存
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});
```

### 8. WebSocket 与 HTTP 的区别？

**答案：**
| 特性 | WebSocket | HTTP |
|------|-----------|------|
| 连接方式 | 长连接 | 短连接 |
| 通信方向 | 双向 | 单向 |
| 数据格式 | 二进制/文本 | 文本 |
| 协议头 | 小 | 大 |
| 实时性 | 高 | 低 |
| 适用场景 | 聊天、推送 | 普通请求 |

### 9. 如何优化 HTML5 应用性能？

**答案：**
1. **资源优化**
   - 压缩HTML/CSS/JS
   - 使用CDN
   - 图片优化（WebP、懒加载）

2. **缓存策略**
   - 使用Service Worker
   - 合理设置Cache-Control

3. **加载优化**
   - 异步加载脚本
   - 代码分割
   - 预加载关键资源

4. **渲染优化**
   - 减少DOM操作
   - 使用CSS3动画
   - 避免重排重绘

5. **API优化**
   - 使用Web Workers处理耗时任务
   - IndexedDB存储大量数据
   - requestAnimationFrame优化动画

### 10. HTML5 表单验证的优缺点？

**答案：**
**优点：**
- 减少JavaScript代码
- 统一的用户体验
- 自动显示错误提示
- 支持自定义验证消息

**缺点：**
- 浏览器兼容性问题
- 样式难以定制
- 验证规则有限
- 需要后端再次验证

**最佳实践：**
```javascript
// 前端验证 + 后端验证
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // HTML5 验证
    if (!form.checkValidity()) {
        return;
    }
    
    // 自定义验证
    const email = form.email.value;
    if (!validateEmail(email)) {
        form.email.setCustomValidity('邮箱格式不正确');
        return;
    }
    
    // 提交到后端
    fetch('/api/submit', {
        method: 'POST',
        body: new FormData(form)
    });
});
```

---

## 总结

HTML5 带来的新特性极大地提升了Web应用的能力：
- 更丰富的语义化标签提升了代码质量
- 强大的API让Web应用更接近原生应用
- 离线存储和Service Worker实现了PWA
- WebSocket实现了真正的实时通信
- Canvas和WebGL带来了强大的图形能力

掌握这些知识点对于前端面试和实际开发都至关重要！

