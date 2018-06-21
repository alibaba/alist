import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createRepeater from './createRepeater';
import tableRepeater from './components/biz/table-repeater';
import inlineRepeater from './components/biz/inline-repeater';

export default function wrapper(source) {
    return {
        TableRepeater: createRepeater(tableRepeater, source),
        InlineRepeater: createRepeater(inlineRepeater, source),
    };
}
