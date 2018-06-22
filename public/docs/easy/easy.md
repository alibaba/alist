# 快速开始

### 安装

```bash
$ npm install --save noform
```

### 初体验

```onlydemo
const { default: Form, FormItem, FormCore } = noform;
const { Button } = antd;

const Input = ({ value = '', status }) => { // 模拟input
    if (status === 'edit') {
        return <input value={value} />
    } else {
        return <div>presenting preview val: {value}</div>
    }
};

const age = 'age';

class App extends React.Component {
    componentWillMount = () => { // 初始化表单核心
      this.core = new FormCore();
    }
    
    setValue = () => {
      const agenum = this.core.getValue(age);
      this.core.setValue(age, parseInt(agenum || 0) + 1);
    }
    
    setStatus = () => {
      const agestatus = this.core.getStatus(age);
      this.core.setStatus(age, agestatus === 'edit' ? 'preview' : 'edit' );
    }

    render() { // 注入核心        
        return <Form core={this.core}>
          <FormItem name="age" label="age"><Input /></FormItem>
          <FormItem label="">
            <div>
              <Button style={{ marginRight: 8 }} onClick={this.setValue}>plus 1</Button>
              <Button onClick={this.setStatus}>toggle status</Button>
            </div>
          </FormItem>

          <p>点击plus1 查看age改变，点击toggle status会切换编辑和预览状态</p>
        </Form>
    }
}

ReactDOM.render(<App />, document.getElementById('demo'));
```

### 代码实现

```jsx
import Form, { FormItem, FormCore } from 'noform'; // 引入

const Input = ({ value = '', status }) => { // 模拟input
    if (status === 'edit') {
        return <input value={value} />
    } else {
        return `presenting preview val: ${value}`
    }
};

class App extends React.Component {
    componentWillMount () => { // 初始化表单核心
        window.core = this.core = new FormCore();
    }

    setValue = () => {
      const agenum = this.core.getValue(age);
      this.core.setValue(age, parseInt(agenum || 0) + 1);
    }
    
    setStatus = () => {
      const agestatus = this.core.getStatus(age);
      this.core.setStatus(age, agestatus === 'edit' ? 'preview' : 'edit' );
    }

    render() { // 注入核心        
        return <Form core={this.core}>
            <FormItem name="username" label="username"><Input /></FormItem>
            <FormItem label="">
                <div>
                    <Button style={{ marginRight: 8 }} onClick={this.setValue}>plus 1</Button>
                    <Button onClick={this.setStatus}>toggle status</Button>
                </div>
            </FormItem>
        </Form>
    }
}
```

把core挂载到window的原因是在开发时，可以非常方便地在控制台执行修改或查看表单当前的所有数据。


### 后续

* [Ant Design最佳实践](/docs?md=easy/best-practise-antd)
