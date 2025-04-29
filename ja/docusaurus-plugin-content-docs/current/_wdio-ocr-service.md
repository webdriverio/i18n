---
id: wdio-ocr-service
title: OCRテストサービス
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/ocr-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)をご覧ください。

WebdriverIOでのビジュアルテストに関するドキュメントは[ドキュメント](https://webdriver.io/docs/visual-testing)を参照してください。このプロジェクトにはWebdriverIOでビジュアルテストを実行するための関連モジュールがすべて含まれています。`./packages`ディレクトリには以下が含まれています：

-   `@wdio/visual-testing`: ビジュアルテストを統合するためのWebdriverIOサービス
-   `webdriver-image-comparison`: WebDriverプロトコルをサポートする様々なNodeJSテスト自動化フレームワークで使用できる画像比較モジュール

## Storybookランナー（ベータ版）

<details>
  <summary>Storybookランナーベータ版についての詳細情報を見るにはクリックしてください</summary>

> Storybookランナーはまだベータ版です。ドキュメントは後ほど[WebdriverIO](https://webdriver.io/docs/visual-testing)のドキュメントページに移動します。

このモジュールは新しいビジュアルランナーでStorybookをサポートするようになりました。このランナーはローカル/リモートのStorybookインスタンスを自動的にスキャンし、各コンポーネントの要素スクリーンショットを作成します。これは以下のように

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

を`services`に追加し、コマンドラインから`npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook`を実行することでできます。
デフォルトではヘッドレスモードのChromeをブラウザとして使用します。

> [!NOTE]
>
> -   ビジュアルテストのオプションの多くはStorybookランナーでも機能します。[WebdriverIO](https://webdriver.io/docs/visual-testing)のドキュメントを参照してください。
> -   Storybookランナーはすべてのcapabilitiesを上書きし、サポートするブラウザでのみ実行できます。[`--browsers`](#browsers)を参照してください。
> -   StorybookランナーはMultiremote capabilitiesを使用する既存の設定をサポートせず、エラーがスローされます。
> -   StorybookランナーはデスクトップWebのみをサポートし、モバイルWebはサポートしていません。

### Storybookランナーサービスオプション

サービスオプションは次のように提供できます

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // いくつかのデフォルトオプション
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Storybookオプション、説明はCLIオプションを参照
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories`は文字列('example-button--secondary')、
                // 配列(['example-button--secondary', 'example-button--small'])
                // または文字列として提供する必要があるregex ("/.*button.*/gm")が使用できます
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // オプション - ベースラインパスの上書きを可能にします。デフォルトではカテゴリとコンポーネントでベースラインをグループ化します（例：forms/input/baseline.png）
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Storybookランナー CLIオプション

#### `--additionalSearchParams`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** ''
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

StorybookのURLに追加の検索パラメータを追加します。
詳細については[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)のドキュメントを参照してください。文字列は有効なURLSearchParamsの文字列である必要があります。

> [!NOTE]
> ダブルクォートは`&`がコマンド区切り文字として解釈されるのを防ぐために必要です。
> 例えば`--additionalSearchParams="foo=bar&abc=def"`では、ストーリーテスト用に次のようなStorybookのURLが生成されます：`http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`。

#### `--browsers`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `chrome`、`chrome|firefox|edge|safari`から選択可能
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **注意:** CLIからのみ利用可能

提供されたブラウザを使用してコンポーネントのスクリーンショットを撮影します

> [!NOTE]
> 実行したいブラウザがローカルマシンにインストールされていることを確認してください

#### `--clip`

-   **タイプ:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

無効にするとビューポートスクリーンショットを作成します。有効にすると[`--clipSelector`](#clipselector)に基づいて要素スクリーンショットを作成し、コンポーネントスクリーンショット周囲の余白を減らし、スクリーンショットのサイズを縮小します。

#### `--clipSelector`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** Storybook V7では`#storybook-root > :first-child`、Storybook V6では`#root > :first-child:not(script):not(style)`、[`--version`](#version)も参照
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

このセレクタは以下の用途に使用されます：

-   スクリーンショットを撮影する要素の選択
-   スクリーンショットを撮影する前に表示されるのを待つ要素

#### `--devices`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)から選択可能
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **注意:** CLIからのみ利用可能

[`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)に一致する提供されたデバイスを使用してコンポーネントのスクリーンショットを撮影します

> [!NOTE]
>
> -   デバイス設定が見つからない場合は、[機能リクエスト](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)を提出してください
> -   これはChromeでのみ動作します：
>     -   `--devices`を提供すると、すべてのChromeインスタンスは**モバイルエミュレーション**モードで実行されます
>     -   Chromeの他にも`--devices --browsers=firefox,safari,edge`のような他のブラウザを提供すると、モバイルエミュレーションモードのChromeが自動的に追加されます
> -   Storybookランナーはデフォルトで要素スナップショットを作成します。完全なモバイルエミュレーションスクリーンショットを見たい場合は、コマンドラインで`--clip=false`を提供してください
> -   ファイル名は例えば`__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`のようになります
> -   **[出典：](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** モバイルエミュレーションを使用してデスクトップでモバイルウェブサイトをテストすることは有用ですが、テスターは以下のような多くの微妙な違いに注意すべきです：
>     -   まったく異なるGPUがあり、大きなパフォーマンスの変化につながる可能性があります
>     -   モバイルUIはエミュレートされません（特にURLバーの非表示化はページの高さに影響します）
>     -   ディスアンビギュエーションポップアップ（複数のタッチターゲットから1つを選択する）はサポートされていません
>     -   多くのハードウェアAPI（例えば、orientationchangeイベント）は利用できません

#### `--headless`

-   **タイプ:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **注意:** CLIからのみ利用可能

これはデフォルトでテストをヘッドレスモード（ブラウザがサポートしている場合）で実行するか、無効にするかを設定します

#### `--numShards`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

ストーリーを実行するために使用される並列インスタンスの数です。これは`wdio.conf`ファイルの`maxInstances`によって制限されます。

> [!IMPORTANT]
> `headless`モードで実行する場合、リソース制限による不安定さを防ぐために数を20以上に増やさないでください

#### `--skipStories`

-   **タイプ:** `string|regex`
-   **必須:** いいえ
-   **デフォルト:** null
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

これは以下のいずれかです：

-   文字列 (`example-button--secondary,example-button--small`)
-   または正規表現 (`"/.*button.*/gm"`)

特定のストーリーをスキップするために使用します。ストーリーのURLで見つけることができる`id`を使用します。例えば、URL `http://localhost:6006/?path=/story/example-page--logged-out`の`id`は`example-page--logged-out`です

#### `--url`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `http://127.0.0.1:6006`
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

StorybookインスタンスがホストされているURL。

#### `--version`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 7
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Storybookのバージョンで、デフォルトは`7`です。V6の[`clipSelector`](#clipselector)を使用する必要があるかどうかを知るために必要です。

### Storybookインタラクションテスト

Storybookインタラクションテストを使用すると、WDIOコマンドを使用してカスタムスクリプトを作成し、コンポーネントを特定の状態にするためのインタラクションが可能になります。例えば、以下のコードスニペットをご覧ください：

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

2つの異なるコンポーネントに対する2つのテストが実行されます。各テストはまず状態を設定し、次にスクリーンショットを撮ります。また、新しいカスタムコマンドが導入されていることにも気づくでしょう。これについては[こちら](#new-custom-command)で詳しく説明されています。

上記のspecファイルをフォルダに保存し、以下のコマンドでコマンドラインに追加できます：

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybookランナーはまず自動的にStorybookインスタンスをスキャンし、比較する必要があるストーリーにテストを追加します。インタラクションテストに使用するコンポーネントが2回比較されないようにするには、[`--skipStories`](#--skipstories)フィルターを提供して「デフォルト」ストーリーをスキャンから除外できます。これは以下のようになります：

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### 新しいカスタムコマンド

`browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })`という新しいカスタムコマンドが`browser/driver`オブジェクトに追加され、コンポーネントを自動的に読み込み、それが完了するのを待つため、`browser.url('url.com')`メソッドを使用する必要はありません。次のように使用できます：

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

オプションは以下の通りです：

#### `additionalSearchParams`

-   **タイプ:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **必須:** いいえ
-   **デフォルト:** `new URLSearchParams()`
-   **例:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

これによりStorybookのURLに追加の検索パラメータが追加されます。上記の例では、URLは`http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`になります。
詳細については[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)のドキュメントを参照してください。

#### `clipSelector`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** Storybook V7では`#storybook-root > :first-child`、Storybook V6では`#root > :first-child:not(script):not(style)`
-   **例:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

このセレクタは以下の用途に使用されます：

-   スクリーンショットを撮影する要素の選択
-   スクリーンショットを撮影する前に表示されるのを待つ要素

#### `id`

-   **タイプ:** `string`
-   **必須:** はい
-   **例:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

ストーリーのURLで見つけることができる`id`を使用します。例えば、URL `http://localhost:6006/?path=/story/example-page--logged-out`の`id`は`example-page--logged-out`です

#### `timeout`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** 1100ミリ秒
-   **例:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

ページ読み込み後にコンポーネントが表示されるのを待つ最大タイムアウト時間

#### `url`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `http://127.0.0.1:6006`
-   **例:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

StorybookインスタンスがホストされているURL。

</details>

## 貢献する

### パッケージの更新

簡単なCLIツールでパッケージを更新できます。すべての依存関係がインストールされていることを確認し、以下を実行できます：

```sh
pnpm update.packages
```

これによりCLIが起動し、次のような質問が表示されます：

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

これにより以下のようなログが生成されます：

<details>
    <summary>ログの例を見るには開いてください</summary>
    
```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? Minor
? Do you want to update the package.json files? yes
Updating root 'package.json' for minor updates...
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/package.json
[====================] 38/38 100%

@typescript-eslint/eslint-plugin ^8.7.0 → ^8.8.0
@typescript-eslint/parser ^8.7.0 → ^8.8.0
@typescript-eslint/utils ^8.7.0 → ^8.8.0
@vitest/coverage-v8 ^2.1.1 → ^2.1.2
vitest ^2.1.1 → ^2.1.2

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service/package.json
[====================] 11/11 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter/package.json
[====================] 11/11 100%

eslint-config-next 14.2.13 → 14.2.14
next 14.2.13 → 14.2.14

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service/package.json
[====================] 5/5 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison/package.json
[====================] 8/8 100%

All dependencies match the minor package versions :)
? Do you want to remove all "node_modules" and reinstall dependencies? yes
Removing root dependencies in /Users/wswebcreation/Git/wdio/visual-testing...
Removing dependencies in ocr-service...
Removing dependencies in visual-reporter...
Removing dependencies in visual-service...
Removing dependencies in webdriver-image-comparison...
? Would you like reinstall the dependencies? yes
Installing dependencies in /Users/wswebcreation/Git/wdio/visual-testing...

> @wdio/visual-testing-monorepo@ pnpm.install.workaround /Users/wswebcreation/Git/wdio/visual-testing
> pnpm install --shamefully-hoist

Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1274
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1274, reused 1265, downloaded 0, added 1274, done

dependencies:

-   @wdio/ocr-service 2.0.0 <- packages/ocr-service
-   @wdio/visual-service 6.0.0 <- packages/visual-service

devDependencies:

-   @changesets/cli 2.27.8
-   @inquirer/prompts 5.5.0
-   @tsconfig/node20 20.1.4
-   @types/eslint 9.6.1
-   @types/jsdom 21.1.7
-   @types/node 20.16.4
-   @types/react 18.3.5
-   @types/react-dom 18.3.0
-   @types/xml2js 0.4.14
-   @typescript-eslint/eslint-plugin 8.8.0
-   @typescript-eslint/parser 8.8.0
-   @typescript-eslint/utils 8.8.0
-   @vitest/coverage-v8 2.1.2
-   @wdio/appium-service 9.1.2
-   @wdio/cli 9.1.2
-   @wdio/globals 9.1.2
-   @wdio/local-runner 9.1.2
-   @wdio/mocha-framework 9.1.2
-   @wdio/sauce-service 9.1.2
-   @wdio/shared-store-service 9.1.2
-   @wdio/spec-reporter 9.1.2
-   @wdio/types 9.1.2
-   eslint 9.11.1
-   eslint-plugin-import 2.30.0
-   eslint-plugin-unicorn 55.0.0
-   eslint-plugin-wdio 9.0.8
-   husky 9.1.6
-   jsdom 25.0.1
-   pnpm-run-all2 6.2.3
-   release-it 17.6.0
-   rimraf 6.0.1
-   saucelabs 8.0.0
-   ts-node 10.9.2
-   typescript 5.6.2
-   vitest 2.1.2
-   webdriverio 9.1.2

. prepare$ husky
└─ Done in 204ms
Done in 9.5s
All packages updated!

````

</details>

### 質問

このプロジェクトへの貢献に関して質問や問題がある場合は、[Discord](https://discord.webdriver.io)サーバーに参加してください。貢献者は`🙏-contributing`チャンネルでキャッチできます。

### 課題

質問、バグ、または機能リクエストがある場合は、Issueを提出してください。Issueを送信する前に、重複を減らすためにIssueアーカイブを検索し、[FAQ](https://webdriver.io/docs/visual-testing/faq/)を読んでください。

そこで見つからない場合は、以下を提出できるIssueを作成できます：

-   🐛**バグレポート**：改善に役立つレポートを作成する
-   📖**ドキュメント**：改善の提案や不足/不明瞭なドキュメントの報告
-   💡**機能リクエスト**：このモジュールのアイデアを提案する
-   💬**質問**：質問をする

### 開発ワークフロー

このプロジェクトのPRを作成し、貢献を開始するには、以下のステップバイステップガイドに従ってください：

-   プロジェクトをフォークします。
-   コンピュータのどこかにプロジェクトをクローンします

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   ディレクトリに移動し、プロジェクトをセットアップします

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   コードを自動的にトランスパイルするウォッチモードを実行します

    ```sh
    $ pnpm watch
    ```

    プロジェクトをビルドするには、以下を実行します：

    ```sh
    $ pnpm build
    ```

-   変更によってテストが壊れないことを確認するには、以下を実行します：

    ```sh
    $ pnpm test
    ```

このプロジェクトは[changesets](https://github.com/changesets/changesets)を使用して、自動的に変更ログとリリースを作成します。

### テスト

モジュールをテストするためにいくつかのテストを実行する必要があります。PRを追加する際には、少なくともローカルテストをすべて通過する必要があります。各PRは自動的にSauce Labsに対してテストされます。[GitHubアクションパイプライン](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml)をご覧ください。PRを承認する前に、コア貢献者はエミュレータ/シミュレータ/実デバイスに対してPRをテストします。

#### ローカルテスト

まず、ローカルベースラインを作成する必要があります。これは以下のコマンドで行えます：

```sh
// Webdriverプロトコルを使用
$ pnpm run test.local.init
```

このコマンドはすべてのベースライン画像を保持する`localBaseline`というフォルダを作成します。

次に以下を実行します：

```sh
// Webdriverプロトコルを使用
pnpm run test.local.desktop
```

これによりローカルマシン上のChromeですべてのテストが実行されます。

#### ローカルStorybookランナーテスト（ベータ版）

まず、ローカルベースラインを作成する必要があります。これは以下のコマンドで行えます：

```sh
pnpm run test.local.desktop.storybook
```

これにより、https://govuk-react.github.io/govuk-react/ にあるデモStorybookリポジトリに対して、ヘッドレスモードのChromeでStorybookテストが実行されます。

より多くのブラウザでテストを実行するには、以下を実行できます：

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> 実行したいブラウザがローカルマシンにインストールされていることを確認してください

#### Sauce Labsを使用したCIテスト（PRには不要）

以下のコマンドはGitHub Actionsでビルドをテストするために使用され、ローカル開発では使用できません。

```
$ pnpm run test.saucelabs
```

これにより、[ここ](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts)で見つけることができる多くの設定に対してテストが実行されます。
すべてのPRは自動的にSauce Labsに対してチェックされます。

## リリース

上記のパッケージのいずれかのバージョンをリリースするには、以下を行います：

-   [リリースパイプライン](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)をトリガーする
-   リリースPRが生成されたら、別のWebdriverIOメンバーによるレビューと承認を受ける
-   PRをマージする
-   再度[リリースパイプライン](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)をトリガーする
-   新しいバージョンがリリースされるはずです🎉

## クレジット

`@wdio/visual-testing`は[LambdaTest](https://www.lambdatest.com/)と[Sauce Labs](https://saucelabs.com/)からのオープンソースライセンスを使用しています。