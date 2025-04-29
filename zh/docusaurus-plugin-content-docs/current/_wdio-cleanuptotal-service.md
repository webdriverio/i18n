---
id: wdio-cleanuptotal-service
title: CleanupTotal 服务
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

通过 [webdriver.io](https://webdriver.io/) 的 `cleanup-total` 服务，您可以轻松确保每次测试后的适当清理。该服务提供了一种系统方法，在创建实体后立即将其标记为删除。这在测试涉及创建复杂结构时特别有用，例如带有投资计划和存款的银行账户。如果没有适当的清理，尝试删除账户可能会导致错误，比如由于账户不为空而被拒绝。然而，使用 __cleanup-total__，实体将按正确的顺序删除，确保测试会清理自身并且不会相互干扰。

## 安装
安装此模块作为（开发）依赖项的最简单方法是使用以下命令：

```
npm install wdio-cleanuptotal-service --save-dev
```

## 使用方法

将 wdio-cleanuptotal-service 添加到您的 `wdio.conf.ts` 中：

```typescript
export const config: WebdriverIO.Config = {
  // ... 其他选项

  services: ['cleanuptotal']

  // ... 其他选项
};
```

或者使用服务选项：

```typescript
export const config: WebdriverIO.Config = {
  // ... 其他选项

  services: [
    [
      'cleanuptotal',
      {
        // 使用自定义日志记录函数将消息写入测试报告
        customLoggerMethod: console.log(), // TODO: 如有需要，替换为您自己的日志记录函数

        // 仅在发生错误时写入日志以减少混乱
        logErrorsOnly: false, // TODO: 如果报告中有太多消息，请考虑改为"true"
      }
    ]
  ]

  // ... 其他选项
};
```

## 在测试中使用

您可以在需要的地方导入 __cleanuptotal__ 服务，无论是在测试文件中还是在任何其他类中。

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // 创建账户并将其添加到清理列表中，以便在测试后删除
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // 向账户添加投资计划并将其添加到清理列表
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // 向账户存入资金并将其添加到清理列表
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// 注意，实际的清理代码将在测试完成后执行
```

## Typescript 支持

此插件支持 Typescript。

## 支持

如需支持和建议，请随时通过 [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com) 联系我。