---
id: testrunner
title: テストランナー
description: "@wdio/cli から WDIO テストランナーをインストールし、config、run、install、repl、session コマンドを使ってテストスイートをセットアップして実行します。"
---

WebdriverIO テストランナーは、設定ファイルに基づいてテストスイートを実行します。ケイパビリティごとに 1 つのワーカーを起動し、フレームワーク、サービス、レポーターを組み込んで、スペックを並列に実行します。すべてのテストプロジェクトでテストランナーを使用してください。[スタンドアロンモード](/docs/setuptypes)は、WebdriverIO を独自のツールに組み込む場合にのみ使用します。

テストランナーは `@wdio/cli` パッケージに含まれています:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`@wdio/cli` がまだインストールされていない場合でも、`npx wdio` で同じ CLI を実行できます。npm はスコープなしの [`wdio`](https://www.npmjs.com/package/wdio) パッケージをインストールし、そのパッケージが `@wdio/cli` を起動します。

新しいプロジェクトをセットアップするには、設定ウィザードを実行します。いくつかの質問に答えると、パッケージがインストールされ、`wdio.conf.ts` が作成されます:

```sh
npx wdio config
```

その後、テストを実行します:

```sh
npx wdio run wdio.conf.ts
```

`run` はデフォルトのコマンドなので、`npx wdio wdio.conf.ts` でも同じ動作になります。スペック内では、`@wdio/globals` からセッションをインポートします:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

`wdio.conf.ts` のすべてのオプションについては、[設定ファイル](/docs/configurationfile)を参照してください。

## コマンド

```sh
$ npx wdio --help

wdio [command]

Commands:
  wdio config                           Initialize WebdriverIO and setup
                                        configuration in your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or
                                        `framework` to your WebdriverIO project.
  wdio repl [option] [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to
                                        initialize your tests. (default)
  wdio session [action..]               Drive a browser, mobile app or desktop
                                        app from the shell

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

各コマンドは `--help` で独自のオプションを表示します。例: `npx wdio run --help`

### `wdio config`

`config` コマンドは設定ウィザードを実行し、回答に基づいて `wdio.conf.ts`(または `wdio.conf.js`)を作成します。

```sh
npx wdio config
```

`--yes` を渡すと、プロンプトを表示せずにデフォルト(Mocha、Chrome、ページオブジェクト)を使用します。ウィザードの各質問にはそれぞれ対応するフラグもあるため、一部またはすべての質問にコマンドラインで回答できます:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

オプション:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

ウィザードは、それを実行したパッケージマネージャーでパッケージをインストールします。`pnpm wdio config` は pnpm を、`yarn wdio config` は Yarn を、`npx` は npm を使用します。

`npx wdio config --help` は、ウィザードのフラグと、それぞれが受け付ける値を一覧表示します。ウィザードがあなたのセットアップでは尋ねない質問のフラグを指定するとエラーになり、ウィザードが提示しない値を指定した場合もエラーになります。例については、[フラグでウィザードに回答する](/docs/gettingstarted#answer-the-wizard-with-flags)を参照してください。

### `wdio run`

> これは設定を実行するためのデフォルトのコマンドです。

`run` コマンドは設定ファイルを読み込み、テストを実行します。コマンドラインオプションは、設定ファイル内の対応するオプションを上書きします。

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

オプション:

```
    --watch            Run WebdriverIO in watch mode                   [boolean]
-h, --hostname         automation driver host address                   [string]
-p, --port             automation driver port                           [number]
    --path             path to WebDriver endpoints (default "/")        [string]
-u, --user             username if using a cloud service as automation backend
                                                                        [string]
-k, --key              corresponding access key to the user             [string]
-l, --logLevel         level of logging verbosity
                [choices: "trace", "debug", "info", "warn", "error", "silent"]
    --bail             stop test runner after specific amount of tests have
                       failed                                           [number]
    --baseUrl          shorten url command calls by setting a base url  [string]
-w, --waitforTimeout   timeout for all waitForXXX commands              [number]
-s, --updateSnapshots  update DOM, image or test snapshots              [string]
-f, --framework        defines the framework (Mocha, Jasmine or Cucumber) to
                       run the specs                                    [string]
-r, --reporters        reporters to print out the results on stdout      [array]
    --suite            overwrites the specs attribute and runs the defined
                       suite                                             [array]
    --spec             run only a certain spec file or wildcard - overrides
                       specs piped from stdin                            [array]
    --exclude          exclude certain spec file or wildcard from the test run
                       - overrides exclude piped from stdin              [array]
    --repeat           Repeat specific specs and/or suites N times      [number]
    --mochaOpts        Mocha options
    --jasmineOpts      Jasmine options
    --cucumberOpts     Cucumber options
    --coverage         Enable coverage for browser runner
    --headless         run all browser instances in headless mode, overrides
                       capability settings in wdio.conf.js             [boolean]
    --shard            Shard tests and execute only the selected shard.
                       Specify in the one-based form like `--shard x/y`, where
                       x is the current and y the total shard.
    --cpuProf          Enable Node.js CPU profiling for worker processes
                       (--cpu-prof)                                    [boolean]
    --heapProf         Enable Node.js heap profiling for worker processes
                       (--heap-prof)                                   [boolean]
    --debug            Pause failing tests and browser.debug() in an agent
                       session. Only `agent` is supported
                                                   [string] [choices: "agent"]
    --tsConfigPath     custom path for `tsconfig.json`                  [string]
```

例:

```sh
# 1 つのスイートを実行
npx wdio run wdio.conf.ts --suite login

# 4 つのシャードのうち最初のシャードを実行(例: CI マトリックス内で)
npx wdio run wdio.conf.ts --shard 1/4

# すべてのブラウザをヘッドレスで実行、またはヘッドありモードを強制
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# ドット記法でフレームワークのオプションを設定
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# 行番号を指定して Cucumber シナリオを実行
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# カスタムの tsconfig.json を使用
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# 失敗したテストと browser.debug() を一時停止し、コーディングエージェントが調査できるようにする
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` は、設定の [`tsConfigPath`](/docs/configurationfile) 設定を上書きします。WebdriverIO が `tsx` を使ってスペックをコンパイルする方法については、[TypeScript](/docs/typescript) を参照してください。

### `wdio install`

`install` コマンドは、既存のプロジェクトにレポーター、サービス、フレームワーク、プラグイン、またはランナーを追加します。パッケージをインストールし、`package.json` に追加して、設定ファイルを更新します。

```sh
npx wdio install service sauce        # @wdio/sauce-service をインストール
npx wdio install reporter dot         # @wdio/dot-reporter をインストール
npx wdio install framework mocha      # @wdio/mocha-framework をインストール
```

パッケージは、コマンドを実行したパッケージマネージャーでインストールされます。そのため、`pnpm wdio install reporter dot` は pnpm で、`yarn wdio install reporter dot` は Yarn でインストールします。`npx` や直接呼び出した場合は npm を使用します。

設定ファイルが現在のフォルダにある `wdio.conf.(js|ts|cjs|mjs)` でない場合は、その場所を指定します:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` は、サポートされているすべてのパッケージとその npm 名を表示します。

#### サポートされているサービスの一覧

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### サポートされているレポーターの一覧

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### サポートされているフレームワークの一覧

```
mocha, jasmine, cucumber
```

#### サポートされているプラグインとランナーの一覧

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

`repl` コマンドは WebDriver セッションを開始し、WebdriverIO コマンドを実行できる対話型プロンプトを開きます。スペックを書かずにセレクターやコマンドを試すのに使用します。詳しくは [REPL インターフェース](/docs/repl)を参照してください。

ローカルの Chrome を起動します:

```sh
npx wdio repl chrome
```

Sauce Labs クラウドで実行します:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

設定ファイルのケイパビリティを、インデックスまたはマルチリモート名で指定して使用します:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

新しいブラウザを起動する代わりに、実行中の [`wdio session`](/docs/session) にアタッチします:

```sh
npx wdio repl --session default
```

`repl` は、[run コマンド](#wdio-run)の接続オプション(`--hostname`、`--port`、`--path`、`--user`、`--key`、`--logLevel` など)と、以下のモバイル向けオプションを受け付けます。`-u` は両方の短縮エイリアスになっているため、`--user` と `--udid` は長い形式で指定してください。

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

`session` コマンドは、シェルからブラウザ、モバイルアプリ、またはデスクトップアプリを、1 回の呼び出しにつき 1 つのコマンドで操作します。これはコーディングエージェント向けに作られており、エージェントはセッションを開き、スナップショットを取得し、クリックや入力を行い、実行した操作をテストとしてエクスポートします。ワークフローについては [wdio session](/docs/session) を、すべてのアクションについては [wdio session コマンド](/docs/session-commands)を参照してください。

```sh
npx wdio session --help
```

## 次のステップ

- [設定ファイル](/docs/configurationfile): `wdio.conf.ts` のすべてのオプション
- [はじめに](/docs/gettingstarted): ウィザードでプロジェクトをセットアップする
- [REPL インターフェース](/docs/repl): コマンドを対話的にデバッグする
- [wdio session](/docs/session): シェルやエージェントからブラウザを操作する