# NoPage

NoPage提供诸如 `NoForm`, `NoList`, `NoWrapper`, `Snipx` 等库。

# NoForm

### Install

```shell
$ npm install --save noform
```

### Example

[🔥  Live DEMO - Form Configuration Example ✨](https://quirkyshop.github.io/noform-start-app/#/formConfig)

[🔥  Live DEMO - Repeater Configuration Example ✨](https://quirkyshop.github.io/noform-start-app/#/repeaterConfig)

[🔥  Live DEMO - Repeater Example](https://quirkyshop.github.io/noform-start-app/#/repeater)

[🔥  Live DEMO - Repeater Advanced Example](https://quirkyshop.github.io/noform-start-app/#/RepeaterAdvanced)

[🌈  Live DEMO - Simple Example with Ant Design](https://quirkyshop.github.io/noform-start-app/#/)

You can visit [here](https://quirkyshop.github.io/noform-start-app/#/) for more information.

### Best Practise

[Best Practise integrate with Ant Design](https://alibaba.github.io/noform/#/nopage/noform/antd-best-pratise)

[Integrate with Ant Design Pro](https://alibaba.github.io/noform/#/nopage/noform/ant-design-pro-practise)


# API和文档

[Core API](https://alibaba.github.io/noform/#/nopage/noform/formcore-api)
[中文文档](https://alibaba.github.io/noform/#/nopage/noform/brief-intro)

### i18n

[Repeater](https://alibaba.github.io/noform/#/nopage/noform/repeater-config) now support `Chinese(zh)` and `English(zh)`.

Since [react-intl](https://github.com/yahoo/react-intl) use `ISO639` and NoForm will follow this standard.

ISO Standard Map：

| Region       | Notes   | ISO_3166 | ISO_639 |
| ------------ | ------- | -------- | ------- |
| USA          | en-US   | US       | en      |
| China        | zh-CN   | CN       | zh      |

### Test Case

More than 190 case.

### How to contribute

1. clone this repo
2. npm install -g nobuilder
2. npm install
3. npm run start
4. pull request

### For chinese user / 国内用户

[NoForm - 一个更好的表单解决方案](https://zhuanlan.zhihu.com/p/44120143)

欢迎钉钉入群：23134927 一起讨论

# NoList

[文档](https://www.yuque.com/nopage/nolist)


# 如何开发NoPage

1. npm install
2. npm run start(自动执行子目录的install，构建lib，并且子目录如相互依赖，会自动link)
3. 联调模式： 分别进入到packages里面，运行npm run dev 即可进行联调。

### 联调模式

NoList依赖NoForm, 如果开发过程中需要调整noform的话，开发步骤如下：

1. cd list && npm run dev
2. cd form && npm run dev

这样改动form的时候，list会自动获取到form的更新。其他内部库的联调机制也一致。

# NoBuilder

Form/List/Wrapper 都依赖NoBuilder作为构建，常见命令如下：

```shell
$ npm install -g nobuilder
```

nobuilder的命令如下：

1. dev 开发
2. lib 构建
3. build 构建css, umd(参见umdConfig)
4. profile 查看构建后的文件依赖关系，分析体积
5. test 执行单测

