import React from 'react';
import PropTypes from 'prop-types';

function TableCom({ header, children }) {
    return (<table>
        <thead>
            <tr>
                {header}
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>);
}

TableCom.propTypes = {
    header: PropTypes.any,
    children: PropTypes.any,
};

export default TableCom;
