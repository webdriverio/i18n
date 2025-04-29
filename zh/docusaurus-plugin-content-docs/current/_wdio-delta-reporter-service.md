---
id: wdio-delta-reporter-service
title: Delta Reporter 报告器
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> 一个 WebdriverIO 报告插件，用于创建 [Delta reports](https://github.com/delta-reporter/delta-reporter)


![Screenshot of Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## 安装


最简单的方式是将 `@delta-reporter/wdio-delta-reporter-service` 作为 devDependency 保存在你的 `package.json` 中。

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

你可以简单地通过以下方式安装：

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## 配置


Delta reporter WebdriverIO 插件是 [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) 和 [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter) 的混合，所以需要在配置文件中同时声明为 reporter 和 service。


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


## 添加截图和视频

可以通过在 wdio 配置文件的 afterTest 钩子中使用 `sendFileToTest` 命令将截图附加到报告中。参数为 `type`、`file` 和 `description`：
- `type`：可以是 `img` 或 `video`
- `file`：要上传的文件路径
- `description`：可选值，将显示在 Delta Reporter 的媒体容器中


如上例所示，当调用此函数并且测试失败时，截图图像将被附加到 Delta 报告中。


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


下面是 wdio 配置文件中使用此插件所需的所有部分的例子，结合 [Video Reporter](https://github.com/presidenten/wdio-video-reporter)，这样 Delta Reporter 可以显示失败测试的截图和视频：



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

对于每次测试运行，Delta 插件都会监听 DELTA_LAUNCH_ID。主要有两种情况：

- 本地运行：不需要做任何事情，你只需运行你的 wdio 命令（`./node_modules/.bin/wdio ./wdio.conf.js`），DELTA_LAUNCH_ID 将自动为你生成，这样你的测试结果就会实时显示在 Delta Reporter 中。

- CI 运行：如果是你的测试任务，你将需要定义 DELTA_LAUNCH_ID 作为参数。然后在你的阶段内，你需要通过调用 `/api/v1/launch` 端点来初始化它，然后在运行测试时前置 `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}`。初始化只需完成一次，所以当你在同一个构建中运行多种测试类型（比如 UI 测试、API 测试、单元测试）时，这些测试都会在 Delta Reporter 上的一个"Launch"下汇总。

下面是 Jenkins 作业配置文件的代码示例：

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

## 向 Delta Reporter 发送额外数据

可以使用 SmartLinks 功能发送自定义数据以显示在 Delta Reporter 中。

为此，请使用 `browser.sendDataToTest` 或 `sendDataToTestRun` 命令，具体取决于你想在哪里显示此信息

这些方法接受一个 jsonify 对象作为参数

与 [Spectre](https://github.com/wearefriday/spectre) 集成的示例

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

然后在 Delta Reporter 上，可以为测试运行创建带有 `{spectre_test_run_url}` 的 SmartLink

有关 Smart Links 的更多信息，请查看 [Delta Reporter 文档](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)