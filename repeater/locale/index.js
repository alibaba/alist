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
  var _default = {
    en: {
      addText: 'Add',
      updateText: 'Update',
      deleteText: 'Delete',
      dialogAddText: 'Add',
      dialogUpdateText: 'Update',
      dialogDeleteText: 'Delete',
      saveText: 'Save',
      cancelText: 'Cancel',
      operateText: 'Operate',
      okText: 'Ok',
      deleteConfirmText: 'Are you sure you want to delete this item?'
    },
    zh: {
      dialogAddText: '新增',
      dialogUpdateText: '修改',
      dialogDeleteText: '删除',
      deleteText: '删除',
      addText: '新增',
      updateText: '修改',
      saveText: '保存',
      cancelText: '取消',
      operateText: '操作',
      okText: '确定',
      deleteConfirmText: '是否删除该项？'
    }
  };
  _exports.default = _default;
});