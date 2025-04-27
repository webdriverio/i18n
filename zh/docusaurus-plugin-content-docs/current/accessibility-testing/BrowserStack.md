---
id: browserstack
title: BrowserStack 无障碍测试
---

# BrowserStack Accessibility Testing

你可以使用[BrowserStack无障碍测试的自动化测试功能](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)轻松地在WebdriverIO测试套件中集成无障碍测试。

## BrowserStack无障碍测试中自动化测试的优势

要在BrowserStack无障碍测试中使用自动化测试，你的测试应该在BrowserStack Automate上运行。

自动化测试的优势如下：

* 无缝集成到您现有的自动化测试套件中。
* 测试用例不需要代码更改。
* 无障碍测试零额外维护。
* 了解历史趋势并获得测试用例洞察。

## 开始使用BrowserStack无障碍测试

按照以下步骤将你的WebdriverIO测试套件与BrowserStack的无障碍测试集成：

1. 安装`@wdio/browserstack-service` npm包。

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. 更新`wdio.conf.js`配置文件。

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

你可以在[这里](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)查看详细说明。