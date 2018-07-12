```i18n

# 接入 Ant Design（按需加载）

Ant Design配套有一个非常酷的功能，`babel-plugin-import` 带来的按需加载。

但是NoForm的wrapper机制和按需加载有冲突，因此引入`babel-plugin-wrapper`, 如需查看实际使用例子，可以访问[examples](https://github.com/alibaba/noform/tree/master/examples)

@sep

# Ant Design (demand import)

Ant Design use `babel-plugin-import` to remove redundancy. And you also need to install `babel-plugin-wrapper` if you are using NoForm's wrapper.

You can check the real [examples](https://github.com/alibaba/noform/tree/master/examples) here.

```

### import

```i18n

使用了`babel-plugin-wrapper`后，使用的方式也会变得方便

@sep

using `babel-plugin-wrapper` also simpify the way import.

```

```jsx
import { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
    Rate, Cascader, TreeSelect, Upload, Modal, InputNumber, AutoComplete } from 'noform/lib/wrapper/antd'; // Form related Component
import { Alert, Icon, Button } from 'antd'; // Other Component

import DialogForm from 'noform/lib/dialog/antd'; // DialogForm
import { TableRepeater, InlineRepeater } from 'noform/lib/repeater/antd'; // Repeater

```
