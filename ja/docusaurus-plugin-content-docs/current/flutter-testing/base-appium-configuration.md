---
id: base-appium-configuration
title: Appium の基本設定
description: "Appium サービスと Flutter finder パッケージをインストールし、WebdriverIO で Flutter アプリをテストするための Appium の基本設定を行います。"
---

WebdriverIO は Appium を使用して、モバイルエミュレーター、シミュレーター、実機でテストを実行します。`@wdio/appium-service` は、テスト実行中の Appium サーバーのライフサイクルを自動的に管理します。

Appium の一般的なセットアップと capability のオプションについては、[Appium Service ドキュメント](https://webdriver.io/docs/appium-service/)を参照してください。

## 依存関係のインストール

Flutter アプリケーションをテストするには、Appium サービスと Flutter finder パッケージをインストールします:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Appium Flutter Driver のインストール

Appium Flutter Driver（`appium-flutter-driver`）は、次の 2 つの方法のいずれかでインストールできます:

#### オプション 1: 開発依存関係として追加（CI/CD に推奨）

ドライバーを `devDependencies` に直接追加すると、追加のセットアップ手順なしで、すべてのチームメンバーと CI/CD パイプラインにドライバーが自動的にインストールされます:

```bash
npm install --save-dev appium-flutter-driver
```

> 必要なすべてのパッケージを 1 つのコマンドでまとめてインストールすることもできます:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### オプション 2: Appium CLI 経由（ローカルセットアップ）

または、Appium CLI を使用して、ローカルの Appium 環境にドライバーをインストールすることもできます:

```bash
npx appium driver install flutter
```

### パッケージの概要

これらのパッケージは以下を提供します:
- **`@wdio/appium-service` & `appium`**: テスト実行中に Appium サーバーを起動・管理します。
- **`appium-flutter-driver`**: Flutter のテスト拡張機能との通信を担う Appium ドライバーです。
- **`appium-flutter-finder`**: Flutter 固有のロケーター戦略（`byValueKey`、`byText`、`byTooltip`）を提供するヘルパーライブラリです。