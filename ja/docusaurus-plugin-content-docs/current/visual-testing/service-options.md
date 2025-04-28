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
-   **Supported:** Web

iOSとAndroidでアドレスバーに追加する必要があるパディングで、ビューポートを適切に切り取るために使用されます。

### `autoElementScroll`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported:** Web, Hybrid App (Webview)

このオプションでは、要素のスクリーンショットが作成されるときに要素を自動的にビューにスクロールする機能を無効にすることができます。

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview), Native App

iOSデバイスのスクリーンショットにベゼルコーナーとノッチ/ダイナミックアイランドを追加します。

:::info 注意
これはデバイス名が**自動的に**判別でき、以下の正規化されたデバイス名のリストに一致する場合にのみ実行できます。正規化はこのモジュールによって行われます。
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
-   **Supported:** Web, Hybrid App (Webview), Native App

比較中にベースライン画像が見つからない場合、画像は自動的にベースラインフォルダにコピーされます。

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Mandatory:** No
-   **Default:** `.path/to/testfile/__snapshots__/`
-   **Supported:** Web, Hybrid App (Webview), Native App

比較中に使用されるすべてのベースライン画像を保持するディレクトリです。設定されていない場合、デフォルト値が使用され、ビジュアルテストを実行するスペックの隣にある`__snapshots__/`フォルダにファイルが保存されます。`string`を返す関数を使って`baselineFolder`の値を設定することもできます：

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// または
{
    baselineFolder: () => {
        // ここで何か魔法を行う
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview), Native App

初期化時にランタイムフォルダ（`actual`＆`diff`）を削除します

:::info 注意
これはプラグインオプションで[`screenshotPath`](#screenshotpath)が設定されている場合にのみ機能し、メソッドでフォルダを設定した場合は**機能しません**
:::

### `createJsonReportFiles` **(新機能)**

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`

比較結果をJSONレポートファイルにエクスポートするオプションが追加されました。`createJsonReportFiles: true`オプションを提供することで、比較される各画像のレポートが`actual`フォルダ内に、各`actual`画像結果の隣に保存されます。出力は以下のようになります：

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

すべてのテストが実行されると、比較のコレクションを含む新しいJSONファイルが生成され、`actual`フォルダのルートに保存されます。データは以下によってグループ化されます：

-   Jasmine/Mochaの場合は`describe`、CucumberJSの場合は`Feature`
-   Jasmine/Mochaの場合は`it`、CucumberJSの場合は`Scenario`
    そして以下で並べ替えられます：
-   `commandName`：画像の比較に使用される比較メソッド名
-   `instanceData`：まずブラウザ、次にデバイス、そしてプラットフォーム
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

レポートデータにより、すべての魔法とデータ収集を自分でせずに独自のビジュアルレポートを構築する機会が得られます。

:::info 注意
`@wdio/visual-testing`バージョン`5.2.0`以上を使用する必要があります
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

アプリケーション内のすべての`input`、`textarea`、`[contenteditable]`キャレットの「点滅」を有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にキャレットが`transparent`に設定され、
完了時にリセットされます

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

アプリケーション内のすべてのCSSアニメーションを有効/無効にします。`true`に設定すると、スクリーンショットを撮る前にすべてのアニメーションが無効になり、
完了時にリセットされます

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web

ページ上のすべてのテキストを非表示にするので、比較にはレイアウトのみが使用されます。非表示にするには、スタイル`'color': 'transparent !important'`を**各**要素に追加します。

出力については[テスト出力](/docs/visual-testing/test-output#enablelayouttesting)を参照してください

:::info
このフラグを使用すると、テキストを含む各要素（つまり`p, h1, h2, h3, h4, h5, h6, span, a, li`だけでなく、`div|button|..`も）にこのプロパティが設定されます。これをカスタマイズするオプションは**ありません**。
:::

### `formatImageName`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supported:** Web, Hybrid App (Webview), Native App

保存される画像の名前は、次のような形式の文字列で`formatImageName`パラメータを渡すことでカスタマイズできます：

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

以下の変数を文字列のフォーマットに渡すことができ、インスタンスの機能から自動的に読み取られます。
それらが決定できない場合は、デフォルトが使用されます。

-   `browserName`：提供された機能のブラウザの名前
-   `browserVersion`：機能で提供されているブラウザのバージョン
-   `deviceName`：機能からのデバイス名
-   `dpr`：デバイスピクセル比
-   `height`：画面の高さ
-   `logName`：機能からのlogName
-   `mobile`：これは`_app`または、ブラウザのスクリーンショットとアプリのスクリーンショットを区別するために`deviceName`の後にブラウザ名を追加します
-   `platformName`：提供された機能のプラットフォームの名前
-   `platformVersion`：提供された機能のプラットフォームのバージョン
-   `tag`：呼び出されるメソッドで提供されるタグ
-   `width`：画面の幅

:::info

`formatImageName`でカスタムパス/フォルダを提供することはできません。パスを変更したい場合は、以下のオプションの変更を確認してください：

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- メソッドごとの[`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Supported:** Web

スクロール後に待機するミリ秒単位のタイムアウト。これは遅延読み込みのあるページを識別するのに役立ちます。

:::info

これはサービス/メソッドオプション`userBasedFullPageScreenshot`が`true`に設定されている場合にのみ機能します。[`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)も参照してください

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported:** Web, Hybrid App (Webview)

アプリケーションのスクロールバーを非表示にします。trueに設定すると、スクリーンショットを撮る前にすべてのスクロールバーが無効になります。これは追加の問題を防ぐためにデフォルトで`true`に設定されています。

### `logLevel`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `info`
-   **Supported:** Web, Hybrid App (Webview), Native App

追加のログを提供します。オプションは`debug | info | warn | silent`です

エラーは常にコンソールに記録されます。

### `savePerInstance`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Supported:** Web, Hybrid App (Webview), Native App

インスタンスごとに画像を別のフォルダに保存します。例えば、すべてのChromeのスクリーンショットは`desktop_chrome`のようなChromeフォルダに保存されます。

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Default:** `.tmp/`
-   **Mandatory:** no
-   **Supported:** Web, Hybrid App (Webview), Native App

実際の/異なるスクリーンショットを保持するディレクトリ。設定されていない場合、デフォルト値が使用されます。文字列を返す関数も
screenshotPath値を設定するために使用できます：

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// または
{
    screenshotPath: () => {
        // ここで何か魔法を行う
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6` for Android and `15` for iOS (`6` by default and `9` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)
-   **Supported:** Web

iOSとAndroidのツールバーに追加する必要があるパディングで、ビューポートを適切に切り取るために使用されます。

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview) **visual-service@7.0.0で導入**

デフォルトでは、デスクトップWebのフルページスクリーンショットはWebDriver BiDiプロトコルを使用してキャプチャされ、スクロールなしで高速で安定した一貫したスクリーンショットを実現します。
userBasedFullPageScreenshotがtrueに設定されている場合、スクリーンショットプロセスは実際のユーザーをシミュレートします：ページをスクロールし、ビューポートサイズのスクリーンショットをキャプチャして、それらを組み合わせます。この方法は、遅延読み込みのコンテンツやスクロール位置に依存する動的レンダリングを持つページに役立ちます。

ページがスクロール中にコンテンツの読み込みに依存している場合や、古いスクリーンショット方法の動作を維持したい場合は、このオプションを使用してください。

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported:** Web, Hybrid App (Webview)

フォント（サードパーティのフォントを含む）は同期的または非同期的に読み込むことができます。非同期読み込みとは、WebdriverIOがページが完全に読み込まれたと判断した後にフォントが読み込まれる可能性があることを意味します。フォントのレンダリングの問題を防ぐために、このモジュールはデフォルトでスクリーンショットを撮る前にすべてのフォントが読み込まれるのを待ちます。

## タブ可能オプション

:::info 注意

このモジュールは、ユーザーがキーボードを使用してWebサイトを「タブ」で移動する方法を、タブ可能な要素からタブ可能な要素への線と点を描画することでサポートします。<br/>
この作業は[Viv Richards](https://github.com/vivrichards600)のブログ記事["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)からインスピレーションを得ています。<br/>
タブ可能な要素の選択方法は、モジュール[tabbable](https://github.com/davidtheclark/tabbable)に基づいています。タブ付けに関する問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に[詳細セクション](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)を確認してください。

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

`{save|check}Tabbable`メソッドを使用する場合に変更できる線と点のオプション。オプションは以下で説明します。

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円を変更するためのオプション。

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円の背景色。

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円の境界線の色。

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円の境界線の幅。

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円内のテキストのフォントの色。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円内のテキストのフォントのファミリー。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

ブラウザでサポートされているフォントを設定してください。

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円内のテキストのフォントのサイズ。これは[`showNumber`](./#tabbableoptionscircleshownumber)が`true`に設定されている場合にのみ表示されます。

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円のサイズ。

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

円内にタブシーケンス番号を表示します。

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

線を変更するためのオプション。

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

線の色。

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)を参照してください
-   **Supported:** Web

線の幅。

## 比較オプション

### `compareOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** すべてのデフォルト値については[こちら](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)を参照してください
-   **Supported:** Web, Hybrid App (Webview), Native App (詳細については[メソッド比較オプション](./method-options#compare-check-options)を参照してください)

比較オプションはサービスオプションとしても設定でき、[メソッド比較オプション](/docs/visual-testing/method-options#compare-check-options)で説明されています