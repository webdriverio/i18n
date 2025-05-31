---
id: security
title: セキュリティ
---

WebdriverIOはソリューションを提供する際にセキュリティの側面を考慮しています。以下はテストをより安全に保護するためのいくつかの方法です。

# 機密データのマスキング

テスト中に機密データを使用している場合、ログなどで誰にでも見えないようにすることが重要です。また、クラウドプロバイダーを使用する場合、秘密鍵が関与することがよくあります。この情報は、ログ、レポーター、その他の接点からマスクする必要があります。以下では、これらの値を公開せずにテストを実行するためのいくつかのマスキングソリューションを提供します。

## WebDriverIO

### コマンドのテキスト値をマスクする

コマンド`addValue`と`setValue`は、WDIOおよびAppiumログ、さらにレポーターでマスクするためのブール値マスクをサポートしています。さらに、パフォーマンスツールやサードパーティツールなどの他のツールも、マスクされたバージョンを受け取り、セキュリティを強化します。

例えば、実際の本番ユーザーを使用していて、マスクしたいパスワードを入力する必要がある場合、次のようにして可能です：

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

上記は、WDIOログとAppiumログの両方からテキスト値を隠します。

ログの例：
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

制限事項：
  - Appiumでは、マスクするよう要求しても追加プラグインが情報を漏らす可能性があります。
  - クラウドプロバイダーがHTTPロギング用のプロキシを使用する場合、配置されたマスクメカニズムをバイパスする可能性があります。

:::info

最低限必要なバージョン：
 - WDIO v9.15.0
 - Appium v2.19.0

### WDIOログでのマスク

`maskingPatterns`設定を使用することで、WDIOログから機密情報をマスクすることができます。ただし、Appiumログはカバーされません。

例えば、クラウドプロバイダーを使用していて、情報レベルを使用している場合、ほとんど確実に以下のようにユーザーのキーが「漏れる」でしょう：

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

これに対抗するために、正規表現`'--key=([^ ]*)'`を渡すと、ログには次のように表示されます：

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

設定の`maskingPatterns`フィールドに正規表現を提供することで上記を実現できます。
  - 複数の正規表現の場合、コンマ区切りの値を持つ単一の文字列を使用します。
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

最低限必要なバージョン：
 - WDIO v9.15.0

### WDIOロガーを無効にする

機密データのログ記録をブロックするもう一つの方法は、ログレベルを下げたり、サイレントにしたり、ロガーを無効にすることです。
次のように実現できます：

```ts
import logger from '@wdio/logger';

/**
  * WDIOロガーのレベルを'silent'に設定してからプロミスを実行します。これにより、ログ内の機密情報を隠すのに役立ちます。
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
Appiumは独自のマスキングソリューションを提供しています。[ログフィルター](https://appium.io/docs/en/2.0/guides/log-filters/)を参照してください。
 - 彼らのソリューションを使用するのは難しい場合があります。可能な場合の一つの方法は、`@mask@`のようなトークンを文字列に渡し、正規表現として使用することです。
 - 一部のAppiumバージョンでは、値も各文字がコンマ区切りでログに記録されるため、注意が必要です。
 - 残念ながら、BrowserStackはこのソリューションをサポートしていませんが、ローカルでは依然として有用です。
 
前述の`@mask@`の例を使用して、`appiumMaskLogFilters.json`という名前の次のJSONファイルを使用できます：
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

次に、JSONファイル名をappiumサービス設定の`logFilters`フィールドに渡します：
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

BrowserStackも一定レベルのマスキングを提供して一部のデータを隠すことができます。[機密データを隠す](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)を参照してください。
 - 残念ながら、このソリューションはすべてか無しかの選択になるため、提供されたコマンドのすべてのテキスト値がマスクされます。