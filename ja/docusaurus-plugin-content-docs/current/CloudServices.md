---
id: cloudservices
title: クラウドサービスの使用
---

WebdriverIOでSauce Labs、Browserstack、TestingBot、LambdaTest、Perfectoのようなオンデマンドサービスを使用することは非常に簡単です。あなたのオプションにサービスの`user`と`key`を設定するだけです。

オプションで、`build`のようなクラウド固有の機能を設定してテストをパラメータ化することもできます。Travisでのみクラウドサービスを実行したい場合は、`CI`環境変数を使用してTravisにいるかどうかを確認し、それに応じて設定を変更できます。

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

[Sauce Labs](https://saucelabs.com)でリモートでテストを実行するように設定できます。

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）で`user`と`key`をSauce Labsのユーザー名とアクセスキーに設定することです。

また、任意のブラウザの機能として、オプションの[テスト構成オプション](https://docs.saucelabs.com/dev/test-configuration-options/)をキー/値として渡すこともできます。

### Sauce Connect

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外なので、自分で起動する必要があります。

WDIO testrunnerを使用している場合は、`wdio.conf.js`で[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)をダウンロードして設定してください。これによりSauce Connectの実行が容易になり、テストをSauceサービスにより適切に統合する追加機能が提供されます。

### Travis CIとの連携

Travis CIは、各テストの前にSauce Connectを起動する[サポート](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)を提供しています。そのため、その指示に従うことも選択肢の一つです。

そうする場合は、各ブラウザの`capabilities`で`tunnel-identifier`テスト構成オプションを設定する必要があります。Travisはデフォルトでこれを`TRAVIS_JOB_NUMBER`環境変数に設定します。

また、Sauce Labsでビルド番号ごとにテストをグループ化したい場合は、`build`を`TRAVIS_BUILD_NUMBER`に設定できます。

最後に、`name`を設定すると、このビルドのSauce Labsでのテスト名が変更されます。WDIO testrunnerと[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)を組み合わせて使用している場合、WebdriverIOは自動的にテストに適切な名前を設定します。

`capabilities`の例：

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### タイムアウト

リモートでテストを実行しているため、いくつかのタイムアウトを増やす必要があるかもしれません。

テスト構成オプションとして`idle-timeout`を渡すことで[アイドルタイムアウト](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)を変更できます。これにより、Sauceが接続を閉じる前にコマンド間でどれくらい待機するかを制御します。

## BrowserStack

WebdriverIOには[Browserstack](https://www.browserstack.com)との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）で`user`と`key`をBrowserstackの自動化ユーザー名とアクセスキーに設定することです。

また、任意のブラウザの機能として、オプションの[サポートされている機能](https://www.browserstack.com/automate/capabilities)をキー/値として渡すこともできます。`browserstack.debug`を`true`に設定すると、セッションのスクリーンキャストが記録され、役立つかもしれません。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.browserstack.com/local-testing#command-line)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外なので、自分で起動する必要があります。

ローカルを使用する場合は、機能で`browserstack.local`を`true`に設定する必要があります。

WDIO testrunnerを使用している場合は、`wdio.conf.js`で[`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service)をダウンロードして設定してください。これによりBrowserStackの実行が容易になり、テストをBrowserStackサービスにより適切に統合する追加機能が提供されます。

### Travis CIとの連携

Travisでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトはダウンロードしてバックグラウンドで起動します。テストを開始する前にTravisでこれを実行する必要があります。

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

また、`build`をTravisのビルド番号に設定することもできます。

`capabilities`の例：

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）で`user`と`key`を[TestingBot](https://testingbot.com)のユーザー名とシークレットキーに設定することです。

また、任意のブラウザの機能として、オプションの[サポートされている機能](https://testingbot.com/support/other/test-options)をキー/値として渡すこともできます。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://testingbot.com/support/other/tunnel)を使用する必要があります。TestingBotは、インターネットからアクセスできないウェブサイトをテストできるようにするJavaベースのトンネルを提供しています。

彼らのトンネルサポートページには、これを起動して実行するために必要な情報が含まれています。

WDIO testrunnerを使用している場合は、`wdio.conf.js`で[`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service)をダウンロードして設定してください。これによりTestingBotの実行が容易になり、テストをTestingBotサービスにより適切に統合する追加機能が提供されます。

## LambdaTest

[LambdaTest](https://www.lambdatest.com)との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）で`user`と`key`をLambdaTestアカウントのユーザー名とアクセスキーに設定することです。

また、任意のブラウザの機能として、オプションの[サポートされている機能](https://www.lambdatest.com/capabilities-generator/)をキー/値として渡すこともできます。`visual`を`true`に設定すると、セッションのスクリーンキャストが記録され、役立つかもしれません。

### ローカルテスト用トンネル

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外なので、自分で起動する必要があります。

ローカルを使用する場合は、機能で`tunnel`を`true`に設定する必要があります。

WDIO testrunnerを使用している場合は、`wdio.conf.js`で[`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service)をダウンロードして設定してください。これによりLambdaTestの実行が容易になり、テストをLambdaTestサービスにより適切に統合する追加機能が提供されます。

### Travis CIとの連携

Travisでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトはダウンロードしてバックグラウンドで起動します。テストを開始する前にTravisでこれを実行する必要があります。

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

また、`build`をTravisのビルド番号に設定することもできます。

`capabilities`の例：

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

wdioと[`Perfecto`](https://www.perfecto.io)を使用する場合、各ユーザーのセキュリティトークンを作成し、それを以下のようにcapabilities構造に追加する必要があります：

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

さらに、以下のようにクラウド設定を追加する必要があります：

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```