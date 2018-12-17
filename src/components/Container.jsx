import React from "react";
import { Route } from 'react-router-dom';

import SideBar from './SideBar';
import Content from './Content';

class App extends React.Component {
    state = {
        match: {}
    }

    componentDidMount() {
        const { match } = this.props;
        this.setState({
            match,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        const { match } = this.props;
        this.setState({
            match,
        });
    }

    render() {
        const { match } = this.state;

        return (
            <div className="flex-container">
                <SideBar match={match} />
                <Route path={`/:user/:repo/:slug`} component={Content}/>
            </div>
        )
    }
}

export default App;