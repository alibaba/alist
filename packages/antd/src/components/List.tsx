import React from 'react';
import { ListProvider } from '@alist/react'
import useAntdList from '../hooks/useAntdList';

const List = (props) => {
    const opts = useAntdList(props)
    return <ListProvider {...props} {...opts} />
}

export default List;