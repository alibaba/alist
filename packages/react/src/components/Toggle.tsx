import React, { useContext } from 'react'
import ToggleContext from '../context/toggle'

const Toggle = (props) => {
    const { id, children } = props
    const { toggle, openRowKeys } = useContext(ToggleContext)
    const expandStatus = openRowKeys.indexOf(id) !== -1 ? 'expand' : 'collapse'

    let element
    if (typeof children === 'function') {
        element = children({
            toggle: () => {
                id && toggle(id)
            },
            expandStatus,
        })
    } else {
        element = children || React.Fragment
    }

    return element
}

export default Toggle