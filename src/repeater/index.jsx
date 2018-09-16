import CreateRepeater from './CreateRepeater';
import Repeater from './components/biz/Repeater';
import SelectRepeater from './components/biz/SelectRepeater';
import createActionButton from './components/core/ActionButton';

export default function wrapper(source) {
    return {
        TableRepeater: CreateRepeater(Repeater, 'table', source),
        InlineRepeater: CreateRepeater(Repeater, 'inline', source),
        Selectify: SelectRepeater.bind(null, source),
        ActionButton: createActionButton(source),
    };
}
