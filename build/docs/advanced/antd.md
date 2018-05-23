# 接入ant.design

由于ant.design拥有众多较高质量的组件，因此 NoForm有面向ant.design的插件机制。
这个插件使的NoForm无缝使用ant.design的表单组件，提升开发效率。

```jsx

import * as Antd from 'antd';
import AntdWrapperPlugn from 'antd-wrapper-plugin';

const { Input, Select, Radio, Button } = AntdWrapperPlugn(Antd);

class Demo extends React.Component {
    mountCore = (core) => { this.core = core }
    render() {
        return <Form onMount={this.mountCore}>
            <FormItem name="username" title="用户名"><Input /></FormItem>
            <FormItem name="gender" title="性别"><Select /></FormItem>
            <Button onClick={this.core.setStatus('preview')}>切换预览状态</Button>
            <Button onClick={this.core.setStatus('edit')}>切换编辑状态</Button>
            <Button onClick={this.core.setStatus('disabled')}>切换禁用状态</Button>
        </Form>
    }
}

```

插件将所有ant.design的组件的数据返回和状态都进行了适配, 结合NoForm达到开箱即用的效果。