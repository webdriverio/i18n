---
id: cli-wizard
title: CLI ウィザード
description: "OCR CLI ウィザードを使用して、テストを実行せずに OCR サービスが画像内でどのテキストを検出できるかを確認します。"
---

OCR CLI ウィザードを使用すると、テストを実行せずに画像内でどのテキストが検出できるかを検証できます。必要なものは以下のとおりです。

-   `@wdio/ocr-service` を依存関係としてインストールしていること。[はじめに](./getting-started)を参照してください
-   処理したい画像

次に、以下のコマンドを実行してウィザードを起動します

```sh
npx ocr-service
```

これにより、画像の選択、haystack の使用、および高度なモードの使用といった手順を案内するウィザードが起動します。以下の質問が表示されます

## How would you like to specify the file?

以下のオプションを選択できます

-   Use a "file explorer"
-   Type the file path manually

### Use a "file explorer"

CLI ウィザードには、「ファイルエクスプローラー」を使用してシステム上のファイルを検索するオプションがあります。コマンドを実行したフォルダーから開始されます。画像を選択すると（矢印キーと ENTER キーを使用します）、次の質問に進みます

### Type the file path manually

ローカルマシン上のどこかにあるファイルへの直接パスです

### Would you like to use a haystack?

ここでは、処理が必要な領域を選択するオプションがあります。これにより処理を高速化したり、OCR エンジンが検出する可能性のあるテキストの量を減らしたり絞り込んだりできます。以下の質問に基づいて `x`、`y`、`width`、`height` のデータを入力する必要があります:

-   Enter the x coordinate:
-   Enter the y coordinate:
-   Enter the width:
-   Enter the height:

## Do you want to use the advanced mode?

高度なモードには、次のような追加機能があります:

-   コントラストの設定
-   今後さらに追加予定

## デモ

デモはこちらです

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>