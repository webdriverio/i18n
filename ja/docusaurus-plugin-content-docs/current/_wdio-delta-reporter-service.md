---
id: wdio-delta-reporter-service
title: Delta Reporter レポーター
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)をご覧ください。




> [Delta reports](https://github.com/delta-reporter/delta-reporter)を作成するためのWebdriverIOレポータープラグイン


![Screenshot of Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## インストール


最も簡単な方法は、`@delta-reporter/wdio-delta-reporter-service`を`package.json`のdevDependencyとして保持することです。

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

以下の方法で簡単に行えます：

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## 設定


Delta reporterのWebdriverIOプラグインは、[WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio)と[Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter)の組み合わせで構成されています。そのため、設定ファイルでレポーターとサービスの両方として宣言する必要があります。


```js
const DeltaReporter = require('@delta-reporter/wdio-delta-reporter-service/lib/src/reporter');
const DeltaService = require("@delta-reporter/wdio-delta-reporter-service");

let delta_config = {
  enabled: true,
  host: 'delta_host',
  project: 'Project Name',
  testType: 'Test Type'
};

exports.config = {
  // ...
  reporters: [
    [DeltaReporter, delta_config]
  ],
  // ...
  services: [new DeltaService(delta_config)],
  // ...
}
```


## スクリーンショットとビデオの追加

スクリーンショットは、wdio設定ファイルのafterTestフックで`sendFileToTest`コマンドを使用してレポートに添付できます。パラメーターは`type`、`file`、`description`です：
- `type`：`img`または`video`にすることができます
- `file`：アップロードするファイルへのパス
- `description`：Delta Reporterのメディアコンテナに表示されるオプション値

上記の例に示すように、この関数が呼び出され、テストが失敗した場合、スクリーンショット画像がDeltaレポートに添付されます。


```js
 afterTest(test) {
    if (test.passed === false) {
      const file_name = 'screenshot.png';
      const outputFile = path.join(__dirname, file_name);

      browser.saveScreenshot(outputFile);
      browser.sendFileToTest('img', outputFile);
    }
  }
```


以下は、[Video Reporter](https://github.com/presidenten/wdio-video-reporter)と一緒にこのプラグインを使用するためにwdio設定ファイルに必要なすべての部分の例です。これにより、Delta Reporterは失敗したテストのスクリーンショットとビデオを表示します：



```js
var path = require('path');
const fs = require('fs');
const video = require('wdio-video-reporter');
const DeltaReporter = require('@delta-reporter/wdio-delta-reporter-service/lib/src/reporter');
const DeltaService = require("@delta-reporter/wdio-delta-reporter-service");

// ...

function getLatestFile({ directory, extension }, callback) {
  fs.readdir(directory, (_, dirlist) => {
    const latest = dirlist
      .map(_path => ({ stat: fs.lstatSync(path.join(directory, _path)), dir: _path }))
      .filter(_path => _path.stat.isFile())
      .filter(_path => (extension ? _path.dir.endsWith(`.${extension}`) : 1))
      .sort((a, b) => b.stat.mtime - a.stat.mtime)
      .map(_path => _path.dir);
    callback(directory + '/' + latest[0]);
  });
}

let delta_config = {
  enabled: true,
  host: 'delta_host', // put your Delta Core url here
  project: 'Project Name', // Name of your project
  testType: 'Test Type' // eg., End to End, E2E, Frontend Acceptance Tests
};

// ...

exports.config = {
  // ...
  reporters: [
    [DeltaReporter, delta_config]
  ],
  // ...
  services: [new DeltaService(delta_config)],


  // ...


  afterTest(test) {
    if (test.passed === false) {
      const file_name = 'screenshot.png';
      const outputFile = path.join(__dirname, file_name);

      browser.saveScreenshot(outputFile);
      browser.sendFileToTest('img', outputFile);

      getLatestFile({ directory: browser.options.outputDir + '/_results_', extension: 'mp4' }, (filename = null) => {
        browser.sendFileToTest('video', filename, 'Video captured during test execution');
      });
    }
  }

  // ...

}
```

## 使用方法

各テスト実行では、DeltaプラグインはDELTA_LAUNCH_IDをリッスンしています。主に2つのケースがあります：

- ローカル実行：何も操作する必要はありません。wdioコマンド（`./node_modules/.bin/wdio ./wdio.conf.js`）を実行するだけで、DELTA_LAUNCH_IDが自動的に生成され、テスト結果がリアルタイムでDelta Reporterに表示されます。

- CI実行：テストジョブの場合、DELTA_LAUNCH_IDをパラメータとして定義する必要があります。ステージ内で`/api/v1/launch`エンドポイントを呼び出してこれを初期化し、その後`DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}`を前置してテストを実行します。初期化は一度だけ行われるので、同じビルド内で複数のテストタイプ（UIテスト、APIテスト、ユニットテストなど）を実行する場合、これらのテストはDelta Reporter上で1つの「Launch」の下に収集されます。

以下はJenkinsジョブの設定ファイル用のコード例です：

```groovy
// ...
  parameters {
      string defaultValue: '', description: 'Launch ID sent by a pipeline, leave it blank', name: 'DELTA_LAUNCH_ID', trim: false
  }

// ...

  stage('Run WDIO tests') {
    environment {
      DELTA_LAUNCH_ID = ""
    }
    steps {
      container('jenkins-node-worker') {
        script {
          try {
            DELTA_LAUNCH_ID=sh(script: "curl -s --header \"Content-Type: application/json\" --request POST --data '{\"name\": \"${JOB_NAME} | ${BUILD_NUMBER} | Wdio Tests\", \"project\": \"Your project\"}' https://delta-core-url/api/v1/launch | python -c 'import sys, json; print(json.load(sys.stdin)[\"id\"])';", returnStdout: true)
          } catch (Exception e) {
              echo 'Couldn\'t start launch on Delta Reporter: ' + e
          }
          
          sh "DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID} TEST_TYPE='Frontend Acceptance Tests' ./node_modules/.bin/wdio ./wdio.conf.js"
        }
      }
    }  
  }
```

## Delta Reporterに追加データを送信する

SmartLinks機能を使用して、Delta Reporterに表示するためのカスタムデータを送信することができます。

これには、情報を表示したい場所に応じて、コマンド`browser.sendDataToTest`または`sendDataToTestRun`を使用します。

これらのメソッドは引数としてJSON化されたオブジェクトを受け付けます。

[Spectre](https://github.com/wearefriday/spectre)との統合例：

```ts
  beforeSuite() {
    try {
      let spectreTestRunURL = fs.readFileSync('./.spectre_test_run_url.json');
      let test_run_payload = {
        spectre_test_run_url: spectreTestRunURL.toString()
      };
      browser.sendDataToTestRun(test_run_payload);
    } catch {
      log.info('No Spectre URL found');
    }
  }
```

その後、Delta Reporterでは、テスト実行のために`{spectre_test_run_url}`を含むSmartLinkを作成できます。

Smart Linksの詳細については、[Delta Reporterのドキュメント](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)をご確認ください。