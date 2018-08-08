# tpMall
一个小程序商城的基础框架，包括请求，支付 和加解密model 以及es6写法和vue
基于小程序官方的组件化 wepy 架构

在run 本项目之前 你需要安装node js  
然后下载wepy 组件 


安装（更新） wepy 命令行工具。
npm install wepy-cli -g

cd 到你下载的项目工程目录下
进行包的依赖安装 命令
npm i 

然后进行npm run dev  开启同步编译 

目录结构  
|
|src----|
|       |assest------下面放置全局图片
|       |pages ------ 是各个根据业务model 来分离的主要业务
|       |plugins----- 放第三方的插件 比如加解密 
|       |uitls------- 放自定义工具类
|       |
|       |app.vue ----- 该文件是入口文件 

 编译完成之后  node_modules 下面是依赖包  不用管 
 dist 下面是生成的东西 也不用管
 打开微信官方工具选择生成的dist 目录进行预览就行了
 然后开发的时候选择编辑 src下面的文件进行编辑提交代码 不需要提交node_modules 和dist 目录 
 有时候缓存问题可以删除2个目录 重新生成。
