---
id: vscode-extensions
title: VS Code 拡張機能のテスト
description: "WebdriverIO と VS Code サービスを使用して、デスクトップ IDE またはウェブ拡張機能として VS Code 拡張機能をエンドツーエンドでテストします。"
---

WebdriverIO を使用すると、[VS Code](https://code.visualstudio.com/) 拡張機能を VS Code デスクトップ IDE またはウェブ拡張機能として、エンドツーエンドでシームレスにテストできます。拡張機能へのパスを指定するだけで、残りはフレームワークが処理します。[`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) を使用すると、以下のようなことがすべて処理されます：

- 🏗️ VSCode のインストール（stable、insiders、または指定したバージョン）
- ⬇️ 指定した VSCode バージョンに対応する Chromedriver のダウンロード
- 🚀 テストから VSCode API へのアクセスが可能
- 🖥️ カスタムユーザー設定での VSCode の起動（Ubuntu、MacOS、Windows 上の VSCode をサポート）
- 🌐 またはウェブ拡張機能のテストのために、任意のブラウザからアクセスできるようサーバーから VSCode を提供
- 📔 VSCode のバージョンに合ったロケーターを持つページオブジェクトのブートストラップ

## はじめに

新しい WebdriverIO プロジェクトを開始するには、次のコマンドを実行します：

```sh
npm create wdio@latest ./
```

インストールウィザードがプロセスを案内します。どのような種類のテストを行いたいか尋ねられたら、必ず _"VS Code Extension Testing"_ を選択してください。その後はデフォルトのままにするか、好みに応じて変更してください。

## 設定例

このサービスを使用するには、サービスのリストに `vscode` を追加し、必要に応じて設定オブジェクトを続けて指定します。これにより、WebdriverIO は指定された VSCode バイナリと適切な Chromedriver バージョンをダウンロードします：

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * optionally you can define the path WebdriverIO stores all
     * VSCode and Chromedriver binaries, e.g.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

`vscode` 以外の `browserName`（例：`chrome`）で `wdio:vscodeOptions` を定義すると、サービスは拡張機能をウェブ拡張機能として提供します。Chrome でテストする場合、追加のドライバーサービスは必要ありません。例：

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_注意:_ ウェブ拡張機能をテストする場合、`browserVersion` として選択できるのは `stable` または `insiders` のみです。

### TypeScript のセットアップ

`tsconfig.json` で、types のリストに `wdio-vscode-service` を必ず追加してください：

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## 使用方法

その後、`getWorkbench` メソッドを使用して、目的の VSCode バージョンに合ったロケーターを持つページオブジェクトにアクセスできます：

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

そこから、適切なページオブジェクトメソッドを使用してすべてのページオブジェクトにアクセスできます。利用可能なすべてのページオブジェクトとそのメソッドの詳細については、[ページオブジェクトのドキュメント](https://webdriverio-community.github.io/wdio-vscode-service/)を参照してください。

### VSCode API へのアクセス

[VSCode API](https://code.visualstudio.com/api/references/vscode-api) を通じて特定の自動化を実行したい場合は、カスタムの `executeWorkbench` コマンドでリモートコマンドを実行することで可能です。このコマンドを使用すると、テストから VSCode 環境内でコードをリモート実行でき、VSCode API にアクセスできます。関数には任意のパラメーターを渡すことができ、それらは関数内に伝播されます。`vscode` オブジェクトは常に最初の引数として渡され、その後に外側の関数のパラメーターが続きます。コールバックはリモートで実行されるため、関数スコープ外の変数にはアクセスできないことに注意してください。以下に例を示します：

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // 出力: "I am an API call!"
```

ページオブジェクトの完全なドキュメントについては、[ドキュメント](https://webdriverio-community.github.io/wdio-vscode-service/modules.html)を確認してください。さまざまな使用例は、この[プロジェクトのテストスイート](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs)で見つけることができます。

## 詳細情報

[`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) の設定方法やカスタムページオブジェクトの作成方法については、[サービスのドキュメント](/docs/wdio-vscode-service)で詳しく学ぶことができます。また、[Christian Bromann](https://twitter.com/bromann) による講演 [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU) もご覧いただけます：

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>