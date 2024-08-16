创建数据库模型
mongoose,首先在电脑上要安装MongoDB Server，可去官网下载，用来通过shell在本机启动服务
可以下载图形化显示工具如Navicat或Robo 3T来显示连接情况

相关语法：
mongod --install --dbpath 数据目录 --logpath 日志目录\日志名称	#创建服务
mongod --remove	    #卸载服务		
net start mongodb	#启动服务
net stop mongodb	#关闭服务
mongod #是处理MongoDB系统的主要进程。它处理数据请求，管理数据存储，和执行后台管理操作。当我们运行mongod命令意味着正在启动MongoDB进程,并且在后台运行。
