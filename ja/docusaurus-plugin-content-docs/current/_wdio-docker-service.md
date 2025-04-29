---
id: wdio-docker-service
title: Dockerサービス
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)をご覧ください。

このサービスは[WebdriverIO](http://webdriver.io/)と共に使用することを目的としており、コンテナ化されたアプリケーションに対する/を使用した機能/統合テストの実行を支援します。一般的な[Docker](https://www.docker.com/)サービス（別途インストール）を使用してコンテナを実行します。

## なぜ使用するのか？
理想的には、テストは何らかのCI/CDパイプラインで実行され、そこには「実際の」ブラウザやアプリケーションが依存する他のリソースがない場合が多いです。Dockerの出現により、事実上すべての必要なアプリケーション依存関係をコンテナ化できるようになりました。
このサービスを使用すると、アプリケーションコンテナや[docker-selenium](https://github.com/SeleniumHQ/docker-selenium)をCIで完全に分離して実行できます（CIがDockerを依存関係としてインストールできることを前提としています）。アプリケーションがメインOSから一定レベルの分離を必要とする場合は、ローカル開発にも同じことが適用されます。

## 動作の仕組み
サービスは既存のDockerイメージを実行し、準備ができるとコンテナ化されたアプリケーションに対して実行されるべきWebdriverIOテストを開始します。

## インストール

実行：

```bash
npm install wdio-docker-service --save-dev
```

WebdriverIOのインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定
デフォルトでは、ホストシステムにインストールされている場合、Google Chrome、Firefox、PhantomJSが利用可能です。
サービスを使用するには、サービス配列に`docker`を追加する必要があります：

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## オプション

### dockerOptions
Dockerコンテナを実行するために必要な様々なオプション

型: `Object`

デフォルト: `{ 
    options: {
        rm: true
    }
}`

例：

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Dockerコンテナの名前タグ。ローカルまたはDocker HUBからのものが可能です。

型: `String`

必須: `true`

### dockerOptions.healthCheck
テストを開始する前にコンテナの準備状況を確認する設定。通常、これはlocalhostのURLになります。
healthCheckが設定されていない場合、WebdriverはDockerコンテナが起動した直後にテストの実行を開始しますが、
Dockerコンテナ内でウェブサービスが起動するまでには時間がかかるため、早すぎる可能性があります。

型: `String|Object`

オブジェクト使用のオプション：
- *url* - コンテナ内で実行されているアプリのURL
- *maxRetries* - ヘルスチェックが失敗するまでの再試行回数。デフォルト：10
- *inspectInterval* - 各再試行間隔（ミリ秒）。デフォルト：500
- *startDelay* - ヘルスチェックを開始するまでの初期遅延（ミリ秒）。デフォルト：0

例1（文字列）: `healthCheck: 'http://localhost:4444'`

例2（オブジェクト）:

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
`docker run`コマンドで使用されるオプションのマップ。`run`コマンドの詳細については[こちら](https://docs.docker.com/edge/engine/reference/commandline/run/)をクリックしてください。

単一文字のオプションは`-[option]`に変換されます（例：`d: true` -> `-d`）。

2文字以上のオプションは`--[option]`に変換されます（例：`rm: true` -> `--rm`）。

複数回使用される可能性のあるオプション（例：`-e`、`-add-host`、`--expose`など）には、配列表記を使用してください（例：`e: ["NODE_ENV=development", "FOO=bar"]`）。

型: `Object`

例：

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
コンテナに渡したい引数。Docker run CLIの`[ARG...]`に対応します。

型: `String`

### dockerOptions.command
コンテナに渡したいコマンド。Docker run CLIの`[COMMAND]`に対応します。

型: `String`

### onDockerReady
Dockerアプリケーションの準備ができたときに呼び出されるコールバックメソッド。準備状況は`healthCheck` URLへのpingが可能かどうかによって決定されます。

型: `Function`

### dockerLogs
Dockerコンテナからのログが保存されるパス

型: `String`

## テストユースケース/レシピ
詳細については[Wiki](https://github.com/stsvilik/wdio-docker-service/wiki)をご覧ください。