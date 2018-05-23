# 自定义表单组件

# 最简实例Input

定义标准的表单组件主要实现两个位置:

1. 数据变更时通过onChange抛出
2. 外部数据变更时通过componentWillReceiveProps更新内部数据

```jsx

class Input extends React.Component {
    state = {
        v: ''
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    onChange = (e) => {
        this.props.onChange && this.props.onChange(e.target.value);
    }

    render() {
        return <input value={this.state.value} onChange={this.onChange} />
    }
}

```

# 适配组件状态


