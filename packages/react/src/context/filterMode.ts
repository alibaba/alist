import { createContext } from 'react'
import { IFilterMode } from '../types'

const Context = createContext<IFilterMode>(null)

export default Context
