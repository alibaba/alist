export default {
  saveRef: function saveRef(name) {
    var _this = this;

    return function (node) {
      _this[name] = node;
    };
  }
};