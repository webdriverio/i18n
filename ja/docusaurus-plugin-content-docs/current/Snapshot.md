---
id: snapshot
title: スナップショット
---

スナップショットテストは、コンポーネントやロジックの様々な側面を同時に検証するのに非常に役立ちます。WebdriverIOでは、任意のオブジェクトだけでなく、WebElement DOMの構造やWebdriverIOコマンドの結果のスナップショットを撮ることができます。

他のテストフレームワークと同様に、WebdriverIOは与えられた値のスナップショットを撮り、テストと一緒に保存されている参照スナップショットファイルと比較します。2つのスナップショットが一致しない場合、テストは失敗します：変更が予期しないものであるか、参照スナップショットを結果の新しいバージョンに更新する必要があります。

:::info クロスプラットフォームサポート

これらのスナップショット機能は、Node.js環境でのエンドツーエンドテストの実行だけでなく、ブラウザやモバイルデバイスでの[ユニットテストやコンポーネントテスト](/docs/component-testing)の実行にも使用できます。

:::

## スナップショットの使用
値のスナップショットを撮るには、[`expect()`](/docs/api/expect-webdriverio) APIの`toMatchSnapshot()`を使用できます：

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

このテストが初めて実行されると、WebdriverIOは次のようなスナップショットファイルを作成します：

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

スナップショットの成果物はコード変更とともにコミットし、コードレビュープロセスの一部として確認する必要があります。その後のテスト実行では、WebdriverIOはレンダリングされた出力を以前のスナップショットと比較します。一致すれば、テストは合格します。一致しない場合は、テストランナーがコードのバグを発見したか、実装が変更されてスナップショットを更新する必要があります。

スナップショットを更新するには、`wdio`コマンドに`-s`フラグ（または`--updateSnapshot`）を渡します：

```sh
npx wdio run wdio.conf.js -s
```

__注意：__ 複数のブラウザで並列にテストを実行する場合でも、1つのスナップショットのみが作成され、比較されます。ケイパビリティごとに別々のスナップショットが必要な場合は、[イシューを作成](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E)して、ユースケースについて教えてください。

## インラインスナップショット

同様に、`toMatchInlineSnapshot()`を使用してテストファイル内にインラインでスナップショットを保存することができます。

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

これにより、異なるファイル間を行き来することなく、期待される出力を直接確認できます。

## ビジュアルスナップショット

要素のDOMスナップショットを撮ることは、特にDOM構造が大きすぎて動的な要素プロパティを含む場合、最適なアイデアではないかもしれません。このような場合は、要素のビジュアルスナップショットに頼ることをお勧めします。

ビジュアルスナップショットを有効にするには、セットアップに`@wdio/visual-service`を追加します。ビジュアルテストの[ドキュメント](/docs/visual-testing#installation)にあるセットアップ手順に従うことができます。

その後、`toMatchElementSnapshot()`を通じてビジュアルスナップショットを撮ることができます：

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

画像はベースラインディレクトリに保存されます。詳細については[ビジュアルテスト](/docs/visual-testing)をご覧ください。