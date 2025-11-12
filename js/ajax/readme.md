# Ajax
Asynchronous JavaScript and XML

- const xhr =new XMLHttpRequest()
- 打开一个请求
    xhr.open('GET', url, true)
- 发送请求
    xhr.send()
- 监听状态改变
    xhr.onreadystatechange = function() {
        
    }