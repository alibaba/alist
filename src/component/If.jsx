import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ANY_CHANGE } from '../static';

class If extends Component {
    static defaultProps = {
        when: true,
    };
    static contextTypes = {
        form: PropTypes.object,
        ifCore: PropTypes.object,
    };
    static childContextTypes = {
        ifCore: PropTypes.object,
        form: PropTypes.object,
    };
    getChildContext() {
        return { form: this.form, ifCore: this.core };
    }
    constructor(props, context) {
        super(props, context);
        let { when } = props;
        const { form } = context;
        this.form = form;
        this.core = this.form.addField({ when, name: props.name });
        this.core.jsx = this;
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
    update = type => {
        if (type === 'value' || type === 'status') {
            this.didMount && this.forceUpdate();
        }
    }
    render() {
        if (this.didMount && this.core.status === 'hidden') {
            return null;
        }

        const { children, style, className, Com = 'span' } = this.props;
        // REACT15,REACT16
        return React.isValidElement(children) ? React.Children.only(children) : <Com {...{ style, className }}>{children}</Com>;

    }
}

export default If;
