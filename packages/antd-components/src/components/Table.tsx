import React, { forwardRef, useContext, useEffect } from 'react'
import { LoadingProvider, TableProvider, ListLifeCycleTypes, useToggle, ToggleContext, ListContext } from '@alist/react'
import { Table as AntdTable, Spin } from 'antd'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { ColumnGroupProps } from 'antd/lib/table/ColumnGroup'
import { IVirtualBoxProps, createVirtualBox, createControllerBox, FormExpressionScopeContext, complieExpression } from '@formily/antd'
import styled, { css } from 'styled-components'
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
        loading,
        ...others
    } = props
    const hasExtraRow = (dataSource || []).find(item => Array.isArray(item.children) && item.children.length > 0)
    const { enableHookCrtl, openRowKeys, toggle, toggleAll, toggleState } = useToggle({...props, toggleeKey: 'expandedRowKeys' })
    const expandProps: any = {};
    
    const list: any = useContext(ListContext)
    const columnsProps = {}
    const { columns, children } = others 
    if (list) {
        // 第一次会进入这里       
        if (list.getAllColumns().length === 0) {
            if (columns) {
                list.setAllColumns(columns)
                list.setColumns(columns, { init: true })
            } else {
                list.setAllColumns(children || [])
                list.setColumns(children || [], { init: true })
            }
        }

        if (list.hasSetColumns()) {
            columnsProps[columns ? 'columns' : 'children'] = list.getColumns()
        }
    }

    useEffect(() => {
        if (isRoot && list) {
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

    if (enableHookCrtl) {
        expandProps.expandedRowKeys = props.expandedRowKeys || openRowKeys
    }

    return <ToggleContext.Provider value={{ toggle, toggleAll, toggleState, openRowKeys }}>
        <LoadingProvider>
            {(loading) => {
                return <Spin spinning={loading} style={{ width: '100%' }}>
                    <AntdTable
                        className={`${props.className || ''} ${isLoop ? '.alist-recursion-loop' : ''}`}
                        dataSource={loopDataSource}
                        {...expandProps}
                        {...others}
                        {...columnsProps}
                    />
                </Spin>
            }}
        </LoadingProvider>
        
    </ToggleContext.Provider>
}

const TableStyledWrapper = styled(forwardRef((props, ref) => {
    const { hasTreeCtrl, ...others } = props
    return <div {...others} ref={ref} />
}))`
    margin-bottom: 16px;

    .alist-recursion-table {
        .alist-recursion-loop {
            table {
                .ant-table-row-expand-icon-cell,
                .ant-table-expand-icon-th,
                .ant-table-expand-icon-col {
                    display: none;
                }

                .ant-table-expanded-row > td:first-child {
                    display: none;
                }
            }
        }
        table {
            td.ant-table-cell.ant-table-cell-with-append {
                ${props => (props.hasTreeCtrl === false) && css`
                    > span.ant-table-row-indent {
                        padding-left: 16px !important;

                        
                    }
                    .ant-table-row-expand-icon-expanded,
                    .ant-table-row-expand-icon-collapsed,
                    .ant-table-row-expand-icon-spaced {
                        display: none;
                    }
                `}
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

declare function ColumnType<RecordType>(_: ColumnProps<RecordType> & { sortable: boolean }): null;
type AListTableProps = TableProps<any> & { loopBackground?: boolean, hasTreeCtrl?: boolean }
type InternalTableType =  React.FunctionComponent<AListTableProps> & {
    Column: typeof ColumnType
    ColumnGroup: typeof AntdTable.ColumnGroup,
}

const needComputeColumnProps = (itemProps) => ['moment'].filter(k => (k in (itemProps || {}))).length > 0
const computeColumnProps = (itemProps) => {
    const cloneProps = { ...(itemProps || {}) }
    if (itemProps.moment) {
        cloneProps.render = (val) => momentify(val, itemProps.moment)
    }

    return cloneProps
}

const InternalTable: InternalTableType = props => {
    const { children, columns, ...others } = props
    const renderProps: any = {}
    if (children) {
        renderProps.children = React.Children.map(props.children, (item: any) => {
            if (!item) return item
            if (needComputeColumnProps(item.props)) {
                const cloneProps = computeColumnProps(item.props)
                return React.cloneElement(item, cloneProps)
            } else {
                return item
            }
        })
    } else {
        renderProps.columns = columns.map((item: any) => {
            if (!item) return item
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
    
    return <TableStyledWrapper
        bordered={props.bordered}
        hasTreeCtrl={props.hasTreeCtrl}
    >
        <TableProvider pickInitialTableProps={pickInitialTableProps} {...others}>
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

InternalTable.Column = AntdTable.Column;
InternalTable.ColumnGroup = AntdTable.ColumnGroup;

const ComponentMap = {
    'alist-table-column': InternalTable.Column,
    'alist-table-column-group': InternalTable.ColumnGroup,
}

type ExtendsProps = {
    Column?: React.FC<IVirtualBoxProps<ColumnProps<any>>>,
    ColumnGroup?: React.FunctionComponent<ColumnGroupProps<any>>,
}

const SchemaTable = (props) => {
    const { schema, children } = props
    const componentProps = schema.getExtendsComponentProps()
    const { columns, ...others } = componentProps
    if (columns) {
        return <InternalTable {...componentProps} />
    } else if (Array.isArray(children) && children.length) {
        const expressionScope = useContext(FormExpressionScopeContext)
        const tableColumns = children.map(child => {
            const targetComponent = child.props.schema.getExtendsComponent()
            const targetComponentProps = complieExpression(
                child.props.schema.getExtendsComponentProps(),
                expressionScope
            )
            if (targetComponent === 'alist-table-column-group') {
                return React.createElement(ComponentMap[targetComponent], {
                    ...targetComponentProps,
                    children: tableColumns(targetComponentProps.children)
                })
            } else {
                return React.createElement(ComponentMap[targetComponent], targetComponentProps)
            }            
        })

        return <InternalTable {...others}>
            {tableColumns}
        </InternalTable>
    }
    return null
}

type VirtualTableProps = React.FC<IVirtualBoxProps<AListTableProps>> & ExtendsProps
const Table: VirtualTableProps = createControllerBox<AListTableProps>('alist-table', SchemaTable)

Table.Column = createVirtualBox<ColumnProps<any> & { sortable: boolean }>('alist-table-column', InternalTable.Column)
Table.ColumnGroup = createVirtualBox<ColumnGroupProps<any>>('alist-table-column-group', InternalTable.ColumnGroup)

export {
    InternalTable,
    Table,
    VirtualTableProps,
    SchemaTable,
    AListTableProps,
    InternalTableType,
}
