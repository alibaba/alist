import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';

export default class Any extends React.Component {
    static propTypes = {
        render: PropTypes.func,
    };

    static defaultProps = {
    };

    componentDidMount = () => {
        const { listenFilterChange = false } = this.props;
        const { core } = this.grid;
        if (core && core.emitter) {
            core.emitter.on('refresh', () => {
                this.forceUpdate();
            });
            core.emitter.on('pagination_refresh', () => {
                this.forceUpdate();
            });

            core.emitter.on('refresh_on_filter_change', () => {
                if (listenFilterChange) {
                    this.forceUpdate();
                }                
            });
        }
    }

    renderAny = (grid) => {
        if (!this.grid && grid) {
            this.grid = grid;
        }

        const { render } = this.props;
        if (render && typeof render === 'function') {
            return render(grid.core);
        }
        return null;
    }

    render() {
        return (
            <Consumer>{this.renderAny}</Consumer>
        );
    }
}
