---
id: badisi-wdio-harness
title: Angular组件测试工具支持服务
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness 是第三方软件包，更多信息请参见 [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> 对Angular组件测试工具的支持。</i><br/>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@badisi/wdio-harness">
        <img src="https://img.shields.io/npm/v/@badisi/wdio-harness.svg?color=blue&logo=npm" alt="npm version" /></a>
    <a href="https://npmcharts.com/compare/@badisi/wdio-harness?minimal=true">
        <img src="https://img.shields.io/npm/dw/@badisi/wdio-harness.svg?color=7986CB&logo=npm" alt="npm donwloads" /></a>
    <a href="https://github.com/badisi/wdio-harness/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/@badisi/wdio-harness.svg?color=ff69b4" alt="license" /></a>
</p>

<p align="center">
    <a href="https://github.com/Badisi/wdio-harness/actions/workflows/ci_tests.yml">
        <img src="https://github.com/Badisi/wdio-harness/actions/workflows/ci_tests.yml/badge.svg" alt="build status" /></a>
    <a href="https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md#-submitting-a-pull-request-pr">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" /></a>
</p>

<hr/>

#### 组件测试工具

> 组件测试工具是一个类，它允许测试通过支持的API与组件进行交互。每个测试工具的API都以用户的方式与组件进行交互。通过使用测试工具API，测试可以隔离自己免受组件内部更新的影响，例如更改其DOM结构。组件测试工具的想法来自于集成测试中常用的[PageObject](https://martinfowler.com/bliki/PageObject.html)模式。

[更多信息](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## 安装

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## 使用方法

__方法__

- `createHarnessEnvironment(rootElement)` - 从给定元素（默认为body）获取HarnessLoader实例
- `getHarness(harnessType, element)` - 从给定的ComponentHarness类和元素中搜索测试工具实例
- `getHarness(harnessType)` - 从给定的ComponentHarness类中搜索测试工具实例
- `getHarness(query)` - 从给定的HarnessPredicate中搜索测试工具实例
- `getAllHarnesses(query)` - 类似于getHarness，但返回测试工具实例数组
- `waitForAngular()` - 等待Angular完成引导过程

__示例__

```ts
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { getHarness } from '@badisi/wdio-harness';

describe('Angular Material Harness', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:4200');
    });

    it('MatDatePicker', async () => {
        const datepicker = await getHarness(MatDatepickerInputHarness.with({ selector: '#demo-datepicker-input' }));

        await datepicker.setValue('9/27/1954');
        expect(await datepicker.getValue()).withContext('Date should be 9/27/1954').toBe('9/27/1954');

        await datepicker.openCalendar();
        const calendar = await datepicker.getCalendar();
        await calendar.next();
        await calendar.selectCell({ text: '20' });
        expect(await datepicker.getValue()).withContext('Date should be 10/20/1954').toBe('10/20/1954');
    });
});
```

更多示例[点击这里][examples]。


## 开发

查看[开发者文档][developer]。


## 贡献

#### > 想要帮忙？

想要提交bug、贡献代码或改进文档？太好了！

但是请先阅读[贡献][contributing]指南，了解提交流程、编码规则等更多信息。

#### > 行为准则

请阅读并遵循[行为准则][codeofconduct]，帮助我保持这个项目的开放性和包容性。




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts