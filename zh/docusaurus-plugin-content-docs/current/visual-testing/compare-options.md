---
id: compare-options
title: 对比选项
---

对比选项是影响由 [ResembleJS](https://github.com/Huddle/Resemble.js) 执行的比较方式的选项。

:::info 注意
所有对比选项都可以在服务实例化期间或针对每个单独的 `checkElement`、`checkScreen` 和 `checkFullPageScreen` 使用。如果方法选项与在服务实例化期间设置的选项具有相同的键，则方法对比选项将覆盖服务对比选项的值。
:::

### `ignoreAlpha`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

比较图像并忽略透明度。

### `blockOutSideBar`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _只能用于 `checkScreen()`。它将覆盖插件设置。这**仅适用于 iPad**_

在横向模式下自动屏蔽 iPad 的侧边栏进行比较。这可以防止在标签/私密/书签原生组件上出现失败。

### `blockOutStatusBar`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置。这**仅适用于移动设备**_

在比较过程中自动屏蔽状态栏和地址栏。这可以防止因时间、Wi-Fi 或电池状态导致的失败。

### `blockOutToolBar`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置。这**仅适用于移动设备**_

自动屏蔽工具栏。

### `ignoreAntialiasing`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

比较图像并忽略抗锯齿。

### `ignoreColors`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

即使图像是彩色的，比较也将比较两个黑白图像。

### `ignoreLess`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

比较图像，并使用 `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240` 进行比较。

### `ignoreNothing`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

比较图像，并使用 `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255` 进行比较。

### `ignoreTransparentPixel`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

比较图像时，它将忽略在任一图像中具有一定透明度的所有像素。

### `rawMisMatchPercentage`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

如果为 true，返回的百分比将类似于 `0.12345678`，默认为 `0.12`。

### `returnAllCompareData`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

这将返回所有比较数据，而不仅仅是不匹配百分比。

### `saveAboveTolerance`

-   **类型:** `number`
-   **默认值:** `0`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

防止保存具有差异的图像的 `misMatchPercentage` 的可允许值。

### `largeImageThreshold`

-   **类型:** `number`
-   **默认值:** `0`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

比较大型图像可能导致性能问题。
当在此处提供像素数（高于 0）时，如果图像宽度或高度大于 `largeImageThreshold` 像素，比较算法将跳过像素。

### `scaleImagesToSameSize`

-   **类型:** `boolean`
-   **默认值:** `false`
-   **必填:** 否
-   **备注:** _也可用于 `checkElement`、`checkScreen()` 和 `checkFullPageScreen()`。它将覆盖插件设置_

在比较执行前将 2 个图像缩放到相同大小。强烈建议启用 `ignoreAntialiasing` 和 `ignoreAlpha`