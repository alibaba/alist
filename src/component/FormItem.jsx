import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import { ANY_CHANGE, EDIT, HIDDEN } from '../static';
import genId from '../util/random';
import { isObject } from '../util/is';

const formItemPrefix = 'no-form';

const Component = React.PureComponent;
class FormItem extends Component {
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

    static defaultProps = {
        name: '',
        children: null,
    }

    constructor(props, context) {
        super(props, context);
        if (!context.form) {
            return this;
        }

        this.form = context.form;
        this.ifCore = context.ifCore;
        this.id = `__noform__item__${genId()}`;
        if (props.name) {
            this.name = props.name;
        }
    }

    getChildContext() { // 传递form
        return { form: this.form, ifCore: this.ifCore };
    }

    componentDidMount() {
        // 绑定set事件就会执行更新 TODO：优化渲染
        this.form.on(ANY_CHANGE, this.update);
        this.didMount = true;
        this.forceUpdate();
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
        const { name, style = {} } = itemProps;
        const restItemProps = { ...itemProps, id: this.id };
        delete restItemProps.style;
        const { className = '' } = itemProps;
        const props = this.form.getItemProps(name) || {}; // 动态props
        const status = this.form.getItemStatus(name); // 动态status
        const error = this.form.getItemError(name); // 动态error
        // 保留item关键字属性
        const {
            errorRender, label, top, suffix, prefix, help, required, full: coreFull,
        } = { ...this.props, ...props };

        let errInfo = error;
        let hasError = !!errInfo;
        let hasSubError = false;
        if (isObject(error)) { // 对象的情况
            errInfo = error.__error || error.main;
            hasError = error.main;
            hasSubError = error.sub;
        }

        if (errorRender) {
            errInfo = errorRender(errInfo, error);
        }

        if (status === HIDDEN) {
            return null;
        }

        let requiredCls = '';
        if (required && (status === EDIT || `${name}` === '')) {
            requiredCls = ' required';
        }
        // 处理布局
        const {
            inline = false, inset = false, colon, layout = {}, full: jsxFull,
        } = {
            ...this.form.jsx.props, ...itemProps,
        };

        const full = jsxFull || coreFull || inset;
        const errCls = hasError ? `${formItemPrefix}-item-has-error` : '';
        const subErrCls = hasSubError ? `${formItemPrefix}-item-has-sub-error` : '';
        const insetCls = inset ? `${formItemPrefix}-item-inset` : '';
        const layoutCls = (layout.label && layout.control) ? `${formItemPrefix}-item-has-layout` : '';
        const colonCls = colon ? '' : `${formItemPrefix}-item-no-colon`;
        const inlineCls = inline ? `${formItemPrefix}-item-inline` : '';

        return (
            <div id={this.id} name={`form-item-${name}`} className={`${formItemPrefix}-item ${className} ${layoutCls} ${colonCls} ${inlineCls}`} style={style}>
                <div className={`${insetCls} ${errCls} ${subErrCls}`}>
                    <span className={`${formItemPrefix}-item-label ${requiredCls} ${layout.label ? `col-${layout.label}` : ''}`} >{label}</span>
                    <span className={`${formItemPrefix}-item-control ${layout.control ? `col-${layout.control}` : ''}`} >
                        { top ? <span className={`${formItemPrefix}-item-top`}>{top}</span> : null }
                        <span className={`${formItemPrefix}-item-content ${full ? `${formItemPrefix}-full` : ''}`}>
                            { prefix ? <span className={`${formItemPrefix}-item-content-prefix`}>{prefix}</span> : null }
                            <span className={`${formItemPrefix}-item-content-elem is-${status}`}><Item {...restItemProps}>{children}</Item></span>
                            { suffix ? <span className={`${formItemPrefix}-item-content-suffix`}>{suffix}</span> : null }
                        </span>
                        { help ? <span className={`${formItemPrefix}-item-help`}>{help}</span> : null }
                        { (!inset && hasError) ? <span className={`${formItemPrefix}-item-error`}>{errInfo}</span> : null }
                    </span>
                </div>
                { (inset && hasError) ? <span className={`${formItemPrefix}-item-error`}>{errInfo}</span> : null }
            </div>);
    }
}

FormItem.displayName = 'FormItem';

export default FormItem;
