import React from 'react';
import { ListProvider } from '@alist/react'
import useNextList from '../hooks/useNextList';

const List = (props) => {
    useNextList(props)
    return <ListProvider {...props} />
}

export default List;