---
id: retry
title: 重试不稳定的测试
---

您可以使用 WebdriverIO 测试运行器重新运行某些由于如不稳定的网络或竞态条件等原因而变得不稳定的测试。（然而，不建议仅仅因为测试变得不稳定就简单地增加重试次数！）

## 在 Mocha 中重试测试套件

从 Mocha 的版本 3 开始，您可以重新运行整个测试套件（所有在 `describe` 块内的内容）。如果您使用 Mocha，您应该优先使用这种重试机制而不是 WebdriverIO 的实现，后者只允许您重新运行某些测试块（所有在 `it` 块内的内容）。为了使用 `this.retries()` 方法，套件块 `describe` 必须使用未绑定的函数 `function(){}` 而不是箭头函数 `() => {}`，如 [Mocha 文档](https://mochajs.org/#arrow-functions) 中所述。使用 Mocha 时，您还可以在 `wdio.conf.js` 中使用 `mochaOpts.retries` 为所有规范设置重试次数。

以下是一个例子：

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## 在 Jasmine 或 Mocha 中重试单个测试

要重新运行某个特定的测试块，您可以在测试块函数之后添加重试次数作为最后一个参数：

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

钩子函数也可以同样工作：

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

钩子函数也可以同样工作：

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

如果您使用的是 Jasmine，第二个参数保留给超时时间。要应用重试参数，您需要将超时设置为其默认值 `jasmine.DEFAULT_TIMEOUT_INTERVAL`，然后应用您的重试次数。

</TabItem>
</Tabs>

这种重试机制只允许重试单个钩子或测试块。如果您的测试配有一个用于设置应用程序的钩子，该钩子不会被重新运行。[Mocha 提供](https://mochajs.org/#retry-tests)原生的测试重试功能，可以提供这种行为，而 Jasmine 则不提供。您可以在 `afterTest` 钩子中访问已执行的重试次数。

## 在 Cucumber 中重试

### 在 Cucumber 中重试整个套件

对于 cucumber >=6，您可以提供 [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) 配置选项以及可选的 `retryTagFilter` 参数，以便所有或部分失败的场景获得额外的重试机会，直到成功。要使此功能正常工作，您需要将 `scenarioLevelReporter` 设置为 `true`。

### 在 Cucumber 中重试步骤定义

要为某个特定的步骤定义重试率，只需对其应用重试选项，如：

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

重试只能在步骤定义文件中定义，不能在特性文件中定义。

## 在每个规范文件的基础上添加重试

以前，只有测试级和套件级的重试可用，这在大多数情况下是可以的。

但是在涉及状态（如服务器或数据库中）的任何测试中，在第一次测试失败后，状态可能会变得无效。任何后续的重试可能都没有通过的机会，因为它们将从无效的状态开始。

对于每个规范文件，都会创建一个新的 `browser` 实例，这使得这个位置成为连接和设置其他状态（服务器、数据库）的理想位置。在这个级别上的重试意味着整个设置过程将被简单地重复，就像为一个新的规范文件一样。

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## 多次运行特定测试

这有助于防止将不稳定的测试引入代码库。通过添加 `--repeat` CLI 选项，它将运行指定的规范或套件 N 次。使用此 CLI 标志时，还必须指定 `--spec` 或 `--suite` 标志。

当向代码库添加新测试时，特别是通过 CI/CD 流程，测试可能会通过并被合并，但稍后变得不稳定。这种不稳定可能来自多种因素，如网络问题、服务器负载、数据库大小等。在 CD/CD 流程中使用 `--repeat` 标志可以帮助在这些不稳定的测试被合并到主代码库之前捕获它们。

一种策略是在 CI/CD 流程中正常运行测试，但如果您引入了新测试，则可以运行另一组测试，在 `--spec` 中指定新规范，同时使用 `--repeat`，使其运行新测试 x 次。如果测试在任何这些时间失败，那么测试将不会被合并，并且需要查看为什么它失败了。

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```