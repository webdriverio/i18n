---
id: service-options
title: 服务选项
---

服务选项是在实例化服务时设置的选项，将用于每个方法调用。

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
-   **必填:** 否
-   **默认值:** `6`
-   **支持:** Web

需要添加到iOS和Android地址栏的填充，以便正确裁剪视口。

### `autoElementScroll`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`
-   **支持:** Web, Hybrid App (Webview)

此选项允许您在创建元素截图时禁用元素自动滚动到视图中。

### `addIOSBezelCorners`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, Hybrid App (Webview), Native App

为iOS设备的截图添加边框角和刘海/灵动岛。

:::info 注意
这只能在设备名称**能够**自动确定并匹配以下标准化设备名称列表时完成。标准化将由此模块完成。
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
-   **必填:** 否
-   **默认值:** `true`
-   **支持:** Web, Hybrid App (Webview), Native App

如果在比较过程中找不到基准图像，则自动将图像复制到基准文件夹。

### `baselineFolder`

-   **类型:** `string|()=> string`
-   **必填:** 否
-   **默认值:** `.path/to/testfile/__snapshots__/`
-   **支持:** Web, Hybrid App (Webview), Native App

将保存所有在比较期间使用的基准图像的目录。如果未设置，将使用默认值，即将文件存储在执行视觉测试的规格旁边的`__snapshots__/`文件夹中。也可以使用返回`string`的函数来设置`baselineFolder`值：

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// 或者
{
    baselineFolder: () => {
        // 在这里做一些魔法操作
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, Hybrid App (Webview), Native App

在初始化时删除运行时文件夹（`actual`和`diff`）

:::info 注意
这只有在通过插件选项设置[`screenshotPath`](#screenshotpath)时才会生效，**不会**在方法中设置文件夹时生效
:::

### `createJsonReportFiles` **(新功能)**

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`

现在您可以选择将比较结果导出到JSON报告文件。通过提供选项`createJsonReportFiles: true`，每个被比较的图像都会创建一个报告，存储在`actual`文件夹中，与每个`actual`图像结果放在一起。输出将如下所示：

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
    它将看起来像这样

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

报告数据将使您有机会构建自己的视觉报告，而无需自己完成所有的魔法和数据收集。

:::info 注意
您需要使用`@wdio/visual-testing`版本`5.2.0`或更高版本
:::

### `disableBlinkingCursor`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, Hybrid App (Webview)

启用/禁用应用程序中所有`input`、`textarea`、`[contenteditable]`光标的"闪烁"。如果设置为`true`，截图前光标将被设置为`transparent`，
完成后恢复

### `disableCSSAnimation`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, Hybrid App (Webview)

启用/禁用应用程序中的所有CSS动画。如果设置为`true`，截图前将禁用所有动画，
完成后恢复

### `enableLayoutTesting`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web

这将隐藏页面上的所有文本，因此只使用布局进行比较。隐藏将通过向**每个**元素添加样式`'color': 'transparent !important'`来完成。

输出结果请参见[测试输出](/docs/visual-testing/test-output#enablelayouttesting)

:::info
使用此标志，每个包含文本的元素（不仅是`p, h1, h2, h3, h4, h5, h6, span, a, li`，还包括`div|button|..`）都将获得此属性。**没有**选项可以定制这一点。
:::

### `formatImageName`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **支持:** Web, Hybrid App (Webview), Native App

保存的图像名称可以通过传递带有格式字符串的`formatImageName`参数来自定义，例如：

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
-   `platformVersion`: 功能中提供的平台版本
-   `tag`: 在调用的方法中提供的标签
-   `width`: 屏幕宽度

:::info

您不能在`formatImageName`中提供自定义路径/文件夹。如果要更改路径，请查看更改以下选项：

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- 每个方法的[`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `1500`
-   **支持:** Web

滚动后等待的超时时间（毫秒）。这可能有助于识别具有懒加载的页面。

:::info

这只有在服务/方法选项`userBasedFullPageScreenshot`设置为`true`时才会生效，另见[`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`
-   **支持:** Web, Hybrid App (Webview)

隐藏应用程序中的滚动条。如果设置为true，截图前将禁用所有滚动条。这默认设置为`true`以防止额外问题。

### `logLevel`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** `info`
-   **支持:** Web, Hybrid App (Webview), Native App

添加额外日志，选项有 `debug | info | warn | silent`

错误始终记录到控制台。

### `savePerInstance`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **支持:** Web, Hybrid App (Webview), Native App

每个实例在单独的文件夹中保存图像，例如所有Chrome截图将保存在名为`desktop_chrome`的Chrome文件夹中。

### `screenshotPath`

-   **类型:** `string | () => string`
-   **默认值:** `.tmp/`
-   **必填:** 否
-   **支持:** Web, Hybrid App (Webview), Native App

将保存所有实际/不同截图的目录。如果未设置，将使用默认值。也可以使用返回字符串的函数来设置screenshotPath值：

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// 或者
{
    screenshotPath: () => {
        // 在这里做一些魔法操作
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** Android为`6`，iOS为`15`（默认为`6`，对于带有刘海的iPhone或带有主页栏的iPad，会自动添加`9`）
-   **支持:** Web

需要添加到iOS和Android工具栏的填充，以正确裁剪视口。

### `userBasedFullPageScreenshot`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`
-   **支持:** Web, Hybrid App (Webview) **在visual-service@7.0.0中引入**

默认情况下，桌面网页的全页截图使用WebDriver BiDi协议捕获，该协议支持快速、稳定且一致的截图，无需滚动。
当userBasedFullPageScreenshot设置为true时，截图过程模拟真实用户：滚动页面，捕获视口大小的截图，并将它们拼接在一起。这种方法适用于具有懒加载内容或依赖于滚动位置的动态渲染的页面。

如果您的页面依赖于滚动时加载的内容，或者您想保留旧截图方法的行为，请使用此选项。

### `waitForFontsLoaded`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`
-   **支持:** Web, Hybrid App (Webview)

字体（包括第三方字体）可以同步或异步加载。异步加载意味着字体可能会在WebdriverIO确定页面已完全加载后才加载。为防止字体渲染问题，默认情况下，此模块会在截图前等待所有字体加载完成。

## Tabbable选项

:::info 注意

此模块还支持通过从可选中元素到可选中元素绘制线条和点来描绘用户如何使用键盘_tab_浏览网站。<br/>
这项工作的灵感来自[Viv Richards](https://github.com/vivrichards600)的博客文章["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)。<br/>
选择可选中元素的方式基于模块[tabbable](https://github.com/davidtheclark/tabbable)。如果有关于标签切换的任何问题，请查看[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)，特别是[More details部分](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)。

:::

### `tabbableOptions`

-   **类型:** `object`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

如果使用`{save|check}Tabbable`方法，可以更改线条和点的选项。选项说明如下。

#### `tabbableOptions.circle`

-   **类型:** `object`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

更改圆圈的选项。

##### `tabbableOptions.circle.backgroundColor`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

圆圈的背景颜色。

##### `tabbableOptions.circle.borderColor`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

圆圈的边框颜色。

##### `tabbableOptions.circle.borderWidth`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

圆圈的边框宽度。

##### `tabbableOptions.circle.fontColor`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

圆圈中文本的字体颜色。仅当[`showNumber`](./#tabbableoptionscircleshownumber)设置为`true`时才会显示。

##### `tabbableOptions.circle.fontFamily`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

圆圈中文本的字体系列。仅当[`showNumber`](./#tabbableoptionscircleshownumber)设置为`true`时才会显示。

确保设置浏览器支持的字体。

##### `tabbableOptions.circle.fontSize`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

圆圈中文本的字体大小。仅当[`showNumber`](./#tabbableoptionscircleshownumber)设置为`true`时才会显示。

##### `tabbableOptions.circle.size`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

圆圈的大小。

##### `tabbableOptions.circle.showNumber`

-   **类型:** `showNumber`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

在圆圈中显示标签序列号。

#### `tabbableOptions.line`

-   **类型:** `object`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

更改线条的选项。

##### `tabbableOptions.line.color`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

线条的颜色。

##### `tabbableOptions.line.width`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)
-   **支持:** Web

线条的宽度。

## 比较选项

### `compareOptions`

-   **类型:** `object`
-   **必填:** 否
-   **默认值:** 所有默认值见[这里](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)
-   **支持:** Web, Hybrid App (Webview), Native App（更多信息请参见[方法比较选项](./method-options#compare-check-options)）

比较选项也可以设置为服务选项，它们在[方法比较选项](/docs/visual-testing/method-options#compare-check-options)中有描述