# AIGC 时代如何搞数据库

- sql?
  CRUD  
- AIGC sql 自然语义数据库操作

## sqlite3
- 简单，好用的文本关系型数据库
- 微信
  需要本地数据库 Mysql 不适合
- 操作sqlite 带来本地存储

- 链接一下
  数据库独立于后端业务(http web)
  - 独立的数据库实体
  sqlite3.connect('test.db')
  - sql?
  sql 数据库能理解的语法
  llm 改变
  自然语言去操作数据库，生成sql
  - cursor 游标 句柄
  - sql execute 执行
  cursor.execute(sql) 

## sql prompt engineer
- AI sql 助手 
  sql 也是文本， 只不过它是数据库的专业语言
  AIGC 再擅长不过
- 前端，借助prompt 弥补sql 短板，或提高sql编写效率
- 可以兼职搞sql 任务
- prompt 设计规则
    - 提供了上下文 table schema 
    - 自然语言的查询指令给它