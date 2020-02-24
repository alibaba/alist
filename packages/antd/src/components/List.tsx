import React from 'react';
import { ListProvider } from '@alist/react'
import useAntdList from '../hooks/useAntdList';

const List = (props) => {
    useAntdList(props)
    return <ListProvider {...props} />
}

export default List;