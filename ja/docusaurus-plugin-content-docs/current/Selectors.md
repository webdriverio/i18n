---
id: selectors
title: セレクター
description: "CSS、テキスト、XPath、アクセシビリティ名、ARIA ロールなどのセレクター戦略で要素を検索する方法と、最も堅牢なセレクターについて学びます。"
---

[WebDriver Protocol](https://w3c.github.io/webdriver/) には、要素を検索するためのセレクター戦略がいくつか用意されています。WebdriverIO はこれらを簡略化し、要素の選択を簡単にしています。要素を検索するコマンドは `$` と `$$` という名前ですが、jQuery や [Sizzle Selector Engine](https://github.com/jquery/sizzle) とは一切関係ありません。

利用できるセレクターは数多くありますが、正しい要素を堅牢に見つけられるものはごく一部です。例えば、次のボタンがあるとします：

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

以下のセレクターを推奨する __もの__ と推奨 __しない__ ものに分けて示します：

| セレクター | 推奨度 | 備考 |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 使用しない | 最悪 - 汎用的すぎて、コンテキストがない。 |
| `$('.btn.btn-large')` | 🚨 使用しない | 悪い。スタイリングと結合している。変更されやすい。 |
| `$('#main')` | ⚠️ 控えめに | より良い。ただし、依然としてスタイリングや JS イベントリスナーと結合している。 |
| `$(() => document.queryElement('button'))` | ⚠️ 控えめに | 効果的な検索だが、記述が複雑。 |
| `$('button[name="submission"]')` | ⚠️ 控えめに | HTML のセマンティクスを持つ `name` 属性と結合している。 |
| `$('button[data-testid="submit"]')` | ✅ 良い | 追加の属性が必要で、a11y とは関連しない。 |
| `$('aria/Submit')` | ✅ 良い | 良い。ユーザーがページを操作する方法に近い。翻訳が更新されてもテストが壊れないよう、翻訳ファイルを使用することを推奨します。WebDriver BiDi セッションではブラウザのアクセシビリティツリーを使用します。Classic セッションでは XPath にフォールバックするため、大きなページでは遅くなる場合があります。 |
| `$('button=Submit')` | ✅ 常に | 最良。ユーザーがページを操作する方法に近く、高速。翻訳が更新されてもテストが壊れないよう、翻訳ファイルを使用することを推奨します。 |

## Strict モード

v10 以降、[`$`](/docs/api/browser/$) コマンドは __strict__ です：これは正確に 1 つの要素を表します。セレクターが複数の要素に一致した場合、コマンドは最初に一致した要素を黙って選択するのではなく、`StrictSelectorError` をスローします：

```js
// ページ上に 12 個のボタンがある
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

これは [Playwright のロケーター](https://playwright.dev/docs/locators#strictness) と同じ動作です。Cypress は異なります：Cypress のクエリは複数の要素に解決されることがあり、デフォルトで複数要素のサブジェクトを拒否するのは [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) などのアクションコマンドです。Strict モードは範囲が広すぎるセレクターを明らかにします。そうしたセレクターは、ページが大きくなるとすぐに、気づかないうちに誤った要素を操作してしまいます。

このルールは [チェーン](#chain-selectors) のすべてのステップと、`$` が受け付けるすべてのセレクタータイプに適用されます — 文字列セレクター（Shadow DOM を貫通するものを含む）、[JS 関数](#js-function)、[モバイルセレクター](#mobile-selectors)、および [カスタム戦略](#custom-selector-strategies) の参照です。

### 影響を受けないもの

- `$$` は引き続き 0 個または複数の要素を [`ElementArray`](/docs/api/browser/$$) として返します。件数を読み取ったり `for...of` を使用したりする前に、リスト（またはその `.length`）を await してください。`for await` はリストに対して直接機能します。
- 専用のヘルパーコマンド `custom$`、`shadow$`、`react$` は strict ではありません — これらは引き続き最初に一致した要素を返します。対応する `$$` コマンドも同様です。
- 何にも一致しないセレクターは引き続き遅延解決される要素を返すため、[`waitForExist`](/docs/api/element/waitForExist) や [自動待機](/docs/autowait) の動作は変わりません。
- 要素参照を渡す場合（例：`$(await browser.getActiveElement())`）は常に単一のノードを参照するため、チェックされることはありません。

:::info v10 への移行

テストスイートの strict モード違反を監査する方法、個々のクエリを絞り込むまたはオプトアウトする方法、プロジェクト全体で strict モードを無効にする方法については、[v10 移行ガイド](/docs/v10-migration) を参照してください。

:::

## CSS クエリセレクター

特に指定がない場合、WebdriverIO は [CSS セレクター](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) パターンを使用して要素を検索します。例：

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
クエリ文字列の前に `*=` を付けて検索します（例：`*=driver`）。

上記の例の要素は、次のように呼び出しても検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__注意：__ 1 つのセレクター内で複数のセレクター戦略を混在させることはできません。同じ目的を達成するには、複数の要素クエリをチェーンしてください。例：

```js
const elem = await $('header h1*=Welcome') // 動作しません!!!
// 代わりにこちらを使用
const elem = await $('header').$('*=driver')
```

## 特定のテキストを持つ要素

同じテクニックは要素にも適用できます。さらに、クエリ内で `.=` または `.*=` を使用すると、大文字と小文字を区別しないマッチングも可能です。

例えば、テキスト「Welcome to my Page」を持つレベル 1 見出しのクエリは次のとおりです：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

この要素は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

または部分テキストでクエリする場合：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

`id` や `class` 名でも同様に機能します：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

この要素は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__注意：__ 1 つのセレクター内で複数のセレクター戦略を混在させることはできません。同じ目的を達成するには、複数の要素クエリをチェーンしてください。例：

```js
const elem = await $('header h1*=Welcome') // 動作しません!!!
// 代わりにこちらを使用
const elem = await $('header').$('h1*=Welcome')
```

## タグ名

特定のタグ名を持つ要素を検索するには、`<tag>` または `<tag />` を使用します。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

この要素は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name 属性

特定の name 属性を持つ要素を検索するには、`[name="some-name"]` のような CSS セレクターを使用します。モバイルセッションでは、同じ省略記法が Appium の `name` ロケーター戦略で送信されます：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__注意：__ `name` ロケーター戦略は Appium のロケーターです。デスクトップセッションでは、`[name="some-name"]` は CSS 戦略のまま使用されます。

## xPath

特定の [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) を使用して要素を検索することもできます。

xPath セレクターは `//body/div[6]/div[1]/span[1]` のような形式です。

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

2 番目の段落は次のように呼び出して検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

xPath を使用して DOM ツリーを上下に辿ることもできます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## アクセシビリティ名セレクター

アクセシブルな名前で要素を検索します。アクセシブルな名前とは、要素がフォーカスを受けたときにスクリーンリーダーによって読み上げられるものです。アクセシブルな名前の値は、視覚的なコンテンツと非表示の代替テキストのどちらでもかまいません。

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) セッション（Chrome、Edge、Firefox、およびその他の BiDi 対応ブラウザ）では、WebdriverIO はまずアクセシビリティロケーターを指定して [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) を使用します。これはブラウザのアクセシビリティツリーを直接検索するため、通常は XPath による近似よりもはるかに高速です。アクセシビリティロケーターで何も見つからない場合、WebdriverIO は Classic の XPath ヒューリスティックにフォールバックするため、既存の `aria/` クエリは引き続き一致します。

