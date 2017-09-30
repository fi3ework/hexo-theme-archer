# Archer二次开发须知

对archer进行二次开发前请阅读本文档。

## 目录结构

- `docs` : 文档目录
- `layout` : 模板目录
- `source` : 编译生成的主题资源，供主题加载
- `source-src` : 源代码目录，需编译到source目录
  - `js` : javascript源代码
  - `scss` : scss源代码

如果需要修改页面结构，请修改`layout`中的ejs模板文件；如果需要修改样式，请修改`source-src\scss`中的scss文件；如果需要修改脚本，请修改`source-src\js`中的js文件。对scss和js的修改需要编译才能生成到`source`中，请参照下面的开发步骤。

**提示：**如果`hexo s`或`hexo g`很慢，在**Hexo配置文件**中加入

```yml
ignore: ['**/themes/**/node_modules/**', '**/themes/**/node_modules', '**/themes/**/.git', '**/themes/**/.git/**']
```

字段手动忽略modules和.git文件。

## 开发步骤

1. 安装依赖：在archer目录下执行`npm install`安装所需依赖（速度过慢的话请使用淘宝镜像）。

后续步骤开发分为**本地开发**，及**编译发布**两个过程。**本地开发**模式在修改源代码时可以实时自动编译并刷新预览，**编译发布**模式为**本地开发**完成后编译压缩最终发布的资源。（当然也可以跳过**本地开发**步骤直接修改源代码然后执行**编译发布**）。

**注意**：在开发时请先删除Hexo目录下的`public`文件夹避免造成干扰。

### 本地开发

1. 在Hexo目录下运行`hexo s`启动本地服务器。
2. 在archer目录下执行`gulp dev`进入本地开发模式。

该模式会监视`source-src`中和`layout`下的文件修改，实时进行编译，然后通过`browser-sync`在`localhost:3000`（默认）下自动刷新页面（其他位置的文件修改并不会自动刷新页面，需手动刷新）。

### 编译发布

1. 在archer目录下执行`gulp build`即可进行编译。

编译完成后便可生成发布。