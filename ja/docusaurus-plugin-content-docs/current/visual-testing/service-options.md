---
id: service-options
title: サービスオプション
---

サービスオプションは、サービスがインスタンス化される際に設定され、各メソッド呼び出しで使用されるオプションです。

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

iOS と Android のアドレスバーに追加する必要があるパディングで、ビューポートを適切に切り取るために使用します。

### `autoElementScroll`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

このオプションを使用すると、要素のスクリーンショットが作成されるときに要素を自動的にビューにスクロールする機能を無効にできます。

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

iOS デバイスのスクリーンショットにベゼルコーナーとノッチ/ダイナミックアイランドを追加します。

:::info 注意
これは、デバイス名が**自動的に**判別でき、以下の正規化されたデバイス名リストと一致する場合にのみ実行できます。正規化はこのモジュールによって行われます。
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

### `alwaysSaveActualImage`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** All

このオプションを `false` に設定すると以下のようになります：

- 差異が**ない**場合、実際の画像を保存しません
- `createJsonReportFiles` が `true` に設定されている場合でも、jsonレポートファイルを保存しません。また、ログに `createJsonReportFiles` が無効になっていることの警告が表示されます

これにより、システムへのファイル書き込みがないため、パフォーマンスが向上し、`actual` フォルダ内のノイズが減少します。

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Mandatory:** No
-   **Default:** `.path/to/testfile/__snapshots__/`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

比較時に使用されるすべてのベースライン画像を保存するディレクトリです。設定しない場合、デフォルト値が使用され、ビジュアルテストを実行するスペックの横にある `__snapshots__/` フォルダにファイルが保存されます。`string` を返す関数を使用して `baselineFolder` の値を設定することもできます：

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

初期化時にランタイムフォルダ（`actual` & `diff`）を削除します

