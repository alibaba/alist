import React from 'react';
import './index.less';

class Header extends React.Component {
    render() {
        return <div className="nav">
            <div>
                <title>NoForm - 可能是最好的表单解决方案</title>
                <link rel="stylesheet" href="/_next/static/style.css" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="https://gw.alicdn.com/tfs/TB19NLNirGYBuNjy0FoXXciBFXa-32-32.png" type="image/x-icon" />
                
            </div>
            <header>
                <a href="/" className="nav-logo">
                    <img src="https://gw.alicdn.com/tfs/TB1WeOJix9YBuNjy0FfXXXIsVXa-186-25.png" />
                </a>
            </header>
        </div>
    }
}

export default Header;