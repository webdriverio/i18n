---
id: seleniumgrid
title: Selenium Grid
---

WebdriverIOを既存のSelenium Gridインスタンスと一緒に使用できます。テストをSelenium Gridに接続するには、テストランナーの設定でオプションを更新するだけです。

以下はサンプルのwdio.conf.tsからのコードスニペットです。

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
Selenium Gridの設定に基づいて、protocol、hostname、port、pathに適切な値を提供する必要があります。
テストスクリプトと同じマシンでSelenium Gridを実行している場合、一般的なオプションは次のとおりです：

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

### 保護されたSelenium Gridでの基本認証

Selenium Gridを保護することを強くお勧めします。認証が必要な保護されたSelenium Gridがある場合、オプションを介して認証ヘッダーを渡すことができます。
詳細については、ドキュメントの[headers](https://webdriver.io/docs/configuration/#headers)セクションを参照してください。

### 動的Selenium Gridとのタイムアウト設定

ブラウザポッドがオンデマンドでスピンアップされる動的Selenium Gridを使用する場合、セッション作成がコールドスタートに直面する可能性があります。そのような場合は、セッション作成タイムアウトを増やすことをお勧めします。オプションのデフォルト値は120秒ですが、グリッドが新しいセッションを作成するのにより多くの時間がかかる場合は増やすことができます。

```ts
connectionRetryTimeout: 180000,
```

### 高度な設定

高度な設定については、テストランナーの[設定ファイル](https://webdriver.io/docs/configurationfile)を参照してください。

### Selenium Gridでのファイル操作

リモートSelenium Gridでテストケースを実行する場合、ブラウザはリモートマシンで実行され、ファイルのアップロードとダウンロードを含むテストケースには特別な注意が必要です。

### ファイルダウンロード

Chromiumベースのブラウザについては、[Download file](https://webdriver.io/docs/api/browser/downloadFile)のドキュメントを参照できます。テストスクリプトがダウンロードしたファイルの内容を読み取る必要がある場合は、リモートSeleniumノードからテストランナーマシンにダウンロードする必要があります。以下は、サンプルの`wdio.conf.ts`設定からのChromeブラウザ用のコードスニペットの例です：

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

### リモートSelenium Gridでのファイルアップロード

リモートブラウザでウェブアプリにファイルをアップロードするには、まずファイルをリモートグリッドにアップロードする必要があります。詳細については、[uploadFile](https://webdriver.io/docs/api/browser/uploadFile)のドキュメントを参照してください。

### その他のファイル/グリッド操作

Selenium Gridで実行できるその他の操作がいくつかあります。Selenium Standaloneの手順はSelenium Gridでも正常に動作するはずです。利用可能なオプションについては、[Selenium Standalone](https://webdriver.io/docs/api/selenium/)のドキュメントを参照してください。

### Selenium Grid公式ドキュメント

Selenium Gridの詳細については、Selenium Grid公式の[ドキュメント](https://www.selenium.dev/documentation/grid/)を参照してください。

Docker、Docker compose、またはKubernetesでSelenium Gridを実行したい場合は、Selenium-Dockerの[GitHubリポジトリ](https://github.com/SeleniumHQ/docker-selenium)を参照してください。