import React from 'react';
import { ANY_CHANGE } from '../static';

class BaseItem extends React.Component {
    constructor(props) {
        super(props);

        const { form, name } = props;
        this.form = form;
        this.name = name;
    }

    componentDidMount() {
        this.form.on(ANY_CHANGE, this.update);
        this.didMount = true;
    }

    componentWillUnmount() { // 解绑
        this.form.removeListener(ANY_CHANGE, this.update);
        this.didMount = false;
    }

    update = (type, name, value, silent = false) => {
        if (this.didMount && this.name === name && !silent) {
            this.forceUpdate();
        }
    }
    render() {
        const {
            children, render, didMount,
            value, form, status, props, error,
            onChange, onBlur, onFocus,
            inset, style, name, formProps,
        } = this.props;

        if (!didMount && render) {
            return null;
        }

        if (render) {
            const values = form.getValue();
            return render(values, form);
        }

        if (didMount && status === 'hidden') {
            return null;
        }

        if (typeof children === 'string') {
            throw new Error('string is not allowed as Item/FormItem\'s children.');
        }

        let component = null;
        if (this.props.children === null) {
            return null;
        }

        const {
            className,
            label,
            top,
            prefix,
            suffix,
            help,
            validateConfig,
            full,
            layout,
            when,
            ...others
        } = props || {};

        component = React.Children.only(this.props.children);
        let disabled = false;

        if (status === 'disabled') {
            disabled = true;
        }

        const cloneProps = {
            ...formProps,
            inset,
            disabled,
            name,
            value,
            error,
            status,
            onChange,
            onBlur,
            onFocus,
            ...others,
        };

        if (style) {
            cloneProps.style = Object.assign({}, cloneProps.style || {}, style);
        }

        if (component && component.type && component.type.displayName === 'If') {
            delete cloneProps.name;
        }

        delete cloneProps.defaultMinWidth;
        delete cloneProps.colon;

        return React.cloneElement(component, cloneProps);
    }
}

export default BaseItem;
