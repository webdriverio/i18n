---
id: method-options
title: 方法选项
---

方法选项是可以为每个[方法](./methods)设置的选项。如果选项与插件实例化期间设置的选项具有相同的键，则此方法选项将覆盖插件选项值。

## 保存选项

### `disableBlinkingCursor`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, 混合应用(Webview)

启用/禁用应用程序中所有`input`、`textarea`、`[contenteditable]`的光标"闪烁"。如果设置为`true`，在截图前光标将被设置为`transparent`，
完成后重置

### `disableCSSAnimation`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, 混合应用(Webview)

启用/禁用应用程序中的所有CSS动画。如果设置为`true`，在截图前所有动画将被禁用，
完成后重置

### `enableLayoutTesting`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **与以下一起使用:** 所有[方法](./methods)
-   **支持:** Web

这将隐藏页面上的所有文本，因此只使用布局进行比较。隐藏通过向__每个__元素添加样式`'color': 'transparent !important'`来实现。

输出结果请参见[测试输出](./test-output#enablelayouttesting)

:::info
使用此标志，每个包含文本的元素（不仅仅是`p, h1, h2, h3, h4, h5, h6, span, a, li`，还包括`div|button|..`）都会获得此属性。__没有__选项可以定制这一点。
:::

### `hideScrollBars`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`
-   **与以下一起使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用(Webview)

隐藏应用程序中的滚动条。如果设置为true，截图前所有滚动条将被禁用。这默认设置为`true`以防止额外问题。

### `hideElements`

-   **类型:** `array`
-   **必填:** 否
-   **与以下一起使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用(Webview), 原生应用

此方法可以通过向元素添加属性`visibility: hidden`来隐藏一个或多个元素，提供一个元素数组。

### `removeElements`

-   **类型:** `array`
-   **必填:** 否
-   **与以下一起使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用(Webview), 原生应用

此方法可以通过向元素添加属性`display: none`来_移除_一个或多个元素，提供一个元素数组。

### `resizeDimensions`

-   **类型:** `object`
-   **必填:** 否
-   **默认值:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **与以下一起使用:** 仅用于[`saveElement`](./methods#saveelement)或[`checkElement`](./methods#checkelement)
-   **支持:** Web, 混合应用(Webview), 原生应用

一个对象，需要包含`top`、`right`、`bottom`和`left`的像素数，用于使元素裁剪变大。

### `fullPageScrollTimeout`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `1500`
-   **与以下一起使用:** 仅用于[`saveFullPageScreen`](./methods#savefullpagescreen)或[`saveTabbablePage`](./methods#savetabbablepage)
-   **支持:** Web

滚动后等待的超时时间（毫秒）。这有助于识别具有延迟加载的页面。

### `hideAfterFirstScroll`

-   **类型:** `array`
-   **必填:** 否
-   **与以下一起使用:** 仅用于[`saveFullPageScreen`](./methods#savefullpagescreen)或[`saveTabbablePage`](./methods#savetabbablepage)
-   **支持:** Web

此方法将通过向元素添加属性`visibility: hidden`来隐藏一个或多个元素，提供一个元素数组。
当页面包含粘性元素（在页面滚动时会随页面滚动但在全页面截图时会产生烦人效果）时，这将非常方便

### `waitForFontsLoaded`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`
-   **与以下一起使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用(Webview)

字体，包括第三方字体，可以同步或异步加载。异步加载意味着字体可能在WebdriverIO确定页面完全加载后才加载。为防止字体渲染问题，默认情况下，此模块会等待所有字体加载完成后再截图。

## 比较(检查)选项

比较选项是影响比较方式的选项，由[ResembleJS](https://github.com/Huddle/Resemble.js)执行。

:::info 注意

-   [保存选项](#save-options)中的所有选项都可用于比较方法
-   所有比较选项可以在服务实例化期间__或__对每个单独的检查方法使用。如果方法选项与服务实例化期间设置的选项具有相同的键，则方法比较选项将覆盖服务比较选项值。
- 所有选项可用于：
    - Web
    - 混合应用
    - 原生应用

:::

### `ignoreAlpha`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

比较图像并忽略alpha通道。

### `blockOutSideBar`

-   **类型:** `boolean`
-   **默认值:** `true`
-   **必填:** 否
-   **备注:** _只能用于`checkScreen()`。这**仅适用于iPad**_

在比较期间自动屏蔽横向模式下iPad的侧边栏。这可防止在标签/私人/书签等原生组件上出现失败。

### `blockOutStatusBar`

-   **类型:** `boolean`
-   **默认值:** `true`
-   **必填:** 否
-   **备注:** _这**仅适用于移动设备**_

在比较期间自动屏蔽状态栏和地址栏。这可防止在时间、Wi-Fi或电池状态上出现失败。

### `blockOutToolBar`

-   **类型:** `boolean`
-   **默认值:** `true`
-   **必填:** 否
-   **备注:** _这**仅适用于移动设备**_

自动屏蔽工具栏。

### `ignoreAntialiasing`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

比较图像并忽略抗锯齿。

### `ignoreColors`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

即使图像是彩色的，比较也将比较2个黑白图像

### `ignoreLess`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

比较图像，使用`red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`进行比较

### `ignoreNothing`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

比较图像，使用`red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`进行比较

### `rawMisMatchPercentage`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

如果为true，返回的百分比将如`0.12345678`，默认为`0.12`

### `returnAllCompareData`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

这将返回所有比较数据，而不仅仅是不匹配百分比

### `saveAboveTolerance`

-   **类型:** `number`
-   **默认值:** `0`
-   **必填:** 否

`misMatchPercentage`的允许值，防止保存有差异的图像

### `largeImageThreshold`

-   **类型:** `number`
-   **默认值:** `0`
-   **必填:** 否

比较大图像可能导致性能问题。
当为像素数提供一个数字（高于0）时，如果图像宽度或高度大于`largeImageThreshold`像素，比较算法将跳过像素。

### `scaleImagesToSameSize`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

在执行比较前将2张图像缩放到相同大小。强烈建议启用`ignoreAntialiasing`和`ignoreAlpha`

## 文件夹选项

基准文件夹和截图文件夹（实际、差异）是可以在插件实例化或方法期间设置的选项。要在特定方法上设置文件夹选项，请将文件夹选项传递给方法选项对象。这适用于：

- Web
- 混合应用
- 原生应用

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// 你可以将其用于所有方法
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **类型:** `string`
-   **必填:** 否

测试中捕获的快照的文件夹。

### `baselineFolder`

-   **类型:** `string`
-   **必填:** 否

用于比较的基准图像的文件夹。

### `diffFolder`

-   **类型:** `string`
-   **必填:** 否

ResembleJS渲染的图像差异的文件夹。