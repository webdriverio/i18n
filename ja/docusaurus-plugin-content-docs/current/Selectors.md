---
id: selectors
title: セレクター
description: "CSS、テキスト、XPath、アクセシビリティ名、ARIAロールなどのセレクター戦略を使って要素を検索する方法と、どのセレクターが最も堅牢かを学びます。"
---

[WebDriver Protocol](https://w3c.github.io/webdriver/)は、要素を検索するためのセレクター戦略をいくつか提供しています。WebdriverIOはこれらを簡略化し、要素の選択をシンプルに保ちます。要素を検索するコマンドは`$`と`$$`という名前ですが、jQueryや[Sizzle Selector Engine](https://github.com/jquery/sizzle)とは一切関係がないことに注意してください。

利用できるセレクターは数多くありますが、正しい要素を堅牢に見つけられるものはごく一部です。例えば、次のようなボタンがあるとします：

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

以下のセレクターについて、推奨する__もの__と推奨__しないもの__を示します：

| セレクター | 推奨度 | 備考 |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 使用しない | 最悪 - 汎用的すぎて、コンテキストがありません。 |
| `$('.btn.btn-large')` | 🚨 使用しない | 悪い。スタイリングに依存しています。変更される可能性が非常に高いです。 |
| `$('#main')` | ⚠️ 控えめに | より良い。ただし、依然としてスタイリングやJSイベントリスナーに依存しています。 |
| `$(() => document.queryElement('button'))` | ⚠️ 控えめに | 効果的な検索ですが、記述が複雑です。 |
| `$('button[name="submission"]')` | ⚠️ 控えめに | HTMLのセマンティクスを持つ`name`属性に依存しています。 |
| `$('button[data-testid="submit"]')` | ✅ 良い | 追加の属性が必要で、a11yとは結びついていません。 |
| `$('aria/Submit')` | ✅ 良い | 良い。ユーザーがページを操作する方法に近いです。翻訳が更新されてもテストが壊れないよう、翻訳ファイルを使用することを推奨します。WebDriver BiDiセッションでは、ブラウザのアクセシビリティツリーを使用します。Classicセッションでは XPath にフォールバックし、大きなページでは遅くなる可能性があります。 |
| `$('button=Submit')` | ✅ 常に | 最良。ユーザーがページを操作する方法に近く、高速です。翻訳が更新されてもテストが壊れないよう、翻訳ファイルを使用することを推奨します。 |

## ストリクトモード

v10以降、[`$`](/docs/api/browser/$)コマンドは__ストリクト__です：これはちょうど1つの要素を表します。セレクターが複数の要素にマッチした場合、コマンドは最初のマッチを黙って選ぶ代わりに`StrictSelectorError`をスローします：

```js
// ページ上に12個のボタンがある
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

これは[Playwrightのロケーター](https://playwright.dev/docs/locators#strictness)と同じ挙動です。Cypressは異なります：Cypressのクエリは複数の要素に解決されることがあり、デフォルトで複数要素のサブジェクトを拒否するのは[`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn)などのアクションコマンドです。ストリクトモードは範囲が広すぎるセレクターを明らかにします。そうしたセレクターは、ページが大きくなるとすぐに、気付かないうちに誤った要素を操作してしまいます。

