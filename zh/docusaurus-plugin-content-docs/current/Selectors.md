---
id: selectors
title: 选择器
---

[WebDriver 协议](https://w3c.github.io/webdriver/)提供了多种选择器策略来查询元素。WebdriverIO 简化了这些策略，使选择元素变得简单。请注意，尽管查询元素的命令被称为 `$` 和 `$$`，但它们与 jQuery 或 [Sizzle 选择器引擎](https://github.com/jquery/sizzle)没有任何关系。

虽然有很多不同的选择器可用，但只有少数几个提供了一种稳健的方式来找到正确的元素。例如，给定以下按钮：

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

我们__推荐__和__不推荐__以下选择器：

| 选择器 | 推荐 | 说明 |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 永不 | 最差 - 太过通用，没有上下文。 |
| `$('.btn.btn-large')` | 🚨 永不 | 不好。与样式耦合。极易变更。 |
| `$('#main')` | ⚠️ 谨慎使用 | 更好。但仍与样式或JS事件监听器耦合。 |
| `$(() => document.queryElement('button'))` | ⚠️ 谨慎使用 | 有效查询，但编写复杂。 |
| `$('button[name="submission"]')` | ⚠️ 谨慎使用 | 与具有HTML语义的`name`属性耦合。 |
| `$('button[data-testid="submit"]')` | ✅ 好 | 需要额外属性，不与无障碍功能相连。 |
| `$('aria/Submit')` | ✅ 好 | 好。类似于用户与页面交互的方式。建议使用翻译文件，这样当翻译更新时测试不会中断。注意：此选择器在大页面上可能比其他选择器慢。 |
| `$('button=Submit')` | ✅ 始终 | 最佳。类似于用户与页面交互的方式且速度快。建议使用翻译文件，这样当翻译更新时测试不会中断。 |

## CSS 查询选择器

如果没有特别指明，WebdriverIO 将使用 [CSS 选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) 模式查询元素，例如：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## 链接文本

要获取具有特定文本的锚点元素，请使用以等号（`=`）开始的文本进行查询。

例如：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

你可以通过以下方式查询该元素：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## 部分链接文本

要查找可见文本部分匹配你的搜索值的锚点元素，
可以在查询字符串前使用 `*=` 进行查询（例如 `*=driver`）。

你也可以通过以下方式查询上面示例中的元素：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__注意：__ 你不能在一个选择器中混合使用多种选择器策略。使用多个链式元素查询来达到相同的目标，例如：

```js
const elem = await $('header h1*=Welcome') // 这不起作用!!!
// 应该使用
const elem = await $('header').$('*=driver')
```

## 具有特定文本的元素

同样的技术也可以应用于元素。此外，还可以使用 `.=` 或 `.*=` 进行不区分大小写的匹配。

例如，这里查询文本为"Welcome to my Page"的一级标题：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

你可以通过以下方式查询该元素：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

或使用查询部分文本：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

同样适用于 `id` 和 `class` 名称：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

你可以通过以下方式查询该元素：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__注意：__ 你不能在一个选择器中混合使用多种选择器策略。使用多个链式元素查询来达到相同的目标，例如：

```js
const elem = await $('header h1*=Welcome') // 这不起作用!!!
// 应该使用
const elem = await $('header').$('h1*=Welcome')
```

## 标签名称

要查询具有特定标签名的元素，使用 `<tag>` 或 `<tag />`。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

你可以通过以下方式查询该元素：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name 属性

要查询具有特定 name 属性的元素，你可以使用普通的 CSS3 选择器或者通过传递类似 [name="some-name"] 的选择器参数来使用 [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) 提供的 name 策略：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__注意：__ 这个选择器策略已被弃用，只在由 JSONWireProtocol 协议运行的旧浏览器或使用 Appium 时有效。

## xPath

也可以通过特定的 [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) 查询元素。

xPath 选择器的格式如 `//body/div[6]/div[1]/span[1]`。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

你可以通过以下方式查询第二个段落：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

你可以使用 xPath 在 DOM 树中上下遍历：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## 无障碍名称选择器

通过元素的无障碍名称查询元素。无障碍名称是当元素获得焦点时屏幕阅读器宣读的内容。无障碍名称的值可以是可视内容或隐藏的文本替代项。

:::info

你可以在我们的[发布博客文章](/blog/2022/09/05/accessibility-selector)中了解更多关于这个选择器的信息

:::

### 通过 `aria-label` 获取

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### 通过 `aria-labelledby` 获取

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### 通过内容获取

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### 通过标题获取

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### 通过 `alt` 属性获取

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Role 属性

要基于 [ARIA 角色](https://www.w3.org/TR/html-aria/#docconformance)查询元素，你可以直接将元素的角色指定为选择器参数，如 `[role=button]`：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID 属性

WebDriver 协议不支持"id"定位策略，应该使用 CSS 或 xPath 选择器策略来通过 ID 查找元素。

但是，一些驱动程序（如 [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)）可能仍[支持](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)这种选择器。

当前支持的 ID 选择器语法有：

```js
//css 定位器
const button = await $('#someid')
//xpath 定位器
const button = await $('//*[@id="someid"]')
//id 策略
// 注意：仅在 Appium 或支持"ID"定位策略的类似框架中有效
const button = await $('id=resource-id/iosname')
```

## JS 函数

你还可以使用 JavaScript 函数通过 Web 原生 API 获取元素。当然，你只能在 Web 上下文中（例如，`browser`，或移动设备中的 Web 上下文）执行此操作。

给定以下 HTML 结构：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

你可以按如下方式查询 `#elem` 的兄弟元素：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## 深度选择器

:::warning

从 WebdriverIO 的 `v9` 开始，不再需要这个特殊选择器，因为 WebdriverIO 会自动穿透 Shadow DOM。建议通过去除选择器前面的 `>>>` 来停止使用此选择器。

:::

许多前端应用程序严重依赖具有 [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) 的元素。在没有变通方法的情况下，技术上不可能查询 shadow DOM 内的元素。[`shadow$`](https://webdriver.io/docs/api/element/shadow$) 和 [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) 是这样的变通方法，但它们有[局限性](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow)。使用深度选择器，你现在可以使用常见的查询命令查询任何 shadow DOM 内的所有元素。

假设我们有一个具有以下结构的应用程序：

![Chrome 示例](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome 示例")

使用此选择器，你可以查询嵌套在另一个 shadow DOM 中的 `<button />` 元素，例如：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## 移动选择器

对于混合移动测试，重要的是自动化服务器在执行命令前处于正确的*上下文*中。对于自动化手势，驱动程序理想情况下应设置为原生上下文。但要从 DOM 中选择元素，驱动程序需要设置为平台的 webview 上下文。只有*这样*才能使用上面提到的方法。

对于原生移动测试，不需要在上下文之间切换，因为你必须使用移动策略并直接使用底层设备自动化技术。当测试需要对查找元素进行精细控制时，这特别有用。

### Android UiAutomator

Android 的 UI Automator 框架提供了多种查找元素的方法。你可以使用 [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)，特别是 [UiSelector 类](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)来定位元素。在 Appium 中，你将 Java 代码作为字符串发送到服务器，服务器在应用程序的环境中执行它，返回元素或多个元素。

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher 和 ViewMatcher（仅限 Espresso）

Android 的 DataMatcher 策略提供了一种通过 [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) 查找元素的方法

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

类似地，[View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag（仅限 Espresso）

视图标签策略提供了一种通过元素的[标签](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29)查找元素的便捷方法。

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

在自动化 iOS 应用程序时，可以使用 Apple 的 [UI Automation 框架](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)查找元素。

这个 JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) 有方法访问视图及其上的所有内容。

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

你还可以在 Appium 的 iOS UI Automation 中使用谓词搜索，进一步细化元素选择。详情请参阅[此处](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md)。

### iOS XCUITest 谓词字符串和类链

使用 iOS 10 及以上版本（使用 `XCUITest` 驱动程序），你可以使用[谓词字符串](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules)：

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

以及[类链](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules)：

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### 无障碍 ID

`accessibility id` 定位策略设计用于读取 UI 元素的唯一标识符。这样做的好处是在本地化或任何可能更改文本的其他过程中不会改变。此外，如果功能相同的元素具有相同的无障碍 id，它可以帮助创建跨平台测试。

- 对于 iOS，这是 Apple [此处](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html)规定的 `accessibility identifier`。
- 对于 Android，`accessibility id` 映射到元素的 `content-description`，如[此处](https://developer.android.com/training/accessibility/accessible-app.html)所述。

对于两个平台，通过 `accessibility id` 获取元素（或多个元素）通常是最佳方法。这也是比已弃用的 `name` 策略更优选的方式。

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### 类名

`class name` 策略是一个代表当前视图上的 UI 元素的 `字符串`。

- 对于 iOS，它是 [UIAutomation 类](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)的完整名称，将以 `UIA-` 开头，例如文本字段为 `UIATextField`。完整参考可在[这里](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation)找到。
- 对于 Android，它是 [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [类](https://developer.android.com/reference/android/widget/package-summary.html)的完全限定名称，例如文本字段为 `android.widget.EditText`。完整参考可在[这里](https://developer.android.com/reference/android/widget/package-summary.html)找到。
- 对于 Youi.tv，它是 Youi.tv 类的完整名称，将以 `CYI-` 开头，例如推按钮元素为 `CYIPushButtonView`。完整参考可在 [You.i Engine Driver 的 GitHub 页面](https://github.com/YOU-i-Labs/appium-youiengine-driver)上找到

```js
// iOS 示例
await $('UIATextField').click()
// Android 示例
await $('android.widget.DatePicker').click()
// Youi.tv 示例
await $('CYIPushButtonView').click()
```

## 链式选择器

如果你想在查询中更加具体，可以链接选择器，直到找到正确的元素。如果你在实际命令之前调用 `element`，WebdriverIO 将从该元素开始查询。

例如，如果你有一个如下的 DOM 结构：

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

如果你想将产品 B 添加到购物车，仅使用 CSS 选择器可能很难实现。

使用选择器链接，就简单多了。只需逐步缩小所需元素的范围：

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium 图像选择器

使用 `-image` 定位策略，可以向 Appium 发送表示要访问的元素的图像文件。

支持的文件格式：`jpg,png,gif,bmp,svg`

完整参考可在[这里](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)找到

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**注意**：Appium 使用这个选择器的方式是内部会制作一个（应用程序）截图，并使用提供的图像选择器来验证是否可以在该（应用程序）截图中找到元素。

请注意，Appium 可能会调整所拍摄的（应用程序）截图的大小，使其与（应用程序）屏幕的 CSS 大小匹配（这将发生在 iPhone 上，也会发生在具有视网膜显示屏的 Mac 机器上，因为 DPR 大于 1）。这将导致找不到匹配项，因为提供的图像选择器可能是从原始截图中获取的。
你可以通过更新 Appium 服务器设置来解决这个问题，有关设置，请参阅 [Appium 文档](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)以及[此评论](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579)中的详细解释。

## React 选择器

WebdriverIO 提供了一种基于组件名称选择 React 组件的方法。要做到这一点，你可以选择两个命令：`react$` 和 `react$$`。

这些命令允许你从 [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) 中选择组件，并返回单个 WebdriverIO 元素或元素数组（取决于使用的函数）。

**注意**：命令 `react$` 和 `react$$` 在功能上类似，只是 `react$$` 将*所有*匹配实例作为 WebdriverIO 元素数组返回，而 `react$` 将返回找到的第一个实例。

#### 基本示例

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

在上面的代码中，应用程序内部有一个简单的 `MyComponent` 实例，React 正在 HTML 元素 `id="root"` 内渲染它。

使用 `browser.react$` 命令，你可以选择 `MyComponent` 的实例：

```js
const myCmp = await browser.react$('MyComponent')
```

现在你已将 WebdriverIO 元素存储在 `myCmp` 变量中，你可以对其执行元素命令。

#### 过滤组件

WebdriverIO 内部使用的库允许你按组件的 props 和/或 state 过滤选择。要做到这一点，你需要将第二个参数用于 props 和/或第三个参数用于 state 传递给浏览器命令。

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

如果你想选择 prop `name` 为 `WebdriverIO` 的 `MyComponent` 实例，你可以执行以下命令：

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

如果你想按状态过滤选择，`browser` 命令看起来会像这样：

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### 处理 `React.Fragment`

当使用 `react$` 命令选择 React [fragments](https://reactjs.org/docs/fragments.html) 时，WebdriverIO 将返回该组件的第一个子元素作为组件的节点。如果使用 `react$$`，你将收到一个包含匹配选择器的片段内所有 HTML 节点的数组。

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

给定上面的示例，命令的工作方式如下：

```js
await browser.react$('MyComponent') // 返回第一个 <div /> 的 WebdriverIO 元素
await browser.react$$('MyComponent') // 返回数组 [<div />, <div />] 的 WebdriverIO 元素
```

**注意：** 如果你有多个 `MyComponent` 实例并且使用 `react$$` 选择这些片段组件，你将得到一个一维数组，包含所有节点。换句话说，如果你有 3 个 `<MyComponent />` 实例，你将得到一个包含六个 WebdriverIO 元素的数组。

## 自定义选择器策略

如果你的应用程序需要特定方式来获取元素，你可以定义自己的自定义选择器策略，并使用 `custom$` 和 `custom$$`。为此，在测试开始时一次性注册你的策略，例如在 `before` 钩子中：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

给定以下 HTML 片段：

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

然后通过以下方式使用：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**注意：** 这仅在可以运行 [`execute`](/docs/api/browser/execute) 命令的 Web 环境中有效。