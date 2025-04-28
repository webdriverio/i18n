---
id: visual-testing
title: ビジュアルテスト
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## どのような機能がありますか？

WebdriverIOは、以下の環境での画像比較を提供します：

-   🖥️ デスクトップブラウザ（Chrome / Firefox / Safari / Microsoft Edge）
-   📱 モバイル/タブレットブラウザ（Android エミュレータ上のChrome / iOS シミュレータ上のSafari / シミュレータ / 実機）via Appium
-   📱 ネイティブアプリ（Android エミュレータ / iOS シミュレータ / 実機）via Appium (🌟 **新機能** 🌟)
-   📳 ハイブリッドアプリ via Appium

これらは軽量なWebdriverIOサービスである[`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service)を通じて提供されます。

これにより、以下のことが可能になります：

-   **画面/要素/フルページ**をベースラインと比較または保存する
-   ベースラインがない場合に自動的に**ベースラインを作成**する
-   カスタム領域を**ブロックアウト**し、比較中にステータスバーやツールバー（モバイルのみ）を**自動的に除外**する
-   要素のスクリーンショットのサイズを拡大する
-   ウェブサイト比較中に**テキストを非表示**にして：
    -   **安定性を向上**させ、フォントレンダリングのフレーキネスを防止する
    -   ウェブサイトの**レイアウト**のみに集中する
-   **異なる比較方法**と読みやすいテスト用の**追加のマッチャー**のセットを使用する
-   ウェブサイトが**キーボードでのタブ操作をどのようにサポートするか**を検証する（[ウェブサイトのタブ操作](#tabbing-through-a-website)も参照）
-   その他、[サービス](./visual-testing/service-options)と[メソッド](./visual-testing/method-options)のオプションを参照

このサービスは、すべてのブラウザ/デバイスに必要なデータとスクリーンショットを取得するための軽量モジュールです。比較機能は[ResembleJS](https://github.com/Huddle/Resemble.js)から提供されています。オンラインで画像を比較したい場合は、[オンラインツール](http://rsmbl.github.io/Resemble.js/)をご確認ください。

:::info ネイティブ/ハイブリッドアプリに関する注意
`saveScreen`、`saveElement`、`checkScreen`、`checkElement`メソッドおよび`toMatchScreenSnapshot`、`toMatchElementSnapshot`マッチャーはネイティブアプリ/コンテキストで使用できます。

ハイブリッドアプリに使用する場合は、サービス設定で`isHybridApp:true`プロパティを使用してください。
:::

## インストール

`@wdio/visual-service`を`package.json`にdev-dependencyとして保持するのが最も簡単な方法です：

```sh
npm install --save-dev @wdio/visual-service
```

## 使用方法

`@wdio/visual-service`は通常のサービスとして使用できます。設定ファイルで以下のようにセットアップできます：

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // いくつかのオプション、詳細はドキュメントを参照
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... その他のオプション
            },
        ],
    ],
    // ...
};
```

その他のサービスオプションは[こちら](/docs/visual-testing/service-options)で確認できます。

WebdriverIO設定でセットアップしたら、[テスト](/docs/visual-testing/writing-tests)にビジュアルアサーションを追加できます。

### ケイパビリティ
ビジュアルテストモジュールを使用するには、**ケイパビリティに追加オプションを設定する必要はありません**。ただし、場合によっては、`logName`などの追加メタデータをビジュアルテストに追加したいことがあります。

`logName`を使用すると、各ケイパビリティにカスタム名を割り当てることができ、これを画像ファイル名に含めることができます。これは特に、異なるブラウザ、デバイス、または構成間でスクリーンショットを区別するのに役立ちます。

これを有効にするには、`capabilities`セクションで`logName`を定義し、ビジュアルテストサービスの`formatImageName`オプションがそれを参照するようにします。セットアップ方法は次のとおりです：

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Chromeのカスタムログ名
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Firefoxのカスタムログ名
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // いくつかのオプション、詳細はドキュメントを参照
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // 以下のフォーマットはケイパビリティから`logName`を使用します
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... その他のオプション
            },
        ],
    ],
    // ...
};
```

#### 仕組み
1. `logName`のセットアップ：

    - `capabilities`セクションで、各ブラウザまたはデバイスに一意の`logName`を割り当てます。例えば、`chrome-mac-15`はmacOSバージョン15のChromeで実行されるテストを識別します。

2. カスタム画像の命名：

    - `formatImageName`オプションは`logName`をスクリーンショットのファイル名に統合します。例えば、`tag`がhomepageで解像度が`1920x1080`の場合、結果のファイル名は次のようになります：

        `homepage-chrome-mac-15-1920x1080.png`

3. カスタム命名の利点：

    - 異なるブラウザやデバイスからのスクリーンショットを区別することが非常に簡単になり、特にベースラインの管理や不一致のデバッグ時に役立ちます。

4. デフォルトに関する注意：

    - `logName`がケイパビリティで設定されていない場合、`formatImageName`オプションはファイル名に空の文字列として表示されます（`homepage--15-1920x1080.png`）

### WebdriverIO MultiRemote

[MultiRemote](https://webdriver.io/docs/multiremote/)もサポートしています。これを適切に機能させるには、以下のように`wdio-ics:options`をケイパビリティに追加してください。これにより、各スクリーンショットが独自の一意の名前を持つようになります。

[テストの記述](/docs/visual-testing/writing-tests)は[testrunner](https://webdriver.io/docs/testrunner)の使用と比較して違いはありません。

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // これが重要です！
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // これが重要です！
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### プログラムによる実行

以下は`remote`オプションを介して`@wdio/visual-service`を使用する最小限の例です：

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// サービスを「開始」してカスタムコマンドを`browser`に追加
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// スクリーンショットの保存のみの場合はこれを使用
await browser.saveFullPageScreen("examplePaged", {});

// 検証には次のように使用します。両方のメソッドを組み合わせる必要はありません、FAQを参照
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### ウェブサイトのタブ操作

キーボードの<kbd>TAB</kbd>キーを使用してウェブサイトがアクセシブルかどうかを確認できます。アクセシビリティのこの部分のテストは常に時間のかかる（手動）作業であり、自動化を通じて行うのは非常に難しいものでした。
`saveTabbablePage`と`checkTabbablePage`メソッドを使用すると、ウェブサイト上に線と点を描画してタブ順序を確認できるようになりました。

これはデスクトップブラウザにのみ有効であり、モバイルデバイスには**利用できない**ことに注意してください。すべてのデスクトップブラウザはこの機能をサポートしています。

:::note

この機能は[Viv Richards](https://github.com/vivrichards600)の["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)というブログ記事に触発されています。

タブ可能な要素の選択方法は[tabbable](https://github.com/davidtheclark/tabbable)モジュールに基づいています。タブ操作に関する問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に[More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)セクションを確認してください。

:::

#### 仕組み

両方のメソッドはウェブサイトに`canvas`要素を作成し、エンドユーザーがTABを使用した場合にどこに移動するかを示す線と点を描画します。その後、フローの良い概要を提供するためにフルページスクリーンショットを作成します。

:::important

**スクリーンショットを作成する必要があり、ベースライン画像と比較したくない場合にのみ`saveTabbablePage`を使用してください**。

:::

タブ操作のフローをベースラインと比較したい場合は、`checkTabbablePage`メソッドを使用できます。2つのメソッドを一緒に使用する**必要はありません**。すでにベースライン画像が作成されている場合（サービスをインスタンス化するときに`autoSaveBaseline: true`を提供することで自動的に行うことができます）、
`checkTabbablePage`はまず_実際の_画像を作成し、それをベースラインと比較します。

##### オプション

両方のメソッドは[`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage)または
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage)と同じオプションを使用します。

