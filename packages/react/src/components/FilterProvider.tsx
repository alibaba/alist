import React from 'react'
import useFilter from '../hooks/useFilter'
import FilterModeContext from '../context/filterMode'

const FilterProvider: React.FC<any> = (props = {}) => {
    const { mode, children } = props
    const { filterInstance, list } = useFilter(props)

    let element
    if (typeof children === 'function') {
        element = children({
            filterInstance,
        }, list)
    } else {
        element = children || React.Fragment
    }

    return <FilterModeContext.Provider value={{ mode }}>
        {element}
    </FilterModeContext.Provider>
}

export default FilterProvider