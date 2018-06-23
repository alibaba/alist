"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path2 = require("path");

var _helperModuleImports = require("@babel/helper-module-imports");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function camel2Dash(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);

  return str.replace(/([A-Z])/g, function ($1) {
    return "-".concat($1.toLowerCase());
  });
}

function camel2Underline(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);

  return str.replace(/([A-Z])/g, function ($1) {
    return "_".concat($1.toLowerCase());
  });
}

function winPath(path) {
  return path.replace(/\\/g, '/');
}

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(libraryName, libraryDirectory, style, camel2DashComponentName, camel2UnderlineComponentName, fileName, customName, types) {
    _classCallCheck(this, Plugin);

    this.specified = null;
    this.libraryObjs = null;
    this.selectedMethods = null;
    this.libraryName = libraryName;
    this.libraryDirectory = typeof libraryDirectory === 'undefined' ? 'lib' : libraryDirectory;
    this.camel2DashComponentName = typeof camel2DashComponentName === 'undefined' ? true : camel2DashComponentName;
    this.camel2UnderlineComponentName = camel2UnderlineComponentName;
    this.style = style || false;
    this.fileName = fileName || '';
    this.customName = customName;
    this.types = types;
  }

  _createClass(Plugin, [{
    key: "isInGlobalScope",
    value: function isInGlobalScope(path, name) {
      var _this = this;

      var parentPath = path.findParent(function (_path) {
        return _path.scope.hasOwnBinding(_this.specified[name]);
      });
      return !!parentPath && parentPath.isProgram();
    }
  }, {
    key: "importMethod",
    value: function importMethod(methodName, file) {
      if (!this.selectedMethods[methodName]) {
        var libraryDirectory = this.libraryDirectory;
        var style = this.style;
        var transformedMethodName = this.camel2UnderlineComponentName // eslint-disable-line
        ? camel2Underline(methodName) : this.camel2DashComponentName ? camel2Dash(methodName) : methodName;
        var path = winPath(this.customName ? this.customName(transformedMethodName) : (0, _path2.join)(this.libraryName, libraryDirectory, transformedMethodName, this.fileName) // eslint-disable-line
        );
        this.selectedMethods[methodName] = (0, _helperModuleImports.addDefault)(file.path, path, {
          nameHint: methodName
        });

        if (style === true) {
          (0, _helperModuleImports.addSideEffect)(file.path, "".concat(path, "/style"));
        } else if (style === 'css') {
          (0, _helperModuleImports.addSideEffect)(file.path, "".concat(path, "/style/css"));
        } else if (typeof style === 'function') {
          var stylePath = style(path, file);

          if (stylePath) {
            (0, _helperModuleImports.addSideEffect)(file.path, stylePath);
          }
        }
      }

      return Object.assign({}, this.selectedMethods[methodName]);
    }
  }, {
    key: "buildExpressionHandler",
    value: function buildExpressionHandler(node, props, path, state) {
      var _this2 = this;

      var file = path && path.hub && path.hub.file || state && state.file;
      var types = this.types;
      props.forEach(function (prop) {
        if (!types.isIdentifier(node[prop])) return;

        if (_this2.specified[node[prop].name]) {
          node[prop] = _this2.importMethod(_this2.specified[node[prop].name], file); // eslint-disable-line
        }
      });
    }
  }, {
    key: "buildDeclaratorHandler",
    value: function buildDeclaratorHandler(node, prop, path, state) {
      var file = path && path.hub && path.hub.file || state && state.file;
      var types = this.types;
      if (!types.isIdentifier(node[prop])) return;

      if (this.specified[node[prop].name] && path.scope.hasBinding(node[prop].name) && path.scope.getBinding(node[prop].name).path.type === 'ImportSpecifier') {
        node[prop] = this.importMethod(node[prop].name, file); // eslint-disable-line
      }
    }
  }, {
    key: "ProgramEnter",
    value: function ProgramEnter() {
      this.specified = Object.create(null);
      this.libraryObjs = Object.create(null);
      this.selectedMethods = Object.create(null);
      this.pathsToRemove = [];
    }
  }, {
    key: "ProgramExit",
    value: function ProgramExit() {
      this.pathsToRemove.forEach(function (p) {
        return !p.removed && p.remove();
      });
    }
  }, {
    key: "ImportDeclaration",
    value: function ImportDeclaration(path) {
      var _this3 = this;

      var node = path.node; // path maybe removed by prev instances.

      if (!node) return;
      var value = node.source.value;
      var libraryName = this.libraryName;
      var types = this.types;

      if (value === libraryName) {
        node.specifiers.forEach(function (spec) {
          if (types.isImportSpecifier(spec)) {
            _this3.specified[spec.local.name] = spec.imported.name;
          } else {
            _this3.libraryObjs[spec.local.name] = true;
          }
        });
        this.pathsToRemove.push(path);
      }
    }
  }, {
    key: "CallExpression",
    value: function CallExpression(path, state) {
      var _this4 = this;

      var node = path.node;
      var file = path && path.hub && path.hub.file || state && state.file;
      var name = node.callee.name;
      var types = this.types;

      if (types.isIdentifier(node.callee)) {
        if (this.specified[name]) {
          node.callee = this.importMethod(this.specified[name], file);
        }
      }

      node.arguments = node.arguments.map(function (arg) {
        var argName = arg.name;

        if (_this4.specified[argName] && path.scope.hasBinding(argName) && path.scope.getBinding(argName).path.type === 'ImportSpecifier') {
          return _this4.importMethod(_this4.specified[argName], file);
        }

        return arg;
      });
    }
  }, {
    key: "MemberExpression",
    value: function MemberExpression(path, state) {
      var node = path.node;
      var file = path && path.hub && path.hub.file || state && state.file; // multiple instance check.

      if (!node.object || !node.object.name) return;

      if (this.libraryObjs[node.object.name]) {
        // antd.Button -> _Button
        path.replaceWith(this.importMethod(node.property.name, file));
      } else if (this.specified[node.object.name]) {
        node.object = this.importMethod(this.specified[node.object.name], file);
      }
    }
  }, {
    key: "Property",
    value: function Property(path, state) {
      var node = path.node;
      this.buildDeclaratorHandler(node, 'value', path, state);
    }
  }, {
    key: "VariableDeclarator",
    value: function VariableDeclarator(path, state) {
      var node = path.node;
      this.buildDeclaratorHandler(node, 'init', path, state);
    }
  }, {
    key: "ArrayExpression",
    value: function ArrayExpression(path, state) {
      var node = path.node;
      var props = node.elements.map(function (_, index) {
        return index;
      });
      this.buildExpressionHandler(node.elements, props, path, state);
    }
  }, {
    key: "LogicalExpression",
    value: function LogicalExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['left', 'right'], path, state);
    }
  }, {
    key: "ConditionalExpression",
    value: function ConditionalExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['test', 'consequent', 'alternate'], path, state);
    }
  }, {
    key: "IfStatement",
    value: function IfStatement(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['test'], path, state);
      this.buildExpressionHandler(node.test, ['left', 'right'], path, state);
    }
  }, {
    key: "ExpressionStatement",
    value: function ExpressionStatement(path, state) {
      var node = path.node;
      var types = this.types;

      if (types.isAssignmentExpression(node.expression)) {
        this.buildExpressionHandler(node.expression, ['right'], path, state);
      }
    }
  }, {
    key: "ReturnStatement",
    value: function ReturnStatement(path, state) {
      var types = this.types;
      var file = path && path.hub && path.hub.file || state && state.file;
      var node = path.node;

      if (node.argument && types.isIdentifier(node.argument) && this.specified[node.argument.name] && this.isInGlobalScope(path, node.argument.name)) {
        node.argument = this.importMethod(node.argument.name, file);
      }
    }
  }, {
    key: "ExportDefaultDeclaration",
    value: function ExportDefaultDeclaration(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['declaration'], path, state);
    }
  }, {
    key: "BinaryExpression",
    value: function BinaryExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['left', 'right'], path, state);
    }
  }, {
    key: "NewExpression",
    value: function NewExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['callee', 'arguments'], path, state);
    }
  }]);

  return Plugin;
}();

exports.default = Plugin;