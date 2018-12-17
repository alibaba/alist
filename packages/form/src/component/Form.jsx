import React from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import FormCore from '../core/form';
import { STATUS_ENUMS, CHANGE, FOCUS, BLUR, INITIALIZED } from '../static';
import FormContext from '../context/form';
import IfContext from '../context/if';
import ItemContext from '../context/item';
import DialogContext from '../context/dialogForm';

const noop = () => {};
const noopEle = () => null;
const Component = React.PureComponent;
class Form extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onMount: PropTypes.func,
        map: PropTypes.func,
        full: PropTypes.bool,
        colon: PropTypes.bool,
        style: PropTypes.object,
        children: PropTypes.any,
        className: PropTypes.any,
        direction: PropTypes.string,
        dialogFooter: PropTypes.func,
        onDialogMount: PropTypes.func,
        core: PropTypes.instanceOf(FormCore),
        validateConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        value: PropTypes.object,
        error: PropTypes.object,
        status: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        globalStatus: PropTypes.string,
        props: PropTypes.object,
        Com: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }

    static defaultProps = {
        onChange: noop,
        onFocus: noop,
        onBlur: noop,
        onMount: noop,
        onDialogMount: noop,
        dialogFooter: noopEle,
        colon: true,
        map: v => v,
        core: null,
        validateConfig: null,
        value: null,
        error: null,
        status: STATUS_ENUMS.EDIT,
        globalStatus: STATUS_ENUMS.EDIT,
        props: null,
        Com: 'div',
    };

    constructor(props) {
        super(props);
        const { item, value, onChange } = props;

        // 初始化core
        if (props.core) {
            this.core = props.core;
        } else {
            // 无core则自定义生成不需要处理onChange, 使用jsx上的
            const mrProps = { ...props };
            delete mrProps.onChange;
            this.core = new FormCore(mrProps);
        }

        // 绑定事件和视图
        this.didMount = false;
        this.core.jsx = this;
        this.core.on(CHANGE, this.onChange);
        this.core.on(FOCUS, this.props.onFocus);
        this.core.on(BLUR, this.props.onBlur);

        // 嵌套Form
        if (item) {
            this.item = item;
            this.core.parent = item;
            if (!this.item.predictChildForm) {
                // this.core.value = this.item.value; // 补齐
            }
        }

        this.core.top = this.getTopForm();
    }

    componentDidMount() {
        const {
            validateConfig, map, value, core,
        } = this.props;

        this.didMount = true;
        this.props.onMount(this.core); // 返回core
        this.props.onDialogMount(this.core);
        this.core.emit(INITIALIZED, this.core);

        // 校验规则
        if ('validateConfig' in this.props && validateConfig) {
            this.core.setValidateConfig(validateConfig);
        } else if (core && 'validateConfig' in core && core.validateConfig) {
            this.core.setValidateConfig(core.validateConfig);
        }

        // 初始化赋值，map为格式化方法
        if ('value' in this.props && value) {
            this.core.setValueSilent(map(value));
        }

        // 静默更新初始化interceptor
        if (Object.keys(this.core.interceptor).length > 0) {
            this.core.setValueSilent({});
        }

        // 嵌套绑定当前form
        if (this.item) {
            this.item.bindForm(this.core);
        }

        // 强制渲染一次
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
        // 根据属性来配置
        if (!deepEqual(nextProps.value, this.props.value)) {
            if ([null, undefined].indexOf(nextProps.value) !== -1) {
                this.core.reset();
            } else {
                this.core.setValueSilent(nextProps.value);
            }            
        }
        if (!deepEqual(nextProps.props, this.props.props)) {
            this.core.setProps(nextProps.props);
        }
        if (!deepEqual(nextProps.status, this.props.status)) {
            this.core.setStatus(nextProps.status);
        }
        if (!deepEqual(nextProps.globalStatus, this.props.globalStatus)) {
            this.core.setGlobalStatus(nextProps.globalStatus);
        }
        if (!deepEqual(nextProps.error, this.props.error)) {
            this.core.setError(nextProps.error);
        }
    }

    // 核心变化时，通知jsx属性绑定的onChange
    onChange = (val, fireKey) => {
        this.props.onChange(val, fireKey, this.core);
    }

    getTopForm = () => {
        let top = this.core;
        let current = this.core;
        while (current.parent) {
            if (current.parent.form) {
                current = current.parent.form;
                top = current;
            }
        }

        return top;
    }

    // 补齐跨越嵌套引起的属性丢失
    getLeapNestProps = () => {
        const result = {};
        if (this.item) {
            const {
                predictChildForm, jsx, form, name,
            } = this.item;

            if (!predictChildForm) {
                // if (jsx) result.onChange = jsx.onChange;
                // if (form && name) result.value = form.getValue(name);
            }
        }

        return result;
    }

    renderFooter = () => {
        const { layout } = this.props;
        const { dialogFooter } = this.props;
        return dialogFooter({ layout });
    }

    render() {
        // 默认布局为垂直布局
        const {
            Com, full, style = {}, children, className = '', direction = 'vertical',
        } = this.props;
        const contextValue = {
            form: this.core,
        };

        const leapNestProps = this.getLeapNestProps();

        return (
            <IfContext.Provider value={null}>
                <FormContext.Provider value={contextValue}>
                    <Com style={style} className={`no-form no-form-${direction} ${className} no-form-${full ? 'full' : 'auto'}`} {...leapNestProps}>
                        {children}
                        {this.renderFooter()}
                    </Com>
                </FormContext.Provider>
            </IfContext.Provider>
        );
    }
}

// props是外部props，继承item时需要带上
const ConnectForm = props => (<ItemContext.Consumer>
    {(upperItem) => {
        const { item } = upperItem || {};
        return (
            <DialogContext.Consumer>
                {(dialogProps) => {
                    const rootFormDialogProps = item ? {} : dialogProps || {};
                    return (<Form {...props} item={item} {...rootFormDialogProps} />);
                }}
            </DialogContext.Consumer>
        );
    }}
</ItemContext.Consumer>);

ConnectForm.displayName = 'NoForm';
export default ConnectForm;
