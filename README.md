# koa2-mongoDB



1.首先需要开启mongodb    开启命令 mongod
2.mongo 命令     
（1）show  dbs  显示所有数据库
（2）db  显示当前所在数据库
（3）use  data（数据库）  切换到data数据库
（4）show  tables  显示所有的集合
（5）db.site.find()  查找site集合里面的所有数据
（6）db.site.findOne()  查找site集合里面的第一条数据


安装mongoDB可视化工具  Robo 3T 1.2.1
(参考文档) https://www.cnblogs.com/dacongge/p/7346037.html

db.getCollection('sings').find({name:"kk"},{"name":1}).linmit()

npm install koa
