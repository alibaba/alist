import React, { useContext, useEffect } from 'react'
import { TableProvider, ListLifeCycleTypes, useToggle, ToggleContext, ListContext } from '@alist/react'
import { Table } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

// 遵循最小可用原则来采集初始化的table属性
const pickInitialTableProps = (props) => {
    const result = {}
    const attrs = ['rowSelection', 'className', { name: 'rowKey', alias: 'primaryKey' }]
    attrs.forEach(k => {
        if (typeof k === 'object') {
            const { name, alias } = k
            if (name in props) {
                result[alias] = props[name]
            }
        } else {
            if (k in props) {
                result[k] = props[k]
            }
        }        
    })
    return result
}

const RecursionTable = (props) => {
    const { dataSource,
        isLoop = false, loopProps = {},
        isRoot,
        ...others
    } = props
    const hasExtraRow = (dataSource || []).find(item => Array.isArray(item.children) && item.children.length > 0)
    const { openRowKeys, toggle, toggleAll, toggleState } = useToggle(props)
    const expandProps: any = {};
    
    const list: any = useContext(ListContext)
    useEffect(() => {
        if (isRoot) {
            list.actions.addAPI('toggle', toggle)
            list.actions.addAPI('toggleAll', toggleAll)
            list.actions.addAPI('getToggleState', () => toggleState)
        }
    })

    let loopDataSource = [...(dataSource || [])]
    if (isLoop) {
        expandProps.childrenColumnName = '_children_'
        if (hasExtraRow) {
            expandProps.expandedRowRender=(record) => {
                return <RecursionTable
                    showHeader={false}
                    bordered
                    dataSource={record.children}
                    {...others}
                    {...loopProps}
                    isLoop
                />
            }
        }
    }

    return <ToggleContext.Provider value={{ toggle, toggleAll, toggleState, openRowKeys }}>
        <Table
            dataSource={loopDataSource}
            {...expandProps}
            {...others}
            expandedRowKeys={openRowKeys}
        />
    </ToggleContext.Provider>
}

const TableStyledWrapper = styled((props) => {
    return <div {...props} />
})`
    margin-bottom: 16px;

    .alist-recursion-table {
        table {
            .ant-table-row-expand-icon-cell,
            .ant-table-expand-icon-th,
            .ant-table-expand-icon-col {
                display: none;
            }

            .ant-table-expanded-row > td:first-child {
                display: none;
            }
            .ant-table-expanded-row {        
                td {
                    border-width: ${(props) => ((props.bordered === undefined ? false : !!props.bordered) ? 1 : 0)}px;
                }

                td {
                    border-bottom-width: 1px;
                }
        
                & > td {
                    border-left-width: 0;
                    border-right-width: 0;
                }
                
                & > td {
                    border-bottom-width: 0;
                }
            }

            table {
                border: none;
            }
        }
    }

    & > .ant-table > table > .ant-table-body > .ant-table-expanded-row:last-child > td{
        border-bottom-width: ${(props) => ((props.bordered === undefined ? false : !!props.bordered) ? 1 : 0)}px;
    }
`

const momentify = (val, propsMoment) => {
    const format = typeof propsMoment === 'string' ? propsMoment : 'YYYY-MM-DD HH:mm:ss';
    return val ? moment(isNaN(val) ? val : Number(val)).format(format) : null;
}

const Component = props => {
    const { children, columns } = props
    const renderProps: any = {}
    if (children) {
        renderProps.children = React.Children.map(props.children, (item) => {
            const cloneProps = { ...item.props };
            if (item.props.moment) {
                if (item.props.moment) {
                    cloneProps.render = (val) => momentify(val, item.props.moment)
                }
                
                return React.cloneElement(item, {
                    ...cloneProps,
                })
            } else {
                return item
            }
        })
    } else {
        renderProps.columns = columns.map(item => {
            if (item.moment) {
                return {
                    ...item,
                    render: (val) => momentify(val, item.moment)
                }
            } else {
                return item;
            }
        })
    }
    
    return <TableStyledWrapper bordered={props.bordered}>
        <TableProvider pickInitialTableProps={pickInitialTableProps}>
            {(connectProps, list) => {
                return <RecursionTable
                    pagination={false}
                    {...connectProps}
                    {...props}
                    {...renderProps}
                    isRoot
                    onChange={(_, filters, sorter) => {
                        const { columnKey, order } = sorter
                        list.notify(ListLifeCycleTypes.ON_LIST_SORT, {
                            sorter: {
                                [columnKey]: order
                            }
                        })
                        list.notify(ListLifeCycleTypes.ON_LIST_FILTER, filters)
                    }}
                    className={`${connectProps.className || ''} ${props.className || ''} alist-recursion-table`}
                />
            }}
        </TableProvider>
    </TableStyledWrapper>
}

Object.assign(Component, {
    Column: Table.Column,
    ColumnGroup: Table.ColumnGroup,
})

export default Component;
