

```i18n
# 结合 Ant Design 最佳实践

本文会使用create-react-app作为脚手架，然后在创建的工程里使用 NoForm 和 antd 组件 的结合，快速的编写表单应用。

当然，你也可以直接clone [这个项目](https://github.com/quirkyshop/noform-start-app)

@sep
# Best Practise with Ant Design

We are going to use `create-react-app` to generate start-up prject, and use `NoForm` and `antd` to write our form application.

You can also just clone [this repo](https://github.com/quirkyshop/noform-start-app)

```

```i18n
### 安装和初始化
@sep
### Install and Initialization
```

```shell
$ npm install -g create-react-app
```

```i18n
### 新建项目
@sep
### Create start-up project
```

```shell
npx create-react-app noform-app
cd noform-app
npm start
```

```i18n
当然你也可以使用yarn，这里不赘述了。看到 `Welcome to React` 就表示已经创建成功了，接下来我们接入antd组件和NoForm。

### 引入antd和NoForm
@sep
There is no doubt you can use `yarn`.
If means everything goes well, it should renders a header saying "Welcome to React" on the page.
Then we start import antd and NoForm.

### Import antd and NoForm
```

```shell
$ npm install --save antd noform
```

```i18n
### 配置优化

create-react-app最酷的一点是，人们不需要任何配置就可以把React应用run起来，但是修改配置的时候又会很痛苦。
[react-app-rewired](https://github.com/timarney/react-app-rewired)就是解决这个痛点的社区方案。
@sep
The best part of create-react-app is people can run React Application by zero config.But it is painful when we need to customize the default webpack config. We can achieve that by using [react-app-rewired](https://github.com/timarney/react-app-rewired) which is one of create-react-app's custom config solutions.

```

```shell
$ npm install --save-dev react-app-rewired
```

```i18n
### 加载less样式
@sep
### Use less
```

```shell
$ npm install --save react-app-rewire-less
```



```i18n
### 按需加载

既然是最佳实践，一定是最优的配置方案，这里采用Ant Design的官方解决方案 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)。

为了使NoForm更好结合Ant Design, 这里也安装NoForm的按需加载插件babel-plugin-wrapper。

并且加入babel-polyfill支持 async 和 await。
@sep
### Use less

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is a babel plugin for importing components on demand. For better combined `NoForm` with `antd`,we also need `babel-plugin-wrapper`.

babel-polyfill here for async and await。
```


```shell
$ npm install --save-dev babel-plugin-import babel-plugin-wrapper babel-polyfill
```

```i18n
### 编写配置

在项目根目录下生成 `config-overrides.js` 文件，并且输入以下内容。
@sep
### Custo config for react-app-rewire

Then create a `config-overrides.js` at root directory of your project for further overriding.
```

```js
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = injectBabelPlugin(['wrapper', {}], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#1DA57A" },
    javascriptEnabled: true,
  })(config, env);
  return config;
};
```

```i18n
### 脚本更新
@sep
### Modify package.json.
```

```js
// package.json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
},

```

### Coding!

```i18n
配置撸完了，现在着手编写代码吧。

1. 首先编写样式文件
@sep
Let's Coding.

1. style
```

```jsx
// src/App.less
@import '~antd/dist/antd.less';
@import '~noform/dist/index.css';
@import '~noform/dist/wrapper/antd.css';
```

```i18n
2. 编写主要代码
@sep
2. Main Code
```

```jsx
// src/App.js
import 'babel-polyfill';
import React, { Component } from 'react';
import Form, { FormItem, FormCore, If } from 'noform';
import { Input, Select } from 'noform/lib/wrapper/antd';
import { Button } from 'antd';
import './App.less';

const dataSource = [
    { label: 'optA', value: 'optA'},
    { label: 'optB', value: 'optB'}
];

class App extends Component {
    constructor(props, context) {
        super(props, context);
        window.core = this.core = new FormCore();
    }

    setStatus = (status) => {
        this.core.setGlobalStatus(status);
    }

    render() {
        return (
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <FormItem label="input" name="input"><Input /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                <If when={(values, { globalStatus }) => {
                    return !!values.select;
                }}>
                <FormItem label="bingo!"><span>🎉</span></FormItem>
                </If>
                <FormItem label="Global status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.core.reset.bind(this.core)}>Clear</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

export default App;
```

```i18n
3. 重新启动
@sep
3. Restart
```

```jsx
$ npm start
```

### Wow

```i18n
当你能够顺利切换状态的时候，恭喜你！已经完成了最佳实践的教程，现在可以继续查看其它文档。

### 参考资源

[Ant Design - 在 create-react-app 中使用](https://ant.design/docs/react/use-with-create-react-app-cn)
@sep
Congratulation! You are finished this since you can change status successfully.
Now, feel free to check out other documents.

### Resources

[Ant Design in create-react-app ](https://ant.design/docs/react/use-with-create-react-app-cn)
```
