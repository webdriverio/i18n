---
id: service-options
title: サービスオプション
description: "スクリーンショットのキャプチャ、フルページスクリーンショット、ベースライン、フォルダ、レポートなど、ビジュアルサービスのデフォルトオプションを設定します。"
---

サービスオプションは、サービスのインスタンス化時に設定できるオプションで、各メソッド呼び出しで使用されます。

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

# デフォルトオプション

## スクリーンショットのキャプチャ

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

アプリケーション内のスクロールバーを非表示にします。true に設定すると、スクリーンショットを撮影する前にすべてのスクロールバーが無効になります。余計な問題を防ぐため、デフォルトでは `true` に設定されています。

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

アプリケーション内のすべての `input`、`textarea`、`[contenteditable]` のキャレットの「点滅」を有効/無効にします。`true` に設定すると、スクリーンショットを撮影する前にキャレットが `transparent` に設定され、
完了後に元に戻されます。

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

アプリケーション内のすべての CSS アニメーションを有効/無効にします。`true` に設定すると、スクリーンショットを撮影する前にすべてのアニメーションが無効になり、
完了後に元に戻されます。

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

ページ上のすべてのテキストを非表示にし、レイアウトのみを比較に使用します。非表示は、**各**要素にスタイル `'color': 'transparent !important'` を追加することで行われます。

