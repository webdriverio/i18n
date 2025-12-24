---
id: service-options
title: 服务选项
---

服务选项是在服务实例化时设置的选项，将用于每个方法调用。

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## 默认选项

### `addressBarShadowPadding`

-   **类型:** `number`
-   **必须:** 否
-   **默认值:** `6`
-   **支持的应用上下文:** Web

需要添加到 iOS 和 Android 地址栏的内边距，以便正确裁剪视口。

### `autoElementScroll`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, Hybrid App (Webview)

此选项允许你禁用创建元素截图时自动将元素滚动到视图中的功能。

### `addIOSBezelCorners`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

为 iOS 设备的截图添加边框角和刘海/灵动岛。

:::info 注意
这只能在设备名称**能**自动确定并匹配以下规范化设备名称列表时完成。规范化将由此模块完成。
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`
:::

### `autoSaveBaseline`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

如果在比较期间找不到基准图像，则自动将图像复制到基准文件夹。

### `alwaysSaveActualImage`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** 所有

当将此选项设置为 `false` 时，它将：

- 当没有差异时不保存实际图像
- 当 `createJsonReportFiles` 设置为 `true` 时不存储 jsonreport 文件。它还会在日志中显示 `createJsonReportFiles` 已禁用的警告

这应该能提高性能，因为没有文件写入系统，并且应该确保 `actual` 文件夹中没有太多噪音。

### `baselineFolder`

-   **类型:** `string|()=> string`
-   **必须:** 否
-   **默认值:** `.path/to/testfile/__snapshots__/`
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

将保存比较期间使用的所有基准图像的目录。如果未设置，将使用默认值，该值会将文件存储在执行视觉测试的规范旁边的 `__snapshots__/` 文件夹中。也可以使用返回 `string` 的函数来设置 `baselineFolder` 值：

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

在初始化时删除运行时文件夹（`actual` 和 `diff`）

:::info 注意
这仅在通过插件选项设置 [`screenshotPath`](#screenshotpath) 时有效，当你在方法中设置文件夹时**将不起作用**
:::

### `createJsonReportFiles` **(新)**

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `false`

现在你可以选择将比较结果导出到 JSON 报告文件。通过提供选项 `createJsonReportFiles: true`，每个比较的图像都会创建一个存储在 `actual` 文件夹中的报告，与每个 `actual` 图像结果一起。输出将如下所示：

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

当所有测试执行完毕后，将生成一个包含比较集合的新 JSON 文件，可以在 `actual` 文件夹的根目录中找到。数据按以下方式分组：

-   Jasmine/Mocha 的 `describe` 或 CucumberJS 的 `Feature`
-   Jasmine/Mocha 的 `it` 或 CucumberJS 的 `Scenario`
    然后按以下方式排序：
-   `commandName`，用于比较图像的比较方法名称
-   `instanceData`，先是浏览器，然后是设备，最后是平台
    它将如下所示：

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

报告数据将为你提供构建自己的视觉报告的机会，而无需自己完成所有魔术和数据收集。

:::info 注意
你需要使用 `@wdio/visual-testing` 版本 `5.2.0` 或更高版本
:::

### `disableBlinkingCursor`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, Hybrid App (Webview)

启用/禁用应用程序中所有 `input`、`textarea`、`[contenteditable]` 光标的"闪烁"。如果设置为 `true`，则在截屏前将光标设置为 `transparent`，完成后重置

### `disableCSSAnimation`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, Hybrid App (Webview)

启用/禁用应用程序中的所有 CSS 动画。如果设置为 `true`，则在截屏前将禁用所有动画，完成后重置

### `enableLayoutTesting`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web

这将隐藏页面上的所有文本，因此只有布局将用于比较。隐藏将通过向**每个**元素添加样式 `'color': 'transparent !important'` 来完成。

输出请参见 [测试输出](/docs/visual-testing/test-output#enablelayouttesting)

:::info
通过使用此标志，每个包含文本的元素（不仅是 `p, h1, h2, h3, h4, h5, h6, span, a, li`，还包括 `div|button|..`）都会获得此属性。**没有**选项可以定制这一点。
:::

### `formatImageName`

-   **类型:** `string`
-   **必须:** 否
-   **默认值:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

可以通过传递带有格式字符串的参数 `formatImageName` 来自定义保存的图像的名称，如：

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

可以传递以下变量来格式化字符串，这些变量将自动从实例功能中读取。
如果无法确定，将使用默认值。

-   `browserName`: 提供的功能中的浏览器名称
-   `browserVersion`: 功能中提供的浏览器版本
-   `deviceName`: 功能中的设备名称
-   `dpr`: 设备像素比
-   `height`: 屏幕的高度
-   `logName`: 功能中的 logName
-   `mobile`: 这将在 `deviceName` 后添加 `_app` 或浏览器名称，以区分应用截图和浏览器截图
-   `platformName`: 提供的功能中的平台名称
-   `platformVersion`: 提供的功能中的平台版本
-   `tag`: 在被调用的方法中提供的标签
-   `width`: 屏幕的宽度

:::info

你不能在 `formatImageName` 中提供自定义路径/文件夹。如果你想更改路径，请检查更改以下选项：

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- 每个方法的 [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **类型:** `number`
-   **必须:** 否
-   **默认值:** `1500`
-   **支持的应用上下文:** Web

滚动后等待的超时时间（毫秒）。这可能有助于识别具有延迟加载的页面。

:::info

这仅在服务/方法选项 `userBasedFullPageScreenshot` 设置为 `true` 时起作用，另请参见 [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, Hybrid App (Webview)

在应用程序中隐藏滚动条。如果设置为 true，则在截屏前禁用所有滚动条。这默认设置为 `true` 以防止额外问题。

### `logLevel`

-   **类型:** `string`
-   **必须:** 否
-   **默认值:** `info`
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

添加额外的日志，选项有 `debug | info | warn | silent`

错误始终记录到控制台。

### `savePerInstance`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必须:** 否
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

将每个实例的图像保存在单独的文件夹中，例如，所有 Chrome 截图将保存在名为 `desktop_chrome` 的 Chrome 文件夹中。

### `screenshotPath`

-   **类型:** `string | () => string`
-   **默认值:** `.tmp/`
-   **必须:** 否
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App

将保存所有实际/差异截图的目录。如果未设置，将使用默认值。也可以使用返回字符串的函数来设置 screenshotPath 值：

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **类型:** `number`
-   **必须:** 否
-   **默认值:** Android 为 `6`，iOS 为 `15`（默认为 `6`，对于带有刘海的 iPhone 或带有主页栏的 iPad，将自动添加 `9`）
-   **支持的应用上下文:** Web

需要添加到 iOS 和 Android 上工具栏的内边距，以便正确裁剪视口。

### `userBasedFullPageScreenshot`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, Hybrid App (Webview) **在 visual-service@7.0.0 中引入**

默认情况下，桌面网络上的全页截图使用 WebDriver BiDi 协议捕获，该协议可以实现快速、稳定和一致的截图，而无需滚动。
当 userBasedFullPageScreenshot 设置为 true 时，截图过程会模拟真实用户：滚动页面、捕获视口大小的截图并将它们拼接在一起。此方法适用于具有延迟加载内容或依赖于滚动位置的动态渲染的页面。

如果你的页面依赖于滚动时加载的内容，或者你想保留旧截图方法的行为，请使用此选项。

### `waitForFontsLoaded`

-   **类型:** `boolean`
-   **必须:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, Hybrid App (Webview)

字体，包括第三方字体，可以同步或异步加载。异步加载意味着字体可能会在 WebdriverIO 确定页面已完全加载后加载。为防止字体渲染问题，默认情况下，此模块将等待所有字体加载完成后再进行截图。

## 可选项选项

:::info 注意

该模块还支持通过绘制线条和点，从一个可选项元素到另一个可选项元素，来显示用户如何使用键盘在网站上 _tab_ 切换的方式。<br/>
这项工作的灵感来自 [Viv Richards](https://github.com/vivrichards600) 的博客文章 ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)。<br/>
选择可选项元素的方式基于模块 [tabbable](https://github.com/davidtheclark/tabbable)。如果关于选项卡有任何问题，请查看 [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)，尤其是 [更多详情部分](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)。

:::

### `tabbableOptions`

-   **类型:** `object`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

如果你使用 `{save|check}Tabbable` 方法，可以更改线条和点的选项。选项如下所述。

#### `tabbableOptions.circle`

-   **类型:** `object`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

更改圆圈的选项。

##### `tabbableOptions.circle.backgroundColor`

-   **类型:** `string`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆圈的背景颜色。

##### `tabbableOptions.circle.borderColor`

-   **类型:** `string`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆圈的边框颜色。

##### `tabbableOptions.circle.borderWidth`

-   **类型:** `number`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆圈的边框宽度。

##### `tabbableOptions.circle.fontColor`

-   **类型:** `string`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆圈中文本的字体颜色。仅当 [`showNumber`](./#tabbableoptionscircleshownumber) 设置为 `true` 时才会显示。

##### `tabbableOptions.circle.fontFamily`

-   **类型:** `string`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆圈中文本的字体系列。仅当 [`showNumber`](./#tabbableoptionscircleshownumber) 设置为 `true` 时才会显示。

确保设置浏览器支持的字体。

##### `tabbableOptions.circle.fontSize`

-   **类型:** `number`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆圈中文本的字体大小。仅当 [`showNumber`](./#tabbableoptionscircleshownumber) 设置为 `true` 时才会显示。

##### `tabbableOptions.circle.size`

-   **类型:** `number`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆圈的大小。

##### `tabbableOptions.circle.showNumber`

-   **类型:** `showNumber`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

在圆圈中显示 tab 序列号。

#### `tabbableOptions.line`

-   **类型:** `object`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

更改线条的选项。

##### `tabbableOptions.line.color`

-   **类型:** `string`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

线条的颜色。

##### `tabbableOptions.line.width`

-   **类型:** `number`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

线条的宽度。

## 比较选项

### `compareOptions`

-   **类型:** `object`
-   **必须:** 否
-   **默认值:** 所有默认值请参见 [此处](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)
-   **支持的应用上下文:** Web, Hybrid App (Webview), Native App (更多信息请参见 [方法比较选项](./method-options#compare-check-options))

比较选项也可以设置为服务选项，它们在 [方法比较选项](/docs/visual-testing/method-options#compare-check-options) 中有所描述