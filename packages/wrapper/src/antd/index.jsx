import ComponentSummary from './components';
import wrapper from './wrapper';
import DialogWrapper from './dialog';

const wrapperedSummary = wrapper(ComponentSummary);
const Dialog = DialogWrapper({ Modal: wrapperedSummary.Modal, Button: wrapperedSummary.Button });

const {
    Input,
    Button,
    Select,
    Checkbox,
    Radio,
    AutoComplete,
    Switch,
    Slider,
    DatePicker,
    TimePicker,
    InputNumber,
    Rate,
    Cascader,
    TreeSelect,
    Upload,
    Modal
} = wrapperedSummary;

export {
    Dialog,
    Input,
    Button,
    Select,
    Checkbox,
    Radio,
    AutoComplete,
    Switch,
    Slider,
    DatePicker,
    TimePicker,
    InputNumber,
    Rate,
    Cascader,
    TreeSelect,
    Upload,
    Modal
};

