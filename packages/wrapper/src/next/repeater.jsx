import { Dialog, Button, Radio, Checkbox, Input } from './index';
import RepeaterWrapper from 'noform/lib/repeater/index.js';

const { TableRepeater, InlineRepeater, Selectify, ActionButton } = RepeaterWrapper({ Dialog, Button, Radio, Checkbox, Input });

export {
    TableRepeater,
    InlineRepeater,
    Selectify,
    ActionButton
};
