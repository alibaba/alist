# 示例

- layout: default
- order: 0

如何基于 markdown 来写组件 DEMO

---

## 插入 JS

说明:

1. \`\`\`\`js (4 个 \`) 表示 js 代码可被执行
2. 此处 js 会自动引入 React 和 ReactDOM 两个库, 因此不要重复引入
3. 此处代码的书写规范, 和 src 目录中源码的一致
4. 请不要直接引用相对路径, 而是引用模块, 比如 `import "example"`
5. ReactDOM 在 render 时, 节点变量固定为 `mountNode`

````js
class Example extends React.Component {
  render () {
    return (
      <div>这是一个示例模块</div>
    )
  }
}

ReactDOM.render(<Example />, mountNode)
````

## 插入 CSS

说明:

1. \`\`\`\`css (4 个 \`) 表示可 css 会被插入到页面中
2. 只支持 css, 不支持 scss 或 less
3. @import 的模块地址必须是 CDN 地址或线上地址

````css
body {
  background: #CCC;
}
````

## 插入 HTML

说明: \`\`\`\`html (4 个 \`) 表示此处的 HTML 会被插入到当前位置

````html
<p>这是一段被插入 HTML 的代码</p>
````

## 插入 `<head/>` 标签 

在 HTML 头部插入 `<head/>` (如 meta 标签)

1. \`\`\`\`html:head (4 个 \`) 表示此处的 HTML 会被插入到 `<head/>` 标签中
2. 多个 html:head 会先合, 再插入 `<head/>`

````html:head
<meta name="foo" value="bar" />
````

## 其它

其它均按标准的 markdown 语法书写即可

```js
console.log('此处代码不会被执行, 只会直接显示')
```