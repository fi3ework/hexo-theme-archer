# hexo-theme-archer 二次开发文档

对 Archer 主题进行二次开发前请阅读本文档。

## 目录结构

假设当前目录结构为：

```bash
. # Hexo 根目录
├── source
├── themes
│   └── archer # Archer 主题目录
│       ├── docs # 文档目录
│       ├── languages # 多语言配置
│       ├── layout # 模板目录
│       ├── source # html 模板文件，供 Hexo 加载
│       ├── src # 源代码目录，会编译到 archer 目录下的 source 目录中
│       │    ├── js # js 源代码
│       │    └── scss # scss 源代码
│       │
│       ├── _config.yml # Archer 主题配置文件
│       └── package.json
│
├── _config.yml # Hexo 配置文件
└── package.json
```

如果需要修改页面结构，请修改 `layout` 中的 .ejs 模板文件；如果需要修改样式，请修改 `src/scss` 中的 .scss 文件；如果需要修改脚本，请修改 `src/js` 中的 .js 文件。

对 .scss 和 .js 的修改需要编译才能生成到 `source` 中，请参照下面的开发步骤。

## 开发步骤

在 Hexo 根目录下的配置文件 `_config.yml` 中加入以下字段忽略 `node_modules` 目录和 .git 文件。

```yaml
ignore: ['**/themes/**/node_modules/**', '**/themes/**/node_modules', '**/themes/**/.git', '**/themes/**/.git/**']
```

### 安装依赖

在 Archer 主题目录下执行 `npm i` 安装所需依赖。

### 本地开发

在修改源代码时可以实时自动编译并刷新预览。

1. 如果有，请首先删除 Hexo 根目录下的 `public` 文件夹。
2. 在 Hexo 根目录下执行 `hexo s` 启动本地服务器。
3. 在 Archer 主题目录下执行 `npm run dev` 进入本地开发模式。

该模式会监听 Archer 主题目录下 `src` 和 `layout` 中文件的修改，实时进行编译，然后通过 BrowserSync 在 `localhost:3000`（默认）下自动刷新页面。其他位置的文件修改并不会自动刷新页面，需手动重启服务。

### 编译发布

编译压缩，发布资源。

1. 在 Archer 主题目录下执行 `npm run build`，编译并压缩博客依赖的 `.js` 与 `.css` 文件到 `source` 文件夹下。
2. 在 Hexo 根目录下执行 `hexo generate` 重新生成 Hexo 博客静态文件。
3. 推送代码到仓库。

在推送前，请确保已使用 `npm run build` 命令编译并压缩 `.js` 与 `.css` 文件，您可以分别在 `source/scripts` 和 `source/css` 目录下找到它们。

如果编译没有生成 `.js` 文件，可以使用 `npm run build-js` 命令，查看编译失败的原因。对于 `.css` 文件，执行 `npm run build` 时会自动显示出现的错误。
