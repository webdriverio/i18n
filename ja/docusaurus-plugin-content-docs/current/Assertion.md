---
id: assertion
title: アサーション
---

[WDIO testrunner](https://webdriver.io/docs/clioptions)には、ブラウザやウェブアプリケーション内の要素に対して強力なアサーションを行うことができる組み込みのアサーションライブラリが付属しています。これは[Jests Matchers](https://jestjs.io/docs/en/using-matchers)の機能を拡張し、e2eテスト用に最適化された追加のマッチャーを提供します：

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

または

```js
const selectOptions = await $$('form select>option')

// selectに少なくとも1つのオプションがあることを確認する
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

完全なリストについては、[expect API doc](/docs/api/expect-webdriverio)を参照してください。

## ソフトアサーション

WebdriverIOはexpect-webdriver(5.2.0)からデフォルトでソフトアサーションを含んでいます。ソフトアサーションを使用すると、アサーションが失敗しても、テストの実行を継続することができます。すべての失敗はテストの最後に収集されて報告されます。

### 使用方法

```js
// これらは失敗しても即座にスローされません
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// 通常のアサーションは即座にスローされます
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Chaiからの移行

[Chai](https://www.chaijs.com/)と[expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme)は共存可能であり、いくつかの小さな調整でexpect-webdriverioへのスムーズな移行が実現できます。WebdriverIO v6にアップグレードした場合、デフォルトで`expect-webdriverio`からのすべてのアサーションに最初からアクセスできます。これは、グローバルに`expect`を使用するどこでも、`expect-webdriverio`のアサーションを呼び出すことを意味します。ただし、[`injectGlobals`](/docs/configuration#injectglobals)を`false`に設定した場合や、グローバルな`expect`を明示的にChaiを使用するようにオーバーライドした場合は例外です。この場合、必要な場所でexpect-webdriverioパッケージを明示的にインポートしないと、expect-webdriverioのアサーションにアクセスできません。

このガイドでは、ローカルでオーバーライドされたChaiからの移行方法と、グローバルにオーバーライドされたChaiからの移行方法の例を示します。

### ローカル

ファイル内でChaiが明示的にインポートされていると仮定します：

```js
// myfile.js - 元のコード
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

このコードを移行するには、Chaiのインポートを削除し、新しいexpect-webdriverioのアサーションメソッド`toHaveUrl`を代わりに使用します：

```js
// myfile.js - 移行後のコード
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // 新しいexpect-webdriverio APIメソッド https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

同じファイル内でChaiとexpect-webdriverioの両方を使用したい場合は、Chaiのインポートを保持し、`expect`はデフォルトでexpect-webdriverioのアサーションになります：

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chaiアサーション
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverioアサーション
    })
})
```

### グローバル

`expect`がグローバルにChaiを使用するようにオーバーライドされていると仮定します。expect-webdriverioのアサーションを使用するには、"before"フックでグローバル変数を設定する必要があります：

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

これでChaiとexpect-webdriverioを並行して使用できます。コード内では次のようにChaiとexpect-webdriverioのアサーションを使用します：

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chaiアサーション
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverioアサーション
    });
});
```

移行するには、各Chaiアサーションをexpect-webdriverioに徐々に移行します。コードベース全体でChaiアサーションがすべて置き換えられたら、"before"フックを削除できます。`wdioExpect`を`expect`に置き換えるグローバルな検索と置換を行うことで、移行を完了させます。