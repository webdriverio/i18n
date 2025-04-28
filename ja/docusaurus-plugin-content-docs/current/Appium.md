---
id: appium
title: Appiumのセットアップ
---

WebdriverIOを使用すると、ブラウザ内のWebアプリケーションだけでなく、以下のようなプラットフォームもテストできます：

- 📱 iOS、Android、Tizen上のモバイルアプリケーション
- 🖥️ macOSやWindows上のデスクトップアプリケーション
- 📺 Roku、tvOS、Android TV、Samsungなどのテレビアプリ

これらのタイプのテストを容易にするために、[Appium](https://appium.io/)の使用をお勧めします。Appiumの概要については、[公式ドキュメントページ](https://appium.io/docs/en/2.0/intro/)で確認できます。

適切な環境のセットアップは簡単ではありません。幸いなことに、Appiumのエコシステムには、これを助けるための優れたツールがあります。上記の環境のいずれかをセットアップするには、次のコマンドを実行してください：

```sh
$ npx appium-installer
```

これにより、セットアッププロセスをガイドする[appium-installer](https://github.com/AppiumTestDistribution/appium-installer)ツールキットが起動します。