import React from 'react';
import { Link } from "react-router-dom";
import './index.less';

class Header extends React.Component {
    render() {
        return <div className="nav">
            <div>
                <title>NoForm - 可能是最好的表单解决方案</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </div>
            <header>
                <Link to={"/"} className="nav-logo">
                    <img src="https://img.alicdn.com/tfs/TB1BaF2ueuSBuNjy1XcXXcYjFXa-275-191.svg" />
                </Link>

                <div className="entry-list">
                    <Link to={"/docs?md=easy/easy"} className="nav-entry">
                        Document
                    </Link>
                    <Link to={"/examples?md=simple"} className="nav-entry">
                        Examples
                    </Link>
                    <Link to={"/api?md=all"} className="nav-entry">
                        API
                    </Link>
                </div>
            </header>
        </div>
    }
}

export default Header;