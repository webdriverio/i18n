---
id: assertion
title: アサーション
---

[WDIO testrunner](https://webdriver.io/docs/clioptions)には、ブラウザやウェブアプリケーション内の要素に関して強力なアサーションを行うことができる組み込みのアサーションライブラリが付属しています。これは[Jests Matchers](https://jestjs.io/docs/en/using-matchers)の機能を拡張し、e2eテスト向けに最適化された追加のマッチャーを提供します。例：

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

または

```js
const selectOptions = await $$('form select>option')

// セレクト内に少なくとも1つのオプションがあることを確認
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

完全なリストは、[expect APIドキュメント](/docs/api/expect-webdriverio)を参照してください。

## Chaiからの移行

[Chai](https://www.chaijs.com/)と[expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme)は共存できます。いくつかの小さな調整を行うことで、expect-webdriverioへのスムーズな移行が可能です。WebdriverIO v6にアップグレードした場合、デフォルトで`expect-webdriverio`からのすべてのアサーションに最初からアクセスできます。これは、グローバルに`expect`を使用する場所ではどこでも`expect-webdriverio`アサーションを呼び出すことを意味します。ただし、[`injectGlobals`](/docs/configuration#injectglobals)を`false`に設定しているか、グローバルの`expect`をChaiを使用するように明示的にオーバーライドしている場合を除きます。この場合、必要な場所でexpect-webdriverioパッケージを明示的にインポートしない限り、expect-webdriverioアサーションにアクセスできません。

このガイドでは、Chaiがローカルでオーバーライドされている場合とグローバルでオーバーライドされている場合の両方の移行方法の例を示します。

### ローカル

Chaiがファイルで明示的にインポートされている場合を考えます：

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

このコードを移行するには、Chaiのインポートを削除し、代わりに新しいexpect-webdriverioのアサーションメソッド`toHaveUrl`を使用します：

```js
// myfile.js - 移行後のコード
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // 新しいexpect-webdriverio APIメソッド https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

同じファイルでChaiとexpect-webdriverioの両方を使用したい場合は、Chaiのインポートを維持し、`expect`はデフォルトでexpect-webdriverioのアサーションになります：

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

`expect`がグローバルにChaiを使用するようにオーバーライドされていると仮定します。expect-webdriverioアサーションを使用するには、「before」フックでグローバル変数を設定する必要があります：

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

これでChaiとexpect-webdriverioを並行して使用できます。コードでは、ChaiとExpect-webdriverioのアサーションを次のように使用します：

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

移行するには、各Chaiアサーションをexpect-webdriverioに徐々に移行していきます。コードベース全体でChaiアサーションがすべて置き換えられたら、「before」フックを削除できます。`wdioExpect`から`expect`へのすべてのインスタンスを置き換えるグローバル検索と置換を行うことで、移行が完了します。