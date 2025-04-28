---
id: customreporter
title: カスタムレポーター
---

WDIOテストランナー用に、あなたのニーズに合わせたカスタムレポーターを作成することができます。そして、それは簡単です！

必要なのは、`@wdio/reporter`パッケージを継承するノードモジュールを作成して、テストからメッセージを受け取れるようにすることだけです。

基本的なセットアップは次のようになります：

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * デフォルトで出力ストリームに書き込むようにレポーターを設定する
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

このレポーターを使用するには、設定の`reporter`プロパティに割り当てるだけです。

あなたの`wdio.conf.js`ファイルは次のようになるはずです：

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * インポートしたレポータークラスを使用
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * レポーターへの絶対パスを使用
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

レポーターをNPMに公開して、誰もが使えるようにすることもできます。パッケージ名は他のレポーターと同様に`wdio-<reportername>-reporter`のようにし、`wdio`や`wdio-reporter`などのキーワードでタグ付けしてください。

## イベントハンドラー

テスト中に発生するいくつかのイベントに対してイベントハンドラーを登録できます。以下のすべてのハンドラーは、現在の状態と進行状況に関する有用な情報を含むペイロードを受け取ります。

これらのペイロードオブジェクトの構造はイベントによって異なりますが、フレームワーク（Mocha、Jasmine、Cucumber）間で統一されています。カスタムレポーターを実装すると、すべてのフレームワークで動作するはずです。

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

メソッド名はかなり自明です。

特定のイベントで何かを出力するには、親クラス`WDIOReporter`によって提供される`this.write(...)`メソッドを使用してください。これは内容を`stdout`またはログファイル（レポーターのオプションによる）にストリーミングします。

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

テスト実行を遅らせることはできないことに注意してください。

すべてのイベントハンドラは同期的なルーチンを実行する必要があります（そうしないと競合状態に陥る可能性があります）。

[サンプルセクション](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio)をぜひ確認してください。そこには各イベントのイベント名を出力するカスタムレポーターの例があります。

コミュニティにとって有用なカスタムレポーターを実装した場合は、ぜひプルリクエストを送ってください。そうすれば、そのレポーターを一般に公開することができます！

また、`Launcher`インターフェースを介してWDIO testrunnerを実行する場合、次のようにカスタムレポーターを関数として適用することはできません：

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // これは動作しません、CustomReporterはシリアライズできないため
    reporters: ['dot', CustomReporter]
})
```

## `isSynchronised`までの待機

レポーターがデータを報告するために非同期操作を実行する必要がある場合（例：ログファイルやその他のアセットのアップロード）、カスタムレポーターの`isSynchronised`メソッドをオーバーライドして、すべての処理が完了するまでWebdriverIOランナーを待機させることができます。この例は[`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts)で見ることができます：

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * isSynchronisedメソッドをオーバーライド
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * ログファイルを同期
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
             * 転送されたログをログバケットから削除
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

これにより、ランナーはすべてのログ情報がアップロードされるまで待機します。

## レポーターをNPMで公開する

WebdriverIOコミュニティがレポーターを簡単に利用して発見できるようにするために、以下の推奨事項に従ってください：

* サービスは次の命名規則を使用する必要があります：`wdio-*-reporter`
* NPMキーワードを使用する：`wdio-plugin`、`wdio-reporter`
* `main`エントリはレポーターのインスタンスを`export`する必要があります
* レポーターの例：[`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

推奨される命名パターンに従うことで、名前でサービスを追加できます：

```js
// wdio-custom-reporterを追加
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### 公開されたサービスをWDIO CLIとドキュメントに追加する

他の人がより良いテストを実行するのに役立つ新しいプラグインを高く評価しています！そのようなプラグインを作成した場合は、見つけやすくするために、CLIとドキュメントに追加することを検討してください。

以下の変更を含むプルリクエストを作成してください：

- CLIモジュールの[サポートされているレポーターのリスト](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)にサービスを追加する
- 公式Webdriver.ioページにドキュメントを追加するために[レポーターリスト](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json)を拡張する