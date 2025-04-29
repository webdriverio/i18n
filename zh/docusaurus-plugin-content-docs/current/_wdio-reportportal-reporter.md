---
id: wdio-reportportal-reporter
title: Report Portal 报告器
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter 是一个第三方包，有关更多信息，请查看 [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> 一个 WebdriverIO 报告插件，用于向 Report Portal([http://reportportal.io/](http://reportportal.io/)) 报告结果。

## Installation

最简单的方法是将 `wdio-reportportal-reporter` 和 `wdio-reportportal-service` 作为 devDependency 保存在您的 `package.json` 中。

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。

## Configuration

在 wdio.conf.js 文件中配置输出目录：

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // report portal settings
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // optional headers for internal http client
    restClientConfig: { // axios like http client config - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // add selenium commands to log
  seleniumCommandsLogLevel: 'debug', // log level for selenium commands
  autoAttachScreenshots: false, // automatically add screenshots
  screenshotsLogLevel: 'info', // log level for screenshots
  parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
  cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
  autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
  sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
  sauceLabOptions : {
    enabled: true, // automatically add SauseLab ID to rp tags.
    sldc: "US" // automatically add SauseLab region to rp tags.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# Additional API

可以通过以下方式访问 API 方法：

```js
const reporter = require('wdio-reportportal-reporter')
```

### Methods description

* `reporter.addAttribute({key, value})` – 向当前测试添加属性。
  * `key` (*string*, optional) - 属性键。必须是非空字符串。
  * `value` (*string*, required) – 属性值。必须是非空字符串。
* `reporter.addAttributeToCurrentSuite({key, value})` - 向当前套件添加属性。
  * `key` (*string*, optional) - 属性键。必须是非空字符串。
  * `value` (*string*, required) – 属性值。必须是非空字符串。
* `reporter.addDescriptionToCurrentSuite(description)` - 向当前套件添加一些字符串。
  * `description` (*string*) - 描述内容。文本可以用 markdown 格式化。
* `reporter.addDescriptionToAllSuites(description)` - 向所有即将到来的套件添加一些字符串。(在 before all hook 中使用它，这样每个套件都会获得相同的描述)
  * `description` (*string*) - 描述内容。文本可以用 markdown 格式化。
* `reporter.sendLog(level, message)` – 向当前套件/测试项发送日志。
  * `level` (*string*) - 日志级别。值 ['trace', 'debug', 'info', 'warn', 'error']。
  * `message` (*string*) – 日志消息内容。
* `reporter.sendFile(level, name, content, [type])` – 向当前套件/测试项发送文件。
  * `level` (*string*) - 日志级别。值 ['trace', 'debug', 'info', 'warn', 'error']。
  * `name` (*string*) – 文件名。
  * `content` (*string*) – 附件内容
  * `type` (*string*, optional) – 附件 MIME 类型，默认为 `image/png`
  * `message` (*string*) – 日志消息内容。
* `reporter.sendLogToTest(test, level, message)` - 向特定测试发送日志。
  * `test` (*object*) - 来自 `afterTest\afterStep` wdio hook 的测试对象
  * `level` (*string*) - 日志级别。值 ['trace', 'debug', 'info', 'warn', 'error']。
  * `message` (*string*) – 日志消息内容。
* `reporter.sendFileToTest(test, level, name, content, [type])` – 向特定测试发送文件。
  * `test` (*object*) - 来自 `afterTest\afterStep` wdio hook 的测试对象
  * `level` (*string*) - 日志级别。值 ['trace', 'debug', 'info', 'warn', 'error']。
  * `name` (*string*) – 文件名。
  * `content` (*string*) – 附件内容
  * `type` (*string*, optional) – 附件 MIME 类型，默认为 `image/png`
  * `message` (*string*) – 日志消息内容。

请注意：`sendLog`\\`sendFile` 将日志发送到**当前运行的测试项**。这意味着如果您在没有活动测试的情况下发送日志（例如从钩子或套件级别），它将不会在 Report Portal UI 中报告。

当您需要从 wdio afterTest 钩子向失败的测试项发送屏幕截图或日志时，`sendLogToTest`\\`sendFileToTest` 方法很有用。

Mocha 示例：

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Jasmine 示例：

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

WDIO Cucumber "5.14.3+" 示例：

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## Getting link to Report Portal UI launch page

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

或者更复杂的方式

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // or empty string for default 80/443 ports
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## Reporting test to existing launch

如果您想将测试报告到现有活动的启动中，您可以通过环境变量 `REPORT_PORTAL_LAUNCH_ID` 将其传递给报告器
您负责完成启动以及启动此类启动。

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## License

本项目根据 MIT 许可证授权 - 详情请参阅 [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) 文件