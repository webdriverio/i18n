---
id: custommatchers
title: カスタムマッチャー
---

WebdriverIOは、Webおよびモバイルテストの実行に特化した特別な機能とカスタムマッチャーを備えたJestスタイルの[`expect`](https://webdriver.io/docs/api/expect-webdriverio)アサーションライブラリを使用しています。マッチャーのライブラリは大きいですが、すべての可能な状況に対応できるわけではありません。そのため、既存のマッチャーをユーザー定義のカスタムマッチャーで拡張することが可能です。

:::warning

現在、[`browser`](/docs/api/browser)オブジェクトに特化したマッチャーと[element](/docs/api/element)インスタンスに特化したマッチャーの定義方法に違いはありませんが、将来的には変更される可能性があります。この開発に関する詳細情報は[`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408)をご確認ください。

:::

## カスタムブラウザマッチャー

カスタムブラウザマッチャーを登録するには、specファイルで直接、または`wdio.conf.js`の`before`フックなどの一部として、`expect`オブジェクトの`extend`を呼び出します：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

例に示すように、マッチャー関数は最初のパラメータとして期待されるオブジェクト（ブラウザやエレメントオブジェクトなど）を受け取り、2番目のパラメータとして期待値を受け取ります。次のようにマッチャーを使用できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## カスタムエレメントマッチャー

カスタムブラウザマッチャーと同様に、エレメントマッチャーも違いはありません。以下は、エレメントのaria-labelをアサートするためのカスタムマッチャーを作成する例です：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

これにより、次のようにアサーションを呼び出すことができます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScriptサポート

TypeScriptを使用している場合、カスタムマッチャーの型安全性を確保するためにもう一つのステップが必要です。`Matcher`インターフェースをカスタムマッチャーで拡張することで、すべての型の問題がなくなります：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

カスタム[非対称マッチャー](https://jestjs.io/docs/expect#expectextendmatchers)を作成した場合、同様に`expect`型を次のように拡張できます：

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```