---
id: organizingsuites
title: テストスイートの整理
---

プロジェクトが成長するにつれて、必然的に統合テストがどんどん追加されていきます。これによりビルド時間が増加し、生産性が低下します。

これを防ぐために、テストを並行して実行する必要があります。WebdriverIOは既に各スペック（またはCucumberの場合は_フィーチャーファイル_）を単一セッション内で並行してテストします。一般的には、1つのスペックファイルで単一の機能のみをテストするようにしましょう。1つのファイルに多すぎるテストや少なすぎるテストを入れないようにしましょう（ただし、これに関しては黄金律はありません）。

テストがいくつかのスペックファイルを持つようになったら、テストを同時に実行し始めるべきです。そのためには、設定ファイルの`maxInstances`プロパティを調整します。WebdriverIOでは、ファイルやテストがいくつあっても、すべて並行して実行できる最大同時実行性でテストを実行できます（ただし、コンピュータのCPU、同時実行の制限などの制約があります）。

> 例えば、3つの異なる機能（Chrome、Firefox、Safari）があり、`maxInstances`を`1`に設定した場合、WDIOテストランナーは3つのプロセスを生成します。したがって、10個のスペックファイルがあり、`maxInstances`を`10`に設定すると、_すべての_スペックファイルが同時にテストされ、30のプロセスが生成されます。

すべてのブラウザに対して属性を設定するために、`maxInstances`プロパティをグローバルに定義できます。

独自のWebDriverグリッドを実行している場合、あるブラウザが他のブラウザよりも多くの容量を持っているかもしれません。その場合、capability オブジェクトで`maxInstances`を_制限_することができます：

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
        // maxInstancesはcapabilityごとに上書きできます。したがって、社内のWebDriverグリッドに
        // 利用可能なfirefoxインスタンスが5つしかない場合、一度に5つ以上のインスタンスが
        // 起動されないようにすることができます。
        browserName: 'chrome'
    }],
    // ...
}
```

## メイン設定ファイルから継承する

複数の環境（例：開発環境と統合環境）でテストスイートを実行する場合、複数の設定ファイルを使用すると管理しやすくなります。

[ページオブジェクトの概念](pageobjects)と同様に、最初に必要なのはメイン設定ファイルです。これには環境間で共有するすべての設定が含まれています。

次に、各環境用の別の設定ファイルを作成し、メイン設定を環境固有のものと補完します：

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// デフォルトとしてメイン設定ファイルを持ちますが、環境固有の情報を上書きします
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // より多くのcapsがここで定義されます
        // ...
    ],

    // ローカルではなくSauce Labsでテストを実行
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// 追加のレポーターを追加
config.reporters.push('allure')
```

## スイートでテストスペックをグループ化する

テストスペックをスイートでグループ化し、すべてのスペックではなく特定のスイートのみを実行することができます。

まず、WDIOの設定でスイートを定義します：

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

これで、単一のスイートのみを実行したい場合は、スイート名をCLI引数として渡すことができます：

```sh
wdio wdio.conf.js --suite login
```

または、複数のスイートを一度に実行することもできます：

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## テストスペックをグループ化して順次実行する

上記のように、テストを同時に実行することにはメリットがあります。しかし、テストをグループ化して単一のインスタンスで順次実行することが有益なケースもあります。例えば、コードのトランスパイルやクラウドインスタンスのプロビジョニングなど、大きなセットアップコストがかかる場合や、この機能から恩恵を受ける高度な使用モデルもあります。

テストをグループ化して単一のインスタンスで実行するには、specs定義内で配列として定義します。

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
上記の例では、'test_login.js'、'test_product_order.js'、'test_checkout.js'のテストが単一のインスタンスで順番に実行され、各「test_b*」テストは個別のインスタンスで同時に実行されます。

スイートで定義されたスペックをグループ化することも可能なので、次のようにスイートを定義することもできます：
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
この場合、「end2end」スイートのすべてのテストが単一のインスタンスで実行されます。

パターンを使用してテストを順次実行する場合、スペックファイルはアルファベット順に実行されます

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

場合によっては、スイートの中の単一のテスト（またはテストのサブセット）のみを実行したいことがあります。

`--spec`パラメータを使用して、どの_スイート_（Mocha、Jasmine）または_フィーチャー_（Cucumber）を実行するかを指定できます。パスは現在の作業ディレクトリからの相対パスで解決されます。

例えば、ログインテストのみを実行するには：

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

または、複数のスペックを一度に実行することもできます：

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

`--spec`の値が特定のスペックファイルを指していない場合、設定で定義されたスペックファイル名をフィルタリングするために使用されます。

スペックファイル名に「dialog」という単語を含むすべてのスペックを実行するには、次のように使用できます：

```sh
wdio wdio.conf.js --spec dialog
```

各テストファイルは単一のテストランナープロセスで実行されていることに注意してください。事前にファイルをスキャンしないため（`wdio`へのファイル名のパイピングに関する次のセクションを参照）、例えば、スペックファイルの先頭で`describe.only`を使用してMochaにそのスイートのみを実行するように指示することは_できません_。

