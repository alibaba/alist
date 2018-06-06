# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [example.md](./example.md)

---

````js
import Form, { FormItem, Item, If } from '../src';
import '../src/index.scss'

function Input(props){
    let { value, status, error, ...othersProps } = props
    if(value === null || value === undefined){
        value = ''
    }
    if(status === 'preview'){
        return <span>{value}</span>
    }
    return <input type="text" {...othersProps} value={value}/>
}
function Select(props){
    let showName = ''
    const { dataSource = [], status, error, ...othersProps } = props
    const value = props.value || ''
    const children = dataSource.map((item, idx) => {
        return <option key={idx} value={item.value}>{item.label}</option>
    })
    children.unshift(<option key={-1} value="">请选择</option>)
    if(status === 'preview'){
        return <span>{showName || ''}</span>
    }
    return <select {...othersProps} value={value}>{ children }</select>
}
let children = [
(() => {
    const defaultValue = {
        username: 'username',
        password: 'password'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue} layout={{label: 5, control: 19}} full>
        <h3>基础form</h3>
        <div className="demo-form">
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="zero" name={0}><Input /></FormItem>
            <FormItem label="password" name="password"><Input /></FormItem>
        </div>
        <br/><br/>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        password: 'password'
    }
    const newValue = {
        username: 'newuser',
        password: 'newpass'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>基础form-调用setvalue</h3>
        <div className="demo-form">
            <p>通过调用setValue来控制表单的值</p>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="password" name="password"><Input /></FormItem>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(newValue)}> set value </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        user:[]
    }
    const newValue = {
        user:[3,4,5]
    }
    let formcore
    function Custom(props){
        let value = props.value || []
        function change(){
            props.onChange([1,2,3,4])
        }
        return <span>{value.join()} <button onClick={change}>change</button> </span>
    }
    return <Form onMount={core => formcore = core} value={defaultValue} layout={{label: 5, control: 19}} full>
        <h3>自定义组件</h3>
        <div className="demo-form">
            <p>当点击按钮时触发onchange,值为数组</p>
            <FormItem label="user" name="user">
                <Custom></Custom>
            </FormItem>
            </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(newValue)}> set value </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    return <Form layout={{label: 5, control: 19}} full>
        <h3>嵌套if</h3>
        <div className="demo-form">
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>                

            <FormItem label="">
                <div>
                    <div>1. username为bobby时，触发第一层if</div>
                    <div>2. username为bobby, age为23时，触发嵌套if</div>
                </div>
            </FormItem>

            <If when={(values, { globalStatus }) => {
                return values.username === 'bobby';
            }}>
                <FormItem label="" style={{ margin: '12px 0' }}>
                    <div>
                        hello bobby!
                        <FormItem label="" name="deep">
                            <Input />
                        </FormItem>
                    </div>
                </FormItem>

                <If when={(values, { globalStatus }) => {
                    return values.age == 23;
                }}>
                    <FormItem label="" >
                        <div>Congratulation! You've solved the last maze!</div>
                    </FormItem>
                </If>

                <If when={(values, { globalStatus }) => {
                    return values.deep == 'abcd';
                }}>
                    <FormItem label="" >
                        <div>deep works!</div>
                    </FormItem>
                </If>
            </If>
            </div>
        <br/><br/>
    </Form>
})(),
(() => {
    const defaultValue = {
        user:{
            username: 'username',
            password: 'password'
        }
    }
    const newValue = {
        user:{
            username: 'newuser',
            password: 'newpass'
        }
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue} layout={{label: 5, control: 19}} full>
        <h3>嵌套form</h3>
        <div className="demo-form">
            <p>复杂表单中有些项的值可能的对象的情况</p>
            <FormItem label="user" name="user">
                <Form layout={{label: 5, control: 19}} full>
                    <FormItem label="username" name="username">
                        <Input />
                    </FormItem>
                    <FormItem label="password" name="password">
                        <Input />
                    </FormItem>
                </Form>
            </FormItem>
            </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(newValue)}> set value </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        user:{
            username: 'username',
            password: 'password'
        }
    }
    let formcore
    return <Form onMount={core => formcore = core} status="preview" value={defaultValue} layout={{label: 5, control: 19}} full>
        <h3>default status(preview)</h3>
        <div className="demo-form">
            <FormItem label="user" name="user">
                <Form layout={{label: 5, control: 19}} full>
                    <FormItem label="username" name="username">
                        <Input />
                    </FormItem>
                    <FormItem label="password" name="password">
                        <Input />
                    </FormItem>
                </Form>
            </FormItem>
            </div>
        <br/><br/>
        <button onClick={() => formcore.setStatus('preview')}> set status preview </button>
        <button onClick={() => formcore.setStatus('edit')}> set status edit </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        age: '18',
        gender: 'male'
    }
    const newValue = {
        username: 'bojoy',
        password: 'password',
        gender: 'male'
    }
    let formcore
    return <Form value={defaultValue}
            onMount={core => window.cc = formcore = core}>
        <h3>条件判断标签If</h3>
        <div className="demo-form">
            <FormItem label="username" name="username">
                <Input></Input>
            </FormItem>
            <FormItem label="zero" name={0}>
                <Input></Input>
            </FormItem>
            <FormItem label="age" name="age" {...{
                top: 'age top',
                prefix: 'age prefix',
                suffix: 'age suffix',
                help: 'age help'
            }}>
                <Input></Input>
            </FormItem>
            <FormItem label="gender" name="gender" when={value => {
                return value.age > 18
            }}>
                <Input></Input>
            </FormItem>
        </div>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        password: 'password'
    }
    const newValue = {
        username: 'bojoy',
        password: 'password',
        gender: 'male'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>条件判断标签If</h3>
        <div className="demo-form">
            <p>一个字段依赖另一个或几个字段来判断是否展示的情况</p>
            <FormItem name="username" label="username"><Input /></FormItem>
            <FormItem name="password" label="password"><Input /></FormItem>
            <If when={value => value.username === 'bojoy'}>
                <FormItem name="gender" label="gender"><Input /></FormItem>
            </If>
            </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue(newValue)}> show 'gender' </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'nouser',
        password: 'nopass'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>条件判断标签If(If嵌套If)</h3>
        <div className="demo-form">
            <p>If标签有嵌套的情况</p>
            <FormItem name="username" label="username"><Input /></FormItem>
            <FormItem name="password" label="password"><Input /></FormItem>
            <If when={value => value.username === 'bojoy'}>
                <FormItem name="gender" label="gender"><Input /></FormItem>
                <If when={value => value.password === 'password'}>
                    <div id="success">登录成功</div>
                </If>
            </If>
            </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue({
            username: 'bojoy',
            password: 'nopass'
        })}> show 'gender' </button>
        <button onClick={() => formcore.setValue({
            username: 'bojoy',
            password: 'password'
        })}> show 'success' </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        age: 19
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>条件判断标签If(If嵌套Form)</h3>
        <div className="demo-form">
            <p>一个复杂字段依赖另一个字段的情况</p>
            <FormItem name="age" label="age"><Input /></FormItem>
            <If when={value => value.age < 18}>
                <FormItem name="user" label="user">
                    <Form>
                        <FormItem name="username" label="username"><Input /></FormItem>
                    </Form>
                </FormItem>
            </If>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue({
            age: 15,
            user: {
                username: 'lily'
            }
        })}> show 'user' </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        age: 19
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>条件判断标签If(If嵌套Form, Form内有If)</h3>
        <div className="demo-form">
            <p>更加复杂的嵌套逻辑</p>
            <FormItem name="age" label="age"><Input /></FormItem>
            <If name="userif" when={value => value.age < 18}>
                <FormItem name="user" label="user">
                    <Form>
                        <FormItem name="username" label="username"><Input /></FormItem>
                        <If name="genderif" when={value => value.username === 'bojoy'}>
                            <FormItem name="gender" label="gender"><Input /></FormItem>
                            <If name="successif" when={value => value.username === 'bojoy' && value.gender === 'female'}>
                                <div id="success">success</div>
                            </If>
                        </If>
                    </Form>
                </FormItem>
            </If>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue({
            age: 5,
            user: {
                username: 'lily'
            }
        })}> show 'user' </button>
        <button onClick={() => formcore.setValue({
            age: 5,
            user: {
                username: 'bojoy',
                gender: 'male'
            }
        })}> show 'user gender' </button>
        <button onClick={() => formcore.setValue({
            age: 5,
            user: {
                username: 'bojoy',
                gender: 'female'
            }
        })}> show 'success' </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        password: 'password'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>status 切换</h3>
        <div className="demo-form">
            <p>通过调用setStatus来控制表单的状态</p>
            <FormItem name="username" label="username"><Input /></FormItem>
            <FormItem name="password" label="password"><Input /></FormItem>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setStatus('edit')}> reset </button>
        <button onClick={() => formcore.setStatus('preview')}> set preview </button>
        <button onClick={() => formcore.setStatus('username', 'preview')}> set username preview </button>
        <button onClick={() => formcore.setStatus('username', 'edit')}> set username edit </button>
        <button onClick={() => formcore.setStatus('username', 'disabled')}> set username disabled </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'default',
        password: 'password'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>status 可以为函数</h3>
        <div className="demo-form">
            <p>当满足一定条件时,动态更新字段的status<br />
               username 为 bojoy password 为 preview <br/>
               username 为 username password 为 preview <br/>
               username 为 其他 password 为 edit</p>
            <FormItem name="username" label="username"><Input /></FormItem>
            <FormItem name="password" label="password" status={value => {
                if(value.username === 'bojoy')
                    return 'preview'
                else if(value.username === 'username')
                    return 'disabled'
                else
                    return 'edit'
            }}><Input /></FormItem>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue('username', '')}> reset </button>
        <button onClick={() => formcore.setValue('username', 'bojoy')}> set username 'bojoy' </button>
        <button onClick={() => formcore.setValue('username', 'username')}> set username 'username' </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'default',
        password: 'password'
    }
    const newValue = {
        username: 'hhh',
        password: 'eee'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>dynamic Item</h3>
        <div className="demo-form">
            <p>支持render函数,在form有onchange时,会重新执行render方法<br />
               组件不再需要监听onChange,然后再setState来管理数据了</p>
            <FormItem name="username" label="username"><Input /></FormItem>
            <FormItem name="password" label="password"><Input /></FormItem>
            <Item render={(value) => {
                return <div>
                    username is {value.username} <br />
                    password is {value.password}
                </div>
            }}></Item>
            </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue(newValue)}> set value </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'default',
        password: 'password'
    }
    const newValue = {
        username: 'bojoy',
        password: 'eee'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue}>
        <h3>根据form字段值变更某一项的属性</h3>
        <div className="demo-form">
            <p>字段的展示可能会根据其他项的值变化<br />
               username 为 bojoy 时 password 的 label 变成 pass prefix 变为 word</p>
            <FormItem name="username" label="username"><Input /></FormItem>
            <FormItem name="password" label="password" props={(props, form) => {
                const username = form.getValue('username')
                if(username === 'bojoy'){
                    return {
                        ...props,
                        label: 'pass',
                        prefix: 'word'
                    }
                }else{
                    return props
                }
            }}><Input /></FormItem>
            <Item render={(value, form) => {
                return <div>
                    username is {value.username} <br />
                    password is {value.password} <br />
                    password label is {form.getProps('password').label} <br />
                    password prefix is {form.getProps('password').prefix}
                </div>
            }}></Item>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue(newValue)}> set value </button>
        <button onClick={() => formcore.setValue('username', 'bojoy')}> set username </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        age: '18',
        gender: 'male'
    }
    const validateConfig = {
        username: {type: "string", required: true},
        age: [
            {type: "number", required: true, transform(value) {
              return parseInt(value, 10)
            }},
            {validator(rule, value, callback, source, options) {
                if(value < 18){
                    callback(['too young']);
                }
                callback([])
            }}
        ],
        gender: {type: "string", required: true, min: '1'}
    }
    let formcore
    return <Form value={defaultValue}
            onMount={core => formcore = core}
            validateConfig={validateConfig}
            onChange={() => formcore.validate()}>
        <h3>表单校验</h3>
        <div className="demo-form">
            <p>
                如果需要实时校验,需要在onChange中调用formcore.validate()<br />
                username 必填 <br />
                age 必填 小于18 <br />
                gender 必填 [male, femal]之一 <br />
            </p>
            <FormItem label="username" name="username" required>
                <Input></Input>
            </FormItem>
            <FormItem label="age" name="age" required {...{
                top: 'age top',
                prefix: 'age prefix',
                suffix: 'age suffix',
                help: 'age help'
            }}>
                <Input></Input>
            </FormItem>
            <FormItem label="gender" name="gender" required when={value => value.age > 18}>
                <Input></Input>
            </FormItem>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue({
            username: '',
            age: 5,
            gender: 'unkown'
        })}> set value </button>
        <button onClick={() => formcore.validate(console.log)}> validate </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        age: '18',
        gender: 'male'
    }
    const validateConfig = {
        username: {type: "string", required: true},
        age: [
            {type: "number", required: true, transform(value) {
              return parseInt(value, 10)
            }},
            {validator(rule, value, callback, source, options) {
                if(value < 18){
                    callback(['too young']);
                }
                callback([])
            }}
        ],
        gender: {type: "enum", required: true, enum: ['male', 'female']}
    }
    let formcore
    return <Form value={defaultValue}
            onMount={core => formcore = core}
            onChange={() => formcore.validate()}
            validateConfig={validateConfig}>
        <h3>表单校验(动态变换校验规则)</h3>
        <div className="demo-form">
            <p>
                username 必填 <br />
                age 必填 小于18 <br />
                gender 必填 [male, femal]之一 <br />
                当username为bojoyzhou时,不校验age和gender<br />
            </p>
            <FormItem label="username" name="username" required>
                <Input></Input>
            </FormItem>
            <FormItem label="age" name="age" required {...{
                top: 'age top',
                prefix: 'age prefix',
                suffix: 'age suffix',
                help: 'age help'
            }} validateConfig={(config, form) => {
                if(form.getValue('username') === 'bojoyzhou'){
                    return null
                }
                return config
            }} props={(props, form) => {
                if(form.getValue('username') === 'bojoyzhou'){
                    return {
                        ...props,
                        required: false
                    }
                }
                return {
                    ...props,
                    required: true
                }
            }}>
                <Input></Input>
            </FormItem>
            <FormItem label="gender" name="gender" required
            validateConfig={(config, form) => {
                if(form.getValue('username') === 'bojoyzhou'){
                    return null
                }
                return config
            }} props={(props, form) => {
                if(form.getValue('username') === 'bojoyzhou'){
                    return {
                        ...props,
                        required: false
                    }
                }
                return {
                    ...props,
                    required: true
                }
            }}>
                <Input></Input>
            </FormItem>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue({
            username: 'bojoyzhou',
            age: 5,
            gender: 'unkown'
        })}> set value </button>
        <button onClick={() => formcore.validate(console.log)}> validate </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        password: 'password'
    }
    let formcore
    return <Form value={defaultValue}
            onMount={core => formcore = core}>
        <h3>表单校验(校验规则在子项上)</h3>
        <div className="demo-form">
            <p>
                username 不为 username时 age 必填
            </p>
            <FormItem label="username" name="username">
                <Input></Input>
            </FormItem>
            <FormItem label="password" name="password">
                <Input></Input>
            </FormItem>
            <FormItem label="age" name="age" validateConfig={(config, ff) => {
                if(ff.getValue('username') === 'bojoyzhou'){
                    return null
                }
                return {
                    type: 'string',
                    required: true
                }
            }} props={(props, ff) => {
                if(ff.getValue('username') === 'bojoyzhou'){
                    return {
                        ...props,
                        required: false
                    }
                }else{
                    return {
                        ...props,
                        required: true
                    }
                }
            }}>
                <Input></Input>
            </FormItem>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setValue(defaultValue)}> reset </button>
        <button onClick={() => formcore.setValue({
            username: 'bojoyzhou',
            password: 'eee'
        })}> set value </button>
        <button onClick={() => formcore.validate(console.log)}> validate </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const defaultValue = {
        username: 'username',
        password: 'password'
    }
    let formcore
    return <Form onMount={core => formcore = core} value={defaultValue} onChange={console.log}>
        <h3>setProps(promise混合if)</h3>
        <div className="demo-form">
            <p>
                username 为 1 时,延迟 1s 设置 input 的 placeholder
            </p>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="password" name="password"><Input /></FormItem>
            <If when={value => !!value.username}>
                <FormItem label="gender" name="gender" props={(props, ff) => {
                    if(ff.getValue('username') === '1'){
                        return new Promise(resovle => {
                            setTimeout(() => {
                                resovle({
                                    ...props,
                                    placeholder: 'promise'
                                })
                            }, 1000)
                        })
                    }
                    return {
                        ...props,
                        placeholder: ''
                    }
                }}><Input /></FormItem>
            </If>
        </div>
        <br/><br/>
        <button onClick={() => formcore.setProps('username', {
            disabled: true
        })}> disabled </button>
        <button onClick={() => formcore.setProps('username', {
            disabled: false
        })}> reset disabled </button>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
