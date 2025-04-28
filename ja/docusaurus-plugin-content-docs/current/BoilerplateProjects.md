---
id: boilerplates
title: ボイラープレートプロジェクト
---

時間の経過とともに、コミュニティによっていくつかのプロジェクトが開発され、これらを参考にして独自のテストスイートをセットアップすることができます。

# v8 ボイラープレートプロジェクト

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumberテストスイート用の私たち独自のボイラープレートです。150以上の事前定義されたステップ定義を作成したので、すぐにプロジェクトでフィーチャーファイルの作成を開始できます。

- フレームワーク:
    - Cucumber
    - WebdriverIO
- 特徴:
    - 必要なものをほぼすべてカバーする150以上の事前定義されたステップ
    - WebdriverIOのマルチリモート機能を統合
    - 独自のデモアプリ

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel機能とページオブジェクトパターンを使用してJasmineでWebdriverIOテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO
    - Jasmine
- 特徴
    - ページオブジェクトパターン
    - Sauce Labs連携

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
最小限のElectronアプリケーションでWebdriverIOテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO
    - Mocha
- 特徴
    - Electron APIモッキング

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

このボイラープレートプロジェクトはWebdriverIO 8とcucumberおよびtypescriptを使用したテストを含み、ページオブジェクトパターンに従っています。

- フレームワーク:
    - WebdriverIO v8
    - Cucumber v8

