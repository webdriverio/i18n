---
id: faq
title: よくある質問
description: "ベースラインの更新、canvas のインストールエラーの修正、v10 へのアップグレードなど、ビジュアルテストに関するよくある質問への回答をご覧ください。"
---

### `check(Screen/Element/FullPageScreen)` を実行したい場合、`save(Screen/Element/FullPageScreen)` メソッドを使用する必要がありますか？

いいえ、その必要はありません。`check(Screen/Element/FullPageScreen)` が自動的に行ってくれます。

### ビジュアルテストが差分で失敗します。ベースラインを更新するにはどうすればよいですか？

コマンドラインで引数 `--update-visual-baseline` を追加することで、ベースライン画像を更新できます。これにより、

-   実際に撮影されたスクリーンショットが自動的にコピーされ、ベースラインフォルダに配置されます
-   差分がある場合でも、ベースラインが更新されたためテストは成功します

**使用方法:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

ログを info/debug モードで実行すると、次のようなログが追加されます

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

`Width and height cannot be negative` というエラーがスローされることがあります。10 回中 9 回は、ビュー内にない要素の画像を作成しようとしたことが原因です。要素の画像を作成する前に、必ずその要素がビュー内にあることを確認してください。

### Windows で Canvas のインストールが Node-Gyp のログとともに失敗しました

Node-Gyp のエラーにより Windows で Canvas のインストールに問題が発生した場合、これはバージョン 4 以下にのみ該当することに注意してください。これらの問題を回避するには、これらの依存関係を持たないバージョン 5 以上へのアップデートを検討してください。バージョン 5 から 9 では画像処理に [Jimp](https://github.com/jimp-dev/jimp) を使用していました。バージョン 10 以降では、ネイティブ依存関係のない [fast-png](https://github.com/image-js/fast-png) と [Pixelmatch](https://github.com/mapbox/pixelmatch) を使用しています。

それでもバージョン 4 で問題を解決する必要がある場合は、以下を確認してください:

-   [はじめに](/docs/visual-testing#system-requirements)ガイドの Node Canvas セクション
-   Windows で Node-Gyp の問題を修正するための[こちらの記事](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/)（[IgorSasovets](https://github.com/IgorSasovets) に感謝します）

### v11 にアップグレードしたところ、不一致率が変わったのはなぜですか？

v11 では比較エンジンが pixelmatch 8 になり、色の差分を YIQ ではなく OKLab 色空間で HyAB 距離を用いて測定します。しきい値のスケール（`0` から `1`）と `ignore*` プリセットは変更されていませんが、同じ画像でも異なるピクセル数が若干変わることがあります（実際のスクリーンショットで約 −3 % から +3 %）。チェックが正確な不一致率や厳しい許容値に依存している場合は、再度確認し、新しい結果が正しい場合にのみ `--update-visual-baseline` でベースラインを更新してください。また、一部の修正によってベースラインが一度だけ変わることもあります。例えば、ビューポートより大きい要素の iOS 要素スクリーンショットでは、黒い領域が表示されなくなりました。[v11 移行ガイド](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md)を参照してください。

### v10 にアップグレードしたところ、ビジュアルテストが失敗するのはなぜですか？

v10 で比較エンジンが ResembleJS から [Pixelmatch](https://github.com/mapbox/pixelmatch) に変更されました。Pixelmatch は生の RGB ではなく知覚的な（YIQ）カラーモデルを使用するため、不一致率が v9 とは異なります。テストが壊れたわけではなく、ベースラインを一度再生成する必要があるだけです。`--update-visual-baseline` を付けてテストを実行して新しい値を受け入れるか、ベースラインフォルダを削除して `autoSaveBaseline` に再作成させてください。