---
id: methods
title: 方法
---

以下方法添加到全局WebdriverIO [`browser`](/docs/api/browser)-对象中。

## 保存方法

:::info 提示
只有当你**不**想比较屏幕，而只想获取元素/屏幕截图时，才使用保存方法。
:::

### `saveElement`

保存元素的图像。

#### 用法

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器
- 移动浏览器
- 移动混合应用
- 移动原生应用

#### 参数

-   **`element`:**
    -   **必填:** 是
    -   **类型:** WebdriverIO Element
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`saveElementOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [保存选项](./method-options#save-options)

#### 输出:

查看 [测试输出](./test-output#savescreenelementfullpagescreen) 页面。

### `saveScreen`

保存视口的图像。

#### 用法

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器
- 移动浏览器
- 移动混合应用
- 移动原生应用

#### 参数
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`saveScreenOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [保存选项](./method-options#save-options)

#### 输出:

查看 [测试输出](./test-output#savescreenelementfullpagescreen) 页面。

### `saveFullPageScreen`

#### 用法

保存完整屏幕的图像。

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器
- 移动浏览器

#### 参数
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`saveFullPageScreenOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [保存选项](./method-options#save-options)

#### 输出:

查看 [测试输出](./test-output#savescreenelementfullpagescreen) 页面。

### `saveTabbablePage`

保存带有可选中线条和点的完整屏幕图像。

#### 用法

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器

#### 参数
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`saveTabbableOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [保存选项](./method-options#save-options)

#### 输出:

查看 [测试输出](./test-output#savescreenelementfullpagescreen) 页面。

## 检查方法

:::info 提示
当第一次使用`check`方法时，你会在日志中看到以下警告。这意味着如果你想创建基准图像，不需要同时使用`save`和`check`方法。

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

将元素的图像与基准图像进行比较。

#### 用法

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器
- 移动浏览器
- 移动混合应用
- 移动原生应用

#### 参数
-   **`element`:**
    -   **必填:** 是
    -   **类型:** WebdriverIO Element
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`checkElementOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [比较/检查选项](./method-options#compare-check-options)

#### 输出:

查看 [测试输出](./test-output#checkscreenelementfullpagescreen) 页面。

### `checkScreen`

将视口的图像与基准图像进行比较。

#### 用法

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器
- 移动浏览器
- 移动混合应用
- 移动原生应用

#### 参数
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`checkScreenOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [比较/检查选项](./method-options#compare-check-options)

#### 输出:

查看 [测试输出](./test-output#checkscreenelementfullpagescreen) 页面。

### `checkFullPageScreen`

将完整屏幕的图像与基准图像进行比较。

#### 用法

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器
- 移动浏览器

#### 参数
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`checkFullPageOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [比较/检查选项](./method-options#compare-check-options)

#### 输出:

查看 [测试输出](./test-output#checkscreenelementfullpagescreen) 页面。

### `checkTabbablePage`

将带有可选中线条和点的完整屏幕图像与基准图像进行比较。

#### 用法

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### 支持

- 桌面浏览器

#### 参数
-   **`tag`:**
    -   **必填:** 是
    -   **类型:** string
-   **`checkTabbableOptions`:**
    -   **必填:** 否
    -   **类型:** 选项对象，详见 [比较/检查选项](./method-options#compare-check-options)

#### 输出:

查看 [测试输出](./test-output#checkscreenelementfullpagescreen) 页面。