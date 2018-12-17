import factory from './factory';
import Repeater from './Repeater';
import SelectRepeater from './SelectRepeater';
import ActionButton from './ActionButton';

export default function wrapper(source) {
    return {
        TableRepeater: factory(Repeater, 'table', source),
        InlineRepeater: factory(Repeater, 'inline', source),
        Selectify: SelectRepeater.bind(null, source),
        ActionButton,
    };
}
