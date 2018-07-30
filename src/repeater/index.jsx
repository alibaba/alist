import createRepeater from './createRepeater';
import tableRepeater from './components/biz/table-repeater';
import inlineRepeater from './components/biz/inline-repeater';
import selectRepeater from './components/biz/select-repeater';
import createActionButton from './components/core/ActionButton';

export default function wrapper(source) {
    return {
        TableRepeater: createRepeater(tableRepeater, source),
        InlineRepeater: createRepeater(inlineRepeater, source),
        Selectify: selectRepeater.bind(null, source),
        ActionButton: createActionButton(source),
    };
}
