---
id: wdio-video-reporter
title: ビデオレポーター
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)をご覧ください。

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

これは[Webdriver IO v6以上](https://webdriver.io/)用のレポーターで、wdioテスト実行のビデオを生成します。Allureを使用している場合、テストケースには自動的にビデオが装飾されます。（Webdriver IO v5の場合は、wdio-video-reporterバージョン^2.0.0を使用してください。）

ビデオは`wdio.config.outputDir`に保存されます。

失敗したテストにビデオが含まれるAllureレポートの例はこちらでご覧いただけます：
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

長所：
- Allureレポートに素晴らしいビデオが含まれる
- テストが高速でも、人間が見やすい速度のビデオ
- Seleniumグリッドで動作する
- `saveScreenshot`をサポートするすべてのウェブドライバーで動作する
- Selenium 3.141.59を使用して以下のデスクトップブラウザで検証済み：
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3で以下のiOSとAndroidデバイスで検証済み：
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

短所：
- 「アクション」の後にスクリーンショットを撮ることで動作するため、テストが少し遅くなります。これはスクリーンショットを生成すべき[jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)メッセージを慎重に選択することで軽減されています
- Seleniumドライバーはアラートボックスやポップアップをスクリーンショットに含めないため、ビデオには表示されません


クイックスタート
===========

迅速に始めるには[wdio-template](https://github.com/presidenten/wdio-template)のシンプルなテンプレートをチェックしてください。

リポジトリをクローンし、`yarn`または`npm install`で依存関係をインストールします。次にデモディレクトリで`yarn e2e`または`npm run e2e`を実行し、最後に`yarn report`または`npm run report`を実行してAllureレポートを確認します。


インストール
============

レポーターのインストール
--------------------

`yarn add wdio-video-reporter`
または
`npm install wdio-video-reporter`


configにレポーターを追加する
--------------------------

`wdio.conf.js`ファイルの先頭で、ライブラリを要求します：
```
const video = require('wdio-video-reporter');
```

次に、reportersプロパティの設定にビデオレポーターを追加します：

```
 reporters: [
    [video, {
      saveAllVideos: false,       // trueの場合、成功したテストケースのビデオも保存します
      videoSlowdownMultiplier: 3, // 高い値でビデオが遅く、低い値で速くなります [値1-100]
    }],
  ],
```


Allureとの併用
-----------------

Allureレポーターも追加すると、何も設定しなくてもレポートにビデオが自動的に追加されます :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // trueの場合、成功したテストケースのビデオも保存します
      videoSlowdownMultiplier: 3, // 高い値でビデオが遅く、低い値で速くなります [値1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


設定
=============

通常の設定パラメータ
-------------------------------

多くのユーザーが設定したい項目

- `saveAllVideos` 成功したテストのビデオを保存するにはtrueに設定します。`デフォルト: false`
- `videoSlowdownMultiplier` [1-100]の整数。ビデオが速すぎる場合は値を上げます。`デフォルト: 3`
- `videoRenderTimeout` ビデオのレンダリングを待つ最大秒数。`デフォルト: 5`
- `outputDir` 設定されていない場合、wdio.config.outputDirを使用します。`デフォルト: undefined`
- `maxTestNameCharacters` テスト名の最大長。`デフォルト: 250`

高度な設定パラメータ
---------------------------------

エンジンがスクリーングラブを行うタイミングを変更したい上級ユーザー向け。これらの配列には[jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)メッセージの最後の単語、例えば/session/:sessionId/`buttondown`を入力できます。

- `addExcludedActions` スクリーンショットが不要なアクションを追加します。`デフォルト: []`
- `addJsonWireActions` スクリーンショットがないアクションを追加します。`デフォルト: []`
- `recordAllActions` フィルタリングをスキップしてすべてをスクリーンショットします。（非推奨）`デフォルト: false`

処理されたメッセージを確認するには、`wdio.config.logLevel: 'debug'`を設定して`outputDir/wdio-X-Y-Video-reporter.log`を確認してください。これによりスクリーンショットの出力ディレクトリも確認用に残ります。

余分なログを完全に避けてビデオファイルのみを取得するには、`wdio.config.logLevel: 'silent'`を設定します。

Cucumberのサポート
----------------

Allureレポーターを使用している場合は、以下を確認してください：

- ステップ定義で失敗したテストが壊れたものとして報告されるのを避けるため、組み込みのNode assertionsではなく`chai`を使用してください
- `wdio.conf.js`ファイルのAllureオプションに`useCucumberStepReporter: true`を追加します。一般的な設定は次のようになります：
```
  reporters: [
    [video, {
      saveAllVideos: false,       // trueの場合、成功したテストケースのビデオも保存します
      videoSlowdownMultiplier: 3, // 高い値でビデオが遅く、低い値で速くなります [値1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
完全な例については、[wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)のcucumberブランチをチェックしてください。


Appiumの設定
------------

`wdio-video-reporter` v1.2.4以降では、デスクトップとデバイスのsafariとchromeブラウザをAllureが区別するためのサポートが含まれています。
レポーターはカスタムプロパティ`deviceType`を使用して異なるデバイスを識別します。
推奨値は`phone`と`tablet`です。
デスクトップChromeブラウザと同じSeleniumグリッドでデバイスを使用する際のChromeウェブドライバーのバグを避けるため、_すべての_ブラウザに`browserVersion`も含めることをお勧めします。

生成されるビデオファイルにも、ブラウザ名に`deviceType`が追加されます。

Appium設定の例：
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

そして`wdio-config.json`：
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


貢献
============

フォークし、変更を加え、テストを書き、リントし、テストを実行し、ビルドし、変更がうまく機能することをデモで確認してから、PRを作成してください。

デモフォルダはライブラリのビルドバージョンで動作するため、新機能を追加して試したい場合は必ずビルドしてください。


謝辞
======

多くのユーザーが求めていたCucumberサポートを修正してくれた[Johnson E](https://github.com/jonn-set)に感謝します。