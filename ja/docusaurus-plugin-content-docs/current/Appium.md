---
id: appium
title: Appiumのセットアップ
description: "appium-installerツールキットを使用してAppiumとそのドライバーをセットアップし、WebdriverIOでネイティブモバイル、ハイブリッド、デスクトップアプリをテストします。"
---

WebdriverIOを使用すると、ブラウザ上のWebアプリケーションだけでなく、次のような他のプラットフォームもテストできます：

- 📱 iOS、Android、Tizen上のモバイルアプリケーション
- 🖥️ macOSまたはWindows上のデスクトップアプリケーション
- 📺 さらにRoku、tvOS、Android TV、Samsung向けのTVアプリ

このようなテストを円滑に行うために、[Appium](https://appium.io/)の使用をおすすめします。Appiumの概要については、[公式ドキュメントページ](https://appium.io/docs/en/latest/intro/)をご覧ください。

適切な環境のセットアップは簡単ではありません。幸いなことに、Appiumのエコシステムにはこれを支援する優れたツールが揃っています。上記のいずれかの環境をセットアップするには、次のコマンドを実行するだけです：

```sh
$ npx appium-installer
```

これにより、セットアッププロセスをガイドしてくれる[appium-installer](https://github.com/AppiumTestDistribution/appium-installer)ツールキットが起動します。