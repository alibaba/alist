import React from 'react';
import Markdown from 'react-markdown';

const jump = () => {
    // Router.push(`/`)
};
class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    static getInitialProps({ query }) {
        const { mdcontent = '' } = query || {};
        return { mdcontent }
    }

    async componentDidMount() {
        const amd = await fetch('/public/a.md')
        const result = amd.text();
        console.log(typeof result);
    }

    render() {
        console.log('this.props', this.props);

        return <div>
            Welcome to second.js!
            <button onClick={jump}>hello</button>
        </div>
    }
}

export default Main;