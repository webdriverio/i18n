---
id: wdio-vscode-service
title: VSCode拡張機能テストサービス
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-vscode-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)をご覧ください。

テスト済み環境：

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> VSCode拡張機能をテストするためのWebdriverIOサービス。

このWebdriverIOサービスを使用すると、VSCodeデスクトップIDEまたはWeb拡張機能としてVSCode拡張機能のエンドツーエンドテストをシームレスに実行できます。拡張機能へのパスを提供するだけで、サービスが以下を行います：

- 🏗️ VSCodeのインストール（`stable`、`insiders`または指定したバージョン）
- ⬇️ 特定のVSCodeバージョンに対応したChromedriverのダウンロード
- 🚀 テストからVSCode APIへのアクセスを可能にする
- 🖥️ カスタムユーザー設定でVSCodeを起動（Ubuntu、MacOS、WindowsのVSCodeをサポート）
- 🌐 または[Web拡張機能](https://code.visualstudio.com/api/extension-guides/web-extensions)のテスト用にサーバーからVSCodeを提供
- 📔 VSCodeバージョンに合わせたロケーターを持つページオブジェクトのブートストラップ

このプロジェクトは、Seleniumベースの[vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester)プロジェクトに大きく触発されています。このパッケージはそのアイデアを取り入れ、WebdriverIOに適応させています。

VSCode v1.86からは、設定なしでChromedriverをインストールするために`webdriverio` v8.14以降を使用する必要があります。以前のバージョンのVSCodeをテストする必要がある場合は、下記の[Chromedriver設定](#chromedriver)セクションを参照してください。

## インストール

新しいWebdriverIOプロジェクトを開始するには、以下を実行します：

```bash
npm create wdio ./
```

インストールウィザードが表示され、プロセスを案内します。コンパイラとしてTypeScriptを選択し、このプロジェクトに必要なページオブジェクトが含まれているため、ページオブジェクトを生成しないようにしてください。そして、サービスのリストから`vscode`を選択してください：

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

`WebdriverIO`のインストール方法について詳しくは、[プロジェクトドキュメント](https://webdriver.io/docs/gettingstarted)をご確認ください。

## 設定例

このサービスを使用するには、サービスのリストに`vscode`を追加し、必要に応じて設定オブジェクトを続けて指定します。これにより、WebdriverIOは指定されたVSCodeバイナリと適切なChromedriverバージョンをダウンロードします：

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // 最新のVSCodeバージョンには "insiders" または "stable" を指定
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * オプションで、WebdriverIOがすべてのVSCodeバイナリを保存するパスを定義できます。例：
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

`wdio:vscodeOptions`を`vscode`以外の`browserName`（例：`chrome`）で定義すると、サービスは拡張機能をWeb拡張機能として提供します。Chromeでテストする場合、追加のドライバーサービスは必要ありません：

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

_注意：_ Web拡張機能をテストする場合、`browserVersion`として`stable`または`insiders`のみを選択できます。

### TypeScript設定

`tsconfig.json`で、`wdio-vscode-service`をタイプのリストに追加してください：

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
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## 使用方法

`getWorkbench`メソッドを使用して、希望するVSCodeバージョンに対応するロケーターのページオブジェクトにアクセスできます：

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### VSCode APIへのアクセス

[VSCode API](https://code.visualstudio.com/api/references/vscode-api)を通じて特定の自動化を実行したい場合は、カスタム`executeWorkbench`コマンドを使用してリモートコマンドを実行できます。このコマンドを使用すると、テストからVSCode環境内でコードをリモート実行し、VSCode APIにアクセスできます。関数に任意のパラメータを渡すと、それらが関数に伝播されます。`vscode`オブジェクトは、常に外部関数パラメータに続く最初の引数として渡されます。コールバックはリモートで実行されるため、関数スコープ外の変数にはアクセスできないことに注意してください。例：

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // 出力: "I am an API call!"
```

ページオブジェクトの完全なドキュメントは、[docs](https://webdriverio-community.github.io/wdio-vscode-service/modules.html)をご確認ください。さまざまな使用例は、この[プロジェクトのテストスイート](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs)で確認できます。

## 設定

サービス設定を通じて、VSCodeのバージョンやユーザー設定を管理できます：

### サービスオプション

サービスオプションは、テスト環境をセットアップするためにサービスが必要とするオプションです。

#### `cachePath`

VSCodeバンドルの再ダウンロードを避けるためのキャッシュパスを定義します。これはCI/CDでテスト実行ごとにVSCodeを再ダウンロードしないようにするのに役立ちます。

タイプ: `string`<br />
デフォルト: `process.cwd()`

### VSCode機能（`wdio:vscodeOptions`）

VSCodeを通じてテストを実行するには、`browserName`として`vscode`を定義する必要があります。`browserVersion`機能を提供することでVSCodeバージョンを指定できます。カスタムVSCodeオプションは、カスタム`wdio:vscodeOptions`機能内で定義されます。オプションは以下の通りです：

#### `binary`

ローカルにインストールされたVSCodeインストールへのパス。このオプションが提供されていない場合、サービスは指定された`browserVersion`（または指定がない場合は`stable`）に基づいてVSCodeをダウンロードします。

タイプ: `string`

#### `extensionPath`

テストしたい拡張機能のディレクトリを定義します。

タイプ: `string`

#### `storagePath`

VS Codeがすべてのデータを保存するカスタムロケーションを定義します。これは内部VS Codeディレクトリのルートであり、以下のようなディレクトリが含まれます（一部）
* **user-data-dir**: すべてのユーザー設定（グローバル設定）、拡張機能ログなどが保存されるディレクトリ。
* **extension-install-dir**: VS Code拡張機能がインストールされるディレクトリ。

提供されていない場合、一時ディレクトリが使用されます。

タイプ: `string`

#### `userSettings`

VSCodeに適用するカスタムユーザー設定を定義します。

タイプ: `Record<string, number | string | object | boolean>`<br />
デフォルト: `{}`

#### `workspacePath`

特定のワークスペース用にVSCodeを開きます。提供されていない場合、VSCodeはワークスペースを開かずに起動します。

タイプ: `string`

#### `filePath`

特定のファイルを開いた状態でVSCodeを開きます。

タイプ: `string`

#### `vscodeArgs`

オブジェクトとしての追加の起動引数。例：

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

これは以下のように渡されます：

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

タイプ: `Record<string, string | boolean>`<br />
デフォルト: [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)を参照

#### `verboseLogging`

trueに設定すると、サービスは拡張機能ホストとコンソールAPIからのVSCode出力をログに記録します。

タイプ: `boolean`<br />
デフォルト: `false`

#### `vscodeProxyOptions`

VSCode APIプロキシ設定は、WebdriverIOがVSCode APIへのアクセスを提供するためにVSCodeワークベンチに接続する方法を定義します。

タイプ: `VSCodeProxyOptions`<br />
デフォルト:

```ts
{
    /**
     * trueに設定すると、サービスはVSCode APIへのアクセスを可能にするために
     * VSCodeワークベンチとの接続を確立しようとします
     */
    enable: true,
    /**
     * ワークベンチに接続するために使用されるWebSocket接続のポート。
     * デフォルトではオペレーティングシステムの利用可能なポートに設定されます。
     */
    // port?: number
    /**
     * VSCode内のWebSocketへの接続タイムアウト
     */
    connectionTimeout: 5000,
    /**
     * VSCode内でコマンドを実行するためのタイムアウト
     */
    commandTimeout: 5000
}
```

### Chromedriver

VSCode v1.86からは、設定なしでChromedriverをインストールするために`webdriverio` v8.14以降を使用する必要があります。[簡素化されたブラウザ自動化セットアップ](https://webdriver.io/blog/2023/07/31/driver-management)がすべてを処理します。

以前のバージョンのVS Codeをテストするには、ログから必要なChromedriverのバージョンを確認し、[Chromedriver](https://chromedriver.chromium.org/downloads)をダウンロードして、パスを設定してください。例：

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## 独自のPageObjectsを作成する

このサービスで使用されているコンポーネントを自分のレビューページオブジェクトに再利用できます。まず、すべてのセレクタを定義するファイルを作成します：

```ts
// 例：/test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // コンポーネントのコンテナ要素
    submit: 'button[type="submit"]', // 送信ボタン
    username: 'input.username', // ユーザー名入力
    password: 'input.password' // パスワード入力
}
```

次に、以下のようにページオブジェクトを作成できます：

```ts
// 例：/test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private ロケーターマップを識別するためのロケーターキー（locators.tsを参照）
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

テストでは、以下のようにページオブジェクトを使用できます：

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// 例：/test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // `[selector]$`や`[selector]$$`を使用して、ページオブジェクト要素を直接使用することもできます
        // 例：
        await loginForm.submit$.click()

        // またはロケーターに直接アクセスする
        console.log(loginForm.locators.username)
        // 出力: "input.username"
    })
})
```

## TypeScriptサポート

WebdriverIOをTypeScriptで使用する場合は、`tsconfig.json`の`types`に`wdio-vscode-service`を追加してください：

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // このサービスをタイプに追加
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## プロキシサポート

このサービスの初期化中に、ChromeDriverとVSCodeディストリビューションがダウンロードされます。環境変数`HTTPS_PROXY`または`https_proxy`を設定することで、これらのリクエストをプロキシ経由でトンネリングできます。例：

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## 参考

以下のVS Code拡張機能は`wdio-vscode-service`を使用しています：

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27kダウンロード)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8mダウンロード)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2kダウンロード)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2mダウンロード)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3kダウンロード)

## 貢献

プルリクエストを投稿する前に、以下を実行してください：

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (または`npm run ci`)

## 詳細情報

VSCode拡張機能のテストについてさらに学びたい場合は、[OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU)での[Christian Bromann](https://twitter.com/bromann)の講演をご覧ください：

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

WebdriverIOに関する詳細情報は、プロジェクトの[ホームページ](https://webdriver.io)をご覧ください。