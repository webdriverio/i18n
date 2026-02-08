---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI（原LambdaTest）的[SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/)为您的WebdriverIO测试提供AI驱动的视觉回归测试。它捕获截图，与基准进行比较，并通过智能比较算法突显视觉差异。

## 设置

**创建SmartUI项目**

[注册](https://accounts.lambdatest.com/register)TestMu AI（原LambdaTest）并导航至[SmartUI Projects](https://smartui.lambdatest.com/)创建新项目。选择**Web**作为平台，并配置您的项目名称、审批人和标签。

**设置凭证**

从TestMu AI（原LambdaTest）仪表板获取您的`LT_USERNAME`和`LT_ACCESS_KEY`，并将它们设置为环境变量：

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**安装SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**配置WebdriverIO**

更新您的`wdio.conf.js`：

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## 使用方法

使用`browser.execute('smartui.takeScreenshot')`捕获截图：

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**运行测试**

```sh
npx wdio wdio.conf.js
```

在[SmartUI Dashboard](https://smartui.lambdatest.com/)查看结果。

## 高级选项

**忽略元素**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**选择特定区域**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## 资源

| 资源                                                                                          | 描述                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [官方文档](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | SmartUI文档                    |
| [SmartUI仪表板](https://smartui.lambdatest.com/)                                              | 访问您的SmartUI项目和构建  |
| [高级设置](https://www.testmuai.com/support/docs/test-settings-options/)              | 配置比较敏感度         |
| [构建选项](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | 高级构建配置             |