---
id: cloudservices
title: クラウドサービスの使用
---

WebdriverIOでSauce Labs、Browserstack、TestingBot、LambdaTest、Perfectoなどのオンデマンドサービスを使用するのは非常に簡単です。必要なのは、サービスの`user`と`key`をオプションに設定するだけです。

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

テストを[Sauce Labs](https://saucelabs.com)でリモート実行するように設定できます。

唯一の要件は、設定（`wdio.conf.js`でエクスポートされるか、`webdriverio.remote(...)`に渡される）に、Sauce Labsのユーザー名とアクセスキーを`user`と`key`として設定することです。

また、任意のブラウザの機能としてオプションの[テスト設定オプション](https://docs.saucelabs.com/dev/test-configuration-options/)をキー/値として渡すこともできます。

### Sauce Connect

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外なので、自分で起動する必要があります。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)をダウンロードして設定します。これはSauce Connectの実行を支援し、テストをSauceサービスに統合するための追加機能も提供します。

### Travis CIとの連携

Travis CIは、各テストの前にSauce Connectを起動する[サポート](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)が組み込まれているので、その指示に従うことがオプションです。

その場合、各ブラウザの`capabilities`に`tunnel-identifier`テスト設定オプションを設定する必要があります。Travisはデフォルトでこれを`TRAVIS_JOB_NUMBER`環境変数に設定します。

また、Sauce Labsでビルド番号ごとにテストをグループ化したい場合は、`build`を`TRAVIS_BUILD_NUMBER`に設定できます。

最後に、`name`を設定すると、このビルドのSauce Labsでのテスト名が変更されます。WDIOテストランナーと[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)を組み合わせて使用している場合、WebdriverIOは自動的にテストに適切な名前を設定します。

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

テストをリモートで実行しているため、一部のタイムアウトを増やす必要がある場合があります。

テスト設定オプションとして`idle-timeout`を渡すことで、[アイドルタイムアウト](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)を変更できます。これにより、Sauceが接続を閉じる前にコマンド間でどれだけ待機するかが制御されます。

## BrowserStack

WebdriverIOには[Browserstack](https://www.browserstack.com)との統合機能も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`でエクスポートされるか、`webdriverio.remote(...)`に渡される）に、Browserstackの自動化ユーザー名とアクセスキーを`user`と`key`として設定することです。

また、任意のブラウザの機能としてオプションの[サポートされている機能](https://www.browserstack.com/automate/capabilities)をキー/値として渡すこともできます。`browserstack.debug`を`true`に設定すると、セッションの画面録画が記録され、役立つ場合があります。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.browserstack.com/local-testing#command-line)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外なので、自分で起動する必要があります。

ローカルを使用する場合は、機能に`browserstack.local`を`true`に設定する必要があります。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service)をダウンロードして設定します。これはBrowserStackの実行を支援し、テストをBrowserStackサービスに統合するための追加機能も提供します。

### Travis CIとの連携

Travisでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトは、ダウンロードしてバックグラウンドで起動します。テストを開始する前にTravisでこれを実行する必要があります。

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

また、`build`をTravisビルド番号に設定することもできます。

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

唯一の要件は、設定（`wdio.conf.js`でエクスポートされるか、`webdriverio.remote(...)`に渡される）に、[TestingBot](https://testingbot.com)のユーザー名とシークレットキーを`user`と`key`として設定することです。

また、任意のブラウザの機能としてオプションの[サポートされている機能](https://testingbot.com/support/other/test-options)をキー/値として渡すこともできます。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://testingbot.com/support/other/tunnel)を使用する必要があります。TestingBotは、インターネットからアクセスできないウェブサイトをテストできるようにするJavaベースのトンネルを提供しています。

彼らのトンネルサポートページには、これを起動して実行するために必要な情報が含まれています。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service)をダウンロードして設定します。これはTestingBotの実行を支援し、テストをTestingBotサービスに統合するための追加機能も提供します。

## LambdaTest

[LambdaTest](https://www.lambdatest.com)との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`でエクスポートされるか、`webdriverio.remote(...)`に渡される）に、LambdaTestアカウントのユーザー名とアクセスキーを`user`と`key`として設定することです。

また、任意のブラウザの機能としてオプションの[サポートされている機能](https://www.lambdatest.com/capabilities-generator/)をキー/値として渡すこともできます。`visual`を`true`に設定すると、セッションの画面録画が記録され、役立つ場合があります。

### ローカルテスト用トンネル

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外なので、自分で起動する必要があります。

ローカルを使用する場合は、機能に`tunnel`を`true`に設定する必要があります。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service)をダウンロードして設定します。これはLambdaTestの実行を支援し、テストをLambdaTestサービスに統合するための追加機能も提供します。

### Travis CIとの連携

Travisでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトは、ダウンロードしてバックグラウンドで起動します。テストを開始する前にTravisでこれを実行する必要があります。

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

また、`build`をTravisビルド番号に設定することもできます。

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

wdioと[`Perfecto`](https://www.perfecto.io)を使用する場合、各ユーザーのセキュリティトークンを作成し、以下のように機能構造に追加する必要があります（他の機能に加えて）：

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