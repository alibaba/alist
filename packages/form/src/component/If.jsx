import React from 'react';
import PropTypes from 'prop-types';
import { ANY_CHANGE } from '../static';
import FormContext from '../context/form';
import IfContext from '../context/if';

const Component = React.PureComponent;
class If extends Component {
    static propTypes = {
        when: PropTypes.any,
        children: PropTypes.any,
        style: PropTypes.object,
        className: PropTypes.string,
        // listenKeys: PropTypes.Array,
        name: PropTypes.any,
        Com: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }

    static defaultProps = {
        when: true,
        children: null,
        style: {},
        className: '',
        Com: 'span',
        listenKeys: [],
    };
    constructor(props) {
        super(props);
        const {
            when, form, ifCore, name,
        } = props;
        this.form = form;
        this.core = form.addField({ when, name });
        this.core.jsx = this;
        this.core.parentIf = ifCore;
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
    update = (type, name) => {
        const hit = this.hitListenKeys(name);
        if (this.didMount && (type === 'value' || type === 'status') && hit) {
            this.forceUpdate();
        }
    }

    hitListenKeys = (key) => {
        const { listenKeys } = this.props;
        if (listenKeys.length === 0) {
            return true;
        } else {
            return listenKeys.indexOf(key) !== -1;
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
        const ftcls = `${className || ''} no-form-item`;

        const contextValue = {
            if: this.core,
        };
        if (React.isValidElement(children)) {
            const child = React.Children.only(children);
            return (<IfContext.Provider value={contextValue}>
                {child}
            </IfContext.Provider>);
        }

        return (<IfContext.Provider value={contextValue}>
            <Com {...{ style, className: ftcls }}>{children}</Com>
        </IfContext.Provider>);
    }
}

const ConnectIf = props => (<FormContext.Consumer>
    {(formContext) => {
        const { form } = formContext;
        return <If {...props} form={form} />;
    }}
</FormContext.Consumer>);

ConnectIf.displayName = 'If';

export default ConnectIf;
