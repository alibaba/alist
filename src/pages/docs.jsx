import React from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import CodeRenderer from '../components/CodeRenderer';
import LinkRenderer from '../components/LinkRenderer';
import Markdown from 'react-markdown';

class ScrollToTopOnMount extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          window.scrollTo(0, 0)
        }
    }

    componentDidMount() {
      window.scrollTo(0, 0)
    }
  
    render() {
      return null
    }
}

class Docs extends React.Component {

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
        const { location, match } = props;
        const { params } = match;
        const { type: mdType } = params;
        const { search } = location;
        const [_, md] = search.split('=');
    
        const mdUrl = `${mdType}/${md}.md`;
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
        const { location, match, history } = this.props;
        const { params } = match;
        const { lang } = params;

        return <div>
            <Header lang={lang} history={history} />
            <ScrollToTopOnMount location={location} />
            <Layout location={location} match={match}>
                <Markdown source={mdContent} lang={lang} renderers={{
                    code: (props) => {
                        return <CodeRenderer {...props} lang={lang} />
                    },
                    link: LinkRenderer
                }} />
            </Layout>
        </div>
    }
}

export default Docs;