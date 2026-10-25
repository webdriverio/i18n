---
id: security
title: セキュリティ
description: "セキュリティのベストプラクティスに従い、ログやレポート内のパスワードやキーをマスクすることで、機密性の高いテストデータを保護します。"
---

WebdriverIOは、ソリューションを提供する際にセキュリティの側面を考慮しています。以下は、テストをより安全にするためのいくつかの方法です。

## ベストプラクティス

- 平文で公開された場合に組織に損害を与える可能性のある機密データは、決してハードコードしないでください。
- キーやパスワードを安全に保存し、エンドツーエンドテストの開始時に取得するための仕組み（vaultなど）を使用してください。
- ネットワークログ内の認証トークンなど、機密データがログやクラウドプロバイダーによって公開されていないことを確認してください。

:::info

テストデータであっても、悪意のある人物の手に渡った場合に、情報を取得されたり、悪意を持ってそれらのリソースを使用されたりする可能性がないかを検討することが不可欠です。

:::

## 機密データのマスキング

テスト中に機密データを使用している場合、ログなどで誰にでも見える状態にならないようにすることが不可欠です。また、クラウドプロバイダーを使用する場合、プライベートキーが関係することがよくあります。これらの情報は、ログ、レポーター、その他の接点からマスクする必要があります。以下では、これらの値を公開せずにテストを実行するためのいくつかのマスキングソリューションを紹介します。

### WebDriverIO

#### コマンドのテキスト値をマスクする

コマンド`addValue`と`setValue`は、ログやレポーターでマスクするためのブール値のmaskオプションをサポートしています。さらに、パフォーマンスツールやサードパーティツールなどの他のツールもマスクされたバージョンを受け取るため、セキュリティが向上します。

例えば、実際の本番ユーザーを使用していて、マスクしたいパスワードを入力する必要がある場合、以下のように実現できます：

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

上記により、WDIOログ内のテキスト値は次のように非表示になります：

ログの例：
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Allureレポーターなどのレポーターや、BrowserStackのPercyのようなサードパーティツールも、マスクされたバージョンを扱います。
適切なAppiumバージョンと組み合わせることで、Appiumログからも機密データが除外されます。

:::info

制限事項：
  - Appiumでは、情報のマスクを要求していても、追加のプラグインによって情報が漏洩する可能性があります。
  - クラウドプロバイダーがHTTPログ記録にプロキシを使用している場合、導入されたマスク機構がバイパスされる可能性があります。
  - `getValue`コマンドはサポートされていません。さらに、同じ要素に対して使用すると、`addValue`や`setValue`の使用時にマスクしようとした値が公開される可能性があります。

最低限必要なバージョン：
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### WDIOログでのマスク

`maskingPatterns`設定を使用することで、WDIOログから機密情報をマスクできます。ただし、Appiumログは対象外です。

例えば、クラウドプロバイダーを使用していてinfoレベルを使用している場合、以下に示すように、ほぼ確実にユーザーのキーが「漏洩」します：

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

これに対処するために、正規表現`'--key=([^ ]*)'`を渡すと、ログには次のように表示されます

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

上記は、設定の`maskingPatterns`フィールドに正規表現を指定することで実現できます。
  - 複数の正規表現を使用する場合は、カンマ区切りの値を持つ単一の文字列を使用してください。
  - マスキングパターンの詳細については、[WDIO Logger READMEのMasking Patternsセクション](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)を参照してください。

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
:::

:::warning
コマンドライン経由で渡されるシークレットについては、wdio.conf.tsファイルが実行サイクルの後半で解析されるため、マスキングが失敗する可能性があります。このような場合には、環境変数を使用することを強く推奨します。その方がはるかに安全です。
:::

#### WDIOロガーを無効にする

機密データのログ記録をブロックするもう1つの方法は、ログレベルを下げるかサイレントにする、またはロガーを無効にすることです。
次のように実現できます：

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

### サードパーティソリューション

#### Appium
Appiumは独自のマスキングソリューションを提供しています。[Log filter](https://appium.io/docs/en/latest/guides/log-filters/)を参照してください
 - このソリューションの使用は難しい場合があります。可能であれば、`@mask@`のようなトークンを文字列に含めて、それを正規表現として使用する方法があります
 - 一部のAppiumバージョンでは、値が各文字ごとにカンマ区切りでログに記録されることもあるため、注意が必要です。
 - 残念ながら、BrowserStackはこのソリューションをサポートしていませんが、ローカルでは依然として有用です

前述の`@mask@`の例を使用して、`appiumMaskLogFilters.json`という名前の次のJSONファイルを使用できます
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

次に、appiumサービス設定の`logFilters`フィールドにJSONファイル名を渡します：
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

BrowserStackも、一部のデータを非表示にするためのある程度のマスキング機能を提供しています。[hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)を参照してください
 - 残念ながら、このソリューションはオール・オア・ナッシングであるため、指定されたコマンドのすべてのテキスト値がマスクされます。