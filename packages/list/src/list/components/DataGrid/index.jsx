import React from 'react';
import PropTypes from 'prop-types';
import { Provider, getGridCore } from '../../context';
import deepEqual from 'react-fast-compare';

const noop = () => {};

export default class DataGrid extends React.Component {
    static propTypes = {
        onMount: PropTypes.func,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        dataSource: PropTypes.array,
        url: PropTypes.string,
        params: PropTypes.object,
        defaultPage: PropTypes.number,
        pageSize: PropTypes.number,
        defaultFilterValues: PropTypes.object,
        query: PropTypes.func,
        autoLoad: PropTypes.bool,
        formatBefore: PropTypes.func,
        formatAfter: PropTypes.func,
        formatFilter: PropTypes.func,
    };

    static defaultProps = {
        dataSource: [],
        pageSize: 10,
        defaultPage: 0,
        autoLoad: true,
        onMount: noop,
    };

    constructor(props, context) {
        super(props, context);

        const { core: propsCore, ...others } = props || {};
        const core = propsCore || getGridCore(others);

        this.state = {
            core,
        };
    }

    componentDidMount() {
        const { onMount } = this.props;
        const { core } = this.state;
        core.launch(); // 由UI通知核心正式开始运行
        onMount(core);
    }

    componentWillReceiveProps(nextProps) {
        const { dataSource } = nextProps;
        const { core } = this.state;
        if (core.mode === 'dataSource' && deepEqual(this.props.dataSource, dataSource)) {
            core.setDataSource(dataSource);
        }
    }

    render() {
        const { children } = this.props;
        return <Provider value={this.state}>{children}</Provider>;
    }
}
