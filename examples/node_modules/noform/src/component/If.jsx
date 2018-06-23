import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ANY_CHANGE } from '../static';

class If extends Component {
    static propTypes = {
        when: PropTypes.any,
        children: PropTypes.any,
        style: PropTypes.object,
        className: PropTypes.string,
        Com: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }
    static defaultProps = {
        when: true,
        children: null,
        style: {},
        className: '',
        Com: 'span',
    };
    static contextTypes = {
        form: PropTypes.object,
        ifCore: PropTypes.object,
    };
    static childContextTypes = {
        ifCore: PropTypes.object,
        form: PropTypes.object,
    };
    constructor(props, context) {
        super(props, context);
        const { when } = props;
        const { form } = context;
        this.form = form;
        this.core = this.form.addField({ when, name: props.name });
        this.core.jsx = this;
    }
    getChildContext() {
        return { form: this.form, ifCore: this.core };
    }
    componentDidMount() {
        this.didMount = true;
        this.forceUpdate();
        this.core.on(ANY_CHANGE, this.update);
    }
    componentWillUnmount() {
        this.didMount = false;
        this.core.removeListener(ANY_CHANGE, this.update);
    }
    update = (type) => {
        if (this.didMount && (type === 'value' || type === 'status')) {
            this.forceUpdate();
        }
    }
    render() {
        if (this.didMount && this.core.status === 'hidden') {
            return null;
        }

        const {
            children, style, className, Com,
        } = this.props;
        // REACT15,REACT16
        if (React.isValidElement(children)) {
            return React.Children.only(children);
        }
        return <Com {...{ style, className }}>{children}</Com>;
    }
}

If.displayName = 'If';

export default If;
