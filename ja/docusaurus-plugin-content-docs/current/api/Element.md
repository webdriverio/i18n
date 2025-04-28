---
id: element
title: Elementオブジェクト
---

Elementオブジェクトは、リモートユーザーエージェント上の要素を表すオブジェクトです。例えば、ブラウザ内でセッションを実行する場合の[DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element)や、モバイルの場合の[モバイル要素](https://developer.apple.com/documentation/swift/sequence/element)などです。これは、[`$`](/docs/api/element/$)、[`custom$`](/docs/api/element/custom$)、[`react$`](/docs/api/element/react$)、[`shadow$`](/docs/api/element/shadow$)などの様々な要素クエリコマンドを使用して取得できます。

## プロパティ

要素オブジェクトには次のプロパティがあります：

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `sessionId` | `String` | リモートサーバーから割り当てられたセッションID。 |
| `elementId` | `String` | プロトコルレベルで要素とやり取りするために使用できる関連[ウェブ要素参照](https://w3c.github.io/webdriver/#elements)。 |
| `selector` | `String` | 要素をクエリするために使用される[セレクタ](/docs/selectors)。 |
| `parent` | `Object` | 要素がブラウザから取得された場合は[ブラウザオブジェクト](/docs/api/browser)（例：`const elem = browser.$('selector')`）、または要素のスコープから取得された場合は[要素オブジェクト](/docs/api/element)（例：`elem.$('selector')`）。 |
| `options` | `Object` | ブラウザオブジェクトの作成方法に応じたWebdriverIO[オプション](/docs/configuration)。詳細は[セットアップタイプ](/docs/setuptypes)を参照してください。 |

## メソッド
要素オブジェクトは、プロトコルセクション（例：[WebDriver](/docs/api/webdriver)プロトコル）からのすべてのメソッドと、要素セクション内にリストされているコマンドを提供します。利用可能なプロトコルコマンドはセッションのタイプによって異なります。自動化されたブラウザセッションを実行している場合、Appiumの[コマンド](/docs/api/appium)は利用できません（その逆も同様）。

さらに、以下のコマンドが利用可能です：

| 名前 | パラメータ | 詳細 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (型: `String`)<br />- `fn` (型: `Function`) | コンポジション目的でブラウザオブジェクトから呼び出せるカスタムコマンドを定義できます。詳細は[カスタムコマンド](/docs/customcommands)ガイドをご覧ください。 |
| `overwriteCommand` | - `commandName` (型: `String`)<br />- `fn` (型: `Function`) | カスタム機能でブラウザコマンドを上書きできます。フレームワークユーザーを混乱させる可能性があるため、慎重に使用してください。詳細は[カスタムコマンド](/docs/customcommands#overwriting-native-commands)ガイドをご覧ください。 |

## 備考

### 要素チェーン

WebdriverIOでは要素を操作する際に、要素の検索と複雑なネストされた要素の検索を簡素化する特別な構文を提供しています。要素オブジェクトは、そのツリーブランチ内の要素を一般的なクエリメソッドを使用して検索できるため、ユーザーは次のようにネストされた要素を取得できます：

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // "I am a headline"と出力
```

深くネストされた構造では、ネストされた要素を配列に割り当てて使用すると冗長になる場合があります。そのため、WebdriverIOには次のようにネストされた要素を取得できるチェーン要素クエリの概念があります：

```js
console.log(await $('#header').$('#headline').getText())
```

これは要素のセットを取得する場合にも機能します：

```js
// 2番目のヘッダー内の3番目の見出しのテキストを取得
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

要素のセットを扱う場合、これは特に便利です。次のようにするのではなく：

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

要素チェーンで直接配列メソッドを呼び出すことができます：

```js
const location = await $$('div').map((el) => el.getLocation())
```

これは次と同じです：

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIOは非同期イテレータをサポートするカスタム実装を使用しているため、これらのユースケースでもそのAPIのすべてのコマンドがサポートされています。

__注意：__ コールバックがプロミスを返さない場合でも、すべての非同期イテレータはプロミスを返します：

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ "Promise<string>[]"を返す
console.log(await divs.map((div) => div.selector)) // ✅ "string[]"を返す
```

### カスタムコマンド

ブラウザスコープにカスタムコマンドを設定して、よく使用されるワークフローを抽象化することができます。詳細については、[カスタムコマンド](/docs/customcommands#adding-custom-commands)ガイドをご覧ください。