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
        <h1>Resources: </h1>         
        <div><a href="https://github.com/alibaba/noform">NoForm Github</a></div>
        <div><a href="https://alibaba.github.io/noform">NoForm Docs</a></div>
          <h3>Feel free to star us! <a class="github-button" href="https://github.com/alibaba/noform" data-icon="octicon-star" data-show-count="true" aria-label="Star alibaba/noform on GitHub">Star</a></h3>
      </ul>
      
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
