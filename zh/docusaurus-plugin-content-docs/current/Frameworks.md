---
id: frameworks
title: 框架
---

WebdriverIO Runner 内置支持 [Mocha](http://mochajs.org/)、[Jasmine](http://jasmine.github.io/) 和 [Cucumber.js](https://cucumber.io/)。您还可以将其与第三方开源框架集成，如 [Serenity/JS](#using-serenityjs)。

:::tip 将 WebdriverIO 与测试框架集成
要将 WebdriverIO 与测试框架集成，您需要在 NPM 上有一个适配器包。
请注意，适配器包必须安装在与 WebdriverIO 相同的位置。
因此，如果您全局安装了 WebdriverIO，请确保也全局安装适配器包。
:::

将 WebdriverIO 与测试框架集成可让您在规范文件或步骤定义中使用全局 `browser` 变量访问 WebDriver 实例。
请注意，WebdriverIO 还将负责实例化和结束 Selenium 会话，因此您不必自己做这些。

## 使用 Mocha

首先，从 NPM 安装适配器包：

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

默认情况下，WebdriverIO 提供了一个内置的[断言库](assertion)，您可以立即开始使用：

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO 支持 Mocha 的 `BDD`（默认）、`TDD` 和 `QUnit` [接口](https://mochajs.org/#interfaces)。

如果您喜欢以 TDD 风格编写规范，请在配置中的 `mochaOpts` 属性中将 `ui` 设置为 `tdd`。现在您的测试文件应该这样编写：

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

如果您想定义其他 Mocha 特定设置，可以在配置文件中使用 `mochaOpts` 键。所有选项的列表可以在 [Mocha 项目网站](https://mochajs.org/api/mocha)上找到。

__注意：__ WebdriverIO 不支持在 Mocha 中使用已弃用的 `done` 回调：

```js
it('should test something', (done) => {
    done() // 抛出 "done is not a function" 错误
})
```

### Mocha 选项

以下选项可以在您的 `wdio.conf.js` 中应用，以配置您的 Mocha 环境。__注意：__ 并非所有选项都受支持，例如应用 `parallel` 选项将导致错误，因为 WDIO 测试运行器有自己的方式来并行运行测试。您可以将这些框架选项作为参数传递，例如：

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

这将传递以下 Mocha 选项：

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

支持以下 Mocha 选项：

#### require
当您想添加或扩展一些基本功能时，`require` 选项很有用（WebdriverIO 框架选项）。

类型：`string|string[]`<br />
默认值：`[]`

#### compilers
使用给定的模块来编译文件。编译器将在 requires 之前包含（WebdriverIO 框架选项）。

类型：`string[]`<br />
默认值：`[]`

#### allowUncaught
传播未捕获的错误。

类型：`boolean`<br />
默认值：`false`

#### bail
首次测试失败后中止。

类型：`boolean`<br />
默认值：`false`

#### checkLeaks
检查全局变量泄漏。

类型：`boolean`<br />
默认值：`false`

#### delay
延迟根套件执行。

类型：`boolean`<br />
默认值：`false`

#### fgrep
给定字符串的测试过滤器。

类型：`string`<br />
默认值：`null`

#### forbidOnly
标记为 `only` 的测试会导致套件失败。

类型：`boolean`<br />
默认值：`false`

#### forbidPending
待处理的测试会导致套件失败。

类型：`boolean`<br />
默认值：`false`

#### fullTrace
失败时的完整堆栈跟踪。

类型：`boolean`<br />
默认值：`false`

#### global
全局范围内预期的变量。

类型：`string[]`<br />
默认值：`[]`

#### grep
给定正则表达式的测试过滤器。

类型：`RegExp|string`<br />
默认值：`null`

#### invert
反转测试过滤器匹配。

类型：`boolean`<br />
默认值：`false`

#### retries
失败测试的重试次数。

类型：`number`<br />
默认值：`0`

#### timeout
超时阈值（毫秒）。

类型：`number`<br />
默认值：`30000`

## 使用 Jasmine

首先，从 NPM 安装适配器包：

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

然后，您可以通过在配置中设置 `jasmineOpts` 属性来配置 Jasmine 环境。所有选项的列表可以在 [Jasmine 项目网站](https://jasmine.github.io/api/3.5/Configuration.html)上找到。

### Jasmine 选项

以下选项可以在您的 `wdio.conf.js` 中应用，使用 `jasmineOpts` 属性配置您的 Jasmine 环境。有关这些配置选项的更多信息，请查看 [Jasmine 文档](https://jasmine.github.io/api/edge/Configuration)。您可以将这些框架选项作为参数传递，例如：

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

这将传递以下 Mocha 选项：

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

支持以下 Jasmine 选项：

#### defaultTimeoutInterval
Jasmine 操作的默认超时间隔。

类型：`number`<br />
默认值：`60000`

#### helpers
相对于 spec_dir 的文件路径（和通配符）数组，在 jasmine 规范之前包含。

类型：`string[]`<br />
默认值：`[]`

#### requires
当您想添加或扩展一些基本功能时，`requires` 选项很有用。

类型：`string[]`<br />
默认值：`[]`

#### random
是否随机化规范执行顺序。

类型：`boolean`<br />
默认值：`true`

#### seed
用作随机化基础的种子。Null 会导致种子在执行开始时随机确定。

类型：`Function`<br />
默认值：`null`

#### failSpecWithNoExpectations
没有期望的规范是否失败。默认情况下，没有运行期望的规范被报告为通过。将此设置为 true 将报告此类规范为失败。

类型：`boolean`<br />
默认值：`false`

#### oneFailurePerSpec
规范是否只有一个期望失败。

类型：`boolean`<br />
默认值：`false`

#### specFilter
用于过滤规范的函数。

类型：`Function`<br />
默认值：`(spec) => true`

#### grep
仅运行与此字符串或正则表达式匹配的测试。（仅在未设置自定义 `specFilter` 函数时适用）

类型：`string|Regexp`<br />
默认值：`null`

#### invertGrep
如果为 true，则反转匹配的测试，只运行与 `grep` 中使用的表达式不匹配的测试。（仅在未设置自定义 `specFilter` 函数时适用）

类型：`boolean`<br />
默认值：`false`

## 使用 Cucumber

首先，从 NPM 安装适配器包：

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

如果您想使用 Cucumber，通过在[配置文件](configurationfile)中添加 `framework: 'cucumber'` 将 `framework` 属性设置为 `cucumber`。

Cucumber 的选项可以在配置文件中使用 `cucumberOpts` 给出。在[这里](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options)查看选项的完整列表。

要快速上手 Cucumber，请查看我们的 [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) 项目，它带有您开始所需的所有步骤定义，您可以立即开始编写特性文件。

### Cucumber 选项

以下选项可以在您的 `wdio.conf.js` 中应用，使用 `cucumberOpts` 属性配置您的 Cucumber 环境：

:::tip 通过命令行调整选项
`cucumberOpts`，例如用于过滤测试的自定义 `tags`，可以通过命令行指定。这是通过使用 `cucumberOpts.{optionName}="value"` 格式实现的。

例如，如果您只想运行带有 `@smoke` 标签的测试，可以使用以下命令：

```sh
# 当您只想运行带有 "@smoke" 标签的测试时
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

此命令将 `cucumberOpts` 中的 `tags` 选项设置为 `@smoke`，确保只执行带有此标签的测试。

:::

#### backtrace
显示错误的完整回溯。

类型：`Boolean`<br />
默认值：`true`

#### requireModule
在要求任何支持文件之前要求模块。

类型：`string[]`<br />
默认值：`[]`<br />
示例：

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // 或
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
首次失败后中止运行。

类型：`boolean`<br />
默认值：`false`

#### name
仅执行名称与表达式匹配的场景（可重复）。

类型：`RegExp[]`<br />
默认值：`[]`

#### require
在执行特性之前，要求包含您的步骤定义的文件。您还可以指定步骤定义的 glob。

类型：`string[]`<br />
默认值：`[]`
示例：

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
您的支持代码所在的路径，用于 ESM。

类型：`String[]`<br />
默认值：`[]`
示例：

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
如果有任何未定义或待处理的步骤，则失败。

类型：`boolean`<br />
默认值：`false`

#### tags
仅执行标签与表达式匹配的特性或场景。
请参阅 [Cucumber 文档](https://docs.cucumber.io/cucumber/api/#tag-expressions) 了解更多详情。

类型：`String`<br />
默认值：``

#### timeout
步骤定义的超时时间（毫秒）。

类型：`Number`<br />
默认值：`30000`

#### retry
指定重试失败测试用例的次数。

类型：`Number`<br />
默认值：`0`

#### retryTagFilter
仅重试标签与表达式匹配的特性或场景（可重复）。此选项需要指定 '--retry'。

类型：`RegExp`

#### language
特性文件的默认语言

类型：`String`<br />
默认值：`en`

#### order
按定义/随机顺序运行测试

类型：`String`<br />
默认值：`defined`

#### format
要使用的格式器的名称和输出文件路径。
WebdriverIO 主要只支持将输出写入文件的[格式器](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md)。

类型：`string[]`<br />

#### formatOptions
提供给格式器的选项

类型：`object`<br />

#### tagsInTitle
将 cucumber 标签添加到特性或场景名称

类型：`Boolean`<br />
默认值：`false`

***请注意，这是 @wdio/cucumber-framework 特有的选项，cucumber-js 本身不识别***<br/>

#### ignoreUndefinedDefinitions
将未定义的定义视为警告。

类型：`Boolean`<br />
默认值：`false`

***请注意，这是 @wdio/cucumber-framework 特有的选项，cucumber-js 本身不识别***<br/>

#### failAmbiguousDefinitions
将模糊定义视为错误。

类型：`Boolean`<br />
默认值：`false`

***请注意，这是 @wdio/cucumber-framework 特有的选项，cucumber-js 本身不识别***<br/>

#### tagExpression
仅执行标签与表达式匹配的特性或场景。
请参阅 [Cucumber 文档](https://docs.cucumber.io/cucumber/api/#tag-expressions) 了解更多详情。

类型：`String`<br />
默认值：``

***请注意，此选项将在未来被弃用。请改用 [`tags`](#tags) 配置属性***

#### profile
指定要使用的配置文件。

类型：`string[]`<br />
默认值：`[]`

***请注意，在配置文件中只支持特定值（worldParameters、name、retryTagFilter），因为 `cucumberOpts` 优先。此外，使用配置文件时，请确保在 `cucumberOpts` 中未声明上述值。***

### 在cucumber中跳过测试

请注意，如果您想使用 `cucumberOpts` 中可用的常规 cucumber 测试过滤功能跳过测试，您将对配置中的所有浏览器和设备执行此操作。为了能够仅对特定功能组合跳过场景而无需在不必要时启动会话，webdriverio 为cucumber提供了以下特定标签语法：

`@skip([condition])`

其中条件是功能属性与其值的可选组合，当**全部**与标记场景或特性匹配时，将导致跳过该场景或特性。当然，您可以向场景和特性添加多个标签，以在不同条件下跳过测试。

您也可以使用 '@skip' 注释来跳过测试而无需更改 `tagExpression'。在这种情况下，跳过的测试将显示在测试报告中。

以下是此语法的一些示例：
- `@skip` 或 `@skip()`：将始终跳过标记的项目
- `@skip(browserName="chrome")`：测试不会在 chrome 浏览器上执行。
- `@skip(browserName="firefox";platformName="linux")`：将在 linux 上的 firefox 执行中跳过测试。
- `@skip(browserName=["chrome","firefox"])`：标记的项目将在 chrome 和 firefox 浏览器上都被跳过。
- `@skip(browserName=/i.*explorer/)`：与正则表达式匹配的浏览器功能将被跳过（如 `iexplorer`、`internet explorer`、`internet-explorer` 等）。

### 导入步骤定义助手

为了使用步骤定义助手如 `Given`、`When` 或 `Then` 或钩子，您应该从 `@cucumber/cucumber` 导入它们，例如：

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

现在，如果您已经将 Cucumber 用于与 WebdriverIO 无关的其他类型的测试，您需要在 e2e 测试中从 WebdriverIO Cucumber 包导入这些助手，例如：

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

这确保您在 WebdriverIO 框架中使用正确的助手，并允许您为其他类型的测试使用独立的 Cucumber 版本。

### 发布报告

Cucumber 提供了一个功能，可以将您的测试运行报告发布到 `https://reports.cucumber.io/`，这可以通过在 `cucumberOpts` 中设置 `publish` 标志或配置 `CUCUMBER_PUBLISH_TOKEN` 环境变量来控制。然而，当您使用 `WebdriverIO` 进行测试执行时，这种方法有一个限制。它会为每个功能文件单独更新报告，使得难以查看整合报告。

为了克服这个限制，我们在 `@wdio/cucumber-framework` 中引入了一个基于 promise 的方法，称为 `publishCucumberReport`。此方法应在 `onComplete` 钩子中调用，这是调用它的最佳位置。`publishCucumberReport` 需要提供存储 cucumber 消息报告的报告目录。

您可以通过配置 `cucumberOpts` 中的 `format` 选项来生成 `cucumber message` 报告。强烈建议在 `cucumber message` 格式选项中提供动态文件名，以防止覆盖报告并确保准确记录每次测试运行。

在使用此函数之前，请确保设置以下环境变量：
- CUCUMBER_PUBLISH_REPORT_URL：您想发布 Cucumber 报告的 URL。如果未提供，将使用默认 URL 'https://messages.cucumber.io/api/reports'。
- CUCUMBER_PUBLISH_REPORT_TOKEN：发布报告所需的授权令牌。如果未设置此令牌，函数将退出而不发布报告。

以下是实现所需配置和代码示例：

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... 其他配置选项
    cucumberOpts: {
        // ... Cucumber 选项配置
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

请注意，`./reports/` 是存储 `cucumber message` 报告的目录。

## 使用 Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) 是一个开源框架，旨在使复杂软件系统的验收和回归测试更快、更协作并且更容易扩展。

对于 WebdriverIO 测试套件，Serenity/JS 提供：
- [增强的报告](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - 您可以使用 Serenity/JS
  作为任何内置 WebdriverIO 框架的替代品，以生成深入的测试执行报告和项目的生动文档。
- [Screenplay 模式 API](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - 为了使您的测试代码在项目和团队之间可移植和可重用，
  Serenity/JS 在原生 WebdriverIO API 之上提供了一个可选的[抽象层](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io)。
- [集成库](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - 对于遵循 Screenplay 模式的测试套件，
  Serenity/JS 还提供可选的集成库，帮助您编写 [API 测试](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)，
  [管理本地服务器](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)，[执行断言](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)等！

![Serenity BDD 报告示例](/img/serenity-bdd-reporter.png)

### 安装 Serenity/JS

要将 Serenity/JS 添加到[现有的 WebdriverIO 项目](https://webdriver.io/docs/gettingstarted)，请从 NPM 安装以下 Serenity/JS 模块：

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

了解更多关于 Serenity/JS 模块：
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### 配置 Serenity/JS

要启用与 Serenity/JS 的集成，请按如下方式配置 WebdriverIO：

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // 告诉 WebdriverIO 使用 Serenity/JS 框架
    framework: '@serenity-js/webdriverio',

    // Serenity/JS 配置
    serenity: {
        // 配置 Serenity/JS 使用适合您测试运行器的适配器
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // 注册 Serenity/JS 报告服务，即 "stage crew"
        crew: [
            // 可选，将测试执行结果打印到标准输出
            '@serenity-js/console-reporter',

            // 可选，生成 Serenity BDD 报告和生动文档（HTML）
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // 可选，在交互失败时自动捕获屏幕截图
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // 配置您的 Cucumber 运行器
    cucumberOpts: {
        // 查看下面的 Cucumber 配置选项
    },


    // ... 或 Jasmine 运行器
    jasmineOpts: {
        // 查看下面的 Jasmine 配置选项
    },

    // ... 或 Mocha 运行器
    mochaOpts: {
        // 查看下面的 Mocha 配置选项
    },

    runner: 'local',

    // 任何其他 WebdriverIO 配置
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // 告诉 WebdriverIO 使用 Serenity/JS 框架
    framework: '@serenity-js/webdriverio',

    // Serenity/JS 配置
    serenity: {
        // 配置 Serenity/JS 使用适合您测试运行器的适配器
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // 注册 Serenity/JS 报告服务，即 "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // 配置您的 Cucumber 运行器
    cucumberOpts: {
        // 查看下面的 Cucumber 配置选项
    },


    // ... 或 Jasmine 运行器
    jasmineOpts: {
        // 查看下面的 Jasmine 配置选项
    },

    // ... 或 Mocha 运行器
    mochaOpts: {
        // 查看下面的 Mocha 配置选项
    },

    runner: 'local',

    // 任何其他 WebdriverIO 配置
};
```

</TabItem>
</Tabs>

了解更多关于：
- [Serenity/JS Cucumber 配置选项](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine 配置选项](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha 配置选项](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO 配置文件](configurationfile)

### 生成 Serenity BDD 报告和生动文档

[Serenity BDD 报告和生动文档](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports)由 [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) 生成，
这是一个由 [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) 模块下载和管理的 Java 程序。

要生成 Serenity BDD 报告，您的测试套件必须：
- 下载 Serenity BDD CLI，通过调用 `serenity-bdd update` 在本地缓存 CLI `jar`
- 生成中间 Serenity BDD `.json` 报告，通过按照[配置说明](#configuring-serenityjs)注册 [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- 当您想生成报告时调用 Serenity BDD CLI，通过调用 `serenity-bdd run`

所有 [Serenity/JS 项目模板](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio)使用的模式依赖于使用：
- [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPM 脚本下载 Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) 即使测试套件本身失败也运行报告过程（这正是您最需要测试报告的时候...）。
- [`rimraf`](https://www.npmjs.com/package/rimraf) 作为一种便捷方法，删除上次运行留下的任何测试报告

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

要了解更多关于 `SerenityBDDReporter` 的信息，请查阅：
- [`@serenity-js/serenity-bdd` 文档](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)中的安装说明，
- [`SerenityBDDReporter` API 文档](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)中的配置示例，
- [GitHub 上的 Serenity/JS 示例](https://github.com/serenity-js/serenity-js/tree/main/examples)。

### 使用 Serenity/JS Screenplay 模式 API

[Screenplay 模式](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)是一种创新的、以用户为中心的编写高质量自动化验收测试的方法。它引导您有效地使用抽象层，
帮助您的测试场景捕捉您领域的业务术语，并鼓励您的团队采用良好的测试和软件工程习惯。

默认情况下，当您将 `@serenity-js/webdriverio` 注册为 WebdriverIO 的 `framework` 时，
Serenity/JS 会配置一个默认的[演员阵容](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io)，
其中每个演员都可以：
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

这应该足以帮助您开始引入遵循 Screenplay 模式的测试场景，甚至可以引入到现有的测试套件中，例如：

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

要了解更多关于 Screenplay 模式的信息，请查看：
- [Screenplay 模式](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [使用 Serenity/JS 进行 Web 测试](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)