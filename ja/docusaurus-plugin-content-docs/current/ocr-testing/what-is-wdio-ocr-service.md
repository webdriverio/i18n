---
id: ocr-testing
title: OCR テスト
---

モバイルネイティブアプリやデスクトップサイトでの自動テストは、ユニークな識別子のない要素を扱う場合に特に難しい場合があります。標準的な [WebdriverIO セレクタ](https://webdriver.io/docs/selectors) だけでは十分に対応できないことがあります。そこで登場するのが `@wdio/ocr-service` です。これは OCR（[光学式文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition)）を活用して、**表示されているテキスト**に基づいて画面上の要素を検索、待機、操作できる強力なサービスです。

以下のカスタムコマンドが提供され、`browser/driver` オブジェクトに追加されるため、適切なツールセットを使って作業を行うことができます。

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### 仕組み

このサービスは以下のように動作します：

1. 画面/デバイスのスクリーンショットを作成します。（必要に応じて、特定の領域を指定するために要素や矩形オブジェクトをhaystackとして提供できます。各コマンドのドキュメントを参照してください。）
1. スクリーンショットを高コントラストの白黒画像に変換してOCRのために最適化します（高コントラストは多くの画像背景ノイズを防ぐために必要です。これはコマンドごとにカスタマイズ可能です。）
1. [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) の [光学式文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition) を使用して、画面からすべてのテキストを取得し、画像上で見つかったすべてのテキストをハイライトします。[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)から確認できる複数の言語をサポートしています。
1. [Fuse.js](https://fusejs.io/) のファジーロジックを使用して、与えられたパターンに対して _ほぼ等しい_ 文字列を見つけます（正確に一致するのではなく）。例えば、検索値 `Username` は `Usename` も見つけることができ、またその逆も可能です。
1. ターミナルから画像を検証してテキストを取得するためのCLIウィザード（`npx ocr-service`）を提供します

ステップ1、2、3の例は次の画像で確認できます

![処理ステップ](/img/ocr/processing-steps.jpg)

このサービスは（WebdriverIOが使用するもの以外の）システム依存関係が**まったく不要**ですが、必要に応じて[Tesseract](https://tesseract-ocr.github.io/tessdoc/)のローカルインストールと連携することもでき、その場合は実行時間が大幅に短縮されます！（テストの高速化については[テスト実行の最適化](#test-execution-optimization)も参照してください。）

興味をお持ちですか？[使い始める](./getting-started)ガイドに従って、今すぐ使い始めましょう。

:::caution 重要
Tesseractから良質な出力が得られない理由はさまざまです。アプリとこのモジュールに関連する最大の理由の1つは、検出するテキストと背景の間に適切な色の区別がない可能性があることです。例えば、暗い背景上の白いテキストは_簡単に_検出できますが、白い背景上の明るいテキストや暗い背景上の暗いテキストはほとんど検出できません。

詳細はTesseractの[このページ](https://tesseract-ocr.github.io/tessdoc/ImproveQuality)も参照してください。

また、[FAQ](./ocr-faq)も忘れずにお読みください。
:::