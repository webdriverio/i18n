---
id: appium
title: Appium セットアップ
---

WebdriverIOを使用すると、ブラウザ内のWebアプリケーションだけでなく、以下のような他のプラットフォームもテストできます:

- 📱 iOS、Android、Tizen上のモバイルアプリケーション
- 🖥️ macOSやWindows上のデスクトップアプリケーション
- 📺 Roku、tvOS、Android TV、Samsungなどのテレビアプリ

これらのタイプのテストを容易にするために[Appium](https://appium.io/)の使用をお勧めします。Appiumの概要は[公式ドキュメントページ](https://appium.io/docs/en/latest/intro/)で確認できます。

適切な環境を設定することは単純ではありません。幸いなことに、Appiumのエコシステムにはこれを支援する優れたツールがあります。上記の環境のいずれかを設定するには、次のコマンドを実行するだけです:

```sh
$ npx appium-installer
```

これにより、[appium-installer](https://github.com/AppiumTestDistribution/appium-installer)ツールキットが起動し、セットアッププロセスをガイドしてくれます。