このルールは、[チェーン](#chain-selectors)のすべてのステップと、`$`が受け付けるすべてのセレクタータイプ（Shadow DOMを貫通するものを含む文字列セレクター、[JS関数](#js-function)、[モバイルセレクター](#mobile-selectors)、[カスタム戦略](#custom-selector-strategies)の参照）に適用されます。

### 影響を受けないもの

- `$$`は引き続き0個または複数の要素を[`ElementArray`](/docs/api/browser/$$)として返します。件数を読み取ったり`for...of`を使用したりする前に、リスト（またはその`.length`）をawaitしてください。`for await`はリストに対して直接使用できます。
- 専用のヘルパーコマンド`custom$`、`shadow$`、`react$`はストリクトではありません。これらは引き続き最初のマッチを返し、それぞれの`$$`版も同様です。
- 何にもマッチしないセレクターは引き続き遅延解決される要素を返すため、[`waitForExist`](/docs/api/element/waitForExist)や[自動待機](/docs/autowait)の挙動は変わりません。
- `$(await browser.getActiveElement())`のように要素参照を渡す場合は、常に単一のノードを指すため、チェックされることはありません。

:::info v10への移行

スイート内のストリクトモード違反を監査する方法、個々のクエリを絞り込む・除外する方法、プロジェクト全体でストリクトモードを無効にする方法については、[v10移行ガイド](/docs/v10-migration)を参照してください。

:::

## CSSクエリセレクター

特に指定がない場合、WebdriverIOは[CSSセレクター](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)パターンを使用して要素を検索します。例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## リンクテキスト

特定のテキストを含むアンカー要素を取得するには、等号（`=`）で始まるテキストで検索します。

例えば：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

この要素は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## 部分リンクテキスト

表示テキストが検索値に部分一致するアンカー要素を見つけるには、
クエリ文字列の前に`*=`を付けて検索します（例：`*=driver`）。

上記の例の要素は、次のように呼び出しても検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__注意：__ 1つのセレクター内で複数のセレクター戦略を混在させることはできません。同じ目的を達成するには、複数の要素クエリをチェーンしてください。例：

```js
const elem = await $('header h1*=Welcome') // 動作しません!!!
// 代わりにこちらを使用
const elem = await $('header').$('*=driver')
```

## 特定のテキストを持つ要素

同じテクニックは要素にも適用できます。さらに、クエリ内で`.=`または`.*=`を使用することで、大文字小文字を区別しないマッチングも可能です。

例えば、テキスト「Welcome to my Page」を持つレベル1の見出しのクエリは次のとおりです：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

この要素は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

または部分テキストのクエリを使用します：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

`id`や`class`名でも同様に機能します：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

この要素は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__注意：__ 1つのセレクター内で複数のセレクター戦略を混在させることはできません。同じ目的を達成するには、複数の要素クエリをチェーンしてください。例：

```js
const elem = await $('header h1*=Welcome') // 動作しません!!!
// 代わりにこちらを使用
const elem = await $('header').$('h1*=Welcome')
```

## タグ名

特定のタグ名を持つ要素を検索するには、`<tag>`または`<tag />`を使用します。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

この要素は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## name属性

特定のname属性を持つ要素を検索するには、`[name="some-name"]`のようなCSSセレクターを使用します。モバイルセッションでは、同じ省略記法がAppiumの`name`ロケーター戦略で送信されます：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__注意：__ `name`ロケーター戦略はAppiumのロケーターです。デスクトップセッションでは、`[name="some-name"]`はCSS戦略のままです。

## xPath

特定の[xPath](https://developer.mozilla.org/en-US/docs/Web/XPath)を使用して要素を検索することもできます。

xPathセレクターは`//body/div[6]/div[1]/span[1]`のような形式です。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

2番目の段落は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

xPathを使用してDOMツリーを上下に移動することもできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## アクセシビリティ名セレクター

アクセシブルな名前で要素を検索します。アクセシブルな名前とは、要素がフォーカスを受け取ったときにスクリーンリーダーによって読み上げられるものです。アクセシブルな名前の値は、視覚的なコンテンツまたは非表示の代替テキストのいずれかになります。

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)セッション（Chrome、Edge、Firefox、その他のBiDi対応ブラウザ）では、WebdriverIOはまずアクセシビリティロケーターを使用した[`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes)を使用します。これはブラウザのアクセシビリティツリーを直接検索するもので、通常はXPathによる近似よりもはるかに高速です。アクセシビリティロケーターで何も見つからない場合、WebdriverIOはClassicのXPathヒューリスティックにフォールバックするため、既存の`aria/`クエリは引き続きマッチします。

:::info

このセレクターの詳細については、[リリースブログ記事](/blog/2022/09/05/accessibility-selector)をご覧ください。

:::

### `aria-label`で取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### `aria-labelledby`で取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### コンテンツで取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### タイトルで取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### `alt`プロパティで取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ロールセレクター

スクリーンリーダーが説明するのと同じように、ARIAロールとアクセシブルな名前で要素を検索します：「*Add to cart*ボタン」。ロールと名前の組み合わせは、クラス名、テストID、DOM構造が変更されてもマッチし続けます。

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// ロールのみ
const rows = await $$('role/row')

// 親要素にスコープを限定
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

構文は`role/<role>`または`role/<role>[name="<accessible name>"]`です。シングルクォートも使用でき、名前の中のクォートはバックスラッシュでエスケープします：`role/button[name="Say \"hi\""]`。

- 名前はアクセシブルな名前全体と一致する必要があります。
- ロールはARIAロールである必要があります。タイプミスがあると、最も近い有効なロールを示して失敗します。例：`"buton" is not an ARIA role. Did you mean "button"?`。
- `img`とそのARIA 1.3での名前`image`は同じロールです。
- このセレクターは、他のすべてのセレクターと同様に`$`の[ストリクトモード](#strict-mode)に従います。

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)セッションでは、WebdriverIOはロールと名前を[`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes)に渡します。ブラウザは支援技術がページを認識するのと同じ方法で、両方を自身で計算します。オープンなShadow Root内やフレーム内（別オリジンのフレームを含む）の要素も見つかります。ブラウザが要素を見つけられなかった場合、ヒューリスティックへのフォールバックはありません。ロールはブラウザが決定することに注意してください。例えば、ヘッダーやキャプションのない`<table>`はレイアウトテーブルとなる場合があり、その場合その行は`row`ロールを持ちません。

WebDriver Classicセッションの場合、およびブラウザがロールロケーターをサポートしていない場合、WebdriverIOはTesting Libraryが使用している実装である[`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api)を用いて、ページ内でロールとアクセシブルな名前を計算します。ラベルのないテキストフィールドは、ブラウザと同様に`placeholder`によって名前が付けられます。ロールセレクターはネイティブモバイルアプリのコンテキストでは利用できません。その場合は[アクセシビリティID](#accessibility-id)を使用してください。

## ARIA - role属性

[ARIAロール](https://www.w3.org/TR/html-aria/#docconformance)に基づいて要素を検索するには、セレクターのパラメーターとして`[role=button]`のように要素のロールを直接指定できます。このセレクターは、要素名と属性からロールを近似します。ブラウザが計算したロールを使用し、アクセシブルな名前もマッチできる[ロールセレクター](#role-selector)の使用を推奨します：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID属性

ロケーター戦略「id」はWebDriverプロトコルではサポートされていません。IDを使用して要素を検索するには、代わりにCSSまたはxPathのセレクター戦略を使用してください。

ただし、一部のドライバー（例：[Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)）では、引き続きこのセレクターが[サポート](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)されている場合があります。

現在サポートされているIDのセレクター構文は次のとおりです：

```js
//cssロケーター
const button = await $('#someid')
//xpathロケーター
const button = await $('//*[@id="someid"]')
//id戦略
// 注意：ロケーター戦略「ID」をサポートするAppiumまたは同様のフレームワークでのみ動作します
const button = await $('id=resource-id/iosname')
```

## JS関数

JavaScript関数を使用して、Webネイティブ APIで要素を取得することもできます。もちろん、これはWebコンテキスト内（例：`browser`、またはモバイルのWebコンテキスト）でのみ可能です。

次のHTML構造があるとします：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

`#elem`の兄弟要素は次のように検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## ディープセレクター

:::warning

WebdriverIOの`v9`以降では、WebdriverIOが自動的にShadow DOMを貫通するため、この特別なセレクターは不要です。前に付いている`>>>`を削除して、このセレクターから移行することを推奨します。

:::

WebDriver BiDiセッションでは、`$`と`$$`はすべてのオープンなShadow Rootを検索します：`attachShadow()`で作成されたルートと、ページまたは`setHTMLUnsafe()`がドキュメントに追加する宣言的Shadow Root（`<template shadowrootmode="open">`）です。クローズドな宣言的Shadow Rootや、まだドキュメント内にない要素に`setHTMLUnsafe()`が作成した宣言的Shadow Rootは検索しません。これらの場合は、ホスト要素に対して[`shadow$`](https://webdriver.io/docs/api/element/shadow$)を使用してください。

多くのフロントエンドアプリケーションは、[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)を持つ要素に大きく依存しています。回避策なしにShadow DOM内の要素を検索することは技術的に不可能です。[`shadow$`](https://webdriver.io/docs/api/element/shadow$)と[`shadow$$`](https://webdriver.io/docs/api/element/shadow$$)はそうした回避策でしたが、[制限](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow)がありました。ディープセレクターを使用すると、一般的なクエリコマンドで任意のShadow DOM内のすべての要素を検索できるようになりました。

次の構造を持つアプリケーションがあるとします：

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

このセレクターを使用すると、別のShadow DOM内にネストされた`<button />`要素を検索できます。例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## モバイルセレクター

ハイブリッドモバイルテストでは、コマンドを実行する前に自動化サーバーが正しい*コンテキスト*にあることが重要です。ジェスチャーを自動化する場合、ドライバーは理想的にはネイティブコンテキストに設定されている必要があります。しかし、DOMから要素を選択するには、ドライバーをプラットフォームのWebViewコンテキストに設定する必要があります。*そうして初めて*、上記のメソッドを使用できます。

ネイティブモバイルテストでは、コンテキストの切り替えはありません。モバイル戦略を使用し、基盤となるデバイス自動化技術を直接使用する必要があるためです。これは、テストで要素の検索をきめ細かく制御する必要がある場合に特に便利です。

### Android UiAutomator

AndroidのUI Automatorフレームワークは、要素を見つけるためのさまざまな方法を提供しています。[UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)、特に[UiSelectorクラス](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)を使用して要素を特定できます。Appiumでは、Javaコードを文字列としてサーバーに送信し、サーバーがアプリケーションの環境でそれを実行して、要素を返します。

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcherとViewMatcher（Espressoのみ）

AndroidのDataMatcher戦略は、[Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)によって要素を見つける方法を提供します。

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

iOSアプリケーションを自動化する場合、Appleの[UI Automationフレームワーク](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)を使用して要素を見つけることができます。

このJavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771)には、ビューとその上のすべてにアクセスするためのメソッドがあります。

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

AppiumのiOS UI Automation内で述語検索を使用して、要素の選択をさらに絞り込むこともできます。詳細は[こちら](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md)を参照してください。

### iOS XCUITestの述語文字列とクラスチェーン

iOS 10以降（`XCUITest`ドライバーを使用）では、[述語文字列](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules)を使用できます：

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

また、[クラスチェーン](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules)も使用できます：

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### アクセシビリティID

`accessibility id`ロケーター戦略は、UI要素の一意の識別子を読み取るように設計されています。これには、ローカライズやテキストを変更する可能性のあるその他のプロセスで変更されないという利点があります。さらに、機能的に同じ要素が同じアクセシビリティIDを持つ場合、クロスプラットフォームテストの作成にも役立ちます。

- iOSの場合、これはAppleが[こちら](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html)で定めている`accessibility identifier`です。
- Androidの場合、`accessibility id`は[こちら](https://developer.android.com/training/accessibility/accessible-app.html)で説明されているように、要素の`content-description`にマッピングされます。

どちらのプラットフォームでも、`accessibility id`で要素（または複数の要素）を取得するのが通常は最良の方法です。また、非推奨の`name`戦略よりも推奨される方法です。

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### クラス名

`class name`戦略は、現在のビュー上のUI要素を表す`string`です。

- iOSの場合、これは[UIAutomationクラス](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)の完全な名前で、テキストフィールドの`UIATextField`のように`UIA-`で始まります。完全なリファレンスは[こちら](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation)にあります。
- Androidの場合、これは[UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator)の[クラス](https://developer.android.com/reference/android/widget/package-summary.html)の完全修飾名で、テキストフィールドの`android.widget.EditText`のような形式です。完全なリファレンスは[こちら](https://developer.android.com/reference/android/widget/package-summary.html)にあります。
- Youi.tvの場合、これはYoui.tvクラスの完全な名前で、プッシュボタン要素の`CYIPushButtonView`のように`CYI-`で始まります。完全なリファレンスは[You.i Engine DriverのGitHubページ](https://github.com/YOU-i-Labs/appium-youiengine-driver)にあります。

```js
// iOSの例
await $('UIATextField').click()
// Androidの例
await $('android.widget.DatePicker').click()
// Youi.tvの例
await $('CYIPushButtonView').click()
```

## チェーンセレクター

クエリをより具体的にしたい場合は、正しい要素が見つかるまでセレクターをチェーンできます。
実際のコマンドの前に`element`を呼び出すと、WebdriverIOはその要素からクエリを開始します。

例えば、次のようなDOM構造があるとします：

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

製品Bをカートに追加したい場合、CSSセレクターだけでそれを行うのは困難です。

セレクターのチェーンを使えば、はるかに簡単になります。目的の要素を段階的に絞り込むだけです：

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium画像セレクター

`-image`ロケーター戦略を使用すると、アクセスしたい要素を表す画像ファイルをAppiumに送信できます。

サポートされているファイル形式 `jpg,png,gif,bmp,svg`

完全なリファレンスは[こちら](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)にあります。

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**注意**：Appiumがこのセレクターを扱う方法は、内部で（アプリの）スクリーンショットを撮影し、提供された画像セレクターを使用して
その（アプリの）スクリーンショット内で要素が見つかるかどうかを検証するというものです。

Appiumは、撮影した（アプリの）スクリーンショットを（アプリの）画面のCSSサイズに合わせるためにリサイズする場合があることに注意してください（これは
iPhoneだけでなく、DPRが1より大きいRetinaディスプレイ搭載のMacでも発生します）。その結果、提供された画像セレクターが
元のスクリーンショットから取得されたものである場合、マッチが見つからなくなります。
これはAppium Serverの設定を更新することで修正できます。設定については[Appiumのドキュメント](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)を、
詳しい説明については[このコメント](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579)を参照してください。

## Reactセレクター

WebdriverIOは、コンポーネント名に基づいてReactコンポーネントを選択する方法を提供しています。これを行うには、`react$`と`react$$`の2つのコマンドから選択できます。

これらのコマンドを使用すると、[React VirtualDOM](https://reactjs.org/docs/faq-internals.html)からコンポーネントを選択し、単一のWebdriverIO要素または要素の配列を返すことができます（使用する関数によって異なります）。

**注意**：`react$`と`react$$`コマンドは機能的に似ていますが、`react$$`はマッチする*すべての*インスタンスをWebdriverIO要素の配列として返し、`react$`は最初に見つかったインスタンスを返します。

これらのコマンドは、`createRoot`または`ReactDOM.render`で起動するアプリに対して、React 16から19で動作します。現在のレンダリングのコンポーネントを読み取るため、状態の変更によって追加されたコンポーネントも見つけることができます。Reactがまだページのルートをレンダリングしていない場合は、最大5秒間待機します。

#### 基本的な例

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

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

createRoot(document.querySelector('#root')).render(<App />)
```

上記のコードでは、アプリケーション内にシンプルな`MyComponent`インスタンスがあり、Reactはそれを`id="root"`を持つHTML要素内にレンダリングしています。

`browser.react$`コマンドを使用すると、`MyComponent`のインスタンスを選択できます：

```js
const myCmp = await browser.react$('MyComponent')
```

WebdriverIO要素を`myCmp`変数に格納したので、それに対して要素コマンドを実行できます。

#### コンポーネントのフィルタリング

コンポーネントのpropsおよび/またはstateで選択をフィルタリングできます。そのためには、コマンドの第2引数に`props`および/または`state`を渡します。

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

stateで選択をフィルタリングしたい場合、`browser`コマンドは次のようになります：

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

フィルターは、そのキーのうちコンポーネントも持っているものがそれぞれ一致したときにマッチします。コンポーネントが持っていないキーは無視されます。ネストされたオブジェクトも同じ方法でマッチし、配列はコンポーネントの配列と共通の値を1つ持っていればマッチします。`null`、`false`、`0`は同じ値にマッチします。フックを使用する関数コンポーネントの場合、stateは最初のフック（`useState`または`useReducer`）のstateです。最初のフックが別のフック（例えば`useRef`）である場合、stateフィルターはマッチしません。`props`と`state`の両方を指定した場合、コンポーネントは両方にマッチする必要があります。

#### セレクターのルール

- `*`は1文字以上にマッチします：`browser.react$$('My*')`は`MyComponent`と`MyOtherComponent`を見つけます。
- スペースで区切られた名前は、別のコンポーネント内のコンポーネントを見つけます：`browser.react$$('List Item')`は`List`内の各`Item`を見つけます。
- コンポーネントの名前は、その`displayName`、またはそれがない場合は関数またはクラスの名前です。`React.memo`のコンポーネントは、その関数の名前を持ちます（React 17の開発ビルドでは、memoオブジェクトの`displayName`も付与されます）。`React.forwardRef`のコンポーネントは、`displayName`がない限り名前を持ちません。
- `withRouter(MyComponent)`のような名前を持つ高階コンポーネントの場合、括弧内の名前`MyComponent`が使用されます。
- 要素スコープがない場合、コマンドはページのすべてのReactルートをドキュメントの順序で検索します。他のルート内のルートや、オープンなShadow Root内のルートも対象です。`react$`は最初のマッチを返します。1つのルートのみを検索するには、そのコンテナまたはそのルートの要素に対してコマンドを呼び出します：`$('#other-root').react$$('MyComponent')`。
- 結果はルートごとに順番に返されます。1つのルート内では、ドキュメントの順序ではなく、コンポーネントツリーの順序でレベルごとに返されます。`react$$`は各DOMノードを1回ずつ返します。
- フレーム内のアプリの場合は、フレームのブラウジングコンテキスト、またはフレームの要素に対してコマンドを呼び出します：`(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`。

既知の制限：

- テキストのみをレンダリングするコンポーネントはテキストノードを返します。WebDriver Classicではテキストノードを返送できないため、コマンドは`javascript error: circular reference`で失敗します。
- Reactがサーバーレンダリングされたページの`Suspense`境界をハイドレートしている間、その内部のコンポーネントはまだ存在しません。ページのハイドレーションが完了するまで待機してください。

#### `React.Fragment`の扱い

`react$`コマンドを使用してReactの[フラグメント](https://reactjs.org/docs/fragments.html)を選択する場合、WebdriverIOはそのコンポーネントの最初の子をコンポーネントのノードとして返します。`react$$`を使用すると、セレクターにマッチするフラグメント内のすべてのHTMLノードを含む配列を受け取ります。

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
await browser.react$('MyComponent') // 最初の<div />のWebdriverIO要素を返す
await browser.react$$('MyComponent') // 配列[<div />, <div />]のWebdriverIO要素を返す
```

**注意：** `MyComponent`のインスタンスが複数あり、`react$$`を使用してこれらのフラグメントコンポーネントを選択した場合、すべてのノードを含む1次元配列が返されます。つまり、`<MyComponent />`インスタンスが3つある場合、6つのWebdriverIO要素を含む配列が返されます。

## カスタムセレクター戦略


アプリで要素を取得する特定の方法が必要な場合は、`custom$`と`custom$$`で使用できるカスタムセレクター戦略を自分で定義できます。そのためには、テストの最初に一度、例えば`before`フック内で戦略を登録します：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

次のHTMLスニペットがあるとします：

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

次のように呼び出して使用します：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**注意：** これは、[`execute`](/docs/api/browser/execute)コマンドを実行できるWeb環境でのみ動作します。