# 联动

联动是表单领域不可回避的问题，复杂的联动常常让开发者抓耳挠腮，
NoForm通过If组件，提供最基础、使用的联动能力，助力开发者应对联动问题。

# If 怎么玩？

```jsx
    <Form>
        <FormItem name="username" label="姓名">
            <Input />
        </FormItem>
        <If when={(values, globalStatus, core) => {
            return values.username === 'bobby';
        }}>
            <div>确实是bobby</div>

            <If when={...} />
            <FormItem ... />
        </If>
    </Form>
```

如上所示，If通过when函数来判断是否显示，when的入参为：

* values 表单的值集合
* globalStatus 表单的全局状态
* core 表单核心

当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分。

> If支持嵌套If，如上述代码块所示，并且不限制返回的内容。