import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import { ANY_CHANGE, EDIT, HIDDEN } from '../static';

const formItemPrefix = 'no-form';

class FormItem extends Component {
    static defaultProps = {
        name: '',
        value: null,
        children: null,
    }
    static propTypes = {
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.object,
        children: PropTypes.any,
    }
    // 上有form下有if
    static contextTypes = {
        form: PropTypes.object,
        ifCore: PropTypes.object,
    };

    static childContextTypes = {
        form: PropTypes.object,
        ifCore: PropTypes.object,
    };

    getChildContext() { // 传递form   
        return { form: this.form, ifCore: this.ifCore };
    }

    constructor(props, context) {
        super(props, context);
        if (!context.form) {
            return this;
        }

        this.form = context.form;
        this.ifCore = context.ifCore;
        if (props.name) {
            this.name = props.name;
        }
    }

    componentDidMount() {
        // 绑定set事件就会执行更新 TODO：优化渲染
        this.form.on(ANY_CHANGE, this.update);
        this.didMount = true;
    }

    componentWillUnmount() {
        // 解绑
        this.form.removeListener(ANY_CHANGE, this.update);
        this.didMount = false;
    }

    update = () => { // 强制刷新
        if (this.didMount) {
            this.forceUpdate();
        }
    }

    render() {
        const { children, ...itemProps } = this.props;
        const { name, style } = itemProps;
        let { className = '' } = itemProps;
        const props = this.form.getItemProps(name) || {}; // 动态props
        const status = this.form.getItemStatus(name); // 动态status
        const error = this.form.getItemError(name); // 动态error

        // 保留item关键字属性
        const {
            label, top, suffix, prefix, help, required,
        } = { ...this.props, ...props };
        const errInfo = error && typeof error === 'object' ? error.__error : error;

        if (status === HIDDEN) {
            return null;
        }

        if (required && status === EDIT) {
            className += ' required';
        }

        // 处理布局
        const { layout = {}, full = {} } = { ...this.form.jsx.props, ...itemProps };

        return (
            <div name={`form-item-${name}`} className={`${formItemPrefix}-item ${className}`} style={style}>
                <span className={`${formItemPrefix}-item-label ${layout.label ? `col-${layout.label}` : ''}`} >{label}</span>
                <span className={`${formItemPrefix}-item-control ${layout.control ? `col-${layout.control}` : ''}`} >
                    { top ? <span className={`${formItemPrefix}-item-top`}>{top}</span> : null }
                    <span className={`${formItemPrefix}-item-content ${full ? `${formItemPrefix}-full` : ''}`}>
                        { prefix ? <span className={`${formItemPrefix}-item-content-prefix`}>{prefix}</span> : null }
                        <span className={`${formItemPrefix}-item-content-elem is-${status}`}><Item {...itemProps}>{children}</Item></span>
                        { suffix ? <span className={`${formItemPrefix}-item-content-suffix`}>{suffix}</span> : null }
                    </span>
                    { help ? <span className={`${formItemPrefix}-item-help`}>{help}</span> : null }
                    { errInfo ? <span className={`${formItemPrefix}-item-error`}>{errInfo}</span> : null }
                </span>
            </div>);
    }
}

FormItem.displayName = 'FormItem';

export default FormItem;
