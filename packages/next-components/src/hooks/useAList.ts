import useNextList from './useNextList';
// import { useTable, usePagination } from '@alist/react';

export const useAList = (props) => {
    const { tableProps = {}, ...others } = props;
    const { actions } = useNextList(others);
    // const table = useTable(tableProps, actions);
    // const pagination = usePagination({}, actions);

    return {
        actions,
        // table,
        // pagination,
    }
}

export default useAList;
