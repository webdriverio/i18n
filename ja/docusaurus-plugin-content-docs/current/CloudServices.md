---
id: cloudservices
title: クラウドサービスの利用
description: "Sauce Labs、BrowserStack、TestingBot、TestMu AI（旧LambdaTest）、Perfectoなどのクラウドプロバイダー上でWebdriverIOテストを実行します。"
---

Sauce Labs、Browserstack、TestingBot、TestMu AI（旧LambdaTest）、PerfectoなどのオンデマンドサービスをWebdriverIOで利用するのは非常に簡単です。必要なのは、オプションでサービスの`user`と`key`を設定することだけです。

オプションとして、`build`のようなクラウド固有のケイパビリティを設定して、テストをパラメータ化することもできます。Travisでのみクラウドサービスを実行したい場合は、`CI`環境変数を使用してTravis上にいるかどうかを確認し、それに応じて設定を変更できます。

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

[Sauce Labs](https://saucelabs.com)でテストをリモート実行するように設定できます。

唯一の要件は、設定（`wdio.conf.js`でエクスポートするか、`webdriverio.remote(...)`に渡す）の`user`と`key`に、Sauce Labsのユーザー名とアクセスキーを設定することです。

また、任意の[テスト設定オプション](https://docs.saucelabs.com/dev/test-configuration-options/)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。

### Sauce Connect

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外であるため、自分で起動する必要があります。

WDIOテストランナーを使用している場合は、[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)をダウンロードして`wdio.conf.js`で設定してください。これはSauce Connectの実行を支援し、テストをSauceサービスとより良く統合するための追加機能も備えています。

### Travis CIを使用する場合

ただし、Travis CIは各テストの前にSauce Connectを起動するための[サポートを提供しています](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)ので、その手順に従うことも選択肢の一つです。

その場合、各ブラウザの`capabilities`で`tunnel-identifier`テスト設定オプションを設定する必要があります。Travisはデフォルトでこれを`TRAVIS_JOB_NUMBER`環境変数に設定します。

また、Sauce Labsでテストをビルド番号ごとにグループ化したい場合は、`build`を`TRAVIS_BUILD_NUMBER`に設定できます。

最後に、`name`を設定すると、このビルドにおけるSauce Labs上のテスト名が変更されます。WDIOテストランナーを[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)と組み合わせて使用している場合、WebdriverIOはテストに適切な名前を自動的に設定します。

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

テストをリモートで実行しているため、一部のタイムアウトを延長する必要がある場合があります。

テスト設定オプションとして`idle-timeout`を渡すことで、[アイドルタイムアウト](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)を変更できます。これは、Sauceが接続を閉じる前にコマンド間でどれだけ待機するかを制御します。

## BrowserStack

WebdriverIOには[Browserstack](https://www.browserstack.com)との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`でエクスポートするか、`webdriverio.remote(...)`に渡す）の`user`と`key`に、Browserstack Automateのユーザー名とアクセスキーを設定することです。

また、任意の[サポートされているケイパビリティ](https://www.browserstack.com/automate/capabilities)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。`browserstack.debug`を`true`に設定すると、セッションのスクリーンキャストが記録され、役立つ場合があります。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.browserstack.com/local-testing#command-line)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外であるため、自分で起動する必要があります。

ローカルを使用する場合は、ケイパビリティで`browserstack.local`を`true`に設定する必要があります。

WDIOテストランナーを使用している場合は、[`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service)をダウンロードして`wdio.conf.js`で設定してください。これはBrowserStackの実行を支援し、テストをBrowserStackサービスとより良く統合するための追加機能も備えています。

### Travis CIを使用する場合

Travisでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトはそれをダウンロードし、バックグラウンドで起動します。テストを開始する前に、Travisでこれを実行してください。

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

また、`build`をTravisのビルド番号に設定するとよいでしょう。

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

唯一の要件は、設定（`wdio.conf.js`でエクスポートするか、`webdriverio.remote(...)`に渡す）の`user`と`key`に、[TestingBot](https://testingbot.com)のユーザー名とシークレットキーを設定することです。

また、任意の[サポートされているケイパビリティ](https://testingbot.com/support/other/test-options)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。

### ローカルテスト

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://testingbot.com/support/other/tunnel)を使用する必要があります。TestingBotは、インターネットからアクセスできないWebサイトをテストできるようにするJavaベースのトンネルを提供しています。

同社のトンネルサポートページには、これをセットアップして実行するために必要な情報が記載されています。

WDIOテストランナーを使用している場合は、[`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service)をダウンロードして`wdio.conf.js`で設定してください。これはTestingBotの実行を支援し、テストをTestingBotサービスとより良く統合するための追加機能も備えています。

## TestMu AI（旧LambdaTest）

[TestMu AI](https://www.testmuai.com/)との統合も組み込まれています。

唯一の要件は、設定（`wdio.conf.js`でエクスポートするか、`webdriverio.remote(...)`に渡す）の`user`と`key`に、TestMu AIアカウントのユーザー名とアクセスキーを設定することです。

また、任意の[サポートされているケイパビリティ](https://www.testmuai.com/capabilities-generator/)を、任意のブラウザのケイパビリティにキー/値として渡すこともできます。`visual`を`true`に設定すると、セッションのスクリーンキャストが記録され、役立つ場合があります。

### ローカルテスト用のトンネル

インターネットからアクセスできないサーバー（`localhost`など）に対してテストを実行したい場合は、[ローカルテスト](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)を使用する必要があります。

これをサポートすることはWebdriverIOの範囲外であるため、自分で起動する必要があります。

ローカルを使用する場合は、ケイパビリティで`tunnel`を`true`に設定する必要があります。

WDIOテストランナーを使用している場合は、[`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service)をダウンロードして`wdio.conf.js`で設定してください。これはTestMu AIの実行を支援し、テストをTestMu AIサービスとより良く統合するための追加機能も備えています。

### Travis CIを使用する場合

Travisでローカルテストを追加したい場合は、自分で起動する必要があります。

次のスクリプトはそれをダウンロードし、バックグラウンドで起動します。テストを開始する前に、Travisでこれを実行してください。

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

また、`build`をTravisのビルド番号に設定するとよいでしょう。

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

[`Perfecto`](https://www.perfecto.io)でwdioを使用する場合は、ユーザーごとにセキュリティトークンを作成し、次のようにケイパビリティ構造に（他のケイパビリティに加えて）追加する必要があります：

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

[RobotActions](https://robotactions.com)は、実機のAndroidおよびiOSデバイスとブラウザノードを単一のエンドポイントの背後で提供します。認証には`user`と`key`のペアではなく、APIトークンを使用します。トークンはBearerヘッダーとして送信します：

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

あるいは、トークンをパスのプレフィックスとして渡すこともできます。グリッドはリクエストを転送する前にこのプレフィックスを取り除きます：

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

グリッドは他のWebDriverクライアント向けにURLに埋め込まれた認証情報（`https://user:token@host`）も受け付けますが、この形式はWebdriverIOでは使用できません。WebdriverIOはfetchベースであり、Node.jsはURLに埋め込まれた認証情報を拒否するためです。

実機に対して実行するには、上記のいずれかの接続方式と併せて、ブラウザをAppiumケイパビリティとして渡します：

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