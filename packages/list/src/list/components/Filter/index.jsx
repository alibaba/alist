import React from 'react';
import PropTypes from 'prop-types';
import Form, { If, FormItem } from 'noform';
import { Consumer } from '../../context';
import FilterContext from '../../context/filter';

class Filter extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        onSubmit: PropTypes.func,
        onReset: PropTypes.func,
        cols: PropTypes.number,
    };

    static defaultProps = {
        cols: 3,
        autoWidth: false,
    };

    constructor(props, context) {
        super(props, context);
        this.grid = null;

        const { cols, autoWidth } = props;
        this.state = {
            cols,
            autoWidth,
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.cols !== this.props.cols) {
            this.setState({ cols: this.props.cols });
        }

        if (prevProps.autoWidth !== this.props.autoWidth) {
            this.setState({ autoWidth: this.props.autoWidth });
        }
    }

    search = () => {
        if (this.grid) {
            this.grid.core.search();
        }
    }

    clear = () => {
        if (this.grid) {
            this.grid.core.clearFilterData();
        }
    }

    renderFilter = (grid) => {
        const { core: gridCore } = grid;
        if (!this.grid && grid) {
            this.grid = grid;
            window.grid = grid;
        }
        const {
            noDefaultLayout = false, children, render, ...otherParent,
            searchText = '查询', clearText = '重置筛选条件',
        } = this.props;
        const { cols, autoWidth } = this.state;
        const core = gridCore.filterCore;
        const FilterBuiltin = (props) => {
            const {
                className, style: propStyle, direction = 'hoz',
                autoWidth, cols, inset = false, ...others
            } = props;

            const filterContextValues = noDefaultLayout ? {} : { cols, autoWidth };
            const cls = className ? `${className} filter-area` : 'filter-area';
            const defaultStyle = noDefaultLayout ? {} : { display: 'inline-block', width: 'auto' };
            const style = { ...defaultStyle, ...(propStyle || {}) };

            return (<Form
                colon={false}
                className={cls}
                direction={direction}
                inset={inset}
                style={style}
                core={core}
                {...others}
            >
                <FilterContext.Provider value={filterContextValues}>
                    {children}
                </FilterContext.Provider>
            </Form>);
        };

        const builtinprops = { ...otherParent };
        if (!noDefaultLayout) {
            builtinprops.cols = cols;
            builtinprops.autoWidth = autoWidth;
            builtinprops.inset = true;
        }

        const builtin = <FilterBuiltin {...builtinprops} />;
        if (render && typeof render === 'function') {
            return render({
                children,
                builtin,
                DynamicBuiltin: FilterBuiltin,
                ctx: gridCore,
                search: this.search,
                clear: this.clear,
            });
        }

        if (noDefaultLayout) {
            return <React.Fragment>{builtin}</React.Fragment>;
        }

        return (<div className="filter-wrapper">
            {builtin}
            <div className="filter-control">
                <button className="filter-control-query" onClick={this.search}>{searchText}</button>
                <button className="filter-control-clear" onClick={this.clear}>{clearText}</button>
            </div>
        </div>);
    }

    render() {
        return (
            <Consumer>{this.renderFilter}</Consumer>
        );
    }
}

const FilterItem = (props) => {
    const {
        autoWidth = true, cols, colSpan = 1, noLayout = false, className = '',
    } = props;

    const cls = `${className} nolist-filter-item`;
    const style = props.style || {};
    const itemStyle = { ...style };

    if (noLayout) {
        itemStyle.paddingRight = '0';
    } else if (cols && !autoWidth) { // priority: autoWidth > cols
        const width = (1 / Number(cols)).toFixed(2) * 100;
        const colWidth = (Number(colSpan) * width);
        itemStyle.width = `${colWidth}%`;
    }

    return <FormItem defaultMinWidth={false} full {...props} className={cls} style={itemStyle} />;
};

Filter.Item = props => (<FilterContext.Consumer>
    {({ cols, autoWidth, ...others }) => <FilterItem cols={cols} autoWidth={autoWidth} {...others} {...props} />}
</FilterContext.Consumer>);

Filter.If = If;

Filter.Clear = (props) => {
    const { render, children, style, ...others } = props;
    return (<Consumer>
        {(grid) => {
            const clear = () => {
                if (grid) grid.core.clearFilterData();
            };

            if (render) {
                return render(clear);
            }

            const defaultStyle = { style: { cursor: 'pointer', ...style } };
            return (<span onClick={clear} {...defaultStyle} {...others} >
                {children}
            </span>);
        }}
    </Consumer>);
};

Filter.Search = (props) => {
    const {
        render, children, style, ...others
    } = props;
    return (<Consumer>
        {(grid) => {
            const search = () => {
                if (grid) grid.core.search();
            };

            if (render) {
                return render(search);
            }

            const defaultStyle = { style: { cursor: 'pointer', ...style } };
            return (<span role="search" onClick={search}{...defaultStyle} {...others} >
                {children}
            </span>);
        }}
    </Consumer>);
};

export default Filter;
