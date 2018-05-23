# 状态控制

状态是NoForm中非常重要的一环，通过状态的控制，能够在传统的
新建、编辑、详情的场景中，使用同一份代码，提高开发效率。

除此之外，引入状态的表单，也能够轻松地去应对纷繁复杂的业务需求。

# 组件适配

为了能够更好实现状态控制，开发者需要对引入的组件进行 `"适配"`。
常用的表单组件通常只具有`编辑态`，因此要达到状态控制的目的，我们需要对他们进行改造。

目前我们已经对社区流行的组件库进行了统一的适配，开发者只需要引入这些适配层就可以直接使用了。

* ant.design适配层
* xxx 适配层

对于需要自定义适配层的开发者，请参见[接入自定义组件章节](/docs?md=components/cusom)了解更多。

# 状态枚举

NoForm 认为表单状态分为以下三种类型：`edit(编辑态)`, `preview(预览态)`, `disabled(禁用态)`

# 全局维度

```jsx

this.core.setGlobalStatus('edit'); // 全局设置状态
this.core.getGlobalStatus(); // 获取全局状态

```

# 组件维度（视图控制）

```jsx
<Form>
    <FormItem name="username" status={(values, core) => { // 通过方法返回状态控制
        // 根据values或从core获取到的信息返回一个符合状态枚举的值
        // 不合法的值会被忽略
        return 'preview'; // edit/preview|disabled
    }}>
        <Input />
    </FormItem>
    
    <FormItem name="age" status="preview"><Input /></FormItem> // 直接写状态控制
</Form>

```

视图控制状态在`动态生成组件` 或 `处理复杂状态` 时比较常用。

### 组件维度（核心控制)

```jsx

this.core.setStatus('username', 'edit'); // 设置单个组件的状态
this.core.getStatus('username'); // 获取单个组件的状态

```

