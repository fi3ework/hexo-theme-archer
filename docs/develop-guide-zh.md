# hexo-theme-archer 开发文档

🧑‍🔧 对 Archer 主题进行开发前请阅读本文档。

## 目录结构

假设当前目录结构为：

```bash
. # 📄 Hexo 根目录
├── source # 博客文件等
├── themes
│   └── archer # 🎨 Archer 主题目录
│       ├── docs # 文档目录
│       ├── languages # 多语言配置
│       ├── layout # 模板目录
│       ├── source # html 模板文件，供 Hexo 加载
│       ├── src # 源代码目录，会编译到 archer 目录下的 source 目录中
│       │    ├── js # js 源代码
│       │    └── scss # scss 源代码
│       ├── _config.yml # Archer 主题配置文件
│       └── package.json
├── _config.yml # Hexo 配置文件
└── package.json
```

- 📖 如果需要修改**页面结构**，请修改 Archer 主题目录下 `layout` 中的 `.ejs` 模板文件；
- 🧑‍🎨 如果需要修改**样式**，请修改 Archer 主题目录下 `src/scss` 中的 `.scss` 样式文件；
- 🧬 如果需要修改**脚本**，请修改 Archer 主题目录下 `src/js` 中的 `.js` 脚本文件。

对样式 `.scss` 和脚本 `.js` 文件的修改需要进行编译，请继续阅读下面的[开发步骤](#开发步骤)。

## 开发步骤

在 Hexo 根目录下的配置文件 `_config.yml` 中加入以下字段忽略 `node_modules` 和 `.git` 目录。

```yaml
ignore:
  [
    '**/themes/**/node_modules/**',
    '**/themes/**/node_modules',
    '**/themes/**/.git',
    '**/themes/**/.git/**',
  ]
```

### 安装依赖

如果尚未安装 Node.js，请下载并安装 [14.x 版本](https://nodejs.org/dist/latest-v14.x/)。推荐使用 nvm（[Windows](https://github.com/coreybutler/nvm-windows), [Linux](https://github.com/nvm-sh/nvm)）来管理当前使用的 Node.js 版本。

Archer 主题开发依赖于 `node-sass^8.0.0`，对于国内开发者，可以设置安装源，避免在本地编译：

```bash
npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass
```

分别在 Hexo 根目录和 Archer 主题目录下执行 `npm install` 命令，安装依赖文件。

### 本地开发

在修改源代码时可以实时自动编译并刷新预览。

1. 如果有，请首先删除 Hexo 根目录下的 `public` 文件夹，或在 Hexo 根目录下执行 `hexo clean` 命令。避免已生成的静态文件对开发造成干扰。
2. 在 Hexo 根目录下执行 `hexo s` 启动 Hexo 服务。
3. 在 Archer 主题目录下执行 `npm run dev` 进入本地开发模式。该模式会代理 Hexo 服务，监听 Archer 主题目录下 `src` 和 `layout` 中文件的修改，实时进行编译，然后通过 BrowserSync 在 `localhost:3000`（默认）下自动刷新页面。对其他位置的文件修改并不会触发页面刷新，可能需手动重启 Hexo 服务或本地开发。

### 编译发布

编译压缩，发布资源。

#### 用户

您可以：

1. 在 Archer 主题目录下执行 `npm run build`。编译并压缩博客的样式和脚本文件。
2. 在 Hexo 根目录下执行 `hexo g`。重新生成 Hexo 博客静态文件。
3. 推送代码到博客仓库。

#### 开发者

您可以：

1. 在 Archer 主题目录下执行 `npm run prettier`。检查并自动修复 `.scss` 和 `.js` 代码格式。
2. 在 Archer 主题目录下执行 `npm run build`。编译并压缩博客的样式和脚本文件。
3. 推送代码到主题仓库。

**⚠ NOTE**

- 在推送前，请确保已使用 `npm run build` 命令编译生成压缩好的 `.js` 与 `.css` 文件，它们可以分别在 Archer 主题目录下 `source/scripts` 和 `source/css` 目录中找到。
- 如果编译没有生成 `.js` 文件，可以使用 `npm run build-js` 命令，查看编译失败的原因。对于 `.css` 文件，执行 `npm run build` 时会自动显示出现的错误。
