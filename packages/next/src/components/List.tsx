import React from 'react';
import { ListProvider } from '@alist/react'
import useNextList from '../hooks/useNextList';

const List = (props) => {
    const opts = useNextList(props)
    return <ListProvider {...props} {...opts} />
}

export default List;