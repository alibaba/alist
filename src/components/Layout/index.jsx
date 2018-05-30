import React from 'react';
import Sidebar from '../Sidebar';
import './index.less';

class Layout extends React.Component {
    render() {
        const { location } = this.props;
        return <div className="layout">
            <div className="main-content">
                <article className="content-body">{this.props.children}</article>
                <Sidebar location={location} />
            </div>
        </div>
    }
}

export default Layout;