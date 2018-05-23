import React from 'react';
import { Link } from "react-router-dom";
import './index.less';
import menuSummary from '../../summary';

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
        const { menus } = this.props;
        return <aside>
            {this.renderMenu(menuSummary.chapters)}
        </aside>
    }
}

export default SideBar;