この機能は同じ目標を達成するのに役立ちます。

`--spec`オプションが提供されると、設定またはcapabilityレベルの`specs`パラメータで定義されたパターンは上書きされます。

## 選択したテストを除外する

必要に応じて、特定のスペックファイルを実行から除外する必要がある場合は、`--exclude`パラメータ（Mocha、Jasmine）またはフィーチャー（Cucumber）を使用できます。

例えば、テスト実行からログインテストを除外するには：

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

または、複数のスペックファイルを除外するには：

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

または、スイートを使用してフィルタリングする際にスペックファイルを除外するには：

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

`--exclude`の値が特定のスペックファイルを指していない場合、設定で定義されたスペックファイル名をフィルタリングするために使用されます。

スペックファイル名に「dialog」という単語を含むすべてのスペックを除外するには、次のように使用できます：

```sh
wdio wdio.conf.js --exclude dialog
```

`--exclude`オプションが提供されると、設定またはcapabilityレベルの`exclude`パラメータで定義されたパターンは上書きされます。

## スイートとテストスペックを実行する

個々のスペックと一緒に全体のスイートを実行します。

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## 複数の特定のテストスペックを実行する

継続的インテグレーションの文脈やその他の場面で、実行する複数のスペックセットを指定する必要があることがあります。WebdriverIOの`wdio`コマンドラインユーティリティは、パイプで送られるファイル名（`find`、`grep`、その他から）を受け入れます。

パイプで送られるファイル名は、設定の`spec`リストで指定されたグロブまたはファイル名のリストを上書きします。

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**注意:** これは単一のスペックを実行するための`--spec`フラグを上書き_しません_。_

## MochaOptsを使用して特定のテストを実行する

Mocha固有の引数：`--mochaOpts.grep`をwdio CLIに渡すことで、実行したい特定の`suite|describe`や`it|test`をフィルタリングすることもできます。

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**注意:** Mochaは、WDIOテストランナーがインスタンスを作成した後にテストをフィルタリングするため、複数のインスタンスが生成されているのに実際には実行されていないように見えることがあります。_

## MochaOptsを使用して特定のテストを除外する

Mocha固有の引数：`--mochaOpts.invert`をwdio CLIに渡すことで、除外したい特定の`suite|describe`や`it|test`をフィルタリングすることもできます。`--mochaOpts.invert`は`--mochaOpts.grep`の反対の動作を行います。

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**注意:** Mochaは、WDIOテストランナーがインスタンスを作成した後にテストをフィルタリングするため、複数のインスタンスが生成されているのに実際には実行されていないように見えることがあります。_

## 失敗後にテストを停止する

`bail`オプションを使用すると、テストが失敗した後にテストを停止するようにWebdriverIOに指示できます。

これは、ビルドが失敗することがすでにわかっている場合に、完全なテスト実行の長い待ち時間を避けたい大規模なテストスイートで役立ちます。

`bail`オプションは数値を期待し、WebDriverが全体のテスト実行を停止するまでに何回のテスト失敗が発生できるかを指定します。デフォルトは`0`で、これは常に見つけることができるすべてのテストスペックを実行することを意味します。

bail設定に関する追加情報については、[オプションページ](configuration)を参照してください。
## 実行オプションの階層

実行するスペックを宣言する際、どのパターンが優先されるかを定義する特定の階層があります。現在、最も優先度が高いものから低いものまで、次のように機能します：

> CLI `--spec`引数 > capability `specs`パターン > 設定 `specs`パターン
> CLI `--exclude`引数 > 設定 `exclude`パターン > capability `exclude`パターン

設定パラメータのみが指定されている場合、それはすべてのcapabilityに対して使用されます。ただし、パターンをcapabilityレベルで定義すると、設定パターンの代わりにそれが使用されます。最後に、コマンドラインで定義されたスペックパターンは、他のすべてのパターンを上書きします。

### capability定義のスペックパターンの使用

capabilityレベルでスペックパターンを定義すると、設定レベルで定義されたパターンが上書きされます。これは、異なるデバイス機能に基づいてテストを分離する必要がある場合に便利です。このような場合、設定レベルでより一般的なスペックパターンを使用し、capabilityレベルでより具体的なパターンを使用するとより便利です。

例えば、Androidテスト用のディレクトリとiOSテスト用のディレクトリの2つがあるとします。

設定ファイルは、特定のデバイスに依存しないテスト用に次のようにパターンを定義する場合があります：

```js
{
    specs: ['tests/general/**/*.js']
}
```

しかし、AndroidデバイスとiOSデバイス用に異なるcapabilityがあり、パターンは次のようになります：

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

これらのcapabilityを両方とも設定ファイルに必要とする場合、Androidデバイスは「android」名前空間の下のテストのみを実行し、iOSテストは「ios」名前空間の下のテストのみを実行します！

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
            //設定レベルのスペックが使用されます
        }
    ]
}
```