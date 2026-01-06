---
id: lambdatest
title: LambdaTest无障碍测试
---

# LambdaTest无障碍测试

您可以使用[LambdaTest无障碍测试](https://www.lambdatest.com/support/docs/accessibility-automation-settings/)轻松地在WebdriverIO测试套件中集成无障碍测试。

## LambdaTest无障碍测试的优势

LambdaTest无障碍测试帮助您识别和修复Web应用程序中的无障碍问题。以下是主要优势：

* 与现有的WebdriverIO测试自动化无缝集成。
* 测试执行期间的自动无障碍扫描。
* 全面的WCAG合规性报告。
* 详细的问题跟踪和修复指导。
* 支持多种WCAG标准(WCAG 2.0、WCAG 2.1、WCAG 2.2)。
* LambdaTest仪表板中的实时无障碍洞察。

## 开始使用LambdaTest无障碍测试

按照以下步骤将您的WebdriverIO测试套件与LambdaTest的无障碍测试集成：

1. 安装LambdaTest WebdriverIO服务包。

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. 更新您的`wdio.conf.js`配置文件。

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',
    
    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],
    
    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. 像往常一样运行您的测试。LambdaTest将在测试执行期间自动扫描无障碍问题。

```bash
npx wdio run wdio.conf.js
```

## 配置选项

`accessibilityOptions`对象支持以下参数：

* **wcagVersion**：指定要测试的WCAG标准版本
  - `wcag20` - WCAG 2.0 A级
  - `wcag21a` - WCAG 2.1 A级
  - `wcag21aa` - WCAG 2.1 AA级（默认）
  - `wcag22aa` - WCAG 2.2 AA级

* **bestPractice**：包含最佳实践建议（默认：`false`）

* **needsReview**：包含需要手动审查的问题（默认：`true`）

## 查看无障碍报告

测试完成后，您可以在[LambdaTest仪表板](https://automation.lambdatest.com/)中查看详细的无障碍报告：

1. 导航到您的测试执行
2. 点击"Accessibility"（无障碍）选项卡
3. 查看已识别的问题及其严重程度
4. 获取每个问题的修复指导

有关更详细的信息，请访问[LambdaTest无障碍自动化文档](https://www.lambdatest.com/support/docs/accessibility-automation-settings/)。