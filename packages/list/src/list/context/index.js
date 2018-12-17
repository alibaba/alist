import React from 'react';
import GridCore from '../core';

const getGridCore = (props = {}) => {
    const core = new GridCore(props);
    return core;
};
// 初始化事件总线
const getDataGridContext = () => {
    const core = getGridCore();
    return { core };
};

const { Provider, Consumer } = React.createContext(getDataGridContext());
export {
    Provider,
    Consumer,
    getGridCore,
};
