---
id: introduction
title: はじめに
description: "WebdriverIO、Appium、Appium Flutter Driver を使用した、Android および iOS 上の Flutter アプリのエンドツーエンドテストの概要を紹介します。"
---

このガイドでは、**WebdriverIO** と **Appium** を使用して **Flutter** アプリケーションのエンドツーエンド（E2E）テストを設定、構成、実行する方法について説明します。

WebdriverIO は、WebDriver および Appium プロトコルをネイティブにサポートする Node.js ベースのテストフレームワークを提供しており、Android と iOS の両方で Flutter アプリケーションを自動化できます。

---

### アーキテクチャ上の課題：Flutter が異なる理由

標準的なネイティブモバイルアプリ（Android の Kotlin/Java や iOS の Swift/Objective-C）を自動化する場合、Appium ドライバー（Android の場合は `UiAutomator2`、iOS の場合は `XCUITest`）は、オペレーティングシステムのネイティブなアクセシビリティツリーを照会することで、アプリケーションの検査や操作を行うためのアクセスポイントとして機能します。これらのドライバーは OS レベルの UI コンポーネント（ボタン、入力欄、ラベル）を読み取り、ID、Accessibility ID、XPath などの標準的なロケーター戦略を使用して、検査ツールやテストスクリプトに公開します。

Flutter は異なる仕組みで動作します：

Flutter はオペレーティングシステムのネイティブ UI コンポーネントを使用しません。代わりに、内部でホストされたグラフィックエンジンによって描画されるキャンバス上に UI を直接レンダリングします。フレームワークは独自のウィジェットをピクセル単位で描画します。

#### 従来の自動化への影響
標準的なネイティブドライバーやインスペクターから見ると、Flutter アプリは多くの場合、単一のグラフィックサーフェスとして認識されます。内部のウィジェット（ボタンやテキストフィールドなど）は、デフォルトでは OS のアクセシビリティツリーに存在しません。その結果、標準的なネイティブのロケーター戦略では、Flutter の内部ウィジェットを直接操作することができません。

---

### WebdriverIO と Appium による Flutter の扱い方

WebdriverIO と Appium は、Flutter の内部ウィジェットツリーを操作するために必要なツールを提供していますが、プロジェクトに適切なドライバーとロケーター拡張機能をインストールして設定する必要があります。

[Appium Flutter Driver](https://github.com/appium/appium-flutter-driver) を使用すると、Appium は Flutter のテスト拡張機能（`flutter_driver`）に接続します。これにより、以下のような Flutter 固有のロケーター戦略（Finder）を利用できるようになります：

* `byValueKey`：Flutter コード内で明示的に指定された `Key` によってウィジェットを特定します。
* `byText`：表示されているテキストコンテンツによってウィジェットを特定します。
* `byTooltip`：ツールチップのテキストによってウィジェットを特定します。

以降のセクションでは、前提条件、環境のセットアップ、そして最初のテストスイートの作成について順を追って説明します。