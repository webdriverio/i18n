---
id: jenkins
title: Jenkins
---

WebdriverIOは[Jenkins](https://jenkins-ci.org)のようなCIシステムとの緊密な統合を提供しています。`junit`レポーターを使用することで、テストのデバッグやテスト結果の追跡が簡単にできます。統合は非常に簡単です。

1. `junit`テストレポーターをインストールします：`$ npm install @wdio/junit-reporter --save-dev`)
1. JenkinsがXUnit結果を見つけられる場所に保存するようにコンフィグを更新し、
    （`junit`レポーターを指定します）：

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

どのフレームワークを選ぶかはあなた次第です。レポートは似たようなものになります。
このチュートリアルでは、Jasmineを使用します。

いくつかのテストを書いた後、新しいJenkinsジョブをセットアップできます。名前と説明を付けましょう：

![名前と説明](/img/jenkins/jobname.png "名前と説明")

そして、常にリポジトリの最新バージョンを取得するようにします：

![Jenkins Gitセットアップ](/img/jenkins/gitsetup.png "Jenkins Gitセットアップ")

**ここが重要なポイントです：** シェルコマンドを実行する`build`ステップを作成します。`build`ステップはプロジェクトをビルドする必要があります。このデモプロジェクトは外部アプリをテストするだけなので、何もビルドする必要はありません。node依存関係をインストールして`npm test`コマンド（これは`node_modules/.bin/wdio test/wdio.conf.js`のエイリアスです）を実行するだけです。

AnsiColorのようなプラグインをインストールしてもログに色がつかない場合は、環境変数`FORCE_COLOR=1`を付けてテストを実行してください（例：`FORCE_COLOR=1 npm test`）。

![ビルドステップ](/img/jenkins/runjob.png "ビルドステップ")

テスト後、JenkinsにXUnitレポートを追跡させたいでしょう。そのためには、_"Publish JUnit test result report"_と呼ばれるポストビルドアクションを追加する必要があります。

XUnitを追跡するための外部XUnitプラグインをインストールすることもできます。JUnitのものは基本的なJenkinsインストールに付属しており、今のところ十分です。

コンフィグファイルによると、XUnitレポートはプロジェクトのルートディレクトリに保存されます。これらのレポートはXMLファイルです。レポートを追跡するために必要なのは、JenkinsをルートディレクトリのすべてのXMLファイルにポイントすることだけです：

![ポストビルドアクション](/img/jenkins/postjob.png "ポストビルドアクション")

これで完了です！WebdriverIOジョブを実行するようにJenkinsをセットアップしました。ジョブは詳細なテスト結果を提供し、履歴チャート、失敗したジョブのスタックトレース情報、各テストで使用されたペイロード付きのコマンドリストが含まれています。

![Jenkins最終統合](/img/jenkins/final.png "Jenkins最終統合")