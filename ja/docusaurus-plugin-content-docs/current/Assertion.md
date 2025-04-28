---
id: assertion
title: アサーション
---

[WDIO testrunner](https://webdriver.io/docs/clioptions)には、ブラウザや(web)アプリケーション内の要素に関する強力なアサーションを行うことができる組み込みのアサーションライブラリが付属しています。これは[Jests Matchers](https://jestjs.io/docs/en/using-matchers)の機能を拡張し、e2eテスト向けに最適化された追加のマッチャーを提供します。例えば：

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

完全なリストについては、[expect API doc](/docs/api/expect-webdriverio)を参照してください。

## Chaiからの移行

[Chai](https://www.chaijs.com/)と[expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme)は共存可能で、いくつかの小さな調整を行うことでexpect-webdriverioへのスムーズな移行が可能です。WebdriverIO v6にアップグレードした場合、デフォルトで`expect-webdriverio`からのすべてのアサーションに最初からアクセスできます。これは、グローバルに`expect`を使用するどこでも、`expect-webdriverio`アサーションを呼び出すことを意味します。ただし、[`injectGlobals`](/docs/configuration#injectglobals)を`false`に設定した場合や、グローバルな`expect`をChaiを使用するように明示的にオーバーライドした場合は除きます。この場合、必要な場所でexpect-webdriverioパッケージを明示的にインポートしない限り、expect-webdriverioアサーションにアクセスできません。

このガイドでは、Chaiがローカルでオーバーライドされている場合とグローバルでオーバーライドされている場合の両方について、Chaiからの移行方法の例を示します。

### ローカル

ファイル内でChaiが明示的にインポートされていると仮定します：

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

このコードを移行するには、Chaiのインポートを削除し、新しいexpect-webdriverioアサーションメソッド`toHaveUrl`を代わりに使用します：

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

同じファイル内でChaiとexpect-webdriverioの両方を使用したい場合は、Chaiのインポートを維持し、`expect`はデフォルトでexpect-webdriverioアサーションになります：

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

`expect`がグローバルにChaiを使用するようオーバーライドされていると仮定します。expect-webdriverioアサーションを使用するには、"before"フックでグローバル変数を設定する必要があります：

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

これでChaiとexpect-webdriverioを並行して使用できます。コード内では、次のようにChaiとexpect-webdriverioのアサーションを使用します：

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

移行するには、各Chaiアサーションをexpect-webdriverioに徐々に移行します。コードベース全体でChaiアサーションがすべて置き換えられたら、"before"フックを削除できます。`wdioExpect`を`expect`に置き換えるグローバル検索と置換を行うことで、移行を完了させることができます。