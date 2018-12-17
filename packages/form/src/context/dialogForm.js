import React from 'react';

const context = React.createContext({
    onDialogMount: () => {},
    dialogFooter: () => {},
});

export default context;
