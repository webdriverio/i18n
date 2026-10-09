---
id: web
title: Webブラウザ
description: Chrome、Firefox、Microsoft Edge、SafariでWebdriverIOのエンドツーエンドテスト、コンポーネントテスト、ビジュアルテスト、アクセシビリティテストをセットアップして実行します。
---

WebdriverIOは、標準のブラウザドライバーを通じてデスクトップブラウザ（Chrome、Chromium、Firefox、Microsoft Edge、Safari）を自動化します。デフォルトでは、従来のWebDriverプロトコルの双方向の後継である[WebDriver BiDi](/docs/automationProtocols)セッションを開こうとします。BiDiは、ネットワークモッキングやWeb APIエミュレーションなどの機能を実現します。これを無効にするには、capabilitiesで`wdio:enforceWebDriverClassic: true`を設定してください。ドライバーを自分でインストールする必要はありません。`browserName`を設定すると、WebdriverIOが対応するChromedriver、Geckodriver、またはEdgedriverをダウンロードして起動します。また、ローカルにインストールが見つからない場合は、Chrome、Chromium、またはFirefoxもインストールします。Microsoft Edgeは事前にインストールされている必要があり、SafaridriverはmacOSに同梱されています。同じテストランナーで、Browser Runnerを使用してブラウザ内でテストを実行することもできます。これにより、React、Vue、Svelte、SolidJS、Preact、Lit、Stencilのユニットテストとコンポーネントテストがカバーされます。

## クイックスタート

`npm init wdio@latest .`を使用して、対話形式でプロジェクトの雛形を作成します。`--yes`を渡すとデフォルト（Mocha、Chrome、ページオブジェクト）が選択されます。手動でプロジェクトをセットアップするには、テストランナー、フレームワークアダプター、レポーター、そしてTypeScript用の`tsx`をインストールします：

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

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

各capabilityには独自のワーカープロセスが割り当てられるため、これによりスペックはChromeとFirefoxの両方で実行されます。その他の有効な`browserName`の値は`chromium`、`msedge`、`safari`です。ヘッドレスで実行するには、`'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`のようなブラウザ引数を追加します。FirefoxとEdgeについては[ブラウザをヘッドレスで実行する](/docs/capabilities#run-browser-headless)を参照してください。Safariにはヘッドレスモードがありません。

## 目的に応じて選ぶ

ブラウザ間のエンドツーエンドテスト：

- [Capabilities](/docs/capabilities)：ブラウザオプション、ヘッドレスモード、ブラウザチャンネル（Canary、Nightly、Safari Technology Preview）、および`wdio:*`ドライバーオプション。
- [ドライバーバイナリ](/docs/driverbinaries)：ブラウザとドライバーの自動セットアップの仕組み、およびカスタムバイナリの指定方法。
- [自動化プロトコル](/docs/automationProtocols)：WebDriverとWebDriver BiDiの比較。
- [WebDriver BiDiコマンド](/docs/api/webdriverBidi)：`browser`オブジェクトで利用可能な生のBiDiプロトコルコマンド。
- [セレクター](/docs/selectors)：CSS、テキスト、ARIA、ディープ（shadow DOM）、Reactセレクター。
- [自動待機](/docs/autowait)と[タイムアウト](/docs/timeouts)：WebdriverIOが要素を待機する仕組みと調整すべき項目。
- [マルチリモート](/docs/multiremote)：1つのテストで複数のブラウザを制御します（チャットやWebRTCアプリなど）。

WebDriver BiDiが必要なブラウザ機能（Chrome、Edge、Firefox。Safariは非対応）：

- [リクエストのモックとスパイ](/docs/mocksandspies)：`browser.mock()`でネットワークリクエストをインターセプト、変更、またはスタブします。[Mockオブジェクト](/docs/api/mock)も参照してください。
- [エミュレーション](/docs/emulation)：`browser.emulate()`で位置情報、メディア機能、ユーザーエージェント、オフライン状態、ロケール、タイムゾーン、画面、デバイスをエミュレートします。

実際のブラウザでのコンポーネントテストとユニットテスト：

- [コンポーネントテスト](/docs/component-testing)：Viteベースの[Browser Runner](/docs/runner#browser-runner)の仕組みとセットアップ方法。
- フレームワークガイド：[React](/docs/component-testing/react)、[Vue.js](/docs/component-testing/vue)、[Svelte](/docs/component-testing/svelte)、[SolidJS](/docs/component-testing/solid)、[Preact](/docs/component-testing/preact)、[Lit](/docs/component-testing/lit)、[Stencil](/docs/component-testing/stencil)。
- コンポーネントテスト向けの[モッキング](/docs/component-testing/mocking)と[カバレッジ](/docs/component-testing/coverage)。

ビジュアルテストとアクセシビリティテスト：

- [ビジュアルテスト](/docs/visual-testing)：`@wdio/visual-service`による画面、要素、フルページの画像比較。
- [スナップショット](/docs/snapshot)：DOMおよびオブジェクトのスナップショットアサーション。
- [Axe Core](/docs/accessibility-testing/axe-core)：テストからDeque axeのアクセシビリティスキャンを実行します。

スケールアウト：

- [Selenium Grid](/docs/seleniumgrid)、[クラウドサービス](/docs/cloudservices)、[Docker](/docs/docker)：ブラウザをリモートで実行します。
- [シャーディング](/docs/sharding)：テストスイートを複数のCIマシンに分割します。

コンポーネントテストでは、同じ設定ファイルを異なるランナーで使用します。例えば、Reactプリセットを使用する場合：

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Browser Runnerには`@wdio/browser-runner`が必要です。Reactプリセットには`@vitejs/plugin-react`も必要で、ガイドではレンダリングに`@testing-library/react`を推奨しています。プリセットは`vue`、`svelte`、`solid`、`react`、`preact`、`stencil`向けに用意されています。それ以外の場合は、代わりに`viteConfig`を使用してください。

## トラブルシューティング

- CIでChromeが「user data directory is already in use」または「DevToolsActivePort file doesn't exist」というエラーで起動しない場合：[ヘッドレスとディスプレイサーバー](/docs/headless-and-display-servers#troubleshooting)を参照してください。
- `browser.mock()`や`browser.emulate()`が機能しない場合：セッションがWebDriver BiDiを使用していません。ブラウザ（SafariはBiDi非対応）、クラウドベンダー、および`wdio:enforceWebDriverClassic`を確認してください。
- プロキシ環境下でドライバーやブラウザをダウンロードできない場合：[カスタムドライバーダウンロードホスト](/docs/capabilities#custom-driver-download-host)と[プロキシ設定](/docs/proxy)を参照してください。
- 不安定なテスト：[不安定なテストの再試行](/docs/retry)と[デバッグ](/docs/debugging)を参照してください。

## 次のステップ

- `wdio.conf.ts`のすべてのオプションについての[設定](/docs/configuration)リファレンス。
- [TypeScriptのセットアップ](/docs/typescript)と[フレームワーク](/docs/frameworks)（Mocha、Jasmine、Cucumber）。
- 大規模なテストスイートを構造化するための[ページオブジェクトパターン](/docs/pageobjects)。
- AIエージェントにWebdriverIOを通じてブラウザセッションを操作させるための[MCP](/docs/mcp)。
- その他のプラットフォーム：[モバイルアプリ](/docs/platforms/mobile)、[デスクトップアプリ](/docs/platforms/desktop)、[拡張機能とエディター](/docs/platforms/apps-and-extensions)。