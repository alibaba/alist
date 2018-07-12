```i18n

# 自定义表单组件

# 最简实例Input

定义标准的表单组件主要实现两个位置:

1. 数据变更时通过onChange抛出
2. 外部数据变更时通过componentWillReceiveProps更新内部数据

@sep

# Custom Component

# Input

There are two places that need to pay attension to:

1. when component's value change, it should notice outside by `onChange`.
2. when component receive new value, it should implement `componentWillReceiveProps` and update value.

```

```jsx

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    onChange = (e) => {        
        const formatValue = `format: ${e.target.value}`; // 在这里可以做一些value的调整
        this.props.onChange && this.props.onChange(formatValue);
    }

    render() {
        return <input value={this.state.value} onChange={this.onChange} />
    }
}

```

```i18n

# 适配组件状态
@sep

# Adapt Component's Status

```


```jsx

const Input = (props) => {
    const returnEle = '';
    const { status } = props;
    switch (status) {
        case 'edit': returnEle = 'Edit'; break;
        case 'preview': returnEle = 'Preview'; break;
        case 'disabled': returnEle = 'Disabled'; break;
    }

    return <div>{returnEle}</div>
}

```