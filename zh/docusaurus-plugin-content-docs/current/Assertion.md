---
id: assertion
title: 断言
---

[WDIO 测试运行器](https://webdriver.io/docs/clioptions)内置了一个断言库，允许您对浏览器或Web应用程序中的元素进行强大的断言。它扩展了[Jest Matchers](https://jestjs.io/docs/en/using-matchers)的功能，增加了为端到端测试优化的匹配器，例如：

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

或者

```js
const selectOptions = await $$('form select>option')

// 确保select中至少有一个选项
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

完整列表请参见[expect API 文档](/docs/api/expect-webdriverio)。

## 软断言

WebdriverIO 从 expect-webdriver(5.2.0) 开始默认包含软断言。软断言允许您的测试在断言失败时继续执行。所有失败都会被收集并在测试结束时报告。

### 使用方法

```js
// 这些断言失败时不会立即抛出错误
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// 常规断言仍然会立即抛出错误
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## 从 Chai 迁移

[Chai](https://www.chaijs.com/) 和 [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) 可以共存，通过一些小调整可以平滑过渡到 expect-webdriverio。如果您已升级到 WebdriverIO v6，那么默认情况下您可以直接使用 `expect-webdriverio` 的所有断言。这意味着在任何地方使用 `expect` 时，您都会调用 `expect-webdriverio` 断言。除非您将 [`injectGlobals`](/docs/configuration#injectglobals) 设置为 `false` 或明确地覆盖了全局 `expect` 以使用 Chai。在这种情况下，没有明确导入 expect-webdriverio 包，您将无法访问任何 expect-webdriverio 断言。

本指南将展示如果 Chai 在本地被覆盖以及如果 Chai 在全局被覆盖时如何迁移的示例。

### 本地

假设在文件中明确导入了 Chai，例如：

```js
// myfile.js - 原始代码
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

要迁移此代码，请删除 Chai 导入并使用新的 expect-webdriverio 断言方法 `toHaveUrl` 代替：

```js
// myfile.js - 迁移后的代码
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // 新的 expect-webdriverio API 方法 https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

如果您想在同一个文件中同时使用 Chai 和 expect-webdriverio，您可以保留 Chai 导入，而 `expect` 默认为 expect-webdriverio 断言，例如：

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai 断言
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio 断言
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

现在 Chai 和 expect-webdriverio 可以并行使用。在您的代码中，您可以按照以下方式使用 Chai 和 expect-webdriverio 断言，例如：

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai 断言
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio 断言
    });
});
```

迁移时，您可以逐步将每个 Chai 断言替换为 expect-webdriverio。一旦代码库中的所有 Chai 断言都被替换，可以删除 "before" 钩子。全局查找并替换所有 `wdioExpect` 为 `expect` 将完成迁移。