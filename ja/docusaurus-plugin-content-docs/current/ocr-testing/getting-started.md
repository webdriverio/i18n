---
id: getting-started
title: はじめに
---

## インストール

最も簡単な方法は、`package.json`に`@wdio/ocr-service`を依存関係として保持することです。

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

`WebdriverIO`のインストール方法については[こちら](../gettingstarted)をご覧ください。

:::note
このモジュールはOCRエンジンとしてTesseractを使用しています。デフォルトでは、システムにTesseractのローカルインストールがあるかどうかを確認し、ある場合はそれを使用します。ない場合は、自動的にインストールされる[Node.js Tesseract.js](https://github.com/naptha/tesseract.js)モジュールを使用します。

画像処理を高速化したい場合は、ローカルにインストールされたTesseractを使用することをお勧めします。[テスト実行時間](./more-test-optimization#using-a-local-installation-of-tesseract)も参照してください。
:::

ローカルシステムにシステム依存関係としてTesseractをインストールする方法については[こちら](https://tesseract-ocr.github.io/tessdoc/Installation.html)をご覧ください。

:::caution
Tesseractのインストールに関する質問やエラーについては、[Tesseract](https://github.com/tesseract-ocr/tesseract)プロジェクトを参照してください。
:::

## Typescriptサポート

`tsconfig.json`設定ファイルに`@wdio/ocr-service`を追加してください。

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## 設定

このサービスを使用するには、`wdio.conf.ts`の`services`配列に`ocr`を追加する必要があります。

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

### 設定オプション

#### `contrast`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** `0.25`

コントラストが高いほど画像が暗くなり、逆もまた然りです。これは画像内のテキストを見つけるのに役立ちます。`-1`から`1`の間の値を受け入れます。

#### `imagesFolder`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `{project-root}/.tmp/ocr`

OCR結果が保存されるフォルダです。

:::note
カスタムの`imagesFolder`を提供する場合、サービスは自動的にサブフォルダ`ocr`を追加します。
:::

#### `language`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `eng`

Tesseractが認識する言語です。詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)で、サポートされている言語は[こちら](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)で確認できます。

## ログ

このモジュールは自動的にWebdriverIOログに追加のログを追加します。`INFO`と`WARN`ログに`@wdio/ocr-service`という名前で書き込みます。
以下に例を示します。

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