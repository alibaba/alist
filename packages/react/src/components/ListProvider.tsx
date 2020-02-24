import React, { useEffect } from 'react'
import ListContext from '../context'
import useList from '../hooks/useList'
import { ListLifeCycleTypes } from '@alist/core';

const ListProvider: React.FC<any> = (props = {}) => {
  const { className, children, style, ...others } = props || {}
  const list = useList(others)
  let element
  if (typeof children === 'function') {
      element = children(list)
  } else {
      element = children || React.Fragment
  }

  useEffect(() => {
    list.notify(ListLifeCycleTypes.ON_LIST_MOUNTED)
  }, [])
  
  return (
    <ListContext.Provider value={list}>
      <div className={className} style={style}>
        {element}
      </div>
    </ListContext.Provider>
  )
}

export default ListProvider