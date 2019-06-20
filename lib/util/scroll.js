(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* ref: https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery */
  if ('performance' in window === false) {
    window.performance = {};
  }

  Date.now = Date.now || function getTime() {
    // thanks IE8
    return new Date().getTime();
  };

  if ('now' in window.performance === false) {
    var nowOffset = Date.now();

    if (window.performance.timing && window.performance.timing.navigationStart) {
      nowOffset = window.performance.timing.navigationStart;
    }

    window.performance.now = function () {
      return Date.now() - nowOffset;
    };
  }

  function scrollToTop(scrollTo) {
    var scrollDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    if (typeof scrollTo === 'string') {
      var scrollToObj = document.querySelector(scrollTo);

      if (scrollToObj && typeof scrollToObj.getBoundingClientRect === 'function') {
        scrollTo = window.pageYOffset + scrollToObj.getBoundingClientRect().top;
      } else {
        scrollTo = 0;
        return;
      }
    } else if (typeof scrollTo !== 'number') {
      scrollTo = 0;
    }

    var anchorHeightAdjust = 30;

    if (scrollTo > anchorHeightAdjust) {
      scrollTo -= anchorHeightAdjust;
    }

    var cosParameter = (window.scrollY - scrollTo) / 2;
    var scrollCount = 0;
    var oldTimestamp = window.performance.now();

    function step(newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));

      if (scrollCount >= Math.PI) {
        window.scrollTo(0, scrollTo);
        return;
      }

      var stepDiff = scrollTo + cosParameter + cosParameter * Math.cos(scrollCount);
      window.scrollTo(0, Math.round(stepDiff));
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  var _default = scrollToTop;
  _exports.default = _default;
});