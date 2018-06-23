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

### import

使用了`babel-plugin-wrapper`后，使用的方式也会变得方便

```jsx
import { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
    Rate, Cascader, TreeSelect, Upload, Modal, InputNumber, AutoComplete } from 'noform/lib/wrapper/antd'; // 表单控件
import { Alert, Icon, Button } from 'antd'; // 一般控件

import DialogForm from 'noform/lib/dialog/antd'; // DialogForm
import { TableRepeater, InlineRepeater } from 'noform/lib/repeater/antd'; // Repeater

```
