import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createRepeater from './createRepeater'
import tableRepeater from './components/table-repeater';
import inlineRepeater from './components/inline-repeater';

export default function wrapper(source) {
    return {
        createRepeater,
        TableRepeater: createRepeater(tableRepeater, source),
        InlineRepeater: createRepeater(inlineRepeater, source)
    }
}