:::info

このセレクターの詳細については、[リリースブログ記事](/blog/2022/09/05/accessibility-selector) をご覧ください。

:::

### `aria-label` で取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### `aria-labelledby` で取得

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

### `alt` プロパティで取得

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ロールセレクター

スクリーンリーダーが要素を説明するのと同じ方法（「*Add to cart* ボタン」のように）で、ARIA ロールとアクセシブルな名前によって要素を検索します。ロールと名前の組み合わせは、クラス名、テスト ID、DOM 構造が変わっても一致し続けます。

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// ロールのみ
const rows = await $$('role/row')

// 親要素にスコープを限定
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

構文は `role/<role>` または `role/<role>[name="<accessible name>"]` です。シングルクォートも使用でき、名前の中の引用符はバックスラッシュでエスケープします：`role/button[name="Say \"hi\""]`。

- 名前はアクセシブルな名前全体と一致する必要があります。
- ロールは ARIA ロールである必要があります。タイプミスがあると、最も近い有効なロールを示して失敗します。例：`"buton" is not an ARIA role. Did you mean "button"?`。
- `img` と、その ARIA 1.3 での名前である `image` は同じロールです。
- このセレクターは、他のすべてのセレクターと同様に `$` の [strict モード](#strict-mode) に従います。

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) セッションでは、WebdriverIO はロールと名前を [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) に渡します。ブラウザは、支援技術がページを認識するのと同じ方法で、両方を自ら計算します。開いている Shadow Root 内やフレーム内（別オリジンのフレームを含む）の要素も見つかります。ブラウザが要素を見つけられなかった場合、ヒューリスティックへのフォールバックはありません。ロールを決定するのはブラウザであることに注意してください：例えば、ヘッダーやキャプションのない `<table>` はレイアウトテーブルとみなされることがあり、その場合その行には `row` ロールがありません。

