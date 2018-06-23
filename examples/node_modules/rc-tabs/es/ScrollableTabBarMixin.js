import _defineProperty from 'babel-runtime/helpers/defineProperty';
import classnames from 'classnames';
import { setTransform, isTransformSupported } from './utils';
import React from 'react';
import addEventListener from 'rc-util/es/Dom/addEventListener';
import debounce from 'lodash/debounce';

export default {
  getDefaultProps: function getDefaultProps() {
    return {
      scrollAnimated: true,
      onPrevClick: function onPrevClick() {},
      onNextClick: function onNextClick() {}
    };
  },
  getInitialState: function getInitialState() {
    this.offset = 0;
    return {
      next: false,
      prev: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.componentDidUpdate();
    this.debouncedResize = debounce(function () {
      _this.setNextPrev();
      _this.scrollToActiveTab();
    }, 200);
    this.resizeEvent = addEventListener(window, 'resize', this.debouncedResize);
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    var props = this.props;
    if (prevProps && prevProps.tabBarPosition !== props.tabBarPosition) {
      this.setOffset(0);
      return;
    }
    var nextPrev = this.setNextPrev();
        
    if (this.isNextPrevShown(this.state) !== this.isNextPrevShown(nextPrev)) {
      this.setState({}, this.scrollToActiveTab);
    } else if (!prevProps || props.activeKey !== prevProps.activeKey) {
            this.scrollToActiveTab();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
    if (this.debouncedResize && this.debouncedResize.cancel) {
      this.debouncedResize.cancel();
    }
  },
  setNextPrev: function setNextPrev() {
    var navNode = this.nav;
    var navNodeWH = this.getScrollWH(navNode);
    var containerWH = this.getOffsetWH(this.container);
    var navWrapNodeWH = this.getOffsetWH(this.navWrap);
    var offset = this.offset;

    var minOffset = containerWH - navNodeWH;
    var _state = this.state,
        next = _state.next,
        prev = _state.prev;

    if (minOffset >= 0) {
      next = false;
      this.setOffset(0, false);
      offset = 0;
    } else if (minOffset < offset) {
      next = true;
    } else {
      next = false;
                        var realOffset = navWrapNodeWH - navNodeWH;
      this.setOffset(realOffset, false);
      offset = realOffset;
    }

    if (offset < 0) {
      prev = true;
    } else {
      prev = false;
    }

    this.setNext(next);
    this.setPrev(prev);
    return {
      next: next,
      prev: prev
    };
  },
  getOffsetWH: function getOffsetWH(node) {
    var tabBarPosition = this.props.tabBarPosition;
    var prop = 'offsetWidth';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'offsetHeight';
    }
    return node[prop];
  },
  getScrollWH: function getScrollWH(node) {
    var tabBarPosition = this.props.tabBarPosition;
    var prop = 'scrollWidth';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'scrollHeight';
    }
    return node[prop];
  },
  getOffsetLT: function getOffsetLT(node) {
    var tabBarPosition = this.props.tabBarPosition;
    var prop = 'left';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  },
  setOffset: function setOffset(offset) {
    var checkNextPrev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var target = Math.min(0, offset);
    if (this.offset !== target) {
      this.offset = target;
      var navOffset = {};
      var tabBarPosition = this.props.tabBarPosition;
      var navStyle = this.nav.style;
      var transformSupported = isTransformSupported(navStyle);
      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
        if (transformSupported) {
          navOffset = {
            value: 'translate3d(0,' + target + 'px,0)'
          };
        } else {
          navOffset = {
            name: 'top',
            value: target + 'px'
          };
        }
      } else {
        if (transformSupported) {
          navOffset = {
            value: 'translate3d(' + target + 'px,0,0)'
          };
        } else {
          navOffset = {
            name: 'left',
            value: target + 'px'
          };
        }
      }
      if (transformSupported) {
        setTransform(navStyle, navOffset.value);
      } else {
        navStyle[navOffset.name] = navOffset.value;
      }
      if (checkNextPrev) {
        this.setNextPrev();
      }
    }
  },
  setPrev: function setPrev(v) {
    if (this.state.prev !== v) {
      this.setState({
        prev: v
      });
    }
  },
  setNext: function setNext(v) {
    if (this.state.next !== v) {
      this.setState({
        next: v
      });
    }
  },
  isNextPrevShown: function isNextPrevShown(state) {
    if (state) {
      return state.next || state.prev;
    }
    return this.state.next || this.state.prev;
  },
  prevTransitionEnd: function prevTransitionEnd(e) {
    if (e.propertyName !== 'opacity') {
      return;
    }
    var container = this.container;

    this.scrollToActiveTab({
      target: container,
      currentTarget: container
    });
  },
  scrollToActiveTab: function scrollToActiveTab(e) {
    var activeTab = this.activeTab,
        navWrap = this.navWrap;

    if (e && e.target !== e.currentTarget || !activeTab) {
      return;
    }

        var needToSroll = this.isNextPrevShown() && this.lastNextPrevShown;
    this.lastNextPrevShown = this.isNextPrevShown();
    if (!needToSroll) {
      return;
    }

    var activeTabWH = this.getScrollWH(activeTab);
    var navWrapNodeWH = this.getOffsetWH(navWrap);
    var offset = this.offset;

    var wrapOffset = this.getOffsetLT(navWrap);
    var activeTabOffset = this.getOffsetLT(activeTab);
    if (wrapOffset > activeTabOffset) {
      offset += wrapOffset - activeTabOffset;
      this.setOffset(offset);
    } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
      offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
      this.setOffset(offset);
    }
  },
  prev: function prev(e) {
    this.props.onPrevClick(e);
    var navWrapNode = this.navWrap;
    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
    var offset = this.offset;

    this.setOffset(offset + navWrapNodeWH);
  },
  next: function next(e) {
    this.props.onNextClick(e);
    var navWrapNode = this.navWrap;
    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
    var offset = this.offset;

    this.setOffset(offset - navWrapNodeWH);
  },
  getScrollBarNode: function getScrollBarNode(content) {
    var _classnames, _classnames2, _classnames3, _classnames4;

    var _state2 = this.state,
        next = _state2.next,
        prev = _state2.prev;
    var _props = this.props,
        prefixCls = _props.prefixCls,
        scrollAnimated = _props.scrollAnimated;

    var showNextPrev = prev || next;

    var prevButton = React.createElement(
      'span',
      {
        onClick: prev ? this.prev : null,
        unselectable: 'unselectable',
        className: classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-tab-prev', 1), _defineProperty(_classnames, prefixCls + '-tab-btn-disabled', !prev), _defineProperty(_classnames, prefixCls + '-tab-arrow-show', showNextPrev), _classnames)),
        onTransitionEnd: this.prevTransitionEnd
      },
      React.createElement('span', { className: prefixCls + '-tab-prev-icon' })
    );

    var nextButton = React.createElement(
      'span',
      {
        onClick: next ? this.next : null,
        unselectable: 'unselectable',
        className: classnames((_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-tab-next', 1), _defineProperty(_classnames2, prefixCls + '-tab-btn-disabled', !next), _defineProperty(_classnames2, prefixCls + '-tab-arrow-show', showNextPrev), _classnames2))
      },
      React.createElement('span', { className: prefixCls + '-tab-next-icon' })
    );

    var navClassName = prefixCls + '-nav';
    var navClasses = classnames((_classnames3 = {}, _defineProperty(_classnames3, navClassName, true), _defineProperty(_classnames3, scrollAnimated ? navClassName + '-animated' : navClassName + '-no-animated', true), _classnames3));

    return React.createElement(
      'div',
      {
        className: classnames((_classnames4 = {}, _defineProperty(_classnames4, prefixCls + '-nav-container', 1), _defineProperty(_classnames4, prefixCls + '-nav-container-scrolling', showNextPrev), _classnames4)),
        key: 'container',
        ref: this.saveRef('container')
      },
      prevButton,
      nextButton,
      React.createElement(
        'div',
        { className: prefixCls + '-nav-wrap', ref: this.saveRef('navWrap') },
        React.createElement(
          'div',
          { className: prefixCls + '-nav-scroll' },
          React.createElement(
            'div',
            { className: navClasses, ref: this.saveRef('nav') },
            content
          )
        )
      )
    );
  }
};