---
id: seleniumgrid
title: Selenium Grid
description: "設定ファイルでprotocol、hostname、port、pathを指定して、WebdriverIOのテストを既存のSelenium Gridに接続します。"
---

WebdriverIOは既存のSelenium Gridインスタンスと組み合わせて使用できます。テストをSelenium Gridに接続するには、テストランナーの設定でオプションを更新するだけです。

以下はサンプルのwdio.conf.tsのコードスニペットです。

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Selenium Gridのセットアップに応じて、protocol、hostname、port、pathに適切な値を指定する必要があります。
テストスクリプトと同じマシンでSelenium Gridを実行している場合、一般的なオプションは次のとおりです。

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### 保護されたSelenium Gridでのベーシック認証

Selenium Gridを保護することを強く推奨します。認証が必要な保護されたSelenium Gridを使用している場合は、オプションを通じて認証ヘッダーを渡すことができます。
詳細については、ドキュメントの[headers](https://webdriver.io/docs/configuration/#headers)セクションを参照してください。

### 動的なSelenium Gridでのタイムアウト設定

ブラウザのPodがオンデマンドで起動される動的なSelenium Gridを使用する場合、セッションの作成時にコールドスタートが発生することがあります。このような場合は、セッション作成のタイムアウトを延長することをお勧めします。オプションのデフォルト値は120秒ですが、Gridが新しいセッションの作成により長い時間を要する場合は、この値を増やすことができます。

```ts
connectionRetryTimeout: 180000,
```

### 高度な設定

高度な設定については、Testrunnerの[設定ファイル](https://webdriver.io/docs/configurationfile)を参照してください。

### Selenium Gridでのファイル操作

リモートのSelenium Gridでテストケースを実行する場合、ブラウザはリモートマシン上で動作するため、ファイルのアップロードやダウンロードを伴うテストケースには特別な注意が必要です。

### ファイルのダウンロード

Chromiumベースのブラウザについては、[Download file](https://webdriver.io/docs/api/browser/downloadFile)のドキュメントを参照してください。テストスクリプトでダウンロードしたファイルの内容を読み取る必要がある場合は、リモートのSeleniumノードからテストランナーのマシンにファイルをダウンロードする必要があります。以下は、Chromeブラウザ向けのサンプル`wdio.conf.ts`設定のコードスニペットです。

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### リモートのSelenium Gridでのファイルアップロード

[`element.setFiles()`](/docs/api/element/setFiles)は、WebDriver BiDiを通じてファイル入力を設定します。渡したパスはブラウザによって開かれるため、ブラウザを実行しているマシン上に存在している必要があります。WebdriverIOはローカルファイルをSeleniumノードに配置することはしません。

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

`browser.uploadFile()`を使ってノードにバイトデータを送信していたテストスイートでは、ブラウザが読み取れる場所にファイルを配置してから`setFiles`を呼び出す必要があります。Seleniumの[`file`](/docs/api/selenium#file)エンドポイントは、Chromedriver、Edgedriver、Selenium Grid向けに`browser.file()`として引き続き利用できます。これはWebDriverやWebDriver BiDiのコマンドではありません。

### その他のファイル/Grid操作

Selenium Gridでは、他にもいくつかの操作を実行できます。Selenium Standaloneの手順はSelenium Gridでも問題なく機能するはずです。利用可能なオプションについては、[Selenium Standalone](https://webdriver.io/docs/api/selenium/)のドキュメントを参照してください。


### Selenium Grid公式ドキュメント

Selenium Gridの詳細については、Selenium Gridの公式[ドキュメント](https://www.selenium.dev/documentation/grid/)を参照してください。

Selenium GridをDocker、Docker Compose、またはKubernetesで実行したい場合は、Selenium-Dockerの[GitHubリポジトリ](https://github.com/SeleniumHQ/docker-selenium)を参照してください。