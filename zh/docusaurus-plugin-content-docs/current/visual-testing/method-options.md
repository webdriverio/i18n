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
-   **支持:** Web, 混合应用 (Webview)

启用/禁用应用程序中所有 `input`、`textarea`、`[contenteditable]` 中的光标"闪烁"。如果设置为 `true`，则在截图前将光标设置为 `transparent`，
完成后重置

### `disableCSSAnimation`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, 混合应用 (Webview)

启用/禁用应用程序中的所有 CSS 动画。如果设置为 `true`，则在截图前将禁用所有动画，
完成后重置

### `enableLegacyScreenshotMethod`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, 混合应用 (Webview)

使用此选项可以切换回基于 W3C-WebDriver 协议的"旧"截图方法。如果您的测试依赖于现有的基准图像，或者您在不完全支持较新的基于 BiDi 的截图的环境中运行，这将很有帮助。
请注意，启用此选项可能会产生分辨率或质量略有不同的截图。

### `enableLayoutTesting`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **配合使用:** 所有[方法](./methods)
-   **支持:** Web

这将隐藏页面上的所有文本，因此只使用布局进行比较。隐藏将通过向__每个__元素添加样式 `'color': 'transparent !important'` 来实现。

输出结果请参见[测试输出](./test-output#enablelayouttesting)

:::info
通过使用此标志，每个包含文本的元素（不仅是 `p, h1, h2, h3, h4, h5, h6, span, a, li`，还包括 `div|button|..`）都将获得此属性。__没有__选项可以定制此行为。
:::

### `hideScrollBars`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`
-   **配合使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用 (Webview)

隐藏应用程序中的滚动条。如果设置为 true，则在截图前将禁用所有滚动条。默认设置为 `true` 以防止额外问题。

### `hideElements`

-   **类型:** `array`
-   **必填:** 否
-   **配合使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用 (Webview), 原生应用

此方法可以通过向元素添加 `visibility: hidden` 属性来隐藏一个或多个元素，只需提供元素数组即可。

### `removeElements`

-   **类型:** `array`
-   **必填:** 否
-   **配合使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用 (Webview), 原生应用

此方法可以通过向元素添加 `display: none` 属性来_移除_一个或多个元素，只需提供元素数组即可。

### `resizeDimensions`

-   **类型:** `object`
-   **必填:** 否
-   **默认值:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **配合使用:** 仅适用于 [`saveElement`](./methods#saveelement) 或 [`checkElement`](./methods#checkelement)
-   **支持:** Web, 混合应用 (Webview), 原生应用

一个对象，需要包含 `top`、`right`、`bottom` 和 `left` 的像素数值，用来使元素剪切变大。

### `userBasedFullPageScreenshot`

* **类型:** `boolean`
* **必填:** 否
* **默认值:** `false`
* **支持:** Web, 混合应用 (Webview)

当设置为 `true` 时，此选项启用**滚动并拼接策略**来捕获全页面截图。
它不使用浏览器的原生截图功能，而是手动滚动页面并将多个截图拼接在一起。
这种方法对于具有**延迟加载内容**或需要滚动才能完全渲染的复杂布局的页面特别有用。

### `fullPageScrollTimeout`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `1500`
-   **配合使用:** 仅适用于 [`saveFullPageScreen`](./methods#savefullpagescreen) 或 [`saveTabbablePage`](./methods#savetabbablepage)
-   **支持:** Web

滚动后等待的超时时间（毫秒）。这可能有助于识别具有延迟加载的页面。

> **注意:** 这仅在 `userBasedFullPageScreenshot` 设置为 `true` 时有效

### `hideAfterFirstScroll`

-   **类型:** `array`
-   **必填:** 否
-   **配合使用:** 仅适用于 [`saveFullPageScreen`](./methods#savefullpagescreen) 或 [`saveTabbablePage`](./methods#savetabbablepage)
-   **支持:** Web

此方法将通过向元素添加 `visibility: hidden` 属性来隐藏一个或多个元素，只需提供元素数组即可。
当页面例如包含粘性元素（页面滚动时会随页面滚动）时，这将非常方便，但在制作全页面截图时会产生烦人的效果

> **注意:** 这仅在 `userBasedFullPageScreenshot` 设置为 `true` 时有效

### `waitForFontsLoaded`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`
-   **配合使用:** 所有[方法](./methods)
-   **支持:** Web, 混合应用 (Webview)

字体（包括第三方字体）可以同步或异步加载。异步加载意味着字体可能在 WebdriverIO 确定页面已完全加载后才加载。为了防止字体渲染问题，默认情况下，此模块将等待所有字体加载完成后再截图。

## 比较 (检查) 选项

比较选项是影响比较执行方式的选项，使用 [ResembleJS](https://github.com/Huddle/Resemble.js) 进行比较。

:::info 注意

-   所有[保存选项](#保存选项)都可以用于比较方法
-   所有比较选项都可以在服务实例化期间__或__每个单独的检查方法中使用。如果方法选项与服务实例化期间设置的选项具有相同的键，则方法比较选项将覆盖服务比较选项值。
- 所有选项都可用于：
    - Web
    - 混合应用
    - 原生应用

:::

### `ignoreAlpha`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

比较图像并忽略 alpha 通道。

### `blockOutSideBar`

-   **类型:** `boolean`
-   **默认值:** `true`
-   **必填:** 否
-   **备注:** _只能用于 `checkScreen()`。这**仅适用于 iPad**_

在比较过程中自动屏蔽横向模式下 iPad 的侧边栏。这可以防止在标签/私人/书签等原生组件上出现失败。

### `blockOutStatusBar`

-   **类型:** `boolean`
-   **默认值:** `true`
-   **必填:** 否
-   **备注:** _这**仅适用于移动设备**_

在比较过程中自动屏蔽状态栏和地址栏。这可以防止时间、WiFi 或电池状态导致的失败。

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

即使图像是彩色的，比较也将比较 2 个黑白图像

### `ignoreLess`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

比较图像时使用 `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240` 进行比较

### `ignoreNothing`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

比较图像时使用 `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255` 进行比较

### `rawMisMatchPercentage`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

如果为 true，返回的百分比将如 `0.12345678`，默认为 `0.12`

### `returnAllCompareData`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

这将返回所有比较数据，而不仅仅是不匹配百分比

### `saveAboveTolerance`

-   **类型:** `number`
-   **默认值:** `0`
-   **必填:** 否

`misMatchPercentage` 的允许值，超过该值才保存有差异的图像

### `largeImageThreshold`

-   **类型:** `number`
-   **默认值:** `0`
-   **必填:** 否

比较大图像可能导致性能问题。
当为此处的像素数提供一个数字（大于 0）时，如果图像宽度或高度大于 `largeImageThreshold` 像素，比较算法将跳过像素。

### `scaleImagesToSameSize`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否

在执行比较前将 2 个图像缩放到相同大小。强烈建议启用 `ignoreAntialiasing` 和 `ignoreAlpha`

## 文件夹选项

基准文件夹和截图文件夹（实际、差异）是可以在插件实例化或方法中设置的选项。要在特定方法上设置文件夹选项，请在方法选项对象中传入文件夹选项。这可用于：

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

// 您可以将此用于所有方法
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

ResembleJS 渲染的图像差异的文件夹。