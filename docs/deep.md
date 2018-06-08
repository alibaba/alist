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
const defaultValue = {
    age: 15,
    // user: {
    //     username: 'lily',
    // },
};

let children = [
    (() => {
    let formcore
    return <Form onMount={core => formcore = core} layout={{label: 5, control: 19}} full value={defaultValue}>
        <h3>嵌套if</h3>
        <div className="demo-form">
            {/* <Item name="age"><Input /></Item> */}
            {/* <Item name="user">
                <Form>
                    <Item name="username"><Input /></Item>
                </Form>
            </Item>
            <If when={(value) => {
                // console.log('value', value, value.age, 'bool', (value.age < 18));
                // return value.age < 18
                return value.user && value.user.username === 'bobby';
            }}>
                <Item name="student">
                    <Form>
                        <Item name="studentname"><Input /></Item>
                        <Item name="bus">
                            <Form>
                                <Item name="buscode"><Input /></Item>
                            </Form>
                        </Item>
                    </Form>
                </Item>
            </If> */}
            
            <FormItem label="username" name="username"><Input /></FormItem>
            {/* <FormItem label="age" name="age"><Input /></FormItem>                 */}

            {/* <FormItem label="">
                <div>
                    <div>1. username为bobby时，触发第一层if</div>
                    <div>2. username为bobby, age为23时，触发嵌套if</div>
                </div>
            </FormItem> */}

            {/* <FormItem label="" style={{ margin: '12px 0' }} name="wrapperForm">
                <Form layout={{label: 5, control: 19}} full>
                    <FormItem label="username" name="username"><Input /></FormItem>
                </Form>
            </FormItem> */}
            {/* <FormItem label="" name="deep">
                <Input />
            </FormItem> */}

            {/* <FormItem label="" style={{ margin: '12px 0' }} name="wrapperIf">
                <If when={(values, { globalStatus }) => {
                    console.log('8****', values, '******8');
                    return values.deep === 'abcd';
                }}>
                    <FormItem label="" name="xxx">
                        <div>deep works!</div>
                    </FormItem>
                </If>
            </FormItem> */}

            <If when={(values, { globalStatus }) => {
                return values.username === 'bobby';
            }}>
                {/* <FormItem label="" style={{ margin: '12px 0' }} name="wrapper">
                    <div>
                        hello bobby!
                        <FormItem label="" name="deep">
                            <Input />
                        </FormItem>
                    </div>
                </FormItem> */}
                {/* <If when={(values, { globalStatus }) => {
                    return values.age == 23;
                }}>
                    <FormItem label="" >
                        <div>Congratulation! You've solved the last maze!</div>
                        <If when={(values, { globalStatus }) => {
                            return values.age == 23 && values.deep === 'abcd';
                        }}>
                            <div>xxxx!!!</div>
                        </If>
                    </FormItem>
                </If> */}

                {/* <If when={(values, { globalStatus }) => {
                    return values.deep == 'abcd';
                }}>
                    <FormItem label="" >
                        <div>deep works!</div>
                    </FormItem>
                </If> */}
                <FormItem label="" style={{ margin: '12px 0' }} name="wrapper">
                    <div>
                        hello bobby!
                        <FormItem label="" name="deep">
                            <Input />
                        </FormItem>

                        <If when={(values, { globalStatus }) => {
                                return values.deep == 'abcd';
                            }}>
                            <FormItem label="" name="deepForm">                        
                                <Form layout={{label: 5, control: 19}} full>
                                    <FormItem label="nif" name="nif"><Input /></FormItem>
                                    <FormItem label="dif" name="dif">
                                        <If when={(values, { globalStatus }) => {
                                            return values.nif == 100;
                                        }}>
                                            <FormItem label="" name="nifDeep">
                                                <div>nif 100!!!</div>
                                            </FormItem>
                                        </If>
                                    </FormItem>
                                </Form>
                            </FormItem>
                        </If>
                    </div>
                </FormItem>

                {/* <If when={(values, { globalStatus }) => {
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
                </If> */}
            </If>
            <button onClick={() => console.log(formcore.getValue())}> console value </button>
            </div>
        <br/><br/>
    </Form>
})()
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
