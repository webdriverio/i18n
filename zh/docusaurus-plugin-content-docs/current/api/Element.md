---
id: element
title: 元素对象
---

元素对象(Element Object)是代表远程用户代理上的元素的对象，例如在浏览器中运行会话时的[DOM节点](https://developer.mozilla.org/en-US/docs/Web/API/Element)或移动设备的[移动元素](https://developer.apple.com/documentation/swift/sequence/element)。可以使用多种元素查询命令接收元素对象，例如[`$`](/docs/api/element/$)、[`custom$`](/docs/api/element/custom$)、[`react$`](/docs/api/element/react$)或[`shadow$`](/docs/api/element/shadow$)。

## 属性

元素对象具有以下属性：

| 名称 | 类型 | 详情 |
| ---- | ---- | ------- |
| `sessionId` | `String` | 从远程服务器分配的会话ID。 |
| `elementId` | `String` | 关联的[web元素引用](https://w3c.github.io/webdriver/#elements)，可用于在协议级别与元素交互 |
| `selector` | `String` | 用于查询元素的[选择器](/docs/selectors)。 |
| `parent` | `Object` | 当元素从浏览器中获取时(例如`const elem = browser.$('selector')`)为[浏览器对象](/docs/api/browser)，或当元素从元素范围内获取时(例如`elem.$('selector')`)为[元素对象](/docs/api/element) |
| `options` | `Object` | WebdriverIO[选项](/docs/configuration)，取决于浏览器对象的创建方式。查看更多[设置类型](/docs/setuptypes)。 |

## 方法
元素对象提供了协议部分的所有方法，例如[WebDriver](/docs/api/webdriver)协议以及元素部分中列出的命令。可用的协议命令取决于会话类型。如果运行自动化浏览器会话，则Appium[命令](/docs/api/appium)将不可用，反之亦然。

除此之外，还提供了以下命令：

| 名称 | 参数 | 详情 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (类型: `String`)<br />- `fn` (类型: `Function`) | 允许定义可从浏览器对象调用的自定义命令，用于组合目的。在[自定义命令](/docs/customcommands)指南中阅读更多信息。 |
| `overwriteCommand` | - `commandName` (类型: `String`)<br />- `fn` (类型: `Function`) | 允许用自定义功能覆盖任何浏览器命令。请谨慎使用，因为它可能会让框架用户感到困惑。在[自定义命令](/docs/customcommands#overwriting-native-commands)指南中阅读更多信息。 |

## 备注

### 元素链

在使用元素时，WebdriverIO提供了特殊语法以简化查询它们并组合复杂的嵌套元素查找。由于元素对象允许您使用常见查询方法在其树分支中查找元素，用户可以按如下方式获取嵌套元素：

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // 输出 "I am a headline"
```

对于深度嵌套的结构，将任何嵌套元素分配给数组然后使用它可能会很冗长。因此，WebdriverIO具有链式元素查询的概念，允许像这样获取嵌套元素：

```js
console.log(await $('#header').$('#headline').getText())
```

这在获取一组元素时也适用，例如：

```js
// 获取第2个header内的第3个headline的文本
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

在处理一组元素时，这尤其有用，当尝试与它们交互时，不必这样做：

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

你可以直接在元素链上调用数组方法，例如：

```js
const location = await $$('div').map((el) => el.getLocation())
```

等同于：

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO使用支持异步迭代器的自定义实现，因此其API中的所有命令也支持这些用例。

__注意：__ 所有异步迭代器都会返回promise，即使您的回调不返回promise，例如：

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ 返回 "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ 返回 "string[]"
```

### 自定义命令

您可以在浏览器范围内设置自定义命令，以抽象经常使用的工作流程。查看我们关于[自定义命令](/docs/customcommands#adding-custom-commands)的指南以获取更多信息。