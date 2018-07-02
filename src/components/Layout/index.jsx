import React from 'react';
import Sidebar from '../Sidebar';
import './index.less';

class Layout extends React.Component {
    render() {
        const { children, ...others } = this.props;
        return <div className="layout">
            <div className="main-content">
                <article className="content-body">{children}</article>
                <Sidebar {...others} />
            </div>
        </div>
    }
}

export default Layout;