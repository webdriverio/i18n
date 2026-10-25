---
id: bamboo
title: Bamboo
description: "Atlassian BambooでWebdriverIOのテストを実行し、JUnitの結果を公開することで、ビルドごとに成功・失敗・修正されたテストを追跡できます。"
---

WebdriverIOは、[Bamboo](https://www.atlassian.com/software/bamboo)のようなCIシステムとの緊密な統合を提供しています。[JUnit](https://webdriver.io/docs/junit-reporter.html)または[Allure](https://webdriver.io/docs/allure-reporter.html)レポーターを使用すると、テストを簡単にデバッグできるだけでなく、テスト結果を追跡することもできます。統合はとても簡単です。

1. JUnitテストレポーターをインストールします: `$ npm install @wdio/junit-reporter --save-dev`)
1. JUnitの結果をBambooが見つけられる場所に保存するように設定を更新します（また、`junit`レポーターを指定します）:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
注意: *テスト結果はルートフォルダではなく、別のフォルダに保存するのが常に良い慣習です。*

```js
// wdio.conf.js - 並列実行されるテストの場合
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

レポートはすべてのフレームワークで同様になるため、Mocha、Jasmine、Cucumberのいずれを使用しても構いません。

この時点で、テストが作成済みであり、結果が```./testresults/```フォルダに生成され、Bambooが稼働していることを前提とします。

## Bambooにテストを統合する

1. Bambooプロジェクトを開きます
    > 新しいプランを作成し、リポジトリをリンクして（常にリポジトリの最新バージョンを指すようにしてください）、ステージを作成します

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    ここではデフォルトのステージとジョブを使用します。必要に応じて、独自のステージやジョブを作成できます

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. テストジョブを開き、Bambooでテストを実行するためのタスクを作成します
    >**タスク 1:** ソースコードのチェックアウト

    >**タスク 2:** テストを実行します ```npm i && npm run test```。上記のコマンドを実行するには、*Script*タスクと*Shell Interpreter*を使用できます（これによりテスト結果が生成され、```./testresults/```フォルダに保存されます）

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**タスク: 3** 保存されたテスト結果を解析するために*jUnit Parser*タスクを追加します。ここでテスト結果のディレクトリを指定してください（Antスタイルのパターンも使用できます）

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    注意: *テストタスクが失敗した場合でも常に実行されるように、結果パーサータスクは必ず*Final*セクションに配置してください*

    >**タスク: 4**（任意）テスト結果が古いファイルと混ざらないようにするために、Bambooへの解析が成功した後に```./testresults/```フォルダを削除するタスクを作成できます。結果を削除するには```rm -f ./testresults/*.xml```、フォルダ全体を削除するには```rm -r testresults```のようなシェルスクリプトを追加できます

上記の*ロケットサイエンス*が完了したら、プランを有効にして実行してください。最終的な出力は次のようになります:

## 成功したテスト

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## 失敗したテスト

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## 失敗して修正されたテスト

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

やった！！これで完了です。WebdriverIOのテストをBambooに正常に統合できました。