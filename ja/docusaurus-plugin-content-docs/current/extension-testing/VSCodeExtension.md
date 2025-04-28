---
id: vscode-extensions
title: VS Codeエクステンションのテスト
---

WebdriverIOでは、[VS Code](https://code.visualstudio.com/)拡張機能をVS Codeデスクトップ IDEまたはウェブ拡張機能としてエンドツーエンドでシームレスにテストすることができます。拡張機能のパスを提供するだけで、フレームワークが残りの作業を行います。[`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service)を使用すれば、すべてが管理され、さらに以下のような機能が提供されます：

- 🏗️ VSCodeのインストール（安定版、インサイダー版、または指定したバージョン）
- ⬇️ 特定のVSCodeバージョンに対応するChromedriverのダウンロード
- 🚀 テストからVSCode APIにアクセスする機能
- 🖥️ カスタムユーザー設定でVSCodeを起動（Ubuntu、MacOS、Windowsでのサポートを含む）
- 🌐 またはウェブ拡張機能のテスト用にブラウザからアクセスできるようVSCodeをサーバーから提供
- 📔 VSCodeバージョンに合わせたロケーターを持つページオブジェクトのブートストラップ

## はじめに

新しいWebdriverIOプロジェクトを開始するには、次のコマンドを実行します：

```sh
npm create wdio@latest ./
```

インストールウィザードが手順を案内します。テストの種類を尋ねられたら、「VS Code Extension Testing」を選択し、その後はデフォルトのままにするか、好みに応じて変更してください。

## 設定例

このサービスを使用するには、サービスのリストに `vscode` を追加し、オプションで設定オブジェクトを指定します。これによりWebdriverIOは指定されたVSCodeバイナリと適切なChromedriverバージョンをダウンロードします：

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // 最新のVSCodeバージョンの場合は "insiders" または "stable"
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * オプションでWebdriverIOがすべてのVSCodeとChromedriverバイナリを
     * 保存するパスを定義できます。例：
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

`browserName` を `vscode` 以外のもの（例：`chrome`）に設定し、`wdio:vscodeOptions` を定義すると、サービスは拡張機能をウェブ拡張機能として提供します。Chromeでテストする場合、追加のドライバーサービスは必要ありません：

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

_注意:_ ウェブ拡張機能をテストする場合、`browserVersion` として `stable` または `insiders` のみ選択できます。

### TypeScriptの設定

`tsconfig.json` で、タイプのリストに `wdio-vscode-service` を追加してください：

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

`getWorkbench` メソッドを使用して、希望するVSCodeバージョンに対応するロケーターのページオブジェクトにアクセスできます：

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

そこから、適切なページオブジェクトメソッドを使用してすべてのページオブジェクトにアクセスできます。利用可能なすべてのページオブジェクトとそのメソッドについては、[ページオブジェクトのドキュメント](https://webdriverio-community.github.io/wdio-vscode-service/)を参照してください。

### VSCode APIへのアクセス

[VSCode API](https://code.visualstudio.com/api/references/vscode-api)を通じて特定の自動化を実行したい場合は、カスタム `executeWorkbench` コマンドを使用してリモートコマンドを実行できます。このコマンドを使用すると、テストからVSCode環境内でコードをリモート実行し、VSCode APIにアクセスできます。関数に任意のパラメータを渡すことができ、それらは関数に渡されます。`vscode` オブジェクトは、外部関数のパラメータに続いて常に最初の引数として渡されます。コールバックはリモートで実行されるため、関数のスコープ外の変数にはアクセスできないことに注意してください。例：

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // 出力: "I am an API call!"
```

ページオブジェクトの完全なドキュメントについては、[ドキュメント](https://webdriverio-community.github.io/wdio-vscode-service/modules.html)を確認してください。このプロジェクトの[テストスイート](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs)で様々な使用例を見つけることができます。

## 詳細情報

[`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service)の設定方法やカスタムページオブジェクトの作成方法について詳しくは、[サービスのドキュメント](/docs/wdio-vscode-service)を参照してください。また、[Christian Bromann](https://twitter.com/bromann)による[_Webスタンダードの力を使った複雑なVSCode拡張機能のテスト_](https://www.youtube.com/watch?v=PhGNTioBUiU)についての講演も視聴できます：

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>