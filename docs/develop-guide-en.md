# hexo-theme-archer develop document

Please read this document before secondary development of archer.

## Directory Structure

- `docs` : document directory
- `layout` : html template directory, it will be load by Hexo 
- `source` : distribution files, include css, scripts and static files
- `src` : source directory, will compiled to source directory
  - `js` : js source code
  - `scss` : scss source code

Edit *.ejs file in `layout` if you want to change Html structure; Edit *.scss in  `src/scss` if you want to change style; Edit js files in  `src/js` if you want to change script. The modification to scss and js will be compiled before generated to `source`. Please read the following development steps.

**NOTE:** If `hexo s` and `hexo g` takes a long time, please add following field to **_config in Hexo directory** to ignore modules and .git file.

```yml
ignore: ['**/themes/**/node_modules/**', '**/themes/**/node_modules', '**/themes/**/.git', '**/themes/**/.git/**']
```

## Development Steps

1. Install package: run `npm i` in archer directory to install package.

The following steps are **local development** and **distribution**. When in **local development**, the modified files will be compiled and the browser will be reloaded automatically. Run **distribution** after local development to distribute files to source (It's ok to skip local development. You can edit the source code and run distribution directly).

**NOTE:** Please delete `public` in Hexo directory to avoid disturb. 

### Local development

1. run `hexo s` in Hexo directory to start server.
2. run `gulp dev` to start watching

In this mode, files in `src` and `layout` will be watched and compiled, the browser will be reloaded automatically via BrowserSync at `localhost:3000` (modification to other files will not trigger reload, you need to reload it manually).  

### Distribution

1. run `gulp build` in archer directory and the files will be compiled to `source`

You can generate you blog after distribution.