WebDriver Classic セッションの場合、およびブラウザがロールロケーターをサポートしていない場合、WebdriverIO は Testing Library が使用している実装である [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api) を用いて、ページ内でロールとアクセシブルな名前を計算します。ラベルのないテキストフィールドは、ブラウザと同様に `placeholder` によって名前が付けられます。ロールセレクターはネイティブモバイルアプリのコンテキストでは使用できません。その場合は [accessibility id](#accessibility-id) を使用してください。

## ARIA - Role 属性

[ARIA ロール](https://www.w3.org/TR/html-aria/#docconformance) に基づいて要素を検索するには、セレクターパラメーターとして `[role=button]` のように要素のロールを直接指定できます。このセレクターは、要素名と属性からロールを近似します。ブラウザが計算したロールを使用し、アクセシブルな名前でも一致させることができる [ロールセレクター](#role-selector) を優先してください：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID 属性

ロケーター戦略「id」は WebDriver プロトコルではサポートされていません。ID を使用して要素を見つけるには、代わりに CSS または xPath セレクター戦略を使用してください。

ただし、一部のドライバー（例：[Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)）では、このセレクターを引き続き[サポート](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)している場合があります。

現在サポートされている ID のセレクター構文は次のとおりです：

```js
//css ロケーター
const button = await $('#someid')
//xpath ロケーター
const button = await $('//*[@id="someid"]')
//id 戦略
// 注意：Appium またはロケーター戦略「ID」をサポートする同様のフレームワークでのみ動作します
const button = await $('id=resource-id/iosname')
```

## JS 関数

JavaScript 関数を使用して、Web ネイティブ API で要素を取得することもできます。もちろん、これは Web コンテキスト内（例：`browser`、またはモバイルの Web コンテキスト）でのみ可能です。

次の HTML 構造があるとします：

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

`#elem` の兄弟要素は次のように検索できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## ディープセレクター

:::warning

WebdriverIO の `v9` 以降、WebdriverIO が自動的に Shadow DOM を貫通するため、この特別なセレクターは不要になりました。セレクターの前にある `>>>` を削除して、このセレクターから移行することを推奨します。

:::

多くのフロントエンドアプリケーションは、[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) を持つ要素に大きく依存しています。回避策なしに Shadow DOM 内の要素を検索することは技術的に不可能です。[`shadow$`](https://webdriver.io/docs/api/element/shadow$) と [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) はそのような回避策でしたが、[制限](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow)がありました。ディープセレクターを使用すると、一般的なクエリコマンドで任意の Shadow DOM 内のすべての要素を検索できるようになります。

次の構造を持つアプリケーションがあるとします：

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

このセレクターを使用すると、別の Shadow DOM 内にネストされた `<button />` 要素を検索できます。例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## モバイルセレクター

ハイブリッドモバイルテストでは、コマンドを実行する前に自動化サーバーが正しい *コンテキスト* にあることが重要です。ジェスチャーを自動化する場合、ドライバーは理想的にはネイティブコンテキストに設定する必要があります。しかし、DOM から要素を選択するには、ドライバーをプラットフォームの webview コンテキストに設定する必要があります。そうして *初めて* 上記のメソッドを使用できます。

ネイティブモバイルテストでは、モバイル戦略を使用し、基盤となるデバイス自動化技術を直接使用する必要があるため、コンテキストの切り替えはありません。これは、テストで要素の検索をきめ細かく制御する必要がある場合に特に便利です。

### Android UiAutomator

Android の UI Automator フレームワークには、要素を見つけるためのさまざまな方法があります。[UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)、特に [UiSelector クラス](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) を使用して要素を特定できます。Appium では、Java コードを文字列としてサーバーに送信し、サーバーがアプリケーションの環境でそれを実行して、要素を返します。

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher と ViewMatcher（Espresso のみ）

Android の DataMatcher 戦略は、[Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) によって要素を見つける方法を提供します。

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

同様に [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction) も使用できます。

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag（Espresso のみ）

View Tag 戦略は、[タグ](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) によって要素を見つける便利な方法を提供します。

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

iOS アプリケーションを自動化する場合、Apple の [UI Automation フレームワーク](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) を使用して要素を見つけることができます。

この JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) には、ビューとその上のすべてにアクセスするためのメソッドがあります。

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Appium の iOS UI Automation 内で述語検索を使用して、要素の選択をさらに絞り込むこともできます。詳細については[こちら](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md)を参照してください。

### iOS XCUITest の述語文字列とクラスチェーン

iOS 10 以降（`XCUITest` ドライバーを使用）では、[述語文字列](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules)を使用できます：

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

### Accessibility ID

`accessibility id` ロケーター戦略は、UI 要素の一意の識別子を読み取るように設計されています。これには、ローカライズやテキストを変更する可能性のあるその他のプロセスの間に変わらないという利点があります。さらに、機能的に同じ要素が同じ accessibility id を持っていれば、クロスプラットフォームテストの作成にも役立ちます。

- iOS では、これは Apple が[こちら](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html)で説明している `accessibility identifier` です。
- Android では、`accessibility id` は[こちら](https://developer.android.com/training/accessibility/accessible-app.html)で説明されているように、要素の `content-description` にマッピングされます。

どちらのプラットフォームでも、`accessibility id` で要素（または複数の要素）を取得するのが通常は最良の方法です。また、非推奨の `name` 戦略よりも推奨される方法です。

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### クラス名

`class name` 戦略は、現在のビュー上の UI 要素を表す `string` です。

- iOS では、[UIAutomation クラス](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)の完全な名前で、`UIA-` で始まります。例えば、テキストフィールドの場合は `UIATextField` です。完全なリファレンスは[こちら](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation)で確認できます。
- Android では、[UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) の[クラス](https://developer.android.com/reference/android/widget/package-summary.html)の完全修飾名です。例えば、テキストフィールドの場合は `android.widget.EditText` です。完全なリファレンスは[こちら](https://developer.android.com/reference/android/widget/package-summary.html)で確認できます。
- Youi.tv では、Youi.tv クラスの完全な名前で、`CYI-` で始まります。例えば、プッシュボタン要素の場合は `CYIPushButtonView` です。完全なリファレンスは [You.i Engine Driver の GitHub ページ](https://github.com/YOU-i-Labs/appium-youiengine-driver)で確認できます。

```js
// iOS の例
await $('UIATextField').click()
// Android の例
await $('android.widget.DatePicker').click()
// Youi.tv の例
await $('CYIPushButtonView').click()
```

## セレクターのチェーン

クエリをより具体的にしたい場合は、正しい要素が見つかるまでセレクターをチェーンできます。
実際のコマンドの前に `element` を呼び出すと、WebdriverIO はその要素からクエリを開始します。

例えば、次のような DOM 構造があるとします：

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

製品 B をカートに追加したい場合、CSS セレクターだけでそれを行うのは困難です。

セレクターのチェーンを使えば、はるかに簡単になります。目的の要素を段階的に絞り込むだけです：

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium 画像セレクター

`-image` ロケーター戦略を使用すると、アクセスしたい要素を表す画像ファイルを Appium に送信できます。

サポートされているファイル形式：`jpg,png,gif,bmp,svg`

完全なリファレンスは[こちら](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)で確認できます。

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**注意**：Appium がこのセレクターを処理する方法は、内部で（アプリの）スクリーンショットを撮り、提供された画像セレクターを使用して
その（アプリの）スクリーンショット内で要素が見つかるかどうかを検証するというものです。

Appium は、撮影した（アプリの）スクリーンショットを（アプリの）画面の CSS サイズに合わせてリサイズする場合があることに注意してください（これは
iPhone だけでなく、DPR が 1 より大きい Retina ディスプレイを搭載した Mac マシンでも発生します）。提供された画像セレクターが元のスクリーンショットから
取得されたものである可能性があるため、その結果一致が見つからなくなります。
これは Appium Server の設定を更新することで修正できます。設定については [Appium ドキュメント](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)を、
詳細な説明については[こちらのコメント](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579)を参照してください。

## React セレクター

WebdriverIO は、コンポーネント名に基づいて React コンポーネントを選択する方法を提供しています。これには、`react$` と `react$$` の 2 つのコマンドから選択できます。

これらのコマンドを使用すると、[React VirtualDOM](https://reactjs.org/docs/faq-internals.html) からコンポーネントを選択し、単一の WebdriverIO Element または要素の配列のいずれかを返すことができます（使用する関数によって異なります）。

**注意**：コマンド `react$` と `react$$` は機能的に似ていますが、`react$$` は一致する *すべての* インスタンスを WebdriverIO 要素の配列として返し、`react$` は最初に見つかったインスタンスを返します。

これらのコマンドは、`createRoot` または `ReactDOM.render` で起動するアプリに対して、React 16 から 19 で動作します。現在のレンダリングのコンポーネントを読み取るため、状態の変更によって追加されたコンポーネントも見つけられます。React がまだページのルートをレンダリングしていない場合は、最大 5 秒間待機します。

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

上記のコードでは、アプリケーション内にシンプルな `MyComponent` インスタンスがあり、React はそれを `id="root"` を持つ HTML 要素内にレンダリングしています。

`browser.react$` コマンドを使用すると、`MyComponent` のインスタンスを選択できます：

```js
const myCmp = await browser.react$('MyComponent')
```

WebdriverIO 要素が `myCmp` 変数に格納されたので、それに対して要素コマンドを実行できます。

#### コンポーネントのフィルタリング

コンポーネントの props および/または state で選択をフィルタリングできます。そのためには、コマンドの第 2 引数に `props` および/または `state` を渡します。

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

prop `name` が `WebdriverIO` である `MyComponent` のインスタンスを選択したい場合は、次のようにコマンドを実行できます：

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

state で選択をフィルタリングしたい場合、`browser` コマンドは次のようになります：

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

フィルターは、コンポーネントも持っている各キーが一致した場合に一致します。コンポーネントが持っていないキーは無視されます。ネストされたオブジェクトも同じ方法で一致し、配列はコンポーネントの配列と共通の値を 1 つ持っていれば一致します。`null`、`false`、`0` は同じ値に一致します。フックを使用する関数コンポーネントの場合、state は最初のフック（`useState` または `useReducer`）の状態です：最初のフックが別のフック（例えば `useRef`）である場合、state フィルターは一致しません。`props` と `state` の両方を指定した場合、コンポーネントは両方に一致する必要があります。

#### セレクターのルール

- `*` は 1 文字以上に一致します：`browser.react$$('My*')` は `MyComponent` と `MyOtherComponent` を見つけます。
- スペースで区切られた名前は、別のコンポーネント内のコンポーネントを見つけます：`browser.react$$('List Item')` は `List` 内の各 `Item` を見つけます。
- コンポーネントの名前は、その `displayName`、またはそれがない場合は関数またはクラスの名前です。`React.memo` のコンポーネントは関数の名前を持ちます（React 17 の開発ビルドでは、memo オブジェクトの `displayName` も付与されます）。`React.forwardRef` のコンポーネントは、`displayName` がない限り名前を持ちません。
- `withRouter(MyComponent)` のような名前を持つ高階コンポーネントの場合、括弧内の名前 `MyComponent` が使用されます。
- 要素スコープがない場合、コマンドはページのすべての React ルートをドキュメントの順序で検索します。他のルート内のルートや、開いている Shadow Root 内のルートも対象です。`react$` は最初に一致したものを返します。1 つのルートのみを検索するには、そのコンテナまたはそのルートの要素に対してコマンドを呼び出します：`$('#other-root').react$$('MyComponent')`。
- 結果はルートごとに順に返されます。1 つのルート内では、ドキュメントの順序ではなく、コンポーネントツリーの順序でレベルごとに返されます。`react$$` は各 DOM ノードを 1 回だけ返します。
- フレーム内のアプリの場合は、フレームのブラウジングコンテキスト、またはフレームの要素に対してコマンドを呼び出します：`(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`。

既知の制限：

- テキストのみをレンダリングするコンポーネントは、テキストノードを返します。WebDriver Classic ではテキストノードを返送できないため、コマンドは `javascript error: circular reference` で失敗します。
- React がサーバーレンダリングされたページの `Suspense` 境界をハイドレートしている間、その中のコンポーネントはまだ存在しません。ページのハイドレーションが完了するまで待ってください。

#### `React.Fragment` の扱い

`react$` コマンドを使用して React の[フラグメント](https://reactjs.org/docs/fragments.html)を選択する場合、WebdriverIO はそのコンポーネントの最初の子をコンポーネントのノードとして返します。`react$$` を使用すると、セレクターに一致するフラグメント内のすべての HTML ノードを含む配列を受け取ります。

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
await browser.react$('MyComponent') // 最初の <div /> の WebdriverIO Element を返す
await browser.react$$('MyComponent') // 配列 [<div />, <div />] の WebdriverIO Elements を返す
```

**注意：** `MyComponent` のインスタンスが複数あり、`react$$` を使用してこれらのフラグメントコンポーネントを選択すると、すべてのノードの 1 次元配列が返されます。つまり、`<MyComponent />` のインスタンスが 3 つある場合、6 つの WebdriverIO 要素を含む配列が返されます。

## カスタムセレクター戦略


アプリで要素を取得する特定の方法が必要な場合は、`custom$` と `custom$$` で使用できるカスタムセレクター戦略を自分で定義できます。そのためには、テストの最初に一度だけ（例えば `before` フック内で）戦略を登録します：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

次の HTML スニペットがあるとします：

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

次のように呼び出して使用します：

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**注意：** これは [`execute`](/docs/api/browser/execute) コマンドを実行できる Web 環境でのみ機能します。