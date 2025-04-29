---
id: wdio-visual-service
title: 画像比較（ビジュアルリグレッションテスト）サービス
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-serviceはサードパーティパッケージです。詳細については[GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)をご覧ください。

WebdriverIOによるビジュアルテストのドキュメントについては、[ドキュメント](https://webdriver.io/docs/visual-testing)を参照してください。このプロジェクトには、WebdriverIOでビジュアルテストを実行するための関連モジュールがすべて含まれています。`./packages`ディレクトリには以下が含まれています：

-   `@wdio/visual-testing`: ビジュアルテストを統合するためのWebdriverIOサービス
-   `webdriver-image-comparison`: WebDriverプロトコルをサポートする様々なNodeJSテスト自動化フレームワークで使用できる画像比較モジュール

## Storybookランナー（ベータ版）

<details>
  <summary>Storybookランナーベータ版の詳細ドキュメントを表示するにはクリックしてください</summary>

> Storybookランナーはまだベータ版です。ドキュメントは後ほど[WebdriverIO](https://webdriver.io/docs/visual-testing)のドキュメントページに移動する予定です。

このモジュールは新しいVisualランナーでStorybookをサポートするようになりました。このランナーは自動的にローカル/リモートのStorybookインスタンスをスキャンし、各コンポーネントの要素スクリーンショットを作成します。これは以下を`services`に追加することで実行できます

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

そしてコマンドラインから`npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook`を実行します。
デフォルトではヘッドレスモードのChromeが使用されます。

> [!NOTE]
>
> -   ほとんどのビジュアルテストオプションはStorybookランナーでも動作します。[WebdriverIO](https://webdriver.io/docs/visual-testing)のドキュメントを参照してください。
> -   Storybookランナーはすべての機能をオーバーライドし、サポートするブラウザでのみ実行できます。[`--browsers`](#browsers)を参照してください。
> -   StorybookランナーはMultiremote機能を使用する既存の設定をサポートしておらず、エラーを投げます。
> -   StorybookランナーはデスクトップWebのみをサポートし、モバイルWebはサポートしていません。

### Storybookランナーサービスオプション

サービスオプションは以下のように提供できます

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // デフォルトオプション
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Storybookオプション、説明はcliオプションを参照
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories`は文字列('example-button--secondary')、
                // 配列(['example-button--secondary', 'example-button--small'])
                // または文字列として提供する必要のある正規表現("/.*button.*/gm")が可能
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // オプション - ベースラインパスの上書きを許可。デフォルトではカテゴリとコンポーネントでグループ化されます（例：forms/input/baseline.png）
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
> `&`がコマンドセパレータとして解釈されないように二重引用符が必要です。
> 例えば`--additionalSearchParams="foo=bar&abc=def"`を使用すると、ストーリーテスト用に次のようなStorybookのURLが生成されます：`http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`。

#### `--browsers`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** `chrome`、`chrome|firefox|edge|safari`から選択可能
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **注意:** CLIでのみ利用可能

提供されたブラウザを使用してコンポーネントのスクリーンショットを撮影します

> [!NOTE]
> 実行したいブラウザがローカルマシンにインストールされていることを確認してください

#### `--clip`

-   **タイプ:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

無効にするとビューポートスクリーンショットを作成します。有効にすると[`--clipSelector`](#clipselector)に基づいて要素スクリーンショットを作成し、コンポーネントスクリーンショット周囲の空白スペースを減らしスクリーンショットサイズを縮小します。

#### `--clipSelector`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** Storybook V7では`#storybook-root > :first-child`、Storybook V6では`#root > :first-child:not(script):not(style)`、[`--version`](#version)も参照
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

このセレクタは以下の用途に使用されます：

-   スクリーンショットを撮影する要素の選択
-   スクリーンショットが撮影される前に表示されるのを待つ要素

#### `--devices`

-   **タイプ:** `string`
-   **必須:** いいえ
-   **デフォルト:** [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)から選択可能
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **注意:** CLIでのみ利用可能

[`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)に一致する提供されたデバイスを使用してコンポーネントスクリーンショットを撮影します

> [!NOTE]
>
> -   デバイス設定が足りない場合は、[機能リクエスト](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)を提出してください
> -   これはChromeでのみ動作します：
>     -   `--devices`を提供すると、すべてのChromeインスタンスは**モバイルエミュレーション**モードで実行されます
>     -   `--devices --browsers=firefox,safari,edge`のように他のブラウザも提供する場合、モバイルエミュレーションモードのChromeが自動的に追加されます
> -   Storybookランナーはデフォルトで要素スナップショットを作成します。完全なモバイルエミュレートスクリーンショットを見るには、コマンドラインで`--clip=false`を提供してください
> -   ファイル名は例えば`__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`のようになります
> -   **[出典:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** モバイルエミュレーションを使用してデスクトップでモバイルウェブサイトをテストすることは有用ですが、テスターは以下のような微妙な違いがあることを認識すべきです：
>     -   パフォーマンスに大きな変化をもたらす可能性のある全く異なるGPU
>     -   モバイルUIはエミュレートされない（特に、URLバーを隠すとページの高さに影響する）
>     -   ディスアンビギュエーションポップアップ（複数のタッチターゲットから1つを選択する）はサポートされていない
>     -   多くのハードウェアAPI（例えば、orientationchangeイベント）は利用できない

#### `--headless`

-   **タイプ:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **注意:** CLIでのみ利用可能

これにより、ブラウザがサポートしている場合、テストはデフォルトでヘッドレスモードで実行されます（または無効化することも可能）

#### `--numShards`

-   **タイプ:** `number`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

これはストーリーを実行するために使用される並列インスタンスの数になります。これはあなたの`wdio.conf`ファイルの`maxInstances`によって制限されます。

> [!IMPORTANT]
> `headless`モードで実行する場合、リソース制限によるフレーキーさを防ぐために、数を20以上に増やさないでください

#### `--skipStories`

-   **タイプ:** `string|regex`
-   **必須:** いいえ
-   **デフォルト:** null
-   **例:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

これは以下の形式が可能です：

-   文字列（`example-button--secondary,example-button--small`）
-   または正規表現（`"/.*button.*/gm"`）

特定のストーリーをスキップするためのものです。ストーリーのURLで見つかる`id`を使用します。例えば、このURL `http://localhost:6006/?path=/story/example-page--logged-out`の`id`は`example-page--logged-out`です

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

これはStorybookのバージョンで、デフォルトは`7`です。V6の[`clipSelector`](#clipselector)を使用する必要があるかどうかを知るために必要です。

### Storybook インタラクションテスト

Storybookインタラクションテストでは、WDIOコマンドでカスタムスクリプトを作成して、コンポーネントを特定の状態に設定することができます。例として、以下のコードスニペットをご覧ください：

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

2つの異なるコンポーネントに対して2つのテストが実行されます。各テストではまず状態を設定し、次にスクリーンショットを撮影します。また、新しいカスタムコマンドが導入されていることにも気付くでしょう。これについては[こちら](#new-custom-command)で確認できます。

上記のspecファイルはフォルダに保存し、以下のコマンドでコマンドラインに追加できます：

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybookランナーはまず自動的にStorybookインスタンスをスキャンし、比較する必要があるストーリーにあなたのテストを追加します。インタラクションテストに使用するコンポーネントが2回比較されないようにするには、[`--skipStories`](#--skipstories)フィルターを提供してスキャンから「デフォルト」ストーリーを削除できます。こんな感じになります：

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### 新しいカスタムコマンド

`browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })`という新しいカスタムコマンドが`browser/driver`オブジェクトに追加され、コンポーネントを自動的に読み込み、完了するのを待ちます。そのため`browser.url('url.com')`メソッドを使用する必要はありません。次のように使用できます：

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

オプションは次のとおりです：

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

これにより、StorybookのURLに追加の検索パラメータが追加されます。上記の例では、URLは`http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`になります。
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
-   スクリーンショットが撮影される前に表示されるのを待つ要素

#### `id`

-   **タイプ:** `string`
-   **必須:** はい
-   **例:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

ストーリーのURLで見つかる`id`を使用します。例えば、このURL `http://localhost:6006/?path=/story/example-page--logged-out`の`id`は`example-page--logged-out`です

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

ページ読み込み後にコンポーネントが表示されるのを待つ最大タイムアウト

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

## 貢献

### パッケージの更新

シンプルなCLIツールでパッケージを更新できます。すべての依存関係をインストールしたら、以下を実行できます：

```sh
pnpm update.packages
```

これにより、以下の質問をするCLIがトリガーされます

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

これにより、次のようなログが表示されます

<details>
    <summary>ログの例を見るために開く</summary>
    
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

このプロジェクトへの貢献に関する質問や問題がある場合は、[Discord](https://discord.webdriver.io)サーバーに参加してください。貢献者は`🙏-contributing`チャンネルでつかまえることができます。

### 問題

質問、バグ、機能リクエストがある場合は、Issueを提出してください。Issueを提出する前に、Issueアーカイブを検索して重複を減らし、[FAQ](https://webdriver.io/docs/visual-testing/faq/)を読んでください。

そこで見つからない場合は、以下を提出できるIssueを作成できます：

-   🐛**バグレポート**：改善に役立つレポートを作成する
-   📖**ドキュメント**：改善を提案したり、不足/不明確なドキュメントを報告したりする
-   💡**機能リクエスト**：このモジュールのアイデアを提案する
-   💬**質問**：質問をする

### 開発ワークフロー

このプロジェクトのPRを作成して貢献を開始するには、このステップバイステップガイドに従ってください：

-   プロジェクトをフォークします。
-   プロジェクトをコンピュータのどこかにクローンします

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   ディレクトリに移動してプロジェクトをセットアップします

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   コードを自動的にトランスパイルするウォッチモードを実行します

    ```sh
    $ pnpm watch
    ```

    プロジェクトをビルドするには、次を実行します：

    ```sh
    $ pnpm build
    ```

-   変更によってテストが壊れないことを確認します：

    ```sh
    $ pnpm test
    ```

このプロジェクトは[changesets](https://github.com/changesets/changesets)を使用して、変更ログとリリースを自動的に作成します。

### テスト

モジュールをテストするためにいくつかのテストを実行する必要があります。PRを追加する際には、少なくともローカルテストに合格する必要があります。各PRは自動的にSauce Labsに対してテストされます。[GitHub Actionsパイプライン](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml)をご覧ください。PRを承認する前に、コア貢献者はエミュレータ/シミュレータ/実機に対してPRをテストします。

#### ローカルテスト

まず、ローカルベースラインを作成する必要があります。これは以下で行えます：

```sh
// webdriverプロトコルを使用
$ pnpm run test.local.init
````

このコマンドは`localBaseline`というフォルダを作成し、すべてのベースライン画像を保存します。

次に実行します：

```sh
// webdriverプロトコルを使用
pnpm run test.local.desktop
```

これにより、ローカルマシン上のChromeですべてのテストが実行されます。

#### ローカルStorybookランナーテスト（ベータ版）

まず、ローカルベースラインを作成する必要があります。これは以下で行えます：

```sh
pnpm run test.local.desktop.storybook
```

これにより、ヘッドレスモードのChromeを使用してhttps://govuk-react.github.io/govuk-react/にあるデモStorybookリポジトリに対してStorybookテストが実行されます。

より多くのブラウザでテストを実行するには、次のように実行できます：

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> 実行したいブラウザがローカルマシンにインストールされていることを確認してください

#### Sauce Labsを使用したCIテスト（PRには不要）

以下のコマンドはGitHub Actionsでビルドをテストするために使用されます。ローカル開発には使用できません。

```
$ pnpm run test.saucelabs
```

[ここ](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts)にある多くの設定に対してテストします。
すべてのPRは自動的にSauce Labsに対してチェックされます。

## リリース

上記のパッケージのいずれかのバージョンをリリースするには、次の手順を実行します：

-   [リリースパイプライン](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)をトリガーする
-   リリースPRが生成されたら、別のWebdriverIOメンバーによるレビューと承認を受ける
-   PRをマージする
-   [リリースパイプライン](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)を再度トリガーする
-   新しいバージョンがリリースされるはずです 🎉

## クレジット

`@wdio/visual-testing`は[LambdaTest](https://www.lambdatest.com/)と[Sauce Labs](https://saucelabs.com/)からのオープンソースライセンスを使用しています。