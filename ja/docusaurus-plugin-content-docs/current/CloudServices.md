---
id: cloudservices
title: クラウドサービスの使用
---

WebdriverIOでSauce Labs、Browserstack、TestingBot、TestMu AI（旧LambdaTest）やPerfectoなどのオンデマンドサービスを使用するのは非常に簡単です。必要なのは、オプションにサービスの`user`と`key`を設定するだけです。

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

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）に、Sauce Labsのユーザー名とアクセスキーを`user`と`key`として設定することです。

また、任意のブラウザのケイパビリティに、オプションの[テスト設定オプション](https://docs.saucelabs.com/dev/test-configuration-options/)をキー/値として渡すこともできます。

### Sauce Connect

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外であるため、自分で起動する必要があります。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)をダウンロードして設定してください。これはSauce Connectの実行を支援し、テストをSauceサービスにより適切に統合する追加機能を提供します。

### Travis CIとの連携

ただし、Travis CIは各テストの前にSauce Connectを起動するための[サポート](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)を提供しているため、その指示に従うことも選択肢です。

そうする場合は、各ブラウザの`capabilities`に`tunnel-identifier`テスト設定オプションを設定する必要があります。Travisはデフォルトでこれを`TRAVIS_JOB_NUMBER`環境変数に設定します。

また、Sauce Labsでビルド番号ごとにテストをグループ化したい場合は、`build`を`TRAVIS_BUILD_NUMBER`に設定できます。

最後に、`name`を設定すると、このビルドのSauce Labsでのテスト名が変更されます。WDIOテストランナーを[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)と組み合わせて使用している場合、WebdriverIOは自動的にテストに適切な名前を設定します。

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

テスト設定オプションとして`idle-timeout`を渡すことで[アイドルタイムアウト](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)を変更できます。これは、接続を閉じる前にSauceがコマンド間で待機する時間を制御します。

## BrowserStack

WebdriverIOには[Browserstack](https://www.browserstack.com)との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）に、Browserstackの自動化ユーザー名とアクセスキーを`user`と`key`として設定することです。

また、任意のブラウザのケイパビリティに、オプションの[サポートされているケイパビリティ](https://www.browserstack.com/automate/capabilities)をキー/値として渡すこともできます。`browserstack.debug`を`true`に設定すると、セッションのスクリーンキャストが記録され、役立つ場合があります。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.browserstack.com/local-testing#command-line)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外であるため、自分で起動する必要があります。

ローカルを使用する場合は、ケイパビリティで`browserstack.local`を`true`に設定する必要があります。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service)をダウンロードして設定してください。これはBrowserStackの実行を支援し、テストをBrowserStackサービスにより適切に統合する追加機能を提供します。

### Travis CIとの連携

Travis CIでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトは、ローカルテストをダウンロードしてバックグラウンドで起動します。Travisでテストを開始する前にこれを実行する必要があります。

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

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）に、[TestingBot](https://testingbot.com)のユーザー名とシークレットキーを`user`と`key`として設定することです。

また、任意のブラウザのケイパビリティに、オプションの[サポートされているケイパビリティ](https://testingbot.com/support/other/test-options)をキー/値として渡すこともできます。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://testingbot.com/support/other/tunnel)を使用する必要があります。TestingBotは、インターネットからアクセスできないウェブサイトをテストできるようにするJavaベースのトンネルを提供しています。

トンネルサポートページには、これを起動して実行するために必要な情報が含まれています。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service)をダウンロードして設定してください。これはTestingBotの実行を支援し、テストをTestingBotサービスにより適切に統合する追加機能を提供します。

## TestMu AI（旧LambdaTest）

[TestMu AI](https://www.testmuai.com/)との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`からエクスポートされるか、`webdriverio.remote(...)`に渡される）に、TestMu AIアカウントのユーザー名とアクセスキーを`user`と`key`として設定することです。

また、任意のブラウザのケイパビリティに、オプションの[サポートされているケイパビリティ](https://www.testmuai.com/capabilities-generator/)をキー/値として渡すこともできます。`visual`を`true`に設定すると、セッションのスクリーンキャストが記録され、役立つ場合があります。

### ローカルテスト用トンネル

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外であるため、自分で起動する必要があります。

ローカルを使用する場合は、ケイパビリティで`tunnel`を`true`に設定する必要があります。

WDIOテストランナーを使用している場合は、`wdio.conf.js`で[`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service)をダウンロードして設定してください。これはTestMu AIの実行を支援し、テストをTestMu AIサービスにより適切に統合する追加機能を提供します。

### Travis CIとの連携

Travis CIでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトは、ローカルテストをダウンロードしてバックグラウンドで起動します。Travisでテストを開始する前にこれを実行する必要があります。

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

wdioと[`Perfecto`](https://www.perfecto.io)を使用する場合、各ユーザーのセキュリティトークンを作成し、これをケイパビリティ構造に追加する必要があります（他のケイパビリティに加えて）：

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

さらに、クラウド設定を追加する必要があります：

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```