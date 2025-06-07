---
id: security
title: 安全
---

WebdriverIO在提供解决方案时考虑了安全方面。以下是一些更好地保护测试安全的方法。

## 最佳实践

- 切勿硬编码敏感数据，这些数据如果以明文形式暴露可能会对组织造成伤害。
- 使用机制（如保险库）安全地存储密钥和密码，并在启动端到端测试时检索它们。
- 验证没有敏感数据暴露在日志和云提供商中，例如网络日志中的身份验证令牌。

:::info

即使对于测试数据，也必须考虑恶意人员是否可能检索信息或利用这些资源进行恶意活动。

:::

## 屏蔽敏感数据

如果在测试过程中使用敏感数据，确保它们不会对所有人可见（比如在日志中）是至关重要的。此外，当使用云提供商时，通常涉及私钥。这些信息必须从日志、报告器和其他接触点中屏蔽。以下提供了一些屏蔽解决方案，以便在不暴露这些值的情况下运行测试。

### WebDriverIO

#### 屏蔽命令的文本值

命令`addValue`和`setValue`支持布尔掩码值，以在日志和报告器中进行屏蔽。此外，其他工具（如性能工具和第三方工具）也将接收掩码版本，增强安全性。

例如，如果您使用真实的生产用户并需要输入要屏蔽的密码，那么现在可以通过以下方式实现：

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

上述代码将从WDIO日志中隐藏文本值，如下所示：

日志示例：
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

像Allure报告器这样的报告器以及像BrowserStack的Percy这样的第三方工具也将处理掩码版本。
配合适当的Appium版本，Appium日志也将免于暴露您的敏感数据。

:::info

限制：
  - 在Appium中，即使我们要求屏蔽信息，额外的插件也可能泄露。
  - 云提供商可能使用HTTP日志代理，绕过已设置的掩码机制。
  - `getValue`命令不受支持。此外，如果在同一元素上使用，当使用`addValue`或`setValue`时，它可能会暴露原本要掩码的值。

最低要求版本：
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### 在WDIO日志中屏蔽

使用`maskingPatterns`配置，我们可以从WDIO日志中屏蔽敏感信息。但是，Appium日志不包括在内。

例如，如果您使用云提供商并使用info级别，那么您很可能会"泄露"用户的密钥，如下所示：

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

为了解决这个问题，我们可以传递正则表达式`'--key=([^ ]*)'`，现在在日志中您将看到

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

您可以通过将正则表达式提供给配置的`maskingPatterns`字段来实现上述目的。
  - 对于多个正则表达式，使用单个字符串，但用逗号分隔值。
  - 有关掩码模式的更多详细信息，请参见[WDIO Logger README中的掩码模式部分](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)。

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

最低要求版本：
 - WDIO v9.15.0

:::

#### 禁用WDIO日志记录器

阻止记录敏感数据的另一种方法是降低或静音日志级别或禁用日志记录器。
可以按照以下方式实现：

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### 第三方解决方案

#### Appium
Appium提供了自己的掩码解决方案；参见[日志过滤器](https://appium.io/docs/en/latest/guides/log-filters/)
 - 使用他们的解决方案可能比较棘手。如果可能，一种方法是在字符串中传递像`@mask@`这样的标记，并将其用作正则表达式
 - 在某些Appium版本中，值也会以每个字符逗号分隔的方式记录，所以我们需要小心。
 - 不幸的是，BrowserStack不支持此解决方案，但它在本地仍然有用
 
使用前面提到的`@mask@`示例，我们可以使用以下名为`appiumMaskLogFilters.json`的JSON文件
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

然后将JSON文件名传递给appium服务配置中的`logFilters`字段：
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

BrowserStack也提供了一些级别的屏蔽来隐藏某些数据；参见[隐藏敏感数据](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - 不幸的是，该解决方案是全有或全无，所以提供的命令的所有文本值都将被屏蔽。