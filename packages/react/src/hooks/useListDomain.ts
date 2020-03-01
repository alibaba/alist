import { useMemo } from 'react'
import { ListDomain } from '../shared'

export const useListDomain = () => {
    const listDomain = useMemo(() => {
        return new ListDomain()
    }, [])
    return listDomain
}

export default useListDomain
