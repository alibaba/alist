# Quick Start

### Install

```bash
$ npm install --save noform
```

```i18n

### 初体验

@sep

First Sight

```

```onlydemo
const { default: Form, FormItem, FormCore } = noform;
const { Button } = antd;

const Input = ({ value = '', status }) => { // Mock Dumb Component Input
    if (status === 'edit') {
        return <input value={value} />
    } else {
        return <div>presenting preview val: {value}</div>
    }
};

const age = 'age';

class App extends React.Component {
    componentWillMount = () => { // initialized FormCore
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

    render() { // inject formCore
        return <Form core={this.core}>
          <FormItem name="age" label="age"><Input /></FormItem>
          <FormItem label="">
            <div>
              <Button style={{ marginRight: 8 }} onClick={this.setValue}>plus 1</Button>
              <Button onClick={this.setStatus}>toggle status</Button>
            </div>
          </FormItem>

          <p>Click plus1 to modify age, Click toggle to change status</p>
        </Form>
    }
}

ReactDOM.render(<App />, document.getElementById('demo'));
```

```i18n
### 代码实现
@sep
### Implement
```


```jsx
import Form, { FormItem, FormCore } from 'noform';

const Input = ({ value = '', status }) => { // Mock Dumb Component Input
    if (status === 'edit') {
        return <input value={value} />
    } else {
        return `presenting preview val: ${value}`
    }
};

class App extends React.Component {
    componentWillMount () => { // initialized FormCore
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

    render() { // inject formCore
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

```i18n
把core挂载到window的原因是在开发时，可以非常方便地在控制台执行修改或查看表单当前的所有数据。
@sep
The reason why assign core as glocbal variable is we can easily modify it in browser console.
```

```i18n
### 后续

* [Ant Design最佳实践](/docs?md=easy/best-practise-antd)
@sep

### Follow up

* [Ant Design Best Practise](/docs?md=easy/best-practise-antd)

```