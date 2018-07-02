import React from 'react';
import { Link } from "react-router-dom";
import { Select } from 'antd';
import './index.less';

const Option = Select.Option;

class Header extends React.Component {
    changeLang = (lang) => {
        const { location } = this.props.history;
        const { pathname = '', search = '' } = location;

        window.emitter.emit('lang', lang, {
            pathname,
            search
        }, this.props.history);
    }
    
    render() {
        const { lang } = this.props;
        return <div className="nav">
            <div>
                <title>NoForm - 可能是最好的表单解决方案</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </div>
            <header>
                <Link to={`/${lang}/`} className="nav-logo">
                    <img src="https://img.alicdn.com/tfs/TB1BaF2ueuSBuNjy1XcXXcYjFXa-275-191.svg" />
                </Link>

                <div className="entry-list">
                    <Link to={`/${lang}/docs?md=easy/easy`} className="nav-entry">
                        Document
                    </Link>
                    <Link to={`/${lang}/demo?md=simple`} className="nav-entry">
                        Examples
                    </Link>
                    <Link to={`/${lang}/api?md=all`} className="nav-entry">
                        API
                    </Link>
                    <a className="nav-entry">
                        <Select defaultValue={lang} onChange={this.changeLang} style={{ width: 100 }}>
                            <Option value="en-US">english</Option>
                            <Option value="zh-CN">中文</Option>
                        </Select>
                    </a>
                </div>
            </header>
        </div>
    }
}

export default Header;