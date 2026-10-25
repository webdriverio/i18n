---
id: customreporter
title: カスタムレポーター
description: "@wdio/reporter をベースに WDIO テストランナー用のカスタムレポーターを構築し、ランナーイベントを処理して NPM に公開します。"
---

WDIO テストランナー向けに、ニーズに合わせた独自のカスタムレポーターを作成できます。しかも簡単です！

必要なのは、`@wdio/reporter` パッケージを継承する Node モジュールを作成することだけです。これにより、テストからメッセージを受け取れるようになります。

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

レポーターを NPM に公開して、誰でも使えるようにすることもできます。パッケージ名は他のレポーターと同様に `wdio-<reportername>-reporter` とし、`wdio` や `wdio-reporter` などのキーワードでタグ付けしてください。

## イベントハンドラー

テスト中にトリガーされるさまざまなイベントに対してイベントハンドラーを登録できます。以下のすべてのハンドラーは、現在の状態と進行状況に関する有用な情報を含むペイロードを受け取ります。

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
    onContextEnd() {} // 実験的機能、「レポーターと並列テスト」を参照
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

メソッド名を見れば、その内容はほぼ明らかです。

特定のイベントで何かを出力するには、親クラス `WDIOReporter` が提供する `this.write(...)` メソッドを使用します。このメソッドは、コンテンツを `stdout` またはログファイルにストリーミングします（レポーターのオプションによって異なります）。

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

テストの実行を何らかの方法で遅延させることはできない点に注意してください。

すべてのイベントハンドラーは同期的な処理を実行する必要があります（そうしないと競合状態が発生します）。

各イベントのイベント名を出力するカスタムレポーターの例が掲載されている[サンプルセクション](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio)もぜひご確認ください。

コミュニティにとって有用なカスタムレポーターを実装した場合は、遠慮なくプルリクエストを作成してください。そのレポーターを一般公開できるようにします！

また、`Launcher` インターフェースを介して WDIO テストランナーを実行する場合、次のようにカスタムレポーターを関数として適用することはできません：

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // CustomReporter はシリアライズできないため、これは動作しません
    reporters: ['dot', CustomReporter]
})
```

## レポーターと並列テスト

[スペックファイル内の並列テスト](./ParallelTests.md)では、1つのスペックファイルのテストが重なり合います。あるテストの `onTestStart` が別のテストの `onTestEnd` より前に来ることがあり、異なるテストのコマンドが交互に実行されます。`WDIOReporter` はこれを処理してくれます。並列モードでは、フレームワークイベントに2つの追加フィールドが含まれます：

- `suite:start`、`hook:start`、`test:start` の `parentUid`：所属するスイートの uid（トップレベルのスイートの場合は `null`）。レポーターは、スイート、フック、テストを、最後に開始されたスイートではなく、このスイートに追加します。
- テストイベントとコマンドイベントの `contextId`：テストのブラウジングコンテキスト。レポーターは、そのコンテキストで実行されたテストにコマンドの出力を追加します。

イベントにこれらのフィールドがある場合、テスト、フック、スイートの統計情報にもそれらが保持されます。`onTestEnd(test)` では、`test.contextId` がテストのブラウジングコンテキスト、`test.parentUid` がそのスイートの uid になります。並列モードでない場合、統計情報にはこれらのプロパティはありません。

そのため、レポーターの `suites`、`tests`、`hooks` ツリーは正しい状態になります。レポーターが独自の状態を保持する場合は、単一の現在のテストを追跡するのではなく、テストやスイートの `uid` をキーにしてください。

コンソール出力やカスタムの `process.emit` イベントなど、イベントを伴わない出力には `uid` がありません。`this.getContextTest()` を呼び出すと、その出力を書き込んだブラウジングコンテキストのテストを取得できます。並列モードでは、そのコンテキストで最後に開始されたテストを返します。これは `test:end` の後、つまりその `afterEach` や `after` フックが実行されるときにも同様です。そのコンテキストでテストが開始されていない場合や `context:end` の後は `undefined` を返します。並列モードでない場合は、最後に開始されたテストを返します。並列テストの `before()` フックは `test:start` の前に実行されるため、その時点ではまだどのテストもコンテキストを所有していません。`this.getContextId()` は生のコンテキスト ID を返し、これはテスト全体を通じて同じままです。

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestStart(test) {
        this.write(`start ${test.uid} ${test.title}\n`)
    }
    onTestEnd(test) {
        this.write(`end   ${test.uid} ${test.state}\n`)
    }
}
```

並列テストの `afterEach` および `after` フックは、その `test:end` の後に実行されます。コンテキストがいつ完了したかを知るには、`onContextEnd(payload)` を使用します。これはテストの最後のフックの後に呼び出され、その後コンテキストはイベントを送信しません。ペイロードには `cid`、`specs`、`uid`（コンテキストの最後のテスト）、`contextId` が含まれます。レポーターがそのコンテキストのために保持しているものは、ここでクローズまたは書き出してください。

:::warning 実験的機能

`context:end` と `onContextEnd` は実験的機能です。現時点では Mocha の `parallelMode` のみがこれらを送信し、名前やペイロードは変更される可能性があります。

:::

## `isSynchronised` まで待機する

レポーターがデータをレポートするために非同期処理（ログファイルやその他のアセットのアップロードなど）を実行する必要がある場合、カスタムレポーターで `isSynchronised` メソッドを上書きすることで、すべての処理が完了するまで WebdriverIO ランナーを待機させることができます。この例は [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) で確認できます：

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * isSynchronised メソッドを上書きする
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

## レポーターを NPM に公開する

WebdriverIO コミュニティがレポーターを使いやすく、見つけやすくするために、以下の推奨事項に従ってください：

* サービスは次の命名規則を使用してください：`wdio-*-reporter`
* NPM キーワードを使用してください：`wdio-plugin`、`wdio-reporter`
* `main` エントリーはレポーターのインスタンスを `export` する必要があります
* レポーターの例：[`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

推奨される命名パターンに従うと、名前でサービスを追加できるようになります：

```js
// wdio-custom-reporter を追加
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### 公開したサービスを WDIO CLI とドキュメントに追加する

他の人がより良いテストを実行するのに役立つ新しいプラグインはどれも大歓迎です！そのようなプラグインを作成した場合は、見つけやすくするために、CLI とドキュメントへの追加をご検討ください。

以下の変更を含むプルリクエストを作成してください：

- CLI モジュールの[サポートされているレポーター](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91))のリストにサービスを追加する
- 公式の Webdriver.io ページにドキュメントを追加するために、[レポーターリスト](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json)を拡張する