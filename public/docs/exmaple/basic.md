# 实战场景

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
const { Input, Select, Button } = antd;

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
        </Form>
    }
}

ReactDOM.render(<App />, mountNode);






```