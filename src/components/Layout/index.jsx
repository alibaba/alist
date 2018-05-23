import React from 'react';
import Sidebar from '../Sidebar';
import './index.less';

class Layout extends React.Component {
    render() {
        return <div className="layout">
            <div className="main-content">
                <article className="content-body">{this.props.children}</article>
                <Sidebar />
            </div>
        </div>
    }
}

export default Layout;