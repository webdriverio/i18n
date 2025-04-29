---
id: wdio-qunit-service
title: QUnit 服务
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service 是一个第三方包，有关更多信息，请参阅 [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) 服务，用于运行基于浏览器的 [QUnit](https://qunitjs.com/) 测试，并动态将它们转换为 `wdio` 测试套件。

## 替代 Karma

对于那些使用 [Karma JS](https://karma-runner.github.io/latest/index.html) 来运行 `QUnit` 测试（[karma-qunit](https://github.com/karma-runner/karma-qunit/)，[karma-ui5](https://github.com/SAP/karma-ui5) 或任何其他 Karma 和 QUnit 的组合）的用户，`QUnit Service` 是一个即插即用的替代品。Karma 已[弃用](https://github.com/karma-runner/karma)，人们应该转向现代化的替代方案！

如果你想保持 QUnit 测试原样，不需要重写和重构，`QUnit Service` 就是你所需要的全部。它在浏览器中运行你的 QUnit HTML 文件，并以 `wdio` 格式捕获所有结果。

因此，开发人员可以将 `QUnit Service` 与 `wdio` 生态系统中的所有其他功能一起使用。

想要[录制](https://webdriver.io/docs/wdio-video-reporter/)测试运行过程吗？也许需要[截图](https://webdriver.io/docs/api/browser/saveScreenshot/)或保存为 [PDF](https://webdriver.io/docs/api/browser/savePDF/)？检查[代码覆盖率](https://www.npmjs.com/package/wdio-monocart-service)？以 [JUnit](https://webdriver.io/docs/junit-reporter) 格式保存测试结果？尽管去做，`QUnit Service` 不会阻碍你。

## 安装

配置 `WebdriverIO` 后，在你的 `package.json` 文件中安装 `wdio-qunit-service` 作为开发依赖。

```shell
npm install wdio-qunit-service --save-dev
```

如果你还没有配置 `WebdriverIO`，请查看官方[文档](https://webdriver.io/docs/gettingstarted)。

## 配置

要使用 `QUnit Service`，你只需要将其添加到 `wdio.conf.js` 文件中的 `services` 列表中。wdio 文档包含了所有与[配置文件](https://webdriver.io/docs/configurationfile)相关的信息：

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## 使用方法

在执行测试前，确保 Web 服务器已启动并运行。`wdio` 不会启动 Web 服务器。

### 使用 .spec 或 .test 文件

在 WebdriverIO 测试中，你需要导航到 QUnit HTML 测试页面，然后调用 `browser.getQUnitResults()`。

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

建议每个 QUnit HTML 测试页面使用一个 WebdriverIO 测试文件。这确保测试将以并行和完全隔离的方式运行。

### 仅配置，不使用 .spec 或 .test 文件

如果你不想创建 spec/test 文件，你可以将 QUnit HTML 文件列表传递给配置，测试将自动生成。

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### 测试结果

测试结果可能看起来像：
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## 示例

查看[示例](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/)文件夹，了解使用 `javascript`、`typescript` 等的样例。

### 在 SAP Fiori / UI5 应用中的使用

使用众所周知的 [openui5-sample-app](https://github.com/SAP/openui5-sample-app) 的直接[示例](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/)：

- 创建配置文件：[wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- 告诉 `wdio` 在哪里找到 QUnit 测试文件：

- - 将 QUnit 文件包含到[服务配置](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)中
- - 或者
- - 为[单元测试](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js)创建一个 WebdriverIO 测试文件，为 [OPA5 测试](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)创建另一个

- 在执行测试前，Web 服务器必须运行

- 运行 $ `wdio run webapp/test/wdio.conf.js`

## 作者

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## 许可证

该项目基于 MIT 许可证 - 详情请参阅 [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) 文件。