出力については [Test Output](/docs/visual-testing/test-output#enablelayouttesting) を参照してください。

:::info
このフラグを使用すると、テキストを含むすべての要素（`p, h1, h2, h3, h4, h5, h6, span, a, li` だけでなく、`div|button|..` も含む）にこのプロパティが付与されます。これを調整するオプションは**ありません**。
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

無視領域の各辺に追加されるパディング（デバイスピクセル単位）で、各領域の幅と高さがこの値の 2 倍大きくなります。これにより、高 DPR ディスプレイや BiDi スクリーンショットプロトコルで発生しうる 1 px の境界差異を回避できます。無効にするには `0` に設定します。

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

サードパーティのフォントを含むフォントは、同期的または非同期的に読み込まれます。非同期読み込みでは、WebdriverIO がページの読み込み完了を判断した後にフォントが読み込まれる可能性があります。フォントのレンダリングの問題を防ぐため、このモジュールはデフォルトで、スクリーンショットを撮影する前にすべてのフォントが読み込まれるのを待機します。

</Option>
## フルページスクリーンショット

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

デフォルトでは、デスクトップ Web でのフルページスクリーンショットは WebDriver BiDi プロトコルを使用してキャプチャされ、スクロールせずに高速で安定した一貫性のあるスクリーンショットを取得できます。
userBasedFullPageScreenshot を true に設定すると、スクリーンショットのプロセスは実際のユーザーをシミュレートします。つまり、ページをスクロールしながらビューポートサイズのスクリーンショットを撮影し、それらをつなぎ合わせます。この方法は、遅延読み込みされるコンテンツや、スクロール位置に依存する動的レンダリングを含むページに役立ちます。

ページがスクロール中のコンテンツ読み込みに依存している場合や、従来のスクリーンショット方式の動作を維持したい場合にこのオプションを使用してください。

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

スクロール後に待機するタイムアウト（ミリ秒）。遅延読み込みのあるページを識別するのに役立つ場合があります。

:::info

これは、サービス/メソッドオプション `userBasedFullPageScreenshot` が `true` に設定されている場合にのみ機能します。[`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot) も参照してください。

:::

</Option>
## モバイルとデバイス

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

ハイブリッドアプリ（1 つ以上の埋め込み Webview を持つネイティブシェル）をテストする場合は、これを `true` に設定します。これにより、Webview ベースの画面におけるステータスバーとアドレスバーの切り取り処理が調整され、ネイティブのデバイス矩形データが利用できない場合は安全なデフォルト値にフォールバックします。

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

iOS デバイスのスクリーンショットにベゼルの角とノッチ/ダイナミックアイランドを追加します。

:::info NOTE
これは、デバイス名を自動的に判別**できる**場合で、かつ以下の正規化されたデバイス名のリストに一致する場合にのみ実行できます。正規化はこのモジュールによって行われます。
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
-   iPad Mini 第 6 世代: `ipadmini`
-   iPad Air 第 4 世代: `ipadair`
-   iPad Air 第 5 世代: `ipadair`
-   iPad Pro (11 インチ) 第 1 世代: `ipadpro11`
-   iPad Pro (11 インチ) 第 2 世代: `ipadpro11`
-   iPad Pro (11 インチ) 第 3 世代: `ipadpro11`
-   iPad Pro (12.9 インチ) 第 3 世代: `ipadpro129`
-   iPad Pro (12.9 インチ) 第 4 世代: `ipadpro129`
-   iPad Pro (12.9 インチ) 第 5 世代: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

ビューポートを適切に切り取るために、iOS および Android のアドレスバーに追加する必要があるパディングです。

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

ビューポートを適切に切り取るために、iOS および Android のツールバーに追加する必要があるパディングです。

</Option>
## ファイルとフォルダの管理

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

比較時に使用されるすべてのベースライン画像を保持するディレクトリです。設定されていない場合はデフォルト値が使用され、ビジュアルテストを実行する spec の隣にある `__snapshots__/` フォルダにファイルが保存されます。`string` を返す関数を使用して `baselineFolder` の値を設定することもできます。

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// または
{
    baselineFolder: () => {
        // ここで何らかの処理を行う
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

すべての actual/差分スクリーンショットを保持するディレクトリです。設定されていない場合はデフォルト値が使用されます。文字列を返す関数を
使用して screenshotPath の値を設定することもできます。

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// または
{
    screenshotPath: () => {
        // ここで何らかの処理を行う
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

初期化時にランタイムフォルダ（`actual` と `diff`）を削除します。

:::info NOTE
これは [`screenshotPath`](#screenshotpath) がプラグインオプションで設定されている場合にのみ機能し、メソッド内でフォルダを設定した場合は**機能しません**。
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

画像をインスタンスごとに別々のフォルダに保存します。例えば、すべての Chrome のスクリーンショットは `desktop_chrome` のような Chrome フォルダに保存されます。

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

保存される画像の名前は、以下のようなフォーマット文字列を指定したパラメータ `formatImageName` を渡すことでカスタマイズできます。

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

以下の変数を渡して文字列をフォーマットでき、これらはインスタンスの capabilities から自動的に読み取られます。
判別できない場合はデフォルト値が使用されます。

-   `browserName`: 指定された capabilities 内のブラウザ名
-   `browserVersion`: capabilities で指定されたブラウザのバージョン
-   `deviceName`: capabilities 内のデバイス名
-   `dpr`: デバイスピクセル比
-   `height`: 画面の高さ
-   `logName`: capabilities 内の logName
-   `mobile`: アプリのスクリーンショットとブラウザのスクリーンショットを区別するために、`deviceName` の後に `_app` またはブラウザ名を追加します
-   `platformName`: 指定された capabilities 内のプラットフォーム名
-   `platformVersion`: capabilities で指定されたプラットフォームのバージョン
-   `tag`: 呼び出されるメソッドで指定されたタグ
-   `width`: 画面の幅

:::info

`formatImageName` にカスタムのパス/フォルダを指定することはできません。パスを変更したい場合は、以下のオプションの変更を確認してください。

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- メソッドごとの [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

</Option>
## ベースラインと保存の動作

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

比較時にベースライン画像が見つからない場合、画像が自動的にベースラインフォルダにコピーされます。

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

このオプションを使用すると、要素のスクリーンショットを作成する際に、要素を自動的にビュー内へスクロールする動作を無効にできます。

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

このオプションを `false` に設定すると、次のようになります。

- 差分が**ない**場合は actual 画像を保存しません
- `createJsonReportFiles` が `true` に設定されている場合でも jsonreport ファイルを保存しません。また、`createJsonReportFiles` が無効になっているという警告がログに表示されます

システムにファイルが書き込まれないためパフォーマンスが向上し、`actual` フォルダに不要なファイルが大量に溜まるのを防ぐことができます。

</Option>
## レポート

---

### `createJsonReportFiles` **(NEW)**

<Option type="boolean" default="false" required="No">

比較結果を JSON レポートファイルにエクスポートできるようになりました。オプション `createJsonReportFiles: true` を指定すると、比較された各画像ごとにレポートが作成され、各 `actual` 画像の結果の隣にある `actual` フォルダに保存されます。出力は以下のようになります。

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

すべてのテストが実行されると、比較結果をまとめた新しい JSON ファイルが生成され、`actual` フォルダのルートに配置されます。データは以下の単位でグループ化されます。

-   Jasmine/Mocha の場合は `describe`、CucumberJS の場合は `Feature`
-   Jasmine/Mocha の場合は `it`、CucumberJS の場合は `Scenario`
    その後、以下の順でソートされます。
-   `commandName`: 画像の比較に使用された比較メソッド名
-   `instanceData`: ブラウザ、デバイス、プラットフォームの順
    出力は以下のようになります。

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

このレポートデータを使用すれば、複雑な処理やデータ収集を自分で行うことなく、独自のビジュアルレポートを作成できます。

:::info NOTE
`@wdio/visual-testing` のバージョン `5.2.0` 以上を使用する必要があります。
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

[`createJsonReportFiles`](#createjsonreportfiles) によって生成される JSON レポートで、差分ピクセルをグループ化する際に使用されるピクセルの近接度です。値を大きくすると、より多くのピクセルがより少ないバウンディングボックスにまとめられ、値を小さくすると、より正確ですが数の多いボックスが生成されます。

</Option>
## 全般

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

追加のログを出力します。オプションは `debug | info | warn | silent` です。

エラーは常にコンソールに出力されます。

</Option>
## Tabbable オプション

:::info NOTE

このモジュールは、タブ移動可能な要素から次のタブ移動可能な要素へ線と点を描画することで、ユーザーがキーボードを使ってウェブサイトを _タブ_ 移動する様子を描画する機能もサポートしています。<br/>
この機能は、[Viv Richards](https://github.com/vivrichards600) のブログ記事 ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) に着想を得ています。<br/>
タブ移動可能な要素の選択方法は、モジュール [tabbable](https://github.com/davidtheclark/tabbable) に基づいています。タブ移動に関して問題がある場合は、[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)、特に [More details セクション](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) を確認してください。

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

`{save|check}Tabbable` メソッドを使用する場合に変更できる線と点のオプションです。各オプションについては以下で説明します。

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円を変更するためのオプションです。

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円の背景色です。

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円の枠線の色です。

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円の枠線の幅です。

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円内のテキストのフォントの色です。これは [`showNumber`](./#tabbableoptionscircleshownumber) が `true` に設定されている場合にのみ表示されます。

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円内のテキストのフォントファミリーです。これは [`showNumber`](./#tabbableoptionscircleshownumber) が `true` に設定されている場合にのみ表示されます。

ブラウザでサポートされているフォントを設定してください。

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円内のテキストのフォントサイズです。これは [`showNumber`](./#tabbableoptionscircleshownumber) が `true` に設定されている場合にのみ表示されます。

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円のサイズです。

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

円内にタブ順序の番号を表示します。

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

線を変更するためのオプションです。

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

線の色です。

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

線の幅です。

</Option>
## 比較オプション

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

比較オプションはサービスオプションとして設定することもできます。詳細は [Method Compare options](/docs/visual-testing/method-options#compare-check-options) で説明されています。

</Option>