---
id: assertion
title: アサーション
description: "組み込みの expect-webdriverio ライブラリを使用してブラウザや要素の状態に対するアサーションを記述し、ソフトアサーションを活用し、Chai から移行する方法を紹介します。"
---

[WDIO テストランナー](https://webdriver.io/docs/clioptions)には組み込みのアサーションライブラリが付属しており、ブラウザや（Web）アプリケーション内の要素のさまざまな側面に対して強力なアサーションを行うことができます。これは [Jest の Matchers](https://jestjs.io/docs/en/using-matchers) の機能を、e2e テスト向けに最適化された追加の matcher で拡張したものです。例：

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

または

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

完全なリストについては、[expect API ドキュメント](/docs/api/expect-webdriverio)を参照してください。

:::info Jasmine

Jasmine フレームワークでは、`expect` は Jasmine の matcher と WebdriverIO の matcher を組み合わせたものになります。Jasmine の同期 matcher には `await` は不要で、`expect.soft()` などの `expect` の Jest 部分は利用できません。[Jasmine の使用](/docs/frameworks#assertions)を参照してください。

:::

## ソフトアサーション

WebdriverIO には、デフォルトで `expect-webdriverio` のソフトアサーションが含まれています（5.2.0 以降）。ソフトアサーションを使用すると、アサーションが失敗した場合でもテストの実行を継続できます。すべての失敗は収集され、テストの最後に報告されます。

### 使用方法

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Chai からの移行

[Chai](https://www.chaijs.com/) と [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) は共存でき、いくつかの小さな調整を行うことで expect-webdriverio へスムーズに移行できます。WebdriverIO v6 にアップグレードしている場合、デフォルトで `expect-webdriverio` のすべてのアサーションをすぐに利用できます。つまり、グローバルに `expect` を使用する箇所ではどこでも `expect-webdriverio` のアサーションが呼び出されることになります。ただし、[`injectGlobals`](/docs/configuration#injectglobals) を `false` に設定している場合や、グローバルの `expect` を明示的に Chai を使用するようにオーバーライドしている場合は除きます。その場合、必要な箇所で expect-webdriverio パッケージを明示的にインポートしない限り、expect-webdriverio のアサーションにはアクセスできません。

このガイドでは、Chai がローカルでオーバーライドされている場合と、グローバルでオーバーライドされている場合のそれぞれについて、Chai から移行する方法の例を示します。

### ローカル

あるファイルで Chai が明示的にインポートされているとします。例：

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

このコードを移行するには、Chai のインポートを削除し、代わりに新しい expect-webdriverio のアサーションメソッド `toHaveUrl` を使用します：

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

同じファイル内で Chai と expect-webdriverio の両方を使用したい場合は、Chai のインポートを残しておけば、`expect` はデフォルトで expect-webdriverio のアサーションになります。例：

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### グローバル

`expect` がグローバルに Chai を使用するようオーバーライドされているとします。expect-webdriverio のアサーションを使用するには、"before" フックでグローバルに変数を設定する必要があります。例：

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

これで Chai と expect-webdriverio を併用できるようになります。コード内では、Chai と expect-webdriverio のアサーションを次のように使用します。例：

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

移行するには、Chai のアサーションを一つずつ expect-webdriverio に置き換えていきます。コードベース全体ですべての Chai アサーションが置き換えられたら、"before" フックを削除できます。最後に、`wdioExpect` のすべての出現箇所を `expect` にグローバルに検索・置換すれば、移行は完了です。