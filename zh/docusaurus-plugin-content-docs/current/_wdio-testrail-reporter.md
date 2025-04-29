---
id: wdio-testrail-reporter
title: Testrail Reporter 报告器
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter 是一个第三方包，更多信息请参见 [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

此报告器创建 TestRail 报告。首先，您需要启用 TestRail API，以便报告可以与 TestRail 通信并推送测试结果。要做到这一点，请登录您的 TestRail 账户并前往 Administration > Site Settings > API，确保勾选 Enable API 复选框。

在测试描述中添加 TestRail 的测试用例 ID。例如：
```javascript
it("C123456 Page loads correctly", async () => {
```
这也支持多个用例 ID。例如：
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## 安装

要使用此报告器，请将其添加到您的 `package.json`：

```sh
npm i --save-dev @wdio/testrail-reporter
```

## 使用方法

将报告器添加到您的 WDIO 配置文件中。

当您想创建新测试运行时的示例：

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

当您想更新现有测试运行时的示例：

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

当您需要基于要执行的测试套件使用不同的项目和/或套件 ID 时的示例：

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## 选项

### `projectId`

TestRail 项目的 ID。

类型：`string`

### `suiteId`

套件的 ID，套件 1 为默认值。

类型：`string`

### `domain`

您的 TestRail 实例的域名，例如 `your-domain.testrail.io`。

类型：`string`

### `username`

您的 TestRail 实例的用户名。

类型：`string`

### `apiToken`

您的 TestRail 实例的 API 令牌。

类型：`string`

### `runName`

测试运行的自定义名称。

类型：`string`

### `existingRunId`

要更新的现有测试运行的 ID。

类型：`string`

### `oneReport`

创建单个测试运行。

类型：`boolean`

### `includeAll`

在测试运行中包含套件中的所有测试。

类型：`boolean`

### `caseIdTagPrefix`

用于在 Cucumber 标签中定位用例 ID 的前缀，对多平台 Cucumber 场景执行很有用。

类型：`string`

### `useCucumber`

指示测试是否使用 Cucumber 框架编写。默认值为 `false`。

类型：`boolean`

---

有关 WebdriverIO 的更多信息，请参见[主页](https://webdriver.io)。