import React from "react";
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import Nav from './components/Nav';
import Container from './components/Container';

import config from './config';

class App extends React.Component{
    render() {
        return (
            <Router>
                <div>
                    <Nav />

                    {/* <Redirect path="/" to={{ pathname: `/${config.repos[0].namespace}` }} /> */}
                    <Route path="/:user/:repo" component={Container} />
                </div>
            </Router>
        )
    }
}

export default App;