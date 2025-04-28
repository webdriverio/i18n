---
id: ocr-testing
title: OCRテスト
---

モバイルネイティブアプリやデスクトップサイトでの自動テストは、一意の識別子がない要素を扱う場合に特に難しい場合があります。標準的な[WebdriverIOセレクタ](https://webdriver.io/docs/selectors)が常に役立つとは限りません。そこで登場するのが`@wdio/ocr-service`です。これはOCR（[光学式文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition)）を活用して、画面上の要素を**表示されているテキスト**に基づいて検索、待機、操作できる強力なサービスです。

以下のカスタムコマンドが提供され、`browser/driver`オブジェクトに追加されるため、作業に必要な適切なツールセットが得られます。

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### 仕組み

このサービスは次のように動作します：

1. 画面/デバイスのスクリーンショットを作成します。（必要に応じて、特定の領域を指定するために要素や矩形オブジェクトをhaystackとして提供できます。各コマンドのドキュメントを参照してください。）
1. OCRのために結果を最適化し、スクリーンショットを高コントラストの白黒画像に変換します（高コントラストは画像の背景ノイズを減らすために必要です。これはコマンドごとにカスタマイズ可能です。）
1. [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract)の[光学式文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition)を使用して画面からすべてのテキストを取得し、画像上で見つかったすべてのテキストをハイライトします。[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)で見つけることができる複数の言語をサポートしています。
1. [Fuse.js](https://fusejs.io/)のファジー論理を使用して、指定されたパターンに_おおよそ等しい_文字列（正確に一致するのではなく）を見つけます。これは例えば、検索値`Username`が`Usename`というテキストも見つけることができることを意味します（またはその逆も）。
1. CLIウィザード（`npx ocr-service`）を提供して、ターミナルを通じて画像を検証し、テキストを取得します。

ステップ1、2、3の例はこの画像で確認できます

![Process steps](/img/ocr/processing-steps.jpg)

WebdriverIOが使用するもの以外に**システム依存関係がゼロ**で動作しますが、必要に応じて[Tesseract](https://tesseract-ocr.github.io/tessdoc/)のローカルインストールと連携することもでき、実行時間を大幅に短縮できます！（テストの実行を高速化する方法については[テスト実行の最適化](#test-execution-optimization)も参照してください。）

興味を持ちましたか？[使い始める](./getting-started)ガイドに従って今すぐ使い始めましょう。

:::caution 重要
Tesseractから良質な出力が得られない理由はさまざまあります。アプリとこのモジュールに関連する最大の理由の1つは、見つける必要があるテキストと背景の間に適切な色の区別がないことかもしれません。例えば、暗い背景上の白いテキストは_簡単に_見つけることができますが、白い背景上の薄いテキストや暗い背景上の暗いテキストはほとんど見つけることができません。

詳細については、Tesseractの[このページ](https://tesseract-ocr.github.io/tessdoc/ImproveQuality)も参照してください。

また、[FAQ](./ocr-faq)を読むことも忘れないでください。
:::