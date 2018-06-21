import createReactClass from 'create-react-class';
import TabBarMixin from './TabBarMixin';
import RefMixin from './RefMixin';

var TabBar = createReactClass({
  displayName: 'TabBar',
  mixins: [RefMixin, TabBarMixin],
  render: function render() {
    var tabs = this.getTabs();
    return this.getRootNode(tabs);
  }
});

export default TabBar;