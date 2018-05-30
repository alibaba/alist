import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/index';
import Doc from './pages/docs';

import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/docs" component={Doc} />
          <Route path="/examples" component={Doc} />
          <Route path="/api" component={Doc} />
        </div>
      </Router>
    );
  }
}

export default App;
