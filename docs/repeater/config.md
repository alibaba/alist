```i18n

# 通用配置

Repeater 抽象了日常的表单列表 CRUD的操作，使用起来会减少很多代码，不过由于内置了逻辑，因此开放了配置供开发者调整。

查看DEMO可以直接看到更详细的配置，请参考[Repeater 配置](https://alibaba.github.io/noform/examples/build/#/repeaterConfig)

### 文案配置

@sep

# Common Config

Since Repeater can make it more easier to make list fo form, which can save lots of time doing CRUD work and noform also provide config to make repeater you want.

Check this DEMO for more detail[Repeater Configuration](https://alibaba.github.io/noform/examples/build/#/repeaterConfig)

### Text Config

```

![text - add and delete](https://img.alicdn.com/tfs/TB1r5HBXAvoK1RjSZFNXXcxMVXa-677-167.png)
![text - save update and cancel](https://img.alicdn.com/tfs/TB1ExDBXCzqK1RjSZFHXXb3CpXa-570-141.png)

```jsx
const textProps = {
    // defaultValue
    addText: 'add',
    updateText: 'update',
    saveText: 'save',
    cancelText: 'cancel',
    deleteText: 'delete',
    operateText: 'operate'
}

<InlineRepeater {...textProps}>
```

```i18n

### 显示配置

> 注意: 这里并没有 `hasSave` 或 `hasCancel` 的配置，是因为这是个中间状态，并且这两个元素是维持这个状态的关键。

@sep

### Show Config

> Notice: There is no `hasSave` or `hasCancel` because these btn is key to this middle state.

```

```jsx
const hasProps = {
    hasAdd: true,
    hasUpdate: true,
    hasDelete: true,
    hasHeader: true,
    hasDeleteConfirm: true,
    addPosition: 'top' ('top' | 'bottom')
};

<InlineRepeater {...hasProps}>
```

```i18n

### InlineRepeater 配置

分为两种模式: 

* `multiple` 为 `true` 是进入同步更新模式
* `multiple` 为 `false` 则为拥有 `save` 和 `cancel` 的暂存模式。 (默认)

@sep

### InlineRepeater Config

There is 2 mode for InlineRepeater: 

* `multiple` equals `true` is sync mode
* `multiple` equals `false` is save mode  (Default Mode)

```

![InlineRepeater multiple](https://img.alicdn.com/tfs/TB13NPGXxTpK1RjSZR0XXbEwXXa-687-275.png)


```i18n

### SelectRepeater 配置

分为两种模式: 

* `selectMode` 为 `single` 单选模式(默认)
* `selectMode` 为 `multiple` 多选模式

@sep

### SelectRepeater Config

There is 2 mode for SelectRepeater: 

* `selectMode` equals `single` is single mode(Default Mode)
* `selectMode` equals `multiple` is multiple mode

```

```jsx

<SelectTableRepeater selectMode="single" >

```

![selectMode](https://img.alicdn.com/tfs/TB1D7rHXCzqK1RjSZFpXXakSXXa-683-251.png)

```i18n

### Dialog 配置

通用的弹窗配置功能, 通常用于 TableRepeater 或者 删除的确认弹窗

以下属性可以修改: `className`, `title`, `content`, `footer(function|JSX)`

@sep

### Dialog Config

Dialog Config for TableRepeater or confirm dialog of `delete`

These fields are free to modify: `className`, `title`, `content`, `footer(function|JSX)`

```

```jsx
const dialogConfig = {
    custom: (core, type, props) => {
        const { onOk } = props; // original ok action
        const customProps = {
            className: 'address-dialog-wrapper',
        };

        // type: add|update|remove
        if (type === 'update') {
            customProps.title = this.dialogTitle;
            customProps.content = (<Form core={core} full layout={{label: 8, control: 16}}>
                <FormItem label="xxx" name="xxx"><Input /></FormItem>
            </Form>);
        } else if (type === 'add') { // remove
            customProps.title = this.dialogTitle;
        } else if (type === 'remove') {
            customProps.className = 'address-dialog-wrapper-remove';
        }

        customProps.footer = (hide) => {
            const bindOk = onOk.bind(null, null, () => {
                hide();
            });
            return <div>
                <LoadingButton style={{marginTop: '12px', minWidth: '80px', width: '80px'}} type="primary"
                    onClick={bindOk}>确定</LoadingButton>
            </div>;
        };
        return customProps;
    }
}

<InlineRepeater dialogConfig={dialogConfig} >

```

```i18n

### 限制最长数量

maxLength (since: `0.0.95`)

@sep

### maxLength

maxLength (since: `0.0.95`)

```

```i18n

### 添加按钮位置

addPosition: 'top' | 'bottom'

@sep

### addPosition

addPosition: 'top' | 'bottom'

```

```i18n

### 对齐方式

itemAlign: 'left' | 'center' | 'right'

@sep

### itemAlign

itemAlign: 'left' | 'center' | 'right'

```

```jsx

<InlineRepeater maxLength={5} >

```