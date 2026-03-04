# 春招八股

进程间通信ipc  Inter-Process Communication。
beforeunload 事件 pagehide 事件

- 从url 输入到页面展示，中间经历了什么，越详细越好。
1. 首先，浏览器进程接收到用户输入的URL 请求，浏览器进程将该URL 转发给网络进程。
  - URL 补全标准URL 带上http(s) ://www.
  - 根据域名（domain）去查询 IP 地址。
    DNS 是一个分布式的数据库。


  - DNS 解析
    一个网址和IP 地址之间的转换过程。
  - DNS 缓存
    - 浏览器缓存
    - 操作系统缓存
    - 路由器缓存
    - 本地DNS 服务器缓存
  - 发起TCP 连接
    - 三次握手  确保双方都具有请求发送的能力
      - 第一次握手 客户端发送SYN 包到服务器，进入SYN_SENT 状态。
      - 第二次握手 服务器收到SYN 包，发送SYN-ACK 包到客户端，进入SYN_RECV 状态。
      - 第三次握手 客户端收到SYN-ACK 包，发送ACK 包到服务器，进入ESTABLISHED 状态。
    - 四次挥手
      - 第一次挥手 客户端发送FIN 包到服务器，进入FIN_WAIT_1 状态。
      - 第二次挥手 服务器收到FIN 包，发送ACK 包到客户端，进入FIN_WAIT_2 状态。
      - 第三次挥手 服务器发送FIN 包到客户端，进入LAST_ACK 状态。
      - 第四次挥手 客户端收到FIN 包，发送ACK 包到服务器，进入CLOSED 状态。
    - 发送HTTP 请求 
      - 发送请求行和请求头
        GET URL http 版本
        请求头 jwt token Authorization
        cookie
      - 发送响应头， 解析响应头数据，并将数据转发给浏览器进程。
        Content-Type  浏览器根据响应头中的Content-Type 来判断响应体的类型。
        text/html -> 渲染进程准备接收
        text/css  image 下载
        document mp3 等其他资源 下载
        状态码
      - 浏览器接收到“提交导航” 的信息后，便开始准备接受HTML 数据，接受数据的方式是直接和**网络进程**建立数据管道。
      - 最后渲染进程会向浏览器进程 确认提交导航，已经准备好接受和解析页面数据。
      - 浏览器进程接收到渲染进程“提交文档”消息后，便开始移除之前旧的文档，然后更新浏览器进程中的页面状态，进入loading状态

      用户发出URL 请求 到页面开始解析的整个过程，就叫导航。

      响应头 301 .....

- http://time.geekbang.org 
  服务器 301/302  
  Location: http://www.time.geekbang.org

