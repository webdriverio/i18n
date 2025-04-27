---
id: async-migration
title: 从同步到异步
---

由于V8引擎的变化，WebdriverIO团队[宣布](https://webdriver.io/blog/2021/07/28/sync-api-deprecation)将在2023年4月弃用同步命令执行。团队一直在努力使这个转变尽可能简单。在本指南中，我们将解释如何逐步将您的测试套件从同步迁移到异步。作为示例项目，我们使用[Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate)，但这种方法同样适用于所有其他项目。

## JavaScript中的Promise

WebdriverIO中同步执行之所以流行，是因为它消除了处理promise的复杂性。特别是如果您来自其他不以这种方式存在这个概念的语言，一开始可能会感到困惑。然而，Promise是处理异步代码的强大工具，今天的JavaScript实际上使得处理它变得容易。如果您从未使用过Promise，我们建议查看[MDN参考指南](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)，因为在这里详细解释它超出了我们的范围。

## 异步转换

WebdriverIO测试运行器可以在同一测试套件中处理异步和同步执行。这意味着您可以按照自己的节奏逐步迁移您的测试和PageObjects。例如，Cucumber Boilerplate定义了[一大组步骤定义](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action)供您复制到您的项目中。我们可以继续一次迁移一个步骤定义或一个文件。

:::tip

WebdriverIO提供了一个[codemod](https://github.com/webdriverio/codemod)，它可以几乎完全自动地将您的同步代码转换为异步代码。首先按照文档中描述的方式运行codemod，如果需要，再使用本指南进行手动迁移。

:::

在许多情况下，需要做的只是将调用WebdriverIO命令的函数改为`async`，并在每个命令前添加`await`。查看要在样板项目中转换的第一个文件`clearInputField.ts`，我们将从：

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

转换为：

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

就这样。您可以在这里查看包含所有重写示例的完整提交：

#### 提交：

- _转换所有步骤定义_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
这种转换与您是否使用TypeScript无关。如果您使用TypeScript，请确保最终将`tsconfig.json`中的`types`属性从`webdriverio/sync`更改为`@wdio/globals/types`。还要确保您的编译目标至少设置为`ES2018`。
:::

## 特殊情况

当然，总有一些特殊情况需要您多加注意。

### ForEach循环

如果您有一个`forEach`循环，例如用来迭代元素，您需要确保迭代器回调在异步环境中正确处理，例如：

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

我们传给`forEach`的函数是一个迭代器函数。在同步世界中，它会在继续下一步之前点击所有元素。如果我们将其转换为异步代码，我们必须确保等待每个迭代器函数完成执行。通过添加`async`/`await`，这些迭代器函数将返回一个我们需要解析的promise。现在，`forEach`不再是遍历元素的理想方法，因为它不会返回迭代器函数的结果，即我们需要等待的promise。因此，我们需要用`map`替换`forEach`，它会返回该promise。`map`以及数组的所有其他迭代器方法如`find`、`every`、`reduce`等都实现了尊重迭代器函数中的promise，因此简化了在异步上下文中使用它们。上面的例子转换后如下所示：

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

例如，要获取所有`<h3 />`元素并获取它们的文本内容，您可以运行：

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

如果这看起来太复杂，您可能想考虑使用简单的for循环，例如：

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### WebdriverIO断言

如果您使用WebdriverIO断言助手[`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio)，请确保在每个`expect`调用前添加`await`，例如：

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

需要转换为：

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### 同步PageObject方法和异步测试

如果您一直以同步方式编写测试套件中的PageObjects，则将无法在异步测试中使用它们。如果您需要在同步和异步测试中都使用PageObject方法，我们建议复制该方法并为两种环境提供支持，例如：

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

完成迁移后，您可以删除同步的PageObject方法并清理命名。

如果您不想维护两个不同版本的PageObject方法，您也可以将整个PageObject迁移到异步，并使用[`browser.call`](https://webdriver.io/docs/api/browser/call)在同步环境中执行该方法，例如：

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

`call`命令将确保在继续下一个命令之前解析异步的`someMethod`。

## 结论

正如您在[结果重写PR](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files)中看到的，这种重写的复杂性相当简单。请记住，您可以一次重写一个步骤定义。WebdriverIO完全能够在单个框架中处理同步和异步执行。