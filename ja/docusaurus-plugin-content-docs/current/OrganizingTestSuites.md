---
id: organizingsuites
title: テストスイートの整理
---

プロジェクトが成長するにつれて、必然的に統合テストが増えていきます。これにより、ビルド時間が長くなり、生産性が低下します。

これを防ぐために、テストを並行して実行すべきです。WebdriverIOはすでに単一セッション内で各スペック（またはCucumberでの_フィーチャーファイル_）を並行してテストします。一般的に、1つのスペックファイルでは1つの機能のみをテストするようにしましょう。1つのファイルに多すぎるテストや少なすぎるテストを持たないようにしてください（ただし、ここに黄金律はありません）。

テストがいくつかのスペックファイルを持つようになったら、テストを同時に実行し始めるべきです。そのためには、設定ファイルの`maxInstances`プロパティを調整します。WebdriverIOでは、ファイルやテストの数に関係なく、すべてを並行して実行できる最大の並行性でテストを実行できます（ただし、コンピュータのCPU、並行性の制限などの特定の制限に依存します）。

> たとえば、3つの異なる機能（Chrome、Firefox、Safari）があり、`maxInstances`を`1`に設定したとします。WDIOテストランナーは3つのプロセスを起動します。したがって、10個のスペックファイルがあり、`maxInstances`を`10`に設定すると、_すべての_スペックファイルが同時にテストされ、30個のプロセスが起動されます。

`maxInstances`プロパティをグローバルに定義して、すべてのブラウザの属性を設定できます。

独自のWebDriverグリッドを実行している場合、あるブラウザの容量が他のブラウザよりも多いことがあります。その場合、機能オブジェクトで`maxInstances`を_制限_できます：

```js
// wdio.conf.js
export const config = {
    // ...
    // すべてのブラウザに対して maxInstance を設定
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstancesは機能ごとに上書きできます。たとえば、5つのFirefoxインスタンスしか
        // 利用できない社内WebDriverグリッドがある場合、一度に5つ以上のインスタンスが
        // 起動されないようにすることができます。
        browserName: 'chrome'
    }],
    // ...
}
```

## メイン設定ファイルからの継承

複数の環境（開発環境や統合環境など）でテストスイートを実行する場合、複数の設定ファイルを使用して管理しやすくすることが役立ちます。

[ページオブジェクトの概念](pageobjects)と同様に、最初に必要なのはメインの設定ファイルです。これには、環境間で共有するすべての設定が含まれています。