(() => {
    const resultDataSource = [{value: '异常不予退税', label: '异常不予退税'}]
    const reasonDataSource = [{value: 'reasonDataSource', label: 'reasonDataSource'}]
    const exceptionDataSource = [{value: 'exceptionDataSource', label: 'exceptionDataSource'}]

    let formcore
    return <Form onMount={core => formcore = core} onChange={console.log}>
        <h3>setProps(promise混合if)</h3>
        <div className="demo-form">
            <p>
                更多的场景是,当选择了一个值后,需要发请求,然后生成新的表单字段,这个过程是异步的,这个特性就十分有用了
            </p>
            <FormItem  label="判断结果" name="result">
                <Select dataSource={resultDataSource}></Select>
            </FormItem>
            <If when={value => {
                return !!value.result
            }}>
                <FormItem  label="原因" name="reason" props={(props, form) => {
                    if(form.getValue('result')){
                        return new Promise(resovle => {
                            setTimeout(() => {
                                return resovle({
                                    ...props,
                                    dataSource: reasonDataSource
                                })
                            }, 1000)
                        })
                    }else{
                        return {
                            ...props,
                            dataSource: []
                        }
                    }
                }}>
                    <Select></Select>
                </FormItem>
                <FormItem  label="异常环节" name="exception" props={(props, form) => {
                    if(form.getValue('result')){
                        return new Promise(resovle => {
                            setTimeout(() => {
                                return resovle({
                                    ...props,
                                    dataSource: exceptionDataSource
                                })
                            }, 1500)
                        })
                    }else{
                        return {
                            ...props,
                            dataSource: []
                        }
                    }
                }}>
                    <Select></Select>
                </FormItem>
                <FormItem  label="函件说明" name="desc">
                    <Input multiple placeholder="multiple" />
                </FormItem>
            </If>
        </div>
        <br/><br/>
        <button onClick={() => console.log(formcore.getValue())}> console value </button>
    </Form>
})(),
]

ReactDOM.render(<div>
    <style>
        {`
        body{
            width: 800px;
            margin: 0 auto;
        }
        button{
            margin-right: 20px;
            margin-bottom: 15px;
        }
        input{
            height: 28px;
            padding-left: 5px;
            font-size: 14px;
        }
        button{
            font-size:14px;
            padding: 5px 10px;
        }
        .demo-form{
            padding: 10px;
            background-color: #eee;
        }
        .demo-form p{
            margin: -10px -10px 10px;
            padding: 5px 10px;
            background-color: #d9d9d9;
        }
        `}
    </style>
    {children.map((child, key) => React.cloneElement(child, { key }))}
</div>, mountNode)
````
