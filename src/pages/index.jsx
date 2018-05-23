import React from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            <Header />      
            <Layout />
        </div>
    }
}

export default Main;