# AI 全栈项目

## 技能点
### 前端
- react + typescript
- react router
- zustand
- axios

### 后端
- nodejs + ts
- nodejs 企业级别后端开发框架
- psql 数据库
- redis 缓存数据库
### AI
- langchain
- coze/n8n
- llm
- trae/cursor

## 项目安排
- frontend 前端项目
- backend 后端项目
- ai_server ai
- admin 后台管理系统

## git 操作
- 全新的项目
  - git init


## react 全家桶
### react-router-dom
- 前端路由
  - BrowserRouter / 需要html55 history api 支持，ie11 之前不支持，现在的浏览器几乎都支持
  - HashRouter #/ 丑一点 兼容性好
  
### 路由有多少种？
- 普通路由
- 动态路由 /product/:id
- 通配路由 *
- 嵌套路由 Outlet
- 鉴权路由（路由守卫） ProtectRoute
- redirect 重定向路由 Navigate
### 路由生成访问历史
  history 栈 先进后出
  replace redirect 跳转，会替换当前的历史纪录
### 单页应用
- 传统的开发是多页的，基于http 请求， 每次url 发生改变后，去服务器请求整个页面。
体验不好，页面会白一下 
- 单页应用 react-router-dom html5 history
  前端路由
  路由改变后
  前端会收到一个事件，将匹配的新路由显示在页面上

## typescript
强类型静态语言
- 安装 ts
- ts 的优点
  - 静态类型
  - 边写边检查bug
  - 编译时检查类型错误

### zustand 状态管理
如果说国家需要有中央银行，那么前端项目就需要中央状态管理系统。zustand \redux
- 组件 = UI + State
- store 将状态存到store 仓库中管理
  全局共享
- 基于hooks 思想实现的

## 数据库设计
- 关系型数据库 mysql\postgresql
是一种以二维表格（行/列） 组织存储数据，通过主键(primary key)
外键简历表格间逻辑关联，遵循ACID 事务特性保证数据一致性和可靠性的数据库。
表Table users 类
row 实例化对象
column 字段 （属性）

### 主键
...
### ACID
- 事务 transaction 数据库操作的最小单位
A 原子性 要么都成功，要么全部失败回滚。
C 一致性 数据库从一个一致状态转换到另一个一致状态。
I 隔离性 多个事务并发执行时，每个事务都感觉不到其他事务的存在。
D 持久性 事务一旦提交，其对数据库的改变就会永久保存。

### psql 
#### 基本操作
- \list 列出所有数据库
创建数据库
CREATE DATABASE xuebi WITH OWNER=postgres ENCODING = 'UTF-8';
进入数据库
\c xuebi
#### prompt 建表
```
你是一位psql 高级工程师， 需要设计一个users 表，
包含id, name, password 三个字段。id 自增， 主键，name 不能重复，
请给出建表sql 

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                -- 自增主键 ID
    name VARCHAR(50) NOT NULL UNIQUE,     -- 用户名：非空且唯一约束
    password_hash VARCHAR(255) NOT NULL,  -- 密码哈希值：非空 (严禁存明文)
);
```
#### 初始化数据
INSERT INTO users (name, password_hash) VALUES
('zhangsan', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.G.2.e.e.e.e.e.e'),
('lisi', '$2b$12$KIXxT.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x'),
('wangwu', '$2b$12$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd'),
('zhaoliu', '$2b$12$123456789012345678901234567890123456789012345678901234'),
('sunqi', '$2b$12$TestHashValueForSunQiUserPasswordNeverStorePlainText');


## nestjs
### express 及简框架
nestjs 企业级开发，基于typescript 框架，采用模块化架构和依赖注入，
旨在构建高效、可扩展且易于维护的企业级后端应用

- npm i -g @nestjs/cli
- nest new nest-test-demo  -- 新建项目

### nestjs 理解
- 工厂模式 
- main.ts 入口文件
- Module
  app.module.ts


### http 请求动作
语义化 restful 一切皆资源
Method + url 定义方式 
- GET/POST 等
- PUT 上传（更新）头像
- PATCH 局部更新 nickname password...
- DELETE 删除用户
















## 图片懒加载
- img src http 请求 并发
  - 需要加载的图片，首页首屏
  图片用占用图片 （小），优先去加载html,css, 首屏的显示速度优先。
  - 视图窗口（viewport）之外的 不需要加载
    onscroll 事件 节流 滚动到哪里懒加载进入视窗的图片


