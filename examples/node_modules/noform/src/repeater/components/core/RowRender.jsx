import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propInterface = {
    itemsConfig: PropTypes.array,
    core: PropTypes.object,
    repeaterCore: PropTypes.object,
    jsxProps: PropTypes.object,
    doAdd: PropTypes.func,
    doUpdate: PropTypes.func,
    doDelete: PropTypes.func,
    doSave: PropTypes.func,
    doCancel: PropTypes.func,
    doAddInline: PropTypes.func,
    doUpdateInline: PropTypes.func,
};

class RowRender extends Component {
    static contextTypes = {
        ...propInterface,
    };

    static childContextTypes = {
        ...propInterface,
        getIdx: PropTypes.func,
        getCore: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.itemsConfig = context.itemsConfig;
        this.repeaterCore = context.repeaterCore;
        this.doAdd = context.doAdd;
        this.doUpdate = context.doUpdate;
        this.doDelete = context.doDelete;
        this.doSave = context.doSave;
        this.doCancel = context.doCancel;
        this.doAddInline = context.doAddInline;
        this.doUpdateInline = context.doUpdateInline;
        this.jsxProps = context.jsxProps;

        this.core = props.core;
        this.idx = props.idx;
        this.val = props.val;
    }

    getChildContext() {
        return {
            jsxProps: this.jsxProps,
            itemsConfig: this.itemsConfig,
            getCore: this.getCore,
            getIdx: this.getIdx,
            doAdd: this.doAdd,
            doUpdate: this.doUpdate,
            doDelete: this.doDelete,
            doSave: this.doSave,
            doCancel: this.doCancel,
            doAddInline: this.doAddInline,
            doUpdateInline: this.doUpdateInline,
        };
    }

    getCore = () => this.props.core
    getIdx = () => this.props.idx

    render() {
        const { render } = this.props;
        return render(this);
    }
}

RowRender.propTypes = {
    val: PropTypes.object,
    core: PropTypes.object,
    props: PropTypes.object,
    jsxProps: PropTypes.object,
    idx: PropTypes.number,
    render: PropTypes.func,
};

export default RowRender;
