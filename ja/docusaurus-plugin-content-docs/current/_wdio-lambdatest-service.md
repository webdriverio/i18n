---
id: wdio-lambdatest-service
title: LambdaTest サービス
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service は、サードパーティのパッケージです。詳細については [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service) をご覧ください。

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> LambdaTest ユーザー向けにトンネルとジョブメタデータを管理する WebdriverIO サービスです。

## インストール

```bash
npm i wdio-lambdatest-service --save-dev
```

`WebdriverIO` のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted.html)をご覧ください。


## 設定

WebdriverIO には標準で LambdaTest のサポートが組み込まれています。`wdio.conf.js` ファイルに `user` と `key` を設定するだけです。アプリ自動化機能を有効にするには、`wdio.conf.js` ファイルに `product: 'appAutomation'` を設定します。このサービスプラグインは [LambdaTest トンネル](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/) をサポートしています。この機能を有効にするには `tunnel: true` も設定してください。

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### 自動化ダッシュボードにテストエラーの説明を表示するには
自動化ダッシュボードにテストエラーの説明を表示するには、`wdio.conf.js` に `ltErrorRemark: true` を追加するだけです。


### ローカルまたはURLからアプリをアップロードするには
必要な設定を `wdio.conf.js` に追加することで、ローカルまたはホストされたアプリのURLから `android` または `ios` アプリをアップロードできます。同じ実行でテスト用にアップロードしたアプリを使用するには、`enableCapability = true` を設定します。これにより、capabilities にアプリのURL値が設定されます。

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //希望するアプリ名を指定
            app_path : "/path/to/your/app/file", //ローカルアプリの場所を指定
            // または
            app_url : "https://example.test_android.apk", //アプリがホストまたは保存されているURLを指定
            custom_id : "12345", //希望するカスタムIDを指定
            enableCapability : true
        }
    }
    ]
]
```

## オプション

LambdaTest サービスの認証を行うには、設定に [`user`](https://webdriver.io/docs/options.html#user) と [`key`](https://webdriver.io/docs/options.html#key) オプションが含まれている必要があります。

### tunnel
LambdaTest クラウドからの接続をコンピュータ経由でルーティングするには、これを true に設定します。また、ブラウザの capabilities で `tunnel` を true に設定する必要があります。

型: `Boolean`<br />
デフォルト: `false`

### lambdatestOpts
指定されたオプションは LambdaTest トンネルに渡されます。

型: `Object`<br />
デフォルト: `{}`

以下は、利用可能なすべてのオプションの包括的なリストです：

#### tunnelName
使用するカスタム LambdaTest トンネル名を指定します。

**例:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
LambdaTest トンネルをアクティブにするポート。

**例:**
```json
{"port": 33000}
```
#### user
LambdaTest ユーザー名。

**例:**
```json
{"user": "your_username"}
```

#### key
LambdaTest アクセスキー。

**例:**
```json
{"key": "your_access_key"}
```

#### verbose
すべてのプロキシリクエストを標準出力にログ出力するかどうか。

**例:**
```json
{"verbose": true}
```

#### logFile
LambdaTest トンネルログファイルの場所。

**例:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

使用する設定ファイルのパス。
**例:**
```json
{"config": "/path/to/config/file"}
```

#### dir
トンネルポートでファイルサーバーによって提供されるローカルディレクトリを指定します。

**例:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
トンネルプロキシポートのホスト名を指定します。

**例:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
トンネルプロキシポートのユーザー名を指定します。

**例:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
トンネルプロキシポートのパスワードを指定します。

**例:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
トンネルプロキシがアクティブになるポート番号を指定します。

**例:**
```json
{"proxyPort": 8080}
```

#### egressOnly
送信リクエストにのみプロキシ設定を使用します。

**例:**
```json
{"egressOnly": true}
```


#### ingressOnly
指定されたプロキシ経由で着信トラフィックのみをルーティングします。

**例:**
```json
{"ingressOnly": true}
```


#### pacfile
ローカルテストで PAC（プロキシ自動設定）を使用するには、
PAC ファイルのパスを提供します。

**例:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
LambdaTest トンネル用の[ロードバランシング](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/)を有効にします。

**例:**
```json
{"loadBalanced": true}
```

#### mode
トンネルが実行するモード「ssh」または「ws」を指定します（デフォルトは「ssh」）。

**例:**
```json
{"mode": "ssh"}
```

#### sshConnType
ssh 接続のタイプを指定します（over_22、over_443、over_ws）。--sshConnType を使用するには、最初に ––mode ssh フラグを指定してください。

**例:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
トンネルクライアントからトンネルサーバーへの SSH 接続を増やします。最大許容値は 30 です。

**例:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
チームメンバー間でトンネルを共有します。

**例:**
```json
{"sharedTunnel": true}
```

#### env
LambdaTest トンネルが実行される環境。

**例:**
```json
{"env": "production"}
```


#### infoAPIPort
指定したポートで[トンネル情報 API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis)を公開します。

**例:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
トンネルステータスのコールバック URL。

**例:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
トンネル経由でルーティングするホストのカンマ区切りリスト。それ以外はインターネット経由でルーティングされます。

**例:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
トンネルから除外するホストのカンマ区切りリスト。これらはインターネット経由でルーティングされます。

**例:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
mTLS クライアント証明書のファイルパス。

**例:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
mTLS クライアントキーのファイルパス。

**例:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
mTLS ホストのカンマ区切りリスト。

**例:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
DNS サーバーのカンマ区切りリスト。

**例:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
LambdaTest トンネルの [MITM（中間者）](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) モードを有効にします。

**例:**
```json
{"mitm": true}
```

#### ntlm
通信またはトランスポートの目的で Microsoft NTLM（Windows NT LAN Manager）認証を使用します。

**例:**
```json
{"ntlm": true}
```

#### pidfile
プロセス ID が書き込まれる pidfile のパス。

**例:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
リモートアドレスをクライアントマシンの内部 IP に設定します。

**例:**
```json
{"usePrivateIp": true}
```

これらのオプションの詳細については[こちら](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/)をご覧ください。

### preferScenarioName
Cucumber のみ。単一のシナリオが実行された場合、セッション名をシナリオ名に設定します。
[wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) で並列実行する場合に便利です。

型: `Boolean`<br />
デフォルト: `false`

### sessionNameFormat
セッション名のフォーマットをカスタマイズします。

型: `Function`<br />
デフォルト (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
デフォルト (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Mocha のみ。セッション名にテストタイトルを追加しません。

型: `Boolean`<br />
デフォルト: `false`

### sessionNamePrependTopLevelSuiteTitle
Mocha のみ。セッション名の前にトップレベルスイートタイトルを追加します。

型: `Boolean`<br />
デフォルト: `false`

### setSessionName
セッション名を自動的に設定します。

型: `Boolean`<br />
デフォルト: `true`

### setSessionStatus
セッションステータス（合格/不合格）を自動的に設定します。

型: `Boolean`<br />
デフォルト: `true`


### ignoreTestCountInName
名前のテスト再試行回数を無視します

型: `Boolean`<br />
デフォルト: `false`


### useScenarioName
Cucumber 固有のテストのテスト名をシナリオ名として取得するには、`wdio.conf.js` に `useScenarioName: true` を追加するだけです。

## コンパイルおよび公開する手順
1. このリポジトリを git clone します。
2. "npm install" を実行します
3. "npm run build" を実行します
4. 公開手順: "npm login" を実行します
5. "npm publish --access public" を実行します

----

WebdriverIO の詳細については、[ホームページ](https://webdriver.io)をご覧ください。