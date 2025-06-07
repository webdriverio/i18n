---
id: security
title: セキュリティ
---

WebdriverIOはソリューションを提供する際にセキュリティの側面を考慮しています。以下は、テストをより安全に保つためのいくつかの方法です。

## ベストプラクティス

- 組織に害を与える可能性のある機密データを平文で公開する形でハードコードしないでください。
- キーやパスワードを安全に保存し、エンドツーエンドテストを開始する際に取得するメカニズム（ボールトなど）を使用してください。
- ネットワークログでの認証トークンなど、機密データがログやクラウドプロバイダーによって公開されていないことを確認してください。

:::info

テストデータであっても、悪意のある人物が間違った手に渡った場合に情報を取得したり、悪意を持ってそれらのリソースを使用したりできるかどうかを検討することが重要です。

:::

## 機密データのマスキング

テスト中に機密データを使用する場合、ログなど誰にでも見えないようにすることが重要です。また、クラウドプロバイダーを使用する場合、多くの場合、秘密鍵が関係しています。この情報はログ、レポーター、その他の接点からマスクする必要があります。以下に、これらの値を公開せずにテストを実行するためのいくつかのマスキングソリューションを示します。

### WebDriverIO

#### コマンドのテキスト値をマスクする

コマンド`addValue`と`setValue`は、ログやレポーターでマスクするためのブール値マスクをサポートしています。さらに、パフォーマンスツールやサードパーティツールなどの他のツールもマスクバージョンを受け取り、セキュリティを強化します。

例えば、実際の本番環境ユーザーを使用していて、マスクしたいパスワードを入力する必要がある場合は、以下のように可能です：

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // フォーカスを取得
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

上記はWDIOログからテキスト値を以下のように隠します：

ログの例：
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Allureレポーターなどのレポーターや、BrowserStackのPercyなどのサードパーティツールも、マスクされたバージョンを処理します。
適切なAppiumバージョンと組み合わせることで、Appiumログも機密データから除外されます。

:::info

制限事項：
  - Appiumでは、マスクするように要求してもプラグインによって情報が漏洩する可能性があります。
  - クラウドプロバイダーは、HTTPロギングのためにプロキシを使用することがあり、これによって設置されたマスクメカニズムがバイパスされる可能性があります。
  - `getValue`コマンドはサポートされていません。さらに、同じ要素に使用すると、`addValue`または`setValue`を使用する際にマスクしようとした値が公開される可能性があります。

最小要件バージョン：
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### WDIOログでのマスキング

`maskingPatterns`設定を使用することで、WDIOログから機密情報をマスクすることができます。ただし、Appiumログはカバーされません。

例えば、クラウドプロバイダーを使用していて、infoレベルを使用している場合、以下のようにユーザーのキーが「漏洩」する可能性が非常に高いです：

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

これを対策するために、正規表現`'--key=([^ ]*)'`を渡すと、ログでは以下のように表示されます：

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

設定の`maskingPatterns`フィールドに正規表現を提供することで上記を実現できます。
  - 複数の正規表現には、カンマ区切りの値を持つ単一の文字列を使用します。
  - マスキングパターンの詳細については、[WDIO LoggerのREADMEのマスキングパターンセクション](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)を参照してください。

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * テスト設定
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

最小要件バージョン：
 - WDIO v9.15.0

:::

#### WDIOロガーを無効にする

機密データのログ記録をブロックするもう一つの方法は、ログレベルを下げたり、サイレントにしたり、ロガーを無効にしたりすることです。
以下のように実現できます：

```ts
import logger from '@wdio/logger';

/**
  * ログで機密情報を隠すのに役立つ、プロミスを実行する前にWDIOロガーのロガーレベルを「silent」に設定します。
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
Appiumは独自のマスキングソリューションを提供しています。[ログフィルター](https://appium.io/docs/en/latest/guides/log-filters/)を参照してください。
 - 彼らのソリューションを使用するのは難しい場合があります。可能であれば、文字列に`@mask@`のようなトークンを渡し、それを正規表現として使用する方法があります。
 - 一部のAppiumバージョンでは、値も各文字がカンマ区切りでログに記録されるため、注意が必要です。
 - 残念ながら、BrowserStackはこのソリューションをサポートしていませんが、ローカルでは依然として役立ちます。
 
前述の`@mask@`の例を使用して、`appiumMaskLogFilters.json`という名前の以下のJSONファイルを使用できます：
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

次に、JSONファイル名をAppiumサービス設定の`logFilters`フィールドに渡します：
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

BrowserStackも一部のデータを隠すためのマスキングレベルを提供しています。[機密データの非表示](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)を参照してください。
 - 残念ながら、ソリューションはすべてか無しかの方式なので、提供されたコマンドのすべてのテキスト値がマスクされます。