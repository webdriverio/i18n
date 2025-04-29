---
id: gmangiapelo-wdio-azure-devops-service
title: Azure DevOps 测试计划服务
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

在 Azure DevOps Test Plans 上发布 [WebdriverIO](https://webdriver.io/) 结果。

核心功能：

* 支持 Jasmine/Jest/Mocha 和 Cucumber 运行时框架
* 如果您执行多个规格(测试)文件，并且它们属于同一套件，测试结果将汇总在相同的测试运行下
* 单个测试执行后立即报告结果（实时报告）
* 最后一个规格(测试)文件完成后关闭测试运行
* 多套件支持


## 安装

使用以下命令在本地安装此模块，作为（开发）依赖项：

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

有关如何安装 `WebdriverIO` 的说明可以在[此处](https://webdriver.io/docs/gettingstarted)找到。

## 使用

> _wdio-azure-devops-service_ 支持 **NodeJS 8 或更高版本**

> _wdio-azure-devops-service_ 支持 **commonjs** 和 **esm**

### 配置

由于 `@gmangiapelo/wdio-azure-devops-service` 是一个服务，您可以在 `wdio.conf.js` 文件中按如下方式设置它

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### 测试用例设置

您的 WDIO 测试应包含 Azure 测试用例的 ID。确保您的测试用例 ID 与测试标题明显区分：

**Mocha 风格:**
```Javascript
// 好的做法:
it("C123 Can authenticate a valid user", ...

// 不好的做法:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Cucumber 风格:**
```Gherkin
## 好的做法:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## 不好的做法:
@c123stringTest
Scenario Can authenticate a valid user
```

### Azure DevOps 报告示例

这是在测试运行期间推送到 AZ Test Plans 的结果示例
![AzureDevops Test Plans example](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## 服务选项

### pat

在 Azure DevOps 中生成的具有 API 权限设置的个人访问令牌。

示例: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

类型: `string`

必填: `true`

### organizationUrl

您的 Azure DevOps 实例的基本 URL。

示例: `"https://dev.azure.com/gianlucamangiapelo"`

类型: `string`

必填: `true`

### projectId

Azure DevOps 中项目的 ID。

要查找 projectId，请使用 `GET {organizationUrl}/_apis/projects?api-version=6.0` 并复制适当的 `id`。

示例: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

类型: `string`

必填: `true`

### planId

您可以在 Azure DevOps Test Plan 部分中检索到的测试计划 ID。

示例: `124`

类型: `integer`

必填: `true`

### suiteId

您可以在 Azure DevOps Test Plan 部分中检索到的套件 ID，在嵌套套件的情况下，获取根套件 ID，服务会迭代所有子套件。

示例: `21`

类型: `integer`

必填: `true`

### runName

测试运行的描述性名称。

示例: `"FE regression tests run"`

类型: `string`

必填: `true`

### caseIdRegex

从标签或标题测试用例匹配 testCaseId 的自定义正则表达式。

类型: `string`

默认值: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

必填: `false`

## 作者
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)