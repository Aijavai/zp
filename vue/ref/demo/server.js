// node 服务器端代码
// node 内置的http 模块
// require 模块化机制  node 早期的 commonjs 模块机制 旧的
// 大型项目中, 分目录(mvc)，分文件(类), 项目不可能是一个文件
// js 前端早期是没有模块化的  esm 是2015年才有的 早期的js 任务简单
// import esm
// no module -> node(全栈, commonjs) -> es6(esm 升级)
const http = require("http");  // commonjs 
const url = require("url");    // url

// 数据
const users = [
  {
    "id": 1,
    "name": "舒俊",
    "email": "123@qq.com"
  },
  {
    "id": 2,
    "name": "陈俊璋",
    "email": "1232@qq.com"
  },
   {
    "id": 3,
    "name": "徐行",
    "email": "121@qq.com"
  }
]

function generateUserHTML(users) {
    const userRows = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>
    `).join('');
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User List</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
        </style>
    </head>
    <body>
        <h1>Users</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${userRows}
            </tbody>
        </table>
    </body>
    </html>
    `
}
// req 用户请求
// res 响应对象
// http 是基于请求响应的简单协议 
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl);
    if (parsedUrl.path.name === '/'
        || parsedUrl.pathname === '/users') {
            res.statusCode = 200; // 响应头 状态码
            res.setHeader('Content-Type', 'text/html;chatset=utf-8');
            const html = generateUserHTML(users);
            res.end(html);
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', "text/plain");
            res.end('Not Found');
        }
})

server.listen(1234, () => {
    console.log('Server is running on port 1234');
})