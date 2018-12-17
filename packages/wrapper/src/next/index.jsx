import ComponentSummary from './components';
import wrapper from './wrapper';
import DialogWrapper from './dialog';

const wrapperedSummary = wrapper(ComponentSummary);
const Dialog = DialogWrapper({ Dialog: wrapperedSummary.Dialog, Button: wrapperedSummary.Button });

const {
    Button,
    Input,
    Select,
    Checkbox,
    Radio,
    Switch,
    Range,
    DatePicker,
    TimePicker,
    NumberPicker,
    Rating,
    Search,
    CascaderSelect,
    Tree,
    Upload,
} = wrapperedSummary;

export {
    Dialog,
    Button,
    Input,
    Select,
    Checkbox,
    Radio,
    Switch,
    Range,
    DatePicker,
    TimePicker,
    NumberPicker,
    Rating,
    Search,
    CascaderSelect,
    Tree,
    Upload,
};
