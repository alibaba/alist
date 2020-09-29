# AList

## 备注

原有体系下的 NoForm 将不再更新，目前版本仍可继续运行并持续维护。表单场景，推荐使用 [Formily](https://github.com/alibaba/formily)


## 背景

列表是中后台的入口场景，需求的量级与表单相同，但是对于效率和性能的体验则没有那么高，相对来说可定制性和拓展性也相对比较规范。
在 Fusion/Ant-Design 的 Table 已经成为业界事实标准的情况下，且 [Formily](https://github.com/alibaba/formily) 表单方案作为搜索区域的不二之选时，通过对这些方案的整合，可以快速实现标准化的列表场景。

同时AList支持 `JSON Schema` 协议渲染，可通过数据驱动快速开发。

## 特性

🚀 内置Formily作为搜索区域方案，性能及功能强大

💡 支持 Ant Design/Fusion Next 组件体系

🎨 支持JSON Schema 数据驱动方案

🏅 副作用逻辑独立管理，涵盖各种复杂联动校验逻辑

🌯 支持各种复杂布局方案

## 安装

使用 Ant Design：

```shell
npm install --save antd @alist/antd
```

使用 Fusion Design：

```shell
npm install --save @alifd/next @alist/next
```

## 文档

https://alist.wiki/


## LICENSE
AList is open source software licensed as MIT.
