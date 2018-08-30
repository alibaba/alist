import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from './pages/index';
import Doc from './pages/docs';
import './App.css';

const SwitchDocRoutes = (props) => {
  const { match } = props;
  const { params = {} } = match;
  const { lang } = params;
  return <Doc {...props} locale={lang} />
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { lang } = this.props;
    return (
      <Router>
          <div>
            <Switch>
            <Route path={`/:lang/:type`} render={SwitchDocRoutes} />
            <Route exact path={`/:lang/`} component={Home} />            
            <Redirect strict exact from="/" to={`/${lang}/`} />
            </Switch>            
          </div>
      </Router>
    );
  }
}

export default App;
