---
id: timeouts
title: 超时设置
---

WebdriverIO 中的每个命令都是异步操作。请求被发送到 Selenium 服务器（或像 [Sauce Labs](https://saucelabs.com) 这样的云服务），其响应包含操作完成或失败后的结果。

因此，时间是整个测试过程中的关键组成部分。当某个操作依赖于另一个操作的状态时，你需要确保它们按正确的顺序执行。超时设置在处理这些问题时扮演着重要角色。

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver 超时设置

### 会话脚本超时

会话有一个关联的会话脚本超时，用于指定等待异步脚本运行的时间。除非另有说明，否则默认为 30 秒。你可以这样设置此超时：

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### 会话页面加载超时

会话有一个关联的会话页面加载超时，用于指定等待页面加载完成的时间。除非另有说明，否则默认为 300,000 毫秒。

你可以这样设置此超时：

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` 关键字是官方 WebDriver [规范](https://www.w3.org/TR/webdriver/#set-timeouts)的一部分，但可能不被你的浏览器[支持](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687)（之前的名称是 `page load`）。

### 会话隐式等待超时

会话有一个关联的会话隐式等待超时。这指定了在使用 [`findElement`](/docs/api/webdriver#findelement) 或 [`findElements`](/docs/api/webdriver#findelements) 命令（使用或不使用 WDIO 测试运行器运行 WebdriverIO 时的 [`$`](/docs/api/browser/$) 或 [`$$`](/docs/api/browser/$$)）定位元素时，等待隐式元素定位策略的时间。除非另有说明，否则默认为 0 毫秒。

你可以通过以下方式设置此超时：

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO 相关超时设置

### `WaitFor*` 超时

WebdriverIO 提供了多个命令，用于等待元素达到特定状态（例如启用、可见、存在）。这些命令接受一个选择器参数和一个超时数值，该数值决定实例应该等待元素达到该状态的时间。`waitforTimeout` 选项允许你为所有 `waitFor*` 命令设置全局超时，这样你就不需要一遍又一遍地设置相同的超时。_(注意小写的 `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

在你的测试中，现在你可以这样做：

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// 如果需要，你也可以覆盖默认超时
await myElem.waitForDisplayed({ timeout: 10000 })
```

## 框架相关超时设置

你与 WebdriverIO 一起使用的测试框架必须处理超时，特别是因为所有操作都是异步的。它确保测试过程在出现问题时不会卡住。

默认情况下，超时为 10 秒，这意味着单个测试不应该花费更长时间。

Mocha 中的单个测试看起来像：

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

在 Cucumber 中，超时适用于单个步骤定义。但是，如果你想增加超时时间，因为你的测试需要比默认值更长的时间，你需要在框架选项中设置它。

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>