---
id: security
title: セキュリティ
---

WebdriverIOはソリューションを提供する際にセキュリティ面を考慮しています。以下は、テストをより安全に保つためのいくつかの方法です。

# 機密データのマスキング

テスト中に機密データを使用する場合、ログなどで誰もが見ることができないようにすることが重要です。また、クラウドプロバイダーを使用する場合、秘密鍵が関与することがよくあります。この情報は、ログ、レポーター、その他の接点からマスクする必要があります。以下では、それらの値を公開せずにテストを実行するためのいくつかのマスキングソリューションを提供します。

## WebDriverIO

### コマンドのテキスト値をマスクする

`addValue`と`setValue`コマンドは、WDIOとAppiumのログ、およびレポーターでマスクするためのブールマスク値をサポートしています。さらに、パフォーマンスツールやサードパーティツールなどの他のツールもマスクバージョンを受け取り、セキュリティを強化します。

たとえば、実際の本番ユーザーを使用していて、マスクしたいパスワードを入力する必要がある場合、次のようにして可能です：

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

上記はWDIOログとAppiumログの両方からテキスト値を隠します。

ログの例：
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

制限事項：
  - Appiumでは、マスクを要求しても追加プラグインが情報を漏らす可能性があります。
  - クラウドプロバイダーはHTTPログ用のプロキシを使用する可能性があり、設置されたマスクメカニズムをバイパスする場合があります。

:::info

必要な最小バージョン：
 - WDIO v9.15.0
 - Appium v2.19.0

### WDIOログでのマスク

`maskingPatterns`設定を使用すると、WDIOログから機密情報をマスクできます。ただし、Appiumログはカバーされません。

たとえば、クラウドプロバイダーを使用していて、情報レベルを使用している場合、次のように表示されるユーザーキーが「漏洩」する可能性が非常に高いです：

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

これに対抗するために、正規表現`'--key=([^ ]*)'`を渡すと、ログには次のように表示されます：

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

これは、設定の`maskingPatterns`フィールドに正規表現を提供することで実現できます。
  - 複数の正規表現の場合は、カンマ区切りの値を持つ単一の文字列を使用します。
  - マスキングパターンの詳細については、[WDIO LoggerのREADMEのマスキングパターンセクション](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)を参照してください。

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

必要な最小バージョン：
 - WDIO v9.15.0

### WDIOロガーを無効にする

機密データのログ記録をブロックするもう一つの方法は、ログレベルを下げるか無音にするか、ロガーを無効にすることです。
以下のように実現できます：

```ts
import logger from '@wdio/logger';

/**
  * ログに機密情報を隠すために、プロミスを実行する前にWDIOロガーのレベルを「silent」に設定します。
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

## サードパーティソリューション

### Appium
Appiumは独自のマスキングソリューションを提供しています。[ログフィルター](https://appium.io/docs/en/latest/guides/log-filters/)を参照してください。
 - 彼らのソリューションを使用するのは難しい場合があります。可能な方法の1つは、`@mask@`のようなトークンを文字列に渡し、それを正規表現として使用することです。
 - 一部のAppiumバージョンでは、値も各文字がカンマ区切りでログに記録されるため、注意が必要です。
 - 残念ながら、BrowserStackはこのソリューションをサポートしていませんが、ローカルでは引き続き有用です。
 
先に述べた`@mask@`の例を使用すると、`appiumMaskLogFilters.json`という名前の次のJSONファイルを使用できます：
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

そして、JSONファイル名をappiumサービス設定の`logFilters`フィールドに渡します：
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

BrowserStackも一部のデータを隠すためのマスキングレベルを提供しています。[機密データを隠す](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)を参照してください。
 - 残念ながら、このソリューションはオールオアナッシングなので、提供されたコマンドのすべてのテキスト値がマスクされます。