---
id: appium
title: Appium セットアップ
---

WebdriverIOを使用すると、ブラウザでのWebアプリケーションだけでなく、以下のようなプラットフォームもテストできます：

- 📱 iOS、Android、Tizenでのモバイルアプリケーション
- 🖥️ macOSやWindowsでのデスクトップアプリケーション
- 📺 Roku、tvOS、Android TV、Samsungなどのテレビアプリ

これらのタイプのテストを容易にするために、[Appium](https://appium.io/)の使用をお勧めします。Appiumの概要は[公式ドキュメントページ](https://appium.io/docs/en/2.0/intro/)で確認できます。

適切な環境を設定することは簡単ではありません。幸いなことに、Appiumのエコシステムにはこれを支援する優れたツールがあります。上記の環境のいずれかを設定するには、次のコマンドを実行してください：

```sh
$ npx appium-installer
```

これにより、セットアッププロセスをガイドする[appium-installer](https://github.com/AppiumTestDistribution/appium-installer)ツールキットが起動します。