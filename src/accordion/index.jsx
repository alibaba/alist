import React, { Component } from 'react';
import * as T from 'prop-types';
import Form from '../';

class Accordion extends Component {
    static Button = 'button';
    static defaultProps = {
        onNext: () => { },
        onEdit: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
        this.core = [];
        this.accordionCore = {
            setValue: (val) => {
                this.core.forEach((core) => {
                    core.setValue(val);
                });
                setTimeout(() => this.forceUpdate());
            },
            getValue: this.getValue,
            validate: this.validate,
        };
    }
    componentDidMount() {
        const { onMount = () => { } } = this.props;
        onMount(this.accordionCore);
    }
    onPrev = () => {
        const current = Math.max(1, this.state.current - 1);
        this.setState({
            current,
        });
    }
    onNext = async (idx) => {
        if (await this.beforeLeave()) {
            return;
        }
        this.setState({
            current: idx + 1,
        }, () => {
            this.props.onNext(this.state.current);
        });
    }
    onEdit = async (idx) => {
        if (await this.beforeLeave()) {
            return;
        }
        this.setState({
            current: idx,
        }, () => {
            this.props.onEdit(this.state.current);
        });
    }
    onMount = (idx, core) => {
        this.core[idx] = core;
    }
    onChange = (idx, value, ...args) => {
        this.props.onChange(this.getValue(), ...args);
    }

    getValue = () => this.core.reduce((value, c) => {
        const status = c.getStatus();
        const tempValue = c.getValue();
        const val = {};
        Object.keys(status).filter(name => status[name] !== 'hidden').forEach((name) => {
            val[name] = tempValue[name];
        });
        return { ...value, ...val };
    }, {})
    validate = () => Promise.all(this.core.map(core => core.validate())).then((errors) => {
        const error = errors.reduce((err, c) => ({
            ...err,
            ...c,
        }), {});
        if (Object.keys(error).length === 0) {
            return null;
        }
        return error;
    })

    beforeLeave = async () => {
        const { current } = this.state;
        if (!this.core[current]) {
            return false;
        }
        const core = this.core[current];
        const errors = await core.validate();
        return !!errors;
    }
    render() {
        const {
            children,
            nextButton = <Accordion.Button>下一步</Accordion.Button>,
            editButton = <Accordion.Button>编辑</Accordion.Button>,
        } = this.props;
        const value = this.props.value || {};
        const { current } = this.state;
        const accordionStatus = this.props.status;
        const elements = React.Children.map(children, (child, idx) => {
            if (child.type !== Form) {
                throw Error('Accordion chilren must be Form instance');
            }
            const status = accordionStatus || child.props.status || 'edit';

            const active = status === 'edit' && idx === current;
            const item = idx + 1;
            const onEdit = this.onEdit.bind(this, idx);
            const onNext = this.onNext.bind(this, idx);
            let layout = { label: 6, control: 18 };
            try {
                layout = this.props.layout || child.props.layout || { label: 6, control: 18 };
            } catch (e) {
                //
            }
            let NextButton = null;
            let EditButton = null;
            if (accordionStatus === 'edit') {
                const theNextButton = 'nextButton' in child.props ? child.props.nextButton : nextButton;
                const theEditButton = 'editButton' in child.props ? child.props.editButton : editButton;
                NextButton = React.cloneElement(theNextButton, {
                    onClick: onNext,
                });
                EditButton = React.cloneElement(theEditButton, {
                    onClick: onEdit,
                });
            }

            let showElement = active || child.props.value;

            if (!showElement && this.core[idx]) {
                showElement = !!this.core[idx].getValue();
            }
            if (!showElement && status === 'preview') {
                showElement = true;
            }

            const element = React.cloneElement(child, {
                value,
                onChange: this.onChange.bind(this, idx),
                globalStatus: current === idx ? 'edit' : 'preview',
                layout,
                onMount: core => this.onMount(idx, core),
            });
            return (<div className={`accordion-step-item ${active && ' is-active'}`}>
                <div className="accordion-step-num">
                    {item}
                </div>
                <div className="accordion-step-content">
                    <div>
                        <div className="accordion-step-label">{child.props.label}</div>
                        <div className="accordion-step-edit">
                            {element && EditButton}
                        </div>
                    </div>
                    <div className="accordion-step-children" style={{ display: showElement ? 'block' : 'none' }}>
                        {element}
                        {active &&
                            <div className="no-form-item no-form-accordion-next">
                                <div className={`no-form-item-label col-${layout.label}`} />
                                <div className={`no-form-item-control col-${layout.control}`}>
                                    {NextButton}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>);
        });
        return <div className={this.props.className}>{elements}</div>;
    }
}

export { Accordion as default };
