---
id: getting-started
title: 入门指南
---

## 安装

最简单的方法是通过在您的 `package.json` 中保持 `@wdio/ocr-service` 作为依赖项。

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](../gettingstarted)找到。

:::note
这个模块使用 Tesseract 作为 OCR 引擎。默认情况下，它会检查您的系统上是否安装了 Tesseract 的本地版本，如果有，它将使用该版本。如果没有，它将使用自动为您安装的 [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) 模块。

如果您想加快图像处理速度，建议使用本地安装的 Tesseract 版本。另请参阅[测试执行时间](./more-test-optimization#using-a-local-installation-of-tesseract)。
:::

关于如何在本地系统上安装 Tesseract 作为系统依赖项的说明可以在[这里](https://tesseract-ocr.github.io/tessdoc/Installation.html)找到。

:::caution
关于 Tesseract 的安装问题/错误，请参考 [Tesseract](https://github.com/tesseract-ocr/tesseract) 项目。
:::

## Typescript 支持

确保您将 `@wdio/ocr-service` 添加到您的 `tsconfig.json` 配置文件中。

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## 配置

要使用该服务，您需要在 `wdio.conf.ts` 中将 `ocr` 添加到您的 services 数组中

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### 配置选项

#### `contrast`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `0.25`

对比度越高，图像越暗，反之亦然。这可以帮助在图像中找到文本。它接受 `-1` 和 `1` 之间的值。

#### `imagesFolder`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** `{project-root}/.tmp/ocr`

存储 OCR 结果的文件夹。

:::note
如果您提供自定义 `imagesFolder`，则服务将自动在其中添加子文件夹 `ocr`。
:::

#### `language`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** `eng`

Tesseract 将识别的语言。更多信息可以在[这里](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)找到，支持的语言可以在[这里](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)找到。

## 日志

此模块将自动向 WebdriverIO 日志添加额外的日志。它使用名称 `@wdio/ocr-service` 写入 `INFO` 和 `WARN` 日志。
示例可以在下面找到。

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```