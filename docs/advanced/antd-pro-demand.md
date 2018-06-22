# 接入 Ant Design Pro

Ant Design Pro天然集成了按需加载，但是NoForm的wrapper机制和按需加载有冲突，因此需要引入`babel-plugin-wrapper`。

### install

```shell
$ npm install --save-dev babel-plugin-wrapper
$ npm install --save noform
```

### 配置

修改.webpackrc.js 的 `extraBabelPlugins`

```js
export default {
  // ...
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ['wrapper',{}]
  ],
  // ...
```
