import React from 'react';
import PropTypes from 'prop-types';

function TableCom({ header, children, hasHeader }) {
    return (<table>
        { hasHeader ? <thead>
            <tr>
                {header}
            </tr>
        </thead> : null }
        <tbody>
            {children}
        </tbody>
    </table>);
}

TableCom.propTypes = {
    header: PropTypes.any,
    children: PropTypes.any,
    hasHeader: PropTypes.bool,
};

export default TableCom;
