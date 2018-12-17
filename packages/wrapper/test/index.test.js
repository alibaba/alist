import React from 'react';
import ReactDOM from 'react-dom';
import Nopage from '../src';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Nopage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
