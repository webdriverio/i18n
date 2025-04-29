---
id: wdio-electron-service
title: Electron サービス
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service は第三者パッケージです。詳細については [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service) をご覧ください。

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**Electron アプリケーションをテストするための WebdriverIO サービス**

WebdriverIO のエコシステムを活用して、クロスプラットフォームでの Electron アプリの E2E テストを可能にします。

[Spectron](https://github.com/electron-userland/spectron) の精神的後継 ([終了](https://github.com/electron-userland/spectron/issues/1045))。

### 特徴

以下の機能により、Electron アプリケーションのテストがより簡単になります：

- 🚗 必要な Chromedriver の自動セットアップ（Electron v26 以上）
- 📦 Electron アプリケーションのパスの自動検出
  - [Electron Forge](https://www.electronforge.io/)、[Electron Builder](https://www.electron.build/) および未パッケージ化されたアプリをサポート
- 🧩 テスト内で Electron API にアクセス
- 🕵️ Vitest のような API による Electron API のモック

## インストール

`WebdriverIO` をインストールする必要があります。手順は[こちら](https://webdriver.io/docs/gettingstarted)にあります。

## クイックスタート

すぐに始めるための推奨方法は、[WDIO 設定ウィザード](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup)を使用することです。

### 手動クイックスタート

設定ウィザードを使用せずに開始するには、サービスと `@wdio/cli` をインストールする必要があります：

```bash
npm install --dev @wdio/cli wdio-electron-service
```

または、お好みのパッケージマネージャー（pnpm、yarn など）を使用してください。

次に、WDIO 設定ファイルを作成します。参考になる例が必要な場合は、このリポジトリの[サンプルディレクトリ](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts)や[WDIO 設定リファレンスページ](https://webdriver.io/docs/configuration)に動作する設定があります。

サービス配列に `electron` を追加し、Electron の capability を設定する必要があります：

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

最後に、設定ファイルを使用して[テストを実行](https://webdriver.io/docs/gettingstarted#run-test)します。

これにより、WDIO が Chrome や Firefox などのブラウザを扱うのと同じ方法で、アプリのインスタンスが起動されます。このサービスは、アプリの複数のインスタンスやアプリと Web ブラウザの異なる組み合わせを同時に実行する必要がある場合に、[WDIO (並列) マルチリモート](https://webdriver.io/docs/multiremote)と連携して動作します。

アプリのパッケージ化に [Electron Forge](https://www.electronforge.io/) または [Electron Builder](https://www.electron.build/) を使用している場合、サービスは自動的にバンドルされた Electron アプリケーションへのパスを見つけようとします。カスタムサービス機能を通じてバイナリへのカスタムパスを提供できます：

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

Electron がサポートする各オペレーティングシステムの `appBinaryPath` の値を見つける方法については、[設定ドキュメント](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath)を参照してください。

または、`main.js` スクリプトへのパスを提供することで、未パッケージ化されたアプリをサービスに指定することもできます。Electron は `node_modules` にインストールされている必要があります。未パッケージ化されたアプリは、Rollup、Parcel、Webpack などのバンドラーを使用してバンドルすることをお勧めします。

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Chromedriver の設定

**アプリが v26 より低いバージョンの Electron を使用している場合は、[手動で Chromedriver を設定](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed)する必要があります。**

これは、WDIO が Chrome for Testing を使用して Chromedriver をダウンロードするため、v115 以降の Chromedriver バージョンのみが提供されるためです。

## ドキュメント

**[サービス設定](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Chromedriver 設定](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Electron API へのアクセス](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Electron API のモック](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[ウィンドウ管理](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[スタンドアロンモード](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[開発](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[一般的な問題とデバッグ](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## 開発

貢献に興味がある場合は、[開発ドキュメント](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)をお読みください。

## 統合例

WebdriverIO をサンプルアプリケーションに統合する方法を示す [Electron ボイラープレート](https://github.com/webdriverio/electron-boilerplate) プロジェクトをご覧ください。また、このリポジトリの [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) および [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) ディレクトリもご覧いただけます。

## サポート

サービスを使用して WDIO を実行する際に問題が発生した場合は、まず[一般的な問題](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md)をご確認ください。その後、[WDIO メインフォーラム](https://github.com/webdriverio/webdriverio/discussions)でディスカッションを開始してください。

Electron サービスのディスカッションフォーラムは WDIO のものほどアクティブではありませんが、Electron またはサービスの使用に特有の問題が発生している場合は、[こちら](https://github.com/webdriverio-community/wdio-electron-service/discussions)でディスカッションを開始できます。