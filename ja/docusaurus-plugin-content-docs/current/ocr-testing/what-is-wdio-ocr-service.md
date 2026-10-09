---
id: ocr-testing
title: OCR テスト
description: "通常のセレクターでは対応できない場合に、OCR サービスを使用して Web アプリやモバイルアプリ上の要素を表示テキストで特定し、操作します。"
---

モバイルネイティブアプリやデスクトップサイトでの自動テストは、一意の識別子を持たない要素を扱う場合に特に困難になることがあります。標準の [WebdriverIO セレクター](https://webdriver.io/docs/selectors)が常に役立つとは限りません。そこで登場するのが `@wdio/ocr-service` です。これは OCR（[光学文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition)）を活用し、**表示テキスト**に基づいて画面上の要素を検索、待機、操作できる強力なサービスです。

以下のカスタムコマンドが提供され、`browser/driver` オブジェクトに追加されるため、作業に適したツールセットを利用できます。

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### 仕組み

このサービスは以下を行います。

1. 画面/デバイスのスクリーンショットを作成します。（必要に応じて、特定の領域を指定するために、要素または矩形オブジェクトである haystack を指定できます。各コマンドのドキュメントを参照してください。）
1. スクリーンショットを高コントラストの白黒画像に変換し、OCR 向けに結果を最適化します（高コントラストは、画像の背景ノイズを大幅に抑えるために必要です。これはコマンドごとにカスタマイズできます）。
1. [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) の[光学文字認識](https://en.wikipedia.org/wiki/Optical_character_recognition)を使用して画面からすべてのテキストを取得し、見つかったすべてのテキストを画像上でハイライトします。複数の言語をサポートしており、対応言語は[こちら](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)で確認できます。
1. [Fuse.js](https://fusejs.io/) のファジーロジックを使用して、指定されたパターンと（完全一致ではなく）_ほぼ一致する_文字列を検索します。つまり、例えば検索値 `Username` で `Usename` というテキストも見つけることができ、その逆も可能です。
1. 画像を検証し、ターミナルからテキストを取得するための CLI ウィザード（`npx ocr-service`）を提供します。

ステップ 1、2、3 の例は以下の画像で確認できます。

![Process steps](/img/ocr/processing-steps.jpg)

このサービスは（WebdriverIO が使用するもの以外に）システム依存関係が**ゼロ**で動作しますが、必要に応じてローカルにインストールした [Tesseract](https://tesseract-ocr.github.io/tessdoc/) と連携させることもでき、実行時間を大幅に短縮できます！（テストを高速化する方法については、[テスト実行の最適化](#test-execution-optimization)も参照してください。）

興味が湧きましたか？[はじめに](./getting-started)ガイドに従って、今すぐ使い始めましょう。

:::caution 重要
Tesseract から良質な出力が得られない理由はさまざまです。アプリとこのモジュールに関連する最大の理由の 1 つは、検出対象のテキストと背景の間に適切な色の区別がないことです。例えば、暗い背景上の白いテキストは_簡単に_検出できますが、白い背景上の明るいテキストや、暗い背景上の暗いテキストはほとんど検出できません。

Tesseract による詳細情報については、[こちらのページ](https://tesseract-ocr.github.io/tessdoc/ImproveQuality)も参照してください。

また、[FAQ](./ocr-faq) もぜひお読みください。
:::