次に、環境ごとに別の設定ファイルを作成し、メイン設定を環境固有のもので補完します：

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// デフォルトとしてメイン設定ファイルを持ちますが、環境固有の情報を上書きします
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // ここでさらに多くの機能が定義されています
        // ...
    ],

    // ローカルではなくSauce Labsでテストを実行します
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// 追加のレポーターを追加
config.reporters.push('allure')
```

## テストスペックをスイートでグループ化する

テストスペックをスイートにグループ化し、すべてではなく特定のスイートを実行できます。

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

これで、単一のスイートのみを実行したい場合は、CLIの引数としてスイート名を渡すことができます：

```sh
wdio wdio.conf.js --suite login
```

または、複数のスイートを一度に実行できます：

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## テストスペックをシーケンシャルに実行するためのグループ化

上記で説明したように、テストを同時に実行することにはメリットがあります。ただし、テストをグループ化して単一のインスタンスでシーケンシャルに実行すると便利な場合があります。この例としては、コードのトランスパイルやクラウドインスタンスのプロビジョニングなど、セットアップコストが大きい場合が主に挙げられますが、この機能から恩恵を受ける高度な使用モデルもあります。

単一のインスタンスで実行するためにテストをグループ化するには、specs定義内で配列として定義します。

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
上記の例では、「test_login.js」、「test_product_order.js」、「test_checkout.js」のテストは単一のインスタンスでシーケンシャルに実行され、「test_b*」テストはそれぞれ個別のインスタンスで同時に実行されます。

スイートで定義されたスペックをグループ化することも可能なので、以下のようにスイートを定義することもできます：
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

パターンを使用してシーケンシャルにテストを実行すると、スペックファイルはアルファベット順に実行されます

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

場合によっては、スイートの単一のテスト（またはテストのサブセット）のみを実行したいことがあります。

`--spec`パラメータを使用して、実行する_スイート_（Mocha、Jasmine）または_フィーチャー_（Cucumber）を指定できます。パスは現在の作業ディレクトリから相対的に解決されます。

たとえば、ログインテストのみを実行するには：

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

または、複数のスペックを一度に実行します：

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

`--spec`値が特定のスペックファイルを指していない場合、設定で定義されているスペックファイル名をフィルタリングするために使用されます。

スペックファイル名に「dialog」という単語を含むすべてのスペックを実行するには、次のようにします：

```sh
wdio wdio.conf.js --spec dialog
```

各テストファイルは単一のテストランナープロセスで実行されていることに注意してください。事前にファイルをスキャンしないため（`wdio`へのファイル名のパイプについては次のセクションを参照）、スペックファイルの先頭で`describe.only`を使用してMochaにそのスイートのみを実行するように指示することは_できません_。

この機能は同じ目標を達成するのに役立ちます。

`--spec`オプションが提供されると、設定または機能レベルの`specs`パラメータによって定義されたパターンが上書きされます。

## 選択したテストを除外する

必要に応じて、特定のスペックファイルを実行から除外する必要がある場合は、`--exclude`パラメータ（Mocha、Jasmine）またはフィーチャー（Cucumber）を使用できます。

たとえば、テスト実行からログインテストを除外するには：

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

`--exclude`値が特定のスペックファイルを指していない場合、設定で定義されているスペックファイル名をフィルタリングするために使用されます。

スペックファイル名に「dialog」という単語を含むすべてのスペックを除外するには、次のようにします：

```sh
wdio wdio.conf.js --exclude dialog
```

### スイート全体を除外する

名前でスイート全体を除外することもできます。除外値が設定で定義されているスイート名と一致し、ファイルパスのように見えない場合、スイート全体がスキップされます：

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

これにより、`login`スイートを完全にスキップして、`checkout`スイートのみが実行されます。

混合除外（スイートとスペックパターン）は予想通りに機能します：

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

この例では、`signup`が定義されたスイート名である場合、そのスイートは除外されます。パターン`dialog`は、ファイル名に「dialog」を含むすべてのスペックファイルをフィルタリングします。

:::note
`--suite X`と`--exclude X`の両方を指定した場合、除外が優先され、スイート`X`は実行されません。
:::

`--exclude`オプションが提供されると、設定または機能レベルの`exclude`パラメータによって定義されたパターンが上書きされます。

## スイートとテストスペックを実行する

個別のスペックとともに、スイート全体を実行します。

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## 複数の特定のテストスペックを実行する

継続的統合やその他のコンテキストでは、実行する複数のスペックセットを指定する必要がある場合があります。WebdriverIOの`wdio`コマンドラインユーティリティは、パイプで送られるファイル名（`find`、`grep`、またはその他からの）を受け入れます。

パイプで送られるファイル名は、設定の`spec`リストで指定されたグロブまたはファイル名のリストを上書きします。

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**注意：** これは単一のスペックを実行するための`--spec`フラグを上書きし_ません_。_

## MochaOptsを使用して特定のテストを実行する

Mochaの特定の引数`--mochaOpts.grep`をwdio CLIに渡すことで、実行する特定の`suite|describe`および/または`it|test`をフィルタリングすることもできます。

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**注意：** Mochaは、WDIOテストランナーがインスタンスを作成した後にテストをフィルタリングするため、複数のインスタンスが生成されても実際に実行されないことがあります。_

## MochaOptsを使用して特定のテストを除外する

Mochaの特定の引数`--mochaOpts.invert`をwdio CLIに渡すことで、除外する特定の`suite|describe`および/または`it|test`をフィルタリングすることもできます。`--mochaOpts.invert`は`--mochaOpts.grep`の逆の動作をします。

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**注意：** Mochaは、WDIOテストランナーがインスタンスを作成した後にテストをフィルタリングするため、複数のインスタンスが生成されても実際に実行されないことがあります。_

## 失敗後にテストを停止する

`bail`オプションを使用すると、任意のテストが失敗した後にテストを停止するようにWebdriverIOに指示できます。

これは、ビルドが壊れることがすでにわかっているが、完全なテスト実行の長い待ち時間を避けたい大規模なテストスイートで役立ちます。

`bail`オプションは数値を期待し、WebDriverが全体のテスト実行を停止する前に発生できるテスト失敗の数を指定します。デフォルトは`0`で、常に見つけることができるすべてのテストスペックを実行することを意味します。

詳細な情報については、[オプションページ](configuration)のbail設定を参照してください。
## 実行オプションの階層

実行するスペックを宣言する際、どのパターンが優先されるかを定義する特定の階層があります。現在、最も優先度の高いものから低いものへの順序は次のとおりです：

> CLI `--spec`引数 > 機能`specs`パターン > 設定`specs`パターン
> CLI `--exclude`引数 > 設定`exclude`パターン > 機能`exclude`パターン

設定パラメータのみが指定されている場合、それはすべての機能に使用されます。ただし、機能レベルでパターンを定義する場合、それは設定パターンの代わりに使用されます。最後に、コマンドラインで定義されたスペックパターンは、他のすべてのパターンを上書きします。

### 機能で定義されたスペックパターンの使用

機能レベルでスペックパターンを定義すると、設定レベルで定義されたパターンが上書きされます。これは、異なるデバイス機能に基づいてテストを分離する必要がある場合に役立ちます。このような場合、設定レベルでより一般的なスペックパターンを使用し、機能レベルでより具体的なパターンを使用することがより有用です。

たとえば、Androidテスト用とiOSテスト用の2つのディレクトリがあるとします。

設定ファイルでは、特定のデバイスに依存しないテスト用に次のようにパターンを定義できます：

```js
{
    specs: ['tests/general/**/*.js']
}
```

しかし、AndroidデバイスとiOSデバイスに異なる機能があり、パターンは次のようになります：

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

設定ファイルでこれらの両方の機能が必要な場合、Androidデバイスは「android」名前空間の下のテストのみを実行し、iOSテストは「ios」名前空間の下のテストのみを実行します！

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