---
id: allure-reporter
title: Allureレポーター
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> WebdriverIOのレポータープラグインで、[Allureテストレポート](https://allurereport.org/docs/webdriverio/)を作成します。

![Allure Reporter Example](/img/allure.png)

## インストール

最も簡単な方法は、`package.json`に`@wdio/allure-reporter`をdevDependencyとして含めることです。

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

以下のコマンドで簡単にインストールできます：

```sh
npm install @wdio/allure-reporter --save-dev
```

## 設定

wdio.conf.jsファイルで出力ディレクトリを構成します：

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir`のデフォルトは`./allure-results`です。テスト実行が完了すると、このディレクトリには各スペックの`.xml`ファイルと、多数の`.txt`および`.png`ファイルやその他の添付ファイルが生成されます。
- `disableWebdriverStepsReporting` - オプションパラメータ（デフォルトは`false`）、カスタムステップのみをレポーターに記録するためのものです。
- `issueLinkTemplate` - オプションパラメータ、問題リンクのパターンを指定するためのものです。レポーターは`{}`プレースホルダーを`addIssue(value)`呼び出しパラメータで指定された値に置き換えます。Cucumberを使用し、任意のレベルで`issue`タグが設定されている場合も同じロジックが適用され、レポート内のリンクに変換されます。パラメータ値の例：
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - オプションパラメータ、TMS（テスト管理システム）リンクのパターンを指定するためのものです。レポーターは`{}`プレースホルダーを`addTestId(value)`呼び出しパラメータで指定された値に置き換えます。Cucumberを使用し、任意のレベルで`testId`タグが設定されている場合も同じロジックが適用され、レポート内のリンクに変換されます。パラメータ値の例：
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - オプションパラメータ（デフォルトは`false`）、スクリーンショットをレポーターに添付しないようにするためのものです。
- `useCucumberStepReporter` - オプションパラメータ（デフォルトは`false`）、cucumberを使用する際のレポート階層を変更するにはtrueに設定してください。自分で試してみて、どのように見えるか確認してください。
- `disableMochaHooks` - オプションパラメータ（デフォルトは`false`）、`before/after`のスタックトレース/スクリーンショット/結果フックをAllureレポーターに取り込まないようにするにはtrueに設定してください。
- `addConsoleLogs` - オプションパラメータ（デフォルトは`false`）、ステップからのコンソールログをレポーターに添付するにはtrueに設定してください。
- `reportedEnvironmentVars` (**型:** `Record<string, string>`) - レポートに環境変数を表示するにはこのオプションを設定してください。これを設定しても、実際の環境変数は変更されません。

## サポートされているAllure API
* `addLabel(name, value)` - テストにカスタムラベルを割り当てる
* `addFeature(featureName)` – テストに機能を割り当てる
* `addStory(storyName)` – テストにユーザーストーリーを割り当てる
* `addSeverity(value)` – テストに重要度を割り当てる、次の値のいずれかを受け入れます：blocker、critical、normal、minor、trivial
* `addTag(value)` – テストにタグラベルを割り当てる
* `addEpic(value)` – テストにエピックラベルを割り当てる
* `addOwner(value)` – テストにオーナーラベルを割り当てる
* `addSuite(value)` – テストにスイートラベルを割り当てる
* `addSubSuite(value)` – テストにサブスイートラベルを割り当てる
* `addParentSuite(value)` – テストに親スイートラベルを割り当てる
* `addIssue(value)` – テストに問題IDを割り当てる
* `addAllureId(value)` – テストにAllureテストオプスIDラベルを割り当てる
* `addTestId(value)` – テストにTMSテストIDを割り当てる
* ~~`addEnvironment(name, value)` ~~ – もう機能しない非推奨の関数です。代わりに`reportedEnvironmentVars`を使用してください
* `addAttachment(name, content, [type])` – テストに添付ファイルを保存する。
    * `name` (*String*) - 添付ファイル名。
    * `content` – 添付ファイルの内容。
    * `type` (*String*, オプション) – 添付ファイルのMIMEタイプ、デフォルトは`text/plain`
* `addArgument(name, value)` - テストに追加の引数を追加する
* `addDescription(description, [type])` – テストに説明を追加する。
    * `description` (*String*) - テストの説明。
    * `type` (*String*, オプション) – 説明のタイプ、デフォルトは`text`。値は['text', 'html', 'markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - テストにステップを追加する。
    * `title` (*String*) - ステップの名前。
    * `content` (*String*, オプション) - ステップの添付ファイル
    * `name` (*String*, オプション) - ステップ添付ファイル名、デフォルトは`attachment`。
    * `status` (*String*, オプション) - ステップのステータス、デフォルトは`passed`。"failed"、"passed"または"broken"である必要があります
* `startStep(title)` - ステップを開始する
    * `title` (*String*) - ステップの名前。
* `endStep(status)` - ステップを終了する
    * `status` (*String*, オプション) - ステップのステータス、デフォルトは`passed`。"failed"、"passed"または"broken"である必要があります
* `step(name, body)` - 内部にコンテンツ関数を持つステップを開始する。無限の階層でステップを作成できます
    * `body` (*Function*) - ステップ本体の非同期関数

### 使用法
Allure APIには以下の方法でアクセスできます：

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Mochaの例

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

基本的なCucumberの例：

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### カスタムステップ

`step`メソッドはステップの扱いを簡素化します。各ステップは内部に任意のコンテンツを持つ非同期関数として表現されるためです。
関数の最初の引数は現在のステップであり、Allure APIメソッドのほとんど（`label`、`epic`、`attach`など）を持っています：

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Cucumberタグ

特別な名前（`issue`と`testId`）のCucumberタグはリンクに変換されます（対応するリンクテンプレートを事前に設定する必要があります）：
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

特別な名前（`feature`）のCucumberタグはAllureラベルにマッピングされます：

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## レポートの表示

結果はAllureが提供する[レポーティングツール](https://allurereport.org/)のいずれかによって使用できます。例えば：

### コマンドライン

[Allureコマンドラインツール](https://www.npmjs.com/package/allure-commandline)をインストールし、結果ディレクトリを処理します：

```sh
allure generate [allure_output_dir] && allure open
```

これによりレポートが生成され（デフォルトでは`./allure-report`に）、ブラウザで開きます。

### レポートの自動生成

Allureコマンドラインツールをプログラムで使用してレポートを自動生成することもできます。そのためには、プロジェクトにパッケージをインストールします：

```sh
npm i allure-commandline
```

次に、`onComplete`フックを追加または拡張するか、これ用の[カスタムサービス](/docs/customservices)を作成します：

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

[Allure Jenkinsプラグイン](https://allurereport.org/docs/integrations-jenkins/)をインストールして設定します

## スクリーンショットの追加

スクリーンショットは、MochaとJasmineでは`afterTest`フック、Cucumberでは`afterStep`フックでWebDriverIOの`takeScreenshot`関数を使用してレポートに添付できます。
まずレポーターオプションで`disableWebdriverScreenshotsReporting: false`を設定し、afterStepフックに追加します：

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

上の例に示すように、この関数が呼び出されると、スクリーンショット画像がAllureレポートに添付されます。