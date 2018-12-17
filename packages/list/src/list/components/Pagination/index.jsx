import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';

class InnerPg extends React.Component {
    static propTypes = {
        children: PropTypes.element,
    };

    static defaultProps = {
    };

    componentDidMount = () => {
        const { core } = this.grid;
        if (core && core.emitter) {
            core.emitter.on('pagination_refresh', () => {
                this.forceUpdate();
            });
        }
    }

    handlePageChange = (currentPage) => {
        if (this.grid) {
            this.grid.core.setCurrentPage(currentPage);
        }
    }

    renderPagination = (grid) => {
        const { core } = grid;
        if (!this.grid && grid) {
            this.grid = grid;
        }

        const { children } = this.props;
        const pageData = core.getPageData();
        const { total, pageSize } = pageData;
        const totalPage = Math.ceil(total / pageSize);
        if (total === 0 || totalPage === 1) {
            return null;
        }

        const otherProps = { ...this.props, ...pageData, onChange: this.handlePageChange };
        delete otherProps.children;

        let element = null;
        if (React.isValidElement(children)) {
            element = React.cloneElement(children, otherProps);
            return <div className="pagination-wrapper">{element}</div>;
        }
        return null;
    }

    render() {
        return (
            <Consumer>{this.renderPagination}</Consumer>
        );
    }
}

function Pify(Com) {
    return function Pagination(props) {
        const { children, ...others } = props;
        return (<InnerPg {...others}>
            <Com>{children}</Com>
        </InnerPg>);
    };
}

export default Pify;
