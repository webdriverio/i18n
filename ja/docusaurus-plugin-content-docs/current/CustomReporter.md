---
id: customreporter
title: カスタムレポーター
description: "@wdio/reporter をベースに WDIO テストランナー用のカスタムレポーターを構築し、ランナーイベントを処理して NPM で公開します。"
---

WDIO テストランナー用に、ニーズに合わせたカスタムレポーターを独自に作成できます。しかも簡単です！

必要なのは、`@wdio/reporter` パッケージを継承する node モジュールを作成することだけです。これにより、テストからメッセージを受け取れるようになります。

基本的なセットアップは次のようになります：

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * デフォルトでレポーターが出力ストリームに書き込むようにする
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

このレポーターを使用するには、設定の `reporter` プロパティに割り当てるだけです。


`wdio.conf.js` ファイルは次のようになります：

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * インポートしたレポータークラスを使用する
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * レポーターへの絶対パスを使用する
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

レポーターを NPM で公開して、誰でも使えるようにすることもできます。パッケージ名は他のレポーターと同様に `wdio-<reportername>-reporter` とし、`wdio` や `wdio-reporter` などのキーワードでタグ付けしてください。

## Event Handler

テスト中にトリガーされるさまざまなイベントに対して、イベントハンドラーを登録できます。以下のすべてのハンドラーは、現在の状態や進行状況に関する有用な情報を含むペイロードを受け取ります。

これらのペイロードオブジェクトの構造はイベントによって異なりますが、フレームワーク（Mocha、Jasmine、Cucumber）間で統一されています。カスタムレポーターを一度実装すれば、すべてのフレームワークで動作するはずです。

以下のリストには、レポータークラスに追加できるすべてのメソッドが含まれています：

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

メソッド名を見れば、その役割はほぼ明らかです。

特定のイベントで何かを出力するには、親クラスである `WDIOReporter` が提供する `this.write(...)` メソッドを使用します。このメソッドは、（レポーターのオプションに応じて）コンテンツを `stdout` またはログファイルにストリームします。

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

テストの実行をいかなる方法でも遅延させることはできない点に注意してください。

すべてのイベントハンドラーは同期的な処理を実行する必要があります（そうしないと競合状態が発生します）。

各イベントでイベント名を出力するカスタムレポーターの例が掲載されている[サンプルセクション](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio)もぜひご確認ください。

コミュニティにとって役立つカスタムレポーターを実装した場合は、遠慮なくプルリクエストを作成してください。そのレポーターを一般公開できるようにします！

また、`Launcher` インターフェースを介して WDIO テストランナーを実行する場合、次のようにカスタムレポーターを関数として適用することはできません：

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // CustomReporter はシリアライズできないため、これは動作しません
    reporters: ['dot', CustomReporter]
})
```

## `isSynchronised` まで待機する

レポーターがデータを報告するために非同期処理（例：ログファイルやその他のアセットのアップロード）を実行する必要がある場合、カスタムレポーターで `isSynchronised` メソッドをオーバーライドすることで、すべての処理が完了するまで WebdriverIO ランナーを待機させることができます。この例は [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) で確認できます：

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * isSynchronised メソッドをオーバーライドする
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * ログファイルを同期する
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
             * 転送済みのログをログバケットから削除する
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

これにより、ランナーはすべてのログ情報がアップロードされるまで待機します。

## NPM でレポーターを公開する

WebdriverIO コミュニティがレポーターを利用・発見しやすくするために、以下の推奨事項に従ってください：

* サービスは次の命名規則を使用してください：`wdio-*-reporter`
* NPM キーワードを使用してください：`wdio-plugin`、`wdio-reporter`
* `main` エントリーはレポーターのインスタンスを `export` する必要があります
* レポーターの例：[`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

推奨される命名パターンに従うことで、名前でサービスを追加できるようになります：

```js
// wdio-custom-reporter を追加
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### 公開したサービスを WDIO CLI とドキュメントに追加する

他の人がより良いテストを実行するのに役立つ新しいプラグインはどれも大歓迎です！そのようなプラグインを作成した場合は、見つけやすくするために CLI とドキュメントへの追加をご検討ください。

以下の変更を含むプルリクエストを作成してください：

- CLI モジュールの[サポートされているレポーター](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91))のリストにサービスを追加する
- 公式の Webdriver.io ページにドキュメントを追加するために、[レポーターリスト](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json)を拡張する