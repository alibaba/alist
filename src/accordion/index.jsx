import React, { Component } from 'react';

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || 0,
        };
        this.coreStatus = [];
    }
    componentDidMount() {
        this.coreStatus.forEach((status, idx) => {
            this.props.core[idx].setGlobalStatus(status);
        });
    }
    componentDidUpdate() {
        this.coreStatus.forEach((status, idx) => {
            this.props.core[idx].setGlobalStatus(status);
        });
    }
    bindSetCurrent = (current) => {
        if (this.beforeLeave(this.state.current) !== false
            && this.beforeEnter(current) !== false) {
            this.setState({ current }, () => {
                if (this.props.onStep) {
                    this.props.onStep(this.state.current);
                }
            });
        }
    }
    check = (child, idx, current) => {
        const active = idx === current;
        const Button = this.props.Button || 'button';
        const accordionStatus = this.props.status;
        if (accordionStatus === 'preview') {
            return { showElement: true, status: accordionStatus };
        }
        let showElement = false;
        let nextButton = null;
        let editButton = null;
        let status = 'edit';
        if (active) {
            nextButton = <Button type="primary">下一步</Button>;
        } else {
            status = 'preview';
            editButton = <a href="javascript:;">编辑</a>;
        }
        let hasValue = false;
        try {
            const value = this.props.core[idx].getValue();
            hasValue = Object.keys(value).filter(key => value[key]).length > 0;
        } catch (e) {
            //
        }
        if (idx < current || active || hasValue || status === 'preview') {
            showElement = true;
        }
        if (!showElement) {
            editButton = null;
        }
        return {
            status,
            active,
            showElement,
            nextButton,
            editButton,
        };
    }
    beforeEnter = () => true
    beforeLeave = (current) => {
        if (!this.props.core[current]) {
            return true;
        }
        const error = this.props.core[current].validate();
        return !error;
    }
    render() {
        const {
            className, children, layout = { label: 6, control: 18 },
        } = this.props;
        const { current } = this.state;
        const elements = React.Children.map(children, (child, idx) => {
            const {
                active, showElement, nextButton, editButton,
                status,
            } = this.check(child, idx, current);
            this.coreStatus[idx] = status;
            const nbutton = nextButton && React.cloneElement(nextButton, {
                onClick: this.bindSetCurrent.bind(this, idx + 1),
            });
            const ebutton = editButton && React.cloneElement(editButton, {
                onClick: this.bindSetCurrent.bind(this, idx),
            });
            return (<div className={`accordion-step-item ${active && ' is-active'}`}>
                <div className="accordion-step-num">
                    {idx + 1}
                </div>
                <div className="accordion-step-content">
                    <div>
                        <div className="accordion-step-label">{child.props.label}</div>
                        <div className="accordion-step-edit">
                            {ebutton}
                        </div>
                    </div>
                    <div className={`accordion-step-children ${!showElement ? 'is-hidden' : ''}`}>
                        {child}
                        <div className="no-form-item no-form-accordion-next">
                            <div className={`no-form-item-label col-${layout.label}`} />
                            <div className={`no-form-item-control col-${layout.control}`}>
                                { nbutton }
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        });
        return <div className={className}>{elements}</div>;
    }
}

export { Accordion as default };
