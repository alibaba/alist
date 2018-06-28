import React from 'react';
import { Link } from "react-router-dom";
import { Select } from 'antd';
import './index.less';

const Option = Select.Option;

class Header extends React.Component {
    changeLang = (lang) => {
        window.emitter.emit('lang', lang);
    }
    
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
                    <Link to={"/demo?md=simple"} className="nav-entry">
                        Examples
                    </Link>
                    <Link to={"/api?md=all"} className="nav-entry">
                        API
                    </Link>
                    <a className="nav-entry">
                        <Select defaultValue="en" onChange={this.changeLang} style={{ width: 100 }}>
                            <Option value="en">english</Option>
                            <Option value="zh">中文</Option>
                        </Select>
                    </a>
                </div>
            </header>
        </div>
    }
}

export default Header;