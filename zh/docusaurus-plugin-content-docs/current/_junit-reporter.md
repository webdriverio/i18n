---
id: junit-reporter
title: Junit 报告器
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> WebdriverIO 报告器，用于创建与 [Jenkins](http://jenkins-ci.org/) 兼容的基于 XML 的 JUnit 报告

## 安装

最简单的方法是通过以下方式将 `@wdio/junit-reporter` 作为 devDependency 保存在您的 `package.json` 中：

```sh
npm install @wdio/junit-reporter --save-dev
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 输出

此报告器将为每个运行器输出一个报告，因此您将收到每个规范文件的 XML 报告。以下是规范文件中不同场景的 XML 输出示例。

### 单个 describe 块
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
转换为
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
        <properties>
          <property name="specId" value="0"/>
          <property name="suiteName" value="a test suite"/>
          <property name="capabilities" value="chrome"/>
          <property name="file" value=".\test\specs\asuite.spec.js"/>
        </properties>
        <testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="11.706"/>
    </testsuite>
</testsuites>
```

### 嵌套 describe 块
```javascript
describe('a test suite', () => {
    describe('a nested test suite', function() {
        it('a test case', function () {
          // do something
          // assert something
        });
    });
});
```
转换为
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
  </testsuite>
  <testsuite name="a nested test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a nested test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
  </testsuite>
</testsuites>
```

### 多个 describe 块
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
describe('a second test suite', () => {
    it('a second test case', function () {
      // do something
      // assert something
    });
});
```
转换为
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
      <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
    </properties>
  </testsuite>
  <testsuite name="a second test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a second test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_second_test_case" name="a_second_test_suite_a_second_test_case" time="11.706"/>
  </testsuite>
</testsuites>
```

### 失败和错误
所有测试用例失败都会被映射为 JUnit 测试用例错误。由于断言失败或错误导致的测试用例失败将如下所示：

```xml
<testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="0.372">
  <failure message="Error: some error"/>
    <system-err>
        <![CDATA[
Error: some assertion failure
    at UserContext.<anonymous> (C:\repo\webdriver-example\test\specs/a_test_suite.spec.js:22:17)
]]>
  </system-err>
</testcase>
```

## 配置

以下代码显示了默认的 wdio 测试运行器配置。只需将 `'junit'` 作为报告器添加到数组中。要在测试期间获得一些输出，您可以同时运行 [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) 和 WDIO JUnit Reporter：

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            outputFileFormat: function(options) { // 可选
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

支持以下选项：

### outputDir
定义存储 XML 文件的目录。

类型：`String`<br />
必填

### outputFileFormat
定义测试执行后创建的 XML 文件。

类型：`Object`<br />
默认值：``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> 注意：`options.capabilities` 是该运行器的能力对象，因此在字符串中指定 `${options.capabilities}` 将返回 [Object object]。您必须指定要在文件名中包含的能力的哪些属性。

### suiteNameFormat

提供自定义正则表达式来格式化测试套件名称（例如在输出 XML 中）的能力。

类型：`Regex`<br />
默认值：`/[^a-zA-Z0-9@]+/`

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            suiteNameFormat: /[^a-zA-Z0-9@]+/
            outputFileFormat: function(options) { // 可选
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

### addFileAttribute

向每个测试用例添加文件属性。此配置主要用于 CircleCI。此设置提供更丰富的详细信息，但可能在其他 CI 平台上不兼容。

类型：`Boolean`<br />
默认值：`false`


### packageName

通过设置 `'packageName'` 可以按额外级别拆分包。例如，如果您想使用不同的环境变量集迭代测试套件：

类型：`String`<br />
示例：

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            packageName: process.env.USER_ROLE // chrome.41 - administrator
        }]
    ]
    // ...
};
```

### errorOptions

允许在 XML 内设置各种错误通知组合。<br />
给定一个 Jasmine 测试，如 `expect(true).toBe(false, 'my custom message')`，您将得到这样的测试错误：

```
{
    matcherName: 'toBe',
    message: 'Expected true to be false, \'my custom message\'.',
    stack: 'Error: Expected true to be false, \'my custom message\'.\n    at UserContext.it (/home/mcelotti/Workspace/WebstormProjects/forcebeatwio/test/marco/prova1.spec.js:3:22)',
    passed: false,
    expected: [ false, 'my custom message' ],
    actual: true
}
```

因此，您可以选择*哪个*键将被使用在*哪里*，请参见下面的示例。

类型：`Object`<br />
默认值：`errorOptions: { error: "message" }`<br />
示例：

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            }
        }]
    ],
    // ...
};
```

### addWorkerLogs

可选参数，将此参数设置为 true 以便在报告器中附加测试的控制台日志。

类型：`Boolean`<br />
默认值：`false`<br />
示例：

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            addWorkerLogs: true
        }]
    ],
    // ...
};
```

## 向测试用例添加自定义属性

此插件提供了一个函数 `addProperty(name, value)`。可以使用此函数向当前运行的测试步骤添加额外的 junit 测试用例属性。这些属性将在生成的 XML 中作为 `<property name="${name}" value="${value}" />` 报告。

此功能的典型用例是添加到问题或测试用例的链接。


### 使用示例

mocha 的示例：

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Jenkins 设置

最后但并非最不重要的是，您需要告诉 CI 作业（例如 Jenkins）在哪里可以找到 XML 文件。为此，向您的作业添加一个在测试运行后执行的构建后操作，并将 Jenkins（或您所需的 CI 系统）指向您的 XML 测试结果：

![将 Jenkins 指向 XML 文件](https://webdriver.io/img/jenkins-postjob.png "将 Jenkins 指向 XML 文件")

如果您的 CI 系统中没有这样的构建后步骤，那么互联网上可能有相关插件。

----

有关 WebdriverIO 的更多信息，请参见[主页](https://webdriver.io)。