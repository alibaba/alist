import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Container extends Component {
    static childContextTypes = {
        jsxProps: PropTypes.object,
        itemsConfig: PropTypes.array,
        repeaterCore: PropTypes.object,
        doAdd: PropTypes.func,
        doUpdate: PropTypes.func,
        doDelete: PropTypes.func,
        doSave: PropTypes.func,
        doCancel: PropTypes.func,
        doAddInline: PropTypes.func,
        doUpdateInline: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.itemsConfig = props.itemsConfig;
        this.repeaterCore = props.repeaterCore;
        this.doAdd = props.doAdd;
        this.doUpdate = props.doUpdate;
        this.doDelete = props.doDelete;
        this.doSave = props.doSave;
        this.doCancel = props.doCancel;
        this.doAddInline = props.doAddInline;
        this.doUpdateInline = props.doUpdateInline;
        this.jsxProps = props.jsxProps;
    }

    getChildContext() {
        return {
            jsxProps: this.jsxProps,
            itemsConfig: this.itemsConfig,
            repeaterCore: this.repeaterCore,
            doAdd: this.doAdd,
            doUpdate: this.doUpdate,
            doDelete: this.doDelete,
            doSave: this.doSave,
            doCancel: this.doCancel,
            doAddInline: this.doAddInline,
            doUpdateInline: this.doUpdateInline,
        };
    }

    render() {
        const { render } = this.props;
        return render(this);
    }
}

Container.propTypes = {
    itemsConfig: PropTypes.array,
    repeaterCore: PropTypes.object,
    doAdd: PropTypes.func,
    doUpdate: PropTypes.func,
    doDelete: PropTypes.func,
    doSave: PropTypes.func,
    doCancel: PropTypes.func,
    doAddInline: PropTypes.func,
    doUpdateInline: PropTypes.func,
    render: PropTypes.func,
    jsxProps: PropTypes.object,
};

export default Container;
