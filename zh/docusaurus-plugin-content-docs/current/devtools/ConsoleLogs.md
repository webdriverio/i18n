---
id: console-logs
title: 控制台日志
---

在测试执行期间捕获和检查所有浏览器控制台输出。DevTools记录来自您应用程序的控制台消息（`console.log()`、`console.warn()`、`console.error()`、`console.info()`、`console.debug()`）以及基于`wdio.conf.ts`中配置的`logLevel`的WebDriverIO框架日志。

**功能：**
- 测试执行过程中实时捕获控制台消息
- 浏览器控制台日志（log、warn、error、info、debug）
- 根据配置的`logLevel`（trace、debug、info、warn、error、silent）过滤的WebDriverIO框架日志
- 显示每条消息记录的确切时间戳
- 控制台日志与测试步骤和浏览器截图一起显示以提供上下文

**配置：**
```js
// wdio.conf.ts
export const config = {
    // 日志记录详细程度：trace | debug | info | warn | error | silent
    logLevel: 'info', // 控制捕获哪些框架日志
    // ...
};
```

这使得调试JavaScript错误、跟踪应用程序行为以及在测试执行期间查看WebDriverIO的内部操作变得容易。

## 演示

### >_ 控制台日志
![Console Logs](./demo/console-logs.gif)