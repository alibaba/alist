import createRepeater from './createRepeater';
import Repeater from './components/biz/Repeater';
import selectRepeater from './components/biz/select-repeater';
import createActionButton from './components/core/ActionButton';

export default function wrapper(source) {
    return {
        TableRepeater: createRepeater(Repeater, 'table', source),
        InlineRepeater: createRepeater(Repeater, 'inline', source),
        Selectify: selectRepeater.bind(null, source),
        ActionButton: createActionButton(source),
    };
}
