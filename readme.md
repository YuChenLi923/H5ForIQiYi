# H5ForIQiYi



这是为2017爱奇艺全国高校技术大赛准备的H5应用。


## 项目目录结构


``` 

├── blueMonPlayerWebApp/      
    │  
    │
    ├── docs/ 存放第三库的说明文档，后台的接口文档
    │
    │
    ├──  build/ 打包后的文件
    │    ├──   resource/   静态资源目录
    │    │ 		 ├── css/   css文件目录
    │	 │ 		 ├── images/  图片目录	
    │    │       ├── fonts/  字体文件目录
    │    │ 
    │    ├──  vendor/ 第三方库资源
    │    │
    │    ├──  controls/ 控制逻辑的JS文件      
    │    │ 
    │	 └──  views/   渲染UI的JS文件
    │	
    │        
    ├── src/ 源文件
    │    │
    │    ├──   resource/   静态资源目录
    │    │ 		 ├── scss/   scss文件目录
    │	 │ 		 ├── images/  图片目录	
    │    │       ├── fonts/  字体文件目录
    │    │ 
    │    ├──  libs/ 库资源
    │    │
    │    ├──  controls/ 控制逻辑的JS文件      
    │    │ 
    │	 └──  views/   渲染UI的JS文件  
    │	 
    ├── .babelrc babel配置文件  	
    ├── .editorconfig 编辑器配置文件  
    ├── webpack.config.js webpack配置文件  
    └── package.json  npm配置文件   
     
```   

## 安装

### 使用cnpm代替npn安装

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

```

### 安装所有依赖包


```
cnpm install

```

