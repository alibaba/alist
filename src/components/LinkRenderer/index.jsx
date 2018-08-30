import React from 'react';
import { Link } from "react-router-dom";

class LinkRenderer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { children, href = '', lang } = this.props;
        let linkText = (children && children[0]) || '';

        if (href && href.indexOf('http') !== -1) {
            return <a href={href} target="_blank">{linkText}</a>
        } else {
            let url = href;
            if (href.indexOf(lang) === -1) {
                url = `/${lang}${url}`;
            }
            return <Link to={url}>{linkText}</Link>
        }        
    }
}

export default LinkRenderer;