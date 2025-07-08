---
id: bestpractices
title: 最佳实践
---

# 最佳实践

本指南旨在分享我们的最佳实践，帮助您编写高性能和稳健的测试。

## 使用稳健的选择器

使用对DOM变化具有弹性的选择器，当例如某个元素的类被移除时，您将减少甚至不会有测试失败的情况。

类可以应用于多个元素，如果可能的话应该避免使用，除非您故意想要获取具有该类的所有元素。

```js
// 👎
await $('.button')
```

所有这些选择器都应该返回单个元素。

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__注意：__ 要了解WebdriverIO支持的所有可能的选择器，请查看我们的[选择器](./Selectors.md)页面。

## 限制元素查询的数量

每次使用[`$`](https://webdriver.io/docs/api/browser/$)或[`$$`](https://webdriver.io/docs/api/browser/$$)命令（包括链式调用）时，WebdriverIO都会尝试在DOM中定位元素。这些查询成本很高，所以您应该尽量限制它们的使用。

查询三个元素。

```js
// 👎
await $('table').$('tr').$('td')
```

只查询一个元素。

``` js
// 👍
await $('table tr td')
```

唯一应该使用链式调用的时候是当您想要组合不同的[选择器策略](https://webdriver.io/docs/selectors/#custom-selector-strategies)时。
在示例中，我们使用[Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors)，这是一种进入元素的shadow DOM的策略。

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### 优先定位单个元素而不是从列表中取一个

这并不总是可行的，但使用CSS伪类如[:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)，您可以根据父元素子列表中的索引匹配元素。

查询所有表格行。

```js
// 👎
await $$('table tr')[15]
```

查询单个表格行。

```js
// 👍
await $('table tr:nth-child(15)')
```

## 使用内置断言

不要使用不会自动等待结果匹配的手动断言，因为这会导致测试不稳定。

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

通过使用内置断言，WebdriverIO将自动等待实际结果与预期结果匹配，从而产生稳健的测试。
它通过自动重试断言直到通过或超时来实现这一点。

```js
// 👍
await expect(button).toBeDisplayed()
```

## 懒加载和promise链

在编写干净代码方面，WebdriverIO有一些技巧，它可以懒加载元素，这允许您链式调用promises并减少`await`的使用量。这也允许您将元素作为ChainablePromiseElement而不是Element传递，并更容易与页面对象一起使用。

那么什么时候必须使用`await`呢？
您应该始终使用`await`，但`$`和`$$`命令除外。

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// 或
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// 或
await $('div').$('button').click()
```

## 不要过度使用命令和断言

当使用expect.toBeDisplayed时，您隐式地也等待元素存在。当您已经有一个执行相同操作的断言时，没有必要使用waitForXXX命令。

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

与元素交互或断言其文本等内容时，不需要等待元素存在或显示，除非元素可能明确不可见（例如opacity: 0）或明确禁用（例如disabled属性），在这种情况下等待元素显示是有意义的。

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## 动态测试

使用环境变量在您的环境中存储动态测试数据，例如秘密凭据，而不是将它们硬编码到测试中。有关此主题的更多信息，请前往[参数化测试](parameterize-tests)页面。

## 对代码进行lint检查

使用eslint对代码进行lint检查，您可以在早期发现潜在的错误，使用我们的[lint规则](https://www.npmjs.com/package/eslint-plugin-wdio)确保始终应用一些最佳实践。

## 不要暂停

使用pause命令可能很诱人，但这样做是个坏主意，因为它不具有弹性，从长远来看只会导致测试不稳定。

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // 等待提交按钮启用
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## 异步循环

当您有一些想要重复的异步代码时，重要的是要知道并非所有循环都能做到这一点。
例如，Array的forEach函数不允许异步回调，正如在[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)上所述。

__注意：__ 当您不需要操作是异步的时候，您仍然可以使用这些，如在这个例子中所示：`console.log(await $$('h1').map((h1) => h1.getText()))`。

下面是一些说明这意味着什么的例子。

以下代码将不起作用，因为不支持异步回调。

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

以下代码将起作用。

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## 保持简单

有时我们看到用户映射数据如文本或值。这通常是不必要的，而且往往是代码异味，请查看下面的例子，了解为什么是这种情况。

```js
// 👎 太复杂，同步断言，使用内置断言防止测试不稳定
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 太复杂
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 通过文本查找元素但不考虑元素的位置
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 使用唯一标识符（通常用于自定义元素）
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 可访问性名称（通常用于原生html元素）
await expect($('aria/Product Prices')).toHaveText('Prices');
```

我们有时看到的另一件事是简单的事情有一个过于复杂的解决方案。

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## 并行执行代码

如果您不关心代码运行的顺序，可以利用[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)来加速执行。

__注意：__ 由于这会使代码更难阅读，您可以使用页面对象或函数将其抽象化，尽管您也应该质疑性能收益是否值得可读性的成本。

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

如果抽象化，它可能看起来像下面这样，其中逻辑放在一个名为submitWithDataOf的方法中，数据由Person类检索。

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```