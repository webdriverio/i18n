---
id: custommatchers
title: カスタムマッチャー
description: "expect.extend を使用してカスタムのブラウザマッチャーおよび要素マッチャーを登録し、それらに TypeScript の型を追加します。"
---

WebdriverIO は Jest スタイルの [`expect`](https://webdriver.io/docs/api/expect-webdriverio) アサーションライブラリを使用しており、Web およびモバイルテストの実行に特化した特別な機能とカスタムマッチャーを備えています。マッチャーのライブラリは大規模ですが、あらゆる状況に対応できるわけではありません。そのため、独自に定義したカスタムマッチャーで既存のマッチャーを拡張することができます。

:::warning

現在のところ、[`browser`](/docs/api/browser) オブジェクトに固有のマッチャーと [element](/docs/api/element) インスタンスに固有のマッチャーの定義方法に違いはありませんが、これは将来変更される可能性があります。この開発に関する詳細については、[`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) を注視してください。

:::

:::info Jasmine

Jasmine フレームワークでは、テストが実行される前に、スペックファイル内または `before` フックで `expect.extend` を呼び出してください。マッチャーは Jasmine の非同期マッチャーになるため、`await` してください。Jasmine の同期マッチャーと同じ名前を持つマッチャーは、WebdriverIO のマッチャーと同様に、WebdriverIO の値に対してのみ実行されます。カスタムの非対称マッチャー（`expect.myMatcher()`）は使用できません。同期マッチャーには `jasmine.addMatchers` を、非同期マッチャーには `jasmine.addAsyncMatchers` を使用することもできます。詳しくは [Jasmine カスタムマッチャーのチュートリアル](https://jasmine.github.io/tutorials/custom_matchers)を参照してください。

:::

## カスタムブラウザマッチャー

カスタムブラウザマッチャーを登録するには、スペックファイル内で直接、または `wdio.conf.js` の `before` フックなどの一部として、`expect` オブジェクトの `extend` を呼び出します：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

例に示されているように、マッチャー関数は第1引数として期待されるオブジェクト（例：browser オブジェクトまたは element オブジェクト）を、第2引数として期待値を受け取ります。その後、次のようにマッチャーを使用できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## カスタム要素マッチャー

カスタムブラウザマッチャーと同様に、要素マッチャーにも違いはありません。以下は、要素の aria-label をアサートするカスタムマッチャーを作成する方法の例です：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

これにより、次のようにアサーションを呼び出すことができます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript サポート

TypeScript を使用している場合、カスタムマッチャーの型安全性を確保するためにもう1つの手順が必要です。カスタムマッチャーで `Matcher` インターフェースを拡張することで、すべての型の問題が解消されます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

カスタムの[非対称マッチャー](https://jestjs.io/docs/expect#expectextendmatchers)を作成した場合は、同様に次のように `expect` の型を拡張できます：

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```