- 特徴:
    - Typescript v5
    - ページオブジェクトパターン
    - Prettier
    - マルチブラウザサポート
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - クロスブラウザ並列実行
    - Appium
    - BrowserStackとSauce Labsを使用したクラウドテスト連携
    - Dockerサービス
    - データ共有サービス
    - 各サービス用の個別設定ファイル
    - ユーザータイプ別のテストデータ管理と読み取り
    - レポート機能
      - Dot
      - Spec
      - 失敗スクリーンショット付きの複数のcucumber HTMLレポート
    - Gitlabリポジトリ用のGitlabパイプライン
    - Githubリポジトリ用のGithubアクション
    - Dockerハブをセットアップするためのdocker-compose
    - AXEを使用したアクセシビリティテスト
    - Applitoolsを使用した視覚的テスト
    - ログメカニズム

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- フレームワーク: WDIO-V8とCucumber (V8x)
- 特徴:
    - ES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    - 一度に複数のセレクタでエレメントをクエリする複数セレクタオプションの例
    - ChromeとFirefoxを使用したマルチブラウザおよびヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト連携
    - E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータ読み取り/書き込み例
    - 任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのデータベースサポート、クエリの実行/結果セットの取得などの例
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureおよびXunit/Junitレポートのホスティング
    - デモアプリhttps://search.yahoo.com/とhttp://the-internet.herokuapp.comを使用した例
    - BrowserStack、Sauce Labs、LambdaTestおよびAppium専用の`.config`ファイル（モバイルデバイスでの再生用）。iOSとAndroid用のローカルマシンでのワンクリックAppiumセットアップについては[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- フレームワーク: WDIO-V8とMocha (V10x)
- 特徴:
    - ES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    - デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    - ChromeとFirefoxを使用したマルチブラウザおよびヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト連携
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureおよびXunit/Junitレポートのホスティング
    - E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータ読み取り/書き込み例
    - E2Eテスト用の任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリの実行/結果セットの取得などの例
    - BrowserStack、Sauce Labs、LambdaTestおよびAppium専用の`.config`ファイル（モバイルデバイスでの再生用）。iOSとAndroid用のローカルマシンでのワンクリックAppiumセットアップについては[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- フレームワーク: WDIO-V8とJasmine (V4x)
- 特徴:
    - ES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    - デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    - ChromeとFirefoxを使用したマルチブラウザおよびヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト連携
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureおよびXunit/Junitレポートのホスティング
    - E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータ読み取り/書き込み例
    - E2Eテスト用の任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリの実行/結果セットの取得などの例
    - BrowserStack、Sauce Labs、LambdaTestおよびAppium専用の`.config`ファイル（モバイルデバイスでの再生用）。iOSとAndroid用のローカルマシンでのワンクリックAppiumセットアップについては[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特徴
    - cucumberのサンプルテストシナリオを含む
    - 失敗時の埋め込みビデオを含むcucumberのHTMLレポートを統合
    - LambdatestとCircleCIサービスを統合
    - 視覚的、アクセシビリティ、APIテストを統合
    - メール機能を統合
    - テストレポートの保存と取得用のs3バケットを統合

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトは、最新のWebdriverIO、Mocha、およびSerenity/JSを使用してWebアプリケーションの受け入れテストを開始するのに役立ちます。

- フレームワーク
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDDレポーティング

- 特徴
    - [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - テスト失敗時の自動スクリーンショット（レポートに埋め込み）
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)を使用した継続的インテグレーション（CI）のセットアップ
    - GitHub Pagesに公開された[デモSerenity BDDレポート](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトは、最新のWebdriverIO、Cucumber、およびSerenity/JSを使用してWebアプリケーションの受け入れテストを開始するのに役立ちます。

- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDDレポーティング

- 特徴
    - [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - テスト失敗時の自動スクリーンショット（レポートに埋め込み）
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)を使用した継続的インテグレーション（CI）のセットアップ
    - GitHub Pagesに公開された[デモSerenity BDDレポート](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Headspinクラウド（https://www.headspin.io/）でCucumber機能とページオブジェクトパターンを使用してWebdriverIOテストを実行するためのボイラープレートプロジェクト。
- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特徴
    - [Headspin](https://www.headspin.io/)とのクラウド連携
    - ページオブジェクトモデルをサポート
    - BDDの宣言的スタイルで書かれたサンプルシナリオを含む
    - cucumberのHTMLレポートを統合

# v7 ボイラープレートプロジェクト

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

WebdriverIOでAppiumテストを実行するためのボイラープレートプロジェクト：

- iOS/Androidネイティブアプリ
- iOS/Androidハイブリッドアプリ
- Android ChromeとiOS Safariブラウザ

このボイラープレートには以下が含まれています：

- フレームワーク: Mocha
- 特徴:
    - 設定:
        - iOSとAndroidアプリ
        - iOSとAndroidブラウザ
    - ヘルパー:
        - WebView
        - ジェスチャー
        - ネイティブアラート
        - ピッカー
     - テスト例:
        - WebView
        - ログイン
        - フォーム
        - スワイプ
        - ブラウザ

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ページオブジェクトを使用したMocha、WebdriverIO v6のATDD WEBテスト

- フレームワーク
  - WebdriverIO (v7)
  - Mocha
- 特徴
  - [ページオブジェクト](pageobjects)モデル
  - [Sauceサービス](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)を使用したSauce Labs連携
  - Allureレポート
  - 失敗テストの自動スクリーンショットキャプチャ
  - CircleCI例
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mochaを使用してE2Eテストを実行するためのボイラープレートプロジェクト。

- フレームワーク:
    - WebdriverIO (v7)
    - Mocha
- 特徴:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [ビジュアル回帰テスト](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   ページオブジェクトパターン
    -   [Commit lint](https://github.com/conventional-changelog/commitlint)と[Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions例
    -   Allureレポート（失敗時のスクリーンショット）

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

以下のためのWebdriverIO v7テストを実行するためのボイラープレートプロジェクト：

[CucumberフレームワークでのTypeScriptを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[MochaフレームワークでのTypeScriptを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[DockerでのWDIO 7スクリプトの実行](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[ネットワークログ](https://github.com/17thSep/MonitorNetworkLogs/)

以下のためのボイラープレートプロジェクト：

- ネットワークログの取得
- すべてのGET/POSTコールまたは特定のREST APIの取得
- リクエストパラメータのアサート
- レスポンスパラメータのアサート
- すべてのレスポンスを別ファイルに保存

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

ページオブジェクトパターンを使用してcucumber v7とwdio v7でネイティブおよびモバイルブラウザのappiumテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 特徴
    - ネイティブAndroidおよびiOSアプリ
    - Android Chromeブラウザ
    - iOS Safariブラウザ
    - ページオブジェクトモデル
    - cucumberのサンプルテストシナリオを含む
    - 複数のcucumber HTMLレポートと統合

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

このテンプレートプロジェクトは、最新のWebdriverIOとCucumberフレームワークを使用してWebアプリケーションからwebdriverioテストを実行する方法を示すのに役立ちます。このプロジェクトはDockerでWebdriverIOテストを実行する方法を理解するためのベースラインイメージとして機能することを目的としています。

このプロジェクトには以下が含まれています：

- DockerFile
- cucumberプロジェクト

詳細は：[Mediumブログ](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)を参照してください。

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

このテンプレートプロジェクトは、WebdriverIOを使用してelectronJSテストを実行する方法を示すのに役立ちます。このプロジェクトはWebdriverIO electronJSテストの実行方法を理解するためのベースラインイメージとして機能することを目的としています。

このプロジェクトには以下が含まれています：

- サンプルelectronjsアプリ
- サンプルcucumberテストスクリプト

詳細は：[Mediumブログ](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)を参照してください。

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

このテンプレートプロジェクトは、winappdriver とWebdriverIOを使用してWindowsアプリケーションを自動化する方法を示すのに役立ちます。このプロジェクトはwindappdriverとWebdriverIOテストの実行方法を理解するためのベースラインイメージとして機能することを目的としています。

詳細は：[Mediumブログ](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)を参照してください。

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)

このテンプレートプロジェクトは、最新のWebdriverIOとJasmineフレームワークでwebdriverioマルチリモート機能を実行する方法を示すのに役立ちます。このプロジェクトはDockerでWebdriverIOテストを実行する方法を理解するためのベースラインイメージとして機能することを目的としています。

このプロジェクトは以下を使用しています：
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

ページオブジェクトパターンを使用してmochaで実際のRokuデバイス上でappiumテストを実行するためのテンプレートプロジェクト。

- フレームワーク
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allureレポート

- 特徴
    - ページオブジェクトモデル
    - Typescript
    - 失敗時のスクリーンショット
    - サンプルRokuチャンネルを使用したテスト例

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2Eマルチリモートのcucumberテストおよびデータ駆動型のMochaテスト用のPoCプロジェクト

- フレームワーク:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- 特徴:
    - cucumberベースのE2Eテスト
    - Mochaベースのデータ駆動型テスト
    - Webのみのテスト - ローカルおよびクラウドプラットフォーム
    - モバイルのみのテスト - ローカルおよびリモートクラウドエミュレータ（またはデバイス）
    - Web + モバイルテスト - マルチリモート - ローカルおよびクラウドプラットフォーム
    - Allureを含む複数のレポートの統合
    - テストデータ（JSON / XLSX）がグローバルに処理され、テスト実行後にオンザフライで作成されたデータをファイルに書き込む
    - テストを実行してallureレポートをアップロードするためのGithubワークフロー

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

これは、最新のWebdriverIOを使用してappiumとchromedriverサービスを使用したwebdriverioマルチリモートの実行方法を示すためのボイラープレートプロジェクトです。

- フレームワーク
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- 特徴
  - [ページオブジェクト](pageobjects)モデル
  - Typescript
  - Web + モバイルテスト - マルチリモート
  - ネイティブAndroidおよびiOSアプリ
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.comでのログインと[WebdriverIOネイティブデモアプリ](https://github.com/webdriverio/native-demo-app)のテスト例