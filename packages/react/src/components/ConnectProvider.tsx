import React from 'react'
import FieldProvider from './FieldProvider'

const ConnectProvider: React.FC<any> = (props = {}) => {
    return <FieldProvider {...props} connectMode />
}

export default ConnectProvider