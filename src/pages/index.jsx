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
            <Layout>
                <div className="homepage-wrapper">
                    <h1>noform - 可能是最好的表单解决方案</h1>
                </div>
            </Layout>
        </div>
    }
}

export default Main;