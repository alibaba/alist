import React from 'react'
import useExpandContainer from '../hooks/useExpandContainer'

const createExpandContainer = ({ createControllerBox, VirtualField }) => {    
    return createControllerBox('filter-expand-container', (options) => {
        const targetPath = `${options.schema.path}_real_vf`
        useExpandContainer({ ...options, targetPath })
        return <VirtualField name={targetPath}>{options.children}</VirtualField>
    })
}

export default createExpandContainer