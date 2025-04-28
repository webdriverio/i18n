---
id: element
title: エレメントオブジェクト
---

エレメントオブジェクトは、リモートユーザーエージェント上の要素を表すオブジェクトです。例えば、ブラウザ内でセッションを実行する場合の[DOM ノード](https://developer.mozilla.org/en-US/docs/Web/API/Element)や、モバイルの場合の[モバイル要素](https://developer.apple.com/documentation/swift/sequence/element)などです。これは、[`$`](/docs/api/element/$)、[`custom$`](/docs/api/element/custom$)、[`react$`](/docs/api/element/react$)、[`shadow$`](/docs/api/element/shadow$)などの多くの要素クエリコマンドの1つを使用して取得できます。

## プロパティ

エレメントオブジェクトには以下のプロパティがあります：

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `sessionId` | `String` | リモートサーバーから割り当てられたセッションID。 |
| `elementId` | `String` | プロトコルレベルで要素と対話するために使用できる関連する[ウェブ要素参照](https://w3c.github.io/webdriver/#elements) |
| `selector` | `String` | 要素を問い合わせるために使用される[セレクター](/docs/selectors)。 |
| `parent` | `Object` | 要素がブラウザから取得された場合は[ブラウザオブジェクト](/docs/api/browser)（例：`const elem = browser.$('selector')`）、または要素のスコープから取得された場合は[エレメントオブジェクト](/docs/api/element)（例：`elem.$('selector')`） |
| `options` | `Object` | ブラウザオブジェクトの作成方法に応じたWebdriverIO[オプション](/docs/configuration)。詳細は[セットアップタイプ](/docs/setuptypes)を参照。 |

## メソッド
エレメントオブジェクトは、[WebDriver](/docs/api/webdriver)プロトコルなどのプロトコルセクションからのすべてのメソッド、および要素セクション内にリストされているコマンドを提供します。利用可能なプロトコルコマンドはセッションのタイプによって異なります。自動化されたブラウザセッションを実行している場合、Appiumの[コマンド](/docs/api/appium)は使用できません（その逆も同様）。

さらに、以下のコマンドが利用可能です：

| 名前 | パラメータ | 詳細 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (型: `String`)<br />- `fn` (型: `Function`) | 構成目的のためにブラウザオブジェクトから呼び出すことができるカスタムコマンドを定義できます。詳細は[カスタムコマンド](/docs/customcommands)ガイドを参照してください。 |
| `overwriteCommand` | - `commandName` (型: `String`)<br />- `fn` (型: `Function`) | カスタム機能を持つブラウザコマンドを上書きすることができます。フレームワークユーザーを混乱させる可能性があるため、慎重に使用してください。詳細は[カスタムコマンド](/docs/customcommands#overwriting-native-commands)ガイドを参照してください。 |

## 備考

### 要素チェーン

要素を操作する際、WebdriverIOは要素のクエリを簡素化し、複雑なネストされた要素の検索を組み合わせるための特別な構文を提供します。要素オブジェクトは、共通のクエリメソッドを使用してそのツリーブランチ内の要素を見つけることができるため、ユーザーは以下のようにネストされた要素を取得できます：

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // "I am a headline"を出力
```

深くネストされた構造では、ネストされた要素を配列に割り当ててから使用するのは冗長になる場合があります。そのため、WebdriverIOには連鎖された要素クエリの概念があり、次のようにネストされた要素を取得できます：

```js
console.log(await $('#header').$('#headline').getText())
```

これは要素のセットを取得する場合にも機能します：

```js
// 2番目のヘッダー内の3番目の見出しのテキストを取得
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

要素のセットを扱う場合、これは特に要素と対話しようとするときに便利です。次のようにする代わりに：

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

要素チェーンに直接配列メソッドを呼び出すことができます：

```js
const location = await $$('div').map((el) => el.getLocation())
```

次と同じです：

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIOは、内部で非同期イテレータをサポートするカスタム実装を使用しているため、これらのユースケースでもそのAPIのすべてのコマンドがサポートされています。

__注意：__ すべての非同期イテレータは、コールバックがプロミスを返さない場合でもプロミスを返します：

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ "Promise<string>[]"を返す
console.log(await divs.map((div) => div.selector)) // ✅ "string[]"を返す
```

### カスタムコマンド

ブラウザスコープにカスタムコマンドを設定して、よく使用されるワークフローを抽象化することができます。詳細については、[カスタムコマンド](/docs/customcommands#adding-custom-commands)に関するガイドをご覧ください。