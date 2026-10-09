---
id: snapshot
title: スナップショット
description: "スナップショットテストとインラインスナップショットテストでオブジェクト、DOM構造、コマンド結果をアサートし、ビジュアルスナップショットを比較します。"
---

スナップショットテストは、コンポーネントやロジックのさまざまな側面を同時にアサートするのに非常に役立ちます。WebdriverIOでは、任意のオブジェクトだけでなく、WebElementのDOM構造やWebdriverIOコマンドの結果のスナップショットを取得することができます。

他のテストフレームワークと同様に、WebdriverIOは指定された値のスナップショットを取得し、テストと一緒に保存されている参照スナップショットファイルと比較します。2つのスナップショットが一致しない場合、テストは失敗します。これは、変更が予期しないものであるか、参照スナップショットを結果の新しいバージョンに更新する必要があることを意味します。

:::info クロスプラットフォームサポート

これらのスナップショット機能は、Node.js環境内でエンドツーエンドテストを実行する場合だけでなく、ブラウザやモバイルデバイスで[ユニットテストとコンポーネントテスト](/docs/component-testing)を実行する場合にも利用できます。

:::

## スナップショットの使用
値のスナップショットを取得するには、[`expect()`](/docs/api/expect-webdriverio) APIの`toMatchSnapshot()`を使用できます：

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

このテストを初めて実行すると、WebdriverIOは次のようなスナップショットファイルを作成します：

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

スナップショットのアーティファクトはコードの変更と一緒にコミットし、コードレビュープロセスの一部としてレビューする必要があります。以降のテスト実行時に、WebdriverIOはレンダリングされた出力を以前のスナップショットと比較します。一致すればテストは成功します。一致しない場合は、テストランナーが修正すべきコードのバグを発見したか、実装が変更されてスナップショットを更新する必要があるかのどちらかです。

スナップショットを更新するには、`wdio`コマンドに`-s`フラグ（または`--updateSnapshot`）を渡します。例：

```sh
npx wdio run wdio.conf.js -s
```

__注意：__ 複数のブラウザで並列にテストを実行する場合、作成されて比較されるスナップショットは1つだけです。ケイパビリティごとに個別のスナップショットが必要な場合は、[issueを作成](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E)して、ユースケースをお知らせください。

## インラインスナップショット

同様に、`toMatchInlineSnapshot()`を使用して、スナップショットをテストファイル内にインラインで保存することができます。

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

スナップショットファイルを作成する代わりに、Vitestはテストファイルを直接変更して、スナップショットを文字列として更新します：

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

これにより、異なるファイル間を移動することなく、期待される出力を直接確認することができます。

## ビジュアルスナップショット

要素のDOMスナップショットを取得することは、特にDOM構造が大きすぎる場合や動的な要素プロパティを含む場合には、最良の方法ではないかもしれません。このような場合は、要素のビジュアルスナップショットを利用することをお勧めします。

ビジュアルスナップショットを有効にするには、セットアップに`@wdio/visual-service`を追加してください。ビジュアルテストの[ドキュメント](/docs/visual-testing#installation)にあるセットアップ手順に従うことができます。

その後、`toMatchElementSnapshot()`を使用してビジュアルスナップショットを取得できます。例：

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

画像はベースラインディレクトリに保存されます。詳細については、[ビジュアルテスト](/docs/visual-testing)をご覧ください。