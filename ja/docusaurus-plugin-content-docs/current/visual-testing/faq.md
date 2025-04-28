---
id: faq
title: よくある質問
---

### `check(Screen/Element/FullPageScreen)`を実行する際に`save(Screen/Element/FullPageScreen)`メソッドを使用する必要がありますか？

いいえ、必要ありません。`check(Screen/Element/FullPageScreen)`が自動的にこれを行います。

### ビジュアルテストが差異で失敗した場合、ベースラインを更新するにはどうすればよいですか？

コマンドラインに引数`--update-visual-baseline`を追加することで、ベースライン画像を更新できます。これにより

- 実際に撮影したスクリーンショットが自動的にコピーされ、ベースラインフォルダに配置されます
- 差異がある場合でも、ベースラインが更新されたためテストは合格します

**使用法：**

```sh
npm run test.local.desktop  --update-visual-baseline
```

ログをinfo/debugモードで実行すると、以下のようなログが追加されます

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### 幅と高さがマイナスになることはできません

「Width and height cannot be negative」（幅と高さがマイナスになることはできません）というエラーが発生することがあります。10回中9回は、ビュー内にない要素の画像を作成しようとしていることに関連しています。要素の画像を作成する前に、必ず要素がビュー内にあることを確認してください。

### WindowsでのCanvasのインストールがNode-Gypログでエラーになる

WindowsでNode-Gypエラーによりcanvasのインストールに問題が発生した場合、これはバージョン4以下にのみ適用されることに注意してください。これらの問題を避けるには、これらの依存関係がなく、画像処理に[Jimp](https://github.com/jimp-dev/jimp)を使用するバージョン5以降に更新することを検討してください。

バージョン4での問題を解決する必要がある場合は、以下を確認してください：

- [はじめに](/docs/visual-testing#system-requirements)ガイドのNode Canvasセクション
- Windows上でのNode-Gyp問題を修正するための[この投稿](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/)（[IgorSasovets](https://github.com/IgorSasovets)に感謝します）