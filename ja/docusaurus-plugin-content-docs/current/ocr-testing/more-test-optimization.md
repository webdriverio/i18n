---
id: more-test-optimization
title: テスト実行時間
---

デフォルトでは、このモジュールはマシンやパイプラインにTesseractのローカルインストールがあるかどうかをチェックします。ローカルインストールがない場合は、自動的に[NodeJS](https://github.com/naptha/tesseract.js)バージョンを使用します。これにより、画像処理がNode.jsによって行われるため、処理速度が遅くなる可能性があります。NodeJSは重い処理を行うのに最適なシステムではありません。

**しかし...** 実行時間を最適化する方法があります。以下のテストスクリプトを見てみましょう：

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webbrowser.io");
        await browser.ocrClickOnText({
            text: "Search",
        });
        await browser.ocrSetValue({
            text: "docs",
            value: "specfileretries",
        });
        await browser.ocrWaitForTextDisplayed({
            text: "specFileRetries",
        });
    });
});
```

初めて実行すると、テストの完了に5.9秒かかったという以下のような結果が表示されるかもしれません。

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:52:53.405Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 126
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: d281dcdc43962b95835aea8f64cab6c7
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (5.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

## 画面の検索領域をトリミングする

OCRを実行する領域をトリミングして指定することで、実行時間を最適化できます。

スクリプトを次のように変更すると：

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webdriver.io");
        await driver.ocrClickOnText({
            haystack: $(".DocSearch"),
            text: "Search",
        });
        await driver.ocrSetValue({
            haystack: $(".DocSearch-Form"),
            text: "docs",
            value: "specfileretries",
        });
        await driver.ocrWaitForTextDisplayed({
            haystack: $(".DocSearch-Dropdown"),
            text: "specFileRetries",
        });
    });
});
```

実行時間が変わることがわかります。

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:56:55.326Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 124
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: c6cb1843535bda3ee3af07920ce232b8
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (4.8s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

:::tip 画像のトリミング
これによりローカル実行時間が**5.9**秒から**4.8秒**に短縮されました。これはほぼ**19%**の削減です。より多くのデータを含む大きなスクリプトでは、さらに効果があることが想像できます。
:::

## Tesseractのローカルインストールを使用する

ローカルマシンやパイプラインにTesseractのローカルインストールがあれば、実行時間を1分以下に短縮できます（Tesseractをローカルシステムにインストールする方法の詳細は[こちら](https://tesseract-ocr.github.io/tessdoc/Installation.html)で確認できます）。Tesseractのローカルインストールを使用した場合の同じスクリプトの実行時間は以下の通りです。

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:59:11.620Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: 87f8c1e949e15a383b902e4d59b1f738
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (3.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:06
```

:::tip ローカルインストール
これによりローカル実行時間が**5.9**秒から**3.9秒**に短縮されました。これはほぼ**34%**の削減です。より多くのデータを含む大きなスクリプトでは、さらに効果があることが想像できます。
:::