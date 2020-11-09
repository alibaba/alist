import React, { forwardRef } from 'react'
import { SorterProvider } from '@alist/react'
import { createVirtualBox } from '@formily/next'
import styled from 'styled-components';

const defaultAscIcon = <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg>
const defaultDescIcon = <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>

const noop = () => {}
const InternalSorter = styled(forwardRef((props, ref) => {
    const { className, render,
        style,
        ascIcon = defaultAscIcon,
        descIcon = defaultDescIcon,
        onSort = noop,
    ...others } = props
    return <SorterProvider {...others}>
        {({ order, setOrder }) => {
            if (typeof render === 'function') {
                return render({ order, setOrder })
            }

            return <span ref={ref} className={`next-table-header-icon next-table-sort ${className}`} style={style}>
                <a className={`${order === 'asc' ? 'current' : ''}`}>
                    <i className={`next-icon alist-sorter asc `}
                        onClick={() => {
                            const nextOrder = setOrder('asc')
                            onSort(props.dataIndex, nextOrder)
                        }}
                    >{ascIcon}</i>
                </a>
                <a className={`${order === 'desc' ? 'current' : ''}`}>
                <i className={`next-icon alist-sorter desc  `}
                    onClick={() => {
                        const nextOrder = setOrder('desc')
                        onSort(props.dataIndex, nextOrder)
                    }}
                >{descIcon}</i>
                </a>
            </span>
        }}
    </SorterProvider>
}))`
    display: inline-block;
    line-height: 1;
    margin-left: 6px;
    position: relative;
    vertical-align: middle;
    height: 1rem;
    cursor: pointer;
    margin-top: -4px;

    &.next-table-sort {
        width: auto;
    }
    
    .alist-sorter {
        transform: scale(0.91666667) rotate(0deg);
    }

    .alist-sorter.asc {
        top: 0px;
    }

    .alist-sorter.desc {
        top: 7.5px;
    }
`

const Sorter = createVirtualBox('alist-sorter', InternalSorter)

export {
    InternalSorter,
    Sorter,
}