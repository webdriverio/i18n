---
id: wdio-cucumberjs-json-reporter
title: CucumberJS JSON 报告器
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter 是一个第三方包，更多信息请查看 [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

一个为 WebdriverIO v8 及更高版本创建 CucumberJS JSON 文件的 WDIO 报告器。

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## 它的作用
这个报告器将为每个被测试的特性生成一个 **Cucumber JSON 文件**。该 JSON 文件可以与您想要使用的任何报告一起使用，例如 [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)。

它还会将有关运行实例的元数据添加到特性文件中，最后但同样重要的是，它将为您提供向 JSON 输出添加附件的机会。

## 安装
最简单的方法是将 `wdio-cucumberjs-json-reporter` 作为 devDependency 保存在您的 `package.json` 中。

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

您可以简单地通过以下方式安装：

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

这样它将自动添加到您的 `package.json` 中

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置
在您的 wdio.conf.js 文件中配置输出目录和语言：

```js
export const config = {
    // ...
    reporters: [
        // 像这样使用默认选项，请参阅下面的选项
        'cucumberjs-json',

        // 或者像这样，如果您想设置文件夹和语言
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> 不要同时使用这两种添加报告器的方式，这只是一个示例！

## 选项
### `jsonFolder`
- **类型：** `String`
- **必填：** 否
- **默认值：** `.tmp/json/`

此报告生成的 JSON 文件将存储的目录，相对于脚本启动的位置。

**注意：** 如果您从命令行使用 npm 脚本，例如 `npm run test`，则 `jsonFolder` 将相对于脚本执行的路径。从项目根目录执行它也将在项目根目录中创建 `jsonFolder`。

### `language`
- **类型：** `String`
- **必填：** 否
- **默认值：** `en`

编写 Gherkin 场景的语言（默认为英语）。语言代码及其关键字的列表可以在[这里](https://cucumber.io/docs/gherkin/reference/#overview)找到。

### `disableHooks`
- **类型：** `boolean`
- **必填：** 否
- **默认值：** `false`

如果此属性设置为 `true`，则钩子详情将不会成为生成的一部分。

### `reportFilePerRetry`
- **类型：** `boolean`
- **必填：** 否
- **默认值：** `true`

当重试规范时，如果将此属性设置为 `false`，报告将附加到先前尝试的现有报告文件中。

**示例**：
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## 元数据

> **注意：**\
> 如果您使用的是 WebdriverIO V6，则当前不支持此功能，WebdriverIO V5 仍支持此功能，WebdriverIO V7 再次支持此功能

如前所述，此报告可以自动存储特性执行所在的当前机器/设备的元数据。

要自定义此内容，您可以通过向 `capabilities` 添加以下对象来完成

```js
// Example wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // 添加这个
            'cjson:metadata': {
                // 对于浏览器
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // 对于应用程序
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> 元数据对象需要有 `cjson` 前缀，否则它将不起作用！

### 元数据值
#### `metadata.app.name`
- **类型：** `string`

**例如：** 应用程序的名称。

#### `metadata.app.version`
- **类型：** `string`

**例如：** 应用程序的版本。

#### `metadata.browser.name`
- **类型：** `string`
- **可能的值：** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **类型：** `string`

**例如：** 浏览器的版本，这可以手动添加或在测试执行过程中检索以获取确切的版本号。

#### `metadata.device`
- **类型：** `string`

**例如：** 表示设备类型的名称。例如，如果您在虚拟机上运行它，您可以在这里放置 `Virtual Machine`，或者移动设备的名称，例如 `iPhone 7 Plus`。

#### `metadata.platform.name`
- **类型：** `string`
- **可能的值：** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **类型：** `string`

**例如：** 平台的版本

> 如果您在元数据中不提供 `browser` 对象，此模块将自动为您确定它。**它将始终用它能确定的最新值覆盖它。**

> 如果您不提供 `device` 和/或 `platform` 对象，它将默认设置为 `not known`

> 如果您不提供 `browser.name` 或 `browser.version`，模块将尝试自动确定这些信息。

## 附件
您可以在所有这些钩子/步骤中将数据附加到 JSON 文件：

- Before(All)
- After(All)
- Given
- When
- Then
- And

您只需要在步骤文件中提供以下代码。

对于 ES 模块 (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// 附加字符串（如果未提供类型，它将自动默认为 `text/plain`）
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// 附加 JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// 在 before 钩子中附加截图
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
对于 CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// 附加字符串（如果未提供类型，它将自动默认为 `text/plain`）
attach('just a string');
attach('just a second string', 'text/plain');

// 附加 JSON
attach({"json-string": true}, 'application/json');

// 在 before 钩子中附加截图
attach(await browser.takeScreenshot(), 'image/png');
```

## 与 multiple-cucumber-html-reporter 一起使用
WebdriverIO V4 的前一个模块 [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter) 与 [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) 模块有内置连接。**对于此报告器，情况并非如此**，因为 WebdriverIO V5 的新设置基于一个不允许我使用 `onPrepare` 和 `onComplete` 钩子的实例。

如果您仍然想使用 [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) 模块，您可以在配置文件中添加以下内容。

- 安装模块

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- 将以下内容添加到您的配置文件中

    ```js
    import fs from 'node:fs/promises'
    // 导入模块
    import { generate } from 'multiple-cucumber-html-reporter'

    // Example wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * 在所有工作进程启动之前执行一次。
       */
      onPrepare: () => {
        // 删除存放 json 和报告文件的 `.tmp/` 文件夹
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * 在所有工作进程关闭且进程即将退出后执行。
       */
      onComplete: () => {
        // 所有测试完成后生成报告
        generate({
          // 必填
          // 这部分需要与您存储 JSON 文件的路径相同
          // 默认 = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // 更多选项请参见 https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## 较旧的 WebdriverIO 版本

> **此模块只能与 WebdriverIO V8+ 一起工作！**\
> **对于 V6，请查看[此处](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6)的文档并使用版本 2.0.4**\
> **对于 V5，请查看[此处](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5)的文档并使用版本 1.3.0**

> **此模块不是 [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter) 的替代品。该模块仅支持 WEBDRIVERIO V4 并且还创建报告。此模块仅创建 JSON，不创建报告！**