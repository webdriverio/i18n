---
id: bamboo
title: Bamboo
---

WebdriverIOは[Bamboo](https://www.atlassian.com/software/bamboo)のようなCIシステムとの緊密な統合を提供しています。[JUnit](https://webdriver.io/docs/junit-reporter.html)または[Allure](https://webdriver.io/docs/allure-reporter.html)レポーターを使用することで、テストのデバッグやテスト結果の追跡が簡単にできます。統合は非常に簡単です。

1. JUnitテストレポーターをインストールします: `$ npm install @wdio/junit-reporter --save-dev`)
1. BambooがJUnit結果を見つけられる場所に保存するように設定を更新します（そして`junit`レポーターを指定します）：

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
注意: *テスト結果をルートフォルダではなく、別のフォルダに保存することは常に良い標準です。*

```js
// wdio.conf.js - 並列でテストを実行する場合
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

レポートはすべてのフレームワークで同様になり、Mocha、JasmineまたはCucumberのいずれかを使用できます。

この時点で、テストが作成され、結果が```./testresults/```フォルダに生成され、Bambooが稼働していると思います。

## BambooにテストをIntegrateする

1. Bambooプロジェクトを開く
    > 新しいプランを作成し、リポジトリをリンクして（常にリポジトリの最新バージョンを指すようにしてください）、ステージを作成します

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    私はデフォルトのステージとジョブで進めます。あなたの場合は、独自のステージとジョブを作成できます

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. テストジョブを開き、Bambooでテストを実行するタスクを作成します
    >**タスク1:** ソースコードのチェックアウト

    >**タスク2:** テストを実行 ```npm i && npm run test```。*Script*タスクと*Shell Interpreter*を使用して上記のコマンドを実行できます（これによりテスト結果が生成され、```./testresults/```フォルダに保存されます）

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**タスク3:** 保存したテスト結果を解析するために*jUnit Parser*タスクを追加します。ここでテスト結果ディレクトリを指定してください（Antスタイルのパターンも使用できます）

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    注意: *テストタスクが失敗した場合でも常に実行されるように、結果パーサータスクを*Final*セクションに配置してください*

    >**タスク4:** （オプション）テスト結果が古いファイルと混ざらないようにするために、Bambooへの解析が成功した後に```./testresults/```フォルダを削除するタスクを作成できます。```rm -f ./testresults/*.xml```のようなシェルスクリプトを追加して結果を削除するか、```rm -r testresults```でフォルダ全体を削除できます

上記の*ロケットサイエンス*が完了したら、プランを有効にして実行してください。最終的な出力は次のようになります：

## 成功したテスト

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## 失敗したテスト

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## 失敗と修正

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

やった！以上です。WebdriverIOテストをBambooに正常に統合しました。