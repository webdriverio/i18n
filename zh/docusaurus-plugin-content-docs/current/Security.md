---
id: security
title: 安全
---

WebdriverIO在提供解决方案时考虑了安全方面。以下是一些更好地保护测试的方法。

# 屏蔽敏感数据

如果您在测试过程中使用敏感数据，确保它们不对所有人可见（如在日志中）是至关重要的。此外，当使用云提供商时，通常会涉及私钥。这些信息必须从日志、报告器和其他接触点中屏蔽。以下提供了一些屏蔽解决方案，以便在不暴露这些值的情况下运行测试。

## WebDriverIO

### 屏蔽命令的文本值

命令`addValue`和`setValue`支持布尔值mask参数，可以在WDIO和Appium日志以及报告器中进行屏蔽。此外，其他工具，如性能工具和第三方工具，也将接收到屏蔽版本，增强安全性。

例如，如果您使用真实的生产用户并需要输入一个您想屏蔽的密码，那么现在可以通过以下方式实现：

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

上述操作将在WDIO日志和Appium日志中隐藏文本值。

日志示例：
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

限制：
  - 在Appium中，即使我们要求屏蔽信息，额外的插件可能会泄露信息。
  - 云提供商可能使用HTTP日志的代理，这会绕过已设置的屏蔽机制。

:::info

最低要求版本：
 - WDIO v9.15.0
 - Appium v2.19.0

### 在WDIO日志中屏蔽

使用`maskingPatterns`配置，我们可以从WDIO日志中屏蔽敏感信息。但是，这不包括Appium日志。

例如，如果您使用云提供商并使用info级别，那么很可能会"泄露"用户密钥，如下所示：

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

为了解决这个问题，我们可以传递正则表达式`'--key=([^ ]*)'`，现在在日志中您将看到

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

您可以通过在配置的`maskingPatterns`字段中提供正则表达式来实现上述目标。
  - 对于多个正则表达式，使用单个字符串但以逗号分隔的值。
  - 有关屏蔽模式的更多详细信息，请参阅[WDIO Logger README中的屏蔽模式部分](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)。

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

### 禁用WDIO日志记录器

阻止敏感数据记录的另一种方法是降低或静音日志级别或禁用日志记录器。
可以按如下方式实现：

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

## 第三方解决方案

### Appium
Appium提供了自己的屏蔽解决方案；请参阅[日志过滤器](https://appium.io/docs/en/latest/guides/log-filters/)
 - 使用他们的解决方案可能有些棘手。如果可能的话，一种方法是在您的字符串中传递一个像`@mask@`这样的标记，并将其用作正则表达式
 - 在某些Appium版本中，值也会以每个字符逗号分隔的方式记录，所以我们需要小心。
 - 不幸的是，BrowserStack不支持这种解决方案，但它在本地仍然有用
 
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

### BrowserStack

BrowserStack也提供了一定程度的屏蔽来隐藏一些数据；请参阅[隐藏敏感数据](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - 不幸的是，这种解决方案是全有或全无的，所以提供的命令的所有文本值都将被屏蔽。