---
id: service-options
title: サービスオプション
---

サービスオプションは、サービスがインスタンス化されるときに設定でき、各メソッド呼び出しに使用されるオプションです。

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // オプション
            },
        ],
    ],
    // ...
};
```

## デフォルトオプション

### `addressBarShadowPadding`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** `6`
-   **サポート:** Web

iOSとAndroidでビューポートを適切に切り取るためにアドレスバーに追加する必要があるパディングです。

### `autoElementScroll`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **サポート:** Web、ハイブリッドアプリ（Webview）

このオプションを使用すると、要素のスクリーンショットが作成されるときに要素を自動的にビューにスクロールする機能を無効にできます。

### `addIOSBezelCorners`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

iOSデバイスのスクリーンショットにベゼルコーナーとノッチ/ダイナミックアイランドを追加します。

:::info 注意
これは、デバイス名が**自動的に**決定でき、次の正規化されたデバイス名リストに一致する場合にのみ実行できます。正規化はこのモジュールによって行われます。
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

比較中にベースライン画像が見つからない場合、画像は自動的にベースラインフォルダにコピーされます。

### `baselineFolder`

-   **型:** `string|()=> string`
-   **必須:** いいえ
-   **デフォルト:** `.path/to/testfile/__snapshots__/`
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

比較中に使用されるすべてのベースライン画像を保持するディレクトリです。設定されていない場合、デフォルト値が使用され、ビジュアルテストを実行するspecファイルの隣にある`__snapshots__/`フォルダにファイルが格納されます。`string`を返す関数を使用して`baselineFolder`値を設定することもできます：

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// または
{
    baselineFolder: () => {
        // ここで何かの処理をする
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

初期化時にランタイムフォルダ（`actual` & `diff`）を削除します

:::info 注意
これは[`screenshotPath`](#screenshotpath)がプラグインオプションを通じて設定されている場合にのみ機能し、メソッドでフォルダを設定した場合は**機能しません**
:::

### `createJsonReportFiles` **(新機能)**

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`

比較結果をJSONレポートファイルにエクスポートするオプションがあります。`createJsonReportFiles: true`オプションを提供することで、比較される各画像がレポートを生成し、`actual`フォルダ内の各`actual`画像結果の隣に保存されます。出力は次のようになります：

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

すべてのテストが実行されると、比較のコレクションを含む新しいJSONファイルが生成され、`actual`フォルダのルートに保存されます。データは以下のようにグループ化されます：

-   Jasmine/Mochaの場合は`describe`、CucumberJSの場合は`Feature`
-   Jasmine/Mochaの場合は`it`、CucumberJSの場合は`Scenario`
    そして以下の順で並べられます：
-   `commandName`：画像を比較するために使用される比較メソッド名
-   `instanceData`：最初にブラウザ、次にデバイス、そしてプラットフォーム
    次のようになります

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

レポートデータは、すべての処理やデータ収集を自分で行うことなく、独自のビジュアルレポートを構築する機会を提供します。

:::info 注意
`@wdio/visual-testing`バージョン`5.2.0`以降を使用する必要があります
:::

### `disableBlinkingCursor`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべての`input`、`textarea`、`[contenteditable]`のキャレット「点滅」を有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にキャレットが`transparent`に設定され、完了時にリセットされます

### `disableCSSAnimation`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web、ハイブリッドアプリ（Webview）

アプリケーション内のすべてのCSSアニメーションを有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にすべてのアニメーションが無効になり、完了時にリセットされます

### `enableLayoutTesting`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web

これによりページ上のすべてのテキストが非表示になり、比較にはレイアウトのみが使用されます。非表示は、**すべての**要素にスタイル`'color': 'transparent !important'`を追加することで行われます。

