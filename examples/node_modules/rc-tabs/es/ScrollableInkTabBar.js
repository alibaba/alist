import createReactClass from 'create-react-class';
import InkTabBarMixin from './InkTabBarMixin';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

var ScrollableInkTabBar = createReactClass({
  displayName: 'ScrollableInkTabBar',
  mixins: [RefMixin, TabBarMixin, InkTabBarMixin, ScrollableTabBarMixin],
  render: function render() {
    var inkBarNode = this.getInkBarNode();
    var tabs = this.getTabs();
    var scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
    return this.getRootNode(scrollbarNode);
  }
});

export default ScrollableInkTabBar;