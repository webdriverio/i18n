---
id: customservices
title: カスタムサービス
---

WDIOテストランナーのために、あなたのニーズに合わせたカスタムサービスを作成することができます。

サービスはテストを簡素化し、テストスイートを管理し、結果を統合するために作成された再利用可能なロジックのアドオンです。サービスは`wdio.conf.js`で利用可能なすべての同じ[フック](/docs/configurationfile)にアクセスできます。

定義できるサービスには2種類あります：テスト実行ごとに一度だけ実行される`onPrepare`、`onWorkerStart`、`onWorkerEnd`、`onComplete`フックにのみアクセスできるランチャーサービスと、他のすべてのフックにアクセスでき、各ワーカーに対して実行されるワーカーサービスです。ワーカーサービスは異なる（ワーカー）プロセスで実行されるため、両方のタイプのサービス間で（グローバル）変数を共有することはできないことに注意してください。

ランチャーサービスは次のように定義できます：

```js
export default class CustomLauncherService {
    // フックがプロミスを返す場合、WebdriverIOはそのプロミスが解決されるまで待機します。
    async onPrepare(config, capabilities) {
        // TODO: すべてのワーカーが起動する前に何かを実行
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: ワーカーがシャットダウンした後に何かを実行
    }

    // カスタムサービスメソッド ...
}
```

一方、ワーカーサービスは次のようになります：

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions`にはサービス固有のすべてのオプションが含まれています
     * 例えば、次のように定義されている場合：
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * `serviceOptions`パラメータは：`{ foo: 'bar' }`となります
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * このブラウザオブジェクトは初めてここに渡されます
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: すべてのテストが実行される前に何かを実行、例：
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: すべてのテストが実行された後に何かを実行
    }

    beforeTest(test, context) {
        // TODO: 各Mocha/Jasmineテスト実行前に何かを実行
    }

    beforeScenario(test, context) {
        // TODO: 各Cucumberシナリオ実行前に何かを実行
    }

    // その他のフックやカスタムサービスメソッド...
}
```

コンストラクタで渡されたパラメータを通じてブラウザオブジェクトを保存することをお勧めします。最後に、両方のタイプのワーカーを次のように公開します：

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

サービスフック中にスローされたエラーはログに記録され、ランナーは継続されます。サービス内のフックがテストランナーのセットアップやティアダウンに不可欠である場合、`webdriverio`パッケージから公開されている`SevereServiceError`を使用してランナーを停止できます。

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: すべてのワーカーが起動する前のセットアップに不可欠な何か

        throw new SevereServiceError('何かが間違っています。')
    }

    // カスタムサービスメソッド...
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

## NPMでのサービスの公開

WebdriverIOコミュニティがサービスを簡単に利用・発見できるようにするために、以下の推奨事項に従ってください：

* サービスは次の命名規則を使用すべきです：`wdio-*-service`
* NPMキーワードを使用する：`wdio-plugin`、`wdio-service`
* `main`エントリーはサービスのインスタンスを`export`すべきです
* サービスの例：[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

推奨される命名パターンに従うことで、サービスを名前で追加できます：

```js
// wdio-custom-serviceを追加
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### 公開されたサービスをWDIO CLIとドキュメントに追加する

より良いテストの実行に役立つ新しいプラグインを高く評価しています！そのようなプラグインを作成した場合は、それを私たちのCLIとドキュメントに追加して、見つけやすくすることを検討してください。

以下の変更を含むプルリクエストを作成してください：

- CLIモジュールの[サポートされているサービスのリスト](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)にあなたのサービスを追加する
- 公式Webdriver.ioページにドキュメントを追加するための[サービスリスト](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json)を拡張する