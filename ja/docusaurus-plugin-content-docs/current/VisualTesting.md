---
id: visual-testing
title: ビジュアルテスト
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## どんなことができるの？

WebdriverIOは、以下のためのスクリーン、要素、またはフルページの画像比較を提供します

-   🖥️ デスクトップブラウザ（Chrome / Firefox / Safari / Microsoft Edge）
-   📱 モバイル/タブレットブラウザ（Android エミュレータ上のChrome / iOS シミュレータ上のSafari / シミュレータ / 実機）via Appium
-   📱 ネイティブアプリ（Android エミュレータ / iOS シミュレータ / 実機）via Appium（🌟 **新機能** 🌟）
-   📳 ハイブリッドアプリ via Appium

これらは軽量なWebdriverIOサービスである[`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service)を通じて提供されます。

これにより以下のことが可能になります：

-   **スクリーン/要素/フルページ**のスクリーンショットをベースラインと比較して保存
-   ベースラインがない場合に自動的に**ベースラインを作成**
-   カスタム領域を**ブロックアウト**し、比較中にステータスバーやツールバー（モバイルのみ）を**自動的に除外**
-   要素のスクリーンショットのサイズを拡大
-   ウェブサイト比較中に**テキストを非表示**にして：
    -   **安定性を向上**させ、フォントのレンダリングのちらつきを防止
    -   ウェブサイトの**レイアウト**にのみ焦点を当てる
-   **異なる比較メソッド**と、より読みやすいテストのための**追加のマッチャー**セットを使用
-   あなたのウェブサイトが**キーボードのタブ操作をどのようにサポートするか**を検証（[ウェブサイトでのタブ操作](#tabbing-through-a-website)も参照）
-   その他多くの機能（[サービス](./visual-testing/service-options)と[メソッド](./visual-testing/method-options)のオプションを参照）

このサービスは、すべてのブラウザ/デバイスに必要なデータとスクリーンショットを取得するための軽量モジュールです。比較機能は[ResembleJS](https://github.com/Huddle/Resemble.js)から提供されています。オンラインで画像を比較したい場合は、[オンラインツール](http://rsmbl.github.io/Resemble.js/)を確認してください。

:::info ネイティブ/ハイブリッドアプリに関する注意
`saveScreen`、`saveElement`、`checkScreen`、`checkElement`のメソッドと、`toMatchScreenSnapshot`および`toMatchElementSnapshot`のマッチャーはネイティブアプリ/コンテキストで使用できます。

ハイブリッドアプリで使用する場合は、サービス設定で`isHybridApp:true`プロパティを使用してください。
:::

## インストール

`@wdio/visual-service`を`package.json`にdev-dependencyとして保持するのが最も簡単な方法です：

```sh
npm install --save-dev @wdio/visual-service
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
ビジュアルテストモジュールを使用するには、**ケイパビリティに追加のオプションを追加する必要はありません**。ただし、場合によっては、`logName`などの追加メタデータをビジュアルテストに追加したいことがあります。

`logName`を使用すると、各ケイパビリティにカスタム名を割り当てることができ、画像ファイル名に含めることができます。これは、異なるブラウザ、デバイス、または構成間で撮影したスクリーンショットを区別するのに特に役立ちます。

これを有効にするには、`capabilities`セクションで`logName`を定義し、ビジュアルテストサービスの`formatImageName`オプションでそれを参照するようにします。設定方法は次のとおりです：

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
                // 以下のフォーマットはケイパビリティからの`logName`を使用します
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

    - `capabilities`セクションで、各ブラウザまたはデバイスに一意の`logName`を割り当てます。例えば、`chrome-mac-15`はmacOS バージョン15上のChromeで実行されるテストを識別します。

2. カスタム画像の命名：

    - `formatImageName`オプションは`logName`をスクリーンショットのファイル名に統合します。例えば、`tag`がhomepageで解像度が`1920x1080`の場合、結果のファイル名は次のようになります：

        `homepage-chrome-mac-15-1920x1080.png`

3. カスタム命名の利点：

    - 異なるブラウザやデバイスからのスクリーンショットを区別することがはるかに簡単になり、特にベースラインの管理や不一致のデバッグに役立ちます。

4. デフォルトに関する注意：

    - `logName`がケイパビリティで設定されていない場合、`formatImageName`オプションはファイル名に空の文字列として表示します（`homepage--15-1920x1080.png`）

### WebdriverIO MultiRemote

[MultiRemote](https://webdriver.io/docs/multiremote/)もサポートしています。これを適切に機能させるには、以下のように`wdio-ics:options`をケイパビリティに追加してください。これにより、各スクリーンショットが独自の一意の名前を持つようになります。

[テストの記述](/docs/visual-testing/writing-tests)は[testrunner](https://webdriver.io/docs/testrunner)の使用と比較して異なることはありません。

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
                // これを追加！
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
                // これを追加！
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### プログラムで実行

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

// カスタムコマンドを`browser`に追加するためにサービスを「開始」する
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// スクリーンショットを保存するためだけに使用する場合
await browser.saveFullPageScreen("examplePaged", {});

// または検証に使用する場合。両方のメソッドを組み合わせる必要はありません、FAQを参照
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### ウェブサイトでのタブ操作

キーボードの<kbd>TAB</kbd>キーを使用してウェブサイトがアクセス可能かどうかを確認できます。アクセシビリティのこの部分をテストすることは常に時間のかかる（手動の）作業であり、自動化を通じて行うのは非常に難しいものでした。
`saveTabbablePage`および`checkTabbablePage`メソッドを使用すると、ウェブサイト上に線と点を描画してタブ移動順序を確認できるようになりました。

これはデスクトップブラウザにのみ有用であり、モバイルデバイスには**使用できない**点に注意してください。すべてのデスクトップブラウザはこの機能をサポートしています。

:::note

この機能は[Viv Richards](https://github.com/vivrichards600)のブログ記事["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)からインスピレーションを得ています。

タブ可能な要素の選択方法は[tabbable](https://github.com/davidtheclark/tabbable)モジュールに基づいています。タブ操作に関する問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に[詳細](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)セクションを確認してください。

:::

#### 仕組み

両方のメソッドはウェブサイト上に`canvas`要素を作成し、エンドユーザーがTABを使用した場合の移動先を示す線と点を描画します。その後、全体の流れを把握するためにフルページスクリーンショットを作成します。

:::important

**スクリーンショットを作成するだけで、**ベースライン**画像と比較したくない場合にのみ`saveTabbablePage`を使用してください。**

:::

タブ移動の流れをベースラインと比較したい場合は、`checkTabbablePage`メソッドを使用できます。2つのメソッドを一緒に使用する**必要はありません**。サービスをインスタンス化するときに`autoSaveBaseline: true`を提供することで自動的に作成できるベースライン画像がすでに存在する場合、
`checkTabbablePage`はまず_実際の_画像を作成し、それをベースラインと比較します。

##### オプション

両方のメソッドは[`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage)または
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage)と同じオプションを使用します。

#### 例

これは[テスト用ウェブサイト](https://guinea-pig.webdriver.io/image-compare.html)でのタブ操作の例です：

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### 失敗したビジュアルスナップショットを自動的に更新する

コマンドラインに引数`--update-visual-baseline`を追加してベースライン画像を更新します。これにより

-   実際に取得したスクリーンショットを自動的にコピーしてベースラインフォルダに配置
-   差分がある場合でも、ベースラインが更新されたためテストは合格となります

**使用方法：**

```sh
npm run test.local.desktop  --update-visual-baseline
```

ログのinfo/debugモードで実行すると、以下のようなログが追加されます

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Typescriptサポート

このモジュールはTypeScriptをサポートしており、ビジュアルテストサービスを使用する際に自動補完、型安全性、および改善された開発者エクスペリエンスの恩恵を受けることができます。

### ステップ1：型定義の追加
TypeScriptがモジュールの型を認識するようにするには、tsconfig.jsonのtypesフィールドに次のエントリを追加します：

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### ステップ2：サービスオプションの型安全性を有効にする
サービスオプションの型チェックを強制するには、WebdriverIO設定を更新します：

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

バージョン5以降、このモジュールは一般的な[プロジェクト要件](/docs/gettingstarted#system-requirements)以外に追加のシステム依存関係がない純粋なJavaScriptベースのモジュールです。画像処理ライブラリとして[Jimp](https://github.com/jimp-dev/jimp)を使用しており、これは完全にJavaScriptで書かれたNodeのライブラリで、ネイティブな依存関係はありません。

### バージョン4以下

バージョン4以下では、このモジュールはNode.js用のキャンバス実装である[Canvas](https://github.com/Automattic/node-canvas)に依存しています。Canvasは[Cairo](https://cairographics.org/)に依存しています。

#### インストールの詳細

デフォルトでは、macOS、Linux、およびWindows用のバイナリがプロジェクトの`npm install`中にダウンロードされます。サポートされているOSやプロセッサアーキテクチャがない場合、モジュールはシステム上でコンパイルされます。これにはCairoやPangoを含むいくつかの依存関係が必要です。

詳細なインストール情報については、[node-canvasのwiki](https://github.com/Automattic/node-canvas/wiki/_pages)を参照してください。以下は一般的なオペレーティングシステム用のワンラインインストール手順です。`libgif/giflib`、`librsvg`、`libjpeg`はオプションであり、それぞれGIF、SVG、JPEGサポートにのみ必要です。Cairo v1.10.0以降が必要です。

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

    **Mac OS X v10.11+:** 最近Mac OS X v10.11+に更新して問題が発生している場合は、次のコマンドを実行してください：`xcode-select --install`。この問題の詳細については[Stack Overflow](http://stackoverflow.com/a/32929012/148072)を参照してください。
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