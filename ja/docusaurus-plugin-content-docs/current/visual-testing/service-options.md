---
id: service-options
title: サービスオプション
---

サービスオプションは、サービスがインスタンス化されるときに設定され、各メソッド呼び出しに使用されるオプションです。

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
                // The options
            },
        ],
    ],
    // ...
};
```

## デフォルトオプション

### `addressBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6`
-   **Supported Application Contexts:** Web

iOSとAndroidでビューポートを適切に切り取るために、アドレスバーに追加する必要があるパディングです。

### `autoElementScroll`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

このオプションでは、要素のスクリーンショットが作成されるときに、要素を自動的にビュー内にスクロールする機能を無効にすることができます。

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

iOSデバイスのスクリーンショットにベゼルコーナーとノッチ/ダイナミックアイランドを追加します。

:::info 注意
これはデバイス名が**自動的に**決定でき、以下の正規化されたデバイス名のリストと一致する場合にのみ可能です。正規化はこのモジュールによって行われます。
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

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

比較中にベースライン画像が見つからない場合、画像は自動的にベースラインフォルダにコピーされます。

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Mandatory:** No
-   **Default:** `.path/to/testfile/__snapshots__/`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

比較中に使用されるすべてのベースライン画像を保持するディレクトリです。設定されていない場合、デフォルト値が使用され、ファイルはビジュアルテストを実行するスペックの隣にある`__snapshots__/`フォルダに保存されます。`string`を返す関数を使って`baselineFolder`の値を設定することもできます：

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// または
{
    baselineFolder: () => {
        // ここでいろいろな処理を行う
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

初期化時にランタイムフォルダ（`actual`と`diff`）を削除します

:::info 注意
これはプラグインオプションで[`screenshotPath`](#screenshotpath)が設定されている場合にのみ機能し、メソッドでフォルダを設定した場合には**機能しません**
:::

### `createJsonReportFiles` **(新機能)**

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`

比較結果をJSONレポートファイルにエクスポートするオプションが追加されました。`createJsonReportFiles: true`オプションを提供することで、比較される各画像は`actual`フォルダ内に、各`actual`画像結果の横にレポートを作成します。出力は次のようになります：

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

すべてのテストが実行されると、比較のコレクションを含む新しいJSONファイルが生成され、`actual`フォルダのルートに保存されます。データは次のようにグループ化されています：

-   Jasmine/Mochaの`describe`またはCucumberJSの`Feature`
-   Jasmine/Mochaの`it`またはCucumberJSの`Scenario`
    そして次のように並べられます：
-   `commandName`（画像比較に使用される比較メソッド名）
-   `instanceData`（最初にブラウザ、次にデバイス、そしてプラットフォーム）
    次のような形式になります：

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

レポートデータにより、すべての処理やデータ収集を自分で行わなくても、独自のビジュアルレポートを作成することができます。

:::info 注意
`@wdio/visual-testing` バージョン `5.2.0` 以上が必要です
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

アプリケーション内のすべての`input`、`textarea`、`[contenteditable]`のキャレット「点滅」を有効／無効にします。`true`に設定すると、スクリーンショット撮影前にキャレットが`transparent`に設定され、完了後にリセットされます。

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

アプリケーション内のすべてのCSSアニメーションを有効／無効にします。`true`に設定すると、スクリーンショット撮影前にすべてのアニメーションが無効化され、完了後にリセットされます。

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web

これによりページ上のすべてのテキストが非表示になり、比較にはレイアウトのみが使用されます。非表示にするために、**すべての**要素にスタイル`'color': 'transparent !important'`が追加されます。

