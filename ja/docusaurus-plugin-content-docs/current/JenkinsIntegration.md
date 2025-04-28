---
id: jenkins
title: Jenkins
---

WebdriverIOは[Jenkins](https://jenkins-ci.org)のようなCIシステムとの緊密な統合を提供しています。`junit`レポーターを使用すると、テストのデバッグや結果の追跡が簡単にできます。統合は非常に簡単です。

1. `junit`テストレポーターをインストールします: `$ npm install @wdio/junit-reporter --save-dev`)
1. Jenkinsが見つけられる場所にXUnit結果を保存するように設定を更新します
    （そして`junit`レポーターを指定します）：

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

どのフレームワークを選択するかはあなた次第です。レポートは似たようなものになります。
このチュートリアルでは、Jasmineを使用します。

いくつかのテストを書いた後、新しいJenkinsジョブをセットアップできます。名前と説明を付けます：

![Name And Description](/img/jenkins/jobname.png "Name And Description")

次に、常にリポジトリの最新バージョンを取得するようにします：

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**ここが重要なポイントです：** シェルコマンドを実行する`build`ステップを作成します。`build`ステップはプロジェクトをビルドする必要があります。このデモプロジェクトは外部アプリをテストするだけなので、何もビルドする必要はありません。nodeの依存関係をインストールして`npm test`コマンド（これは`node_modules/.bin/wdio test/wdio.conf.js`のエイリアスです）を実行するだけです。

AnsiColorのようなプラグインをインストールしているのにログが色付けされない場合は、環境変数`FORCE_COLOR=1`を付けてテストを実行してください（例：`FORCE_COLOR=1 npm test`）。

![Build Step](/img/jenkins/runjob.png "Build Step")

テスト後、JenkinsにXUnitレポートを追跡させたいでしょう。そのためには、_「Publish JUnit test result report」_という名前のポストビルドアクションを追加する必要があります。

XUnitを追跡するための外部プラグインをインストールすることもできます。JUnitのものは基本的なJenkinsインストールに付属しており、現時点では十分です。

設定ファイルによると、XUnitレポートはプロジェクトのルートディレクトリに保存されます。これらのレポートはXMLファイルです。そのため、レポートを追跡するために必要なのは、ルートディレクトリ内のすべてのXMLファイルをJenkinsに指定することだけです：

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

以上です！これでWebdriverIOジョブを実行するためのJenkinsのセットアップが完了しました。ジョブは、履歴チャート、失敗したジョブのスタックトレース情報、各テストで使用されたペイロード付きのコマンドリストなど、詳細なテスト結果を提供します。

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")