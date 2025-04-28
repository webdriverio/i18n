---
id: selectors
title: セレクタ
---

[WebDriver Protocol](https://w3c.github.io/webdriver/)は、要素を照会するためのいくつかのセレクタ戦略を提供しています。WebdriverIOはこれらを簡素化して、要素の選択を簡単に保ちます。要素を照会するコマンドは`$`と`$$`と呼ばれていますが、これらはjQueryや[Sizzle Selector Engine](https://github.com/jquery/sizzle)とは関係がないことに注意してください。

多くの異なるセレクタが利用可能ですが、そのうちのいくつかだけが適切な要素を見つけるための堅牢な方法を提供します。例えば、次のようなボタンがある場合：

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

以下のセレクタを__推奨__および__推奨しない__：

| セレクタ | 推奨 | 注釈 |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 絶対に使用しない | 最悪 - 一般的すぎて、コンテキストがない。 |
| `$('.btn.btn-large')` | 🚨 絶対に使用しない | 悪い。スタイリングに依存。変更される可能性が高い。 |
| `$('#main')` | ⚠️ 控えめに | より良い。しかしスタイリングやJSイベントリスナーに依存している。 |
| `$(() => document.queryElement('button'))` | ⚠️ 控えめに | 効果的な照会だが、記述が複雑。 |
| `$('button[name="submission"]')` | ⚠️ 控えめに | `name`属性に依存しており、HTML的な意味がある。 |
| `$('button[data-testid="submit"]')` | ✅ 良い | 追加の属性が必要だが、アクセシビリティとは接続されていない。 |
| `$('aria/Submit')` または `$('button=Submit')` | ✅ 常に | 最良。ユーザーがページとどのように相互作用するかを反映している。フロントエンドの翻訳ファイルを使用して、翻訳が更新されてもテストが失敗しないようにすることをお勧めします |

## CSS クエリセレクタ

特に指定がない限り、WebdriverIOは[CSSセレクタ](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)パターンを使用して要素を照会します。例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## リンクテキスト

特定のテキストを含むアンカー要素を取得するには、等号（`=`）で始まるテキストを照会します。

例えば：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

このように要素を照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## 部分的なリンクテキスト

表示されているテキストが検索値と部分的に一致するアンカー要素を見つけるには、
クエリ文字列の前に `*=` を使用して照会します（例：`*=driver`）。

上記の例の要素も次のように呼び出すことで照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__注意：__ 1つのセレクタ内で複数のセレクタ戦略を混在させることはできません。代わりに、複数の連鎖した要素クエリを使って同じ目標に到達してください。例：

```js
const elem = await $('header h1*=Welcome') // これは動作しません!!!
// 代わりに次のようにしてください
const elem = await $('header').$('*=driver')
```

## 特定のテキストを持つ要素

同じ手法を要素にも適用できます。さらに、クエリ内で`.=`や`.*=`を使用して大文字小文字を区別しないマッチングを行うこともできます。

例えば、「Welcome to my Page」というテキストを持つレベル1の見出しに対するクエリは次のとおりです：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

このように要素を照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

または部分テキストを使用して照会：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

同様に`id`や`class`名でも機能します：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

このように要素を照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__注意：__ 1つのセレクタ内で複数のセレクタ戦略を混在させることはできません。代わりに、複数の連鎖した要素クエリを使って同じ目標に到達してください。例：

```js
const elem = await $('header h1*=Welcome') // これは動作しません!!!
// 代わりに次のようにしてください
const elem = await $('header').$('h1*=Welcome')
```

## タグ名

特定のタグ名を持つ要素を照会するには、`<tag>`または`<tag />`を使用します。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

このように要素を照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## name属性

特定のname属性を持つ要素を照会するには、通常のCSS3セレクタを使用するか、[name="some-name"]のようなセレクタパラメータを渡すことで、[JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)から提供されているname戦略を使用できます：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__注意：__ このセレクタ戦略は非推奨であり、JSONWireProtocolプロトコルで実行される古いブラウザやAppiumを使用する場合にのみ機能します。

## xPath

[xPath](https://developer.mozilla.org/en-US/docs/Web/XPath)を使用して要素を照会することも可能です。

xPathセレクタは`//body/div[6]/div[1]/span[1]`のような形式を持ちます。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

次のように2番目の段落を照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

xPathを使用してDOMツリーを上下に移動することもできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## アクセシビリティ名セレクタ

アクセシブルな名前で要素を照会します。アクセシブルな名前とは、その要素がフォーカスを受け取ったときにスクリーンリーダーによって通知されるものです。アクセシブルな名前の値は、視覚的なコンテンツまたは非表示のテキスト代替の両方が可能です。

:::info

このセレクタの詳細については、[リリースブログ記事](/blog/2022/09/05/accessibility-selector)をご覧ください

:::

### `aria-label`による取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### `aria-labelledby`による取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### コンテンツによる取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### タイトルによる取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### `alt`プロパティによる取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - ロール属性

[ARIAロール](https://www.w3.org/TR/html-aria/#docconformance)に基づいて要素を照会するには、セレクタパラメータとして`[role=button]`のように要素のロールを直接指定できます：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID属性

「id」のロケーター戦略はWebDriverプロトコルではサポートされていません。IDを使用して要素を見つけるには、CSSまたはxPathセレクタ戦略を使用する必要があります。

ただし、一部のドライバー（例：[Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)）では、このセレクタが[サポート](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)されている場合があります。

現在サポートされているIDのセレクタ構文は以下のとおりです：

```js
//cssロケーター
const button = await $('#someid')
//xpathロケーター
const button = await $('//*[@id="someid"]')
//id戦略
// 注意：AppiumやIDロケーター戦略をサポートする同様のフレームワークでのみ動作します
const button = await $('id=resource-id/iosname')
```

## JS関数

WebネイティブのAPIを使用してJavaScript関数で要素をフェッチすることもできます。もちろん、これはWebコンテキスト（例：`browser`、またはモバイルのWebコンテキスト）内でのみ行うことができます。

次のHTML構造を例にとります：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

次のように`#elem`の兄弟要素を照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## ディープセレクタ

:::warning

WebdriverIOの`v9`以降では、自動的にシャドウDOMを通過するため、この特殊なセレクタは必要ありません。セレクタの前にある`>>>`を削除して、このセレクタから移行することをお勧めします。

:::

多くのフロントエンドアプリケーションは[シャドウDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)を持つ要素に大きく依存しています。回避策なしにシャドウDOM内の要素を照会することは技術的に不可能です。[`shadow$`](https://webdriver.io/docs/api/element/shadow$)および[`shadow$$`](https://webdriver.io/docs/api/element/shadow$$)はそのような回避策でしたが、[制限](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow)がありました。ディープセレクタを使用すると、通常のクエリコマンドを使用して、任意のシャドウDOM内のすべての要素を照会できるようになりました。

次のような構造のアプリケーションがあるとします：

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

このセレクタを使用すると、別のシャドウDOM内にネストされている`<button />`要素を照会できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## モバイルセレクタ

ハイブリッドモバイルテストでは、自動化サーバーがコマンドを実行する前に正しい*コンテキスト*にあることが重要です。ジェスチャーを自動化するには、ドライバーが理想的にはネイティブコンテキストに設定されている必要があります。しかし、DOMから要素を選択するには、ドライバーをプラットフォームのウェブビューコンテキストに設定する必要があります。*その後*、上記で述べた方法を使用できます。

ネイティブモバイルテストでは、コンテキスト間の切り替えはなく、モバイル戦略を使用して基礎となるデバイス自動化技術を直接使用する必要があります。これは特に、テストが要素を見つけるための細かい制御を必要とする場合に役立ちます。

### Android UiAutomator

AndroidのUI Automatorフレームワークは、要素を見つけるためのいくつかの方法を提供しています。[UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)、特に[UiSelectorクラス](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)を使用して要素を特定できます。Appiumでは、Javaコードを文字列としてサーバーに送信し、アプリケーションの環境で実行して、要素または要素を返します。

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcherとViewMatcher（Espressoのみ）

AndroidのDataMatcher戦略は、[Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)で要素を見つける方法を提供します

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

同様に[View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag（Espressoのみ）

ビュータグ戦略は、[タグ](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29)によって要素を見つける便利な方法を提供します。

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

iOSアプリケーションを自動化する場合、Appleの[UI Automationフレームワーク](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)を使用して要素を見つけることができます。

このJavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771)には、ビューとその上のすべてにアクセスするためのメソッドがあります。

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

AppiumでiOS UI Automation内での述語検索を使用して、要素の選択をさらに絞り込むこともできます。詳細については[こちら](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md)をご覧ください。

### iOS XCUITest述語文字列とクラスチェーン

iOS 10以上（`XCUITest`ドライバーを使用）では、[述語文字列](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules)を使用できます：

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

および[クラスチェーン](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules)：

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### アクセシビリティID

`accessibility id`ロケーター戦略は、UI要素の一意の識別子を読み取るように設計されています。これにより、ローカリゼーションやテキストを変更する可能性がある他のプロセス中に変更されないという利点があります。さらに、機能的に同じ要素に同じアクセシビリティIDがある場合、クロスプラットフォームテストの作成に役立ちます。

- iOSの場合、これはAppleによって[ここ](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html)で説明されている`accessibility identifier`です。
- Androidの場合、`accessibility id`は、[ここ](https://developer.android.com/training/accessibility/accessible-app.html)で説明されているように、要素の`content-description`にマッピングされます。

両方のプラットフォームで、`accessibility id`によって要素（または複数の要素）を取得することは通常、最良の方法です。これは非推奨の`name`戦略よりも推奨される方法でもあります。

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### クラス名

`class name`戦略は、現在のビュー上のUI要素を表す`string`です。

- iOSの場合、これは[UIAutomationクラス](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)の完全な名前であり、テキストフィールドの場合は`UIATextField`など、`UIA-`で始まります。完全なリファレンスは[こちら](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation)にあります。
- Androidの場合、これは[UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [クラス](https://developer.android.com/reference/android/widget/package-summary.html)の完全修飾名であり、テキストフィールドの場合は`android.widget.EditText`などです。完全なリファレンスは[こちら](https://developer.android.com/reference/android/widget/package-summary.html)にあります。
- Youi.tvの場合、これはYoui.tvクラスの完全な名前であり、プッシュボタン要素の場合は`CYIPushButtonView`など、`CYI-`で始まります。完全なリファレンスは[You.i Engine DriverのGitHubページ](https://github.com/YOU-i-Labs/appium-youiengine-driver)で見つけることができます

```js
// iOS example
await $('UIATextField').click()
// Android example
await $('android.widget.DatePicker').click()
// Youi.tv example
await $('CYIPushButtonView').click()
```

## チェーンセレクタ

クエリをより具体的にしたい場合は、セレクタを連鎖させて適切な要素を見つけることができます。実際のコマンドの前に`element`を呼び出すと、WebdriverIOはその要素からクエリを開始します。

例えば、次のようなDOM構造がある場合：

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

製品Bをカートに追加したい場合、CSSセレクタだけを使用してそれを行うのは難しいでしょう。

セレクタチェーンを使用すると、はるかに簡単です。目的の要素を段階的に絞り込むだけです：

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium画像セレクタ

`-image`ロケーター戦略を使用すると、アクセスしたい要素を表す画像ファイルをAppiumに送信することができます。

サポートされているファイル形式：`jpg,png,gif,bmp,svg`

完全なリファレンスは[こちら](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)にあります

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**注意**：Appiumがこのセレクタでどのように動作するかというと、内部的に（アプリ）スクリーンショットを撮影し、提供された画像セレクタを使用して、その（アプリ）スクリーンショット内で要素が見つかるかどうかを確認します。

Appiumが撮影した（アプリ）スクリーンショットのサイズを変更して、（アプリ）画面のCSSサイズに合わせる可能性があることに注意してください（これはiPhoneだけでなく、DPRが1より大きいRetinaディスプレイを持つMacマシンでも発生します）。これにより、提供された画像セレクタが元のスクリーンショットから取得された可能性があるため、一致が見つからない結果になる可能性があります。
Appiumサーバー設定を更新することでこれを修正できます。設定については[Appiumドキュメント](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)を、詳細な説明については[このコメント](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579)を参照してください。

## Reactセレクタ

WebdriverIOは、コンポーネント名に基づいてReactコンポーネントを選択する方法を提供しています。これを行うには、`react$`と`react$$`の2つのコマンドのいずれかを選択できます。

これらのコマンドを使用すると、[React VirtualDOM](https://reactjs.org/docs/faq-internals.html)からコンポーネントを選択し、単一のWebdriverIO要素または要素の配列を返すことができます（使用される関数によって異なります）。

**注意**：コマンド`react$`と`react$$`は機能的に似ていますが、`react$$`はすべての一致するインスタンスをWebdriverIO要素の配列として返し、`react$`は最初に見つかったインスタンスを返します。

#### 基本的な例

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

上記のコードには、Reactが`id="root"`のHTML要素内にレンダリングする単純な`MyComponent`インスタンスがあります。

`browser.react$`コマンドを使用して、`MyComponent`のインスタンスを選択できます：

```js
const myCmp = await browser.react$('MyComponent')
```

WebdriverIO要素が`myCmp`変数に格納されたら、それに対して要素コマンドを実行できます。

#### コンポーネントのフィルタリング

WebdriverIOが内部で使用するライブラリは、コンポーネントのpropsやstateによって選択をフィルタリングすることができます。そのためには、propsの2番目の引数やstateの3番目の引数をブラウザコマンドに渡す必要があります。

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

prop `name`が`WebdriverIO`である`MyComponent`のインスタンスを選択したい場合は、次のようにコマンドを実行できます：

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

stateによって選択をフィルタリングしたい場合、`browser`コマンドは次のようになります：

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### `React.Fragment`の扱い

`react$`コマンドを使用してReact [フラグメント](https://reactjs.org/docs/fragments.html)を選択すると、WebdriverIOはコンポーネントのノードとしてそのコンポーネントの最初の子を返します。`react$$`を使用すると、セレクタに一致するフラグメント内のすべてのHTMLノードを含む配列が返されます。

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

上記の例では、コマンドは次のように動作します：

```js
await browser.react$('MyComponent') // 最初の<div />のWebdriverIO要素を返します
await browser.react$$('MyComponent') // 配列[<div />, <div />]のWebdriverIO要素を返します
```

**注意：** 複数の`MyComponent`インスタンスがあり、`react$$`を使用してこれらのフラグメントコンポーネントを選択すると、すべてのノードが一次元配列として返されます。つまり、3つの`<MyComponent />`インスタンスがある場合、6つのWebdriverIO要素の配列が返されます。

## カスタムセレクタ戦略


アプリが要素をフェッチするための特定の方法を必要とする場合、`custom$`および`custom$$`で使用できる独自のセレクタ戦略を定義できます。そのためには、テストの最初に一度戦略を登録します。例えば、`before`フックで：

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

次のHTMLスニペットがある場合：

```html reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

次のように呼び出して使用します：

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

**注意：** これは[`execute`](/docs/api/browser/execute)コマンドを実行できるウェブ環境でのみ機能します。