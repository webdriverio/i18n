---
id: selectors
title: セレクタ
---

[WebDriver Protocol](https://w3c.github.io/webdriver/)は、要素をクエリするためのいくつかのセレクタ戦略を提供しています。WebdriverIOはこれらを簡略化して、要素の選択をシンプルに保ちます。要素をクエリするコマンドは`$`と`$$`と呼ばれていますが、これらはjQueryや[Sizzle Selector Engine](https://github.com/jquery/sizzle)とは関係がないことに注意してください。

利用可能なセレクタは多数ありますが、適切な要素を見つけるための堅牢な方法を提供するのはそのうちの数種類だけです。例えば、以下のボタンを考えてみましょう：

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

私たちが__推奨する__セレクタと__推奨しない__セレクタは以下の通りです：

| セレクタ | 推奨 | メモ |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 絶対に使わない | 最悪 - 汎用的すぎて、コンテキストがない |
| `$('.btn.btn-large')` | 🚨 絶対に使わない | 悪い。スタイリングに結合しており、変更される可能性が高い |
| `$('#main')` | ⚠️ 控えめに | より良い。ただしスタイリングやJSイベントリスナーに結合している |
| `$(() => document.queryElement('button'))` | ⚠️ 控えめに | 効果的なクエリだが、記述が複雑 |
| `$('button[name="submission"]')` | ⚠️ 控えめに | `name`属性に結合しており、HTML的な意味を持つ |
| `$('button[data-testid="submit"]')` | ✅ 良い | 追加の属性が必要だが、アクセシビリティとは接続されていない |
| `$('aria/Submit')` | ✅ 良い | 良い。ユーザーがページとどう相互作用するかを表している。翻訳ファイルを使うことで翻訳が更新されてもテストが壊れないようにすることをお勧めします。注意：このセレクタは大きなページでは他のセレクタより遅くなる可能性があります |
| `$('button=Submit')` | ✅ 常に使用 | 最良。ユーザーがページとどう相互作用するかを表しており、高速です。翻訳ファイルを使うことで翻訳が更新されてもテストが壊れないようにすることをお勧めします |

## CSS クエリセレクタ

特に指定がない限り、WebdriverIOは[CSSセレクタ](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)パターンを使って要素をクエリします。例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## リンクテキスト

特定のテキストを含むアンカー要素を取得するには、等号（`=`）記号で始まるテキストでクエリします。

例えば：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

このような要素は次のようにクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## 部分的リンクテキスト

表示されているテキストが検索値に部分的に一致するアンカー要素を見つけるには、
クエリ文字列の前に`*=`を使ってクエリします（例：`*=driver`）。

上の例の要素は以下のようにしてもクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__注意:__ 1つのセレクタ内で複数のセレクタ戦略を混合することはできません。同じ目標を達成するには、複数の連鎖した要素クエリを使用してください：

```js
const elem = await $('header h1*=Welcome') // これは動作しません!!!
// 代わりに次のように使用してください
const elem = await $('header').$('*=driver')
```

## 特定のテキストを持つ要素

同じテクニックを要素にも適用できます。さらに、クエリ内で`.=`や`.*=`を使用して大文字小文字を区別しないマッチングを行うことも可能です。

例えば、「Welcome to my Page」というテキストを持つh1見出しをクエリするには：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

次のようにしてこの要素をクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

または部分的なテキストを使用してクエリする場合：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

`id`や`class`名についても同様です：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

次のようにしてこの要素をクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__注意:__ 1つのセレクタ内で複数のセレクタ戦略を混合することはできません。同じ目標を達成するには、複数の連鎖した要素クエリを使用してください：

```js
const elem = await $('header h1*=Welcome') // これは動作しません!!!
// 代わりに次のように使用してください
const elem = await $('header').$('h1*=Welcome')
```

## タグ名

特定のタグ名を持つ要素をクエリするには、`<tag>`または`<tag />`を使用します。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

次のようにしてこの要素をクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## name属性

特定のname属性を持つ要素をクエリするには、通常のCSS3セレクタか、[JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)から提供されるname戦略を使用し、セレクタパラメータとして[name="some-name"]のような形式で渡すことができます：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__注意:__ このセレクタ戦略は非推奨であり、JSONWireProtocolプロトコルで実行される古いブラウザやAppiumを使用する場合にのみ機能します。

## xPath

特定の[xPath](https://developer.mozilla.org/en-US/docs/Web/XPath)を使って要素をクエリすることも可能です。

xPathセレクタは`//body/div[6]/div[1]/span[1]`のような形式を持ちます。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

2番目の段落は次のようにクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

xPathを使ってDOMツリーの上下に移動することもできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## アクセシビリティ名セレクタ

アクセシブルな名前によって要素をクエリします。アクセシブルな名前は、その要素がフォーカスを受けたときにスクリーンリーダーが読み上げる内容です。アクセシブルな名前の値は、視覚的なコンテンツまたは非表示のテキスト代替のいずれかになります。

:::info

このセレクタについての詳細は、[リリースブログ記事](/blog/2022/09/05/accessibility-selector)で読むことができます。

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

[ARIAロール](https://www.w3.org/TR/html-aria/#docconformance)に基づいて要素をクエリするには、セレクタパラメータとして`[role=button]`のように要素のロールを直接指定できます：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID属性

WebDriverプロトコルでは「id」というロケータ戦略はサポートされていません。IDを使用して要素を見つけるには、代わりにCSSまたはxPathセレクタ戦略を使用する必要があります。

ただし、一部のドライバー（例：[Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)）は、このセレクタを[サポート](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)している場合があります。

現在サポートされているIDのセレクタ構文は以下の通りです：

```js
//cssロケータ
const button = await $('#someid')
//xpathロケータ
const button = await $('//*[@id="someid"]')
//id戦略
// 注意: AppiumやロケータストラテジーとしてIDをサポートする同様のフレームワークでのみ動作します
const button = await $('id=resource-id/iosname')
```

## JS関数

Web標準のAPIを使用してJavaScript関数で要素を取得することもできます。もちろん、これはWebコンテキスト内（例えば、`browser`やモバイルのWebコンテキスト）でのみ実行できます。

以下のHTML構造が与えられた場合：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

`#elem`の兄弟要素を次のようにクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## ディープセレクタ

:::warning

WebdriverIOの`v9`からは、WebdriverIOが自動的にシャドウDOMを貫通するため、この特殊なセレクタは不要になりました。セレクタの前の`>>>`を削除してこのセレクタから移行することをお勧めします。

:::

多くのフロントエンドアプリケーションは[シャドウDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)を持つ要素に大きく依存しています。回避策なしにシャドウDOM内の要素をクエリするのは技術的に不可能です。[`shadow$`](https://webdriver.io/docs/api/element/shadow$)と[`shadow$$`](https://webdriver.io/docs/api/element/shadow$$)はそのような回避策でしたが、[制限](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow)がありました。ディープセレクタを使用すると、共通のクエリコマンドを使用してあらゆるシャドウDOM内のすべての要素をクエリできるようになりました。

以下のような構造を持つアプリケーションがあるとします：

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

このセレクタを使用すると、別のシャドウDOM内にネストされている`<button />`要素をクエリできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## モバイルセレクタ

ハイブリッドモバイルテストでは、コマンドを実行する前に自動化サーバーが正しい*コンテキスト*にあることが重要です。ジェスチャーを自動化するには、ドライバーは理想的にはネイティブコンテキストに設定されるべきです。しかしDOMから要素を選択するには、ドライバーはプラットフォームのWebビューコンテキストに設定する必要があります。*そのとき*に限り、上記のメソッドを使用できます。

ネイティブモバイルテストでは、コンテキスト間の切り替えはなく、モバイル戦略を使用して基盤となるデバイス自動化テクノロジーを直接使用する必要があります。これは特にテストが要素を見つけるための細かい制御を必要とする場合に役立ちます。

### Android UiAutomator

AndroidのUI Automatorフレームワークは、要素を見つける方法をいくつか提供しています。[UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)、特に[UiSelectorクラス](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)を使用して要素を見つけることができます。Appiumでは、Javaコードを文字列として送信し、サーバーがアプリケーションの環境でそれを実行して要素を返します。

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcherとViewMatcher（Espressoのみ）

AndroidのDataMatcher戦略は、[Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)による要素の検索方法を提供します。

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

同様に[View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)も使用できます。

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

iOSアプリケーションを自動化する際、Appleの[UI Automationフレームワーク](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)を使用して要素を見つけることができます。

このJavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771)には、ビューとその上のすべてにアクセスするためのメソッドがあります。

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Appium内でのiOS UI Automationで述べ語検索を使用して、要素の選択をさらに洗練することもできます。詳細は[こちら](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md)をご覧ください。

### iOS XCUITest述語文字列とクラスチェーン

iOS 10以上（`XCUITest`ドライバを使用）では、[述語文字列](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules)を使用できます：

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

そして[クラスチェーン](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules)も：

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### アクセシビリティID

`accessibility id`ロケータ戦略は、UI要素の一意の識別子を読み取るように設計されています。これにより、ローカリゼーションやテキストを変更する可能性のある他のプロセス中に変更されないという利点があります。さらに、機能的に同じ要素が同じアクセシビリティIDを持つ場合、クロスプラットフォームテストの作成にも役立ちます。

- iOSの場合、これはAppleが[ここ](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html)で説明している`accessibility identifier`です。
- Androidの場合、`accessibility id`は[ここ](https://developer.android.com/training/accessibility/accessible-app.html)で説明されている通り、その要素の`content-description`にマッピングされます。

両方のプラットフォームで、`accessibility id`によって要素（または複数の要素）を取得することは通常最良の方法です。これは非推奨の`name`戦略よりも推奨される方法です。

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### クラス名

`class name`戦略は、現在のビュー上のUI要素を表す`string`です。

- iOSの場合、これは[UIAutomationクラス](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)の完全な名前であり、テキストフィールドの場合の`UIATextField`のように`UIA-`で始まります。完全なリファレンスは[こちら](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation)で見つけることができます。
- Androidの場合、これはテキストフィールドの場合の`android.widget.EditText`のような、[UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator)[クラス](https://developer.android.com/reference/android/widget/package-summary.html)の完全修飾名です。完全なリファレンスは[こちら](https://developer.android.com/reference/android/widget/package-summary.html)で見つけることができます。
- Youi.tvの場合、これはYoui.tvクラスの完全な名前であり、プッシュボタン要素の場合の`CYIPushButtonView`のように`CYI-`で始まります。完全なリファレンスは[You.i Engine DriverのGitHubページ](https://github.com/YOU-i-Labs/appium-youiengine-driver)で見つけることができます。

```js
// iOSの例
await $('UIATextField').click()
// Androidの例
await $('android.widget.DatePicker').click()
// Youi.tvの例
await $('CYIPushButtonView').click()
```

## セレクタのチェーン

クエリをより具体的にしたい場合は、正しい要素が見つかるまでセレクタをチェーンできます。実際のコマンドの前に`element`を呼び出すと、WebdriverIOはその要素からクエリを開始します。

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

商品Bをカートに追加したい場合、CSSセレクタだけでそれを行うのは難しいでしょう。

セレクタチェーンを使用すると、はるかに簡単になります。目的の要素を段階的に絞り込むだけです：

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium画像セレクタ

`-image`ロケータ戦略を使用すると、アクセスしたい要素を表す画像ファイルをAppiumに送信することができます。

サポートされているファイル形式は`jpg,png,gif,bmp,svg`です。

完全なリファレンスは[こちら](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)で見つけることができます。

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**注意**: Appiumがこのセレクタで動作する方法は、内部的に（アプリ）スクリーンショットを撮影し、提供された画像セレクタを使用して、その要素がそのスクリーンショットで見つかるかどうかを確認します。

AppiumはCSSサイズに合わせて撮影したスクリーンショットをリサイズすることがあります（これはiPhoneだけでなく、DPRが1より大きいRetina displayを持つMacマシンでも起こります）。元のスクリーンショットから取得した画像セレクタが使用されている可能性があるため、これは一致が見つからない結果になる可能性があります。
Appiumサーバー設定を更新することでこれを修正できます。設定については[Appiumドキュメント](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)を、詳細な説明については[このコメント](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579)を参照してください。

## Reactセレクタ

WebdriverIOはコンポーネント名に基づいてReactコンポーネントを選択する方法を提供します。これを行うには、`react$`と`react$$`の2つのコマンドから選択できます。

これらのコマンドを使用すると、[React仮想DOM](https://reactjs.org/docs/faq-internals.html)からコンポーネントを選択し、単一のWebdriverIO要素または要素の配列を返すことができます（使用する関数によって異なります）。

**注意**: コマンド`react$`と`react$$`の機能は似ていますが、`react$$`はすべての一致するインスタンスをWebdriverIO要素の配列として返し、`react$`は最初に見つかったインスタンスを返します。

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

上記のコードでは、アプリケーション内に単純な`MyComponent`インスタンスがあり、Reactが`id="root"`のHTML要素内にレンダリングしています。

`browser.react$`コマンドを使用して、`MyComponent`のインスタンスを選択できます：

```js
const myCmp = await browser.react$('MyComponent')
```

これで`myCmp`変数にWebdriverIO要素が保存されたので、それに対して要素コマンドを実行できます。

#### コンポーネントのフィルタリング

WebdriverIOが内部的に使用するライブラリを使用すると、コンポーネントのpropsやstateでセレクションをフィルタリングできます。そのためには、ブラウザコマンドの2番目の引数にprops、3番目の引数にstateを渡す必要があります。

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

`name`プロパティが`WebdriverIO`である`MyComponent`のインスタンスを選択したい場合は、次のようにコマンドを実行できます：

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

stateによってセレクションをフィルタリングする場合、`browser`コマンドは次のようになります：

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### `React.Fragment`の取り扱い

`react$`コマンドを使用してReact[フラグメント](https://reactjs.org/docs/fragments.html)を選択する場合、WebdriverIOはそのコンポーネントのノードとしてそのコンポーネントの最初の子を返します。`react$$`を使用する場合は、セレクタに一致するフラグメント内のすべてのHTMLノードを含む配列を受け取ります。

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

**注意：** 複数の`MyComponent`インスタンスがあり、`react$$`を使用してこれらのフラグメントコンポーネントを選択する場合、一次元の配列としてすべてのノードが返されます。つまり、3つの`<MyComponent />`インスタンスがある場合、6つのWebdriverIO要素を持つ配列が返されます。

## カスタムセレクタ戦略


アプリが要素をフェッチするための特定の方法を必要とする場合、`custom$`および`custom$$`で使用できるカスタムセレクタ戦略を自分で定義できます。そのためには、テストの最初、たとえば`before`フックで一度戦略を登録します：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

以下のHTMLスニペットがある場合：

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

次のように呼び出して使用します：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**注意：** これは[`execute`](/docs/api/browser/execute)コマンドを実行できるWeb環境でのみ機能します。
