import React from 'react';

export default class Iframe extends React.Component {
    constructor(props, context) {
        super(props, context);

        const { uniqueKey } = props;
        this.state = {
            iframeRefName: uniqueKey
        };
    }    

    componentWillReceiveProps = (nextProps) => {
        const { uniqueKey } = nextProps;
        const { iframeRefName } = this.state;

        if (this.iframeRefName !== uniqueKey) {
            this.setState({
                iframeRefName: uniqueKey
            });
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener("message", this.handleEvent);
    }

    handleEvent = (e) => {
        const { code = '' } = this.props;
        const { iframeRefName } = this.state;
        
        const { data } = e;
        if (typeof data === 'string') {
            const payload = JSON.parse(data);
            const { id, event, height } = payload;

            const cbPayload = {
                id: 'reload',
                content: code
            };
            
            if (event === 'loaded') {
                if (id === iframeRefName) {
                    e.source.postMessage(JSON.stringify(cbPayload), e.origin);
                }    
            } else if (event === 'resize') {
                const refFrame = this.refs[iframeRefName];
                if (height && refFrame) refFrame.height = height;
            }
        }        
    }

    componentDidMount() {
        window.addEventListener("message", this.handleEvent, false);
    }

    render() {
        const { iframeRefName } = this.state;
        const props = {
            key: iframeRefName,
            title: iframeRefName,
            ref: iframeRefName
        };

        return <iframe src="./demo.html" frameBorder="0" {...props} />
    }
}