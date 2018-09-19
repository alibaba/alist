import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Basic from './page/Basic';
import Repeater from './page/Repeater';
import FormConfig from './page/FormConfig';
import RepeaterConfig from './page/RepeaterConfig';
import RepeaterAdvanced from './page/RepeaterAdvanced';
import './App.less';

const Example = () => (
  <Router>
    <div>
      <ul>
        <h1>Examples Entry:</h1>
        <li><Link to="/">Basic</Link></li>
        <li><Link to="/formConfig">Form(Configuartion)</Link></li>
        <li><Link to="/repeater">Repeater</Link></li>
        <li><Link to="/repeaterConfig">Repeater(Configuartion)</Link></li>
        <li><Link to="/RepeaterAdvanced">Repeater(Advanced)</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={Basic} />
      <Route exact path="/formConfig" component={FormConfig} />
      <Route path="/repeater" component={Repeater} />
      <Route path="/repeaterConfig" component={RepeaterConfig} />
      <Route path="/RepeaterAdvanced" component={RepeaterAdvanced} />
    </div>
  </Router>
);

export default Example;
