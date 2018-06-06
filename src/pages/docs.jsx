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
        const { location } = props;
        const { search, pathname } = location;
        const [_, md] = search.split('=');

        const mdPrefix = pathname.replace(/\//g, '');
    
        const mdUrl = `${mdPrefix}/${md}.md`;
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
        const { location } = this.props;

        return <div>
            <Header />
            <ScrollToTopOnMount location={location} />
            <Layout location={location} >
                <Markdown source={mdContent} renderers={{
                    code: CodeRenderer,
                    link: LinkRenderer
                }} />
            </Layout>
        </div>
    }
}

export default Docs;