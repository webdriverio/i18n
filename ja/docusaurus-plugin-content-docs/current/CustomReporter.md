---
id: customreporter
title: カスタムレポーター
---

WebdriverIOテストランナー用のカスタムレポーターを作成して、ニーズに合わせることができます。そして、それは簡単です！

必要なのは、`@wdio/reporter`パッケージを継承するNodeモジュールを作成して、テストからのメッセージを受信できるようにすることだけです。

基本的なセットアップは次のようになります：

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

このレポーターを使用するには、設定ファイルの`reporter`プロパティに割り当てるだけです。

`wdio.conf.js`ファイルは次のようになります：

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

レポーターをNPMに公開することもできます。パッケージ名は他のレポーターと同様に`wdio-<reportername>-reporter`とし、`wdio`や`wdio-reporter`などのキーワードでタグ付けしてください。

## イベントハンドラー

テスト中にトリガーされるいくつかのイベントに対してイベントハンドラーを登録できます。以下のすべてのハンドラーは、現在の状態と進行状況に関する有用な情報を含むペイロードを受け取ります。

これらのペイロードオブジェクトの構造はイベントによって異なりますが、フレームワーク（Mocha、Jasmine、およびCucumber）間で統一されています。カスタムレポーターを実装すると、すべてのフレームワークで動作するはずです。

以下のリストには、レポータークラスに追加できるすべての可能なメソッドが含まれています：

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

メソッド名は非常にわかりやすいです。

特定のイベントで何かを出力するには、親クラス`WDIOReporter`から提供される`this.write(...)`メソッドを使用します。これはコンテンツを`stdout`またはログファイル（レポーターのオプションによる）にストリーミングします。

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

テスト実行を遅らせることはできないことに注意してください。

すべてのイベントハンドラーは同期的なルーチンを実行する必要があります（そうしないと競合状態が発生します）。

[サンプルセクション](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio)をチェックして、各イベントのイベント名を出力するカスタムレポーターの例を見てください。

コミュニティにとって有用なカスタムレポーターを実装した場合は、プルリクエストを作成して、そのレポーターを公開できるようにすることを躊躇しないでください！

また、`Launcher`インターフェイスを介してWDIOテストランナーを実行する場合、次のようにカスタムレポーターを関数として適用することはできません：

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## `isSynchronised`まで待機

レポーターがデータを報告するために非同期操作を実行する必要がある場合（例：ログファイルやその他のアセットのアップロード）、WebdriverIOランナーがすべての計算が完了するまで待機させるために、カスタムレポーターの`isSynchronised`メソッドをオーバーライドできます。この例は[`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts)で見ることができます：

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

このようにして、ランナーはすべてのログ情報がアップロードされるまで待機します。

## レポーターをNPMに公開する

WebdriverIOコミュニティがレポーターを簡単に利用して発見できるようにするには、以下の推奨事項に従ってください：

* サービスはこの命名規則を使用すべきです：`wdio-*-reporter`
* NPMキーワードを使用してください：`wdio-plugin`、`wdio-reporter`
* `main`エントリはレポーターのインスタンスを`export`する必要があります
* レポーターの例：[`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

推奨の命名パターンに従うことで、サービスを名前で追加できるようになります：

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### 公開したサービスをWDIO CLIとドキュメントに追加する

より良いテストを実行するのに役立つ新しいプラグインを高く評価しています！そのようなプラグインを作成した場合は、CLIとドキュメントに追加して、見つけやすくすることを検討してください。

以下の変更を加えたプルリクエストを作成してください：

- CLIモジュールの[サポートされているレポーターのリスト](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)にサービスを追加する
- 公式Webdriver.ioページにドキュメントを追加するために[レポーターリスト](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json)を拡張する