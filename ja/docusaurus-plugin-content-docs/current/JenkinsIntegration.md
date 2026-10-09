---
id: jenkins
title: Jenkins
description: "JenkinsでWebdriverIOテストを実行し、JUnitレポーターの結果を公開して、失敗のデバッグやテスト履歴の追跡を行います。"
---

WebdriverIOは、[Jenkins](https://jenkins-ci.org)のようなCIシステムとの緊密な統合を提供しています。`junit`レポーターを使用すると、テストを簡単にデバッグできるだけでなく、テスト結果を追跡することもできます。統合は非常に簡単です。

1. `junit`テストレポーターをインストールします: `$ npm install @wdio/junit-reporter --save-dev`)
1. XUnitの結果をJenkinsが見つけられる場所に保存するように設定を更新します
    （そして`junit`レポーターを指定します）:

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

どのフレームワークを選択するかはあなた次第です。レポートは同様のものになります。
このチュートリアルでは、Jasmineを使用します。

いくつかのテストを書いたら、新しいJenkinsジョブをセットアップできます。名前と説明を付けてください:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

次に、常にリポジトリの最新バージョンを取得するようにしてください:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**ここが重要な部分です:** シェルコマンドを実行する`build`ステップを作成します。`build`ステップではプロジェクトをビルドする必要があります。このデモプロジェクトは外部アプリをテストするだけなので、何もビルドする必要はありません。nodeの依存関係をインストールし、`npm test`コマンド（`node_modules/.bin/wdio test/wdio.conf.js`のエイリアス）を実行するだけです。

AnsiColorのようなプラグインをインストールしているにもかかわらずログに色が付かない場合は、環境変数`FORCE_COLOR=1`を指定してテストを実行してください（例: `FORCE_COLOR=1 npm test`）。

![Build Step](/img/jenkins/runjob.png "Build Step")

テストの後、JenkinsにXUnitレポートを追跡させたいでしょう。そのためには、_"Publish JUnit test result report"_ というビルド後の処理を追加する必要があります。

レポートを追跡するために外部のXUnitプラグインをインストールすることもできます。JUnitプラグインはJenkinsの基本インストールに含まれており、現時点ではこれで十分です。

設定ファイルによると、XUnitレポートはプロジェクトのルートディレクトリに保存されます。これらのレポートはXMLファイルです。したがって、レポートを追跡するために必要なのは、Jenkinsにルートディレクトリ内のすべてのXMLファイルを指定することだけです:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

以上です！これで、WebdriverIOジョブを実行するようにJenkinsをセットアップできました。ジョブは、履歴チャート、失敗したジョブのスタックトレース情報、および各テストで使用されたペイロード付きのコマンド一覧を含む詳細なテスト結果を提供するようになります。

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")