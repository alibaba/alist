import Form, { FormItem, FormCore } from 'noform';
import React from 'react';

declare interface FilterProps {
    onSubmit:Function,
    onReset:Function,
}

export interface Filter extends Form  {
    core: FormCore,
    Item: FormItem,
}

