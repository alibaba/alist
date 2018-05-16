import React from 'react';
import ReactDOM from 'react-dom';
import NoForm from '../src';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