出力については[テスト出力](/docs/visual-testing/test-output#enablelayouttesting)を参照してください

:::info
このフラグを使用すると、テキストを含む各要素（つまり`p, h1, h2, h3, h4, h5, h6, span, a, li`だけでなく、`div|button|..`も）にこのプロパティが設定されます。これを調整するオプションは**ありません**。
:::

### `formatImageName`

-   **型:** `string`
-   **必須:** いいえ
-   **デフォルト:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

保存される画像の名前は、以下のような形式の文字列で`formatImageName`パラメータを渡すことでカスタマイズできます：

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

文字列の形式を指定するために以下の変数を渡すことができ、自動的にインスタンス機能から読み取られます。
これらが決定できない場合は、デフォルト値が使用されます。

-   `browserName`: 提供された機能のブラウザ名
-   `browserVersion`: 機能で提供されたブラウザのバージョン
-   `deviceName`: 機能からのデバイス名
-   `dpr`: デバイスピクセル比
-   `height`: 画面の高さ
-   `logName`: 機能からのlogName
-   `mobile`: アプリのスクリーンショットとブラウザのスクリーンショットを区別するために、`deviceName`の後に`_app`またはブラウザ名を追加します
-   `platformName`: 提供された機能のプラットフォーム名
-   `platformVersion`: 機能で提供されたプラットフォームのバージョン
-   `tag`: 呼び出されているメソッドで提供されるタグ
-   `width`: 画面の幅

:::info

`formatImageName`ではカスタムパス/フォルダを提供できません。パスを変更したい場合は、以下のオプションを変更してください：

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- メソッドごとの[`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** `1500`
-   **サポート:** Web

スクロール後に待機するミリ秒単位のタイムアウトです。これは遅延読み込みのあるページを識別するのに役立つ場合があります。

:::info

これはサービス/メソッドオプション`userBasedFullPageScreenshot`が`true`に設定されている場合にのみ機能します。[`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)も参照してください

:::

### `hideScrollBars`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **サポート:** Web、ハイブリッドアプリ（Webview）

アプリケーションのスクロールバーを非表示にします。`true`に設定すると、スクリーンショットを撮る前にすべてのスクロールバーが無効になります。これは余分な問題を防ぐためにデフォルトで`true`に設定されています。

### `logLevel`

-   **型:** `string`
-   **必須:** いいえ
-   **デフォルト:** `info`
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

追加のログを出力します。オプションは`debug | info | warn | silent`です

エラーは常にコンソールに記録されます。

### `savePerInstance`

-   **型:** `boolean`
-   **デフォルト:** `false`
-   **必須:** いいえ
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

画像をインスタンスごとに別のフォルダに保存します。例えば、すべてのChromeのスクリーンショットは`desktop_chrome`のようなChromeフォルダに保存されます。

### `screenshotPath`

-   **型:** `string | () => string`
-   **デフォルト:** `.tmp/`
-   **必須:** いいえ
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ

すべての実際/異なるスクリーンショットを保持するディレクトリです。設定されていない場合、デフォルト値が使用されます。screenshotPathの値を設定するために、
文字列を返す関数も使用できます：

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// または
{
    screenshotPath: () => {
        // ここで何かの処理をする
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** Androidの場合は`6`、iOSの場合は`15`（デフォルトでは`6`、ノッチ付きiPhoneやホームバーのあるiPadの場合は可能性のあるホームバー用に`9`が自動的に追加されます）
-   **サポート:** Web

iOSとAndroidのツールバーに追加する必要があるパディングで、ビューポートを適切に切り取るためのものです。

### `userBasedFullPageScreenshot`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `false`
-   **サポート:** Web、ハイブリッドアプリ（Webview）**visual-service@7.0.0で導入**

デフォルトでは、デスクトップWebのフルページスクリーンショットはWebDriver BiDiプロトコルを使用してキャプチャされ、スクロールなしで高速で安定した一貫したスクリーンショットが可能になります。
userBasedFullPageScreenshotが`true`に設定されている場合、スクリーンショットプロセスは実際のユーザーをシミュレートします：ページをスクロールし、ビューポートサイズのスクリーンショットをキャプチャして、それらを結合します。この方法は、遅延読み込みコンテンツやスクロール位置に依存する動的レンダリングがあるページに便利です。

ページがスクロール中にコンテンツを読み込む場合や、古いスクリーンショットメソッドの動作を維持したい場合は、このオプションを使用してください。

### `waitForFontsLoaded`

-   **型:** `boolean`
-   **必須:** いいえ
-   **デフォルト:** `true`
-   **サポート:** Web、ハイブリッドアプリ（Webview）

フォント（サードパーティのフォントを含む）は同期的または非同期的に読み込むことができます。非同期読み込みとは、WebdriverIOがページが完全に読み込まれたと判断した後にフォントが読み込まれる可能性があることを意味します。フォントのレンダリングの問題を防ぐため、このモジュールはデフォルトで、スクリーンショットを撮る前にすべてのフォントが読み込まれるのを待ちます。

## Tabbableオプション

:::info 注意

このモジュールは、ユーザーがキーボードを使用してWebサイトを_タブ_移動する方法を、タブ移動可能な要素からタブ移動可能な要素への線と点を描画することでサポートしています。<br/>
この作業は[Viv Richards](https://github.com/vivrichards600)のブログ記事["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)にインスパイアされています。<br/>
タブ移動可能な要素の選択方法は、モジュール[tabbable](https://github.com/davidtheclark/tabbable)に基づいています。タブ移動に関する問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に[More detailsセクション](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)を確認してください。

:::

### `tabbableOptions`

-   **型:** `object`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

`{save|check}Tabbable`メソッドを使用する場合の線と点を変更できるオプションです。以下にオプションについて説明します。

#### `tabbableOptions.circle`

-   **型:** `object`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円を変更するためのオプションです。

##### `tabbableOptions.circle.backgroundColor`

-   **型:** `string`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円の背景色です。

##### `tabbableOptions.circle.borderColor`

-   **型:** `string`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円の境界線の色です。

##### `tabbableOptions.circle.borderWidth`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円の境界線の幅です。

##### `tabbableOptions.circle.fontColor`

-   **型:** `string`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円内のテキストのフォントの色です。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.fontFamily`

-   **型:** `string`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円内のテキストのフォントファミリーです。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

ブラウザでサポートされているフォントを設定してください。

##### `tabbableOptions.circle.fontSize`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円内のテキストのフォントサイズです。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.size`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円のサイズです。

##### `tabbableOptions.circle.showNumber`

-   **型:** `showNumber`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

円内にタブシーケンス番号を表示します。

#### `tabbableOptions.line`

-   **型:** `object`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

線を変更するためのオプションです。

##### `tabbableOptions.line.color`

-   **型:** `string`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

線の色です。

##### `tabbableOptions.line.width`

-   **型:** `number`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **サポート:** Web

線の幅です。

## 比較オプション

### `compareOptions`

-   **型:** `object`
-   **必須:** いいえ
-   **デフォルト:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)を参照してください
-   **サポート:** Web、ハイブリッドアプリ（Webview）、ネイティブアプリ（詳細については[メソッド比較オプション](./method-options#compare-check-options)を参照してください）

比較オプションはサービスオプションとしても設定でき、[メソッド比較オプション](/docs/visual-testing/method-options#compare-check-options)で説明されています