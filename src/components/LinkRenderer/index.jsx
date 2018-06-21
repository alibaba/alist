import React from 'react';
import { Link } from "react-router-dom";

class LinkRenderer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { children, href = '' } = this.props;
        let linkText = (children && children[0]) || '';

        if (href && href.indexOf('http') !== -1) {
            return <a href={href} target="_blank">{linkText}</a>
        } else {            
            return <Link to={href}>{linkText}</Link>
        }        
    }
}

export default LinkRenderer;