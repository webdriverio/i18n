---
id: ocr-testing
title: OCR テスト
---

モバイルネイティブアプリやデスクトップサイトでの自動テストは、一意の識別子がない要素を扱う場合に特に困難になることがあります。標準的な [WebdriverIO セレクタ](https://webdriver.io/docs/selectors) が常に役立つとは限りません。ここで登場するのが `@wdio/ocr-service` です。これは OCR（[光学文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition)）を活用して、画面上の要素を**表示されるテキスト**に基づいて検索、待機、操作できる強力なサービスです。

以下のカスタムコマンドが提供され、`browser/driver` オブジェクトに追加されるため、作業に必要な適切なツールセットが得られます。

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### 仕組み

このサービスは以下のことを行います：

1. 画面/デバイスのスクリーンショットを作成します。（必要に応じて、特定の領域を指定するための「干し草」として要素または長方形オブジェクトを提供できます。各コマンドのドキュメントを参照してください。）
1. スクリーンショットを高コントラストの白黒に変換してOCRのために最適化します（高コントラストは多くの画像背景ノイズを防ぐために必要です。これはコマンドごとにカスタマイズ可能です。）
1. [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract)の[光学文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition)を使用して、画面からすべてのテキストを取得し、画像上で見つかったすべてのテキストをハイライトします。[ここで](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)見つけることができる複数の言語をサポートしています。
1. [Fuse.js](https://fusejs.io/)のファジーロジックを使用して、指定されたパターンに「おおよそ等しい」文字列を見つけます（完全一致ではなく）。例えば、検索値 `Username` が `Usename` というテキストも見つけることができます。
1. ターミナルを通じて画像を検証しテキストを取得するための CLI ウィザード（`npx ocr-service`）を提供します。

ステップ1、2、3の例はこの画像で確認できます

![Process steps](/img/ocr/processing-steps.jpg)

このサービスは（WebdriverIOが使用するもの以外の）システム依存関係が**ゼロ**で動作しますが、必要に応じて[Tesseract](https://tesseract-ocr.github.io/tessdoc/)のローカルインストールでも動作することができ、実行時間を大幅に短縮できます！（テストの高速化については[テスト実行の最適化](#test-execution-optimization)も参照してください。）

興味がありますか？[使い方ガイド](./getting-started)に従って今すぐ使い始めましょう。

:::caution 重要
Tesseractから良質な出力が得られない理由はさまざまあります。アプリとこのモジュールに関連する最大の理由の1つは、見つける必要があるテキストと背景の間に適切な色の区別がないことかもしれません。例えば、暗い背景上の白いテキストは「簡単に」見つけることができますが、白い背景上の明るいテキストや暗い背景上の暗いテキストはほとんど見つけることができません。

詳細については、Tesseractの[このページ](https://tesseract-ocr.github.io/tessdoc/ImproveQuality)も参照してください。

また、[FAQ](./ocr-faq)を読むことも忘れないでください。
:::