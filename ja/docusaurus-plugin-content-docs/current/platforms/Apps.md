---
id: apps-and-extensions
title: 拡張機能とエディター
description: ブラウザー拡張機能や VS Code 拡張機能を WebdriverIO セッションに読み込み、エンドツーエンドでテストします。
---

WebdriverIO は、ブラウザー拡張機能やエディター拡張機能を実際のホストアプリケーションに読み込んでテストします。ブラウザー（Web）拡張機能は Chrome または Firefox 内で動作します。拡張機能はブラウザーの capabilities を通じて読み込みます。Chrome では `goog:chromeOptions` 経由で `--load-extension` または base64 エンコードされた `.crx` を使用し、Firefox では `.xpi` に対して `browser.installAddOn()` を使用します。WebDriver BiDi セッションでは、`browser.installExtension()` と `browser.uninstallExtension()` を使ってセッション中に拡張機能をインストールおよび削除することもできます。Safari には BiDi セッションがないため、このコマンドは Safari には対応していません。あとは通常の WebDriver コマンドを使って、コンテンツスクリプトやポップアップページをテストできます。VS Code 拡張機能は、コミュニティ製の [`wdio-vscode-service`](/docs/wdio-vscode-service) を使ってテストします。このサービスは VS Code（stable、insiders、または特定のバージョン）と対応する Chromedriver をダウンロードし、拡張機能とカスタムユーザー設定を適用した状態で VS Code を起動します。ワークベンチ用のページオブジェクトは `browser.getWorkbench()` で利用でき、`browser.executeWorkbench()` を使うと VS Code API に対してコードを実行できます。同じサービスで VS Code をブラウザー上で提供し、Web 拡張機能をテストすることもできます。Obsidian プラグイン向けのコミュニティサービスもあります。

## クイックスタート

まず、テストランナーと TypeScript サポートをインストールします：

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### Chrome 拡張機能

拡張機能をフォルダー（ここでは `./dist`）にビルドし、Chrome の引数 `--load-extension` で読み込みます：

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // コンテンツスクリプトがページに追加する要素に置き換えてください
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

ツールバーの拡張機能アイコンをクリックする操作は機能しません。`default_popup` をテストするには、`chrome://extensions/` で拡張機能 ID を確認し、`browser.url()` で `chrome-extension://<id>/<popup>.html` を開きます。[Web 拡張機能ガイド](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome)には、このためのすぐに使える `openExtensionPopup` カスタムコマンドが用意されています。

### VS Code 拡張機能

```sh
npm install --save-dev wdio-vscode-service
```

`tsconfig.json` の `types` 配列に `"wdio-vscode-service"` を追加します。

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // "insiders" や特定のバージョン（例: "1.80.0"）も指定可能
        'wdio:vscodeOptions': {
            // 拡張機能の package.json があるディレクトリを指定
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

拡張機能を VS Code Web 拡張機能としてテストするには、`wdio:vscodeOptions` はそのままにして `browserName: 'chrome'` を設定します。このモードでは、`browserVersion` には `stable` または `insiders` のみ指定できます。`npm create wdio@latest ./` で「VS Code Extension Testing」を選択すると、この構成が自動的に生成されます。

## 目的に合わせて選ぶ

- [Web 拡張機能のテスト](/docs/extension-testing/web-extensions)：Chrome（フォルダーまたは `.crx`）や Firefox（[`installAddOn`](/docs/api/gecko#installaddon) による `.xpi`）で拡張機能を読み込む方法、または [`installExtension`](/docs/api/browser/installExtension) を使ってセッション中にインストール・削除する方法。Safari Web 拡張機能は対象外です。
- [Firefox Profile Service](/docs/firefox-profile-service)：拡張機能を含む Firefox プロファイルを構築します。
- [VS Code 拡張機能のテスト](/docs/extension-testing/vscode-extensions)：設定、TypeScript のセットアップ、ワークベンチのページオブジェクト、`executeWorkbench`。
- [VS Code Service](/docs/wdio-vscode-service)：`cachePath` などのすべてのサービスオプションと、カスタムページオブジェクトの書き方。
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service)：Windows、macOS、Linux、Android 上で、複数の Obsidian バージョンにわたって Obsidian プラグインをテストするコミュニティサービス。
- [カスタムコマンド](/docs/customcommands)：`openExtensionPopup` のようなヘルパーをパッケージ化して再利用できます。

Web 拡張機能のテストは通常の Chrome または Firefox セッションで実行されるため、セレクター、ネットワークモック、ビジュアルテストなど、[Web ブラウザー](/docs/platforms/web)の内容がすべて適用されます。

## トラブルシューティング

- 署名の問題で Firefox がローカルでビルドした拡張機能を拒否する場合：プロファイル経由ではなく、`before` フックで `browser.installAddOn(extension.toString('base64'), true)` を使ってインストールしてください。`.xpi` は `npx web-ext build` でビルドします。
- Chrome の代わりに Edge、Brave、Opera を使用する場合：通常は、そのブラウザーのオプション capability（例：`ms:edgeOptions`）で同じ引数が使えます。
- VS Code と Chromedriver のバイナリはキャッシュディレクトリにダウンロードされます。保存場所を制御する（例：CI でキャッシュする）には、`services: [['vscode', { cachePath: __dirname }]]` を設定します。
- TypeScript が `getWorkbench` や `executeWorkbench` を見つけられない場合：`compilerOptions.types` に `wdio-vscode-service` を追加してください。

## 次のステップ

- `wdio.conf.ts` のすべてのオプションについては [Configuration](/docs/configuration) リファレンスを参照してください。
- Chromium ベースで構築されたデスクトップアプリ全体のテストについては [Electron](/docs/desktop-testing/electron) を参照してください。
- その他のプラットフォーム：[Web ブラウザー](/docs/platforms/web)、[モバイルアプリ](/docs/platforms/mobile)、[デスクトップアプリ](/docs/platforms/desktop)。