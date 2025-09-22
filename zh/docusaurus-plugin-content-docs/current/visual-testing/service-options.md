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
-   **必需:** 否
-   **默认值:** `6`
-   **支持的应用上下文:** Web

需要添加到iOS和Android地址栏的填充，以便正确裁剪视口。

### `autoElementScroll`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, 混合应用 (Webview)

此选项允许你在创建元素截图时禁用将元素自动滚动到视图中。

### `addIOSBezelCorners`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

为iOS设备的截图添加边框角和刘海/灵动岛。

:::info 注意
这只能在设备名称**可以**自动确定并匹配以下规范化设备名称列表时完成。此模块将进行规范化处理。
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
-   **必需:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

如果在比较过程中未找到基准图像，则图像会自动复制到基准文件夹中。

### `baselineFolder`

-   **类型:** `string|()=> string`
-   **必需:** 否
-   **默认值:** `.path/to/testfile/__snapshots__/`
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

包含比较过程中使用的所有基准图像的目录。如果未设置，将使用默认值，该值会将文件存储在执行视觉测试的规范旁边的`__snapshots__/`文件夹中。也可以使用返回`string`的函数来设置`baselineFolder`值：

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// 或
{
    baselineFolder: () => {
        // 在这里做一些魔法
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

在初始化时删除运行时文件夹（`actual`和`diff`）

:::info 注意
这只有在通过插件选项设置[`screenshotPath`](#screenshotpath)时才有效，当你在方法中设置文件夹时**不会生效**
:::

### `createJsonReportFiles` **(新)**

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `false`

现在你可以选择将比较结果导出到JSON报告文件。通过提供选项`createJsonReportFiles: true`，每个比较的图像都会创建一个报告，存储在`actual`文件夹中，每个`actual`图像结果旁边。输出将如下所示：

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

当所有测试执行完毕后，将生成一个包含比较集合的新JSON文件，可以在`actual`文件夹的根目录中找到。数据按以下方式分组：

-   Jasmine/Mocha的`describe`或CucumberJS的`Feature`
-   Jasmine/Mocha的`it`或CucumberJS的`Scenario`
    然后按以下方式排序：
-   `commandName`，即用于比较图像的比较方法名称
-   `instanceData`，先是浏览器，然后是设备，最后是平台
    它会看起来像这样

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

报告数据将使你能够构建自己的可视化报告，而无需自己进行所有魔术和数据收集。

:::info 注意
你需要使用`@wdio/visual-testing`版本`5.2.0`或更高版本
:::

### `disableBlinkingCursor`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, 混合应用 (Webview)

启用/禁用应用程序中所有`input`、`textarea`、`[contenteditable]`的插入符号"闪烁"。如果设置为`true`，在截屏前会将插入符号设置为`transparent`，并在完成后重置。

### `disableCSSAnimation`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, 混合应用 (Webview)

启用/禁用应用程序中的所有CSS动画。如果设置为`true`，在截屏前会禁用所有动画，并在完成后重置。

### `enableLayoutTesting`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web

这会隐藏页面上的所有文本，因此只有布局用于比较。隐藏操作会通过向**每个**元素添加样式`'color': 'transparent !important'`来完成。

输出效果参见[测试输出](/docs/visual-testing/test-output#enablelayouttesting)

:::info
使用此标志，每个包含文本的元素（不仅仅是`p, h1, h2, h3, h4, h5, h6, span, a, li`，还包括`div|button|..`）都会获得此属性。**没有**选项可以定制此行为。
:::

### `formatImageName`

-   **类型:** `string`
-   **必需:** 否
-   **默认值:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

可以通过传递带有格式字符串的参数`formatImageName`来自定义保存的图像名称，如：

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

以下变量可以传递给格式字符串，并将自动从实例功能中读取。
如果无法确定，将使用默认值。

-   `browserName`: 提供的功能中的浏览器名称
-   `browserVersion`: 功能中提供的浏览器版本
-   `deviceName`: 功能中的设备名称
-   `dpr`: 设备像素比
-   `height`: 屏幕高度
-   `logName`: 功能中的logName
-   `mobile`: 这将在`deviceName`后添加`_app`或浏览器名称，以区分应用截图和浏览器截图
-   `platformName`: 提供的功能中的平台名称
-   `platformVersion`: 提供的功能中的平台版本
-   `tag`: 在调用的方法中提供的标签
-   `width`: 屏幕宽度

:::info

你不能在`formatImageName`中提供自定义路径/文件夹。如果要更改路径，请查看更改以下选项：

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- 每个方法的[`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **类型:** `number`
-   **必需:** 否
-   **默认值:** `1500`
-   **支持的应用上下文:** Web

滚动后等待的超时时间（毫秒）。这可能有助于识别具有延迟加载的页面。

:::info

这仅在服务/方法选项`userBasedFullPageScreenshot`设置为`true`时有效，另请参阅[`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, 混合应用 (Webview)

隐藏应用程序中的滚动条。如果设置为true，截屏前会禁用所有滚动条。这默认设置为`true`，以防止额外的问题。

### `logLevel`

-   **类型:** `string`
-   **必需:** 否
-   **默认值:** `info`
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

添加额外的日志，选项有`debug | info | warn | silent`

错误始终会记录到控制台。

### `savePerInstance`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必需:** 否
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

在单独的文件夹中保存每个实例的图像，例如所有Chrome截图将保存在Chrome文件夹中，如`desktop_chrome`。

### `screenshotPath`

-   **类型:** `string | () => string`
-   **默认值:** `.tmp/`
-   **必需:** 否
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用

将保存所有实际/不同截图的目录。如果未设置，将使用默认值。也可以使用返回字符串的函数来设置screenshotPath值：

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// 或
{
    screenshotPath: () => {
        // 在这里做一些魔法
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **类型:** `number`
-   **必需:** 否
-   **默认值:** Android为`6`，iOS为`15`（默认为`6`，对于带有刘海的iPhone或带有主屏幕栏的iPad，自动添加`9`）
-   **支持的应用上下文:** Web

需要添加到iOS和Android工具栏的填充，以便正确裁剪视口。

### `userBasedFullPageScreenshot`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `false`
-   **支持的应用上下文:** Web, 混合应用 (Webview) **visual-service@7.0.0中引入**

默认情况下，桌面Web上的全页面截图使用WebDriver BiDi协议捕获，该协议可实现快速、稳定且一致的截图，无需滚动。
当userBasedFullPageScreenshot设置为true时，截图过程会模拟真实用户：滚动页面、捕获视口大小的截图并将它们拼接在一起。此方法适用于具有延迟加载内容或依赖于滚动位置的动态渲染的页面。

如果你的页面依赖于滚动时加载的内容，或者想保留旧截图方法的行为，请使用此选项。

### `waitForFontsLoaded`

-   **类型:** `boolean`
-   **必需:** 否
-   **默认值:** `true`
-   **支持的应用上下文:** Web, 混合应用 (Webview)

字体（包括第三方字体）可以同步或异步加载。异步加载意味着在WebdriverIO确定页面已完全加载后，字体可能会加载。为了防止字体渲染问题，默认情况下，此模块会在截屏前等待所有字体加载完成。

## 可Tab选项

:::info 注意

该模块还支持通过绘制线条和点从一个可Tab元素到另一个可Tab元素，来显示用户如何使用键盘在网站上"Tab"浏览。<br/>
这项工作受到[Viv Richards](https://github.com/vivrichards600)博客文章["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)的启发。<br/>
可Tab元素的选择方式基于模块[tabbable](https://github.com/davidtheclark/tabbable)。如果有关于Tab的任何问题，请查看[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)，尤其是[更多详情部分](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)。

:::

### `tabbableOptions`

-   **类型:** `object`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

如果使用`{save|check}Tabbable`方法，可以更改线条和点的选项。下面解释这些选项。

#### `tabbableOptions.circle`

-   **类型:** `object`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

更改圆的选项。

##### `tabbableOptions.circle.backgroundColor`

-   **类型:** `string`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆的背景颜色。

##### `tabbableOptions.circle.borderColor`

-   **类型:** `string`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆的边框颜色。

##### `tabbableOptions.circle.borderWidth`

-   **类型:** `number`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆的边框宽度。

##### `tabbableOptions.circle.fontColor`

-   **类型:** `string`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆中文本的字体颜色。仅当[`showNumber`](./#tabbableoptionscircleshownumber)设置为`true`时才会显示。

##### `tabbableOptions.circle.fontFamily`

-   **类型:** `string`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆中文本的字体系列。仅当[`showNumber`](./#tabbableoptionscircleshownumber)设置为`true`时才会显示。

确保设置浏览器支持的字体。

##### `tabbableOptions.circle.fontSize`

-   **类型:** `number`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆中文本的字体大小。仅当[`showNumber`](./#tabbableoptionscircleshownumber)设置为`true`时才会显示。

##### `tabbableOptions.circle.size`

-   **类型:** `number`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

圆的大小。

##### `tabbableOptions.circle.showNumber`

-   **类型:** `showNumber`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

在圆中显示Tab序列号。

#### `tabbableOptions.line`

-   **类型:** `object`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

更改线的选项。

##### `tabbableOptions.line.color`

-   **类型:** `string`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

线的颜色。

##### `tabbableOptions.line.width`

-   **类型:** `number`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)
-   **支持的应用上下文:** Web

线的宽度。

## 比较选项

### `compareOptions`

-   **类型:** `object`
-   **必需:** 否
-   **默认值:** 所有默认值见[此处](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)
-   **支持的应用上下文:** Web, 混合应用 (Webview), 原生应用（更多信息见[方法比较选项](./method-options#compare-check-options)）

比较选项也可以设置为服务选项，它们在[方法比较选项](/docs/visual-testing/method-options#compare-check-options)中有描述