---
id: assertion
title: 断言
---

[WDIO 测试运行器](https://webdriver.io/docs/clioptions)内置了一个断言库，允许你对浏览器或应用程序中的元素的各个方面进行强大的断言。它扩展了 [Jest 的 Matchers](https://jestjs.io/docs/en/using-matchers) 功能，针对 e2e 测试进行了优化，添加了额外的匹配器，例如：

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

或者

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

完整列表请参阅 [expect API 文档](/docs/api/expect-webdriverio)。

## 从 Chai 迁移

[Chai](https://www.chaijs.com/) 和 [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) 可以共存，通过一些小调整可以平稳过渡到 expect-webdriverio。如果你已经升级到 WebdriverIO v6，那么默认情况下你可以直接使用所有 `expect-webdriverio` 的断言。这意味着，在全局范围内，无论你在哪里使用 `expect`，你都会调用 `expect-webdriverio` 断言。当然，除非你将 [`injectGlobals`](/docs/configuration#injectglobals) 设置为 `false` 或者显式地覆盖全局 `expect` 以使用 Chai。在这种情况下，如果不在需要的地方显式导入 expect-webdriverio 包，你将无法访问任何 expect-webdriverio 断言。

本指南将展示如何在 Chai 被局部覆盖和全局覆盖的情况下进行迁移的示例。

### 局部

假设在文件中显式导入了 Chai，例如：

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

要迁移此代码，请移除 Chai 导入并使用新的 expect-webdriverio 断言方法 `toHaveUrl`：

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

如果你想在同一个文件中同时使用 Chai 和 expect-webdriverio，可以保留 Chai 导入，而 `expect` 将默认为 expect-webdriverio 断言，例如：

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

### 全局

假设 `expect` 被全局覆盖以使用 Chai。为了使用 expect-webdriverio 断言，我们需要在 "before" 钩子中全局设置一个变量，例如：

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

现在 Chai 和 expect-webdriverio 可以同时使用。在你的代码中，可以按如下方式使用 Chai 和 expect-webdriverio 断言：

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

要进行迁移，可以逐步将每个 Chai 断言替换为 expect-webdriverio。一旦代码库中所有 Chai 断言都被替换，就可以删除 "before" 钩子。最后进行全局查找和替换，将所有 `wdioExpect` 替换为 `expect` 来完成迁移。