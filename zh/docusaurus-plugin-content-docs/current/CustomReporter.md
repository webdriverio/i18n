---
id: customreporter
title: 自定义报告器
---

你可以为WDIO测试运行器编写自己的自定义报告器，以满足你的需求。而且这很简单！

你需要做的就是创建一个继承自`@wdio/reporter`包的Node模块，以便它可以接收来自测试的消息。

基本设置应该如下所示：

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

要使用这个报告器，你只需要在配置中将其分配给`reporter`属性。

你的`wdio.conf.js`文件应该如下所示：

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

你也可以将报告器发布到NPM，这样每个人都可以使用它。将包命名为类似其他报告器的方式`wdio-<reportername>-reporter`，并使用关键字如`wdio`或`wdio-reporter`标记它。

## 事件处理器

你可以为测试过程中触发的多个事件注册事件处理器。以下所有处理器都将接收包含有关当前状态和进度的有用信息的有效载荷。

这些有效载荷对象的结构取决于事件，并在各框架（Mocha、Jasmine和Cucumber）之间统一。一旦你实现了自定义报告器，它应该适用于所有框架。

以下列表包含所有可以添加到报告器类中的可能方法：

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

方法名称相当自解释。

要在某个事件上打印内容，请使用由父类`WDIOReporter`提供的`this.write(...)`方法。它要么将内容流式传输到`stdout`，要么传输到日志文件（取决于报告器的选项）。

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

请注意，你不能以任何方式延迟测试执行。

所有事件处理器应执行同步例程（否则你会遇到竞态条件）。

请务必查看[示例部分](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio)，你可以找到一个自定义报告器的示例，它会为每个事件打印事件名称。

如果你实现了对社区有用的自定义报告器，请随时提交Pull Request，以便我们可以将该报告器公开给公众！

另外，如果你通过`Launcher`接口运行WDIO测试运行器，你不能像下面这样将自定义报告器应用为函数：

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## 等待直到`isSynchronised`

如果你的报告器必须执行异步操作来报告数据（例如上传日志文件或其他资产），你可以在自定义报告器中覆盖`isSynchronised`方法，让WebdriverIO运行器等待，直到你计算完所有内容。这方面的一个例子可以在[`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts)中看到：

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

这样，运行器将等待直到所有日志信息都上传完成。

## 在NPM上发布报告器

为使报告器更容易被WebdriverIO社区使用和发现，请遵循以下建议：

* 服务应使用此命名约定：`wdio-*-reporter`
* 使用NPM关键字：`wdio-plugin`、`wdio-reporter`
* `main`入口应该`export`报告器的实例
* 示例报告器：[`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

遵循推荐的命名模式允许通过名称添加服务：

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### 将已发布的服务添加到WDIO CLI和文档

我们非常感谢每一个可以帮助他人运行更好测试的新插件！如果你创建了这样的插件，请考虑将其添加到我们的CLI和文档中，以便更容易被发现。

请提交一个包含以下更改的pull request：

- 将你的服务添加到CLI模块中的[支持的报告器列表](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91))
- 增强[报告器列表](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json)，将你的文档添加到官方Webdriver.io页面