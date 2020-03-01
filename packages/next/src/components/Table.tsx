import React, { useEffect, useContext } from 'react'
import { TableProvider, ListLifeCycleTypes, useToggle, ToggleContext, ListContext, useEva } from '@alist/react'
import { Table } from '@alifd/next'
import moment from 'moment'
import styled, { css } from 'styled-components'
import Sorter from './Sorter'


// 遵循最小可用原则来采集初始化的table属性
const pickInitialTableProps = (props) => {
    const result = {}
    const attrs = ['rowSelection', 'className', 'primaryKey']
    attrs.forEach(k => {
        if (k in props) {
            result[k] = props[k]
        }
    })
    return result
}

const VerCenterTitle = styled((props) => <div {...props} />)`
    display: flex;
    align-items: center;
`

const RecursionTable = (props) => {
    const { dataSource,
        hasExpandedRowCtrl = true, expandedRowIndent,
        isLoop = false, loopProps = {},
        isRoot,
        ...others
    } = props
    const hasExtraRow = (dataSource || []).find(item => Array.isArray(item.children) && item.children.length > 0)
    const { enableHookCrtl, openRowKeys, toggle, toggleAll, toggleState } = useToggle({...props, toggleeKey: 'openRowKeys' })
    const expandProps: any = {};
    
    const list: any = useContext(ListContext)
    useEffect(() => {
        if (isRoot) {
            list.actions.addAPI('toggle', toggle)
            list.actions.addAPI('toggleAll', toggleAll)
            list.actions.addAPI('getToggleState', () => toggleState)
        }
    })

    let defaultExpandedRowIndent = [1, 0]
    if (isLoop) {
        defaultExpandedRowIndent = [0, 0]
        if (hasExtraRow) {
            expandProps.expandedRowRender=(record) => <RecursionTable
                    hasHeader={false}
                    hasBorder
                    dataSource={record.children}
                    {...others}
                    {...loopProps}
                    isLoop
                />
        }
    }

    if (enableHookCrtl) {
        expandProps.openRowKeys = props.openRowKeys || openRowKeys
    }

    return <ToggleContext.Provider value={{ toggle, openRowKeys, toggleAll, toggleState }}>
        <Table
            dataSource={dataSource}
            {...expandProps}
            {...others}
            hasExpandedRowCtrl={hasExpandedRowCtrl}
            expandedRowIndent={expandedRowIndent || defaultExpandedRowIndent}
        />
    </ToggleContext.Provider>
}

const TableStyledWrapper = styled((props) => {
    return <div {...props} />
})`
    margin-bottom: 16px;

    .alist-recursion-table {
        table {
            .next-table-expanded-row {        
                td {
                    border-width: ${(props) => ((props.hasBorder === undefined ? true : !!props.hasBorder) ? 1 : 0)}px;
                }
        
                & > td {
                    border-left-width: 0;
                    border-right-width: 0;
                }

                .next-table-row:last-child td {
                    border-bottom-width: 0;
                }

                & > td {
                    border-bottom-width: 0;
                }

                tr {
                    ${props => props.loopBackground && css`
                        background: ${props.loopBackground}
                    ` }
                }
            }
        }
    
        .next-table.no-header table {
            tr:first-child td {
                border-top-width: 0;
            }
        }   
    }

    & > .next-table > table > .next-table-body > .next-table-expanded-row:last-child > td{
        border-bottom-width: ${(props) => ((props.hasBorder === undefined ? true : !!props.hasBorder) ? 1 : 0)}px;
    }
`

const noop = () => {}
const Component = props => {
    const { onSort = noop, onFilter = noop } = props
    const columns = React.Children.map(props.children, (item) => {
        const cloneProps = { ...item.props };
        if (item.props.sortable || item.props.moment) {
            if (item.props.sortable) {
                cloneProps.sortable = undefined;
                cloneProps.title = <VerCenterTitle>
                    {item.props.title}
                    <Sorter dataIndex={item.props.dataIndex} onSort={(dataIndex, order) => {
                        onSort(dataIndex, order)
                    }}/>
                </VerCenterTitle>;
            }

            if (item.props.moment) {
                cloneProps.cell = (val) => {
                    const format = typeof item.props.moment === 'string' ? item.props.moment : 'YYYY-MM-DD HH:mm:ss';
                    return val ? moment(isNaN(val) ? val : Number(val)).format(format) : null;
                }
            }
            
            return React.cloneElement(item, {
                ...cloneProps,
            })
        } else {
            return item
        }
    })

    return <TableStyledWrapper
        hasBorder={props.hasBorder}
        loopBackground={props.loopBackground}
    >
        <TableProvider pickInitialTableProps={pickInitialTableProps}>
            {(connectProps, list) => {
                return <RecursionTable
                    {...connectProps}
                    {...props}
                    children={columns}
                    isRoot
                    onFilter={(filterParams) => {
                        onFilter(filterParams)
                        list.notify(ListLifeCycleTypes.ON_LIST_FILTER, filterParams)
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
    GroupHeader: Table.GroupHeader,
    GroupFooter: Table.GroupFooter,
})

export default Component;
