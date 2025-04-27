---
id: customservices
title: 自定义服务
---

您可以为WDIO测试运行器编写自己的自定义服务，以满足您的特定需求。

服务是为了简化测试、管理测试套件和集成结果而创建的可重用逻辑的附加组件。服务可以访问`wdio.conf.js`中提供的所有相同[钩子](/docs/configurationfile)。

有两种类型的服务可以定义：启动器服务只能访问`onPrepare`、`onWorkerStart`、`onWorkerEnd`和`onComplete`钩子，这些钩子在每次测试运行中只执行一次；工作器服务可以访问所有其他钩子，并为每个工作器执行。请注意，您不能在这两种类型的服务之间共享（全局）变量，因为工作器服务在不同的（工作器）进程中运行。

启动器服务可以按如下方式定义：

```js
export default class CustomLauncherService {
    // If a hook returns a promise, WebdriverIO will wait until that promise is resolved to continue.
    async onPrepare(config, capabilities) {
        // TODO: something before all workers launch
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: something after the workers shutdown
    }

    // custom service methods ...
}
```

而工作器服务应该如下所示：

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: something before all tests are run, e.g.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: something after all tests are run
    }

    beforeTest(test, context) {
        // TODO: something before each Mocha/Jasmine test run
    }

    beforeScenario(test, context) {
        // TODO: something before each Cucumber scenario run
    }

    // other hooks or custom service methods ...
}
```

建议通过构造函数中传入的参数存储浏览器对象。最后，按照以下方式公开两种类型的工作器：

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

如果您使用TypeScript并想确保钩子方法参数是类型安全的，可以按如下方式定义服务类：

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## 服务错误处理

在服务钩子期间抛出的错误将被记录，而运行器会继续执行。如果服务中的钩子对测试运行器的设置或拆卸至关重要，可以使用从`webdriverio`包中公开的`SevereServiceError`来停止运行器。

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: something critical for setup before all workers launch

        throw new SevereServiceError('Something went wrong.')
    }

    // custom service methods ...
}
```

## 从模块导入服务

现在要使用此服务，唯一要做的就是将其分配给`services`属性。

修改您的`wdio.conf.js`文件，使其看起来像这样：

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * use imported service class
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * use absolute path to service
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## 在NPM上发布服务

为了使服务更容易被WebdriverIO社区使用和发现，请遵循以下建议：

* 服务应使用此命名约定：`wdio-*-service`
* 使用NPM关键字：`wdio-plugin`、`wdio-service`
* `main`入口应`export`服务的实例
* 示例服务：[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

遵循推荐的命名模式允许按名称添加服务：

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### 将已发布的服务添加到WDIO CLI和文档

我们非常感谢每一个可以帮助其他人运行更好测试的新插件！如果您已经创建了这样的插件，请考虑将其添加到我们的CLI和文档中，以便更容易被发现。

请提交一个包含以下更改的拉取请求：

- 将您的服务添加到CLI模块中的[支持服务列表](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128))中
- 增强[服务列表](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json)，将您的文档添加到官方Webdriver.io页面