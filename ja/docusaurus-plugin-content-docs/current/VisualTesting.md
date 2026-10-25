---
id: visual-testing
title: ビジュアルテスト
description: "@wdio/visual-serviceを使用して、画面、要素、またはフルページのスクリーンショットをベースラインと比較します。インストール方法と使用方法を含みます。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 何ができるのか？

WebdriverIOは、以下の環境で画面、要素、またはフルページの画像比較を提供します

-   🖥️ デスクトップブラウザ（Chrome / Firefox / Safari / Microsoft Edge）
-   📱 Appium経由のモバイル / タブレットブラウザ（Androidエミュレータ上のChrome / iOSシミュレータ上のSafari / シミュレータ / 実機）
-   📱 Appium経由のネイティブアプリ（Androidエミュレータ / iOSシミュレータ / 実機）（🌟 **新機能** 🌟）
-   📳 Appium経由のハイブリッドアプリ

これらは軽量なWebdriverIOサービスである[`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service)を通じて提供されます。

これにより、以下のことが可能になります：

-   **画面/要素/フルページ**のスクリーンショットを保存したり、ベースラインと比較したりする
-   ベースラインが存在しない場合に自動的に**ベースラインを作成**する
-   比較時に**カスタム領域をブロックアウト**し、さらにステータスバーやツールバー（モバイルのみ）を**自動的に除外**する
-   要素のスクリーンショットのサイズを拡大する
-   ウェブサイト比較時に**テキストを非表示**にして：
    -   **安定性を向上**させ、フォントレンダリングの不安定さを防ぐ
    -   ウェブサイトの**レイアウト**のみに焦点を当てる
-   **異なる比較方法**や、テストを読みやすくするための**追加のマッチャー**を使用する
-   ウェブサイトが**キーボードでのタブ移動をどのようにサポートするか**を検証する。[ウェブサイトのタブ移動](#tabbing-through-a-website)も参照してください
-   その他多数。[サービス](./visual-testing/service-options)と[メソッド](./visual-testing/method-options)のオプションを参照してください

このサービスは、すべてのブラウザ/デバイスに必要なデータとスクリーンショットを取得するための軽量モジュールです。比較機能は、高速で正確な知覚的画像比較ライブラリである[Pixelmatch](https://github.com/mapbox/pixelmatch)によるものです。v11以降では、OKLab色空間でHyAB距離（pixelmatch 8）を使用して色の差異を測定しており、これは人間の色の見え方により近いものです。画像は、ネイティブ依存関係のないPNGコーデックである[fast-png](https://github.com/image-js/fast-png)で処理されます。

:::info ネイティブ/ハイブリッドアプリに関する注意
メソッド`saveScreen`、`saveElement`、`checkScreen`、`checkElement`およびマッチャー`toMatchScreenSnapshot`と`toMatchElementSnapshot`は、ネイティブアプリ/コンテキストで使用できます。

ハイブリッドアプリで使用する場合は、サービス設定でプロパティ`isHybridApp:true`を使用してください。
:::

:::caution v10からアップグレードしますか？

`@wdio/visual-service` **v11**は**WebdriverIO v10**（およびNode.js 22.19以降）のみをサポートしています。WebdriverIO v9を使用する場合は、`@wdio/visual-service@10`のままにしてください。

v11では、YIQの代わりにpixelmatch 8（OKLab色空間、HyAB距離）で色を比較します。しきい値のスケールと`ignore*`プリセットは変更されていませんが、同じ画像でも**不一致率がv10と若干異なる場合があります**。テストコードを変更する必要はありません。チェックが正確な不一致率や厳しい許容値に依存している場合は、アップグレード後に再確認してください。

v11の一部の修正により、ベースラインが一度変更される場合もあります：

-   **大きな要素のiOS要素スクリーンショット：** ビューポート内に完全に収まっていない要素の場合、画像は要素全体のサイズでしたが、ビューポート外の部分は黒くなっていました（[appium/appium#22939](https://github.com/appium/appium/issues/22939)）。現在は、Androidと同様に、画像には要素の表示部分のみが含まれます。
-   **`biDiOrigin: 'viewport'`を使用した要素スクリーンショット：** WebDriver BiDiセッションでは、ページがスクロールされている場合でも、スクリーンショットは要素自体を切り取るようになりました。
-   **スクロールの復元：** 要素チェック（`autoElementScroll`使用時）とフルページチェックは、ページを元の位置にスクロールして戻すようになりました。その直後に実行されるビューポートチェックでは、異なる画像が得られる可能性があります。

すべての変更については、[v11移行ガイド](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md)を参照してください。

:::

:::caution v9（またはそれ以前）からアップグレードしますか？

`@wdio/visual-service` **v10**では、比較エンジンが**ResembleJS**から**[Pixelmatch](https://github.com/mapbox/pixelmatch)**に変更されました。Pixelmatchは生のRGBではなく知覚的な（YIQ）カラーモデルを使用するため、不一致率はv9とは異なります。これは以下を意味します：

-   **テストコードを変更する必要はありません。** すべてのメソッド名、オプション名、マッチャーは同一です。
-   **ベースライン画像の更新が必要になる場合があります。** アップグレード後、テストスイートを実行して視覚的な差分を確認してください。失敗した個々のベースラインは`--update-visual-baseline`で更新するか、ベースラインフォルダ全体を削除して`autoSaveBaseline`で一から再作成させることができます。詳細については[FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline)を参照してください。

:::

## インストール

最も簡単な方法は、以下のコマンドで`@wdio/visual-service`を`package.json`のdev-dependencyとして追加することです：

```sh
npm install --save-dev @wdio/visual-service
```

これによりv11がインストールされますが、v11にはWebdriverIO v10が必要です。WebdriverIO v9のプロジェクトでは、サービスのv10をインストールしてください：

```sh
npm install --save-dev @wdio/visual-service@10
```

## 使用方法

`@wdio/visual-service`は通常のサービスとして使用できます。設定ファイルで以下のように設定できます：

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
                // いくつかのオプション。詳細はドキュメントを参照
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

WebdriverIOの設定が完了したら、[テスト](/docs/visual-testing/writing-tests)にビジュアルアサーションを追加できます。

### Capabilities
Visual Testingモジュールを使用するために、**capabilitiesに追加のオプションを加える必要はありません**。ただし、場合によっては、`logName`などの追加のメタデータをビジュアルテストに追加したいことがあります。

`logName`を使用すると、各capabilityにカスタム名を割り当て、それを画像ファイル名に含めることができます。これは、異なるブラウザ、デバイス、または設定で撮影されたスクリーンショットを区別するのに特に便利です。

これを有効にするには、`capabilities`セクションで`logName`を定義し、Visual Testingサービスの`formatImageName`オプションがそれを参照するようにします。設定方法は以下の通りです：

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
                logName: 'chrome-mac-15', // Chrome用のカスタムログ名
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Firefox用のカスタムログ名
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // いくつかのオプション。詳細はドキュメントを参照
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // 以下のフォーマットはcapabilitiesの`logName`を使用します
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... その他のオプション
            },
        ],
    ],
    // ...
};
```

#### 仕組み
1. `logName`の設定：

    - `capabilities`セクションで、各ブラウザまたはデバイスに一意の`logName`を割り当てます。例えば、`chrome-mac-15`はmacOSバージョン15上のChromeで実行されるテストを識別します。

2. カスタム画像命名：

    - `formatImageName`オプションは、`logName`をスクリーンショットのファイル名に組み込みます。例えば、`tag`がhomepageで解像度が`1920x1080`の場合、生成されるファイル名は次のようになります：

        `homepage-chrome-mac-15-1920x1080.png`

3. カスタム命名の利点：

    - 異なるブラウザやデバイスのスクリーンショットの区別がはるかに簡単になり、特にベースラインの管理や不一致のデバッグ時に役立ちます。

4. デフォルトに関する注意：

    -capabilitiesで`logName`が設定されていない場合、`formatImageName`オプションはファイル名内でそれを空の文字列として表示します（`homepage--15-1920x1080.png`）

### WebdriverIO マルチリモート

[マルチリモート](https://webdriver.io/docs/multiremote/)もサポートしています。これを正しく機能させるには、以下のようにcapabilitiesに`wdio-ics:options`を追加してください。これにより、各スクリーンショットに一意の名前が付けられます。

[テストの作成](/docs/visual-testing/writing-tests)は、[テストランナー](https://webdriver.io/docs/testrunner)を使用する場合と何も変わりません

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
                // これ!!!
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
                // これ!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### プログラムによる実行

以下は、`remote`オプションを介して`@wdio/visual-service`を使用する最小限の例です：

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

// サービスを「開始」して、カスタムコマンドを`browser`に追加します
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// スクリーンショットを保存するだけの場合はこちらを使用
await browser.saveFullPageScreen("examplePaged", {});

// 検証する場合はこちらを使用。両方のメソッドを組み合わせる必要はありません。FAQを参照してください
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### ウェブサイトのタブ移動

キーボードの<kbd>TAB</kbd>キーを使用して、ウェブサイトがアクセシブルかどうかを確認できます。アクセシビリティのこの部分のテストは、これまで常に時間のかかる（手動の）作業であり、自動化で行うのはかなり困難でした。
`saveTabbablePage`と`checkTabbablePage`メソッドを使用すると、ウェブサイト上に線と点を描画してタブ順序を検証できるようになりました。

これはデスクトップブラウザでのみ有用であり、モバイルデバイスでは**有用ではない\*\***ことに注意してください。すべてのデスクトップブラウザがこの機能をサポートしています。

:::note

この機能は、[Viv Richards](https://github.com/vivrichards600)のブログ記事["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)に触発されたものです。

タブ移動可能な要素の選択方法は、モジュール[tabbable](https://github.com/davidtheclark/tabbable)に基づいています。タブ移動に関して問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に[More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Detailsセクションを確認してください。

:::

#### 仕組み

どちらのメソッドもウェブサイト上に`canvas`要素を作成し、エンドユーザーがTABを使用した場合にどこに移動するかを示す線と点を描画します。その後、フローの全体像を把握できるようにフルページのスクリーンショットを作成します。

:::important

**スクリーンショットを作成する必要があり、**ベースライン**画像と比較したく**ない**場合にのみ、`saveTabbablePage`を使用してください。\*\*\*\*

:::

タブ移動のフローをベースラインと比較したい場合は、`checkTabbablePage`メソッドを使用できます。2つのメソッドを一緒に使用する必要は**ありません**。サービスのインスタンス化時に`autoSaveBaseline: true`を指定することで自動的に作成できるベースライン画像が既に存在する場合、
`checkTabbablePage`はまず_実際の_画像を作成し、それをベースラインと比較します。

##### オプション

どちらのメソッドも、`saveFullPageScreen`または`compareFullPageScreen`と同じオプションを使用します。

#### 例

以下は、[guinea pigウェブサイト](https://guinea-pig.webdriver.io/image-compare.html)でタブ移動がどのように機能するかの例です：

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### 失敗したビジュアルスナップショットの自動更新

コマンドラインで引数`--update-visual-baseline`を追加することで、ベースライン画像を更新できます。これにより、

-   撮影された実際のスクリーンショットを自動的にコピーしてベースラインフォルダに配置します
-   差異がある場合でも、ベースラインが更新されたためテストは合格となります

**使用方法：**

```sh
npm run test.local.desktop  --update-visual-baseline
```

ログをinfo/debugモードで実行すると、以下のログが追加されます

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

このモジュールにはTypeScriptサポートが含まれており、Visual Testingサービスを使用する際に、自動補完、型安全性、および開発者体験の向上の恩恵を受けることができます。

### ステップ1：型定義を追加する
TypeScriptがモジュールの型を認識できるようにするには、tsconfig.jsonのtypesフィールドに次のエントリを追加します：

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### ステップ2：サービスオプションの型安全性を有効にする
サービスオプションに型チェックを適用するには、WebdriverIOの設定を更新します：

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

### バージョン10以降（現行）

バージョン10以降では、このモジュールには一般的な[プロジェクト要件](/docs/gettingstarted#system-requirements)以外の追加のシステム依存関係はありません。知覚的画像比較には[Pixelmatch](https://github.com/mapbox/pixelmatch)を、画像のエンコード/デコードには[fast-png](https://github.com/image-js/fast-png)を使用しています。どちらもネイティブ依存関係のない純粋なJavaScriptです。

バージョン11にはWebdriverIO v10とNode.js 22.19以降が必要です。バージョン10はWebdriverIO v9（9.29.1以降）およびv10で動作します。

### バージョン5から9（レガシー）

バージョン5から9では、完全にJavaScriptで書かれ、ネイティブ依存関係のないNode用の画像処理ライブラリである[Jimp](https://github.com/jimp-dev/jimp)を使用していました。追加のシステム依存関係は必要ありませんでした。

### バージョン4以前

バージョン4以前では、このモジュールはNode.js用のcanvas実装である[Canvas](https://github.com/Automattic/node-canvas)に依存しています。Canvasは[Cairo](https://cairographics.org/)に依存しています。

#### インストールの詳細

デフォルトでは、プロジェクトの`npm install`時にmacOS、Linux、Windows用のバイナリがダウンロードされます。サポートされていないOSまたはプロセッサアーキテクチャを使用している場合、モジュールはシステム上でコンパイルされます。これにはCairoやPangoなど、いくつかの依存関係が必要です。

詳細なインストール情報については、[node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages)を参照してください。以下は、一般的なオペレーティングシステム向けの1行のインストール手順です。`libgif/giflib`、`librsvg`、`libjpeg`はオプションであり、それぞれGIF、SVG、JPEGのサポートにのみ必要であることに注意してください。Cairo v1.10.0以降が必要です。

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

     [Homebrew](https://brew.sh/)を使用する場合：

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+：** 最近Mac OS X v10.11+にアップデートし、コンパイル時に問題が発生している場合は、次のコマンドを実行してください：`xcode-select --install`。この問題の詳細は[Stack Overflow](http://stackoverflow.com/a/32929012/148072)をご覧ください。
    Xcode 10.0以降がインストールされている場合、ソースからビルドするにはNPM 6.4.1以降が必要です。

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