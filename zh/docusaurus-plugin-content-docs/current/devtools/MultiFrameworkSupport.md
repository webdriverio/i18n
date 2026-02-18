---
id: multi-framework-support
title: 多框架支持
---

DevTools 自动与 Mocha、Jasmine 和 Cucumber 一起工作，无需任何特定框架的配置。只需将该服务添加到您的 WebDriverIO 配置中，所有功能都可以无缝运行，无论您使用的是哪种测试框架。

**支持的框架：**
- **Mocha** - 支持测试级和套件级执行，具有 grep 过滤功能
- **Jasmine** - 完整集成，具有基于 grep 的过滤功能
- **Cucumber** - 场景和示例级执行，支持 feature:line 定位

相同的调试界面、测试重新运行和可视化功能在所有框架中都能一致工作。

## 配置

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // or 'jasmine' or 'cucumber'
    services: ['devtools'],
    // ...
};
```