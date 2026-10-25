---
id: organizingsuites
title: テストスイートの整理
description: "設定ファイルの共有、specのスイートへのグループ化、specの順次実行、テストの包含・除外によって、増え続けるテストスイートを整理します。"
---

プロジェクトが大きくなるにつれ、必然的に統合テストはどんどん増えていきます。これによりビルド時間が長くなり、生産性が低下します。

これを防ぐには、テストを並列で実行する必要があります。WebdriverIO は、各 spec（Cucumber では _feature ファイル_）を単一のセッション内ですでに並列にテストしています。一般的に、1 つの spec ファイルでは単一の機能のみをテストするようにしてください。1 つのファイルに含めるテストが多すぎたり少なすぎたりしないようにしましょう。（ただし、これに関して絶対的なルールはありません。）

テストに複数の spec ファイルができたら、テストを並行して実行し始めるべきです。そのためには、設定ファイルの `maxInstances` プロパティを調整します。WebdriverIO では、最大の並行性でテストを実行できます。つまり、ファイルやテストがいくつあっても、すべてを並列で実行できるということです。（ただし、コンピューターの CPU や並行実行の制限など、一定の制約は受けます。）

> 例えば、3 つの異なる capabilities（Chrome、Firefox、Safari）があり、`maxInstances` を `1` に設定したとします。WDIO テストランナーは 3 つのプロセスを起動します。したがって、10 個の spec ファイルがあり、`maxInstances` を `10` に設定した場合、_すべての_ spec ファイルが同時にテストされ、30 個のプロセスが起動されます。

`maxInstances` プロパティをグローバルに定義して、すべてのブラウザーに対してこの属性を設定できます。

独自の WebDriver グリッドを運用している場合、（例えば）あるブラウザーの容量が他のブラウザーより多いことがあります。その場合は、capability オブジェクト内で `maxInstances` を _制限_ できます：

```js
// wdio.conf.js
export const config = {
    // ...
    // すべてのブラウザーに対して maxInstance を設定
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances は capability ごとに上書きできます。そのため、社内の WebDriver
        // グリッドで利用可能な firefox インスタンスが 5 つしかない場合でも、同時に
        // 5 つを超えるインスタンスが起動されないようにできます。
        browserName: 'chrome'
    }],
    // ...
}
```

1 つの spec ファイル *内* のテストも、それぞれ独自のブラウザーウィンドウで同時に実行するには、[Spec ファイル内の並列テスト](./ParallelTests.md)を参照してください。

## メイン設定ファイルからの継承

テストスイートを複数の環境（例：dev と integration）で実行する場合、複数の設定ファイルを使用すると管理しやすくなります。

[ページオブジェクトの概念](pageobjects)と同様に、まず必要になるのはメイン設定ファイルです。これには、環境間で共有するすべての設定が含まれます。

