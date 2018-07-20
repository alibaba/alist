import React, { Component } from 'react';
import * as T from 'prop-types';
import Form, { FormItem } from '../';
import { Button } from '../../node_modules/antd';

class AccordionCore {
    children = [];
    elements = [];
    wrapStep(form) {
        const element = React.cloneElement(form, {
            onMount: core => this.children.push(core),
        });
        this.elements.push(element);
        return element;
    }
    setStatus(...args) {
        this.children.forEach((child) => {
            child.setStatus(...args);
        });
    }
    getVaule(name) {
        let val = null;
        const { children } = this;
        if (!name) {
            val = children.reduce((value, child) => Object.assign(value, child.getValue()), {});
        }
        val = children.reduce((value, child) => child.getValue(name) === null || value, null);
        return val;
    }
    setValue(...args) {
        this.children.forEach((child) => {
            child.setValue(...args);
        });
    }
}
class Accordion extends Component {
    static propTypes = {
        core: T.shape(AccordionCore),
    }
    state = {
        current: 0,
        maxStep: 0,
    }
    onPrev = () => {
        const current = Math.max(0, this.state.current - 1);
        this.setState({
            current,
        });
    }
    onNext = () => {
        this.setState({
            current: this.state.current + 1,
            maxStep: this.state.current + 1,
        });
    }
    wrapElement = (element, idx) => {
        const props = { globalStatus: 'preview' };
        const { layout } = this.props;
        if (layout) {
            props.layout = layout;
        }
        if (this.state.current === idx) {
            props.globalStatus = 'edit';
        }
        return (<StepItem label={element.props.label} key={idx} onEdit={this.onEdit} onNext={this.onNext}>
            {React.cloneElement(element, props)}
        </StepItem>);
    }
    render() {
        const { children } = this.props;
        const { current, maxStep } = this.state;
        return (<Step current={current} max={maxStep}>
            {children.map(this.wrapElement)}
        </Step>);
    }
}
function StepItem({
    label, children, item, active, onEdit, onNext, max,
}) {
    return (<div className={`accordion-step-item ${active && ' is-active'}`}>
        <div className="accordion-step-num">
            {item}
        </div>
        <div className="accordion-step-content">
            <div>
                <div className="accordion-step-label">{label}</div>
                {item < max && <a onClick={onEdit} className="accordion-edit">编辑</a>}
            </div>
            <div className="accordion-step-children">
                { item <= max && children}
                {active && <a href="#" onClick={onNext}>下一步</a>}
            </div>
        </div>
    </div>);
}
function Step({ children, current = 0, max }) {
    return (<div>{
        React.Children.map(children, (child, idx) => React.cloneElement(child, {
            item: idx + 1,
            max,
            active: idx === current,
        }))
    }</div>);
}
// export default AccordionCore;
export {
    Accordion as default,
    AccordionCore,
};
