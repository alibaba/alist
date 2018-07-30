import { Component } from 'react';
import PropTypes from 'prop-types';

class Container extends Component {
    static childContextTypes = {
        jsxProps: PropTypes.object,
        itemsConfig: PropTypes.array,
        repeaterCore: PropTypes.object,
        doAdd: PropTypes.func,
        doUpdate: PropTypes.func,
        doDelete: PropTypes.func,
        doAddDialog: PropTypes.func,
        doUpdateDialog: PropTypes.func,
        doSave: PropTypes.func,
        doCancel: PropTypes.func,
        doMultipleInline: PropTypes.func,
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
        this.doMultipleInline = props.doMultipleInline;
        this.doAddDialog = props.doAddDialog;
        this.doUpdateDialog = props.doUpdateDialog;
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
            doAddDialog: this.doAddDialog,
            doUpdateDialog: this.doUpdateDialog,
            doCancel: this.doCancel,
            doMultipleInline: this.doMultipleInline,
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
    doAddDialog: PropTypes.func,
    doUpdateDialog: PropTypes.func,
    doCancel: PropTypes.func,
    doAddInline: PropTypes.func,
    doUpdateInline: PropTypes.func,
    doMultipleInline: PropTypes.func,
    render: PropTypes.func,
    jsxProps: PropTypes.object,
};

export default Container;
