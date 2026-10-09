---
id: cloudservices
title: クラウドサービスの利用
description: "Sauce Labs、BrowserStack、TestingBot、TestMu AI（旧LambdaTest）、Perfecto、その他のクラウドプロバイダーでWebdriverIOテストを実行します。"
---

Sauce Labs、Browserstack、TestingBot、TestMu AI（旧LambdaTest）、Perfectoなどのオンデマンドサービスを WebdriverIO で利用するのは非常に簡単です。必要なのは、オプションでサービスの `user` と `key` を設定することだけです。

オプションとして、`build` などのクラウド固有のケイパビリティを設定してテストをパラメータ化することもできます。Travis でのみクラウドサービスを実行したい場合は、`CI` 環境変数を使用して Travis 上で実行されているかどうかを確認し、それに応じて設定を変更できます。

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

テストを [Sauce Labs](https://saucelabs.com) でリモート実行するように設定できます。

唯一の要件は、設定（`wdio.conf.js` からエクスポートされるもの、または `webdriverio.remote(...)` に渡されるもの）の `user` と `key` に、Sauce Labs のユーザー名とアクセスキーを設定することです。

また、任意の[テスト設定オプション](https://docs.saucelabs.com/dev/test-configuration-options/)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。

### Sauce Connect

インターネットからアクセスできないサーバー（`localhost` など）に対してテストを実行したい場合は、[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) を使用する必要があります。

これをサポートすることは WebdriverIO の範囲外であるため、自分で起動する必要があります。

WDIO テストランナーを使用している場合は、[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) をダウンロードして `wdio.conf.js` で設定してください。これは Sauce Connect の実行を支援し、テストを Sauce サービスとより良く統合するための追加機能も備えています。

### Travis CI での利用

ただし、Travis CI は各テストの前に Sauce Connect を起動するための[サポートを提供しています](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)ので、その手順に従うことも選択肢の一つです。

その場合は、各ブラウザの `capabilities` で `tunnel-identifier` テスト設定オプションを設定する必要があります。Travis はデフォルトでこれを `TRAVIS_JOB_NUMBER` 環境変数に設定します。

また、Sauce Labs でテストをビルド番号ごとにグループ化したい場合は、`build` を `TRAVIS_BUILD_NUMBER` に設定できます。

最後に、`name` を設定すると、このビルドにおける Sauce Labs 上のこのテストの名前が変更されます。WDIO テストランナーを [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) と組み合わせて使用している場合、WebdriverIO はテストに適切な名前を自動的に設定します。

`capabilities` の例：

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### タイムアウト

テストをリモートで実行しているため、一部のタイムアウトを延長する必要がある場合があります。

テスト設定オプションとして `idle-timeout` を渡すことで、[アイドルタイムアウト](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)を変更できます。これは、Sauce が接続を閉じる前にコマンド間でどれだけ待機するかを制御します。

## BrowserStack

WebdriverIO には [Browserstack](https://www.browserstack.com) との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js` からエクスポートされるもの、または `webdriverio.remote(...)` に渡されるもの）の `user` と `key` に、Browserstack Automate のユーザー名とアクセスキーを設定することです。

また、任意の[サポートされているケイパビリティ](https://www.browserstack.com/automate/capabilities)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。`browserstack.debug` を `true` に設定すると、セッションのスクリーンキャストが記録されるため、役立つ場合があります。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost` など）に対してテストを実行したい場合は、[ローカルテスト](https://www.browserstack.com/local-testing#command-line)を使用する必要があります。

これをサポートすることは WebdriverIO の範囲外であるため、自分で起動する必要があります。

ローカルを使用する場合は、ケイパビリティで `browserstack.local` を `true` に設定する必要があります。

WDIO テストランナーを使用している場合は、[`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) をダウンロードして `wdio.conf.js` で設定してください。これは BrowserStack の実行を支援し、テストを BrowserStack サービスとより良く統合するための追加機能も備えています。

### Travis CI での利用

Travis でローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトはそれをダウンロードし、バックグラウンドで起動します。テストを開始する前に、Travis でこれを実行してください。

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

また、`build` を Travis のビルド番号に設定することもできます。

`capabilities` の例：

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

唯一の要件は、設定（`wdio.conf.js` からエクスポートされるもの、または `webdriverio.remote(...)` に渡されるもの）の `user` と `key` に、[TestingBot](https://testingbot.com) のユーザー名とシークレットキーを設定することです。

また、任意の[サポートされているケイパビリティ](https://testingbot.com/support/other/test-options)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost` など）に対してテストを実行したい場合は、[ローカルテスト](https://testingbot.com/support/other/tunnel)を使用する必要があります。TestingBot は、インターネットからアクセスできないウェブサイトをテストできるようにする Java ベースのトンネルを提供しています。

同社のトンネルサポートページには、これをセットアップして実行するために必要な情報が記載されています。

WDIO テストランナーを使用している場合は、[`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) をダウンロードして `wdio.conf.js` で設定してください。これは TestingBot の実行を支援し、テストを TestingBot サービスとより良く統合するための追加機能も備えています。

## TestMu AI（旧LambdaTest）

[TestMu AI](https://www.testmuai.com/) との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js` からエクスポートされるもの、または `webdriverio.remote(...)` に渡されるもの）の `user` と `key` に、TestMu AI アカウントのユーザー名とアクセスキーを設定することです。

また、任意の[サポートされているケイパビリティ](https://www.testmuai.com/capabilities-generator/)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。`visual` を `true` に設定すると、セッションのスクリーンキャストが記録されるため、役立つ場合があります。

### ローカルテスト用のトンネル

インターネットからアクセスできないサーバー（`localhost` など）に対してテストを実行したい場合は、[ローカルテスト](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)を使用する必要があります。

これをサポートすることは WebdriverIO の範囲外であるため、自分で起動する必要があります。

ローカルを使用する場合は、ケイパビリティで `tunnel` を `true` に設定する必要があります。

WDIO テストランナーを使用している場合は、[`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) をダウンロードして `wdio.conf.js` で設定してください。これは TestMu AI の実行を支援し、テストを TestMu AI サービスとより良く統合するための追加機能も備えています。

### Travis CI での利用

Travis でローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトはそれをダウンロードし、バックグラウンドで起動します。テストを開始する前に、Travis でこれを実行してください。

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

また、`build` を Travis のビルド番号に設定することもできます。

`capabilities` の例：

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

wdio を [`Perfecto`](https://www.perfecto.io) と共に使用する場合は、ユーザーごとにセキュリティトークンを作成し、次のようにケイパビリティ構造に（他のケイパビリティに加えて）追加する必要があります：

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

さらに、次のようにクラウド設定を追加する必要があります：

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) は、実機の Android および iOS デバイスとブラウザノードを単一のエンドポイントで提供します。認証には `user` と `key` のペアではなく API トークンを使用します。トークンは Bearer ヘッダーとして送信します：

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

または、トークンをパスのプレフィックスとして渡すこともできます。グリッドはリクエストを転送する前にこのプレフィックスを取り除きます：

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

グリッドは、他の WebDriver クライアント向けに URL に埋め込まれた認証情報（`https://user:token@host`）も受け付けますが、この形式は WebdriverIO からは使用できません。WebdriverIO は fetch ベースであり、Node.js は URL に埋め込まれた認証情報を拒否するためです。

実機デバイスで実行するには、上記のいずれかの接続方式と合わせて、ブラウザを Appium ケイパビリティとして渡します：

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```