---
id: organizingsuites
title: テストスイートの整理
---

プロジェクトが成長するにつれて、必然的に多くの統合テストが追加されます。これにより、ビルド時間が増加し、生産性が低下します。

これを防ぐために、テストを並行して実行する必要があります。WebdriverIOは既に各スペック（またはCucumberの_フィーチャーファイル_）を単一セッション内で並行してテストします。一般的に、スペックファイルごとに1つの機能だけをテストするよう努めてください。一つのファイルに多すぎるテストや少なすぎるテストは避けましょう。（ただし、これに関する黄金律はありません。）

テストが複数のスペックファイルを持つようになったら、テストを同時に実行し始めるべきです。そのためには、設定ファイル内の`maxInstances`プロパティを調整します。WebdriverIOを使用すると、ファイルやテストの数に関係なく、すべてを並行して実行できる最大の同時実行性でテストを実行できます。（これはまだ、コンピュータのCPU、同時実行の制限などの特定の制限の対象となります。）

> たとえば、3つの異なる機能（Chrome、Firefox、およびSafari）があり、`maxInstances`を`1`に設定した場合、WDIOテストランナーは3つのプロセスを生成します。したがって、10個のスペックファイルがあり、`maxInstances`を`10`に設定すると、_すべての_スペックファイルが同時にテストされ、30のプロセスが生成されます。

すべてのブラウザに対して属性を設定するために、`maxInstances`プロパティをグローバルに定義できます。

独自のWebDriverグリッドを実行している場合、あるブラウザに対して他のブラウザよりも多くの容量がある場合があります。その場合、機能オブジェクト内で`maxInstances`を_制限_できます：

```js
// wdio.conf.js
export const config = {
    // ...
    // すべてのブラウザに対してmaxInstanceを設定
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstancesは機能ごとに上書きできます。したがって、社内のWebDriverグリッドに
        // 5つのfirefoxインスタンスしか利用できない場合、一度に5つ以上のインスタンスが
        // 開始されないようにすることができます。
        browserName: 'chrome'
    }],
    // ...
}
```

## メイン設定ファイルから継承する

テストスイートを複数の環境（例：開発環境と統合環境）で実行する場合、複数の設定ファイルを使用して管理を容易にすることができます。

[ページオブジェクトの概念](pageobjects)と同様に、最初に必要なのはメイン設定ファイルです。これには、環境間で共有するすべての設定が含まれています。

