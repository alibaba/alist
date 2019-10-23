import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';

class InnerGrid extends React.Component {
    static propTypes = {
        children: PropTypes.element,
    };

    static defaultProps = {
    };

    constructor(props, context) {
        super(props, context);
        const { dataSource = [] } = this.props;
    }

    componentDidMount = () => {
        const { core } = this.grid;
        if (core && core.emitter) {
            core.emitter.on('refresh', this.update);
            core.emitter.on('grid_props_update', this.update);
        }
    }

    update = () => {
        this.forceUpdate();
    }

    componentWillUnmount = () => {
        const { core } = this.grid;
        if (core && core.emitter) {
            core.emitter.removeListener('refresh', this.update);
            core.emitter.removeListener('grid_props_update', this.update);
        }
    }

    renderTable = (grid) => {
        const { core } = grid;
        if (!this.grid && grid) {
            this.grid = grid;
        }

        const { children } = this.props;
        const otherProps = { ...this.props };

        if (!core.multiple) {
            delete otherProps.dataSource;
            otherProps.dataSource = core.getDataSource();
        }

        delete otherProps.children;
        otherProps.loading = core.isLoading;

        let element = null;
        if (React.isValidElement(children)) {
            element = React.cloneElement(children, otherProps);
            return <div className="table-wrapper">{element}</div>;
        }
        return null;
    }

    render() {
        return (
            <Consumer>{this.renderTable}</Consumer>
        );
    }
}

function Gridify(Com) {
    return function Grid(props) {
        const { children, ...others } = props;
        return (<InnerGrid {...others}>
            <Com>{children}</Com>
        </InnerGrid>);
    };
}

export default Gridify;
