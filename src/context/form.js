import React from 'react';
import FormCore from '../core/form';

const context = React.createContext({
    form: new FormCore(),
});

export default context;
