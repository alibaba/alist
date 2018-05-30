import React from 'react';
import { Link } from "react-router-dom";

class LinkRenderer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { children, href } = this.props;
        let linkText = (children && children[0]) || '';
        return <Link to={href}>{linkText}</Link>
    }
}

export default LinkRenderer;