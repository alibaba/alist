import React from 'react';
import { Link } from "react-router-dom";
import './index.less';
import docsSummary from '../../docs_summary';
import apiSummary from '../../api_summary';
import demoSummary from '../../demo_summary';
import LangContext from '../ContextProvider';


class SideBar extends React.Component {
    renderMenu(menus, lang) {
        const isEn = lang === 'en';
        const menuItems = menus.map((mitem) => {
            const { title, enTitle, articles, introduction } = mitem;
            if (!introduction) {
                const links = articles.map((arItem) => {
                    const { title: linkTitle, enTitle: linkEnTitle, path } = arItem;
                    const linkItemTitle = isEn ? linkEnTitle : linkTitle;
                    return <li><Link to={path}>{linkItemTitle}</Link></li>
                });

                const itemTitle = isEn ? enTitle : title;
                return <div>
                    <dt>{itemTitle}</dt>
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
            case 'demo': summary = demoSummary; break;
            case 'api': summary = apiSummary; break;
        }

        return <LangContext.Consumer>
            {(lang) => {
                return <aside>
                    {this.renderMenu(summary.chapters, lang)}
                </aside>
            }}
        </LangContext.Consumer>        
    }
}

export default SideBar;