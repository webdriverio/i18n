---
id: faq
title: よくある質問
description: "ベースラインの更新、Canvasのインストールエラーの修正、v10へのアップグレードなど、ビジュアルテストに関するよくある質問への回答をご覧ください。"
---

### `check(Screen/Element/FullPageScreen)` を実行したい場合、`save(Screen/Element/FullPageScreen)` メソッドを使用する必要がありますか？

いいえ、その必要はありません。`check(Screen/Element/FullPageScreen)` が自動的に行います。

### ビジュアルテストが差分ありで失敗します。ベースラインを更新するにはどうすればよいですか？

コマンドラインで引数 `--update-visual-baseline` を追加することで、ベースライン画像を更新できます。これにより、以下が行われます。

-   実際に取得したスクリーンショットを自動的にコピーし、ベースラインフォルダに配置します
-   差分がある場合でも、ベースラインが更新されたためテストは合格となります

**使用方法:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

ログを info/debug モードで実行すると、以下のログが追加されていることが確認できます。

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Width and height cannot be negative

`Width and height cannot be negative` というエラーがスローされることがあります。10回中9回は、ビュー内にない要素の画像を作成しようとしたことが原因です。要素の画像を作成する前に、必ずその要素がビュー内にあることを確認してください。

### Windows で Canvas のインストールが Node-Gyp のログとともに失敗する

Node-Gyp のエラーにより Windows で Canvas のインストールに問題が発生した場合、これはバージョン4以前にのみ該当することに注意してください。これらの問題を回避するには、これらの依存関係を持たないバージョン5以降へのアップデートを検討してください。バージョン5から9では画像処理に [Jimp](https://github.com/jimp-dev/jimp) を使用していました。バージョン10以降では、ネイティブ依存関係のない [fast-png](https://github.com/image-js/fast-png) と [Pixelmatch](https://github.com/mapbox/pixelmatch) を使用しています。

それでもバージョン4で問題を解決する必要がある場合は、以下を確認してください。

-   [Getting Started](/docs/visual-testing#system-requirements) ガイドの Node Canvas セクション
-   Windows での Node-Gyp の問題の修正については [こちらの記事](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/)（[IgorSasovets](https://github.com/IgorSasovets) に感謝します）

### v10 にアップグレードしたところ、ビジュアルテストが失敗するのはなぜですか？

v10 では、比較エンジンが ResembleJS から [Pixelmatch](https://github.com/mapbox/pixelmatch) に変更されました。Pixelmatch は生の RGB ではなく知覚的な（YIQ）カラーモデルを使用するため、不一致率が v9 とは異なります。テストが壊れたわけではなく、ベースラインを一度再生成する必要があるだけです。新しい値を受け入れるには `--update-visual-baseline` を付けてテストを実行するか、ベースラインフォルダを削除して `autoSaveBaseline` に再作成させてください。