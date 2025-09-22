---
id: method-options
title: 方法选项
---

方法选项是可以为每个[方法](./methods)设置的选项。如果选项与在插件实例化过程中设置的选项具有相同的键，则该方法选项将覆盖插件选项值。

:::info 注意

-   [保存选项](#save-options)中的所有选项都可用于[比较](#compare-check-options)方法
-   所有比较选项都可以在服务实例化期间**或**对每个单独的检查方法使用。如果方法选项与在服务实例化期间设置的选项具有相同的键，则方法比较选项将覆盖服务比较选项值。
- 除非另有说明，否则所有选项都可用于以下应用程序环境：
    - Web
    - 混合应用
    - 原生应用
- 以下示例使用的是`save*`方法，但也可以与`check*`方法一起使用

:::

## 保存选项

### `disableBlinkingCursor`

- **类型:** `boolean`
- **必须:** 否
- **默认值:** `false`
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

启用/禁用应用程序中所有`input`、`textarea`、`[contenteditable]`光标的"闪烁"。如果设置为`true`，光标将在截图前设置为`transparent`，完成后重置。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **类型:** `boolean`
- **必须:** 否
- **默认值:** `false`
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

启用/禁用应用程序中的所有CSS动画。如果设置为`true`，所有动画将在截图前禁用，完成后重置

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **类型:** `boolean`
- **必须:** 否
- **默认值:** `false`
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

使用此选项可切换回基于W3C-WebDriver协议的"旧"截图方法。如果您的测试依赖于现有的基准图像，或者您在不完全支持基于BiDi的新截图方法的环境中运行，这可能会有所帮助。
请注意，启用此功能可能会产生分辨率或质量略有不同的截图。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **类型:** `boolean`
- **必须:** 否
- **默认值:** `false`
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

这将隐藏页面上的所有文本，因此只有布局将用于比较。隐藏将通过添加样式`'color': 'transparent !important'`到__每个__元素来完成。

有关输出，请参见[测试输出](./test-output#enablelayouttesting)。

:::info
通过使用此标志，每个包含文本的元素（不仅是`p, h1, h2, h3, h4, h5, h6, span, a, li`，还包括`div|button|..`）都将获得此属性。没有__任何__选项可以定制这一点。
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **类型:** `boolean`
- **必须:** 否
- **默认值:** `true`
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

在应用程序中隐藏滚动条。如果设置为true，所有滚动条将在截图前禁用。默认设置为`true`以防止额外问题。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **类型:** `array`
- **必须:** 否
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

此方法可以通过向元素添加属性`visibility: hidden`来隐藏一个或多个元素，方法是提供元素数组。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **类型:** `array`
- **必须:** 否
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

此方法可以通过向元素添加属性`display: none`来_移除_一个或多个元素，方法是提供元素数组。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **类型:** `object`
- **必须:** 否
- **默认值:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **用于:** 仅用于[`saveElement`](./methods#saveelement)或[`checkElement`](./methods#checkelement)
- **支持的应用程序环境:** Web, 混合应用(Webview), 原生应用

一个对象，需要包含`top`、`right`、`bottom`和`left`像素数量，这些像素数量需要使元素裁剪更大。

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **类型:** `boolean`
- **必须:** 否
- **默认值:** `false`
- **用于:** 仅用于[`saveFullPageScreen`](./methods#savefullpagescreen)、[`saveTabbablePage`](./methods#savetabbablepage)、[`checkFullPageScreen`](./methods#checkfullpagescreen)或[`checkTabbablePage`](./methods#checktabbablepage)
- **支持的应用程序环境:** Web, 混合应用(Webview)

当设置为`true`时，此选项启用**滚动和拼接策略**来捕获全页面截图。
它不使用浏览器的原生截图功能，而是手动滚动页面并将多个截图拼接在一起。
这种方法对于具有**懒加载内容**或需要滚动才能完全渲染的复杂布局的页面特别有用。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **类型:** `number`
- **必须:** 否
- **默认值:** `1500`
- **用于:** 仅用于[`saveFullPageScreen`](./methods#savefullpagescreen)或[`saveTabbablePage`](./methods#savetabbablepage)
- **支持的应用程序环境:** Web, 混合应用(Webview)

滚动后等待的超时时间（以毫秒为单位）。这可能有助于识别具有懒加载的页面。

> **注意:** 这仅在`userBasedFullPageScreenshot`设置为`true`时有效

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **类型:** `array`
- **必须:** 否
- **用于:** 仅用于[`saveFullPageScreen`](./methods#savefullpagescreen)或[`saveTabbablePage`](./methods#savetabbablepage)
- **支持的应用程序环境:** Web, 混合应用(Webview)

此方法将通过向提供的元素数组中的元素添加属性`visibility: hidden`来隐藏一个或多个元素。
当页面例如包含粘性元素（页面滚动时会随页面滚动但在制作全页面截图时会产生令人烦恼的效果）时，这将非常方便。

> **注意:** 这仅在`userBasedFullPageScreenshot`设置为`true`时有效

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **类型:** `boolean`
- **必须:** 否
- **默认值:** `true`
- **用于:** 所有[方法](./methods)
- **支持的应用程序环境:** Web, 混合应用(Webview)

字体（包括第三方字体）可以同步或异步加载。异步加载意味着字体可能会在WebdriverIO确定页面已完全加载后才加载。为了防止字体渲染问题，默认情况下，此模块将等待所有字体加载完成后再进行截图。

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## 比较（检查）选项

比较选项是影响[ResembleJS](https://github.com/Huddle/Resemble.js)执行比较方式的选项。

### `ignoreAlpha`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

比较图像并忽略alpha通道。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **类型:** `boolean`
- **默认值:** `true`
- **必须:** 否
- **用于:** _只能用于`checkScreen()`。这**仅适用于iPad**_
- **支持的应用程序环境:** 所有

在比较期间自动屏蔽横屏模式下iPad的侧边栏。这可防止在标签/私密/书签本地组件上出现故障。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **类型:** `boolean`
- **默认值:** `true`
- **必须:** 否
- **用于:** _这**仅适用于移动设备**_
- **支持的应用程序环境:** 混合（原生部分）和原生应用

在比较期间自动屏蔽状态栏和地址栏。这可防止在时间、WiFi或电池状态上出现故障。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **类型:** `boolean`
- **默认值:** `true`
- **必须:** 否
- **用于:** _这**仅适用于移动设备**_
- **支持的应用程序环境:** 混合（原生部分）和原生应用

自动屏蔽工具栏。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

比较图像并忽略抗锯齿。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

即使图像是彩色的，比较时也会比较两个黑白图像。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

比较图像并使用`red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`进行比较。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

比较图像并使用`red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`进行比较。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

如果为true，返回的百分比将为`0.12345678`，默认为`0.12`。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

这将返回所有比较数据，而不仅仅是不匹配百分比，另请参见[控制台输出](./test-output#console-output-1)。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **类型:** `number`
- **默认值:** `0`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

防止保存具有差异的图像的`misMatchPercentage`的可接受值。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **类型:** `number`
- **默认值:** `0`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

比较大图像可能导致性能问题。
当为像素数提供一个大于0的数字时，如果图像宽度或高度大于`largeImageThreshold`像素，比较算法会跳过像素。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **类型:** `boolean`
- **默认值:** `false`
- **必须:** 否
- **用于:** 所有[检查方法](./methods#check-methods)
- **支持的应用程序环境:** 所有

在执行比较之前将2个图像缩放到相同大小。强烈建议启用`ignoreAntialiasing`和`ignoreAlpha`。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **类型:** `array`
- **必须:** 否
- **用于:** 仅与`checkScreen`方法一起使用，**不**与`checkElement`方法一起使用
- **支持的应用程序环境:** 原生应用

此方法将根据元素数组或包含`x|y|width|height`的对象自动屏蔽屏幕上的元素或区域。

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## 文件夹选项

基准文件夹和截图文件夹（实际、差异）是可以在插件实例化或方法期间设置的选项。要在特定方法上设置文件夹选项，请将文件夹选项传递给方法选项对象。这可用于：

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

- **类型:** `string`
- **必须:** 否
- **支持的应用程序环境:** 所有

用于存放测试中捕获的快照的文件夹。

### `baselineFolder`

- **类型:** `string`
- **必须:** 否
- **支持的应用程序环境:** 所有

用于存放用于比较的基准图像的文件夹。

### `diffFolder`

- **类型:** `string`
- **必须:** 否
- **支持的应用程序环境:** 所有

用于存放由ResembleJS渲染的图像差异的文件夹。