import React from 'react';
import { ANY_CHANGE } from '../static';
import { isObject } from '../util/is';

class Section extends React.Component {
    constructor(props) {
        super(props);

        const { core, form, type, field } = props;
        this.form = form;
        this.type = type;
        this.core = core;
        this.field = field;
    }

    componentDidMount() {
        this.form.on(ANY_CHANGE, this.update);
        this.didMount = true;
    }

    componentWillUnmount() { // 解绑
        this.form.removeListener(ANY_CHANGE, this.update);
        this.didMount = false;
    }

    componentWillReceiveProps(nextProps) {
        const { core: nextCore, form } = nextProps;
        if (nextCore && nextCore.id !== this.core.id) {
            this.form = form;
            this.core = nextCore;
            this.forceUpdate();
        }
    }

    update = (type, name, value, silent = false) => {
        if (type === this.type && this.didMount && this.core.name === name && !silent) {
            this.forceUpdate();
        }
    }

    renderPropsItem = () => {
        const {
            className, name, field, pure,
        } = this.props;
        const dynamicProps = this.form.getItemProps(name) || {}; // 动态props
        const propsField = this.props[field];
        const currentProps = dynamicProps[field] || propsField;
        if (pure) {
            return <React.Fragment>{currentProps}</React.Fragment>;
        }
        return currentProps ? <span className={className}>{currentProps}</span> : null;
    }

    renderErrorItem = () => {
        const {
            errorRender, className, name, error: propsError,
        } = this.props;
        let error = null;
        if (name) {
            const itemError = this.form.getItemError(name);
            error = itemError || propsError;
        } else {
            error = propsError;
        }

        let errInfo = error;
        let hasError = !!errInfo;
        let hasMainError = !!errInfo;
        let hasSubError = false;
        if (isObject(error)) { // 对象的情况
            errInfo = error.__error || error.main;
            hasMainError = error.main;
            hasSubError = error.sub;
            hasError = hasMainError || hasSubError;
        }

        if (errorRender) {
            errInfo = errorRender(errInfo, error);
        }

        return hasError ? <span className={className}>{errInfo}</span> : null;
    }

    render() {
        const { type } = this.props;
        let element = null;
        switch (type) {
        case 'props': element = this.renderPropsItem(); break;
        case 'error': element = this.renderErrorItem(); break;
        default: break;
        }

        return element;
    }
}

export default Section;
