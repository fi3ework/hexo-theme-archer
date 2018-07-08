# hexo-theme-archer 二次开发文档

对 archer 进行二次开发前请阅读本文档。

## 目录结构

- `docs` : 文档目录
- `layout` : 模板目录
- `source` : html 模板文件，供 Hexo 加载
- `src` : 源代码目录，会编译到 source 目录
  - `js` : js 源代码
  - `scss` : scss 源代码

如果需要修改页面结构，请修改 `layout` 中的 ejs 模板文件；如果需要修改样式，请修改 `src/scss ` 中的 scss 文件；如果需要修改脚本，请修改 `src/js` 中的 js 文件。对 scss 和 js 的修改需要编译才能生成到 `source` 中，请参照下面的开发步骤。

**提示：**如果 `hexo s` 或 `hexo g` 很慢，在 **Hexo 目录下的配置文件**中加入以下字段忽略 node_modules 和 .git 文件。

```yaml
ignore: ['**/themes/**/node_modules/**', '**/themes/**/node_modules', '**/themes/**/.git', '**/themes/**/.git/**']
```

## 开发步骤

1. 安装依赖：在 archer 目录下执行 `npm i` 安装所需依赖（速度过慢的话请使用淘宝镜像）。

后续步骤开发分为**本地开发**，及**编译发布**两个过程。**本地开发**时在修改源代码时可以实时自动编译并刷新预览，**编译发布**在**本地开发**完成后编译压缩发布资源。（当然也可以跳过**本地开发**步骤直接修改源代码然后执行**编译发布**）。

**注意**：在开发时请先删除 Hexo 目录下的 `public` 文件夹避免造成干扰。

### 本地开发

1. 在 Hexo 目录下执行 `hexo s` 启动本地服务器。
2. 在 archer 目录下执行 `npm run dev` 进入本地开发模式。

该模式会监视 `src` 和 `layout` 下的文件修改，实时进行编译，然后通过 BrowserSync 在 `localhost:3000` （默认）下自动刷新页面（其他位置的文件修改并不会自动刷新页面，需手动刷新）。

### 编译发布

1. 在 archer 目录下执行 `npm run build` 即可编译到 `source` 文件夹下。

编译完成后便可生成重新生成 blog。