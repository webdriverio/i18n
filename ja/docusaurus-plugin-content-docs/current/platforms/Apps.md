---
id: apps-and-extensions
title: 拡張機能とエディター
description: ブラウザ拡張機能やVS Code拡張機能をWebdriverIOセッションに読み込み、エンドツーエンドでテストします。
---

WebdriverIOは、ブラウザ拡張機能やエディター拡張機能を実際のホストアプリケーションに読み込んでテストします。ブラウザ（Web）拡張機能はChromeまたはFirefox内で動作します。拡張機能はブラウザのcapabilitiesを通じて読み込みます。Chromeでは`--load-extension`または`goog:chromeOptions`経由のbase64エンコードされた`.crx`を、Firefoxでは`.xpi`に対して`browser.installAddOn()`を使用します。WebDriver BiDiセッションでは、`browser.installExtension()`と`browser.uninstallExtension()`を使ってセッションの途中で拡張機能をインストールおよび削除することもできます。SafariにはBiDiセッションがないため、このコマンドはSafariには対応していません。その後は、通常のWebDriverコマンドでコンテンツスクリプトやポップアップページをテストします。VS Code拡張機能は、コミュニティ製の[`wdio-vscode-service`](/docs/wdio-vscode-service)でテストします。このサービスはVS Code（stable、insiders、または特定のバージョン）と対応するChromedriverをダウンロードし、拡張機能とカスタムユーザー設定を適用した状態でVS Codeを起動します。ワークベンチ用のページオブジェクトは`browser.getWorkbench()`から利用でき、`browser.executeWorkbench()`はVS Code APIに対してコードを実行します。同じサービスでVS Codeをブラウザ上で提供し、Web拡張機能をテストすることもできます。Obsidianプラグイン向けにもコミュニティ製のサービスがあります。

## クイックスタート

まず、テストランナーとTypeScriptサポートをインストールします：

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

### Chrome拡張機能

拡張機能をフォルダー（ここでは`./dist`）にビルドし、Chromeの`--load-extension`引数で読み込みます：

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

ツールバーの拡張機能アイコンをクリックすることはできません。`default_popup`をテストするには、`chrome://extensions/`で拡張機能IDを確認し、`browser.url()`で`chrome-extension://<id>/<popup>.html`を開きます。[Web拡張機能ガイド](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome)には、このためのすぐに使える`openExtensionPopup`カスタムコマンドが用意されています。

### VS Code拡張機能

```sh
npm install --save-dev wdio-vscode-service
```

`tsconfig.json`の`types`配列に`"wdio-vscode-service"`を追加します。

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
            // 拡張機能のpackage.jsonがあるディレクトリを指定します
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

拡張機能をVS Code Web拡張機能としてテストするには、`browserName: 'chrome'`を設定し、`wdio:vscodeOptions`はそのまま残します。このモードでは、`browserVersion`には`stable`または`insiders`のみ指定できます。`npm create wdio@latest ./`で「VS Code Extension Testing」を選択すると、このセットアップが自動的に生成されます。

## 目的に応じたガイド

- [Web拡張機能のテスト](/docs/extension-testing/web-extensions)：Chrome（フォルダーまたは`.crx`）やFirefox（[`installAddOn`](/docs/api/gecko#installaddon)経由の`.xpi`）に拡張機能を読み込む方法、または[`installExtension`](/docs/api/browser/installExtension)でセッションの途中に拡張機能をインストール・削除する方法。Safari Web拡張機能は対象外です。
- [Firefox Profile Service](/docs/firefox-profile-service)：拡張機能を含むFirefoxプロファイルを作成します。
- [VS Code拡張機能のテスト](/docs/extension-testing/vscode-extensions)：設定、TypeScriptのセットアップ、ワークベンチのページオブジェクト、`executeWorkbench`について。
- [VS Code Service](/docs/wdio-vscode-service)：`cachePath`などのすべてのサービスオプションと、カスタムページオブジェクトの書き方。
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service)：Windows、macOS、Linux、Android上で、複数のObsidianバージョンにわたってObsidianプラグインをテストするコミュニティ製サービス。
- [カスタムコマンド](/docs/customcommands)：`openExtensionPopup`のようなヘルパーをパッケージ化して再利用できます。

Web拡張機能のテストは通常のChromeまたはFirefoxセッションで実行されるため、セレクター、ネットワークモック、ビジュアルテストなど、[Webブラウザ](/docs/platforms/web)に関する内容はすべて適用されます。

## トラブルシューティング

- Firefoxが署名の問題でローカルビルドした拡張機能を拒否する場合：プロファイル経由ではなく、`before`フックで`browser.installAddOn(extension.toString('base64'), true)`を使ってインストールしてください。`.xpi`は`npx web-ext build`でビルドします。
- Chromeの代わりにEdge、Brave、Operaを使用する場合：通常、同じ引数をそのブラウザのオプションcapability（例：`ms:edgeOptions`）で使用できます。
- VS CodeとChromedriverのバイナリはキャッシュディレクトリにダウンロードされます。保存先を制御するには（例：CIでキャッシュする場合）、`services: [['vscode', { cachePath: __dirname }]]`を設定してください。
- TypeScriptが`getWorkbench`や`executeWorkbench`を見つけられない場合：`compilerOptions.types`に`wdio-vscode-service`を追加してください。

## 次のステップ

- すべての`wdio.conf.ts`オプションについては[設定](/docs/configuration)リファレンスを参照してください。
- Chromiumベースのデスクトップアプリ全体をテストするには[Electron](/docs/desktop-testing/electron)を参照してください。
- その他のプラットフォーム：[Webブラウザ](/docs/platforms/web)、[モバイルアプリ](/docs/platforms/mobile)、[デスクトップアプリ](/docs/platforms/desktop)。