次に、環境ごとに別の設定ファイルを作成し、メイン設定を環境固有の設定で補完します：

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// メイン設定ファイルをデフォルトとし、環境固有の情報を上書きする
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // ここでさらに caps を定義
        // ...
    ],

    // ローカルではなく sauce でテストを実行
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// レポーターを追加
config.reporters.push('allure')
```

## テスト Spec をスイートにグループ化する

テスト spec をスイートにグループ化し、すべてではなく特定のスイートのみを実行できます。

まず、WDIO 設定でスイートを定義します：

```js
// wdio.conf.js
export const config = {
    // すべてのテストを定義
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // 特定のスイートを定義
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

これで、単一のスイートのみを実行したい場合は、スイート名を CLI 引数として渡せます：

```sh
wdio wdio.conf.js --suite login
```

または、複数のスイートを一度に実行することもできます：

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## テスト Spec をグループ化して順次実行する

前述のとおり、テストを並行して実行することには利点があります。しかし、テストをまとめて単一のインスタンスで順次実行した方が有益な場合もあります。その主な例は、コードのトランスパイルやクラウドインスタンスのプロビジョニングなど、セットアップコストが大きい場合ですが、この機能の恩恵を受ける高度な使用モデルもあります。

テストをグループ化して単一のインスタンスで実行するには、specs の定義内で配列として定義します。

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
上記の例では、テスト 'test_login.js'、'test_product_order.js'、'test_checkout.js' は単一のインスタンスで順次実行され、"test_b*" の各テストはそれぞれ個別のインスタンスで並行して実行されます。

スイートで定義された spec をグループ化することも可能なので、次のようにスイートを定義することもできます：
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
この場合、"end2end" スイートのすべてのテストが単一のインスタンスで実行されます。

パターンを使用してテストを順次実行する場合、spec ファイルはアルファベット順に実行されます

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

これにより、上記のパターンに一致するファイルが次の順序で実行されます：

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## 選択したテストを実行する

場合によっては、スイートのうち単一のテスト（またはテストのサブセット）のみを実行したいことがあります。

`--spec` パラメーターを使用すると、どの _suite_（Mocha、Jasmine）または _feature_（Cucumber）を実行するかを指定できます。パスは現在の作業ディレクトリからの相対パスとして解決されます。

例えば、ログインテストのみを実行するには：

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

または、複数の spec を一度に実行します：

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

`--spec` の値が特定の spec ファイルを指していない場合は、代わりに設定で定義された spec ファイル名のフィルタリングに使用されます。

spec ファイル名に "dialog" という単語を含むすべての spec を実行するには、次のようにします：

```sh
wdio wdio.conf.js --spec dialog
```

各テストファイルは単一のテストランナープロセスで実行されることに注意してください。事前にファイルをスキャンしないため（`wdio` へのファイル名のパイプについては次のセクションを参照）、spec ファイルの先頭で（例えば）`describe.only` を使用して、Mocha にそのスイートのみを実行するよう指示することは _できません_。

この機能を使えば、同じ目的を達成できます。

`--spec` オプションが指定された場合、設定の `specs` や capability の `wdio:specs` で定義されたパターンはすべて上書きされます。

## 選択したテストを除外する

必要に応じて、特定の spec ファイルを実行から除外したい場合は、`--exclude` パラメーター（Mocha、Jasmine）または feature（Cucumber）を使用できます。

例えば、ログインテストをテスト実行から除外するには：

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

または、複数の spec ファイルを除外します：

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

または、スイートを使用してフィルタリングする際に spec ファイルを除外します：

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

`--exclude` の値が特定の spec ファイルを指していない場合は、代わりに設定で定義された spec ファイル名のフィルタリングに使用されます。

spec ファイル名に "dialog" という単語を含むすべての spec を除外するには、次のようにします：

```sh
wdio wdio.conf.js --exclude dialog
```

### スイート全体を除外する

スイート名を指定してスイート全体を除外することもできます。除外値が設定で定義されたスイート名と一致し、かつファイルパスのように見えない場合、そのスイート全体がスキップされます：

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

これにより、`login` スイートは完全にスキップされ、`checkout` スイートのみが実行されます。

混在した除外（スイートと spec パターン）も期待どおりに動作します：

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

この例では、`signup` が定義済みのスイート名であれば、そのスイートが除外されます。パターン `dialog` は、ファイル名に "dialog" を含むすべての spec ファイルを除外します。

:::note
`--suite X` と `--exclude X` の両方を指定した場合、除外が優先され、スイート `X` は実行されません。
:::

`--exclude` オプションが指定された場合、設定の `exclude` や capability の `wdio:exclude` で定義されたパターンはすべて上書きされます。

## スイートとテスト Spec を実行する

スイート全体と個別の spec を合わせて実行します。

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## 複数の特定のテスト Spec を実行する

継続的インテグレーションなどの状況では、実行する spec の複数のセットを指定する必要が生じることがあります。WebdriverIO の `wdio` コマンドラインユーティリティは、（`find`、`grep` などから）パイプで渡されたファイル名を受け付けます。

パイプで渡されたファイル名は、設定の `spec` リストで指定された glob やファイル名のリストを上書きします。

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**注意：** これは単一の spec を実行するための `--spec` フラグを上書き_ しません _。_

## MochaOpts で特定のテストを実行する

mocha 固有の引数 `--mochaOpts.grep` を wdio CLI に渡すことで、実行したい特定の `suite|describe` や `it|test` をフィルタリングすることもできます。

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**注意：** Mocha は WDIO テストランナーがインスタンスを作成した後にテストをフィルタリングするため、複数のインスタンスが起動されても実際には実行されないことがあります。_

## MochaOpts で特定のテストを除外する

mocha 固有の引数 `--mochaOpts.invert` を wdio CLI に渡すことで、除外したい特定の `suite|describe` や `it|test` をフィルタリングすることもできます。`--mochaOpts.invert` は `--mochaOpts.grep` と逆の動作をします

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**注意：** Mocha は WDIO テストランナーがインスタンスを作成した後にテストをフィルタリングするため、複数のインスタンスが起動されても実際には実行されないことがあります。_

## 失敗後にテストを停止する

`bail` オプションを使用すると、いずれかのテストが失敗した後にテストを停止するよう WebdriverIO に指示できます。

これは、ビルドが失敗することがすでにわかっているものの、テスト全体の実行による長い待ち時間を避けたい大規模なテストスイートで役立ちます。

`bail` オプションには数値を指定します。これは、WebDriver がテスト実行全体を停止するまでに許容されるテスト失敗の数を指定します。デフォルトは `0` で、見つかったすべてのテスト spec を常に実行することを意味します。

bail 設定の詳細については、[オプションページ](configuration)を参照してください。
## 実行オプションの優先順位

実行する spec を宣言する際には、どのパターンが優先されるかを定める一定の優先順位があります。現在の仕組みは、優先度の高い順に次のとおりです：

> CLI `--spec` 引数 > capability `wdio:specs` > config `specs`
> CLI `--exclude` 引数 > config `exclude` > capability `wdio:exclude`

config パラメーターのみが指定されている場合は、すべての capabilities に対して使用されます。ただし、capability レベルでパターンを定義した場合は、config のパターンの代わりにそれが使用されます。最後に、コマンドラインで定義された spec パターンは、指定された他のすべてのパターンを上書きします。

### capability で定義された spec パターンを使用する

capability レベルで spec パターンを定義すると、config レベルで定義されたパターンはすべて上書きされます。これは、デバイスの capabilities の違いに基づいてテストを分ける必要がある場合に便利です。このような場合は、config レベルでは汎用的な spec パターンを使用し、capability レベルではより具体的なパターンを使用すると効果的です。

例えば、Android テスト用と iOS テスト用の 2 つのディレクトリがあるとします。

設定ファイルでは、デバイスに依存しないテスト用に次のようにパターンを定義できます：

```js
{
    specs: ['tests/general/**/*.js']
}
```

一方で、Android デバイスと iOS デバイスには異なる capabilities を用意し、パターンを次のようにできます：

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

設定ファイルでこれら両方の capabilities が必要な場合、Android デバイスは "android" 名前空間配下のテストのみを実行し、iOS は "ios" 名前空間配下のテストのみを実行します！

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config レベルの specs が使用されます
        }
    ]
}
```