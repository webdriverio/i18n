---
id: testrunner
title: テストランナー
---

WebdriverIOには独自のテストランナーが付属しており、できるだけ早くテストを開始するのに役立ちます。テストランナーはあなたの代わりにすべての作業を行い、サードパーティのサービスとの統合を可能にし、テストをできるだけ効率的に実行するのを支援します。

WebdriverIOのテストランナーはNPMパッケージ`@wdio/cli`として別途バンドルされています。

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

素晴らしい！次に、テスト、機能、および設定に関するすべての情報が設定されている構成ファイルを定義する必要があります。そのファイルがどのようなものであるべきかを見るには、[設定ファイル](/docs/configuration)セクションに移動してください。

`wdio`構成ヘルパーを使用すると、設定ファイルを非常に簡単に生成できます。次のコマンドを実行するだけです：

```sh
$ npx wdio config
```

...そうするとヘルパーユーティリティが起動します。

ヘルパーはいくつかの質問をして、1分もかからずに設定ファイルを生成します。

![WDIO構成ユーティリティ](/img/config-utility.gif)

設定ファイルが設定されたら、次のコマンドを実行してテストを開始できます：

```sh
npx wdio run wdio.conf.js
```

`run`コマンドなしでテスト実行を初期化することもできます：

```sh
npx wdio wdio.conf.js
```

以上です！これで、グローバル変数`browser`を通じてSeleniumインスタンスにアクセスできます。

## コマンド

### `wdio config`

`config`コマンドはWebdriverIO構成ヘルパーを実行します。このヘルパーはWebdriverIOプロジェクトについていくつかの質問をし、回答に基づいて`wdio.conf.js`ファイルを作成します。

例：

```sh
wdio config
```

オプション：

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> これは構成を実行するためのデフォルトコマンドです。

`run`コマンドはWebdriverIO構成ファイルを初期化し、テストを実行します。

例：

```sh
wdio run ./wdio.conf.js --watch
```

オプション：

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
```

> 注意：自動コンパイルは`tsx` ENV変数で簡単に制御できます。[TypeScriptドキュメント](/docs/typescript)も参照してください。

### `wdio install`
`install`コマンドを使用すると、CLIを介してWebdriverIOプロジェクトにレポーターやサービスを追加できます。

例：

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

代わりに`yarn`を使用してパッケージをインストールする場合は、コマンドに`--yarn`フラグを渡すことができます：

```sh
wdio install service sauce --yarn
```

WDIO設定ファイルが作業しているフォルダと同じでない場合は、カスタム設定パスを渡すこともできます：

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

replコマンドを使用すると、WebdriverIOコマンドを実行するための対話型コマンドラインインターフェースを起動できます。これはテスト目的で使用したり、WebdriverIOセッションを素早く起動したりするのに使用できます。

ローカルのChromeでテストを実行する：

```sh
wdio repl chrome
```

またはSauce Labsでテストを実行する：

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

[runコマンド](#wdio-run)と同じ引数を適用できます。