出力については[テスト出力](/docs/visual-testing/test-output#enablelayouttesting)を参照してください。

:::info
このフラグを使用すると、テキストを含む各要素（`p, h1, h2, h3, h4, h5, h6, span, a, li`だけでなく、`div|button|..`なども含む）にこのプロパティが付与されます。これをカスタマイズするオプションは**ありません**。
:::

### `formatImageName`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

保存される画像の名前は、以下のような形式の文字列で`formatImageName`パラメータを渡すことでカスタマイズできます：

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

文字列のフォーマットには以下の変数を使用でき、これらはインスタンスの機能から自動的に読み取られます。
判断できない場合はデフォルト値が使用されます。

-   `browserName`: 提供された機能のブラウザ名
-   `browserVersion`: 機能で提供されるブラウザのバージョン
-   `deviceName`: 機能からのデバイス名
-   `dpr`: デバイスのピクセル比
-   `height`: 画面の高さ
-   `logName`: 機能からのlogName
-   `mobile`: これにより`_app`またはブラウザ名が`deviceName`の後に追加され、アプリのスクリーンショットとブラウザのスクリーンショットを区別します
-   `platformName`: 提供された機能のプラットフォーム名
-   `platformVersion`: 機能で提供されるプラットフォームのバージョン
-   `tag`: 呼び出されるメソッドで提供されるタグ
-   `width`: 画面の幅

:::info

`formatImageName`にカスタムパス/フォルダを指定することはできません。パスを変更したい場合は、以下のオプションを確認してください：

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- メソッドごとの[`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Supported Application Contexts:** Web

スクロール後に待機するタイムアウト（ミリ秒）。これは遅延読み込みのあるページを識別するのに役立ちます。

:::info

これはサービス/メソッドオプション`userBasedFullPageScreenshot`が`true`に設定されている場合にのみ機能します。[`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)も参照してください。

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

アプリケーションのスクロールバーを非表示にします。`true`に設定すると、スクリーンショット撮影前にすべてのスクロールバーが無効になります。これは追加の問題を防ぐためにデフォルトで`true`に設定されています。

### `logLevel`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `info`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

追加のログを出力します。オプションは `debug | info | warn | silent` です。

エラーは常にコンソールに記録されます。

### `savePerInstance`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

インスタンスごとに画像を別のフォルダに保存します。例えば、すべてのChromeのスクリーンショットは`desktop_chrome`のようなChromeフォルダに保存されます。

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Default:** `.tmp/`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

実際の/異なるスクリーンショットを保持するディレクトリ。設定されていない場合、デフォルト値が使用されます。文字列を返す関数を使用してscreenshotPathの値を設定することもできます：

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// または
{
    screenshotPath: () => {
        // ここでいろいろな処理を行う
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Androidでは`6`、iOSでは`15`（デフォルトは`6`で、ノッチのあるiPhoneやホームバーのあるiPadの可能性のあるホームバー用に`9`が自動的に追加されます）
-   **Supported Application Contexts:** Web

iOSとAndroidのツールバーにビューポートを適切に切り取るために追加する必要があるパディング。

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview) **visual-service@7.0.0で導入**

デフォルトでは、デスクトップWebでのフルページスクリーンショットはWebDriver BiDiプロトコルを使用してキャプチャされ、スクロールなしで高速で安定した一貫したスクリーンショットが可能です。
userBasedFullPageScreenshotが`true`に設定されている場合、スクリーンショットプロセスは実際のユーザーをシミュレートします：ページをスクロールし、ビューポートサイズのスクリーンショットをキャプチャして、それらを結合します。この方法は、遅延読み込みのあるページやスクロール位置に依存する動的レンダリングのあるページに役立ちます。

スクロール中にコンテンツが読み込まれるページがある場合や、古いスクリーンショットメソッドの動作を維持したい場合に、このオプションを使用してください。

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

フォント（サードパーティのフォントを含む）は同期的または非同期的に読み込むことができます。非同期読み込みの場合、WebdriverIOがページが完全に読み込まれたと判断した後にフォントが読み込まれる可能性があります。フォントのレンダリングの問題を防ぐために、このモジュールはデフォルトで、スクリーンショットを撮る前にすべてのフォントが読み込まれるのを待ちます。

## Tabbableオプション

:::info 注意

このモジュールは、ユーザーがキーボードを使用してWebサイトを_タブ_移動する方法を、タブ移動可能な要素間に線と点を描画することでサポートしています。<br/>
この機能は[Viv Richards](https://github.com/vivrichards600)のブログ記事["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)にインスパイアされています。<br/>
タブ移動可能な要素の選択方法は[tabbable](https://github.com/davidtheclark/tabbable)モジュールに基づいています。タブ移動に関する問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に[詳細セクション](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)を確認してください。

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

`{save|check}Tabbable`メソッドを使用する場合に変更できる線と点のオプション。オプションは以下で説明します。

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円を変更するためのオプション。

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円の背景色。

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円の境界線の色。

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円の境界線の幅。

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円内のテキストのフォントの色。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円内のテキストのフォントファミリー。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

ブラウザでサポートされているフォントを設定してください。

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円内のテキストのフォントサイズ。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円のサイズ。

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

円内にタブシーケンス番号を表示します。

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

線を変更するためのオプション。

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

線の色。

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)を参照
-   **Supported Application Contexts:** Web

線の幅。

## 比較オプション

### `compareOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)を参照
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App (詳細については[メソッド比較オプション](./method-options#compare-check-options)を参照)

比較オプションはサービスオプションとしても設定でき、[メソッド比較オプション](/docs/visual-testing/method-options#compare-check-options)で説明されています。