---
id: customservices
title: カスタムサービス
description: "テストランナーフックを使用してWDIOテストランナー用のカスタムランチャーサービスまたはワーカーサービスを作成し、サービスエラーを処理してNPMで公開します。"
---

WDIOテストランナー用に独自のカスタムサービスを作成し、ニーズに合わせて調整することができます。

サービスは、テストを簡素化し、テストスイートを管理し、結果を統合するための再利用可能なロジックとして作成されるアドオンです。サービスは、`wdio.conf.js`で利用できるものと同じすべての[フック](/docs/configurationfile)にアクセスできます。

定義できるサービスには2つのタイプがあります。1つはランチャーサービスで、テスト実行ごとに1回だけ実行される`onPrepare`、`onWorkerStart`、`onWorkerEnd`、`onComplete`フックにのみアクセスできます。もう1つはワーカーサービスで、その他すべてのフックにアクセスでき、ワーカーごとに実行されます。ワーカーサービスは別の（ワーカー）プロセスで実行されるため、両タイプのサービス間で（グローバル）変数を共有することはできない点に注意してください。

ランチャーサービスは次のように定義できます：

```js
export default class CustomLauncherService {
    // フックがpromiseを返す場合、WebdriverIOはそのpromiseが解決されるまで待ってから続行します。
    async onPrepare(config, capabilities) {
        // TODO: すべてのワーカーが起動する前に行う処理
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: ワーカーがシャットダウンした後に行う処理
    }

    // カスタムサービスメソッド ...
}
```

一方、ワーカーサービスは次のようになります：

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions`にはサービス固有のすべてのオプションが含まれます
     * 例えば、次のように定義した場合：
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * `serviceOptions`パラメータは`{ foo: 'bar' }`になります
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * browserオブジェクトはここで初めて渡されます
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: すべてのテストが実行される前に行う処理、例：
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: すべてのテストが実行された後に行う処理
    }

    beforeTest(test, context) {
        // TODO: 各Mocha/Jasmineテストの実行前に行う処理
    }

    beforeScenario(test, context) {
        // TODO: 各Cucumberシナリオの実行前に行う処理
    }

    // その他のフックまたはカスタムサービスメソッド ...
}
```

コンストラクタに渡されたパラメータを通じてbrowserオブジェクトを保存することをお勧めします。最後に、両タイプのワーカーを次のようにエクスポートします：

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

TypeScriptを使用していて、フックメソッドのパラメータを型安全にしたい場合は、サービスクラスを次のように定義できます：

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## 条件付きワーカーサービス

サービスは、そのワーカーコードがテスト実行または特定のワーカーに必要かどうかを判断できます。2つのオプションのチェックがあります：

| チェック | 実行場所 | 引数 | `false`を返した場合の効果 |
| --- | --- | --- | --- |
| 名前付きモジュールエクスポート`shouldLoad` | ランチャープロセス、サービスモジュールのインポート後 | 設定、構成されたすべてのcapabilities | サービスモジュールはどのワーカーでもインポートされません。ランチャーサービスは引き続き実行されます。 |
| ワーカーサービスの静的メソッド`shouldRun` | ワーカープロセス、サービスの構築前 | サービスオプション、そのワーカーのcapabilities、設定 | ワーカーサービスは構築されないため、そのワーカーではフックが一切実行されません。 |

名前またはパスで構成されたサービスモジュールには`shouldLoad(config, capabilities)`を使用します。これはパッケージ全体の判断です。同じサービスが異なるオプションで複数回登場する場合、その結果はそれらすべてのエントリに適用されます。例えば、リモート認証情報を必要とするカスタムサービスは次のようにエクスポートできます：

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

サービスエントリおよびワーカーごとに個別に判断するには`static shouldRun(options, capabilities, config)`を使用します。これは`services`に直接渡されたカスタムサービスクラスでも機能します。例えば、次のサービスはフックを構成されたブラウザに限定できます：

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // shouldRunを通過したワーカーでのみ実行されます。
    }
}
```

`services: [['custom', { browserName: 'chrome' }]]`の場合、パッケージの`shouldLoad`チェックでも許可されていれば、このワーカーサービスはChromeのcapabilitiesに対してのみ構築されます。`shouldRun`を呼び出すには、ワーカーがサービスモジュールをインポートする必要があります。このメソッドから`false`を返しても、そのインポートが妨げられたり、ランチャーサービスに影響したりすることはありません。

どちらのチェックも、booleanまたはbooleanのpromiseを返すことができます。WebdriverIOは各結果をawaitし、`false`の場合にのみ読み込みまたは構築を無効にします。これらのチェックを持たないサービスは、既存の動作を維持します。フックを含む、すでに構築済みのサービスオブジェクトは変更されません。

いずれかのチェックがthrowまたはrejectした場合、サービスの初期化は、そのサービスを特定するエラーとともに失敗します。これは、以下で説明するサービスフックからスローされたエラーとは異なります。

## サービスのエラー処理

サービスフック中にスローされたErrorはログに記録され、ランナーは続行されます。サービス内のフックがテストランナーのセットアップまたはティアダウンにとって重要な場合は、`webdriverio`パッケージから公開されている`SevereServiceError`を使用してランナーを停止できます。

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: すべてのワーカーが起動する前のセットアップに不可欠な処理

        throw new SevereServiceError('Something went wrong.')
    }

    // カスタムサービスメソッド ...
}
```

## モジュールからサービスをインポートする

このサービスを使用するために必要なのは、`services`プロパティに割り当てることだけです。

`wdio.conf.js`ファイルを次のように変更します：

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * インポートしたサービスクラスを使用
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * サービスへの絶対パスを使用
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## NPMでサービスを公開する

WebdriverIOコミュニティがサービスをより簡単に利用・発見できるように、次の推奨事項に従ってください：

* サービスは次の命名規則を使用してください：`wdio-*-service`
* NPMキーワードを使用してください：`wdio-plugin`、`wdio-service`
* `main`エントリはサービスのインスタンスを`export`する必要があります
* サービスの例：[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

推奨される命名パターンに従うことで、サービスを名前で追加できるようになります：

```js
// wdio-custom-serviceを追加
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### 公開したサービスをWDIO CLIとドキュメントに追加する

他の人がより良いテストを実行するのに役立つ新しいプラグインはどれも大歓迎です！そのようなプラグインを作成した場合は、見つけやすくするために、CLIとドキュメントへの追加をご検討ください。

次の変更を含むプルリクエストを作成してください：

- CLIモジュールの[サポートされているサービス](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128))のリストにサービスを追加する
- 公式Webdriver.ioページにドキュメントを追加するために[サービスリスト](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json)を拡充する