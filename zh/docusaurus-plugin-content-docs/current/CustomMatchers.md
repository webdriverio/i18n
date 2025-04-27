---
id: custommatchers
title: 自定义匹配器
---

WebdriverIO使用Jest风格的[`expect`](https://webdriver.io/docs/api/expect-webdriverio)断言库，该库具有适用于运行Web和移动测试的特殊功能和自定义匹配器。虽然匹配器库很大，但它肯定不适合所有可能的情况。因此，可以使用您自定义的匹配器扩展现有的匹配器。

:::warning

虽然目前在定义特定于[`browser`](/docs/api/browser)对象或[element](/docs/api/element)实例的匹配器之间没有区别，但这在将来可能会改变。请关注[`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408)以获取有关此开发的更多信息。

:::

## 自定义浏览器匹配器

要注册自定义浏览器匹配器，请在`expect`对象上调用`extend`，可以直接在规范文件中调用，也可以作为`wdio.conf.js`中例如`before`钩子的一部分：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

如示例所示，匹配器函数将预期对象（例如浏览器或元素对象）作为第一个参数，将预期值作为第二个参数。然后，您可以按如下方式使用匹配器：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## 自定义元素匹配器

与自定义浏览器匹配器类似，元素匹配器没有区别。以下是如何创建自定义匹配器以断言元素的aria-label的示例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

这使您可以按如下方式调用断言：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript支持

如果您使用TypeScript，则需要额外的一步来确保自定义匹配器的类型安全。通过使用您的自定义匹配器扩展`Matcher`接口，所有类型问题都会消失：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

如果您创建了自定义[非对称匹配器](https://jestjs.io/docs/expect#expectextendmatchers)，您可以类似地扩展`expect`类型，如下所示：

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```