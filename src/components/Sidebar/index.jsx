import React from 'react';
import { Link } from "react-router-dom";
import './index.less';
import docsSummary from '../../docs_summary';
import apiSummary from '../../api_summary';
import examplesSummary from '../../examples_summary';

class SideBar extends React.Component {
    renderMenu(menus) {
        const menuItems = menus.map((mitem) => {
            const { title, articles, introduction } = mitem;
            if (!introduction) {
                const links = articles.map((arItem) => {
                    const { title: linkTitle, path } = arItem;
                    return <li><Link to={path}>{linkTitle}</Link></li>
                });
                return <div>
                    <dt>{title}</dt>
                    <dd><ul>{links}</ul></dd>
                </div>
            } else {
                return null;
            }
        });

        return <dl>{menuItems}</dl>
    }

    render() {
        const { location } = this.props;
        const { pathname } = location;
        const mdPrefix = pathname.replace(/\//g, '');

        let summary = null;
        switch (mdPrefix) {
            case 'docs': summary = docsSummary; break;
            case 'examples': summary = examplesSummary; break;
            case 'api': summary = apiSummary; break;
        }

        return <aside>
            {this.renderMenu(summary.chapters)}
        </aside>
    }
}

export default SideBar;