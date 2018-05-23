import React from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import CodeRenderer from '../components/CodeRenderer';
import Markdown from 'react-markdown';

const jump = () => {
    // Router.push(`/`)
};

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            mdContent: ''
        };

        this.renderers = {
            CodeBlock: CodeRenderer,
            Code: CodeRenderer
        };
    }

    async componentDidMount() {
        this.updateMdContent(this.props);
    }

    updateMdContent = async (props) => {
        const { location } = props;
        const { search } = location;
        const [_, md] = search.split('=');
    
        const mdUrl = `docs/${md}.md`;
        const result = await fetch(mdUrl);
        const mdContent = await result.text();

        this.setState({
            mdContent
        });
    }

    componentWillReceiveProps = (nextProps) => {
        this.updateMdContent(nextProps);
    }

    render() {
        let { mdContent } = this.state;

        return <div>
            <Header />
            <div id="xo" />

            <Layout>
                <Markdown source={mdContent} renderers={{
                    code: CodeRenderer
                }} />
            </Layout>
        </div>
    }
}

export default Main;