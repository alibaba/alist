import { IListProps } from '@alist/core/lib/types'
const  isFn = (fn: any) => typeof fn === 'function'

const pickupAttrs = (props: any): IListProps & { actions: any } => {
    const {
        actions,
        dataSource, url, method, params, pageSize, currentPage,
        total, autoLoad, defaultFilterValues, multiple,
        filterConfig, query, 
        formatBefore, formatAfter, formatFilter,
        lifeCycles,
    } = props;
    return {
        actions,
        dataSource, url, method, params, pageSize, currentPage,
        total, autoLoad, defaultFilterValues, multiple,
        filterConfig, query, 
        formatBefore, formatAfter, formatFilter,
        lifeCycles,
    }
}

const normalizeNumPx = (numpx) => {
    return `${numpx}`.replace('px', '')
}

const isValidNumber = (num) => {
    const normalizeNum = Number(normalizeNumPx(num))
    return !isNaN(normalizeNum) && !!normalizeNum
}

export {
    isFn,
    pickupAttrs,
    normalizeNumPx,
    isValidNumber,
};
