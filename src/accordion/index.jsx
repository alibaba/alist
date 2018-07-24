import React, { Component } from 'react';
import * as T from 'prop-types';
import Form from '../';

class Accordion extends Component {
    static Button = 'button'
    state = {
        current: 0,
    }
    core = [];
    onMount = (idx, core) => {
        this.core[idx] = core;
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
        });
    }
    onEdit = async (idx) => {
        if (await this.beforeLeave()) {
            return;
        }
        this.setState({
            current: idx,
        });
    }
    beforeLeave = async () => {
        const { current } = this.state;
        const core = this.core[current];
        const errors = await core.validate();
        return !!errors;
    }
    onChange = (idx, value) => {
        this.core.filter((c, i) => i !== idx).forEach(c => c.setValue(value));
        this.props.onChange(this.getValue());
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
    render() {
        const {
            children,
            nextButton = <Accordion.Button>下一步</Accordion.Button>,
            editButton = <Accordion.Button>编辑</Accordion.Button>,
        } = this.props;
        const value = this.props.value || {};
        const { current } = this.state;
        const elements = React.Children.map(children, (child, idx) => {
            if (child.type !== Form) {
                throw Error('Accordion chilren must be Form instance');
            }
            const active = idx === current;
            const item = idx + 1;
            const onEdit = this.onEdit.bind(this, idx);
            const onNext = this.onNext.bind(this, idx);
            let layout = { label: 6, control: 18 };
            try {
                layout = this.props.layout || child.props.layout || { label: 6, control: 18 };
            } catch (e) {
                //
            }
            const NextButton = React.cloneElement(nextButton, {
                onClick: onNext,
            });
            const EditButton = React.cloneElement(editButton, {
                onClick: onEdit,
            });

            const showElement = active || child.props.value || this.core[idx] && this.core[idx].getValue();

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
        return <div>{elements}</div>;
    }
}

export { Accordion as default };