:::info 注意
これはプラグインオプションで [`screenshotPath`](#screenshotpath) が設定されている場合にのみ機能し、メソッドでフォルダを設定した場合は**機能しません**
:::

### `createJsonReportFiles` **(新機能)**

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`

比較結果をJSONレポートファイルにエクスポートするオプションが追加されました。`createJsonReportFiles: true` オプションを提供することで、比較された各画像のレポートが `actual` フォルダ内の各 `actual` 画像結果の横に保存されます。出力は次のようになります：

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

すべてのテストが実行されると、比較のコレクションを含む新しいJSONファイルが生成され、`actual` フォルダのルートにあります。データは以下のようにグループ化されています：

-   Jasmine/Mochaの場合は `describe`、CucumberJSの場合は `Feature`
-   Jasmine/Mochaの場合は `it`、CucumberJSの場合は `Scenario`
    そして以下の順でソートされています：
-   `commandName`（画像比較に使用される比較メソッド名）
-   `instanceData`（最初にブラウザ、次にデバイス、次にプラットフォーム）
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

レポートデータを使用することで、すべての処理やデータ収集を自分で行わなくても、独自のビジュアルレポートを構築することができます。

:::info 注意
`@wdio/visual-testing` バージョン `5.2.0` 以上を使用する必要があります
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

アプリケーション内のすべての `input`、`textarea`、`[contenteditable]` カーソルの「点滅」を有効/無効にします。`true` に設定すると、スクリーンショット撮影前にカーソルが `transparent` に設定され、完了時にリセットされます。

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

アプリケーション内のすべてのCSSアニメーションを有効/無効にします。`true` に設定すると、スクリーンショット撮影前にすべてのアニメーションが無効になり、完了時にリセットされます。

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web

これにより、ページ上のすべてのテキストが非表示になり、レイアウトのみが比較に使用されます。非表示にするには、**すべての**要素に `'color': 'transparent !important'` スタイルが追加されます。

出力については[テスト出力](/docs/visual-testing/test-output#enablelayouttesting)を参照してください。

:::info
このフラグを使用すると、テキストを含むすべての要素（`p, h1, h2, h3, h4, h5, h6, span, a, li` だけでなく `div|button|..` も）にこのプロパティが追加されます。これをカスタマイズするオプションは**ありません**。
:::

### `formatImageName`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

保存される画像の名前は、次のような形式の文字列を `formatImageName` パラメータとして渡すことでカスタマイズできます：

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

以下の変数を文字列のフォーマットに渡すことができ、自動的にインスタンス機能から読み取られます。
それらが判断できない場合はデフォルトが使用されます。

-   `browserName`: 提供された機能のブラウザ名
-   `browserVersion`: 機能で提供されるブラウザのバージョン
-   `deviceName`: 機能からのデバイス名
-   `dpr`: デバイスのピクセル比
-   `height`: 画面の高さ
-   `logName`: 機能からのlogName
-   `mobile`: これにより `_app` またはブラウザ名が `deviceName` の後に追加され、アプリのスクリーンショットとブラウザのスクリーンショットを区別します
-   `platformName`: 提供された機能のプラットフォームの名前
-   `platformVersion`: 提供された機能のプラットフォームのバージョン
-   `tag`: 呼び出されているメソッドで提供されるタグ
-   `width`: 画面の幅

:::info

`formatImageName` でカスタムパス/フォルダを提供することはできません。パスを変更したい場合は、以下のオプションを確認してください：

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- メソッドごとの[`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Supported Application Contexts:** Web

スクロール後に待機するミリ秒単位のタイムアウト。これは遅延読み込みのあるページを識別するのに役立ちます。

:::info

これはサービス/メソッドオプション `userBasedFullPageScreenshot` が `true` に設定されている場合にのみ機能します。[`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)も参照してください。

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

アプリケーションのスクロールバーを非表示にします。`true` に設定すると、スクリーンショット撮影前にすべてのスクロールバーが無効になります。これは追加の問題を防ぐためにデフォルトで `true` に設定されています。

### `logLevel`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `info`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

追加のログを提供します。オプションは `debug | info | warn | silent` です。

エラーは常にコンソールに記録されます。

### `savePerInstance`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

画像をインスタンスごとに別のフォルダに保存します。例えば、すべてのChromeスクリーンショットは `desktop_chrome` のようなChromeフォルダに保存されます。

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Default:** `.tmp/`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

実際の/異なるスクリーンショットを保持するディレクトリです。設定しない場合、デフォルト値が使用されます。文字列を返す関数を使用して、screenshotPathの値を設定することもできます：

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Androidでは `6`、iOSでは `15`（デフォルトでは `6` で、ノッチのあるiPhoneや、ホームバーがあるiPadの場合は可能性のあるホームバー用に自動的に `9` が追加されます）
-   **Supported Application Contexts:** Web

iOS および Android のツールバーに追加する必要があるパディングで、ビューポートを適切に切り取るために使用します。

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview) **visual-service@7.0.0で導入**

デフォルトでは、デスクトップWebのフルページスクリーンショットはWebDriver BiDiプロトコルを使用してキャプチャされ、スクロールなしで高速で安定した一貫性のあるスクリーンショットを可能にします。
userBasedFullPageScreenshotを `true` に設定すると、スクリーンショットプロセスは実際のユーザーをシミュレートします：ページをスクロールし、ビューポートサイズのスクリーンショットをキャプチャし、それらを結合します。この方法は、遅延読み込みコンテンツやスクロール位置に依存する動的レンダリングがあるページに役立ちます。

ページがスクロール中にコンテンツを読み込む場合や、古いスクリーンショットメソッドの動作を保持したい場合は、このオプションを使用してください。

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

フォント（サードパーティフォントを含む）は同期的または非同期的に読み込むことができます。非同期読み込みとは、WebdriverIOがページが完全に読み込まれたと判断した後にフォントが読み込まれる可能性があることを意味します。フォントレンダリングの問題を防ぐため、このモジュールはデフォルトで、スクリーンショットを撮影する前にすべてのフォントが読み込まれるのを待ちます。

## Tabbable オプション

:::info 注意

このモジュールはまた、ユーザーがキーボードを使用してウェブサイトを「タブ」で移動する方法をタブ可能な要素からタブ可能な要素へと線と点を描画することでサポートしています。<br/>
この作業は[Viv Richards](https://github.com/vivrichards600)のブログ記事["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)に触発されています。<br/>
タブ可能な要素の選択方法は[tabbable](https://github.com/davidtheclark/tabbable)モジュールに基づいています。タブに関する問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に[詳細セクション](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)を確認してください。

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

`{save|check}Tabbable`-メソッドを使用する場合に変更できる線と点のオプションです。オプションについては以下で説明します。

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円を変更するオプションです。

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円の背景色です。

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円の境界線の色です。

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円の境界線の幅です。

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円内のテキストのフォントの色です。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円内のテキストのフォントのファミリーです。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

ブラウザでサポートされているフォントを設定してください。

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円内のテキストのフォントのサイズです。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円のサイズです。

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

円内にタブシーケンス番号を表示します。

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

線を変更するオプションです。

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

線の色です。

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web

線の幅です。

## 比較オプション

### `compareOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** [ここ](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)ですべてのデフォルト値を確認
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App（詳細は[メソッド比較オプション](./method-options#compare-check-options)を参照）

比較オプションはサービスオプションとして設定することもでき、[メソッド比較オプション](/docs/visual-testing/method-options#compare-check-options)で説明されています。