#### 例

これは[ギニアピッグウェブサイト](https://guinea-pig.webdriver.io/image-compare.html)でタブ操作がどのように機能するかの例です：

![WDIOタブ操作の例](/img/visual/tabbable-chrome-latest-1366x768.png)

### 失敗したビジュアルスナップショットの自動更新

コマンドラインに引数`--update-visual-baseline`を追加してベースライン画像を更新します。これにより

-   自動的に実際に撮影されたスクリーンショットをコピーしてベースラインフォルダに配置します
-   差異がある場合でも、ベースラインが更新されたため、テストは合格します

**使用方法：**

```sh
npm run test.local.desktop  --update-visual-baseline
```

ログをinfo/debugモードで実行すると、次のログが追加されます

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## TypeScriptサポート

このモジュールはTypeScriptをサポートしており、ビジュアルテストサービスを使用する際に自動補完、型安全性、改善された開発者エクスペリエンスの恩恵を受けることができます。

### ステップ1：型定義の追加
TypeScriptがモジュールの型を認識するようにするには、tsconfig.jsonのtypesフィールドに次のエントリを追加してください：

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### ステップ2：サービスオプションの型安全性を有効にする
サービスオプションの型チェックを強制するには、WebdriverIO設定を更新してください：

```ts
// wdio.conf.ts
import { join } from 'node:path';
// 型定義をインポート
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // サービスオプション
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // 型安全性を確保
        ],
    ],
    // ...
};
```

## システム要件

### バージョン5以降

バージョン5以降では、このモジュールは純粋なJavaScriptベースのモジュールであり、一般的な[プロジェクト要件](/docs/gettingstarted#system-requirements)以外に追加のシステム依存関係はありません。これは[Jimp](https://github.com/jimp-dev/jimp)を使用しており、JavaScriptですべて記述されたNodeのための画像処理ライブラリであり、ネイティブ依存関係はゼロです。

### バージョン4以前

バージョン4以前では、このモジュールはNode.js用のキャンバス実装である[Canvas](https://github.com/Automattic/node-canvas)に依存しています。Canvasは[Cairo](https://cairographics.org/)に依存しています。

#### インストールの詳細

デフォルトでは、macOS、Linux、Windows用のバイナリがプロジェクトの`npm install`中にダウンロードされます。サポートされているOSやプロセッサアーキテクチャがない場合、モジュールはシステム上でコンパイルされます。これにはCairoやPangoなどのいくつかの依存関係が必要です。

詳細なインストール情報については、[node-canvasのwiki](https://github.com/Automattic/node-canvas/wiki/_pages)を参照してください。以下は一般的なオペレーティングシステム向けの一行インストール手順です。`libgif/giflib`、`librsvg`、`libjpeg`はオプションであり、それぞれGIF、SVG、JPEGサポートにのみ必要です。Cairo v1.10.0以降が必要です。

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     [Homebrew](https://brew.sh/)を使用：

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** 最近Mac OS X v10.11+にアップデートして、コンパイル時に問題が発生している場合は、次のコマンドを実行してください： `xcode-select --install`。この問題については[Stack Overflow](http://stackoverflow.com/a/32929012/148072)で詳細を読むことができます。
    Xcode 10.0以上がインストールされている場合、ソースからビルドするにはNPM 6.4.1以上が必要です。

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)を参照してください

</TabItem>
<TabItem value="others">

    [wiki](https://github.com/Automattic/node-canvas/wiki)を参照してください

</TabItem>
</Tabs>