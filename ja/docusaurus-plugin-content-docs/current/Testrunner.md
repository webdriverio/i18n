---
id: testrunner
title: テストランナー
---

WebdriverIOには独自のテストランナーが付属しており、迅速にテストを開始するのに役立ちます。それはあなたのためにすべての作業を行い、サードパーティのサービスとの統合を可能にし、テストをできるだけ効率的に実行するのを助けます。

WebdriverIOのテストランナーはNPMパッケージ`@wdio/cli`に別途バンドルされています。

次のようにインストールします：

```sh npm2yarn
npm install @wdio/cli
```

コマンドラインインターフェイスのヘルプを表示するには、ターミナルで次のコマンドを入力します：

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

素晴らしい！次に、テスト、機能、設定に関するすべての情報が設定される構成ファイルを定義する必要があります。そのファイルがどのようなものであるべきかを確認するには、[設定ファイル](/docs/configuration)セクションに移動してください。

`wdio`構成ヘルパーを使えば、設定ファイルの生成が非常に簡単です。次のコマンドを実行するだけです：

```sh
$ npx wdio config
```

...そうするとヘルパーユーティリティが起動します。

質問をして、1分以内に設定ファイルを生成します。

![WDIO設定ユーティリティ](/img/config-utility.gif)

構成ファイルが設定されたら、次のコマンドを実行してテストを開始できます：

```sh
npx wdio run wdio.conf.js
```

`run`コマンドなしでもテスト実行を初期化できます：

```sh
npx wdio wdio.conf.js
```

以上です！これで、グローバル変数`browser`を通じてSeleniumインスタンスにアクセスできます。

## コマンド

### `wdio config`

`config`コマンドはWebdriverIO設定ヘルパーを実行します。このヘルパーはWebdriverIOプロジェクトについていくつかの質問をし、回答に基づいて`wdio.conf.js`ファイルを作成します。

例：

```sh
wdio config
```

オプション：

```
--help            WebdriverIOヘルプメニューを表示します                       [boolean]
--npm             yarnの代わりにNPMを使ってパッケージをインストールするかどうか    [boolean]
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
--help                WebdriverIOヘルプメニューを表示します            [boolean]
--version             WebdriverIOバージョンを表示します               [boolean]
--hostname, -h        自動化ドライバーのホストアドレス                 [string]
--port, -p            自動化ドライバーのポート                       [number]
--user, -u            クラウドサービスを自動化バックエンドとして使用する場合のユーザー名
                                                                  [string]
--key, -k             ユーザーに対応するアクセスキー                   [string]
--watch               変更を監視するスペック                          [boolean]
--logLevel, -l        ログの詳細レベル
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                特定の数のテストが失敗した後にテストランナーを停止する   [number]
--baseUrl             ベースURLを設定してURLコマンド呼び出しを短縮する      [string]
--waitforTimeout, -w  すべてのwaitForXXXコマンドのタイムアウト           [number]
--framework, -f       スペックを実行するフレームワーク（Mocha、JasmineまたはCucumber）を定義する
                                                                   [string]
--reporters, -r       標準出力に結果を出力するレポーター                  [array]
--suite               specs属性を上書きし、定義されたスイートを実行する      [array]
--spec                特定のspecファイルまたはワイルドカードを実行する - stdinからパイプされたspecsを上書きする
                                                                   [array]
--exclude             実行からspecファイルを除外する - stdinからパイプされたspecsを上書きする
                                                                   [array]
--repeat              特定のspecやスイートをN回繰り返す                   [number]
--mochaOpts           Mochaオプション
--jasmineOpts         Jasmineオプション
--cucumberOpts        Cucumberオプション
```

> 注：自動コンパイルは`tsx` ENV変数で簡単に制御できます。[TypeScriptドキュメント](/docs/typescript)も参照してください。

### `wdio install`
`install`コマンドを使用すると、CLIを介してWebdriverIOプロジェクトにレポーターやサービスを追加できます。

例：

```sh
wdio install service sauce # @wdio/sauce-serviceをインストール
wdio install reporter dot # @wdio/dot-reporterをインストール
wdio install framework mocha # @wdio/mocha-frameworkをインストール
```

`yarn`を使用してパッケージをインストールしたい場合は、コマンドに`--yarn`フラグを渡すことができます：

```sh
wdio install service sauce --yarn
```

WDIO設定ファイルが作業中のフォルダと同じでない場合、カスタム構成パスを渡すこともできます：

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

replコマンドを使用すると、WebdriverIOコマンドを実行するためのインタラクティブなコマンドラインインターフェイスを開始できます。テスト目的や、単にWebdriverIOセッションを素早く起動するために使用できます。

ローカルのChromeでテストを実行：

```sh
wdio repl chrome
```

またはSauce Labsでテストを実行：

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

[runコマンド](#wdio-run)と同じ引数を適用できます。