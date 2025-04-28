---
id: custommatchers
title: カスタムマッチャー
---

WebdriverIOはJestスタイルの[`expect`](https://webdriver.io/docs/api/expect-webdriverio)アサーションライブラリを使用しており、Webおよびモバイルテストの実行に特化した特別な機能とカスタムマッチャーが付属しています。マッチャーのライブラリは大きいですが、あらゆる状況に対応しているわけではありません。そのため、既存のマッチャーをユーザー定義のカスタムマッチャーで拡張することが可能です。

:::warning

現在、[`browser`](/docs/api/browser)オブジェクト固有のマッチャーと[element](/docs/api/element)インスタンス固有のマッチャーの定義方法に違いはありませんが、将来的には変更される可能性があります。この開発に関する詳細情報については、[`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408)に注目してください。

:::

## カスタムブラウザマッチャー

カスタムブラウザマッチャーを登録するには、specファイル内で直接、または例えば`wdio.conf.js`の`before`フック内で`expect`オブジェクトの`extend`を呼び出します。

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

例に示すように、マッチャー関数は最初のパラメータとして期待されるオブジェクト（例：ブラウザまたは要素オブジェクト）を取り、2番目のパラメータとして期待値を取ります。その後、次のようにマッチャーを使用できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## カスタム要素マッチャー

カスタムブラウザマッチャーと同様に、要素マッチャーも異なりません。要素のaria-labelをアサートするためのカスタムマッチャーを作成する例を以下に示します：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

これにより、以下のようにアサーションを呼び出すことができます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScriptサポート

TypeScriptを使用している場合は、カスタムマッチャーの型安全性を確保するためにもう一つのステップが必要です。カスタムマッチャーで`Matcher`インターフェースを拡張することで、すべての型の問題が解消されます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

カスタム[非対称マッチャー](https://jestjs.io/docs/expect#expectextendmatchers)を作成した場合は、以下のように同様に`expect`型を拡張できます：

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```