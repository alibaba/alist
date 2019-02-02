import React from 'react';
import PropTypes from 'prop-types';
import Form, { FormCore, FormItem } from 'noform';
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
        const { children, render } = this.props;
        const { cols, autoWidth } = this.state;        
        const core = gridCore.filterCore;
        const FilterBuiltin = (props) => {
            const { autoWidth, cols, inset = false, className, direction = 'hoz', style: propStyle, ...others } = props;
            const filterContextValues = { cols, autoWidth };
            const cls = className ? `${className} filter-area` : 'filter-area';
            const defaultStyle = { display: 'inline-block', width: 'auto' };
            const style = { ...defaultStyle, ...(propStyle || {})};

            return <Form colon={false} className={cls} direction={direction} inset={inset} style={style} core={core} {...others}>
                <FilterContext.Provider value={filterContextValues}>
                    {children}
                </FilterContext.Provider>
            </Form>;
        };

        const builtin = <FilterBuiltin cols={cols} autoWidth={autoWidth} inset={true} />;
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

        return (<div className="filter-wrapper">
            {builtin}
            <div className="filter-control">
                <button className="filter-control-query" onClick={this.search}>查询</button>
                <button className="filter-control-clear" onClick={this.clear}>重置筛选条件</button>
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
    const { autoWidth = true, cols, colSpan = 1, noLayout = false } = props;
    const style = props.style || {};    
    const itemStyle = { ...style, display: 'inline-block', paddingRight: '12px', marginRight: 0 };
    if (noLayout) {
        itemStyle.paddingRight = '0';
    } else if (cols && !autoWidth) {
        const width = (1 / Number(cols)).toFixed(2) * 100;
        const colWidth = (Number(colSpan) * width);
        itemStyle.width = `${colWidth}%`;
    }

    return <FormItem defaultMinWidth={false} full {...props} style={itemStyle} />
};

Filter.Item = props => (<FilterContext.Consumer>
    {({ cols, autoWidth }) => <FilterItem cols={cols} autoWidth={autoWidth} {...props} />}
</FilterContext.Consumer>);

export default Filter;