次に、各環境用の別の設定ファイルを作成し、メイン設定を環境固有のものと補完します：

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// メイン設定ファイルをデフォルトとして持ちながら、環境固有の情報を上書きする
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // より多くの機能がここで定義されています
        // ...
    ],

    // ローカルではなくsauceでテストを実行する
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// 追加のレポーターを追加
config.reporters.push('allure')
```

## テストスペックをスイートにグループ化する

テストスペックをスイートにグループ化し、すべてではなく特定のスイートのみを実行することができます。

まず、WDIO設定でスイートを定義します：

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

これで、単一のスイートのみを実行したい場合は、CLIの引数としてスイート名を渡すことができます：

```sh
wdio wdio.conf.js --suite login
```

または、一度に複数のスイートを実行します：

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## テストスペックを順次実行するためにグループ化する

上述のように、テストを同時に実行することには利点があります。ただし、テストを一緒にグループ化して単一のインスタンスで順次実行することが有益な場合もあります。その例としては、コードのトランスパイルやクラウドインスタンスのプロビジョニングなど、大きなセットアップコストがかかる場合が主ですが、この機能から恩恵を受ける高度な使用モデルもあります。

テストを単一のインスタンスで実行するためにグループ化するには、specs定義内で配列として定義します。

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

上記の例では、'test_login.js'、'test_product_order.js'、'test_checkout.js'のテストは単一のインスタンスで順次実行され、「test_b*」の各テストは個別のインスタンスで同時に実行されます。

スイートで定義されたスペックをグループ化することも可能です。したがって、スイートをこのように定義することもできます：

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

この場合、「end2end」スイートのすべてのテストは単一のインスタンスで実行されます。

パターンを使用してテストを順次実行する場合、スペックファイルはアルファベット順に実行されます。

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

場合によっては、スイートの単一のテスト（またはテストのサブセット）のみを実行したい場合があります。

`--spec`パラメータを使用して、実行する_スイート_（Mocha、Jasmine）または_フィーチャー_（Cucumber）を指定できます。パスは現在の作業ディレクトリから相対的に解決されます。

例えば、ログインテストのみを実行するには：

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

または、一度に複数のスペックを実行します：

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

`--spec`の値が特定のスペックファイルを指していない場合、代わりに構成で定義されたスペックファイル名をフィルタリングするために使用されます。

スペックファイル名に「dialog」という単語を含むすべてのスペックを実行するには、以下のようにします：

```sh
wdio wdio.conf.js --spec dialog
```

各テストファイルは単一のテストランナープロセスで実行されていることに注意してください。事前にファイルをスキャンしていないため（`wdio`へのファイル名のパイピングについては次のセクションを参照）、スペックファイルの先頭で（例えば）`describe.only`を使用してMochaにそのスイートのみを実行するように指示することは_できません_。

この機能は同じ目標を達成するのに役立ちます。

`--spec`オプションが提供されると、configまたはcapabilityレベルの`specs`パラメータで定義されたパターンが上書きされます。

## 選択したテストを除外する

必要に応じて、特定のスペックファイルを実行から除外する必要がある場合は、`--exclude`パラメータ（Mocha、Jasmine）またはフィーチャー（Cucumber）を使用できます。

例えば、テスト実行からログインテストを除外するには：

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

または、複数のスペックファイルを除外します：

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

または、スイートを使用してフィルタリングする際にスペックファイルを除外します：

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

`--exclude`の値が特定のスペックファイルを指していない場合、代わりに構成で定義されたスペックファイル名をフィルタリングするために使用されます。

スペックファイル名に「dialog」という単語を含むすべてのスペックを除外するには、以下のようにします：

```sh
wdio wdio.conf.js --exclude dialog
```

`--exclude`オプションが提供されると、configまたはcapabilityレベルの`exclude`パラメータで定義されたパターンが上書きされます。

## スイートとテストスペックを実行する

個々のスペックと一緒に全体のスイートを実行します。

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## 複数の特定のテストスペックを実行する

継続的な統合の文脈やその他の状況で、実行する複数のスペックセットを指定する必要がある場合があります。WebdriverIOの`wdio`コマンドラインユーティリティは、（`find`、`grep`、または他のコマンドからの）パイプ入力されたファイル名を受け入れます。

パイプ入力されたファイル名は、構成の`spec`リストで指定されたグロブまたはファイル名のリストを上書きします。

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**注意：** これは単一のスペックを実行するための`--spec`フラグを上書き_しません_。_

## MochaOptsで特定のテストを実行する

wdio CLIにmocha固有の引数：`--mochaOpts.grep`を渡すことで、実行したい特定の`suite|describe`および/または`it|test`をフィルタリングすることもできます。

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**注意：** Mochaは、WDIOテストランナーがインスタンスを作成した後にテストをフィルタリングするため、いくつかのインスタンスが生成されても実際には実行されないことがあります。_

## MochaOptsで特定のテストを除外する

wdio CLIにmocha固有の引数：`--mochaOpts.invert`を渡すことで、除外したい特定の`suite|describe`および/または`it|test`をフィルタリングすることもできます。`--mochaOpts.invert`は`--mochaOpts.grep`の逆の動作を行います。

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**注意：** Mochaは、WDIOテストランナーがインスタンスを作成した後にテストをフィルタリングするため、いくつかのインスタンスが生成されても実際には実行されないことがあります。_

## 失敗後のテスト停止

`bail`オプションを使用すると、任意のテストが失敗した後にテストを停止するようWebdriverIOに指示できます。

これは、ビルドが失敗することがすでにわかっているが、完全なテスト実行の長い待ち時間を避けたい大規模なテストスイートの場合に役立ちます。

`bail`オプションは数値を期待し、WebDriverが全体のテスト実行を停止する前に発生できるテスト失敗の数を指定します。デフォルトは`0`で、これは常に見つけられるすべてのテストスペックを実行することを意味します。

bail設定に関する追加情報については、[オプションページ](configuration)を参照してください。

## 実行オプションの階層

実行するスペックを宣言する際、どのパターンが優先されるかを定義する一定の階層があります。現在、これは最高優先度から最低優先度へ次のように機能します：

> CLI `--spec`引数 > capability `specs`パターン > config `specs`パターン
> CLI `--exclude`引数 > config `exclude`パターン > capability `exclude`パターン

configパラメータのみが与えられた場合、すべての機能に使用されます。ただし、capabilityレベルでパターンを定義すると、configパターンの代わりにそれが使用されます。最後に、コマンドラインで定義されたスペックパターンは、他のすべてのパターンを上書きします。

### capability定義のスペックパターンの使用

capabilityレベルでスペックパターンを定義すると、configレベルで定義されたパターンが上書きされます。これは、異なるデバイス機能に基づいてテストを分離する必要がある場合に役立ちます。このような場合、configレベルで一般的なスペックパターンを使用し、capabilityレベルでより具体的なパターンを使用する方が有用です。

例えば、Androidテスト用とiOSテスト用の2つのディレクトリがあるとしましょう。

設定ファイルでは、非特定のデバイステスト用にパターンを次のように定義できます：

```js
{
    specs: ['tests/general/**/*.js']
}
```

しかし、AndroidとiOSデバイス用に異なる機能を持ち、パターンは次のようになります：

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

これら両方の機能を設定ファイルに必要とする場合、Androidデバイスは「android」名前空間下のテストのみを実行し、iOSテストは「ios」名前空間下のテストのみを実行します！

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //configレベルのスペックが使用されます
        }
    ]
}
```