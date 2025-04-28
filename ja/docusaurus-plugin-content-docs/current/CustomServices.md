---
id: customservices
title: カスタムサービス
---

WDIOテストランナー用の独自のカスタムサービスを作成して、ニーズに合わせてカスタマイズすることができます。

サービスはテストを簡素化し、テストスイートを管理し、結果を統合するために作成された再利用可能なロジックのアドオンです。サービスは`wdio.conf.js`で利用可能なすべての同じ[フック](/docs/configurationfile)にアクセスできます。

定義できるサービスには2種類あります：テスト実行ごとに一度だけ実行される`onPrepare`、`onWorkerStart`、`onWorkerEnd`、`onComplete`フックにアクセスできるランチャーサービスと、他のすべてのフックにアクセスでき、各ワーカーごとに実行されるワーカーサービスです。ワーカーサービスは異なる（ワーカー）プロセスで実行されるため、両方のタイプのサービス間で（グローバル）変数を共有することはできません。

ランチャーサービスは次のように定義できます：

```js
export default class CustomLauncherService {
    // フックがプロミスを返す場合、WebdriverIOはそのプロミスが解決されるまで待機します。
    async onPrepare(config, capabilities) {
        // TODO: すべてのワーカーが起動する前に何かを行う
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: ワーカーがシャットダウンした後に何かを行う
    }

    // カスタムサービスメソッド ...
}
```

一方、ワーカーサービスは次のようになります：

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions`にはサービス固有のすべてのオプションが含まれています
     * 例えば、次のように定義された場合：
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * `serviceOptions`パラメータは `{ foo: 'bar' }` となります
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * このブラウザオブジェクトはここで初めて渡されます
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: すべてのテスト実行前に何かを行う、例：
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: すべてのテスト実行後に何かを行う
    }

    beforeTest(test, context) {
        // TODO: 各Mocha/Jasmineテスト実行前に何かを行う
    }

    beforeScenario(test, context) {
        // TODO: 各Cucumberシナリオ実行前に何かを行う
    }

    // その他のフックやカスタムサービスメソッド ...
}
```

コンストラクタに渡されたパラメータを通じてブラウザオブジェクトを保存することをお勧めします。最後に、両方のタイプのワーカーを次のように公開します：

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

TypeScriptを使用していて、フックメソッドのパラメータが型安全であることを確認したい場合は、サービスクラスを次のように定義できます：

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

## サービスのエラーハンドリング

サービスフック中にエラーがスローされると、ランナーは継続しながらそれがログに記録されます。サービスのフックがテストランナーのセットアップやティアダウンに重要である場合、`webdriverio`パッケージから公開されている`SevereServiceError`を使用してランナーを停止できます。

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: すべてのワーカー起動前のセットアップに重要な何か

        throw new SevereServiceError('何か問題が発生しました。')
    }

    // カスタムサービスメソッド ...
}
```

## モジュールからサービスをインポート

このサービスを使用するために必要なことは、それを`services`プロパティに割り当てることだけです。

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

WebdriverIOコミュニティがサービスを簡単に使用し、発見できるようにするには、次の推奨事項に従ってください：

* サービスは次の命名規則を使用する必要があります：`wdio-*-service`
* NPMキーワードを使用：`wdio-plugin`、`wdio-service`
* `main`エントリはサービスのインスタンスを`export`する必要があります
* サービス例：[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

推奨される命名パターンに従うことで、サービスを名前で追加できます：

```js
// wdio-custom-serviceを追加
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### 公開したサービスをWDIO CLIとドキュメントに追加する

他の人がより良いテストを実行するのに役立つ新しいプラグインを本当に高く評価しています！そのようなプラグインを作成した場合は、より見つけやすくするために、CLIとドキュメントに追加することを検討してください。

以下の変更を含むプルリクエストを送信してください：

- CLIモジュールの[サポートされているサービスのリスト](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)にあなたのサービスを追加する
- 公式Webdriver.ioページにドキュメントを追加するために[サービスリスト](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json)を拡張する