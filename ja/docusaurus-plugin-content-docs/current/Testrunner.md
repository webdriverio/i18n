---
id: testrunner
title: テストランナー
---

WebdriverIOには独自のテストランナーが付属しており、可能な限り迅速にテストを開始するのに役立ちます。テストランナーはすべての作業を代行し、サードパーティのサービスとの統合を可能にし、テストをできるだけ効率的に実行するのを支援します。

WebdriverIOのテストランナーは、NPMパッケージ`@wdio/cli`に別途バンドルされています。

次のようにインストールします：

```sh npm2yarn
npm install @wdio/cli
```

コマンドラインインターフェースのヘルプを表示するには、ターミナルで次のコマンドを入力します：

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

素晴らしい！次に、テスト、機能、および設定に関するすべての情報が設定されている構成ファイルを定義する必要があります。そのファイルがどのようになるべきかを確認するには、[設定ファイル](/docs/configuration)セクションに移動してください。

`wdio`設定ヘルパーを使用すると、設定ファイルの生成が非常に簡単になります。以下を実行するだけです：

```sh
$ npx wdio config
```

...すると、ヘルパーユーティリティが起動します。

質問に答えると、1分もかからずに設定ファイルが生成されます。

![WDIO設定ユーティリティ](/img/config-utility.gif)

設定ファイルが設定されたら、次のコマンドを実行してテストを開始できます：

```sh
npx wdio run wdio.conf.js
```

`run`コマンドなしでテスト実行を初期化することもできます：

```sh
npx wdio wdio.conf.js
```

以上です！これで、グローバル変数`browser`を通じてSeleniumインスタンスにアクセスできるようになりました。

## コマンド

### `wdio config`

`config`コマンドはWebdriverIO設定ヘルパーを実行します。このヘルパーはWebdriverIOプロジェクトについていくつかの質問をし、回答に基づいて`wdio.conf.js`ファイルを作成します。

例：

```sh
wdio config
```

オプション：

```
--help            WebdriverIOヘルプメニューを表示します                           [boolean]
--npm             yarnの代わりにNPMを使用してパッケージをインストールするかどうか    [boolean]
```

### `wdio run`

> これは設定を実行するためのデフォルトコマンドです。

`run`コマンドはWebdriverIO設定ファイルを初期化し、テストを実行します。

例：

```sh
wdio run ./wdio.conf.js --watch
```

オプション：

```
--help                WebdriverIOヘルプメニューを表示します               [boolean]
--version             WebdriverIOのバージョンを表示します                 [boolean]
--hostname, -h        自動化ドライバーのホストアドレス                     [string]
--port, -p            自動化ドライバーのポート                            [number]
--user, -u            クラウドサービスを自動化バックエンドとして使用する場合のユーザー名
                                                                         [string]
--key, -k             ユーザーに対応するアクセスキー                      [string]
--watch               変更があった場合にスペックを監視します              [boolean]
--logLevel, -l        ログの詳細レベル
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                特定の数のテストが失敗した後にテストランナーを停止する [number]
--baseUrl             ベースURLを設定してURLコマンド呼び出しを短縮する     [string]
--waitforTimeout, -w  すべてのwaitForXXXコマンドのタイムアウト              [number]
--framework, -f       スペックを実行するフレームワーク（Mocha、JasmineまたはCucumber）
                        を定義します                                        [string]
--reporters, -r       結果を標準出力に表示するレポーター                     [array]
--suite               specs属性を上書きし、定義されたスイートを実行します     [array]
--spec                特定の仕様ファイルまたはワイルドカードを実行する - stdinからパイプされた
                        仕様を上書きします                                   [array]
--exclude             実行から特定の仕様ファイルを除外する - stdinからパイプされた
                        仕様を上書きします                                   [array]
--repeat              特定の仕様やスイートをN回繰り返します                  [number]
--mochaOpts           Mochaオプション
--jasmineOpts         Jasmineオプション
--cucumberOpts        Cucumberオプション
--tsConfigPath        `tsconfig.json`のカスタムパスまたはwdio設定の[tsConfigPath設定](/docs/configurationfile)を使用
```

> 注：自動コンパイルは`tsx`環境変数で簡単に制御できます。[TypeScriptドキュメント](/docs/typescript)も参照してください。

### `wdio install`
`install`コマンドを使用すると、CLIを介してWebdriverIOプロジェクトにレポーターやサービスを追加できます。

例：

```sh
wdio install service sauce # @wdio/sauce-serviceをインストールします
wdio install reporter dot # @wdio/dot-reporterをインストールします
wdio install framework mocha # @wdio/mocha-frameworkをインストールします
```

代わりに`yarn`を使用してパッケージをインストールしたい場合は、コマンドに`--yarn`フラグを渡すことができます：

```sh
wdio install service sauce --yarn
```

WDIO設定ファイルが作業中のフォルダと同じ場所にない場合は、カスタム構成パスを渡すこともできます：

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### サポートされているサービスのリスト

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### サポートされているレポーターのリスト

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### サポートされているフレームワークのリスト

```
mocha
jasmine
cucumber
```

### `wdio repl`

replコマンドを使用すると、WebdriverIOコマンドを実行するためのインタラクティブなコマンドラインインターフェースを起動できます。テスト目的や、単にWebdriverIOセッションを素早く立ち上げるために使用できます。

ローカルChromeでテストを実行する：

```sh
wdio repl chrome
```

またはSauce Labsでテストを実行する：

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

[runコマンド](#wdio-run)と同じ引数を適用できます。