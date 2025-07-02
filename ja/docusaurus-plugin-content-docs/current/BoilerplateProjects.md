---
id: boilerplates
title: ボイラープレートプロジェクト
---

時間の経過とともに、私たちのコミュニティでは、あなた自身のテストスイートをセットアップするための参考にできるいくつかのプロジェクトが開発されてきました。

# v9 ボイラープレートプロジェクト

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumberテストスイート用の私たち独自のボイラープレートです。150以上の事前定義されたステップ定義を作成したので、すぐにプロジェクトでフィーチャーファイルの作成を開始できます。

- フレームワーク:
    - Cucumber
    - WebdriverIO
- 特徴:
    - 必要なほぼすべてをカバーする150以上の事前定義されたステップ
    - WebdriverIOのマルチリモート機能を統合
    - 独自のデモアプリ

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel機能とページオブジェクトパターンを使用してJasmineでWebdriverIOテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO
    - Jasmine
- 特徴
    - ページオブジェクトパターン
    - Sauce Labs統合

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
最小限のElectronアプリケーションでWebdriverIOテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO
    - Mocha
- 特徴
    - Electron APIモッキング

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
GherkinのFeatureファイルからWebdriverIOのページオブジェクトクラスとMochaテスト仕様を自動生成し、手動の労力を削減し、一貫性を向上させ、QA自動化を迅速化します。このプロジェクトはwebdriver.ioと互換性のあるコードを生成するだけでなく、webdriver.ioのすべての機能を強化します。JavaScriptユーザー向けとTypeScriptユーザー向けの2つのバージョンを作成しましたが、どちらのプロジェクトも同じように動作します。

***どのように機能するか？***
- プロセスは2ステップの自動化に従います：
- ステップ1：GherkinからstepMapへ（stepMap.jsonファイルの生成）
  - stepMap.jsonファイルの生成：
    - Gherkin構文で書かれた.featureファイルを解析します。
    - シナリオとステップを抽出します。
    - 以下を含む構造化された.stepMap.jsonファイルを生成します：
      - 実行するアクション（例：click、setText、assertVisible）
      - 論理マッピングのためのselectorName
      - DOM要素のselector
      - 値やアサーションのためのnote
- ステップ2：stepMapからコードへ（WebdriverIOコードの生成）
  stepMap.jsonを使用して以下を生成します：
  - 共有メソッドとbrowser.url()セットアップを含むベースページクラス（base page.js）を生成します。
  - test/pageobjects/内のフィーチャーごとにWebdriverIO互換のページオブジェクトモデル（POM）クラスを生成します。
  - Mochaベースのテスト仕様を生成します。
- JavaScript / TypeScript用ディレクトリ構造の例。以下はJSバージョンですが、TSバージョンも同様の構造を持っています。
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# v8 ボイラープレートプロジェクト

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- フレームワーク: WDIO-V8 with Cucumber (V8x).
- 特徴:
    - ES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    - 一度に複数のセレクタでエレメントをクエリするマルチセレクタオプションの例
    - ChromeとFirefoxを使用したマルチブラウザとヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト統合
    - E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータ読み書きの例
    - あらゆるRDBMS（Oracle、MySql、TeraData、Verticaなど）へのデータベースサポート、クエリの実行/結果セットの取得などの例
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureおよびXunit/Junitレポートのホスティング
    - デモアプリhttps://search.yahoo.com/とhttp://the-internet.herokuapp.comを使用した例
    - BrowserStack、Sauce Labs、LambdaTestおよびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。ローカルマシンでiOSとAndroid用のワンクリックAppiumセットアップについては[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- フレームワーク: WDIO-V8 with Mocha (V10x).
- 特徴:
    -  ES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    -  デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    -  ChromeとFirefoxを使用したマルチブラウザとヘッドレスブラウザ実行の例
    -  BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト統合
    -  複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureおよびXunit/Junitレポートのホスティング
    -  E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータ読み書きの例
    -  E2Eテスト用のあらゆるRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリの実行/結果セットの取得などの例
    -  BrowserStack、Sauce Labs、LambdaTestおよびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。ローカルマシンでiOSとAndroid用のワンクリックAppiumセットアップについては[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- フレームワーク: WDIO-V8 with Jasmine (V4x).
- 特徴:
    -  ES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    -  デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    -  ChromeとFirefoxを使用したマルチブラウザとヘッドレスブラウザ実行の例
    -  BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト統合
    -  複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureおよびXunit/Junitレポートのホスティング
    -  E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータ読み書きの例
    -  E2Eテスト用のあらゆるRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリの実行/結果セットの取得などの例
    -  BrowserStack、Sauce Labs、LambdaTestおよびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。ローカルマシンでiOSとAndroid用のワンクリックAppiumセットアップについては[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

このボイラープレートプロジェクトはページオブジェクトパターンに従ったcucumberとtypescriptを使用したWebdriverIO 8テストを含んでいます。

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
    - BrowserStackとSauce Labsとのクラウドテスト統合
    - Dockerサービス
    - データ共有サービス
    - 各サービスごとの個別の設定ファイル
    - ユーザータイプ別のテストデータ管理と読み取り
    - レポート
      - Dot
      - Spec
      - 失敗時のスクリーンショット付き複数のcucumber HTMLレポート
    - GitlabリポジトリのためのGitlabパイプライン
    - GithubリポジトリのためのGithubアクション
    - dockerハブをセットアップするためのDocker compose
    - AXEを使用したアクセシビリティテスト
    - Applitoolsを使用した視覚的テスト
    - ログメカニズム


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特徴
    - cucumberでのサンプルテストシナリオを含む
    - 失敗時の埋め込みビデオ付きcucumber HTMLレポートの統合
    - LambdatestとCircleCIサービスの統合
    - 視覚的、アクセシビリティ、APIテストの統合
    - Eメール機能の統合
    - テストレポートの保存と取得のためのs3バケットの統合

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトは、最新のWebdriverIO、Mocha、およびSerenity/JSを使用してWebアプリケーションの受け入れテストを開始するのに役立ちます。

- フレームワーク
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDDレポート

- 特徴
    - [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - テスト失敗時の自動スクリーンショット（レポートに埋め込み）
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)を使用した継続的インテグレーション（CI）設定
    - GitHub Pagesに公開された[デモSerenity BDDレポート](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトは、最新のWebdriverIO、Cucumber、およびSerenity/JSを使用してWebアプリケーションの受け入れテストを開始するのに役立ちます。

- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDDレポート

- 特徴
    - [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - テスト失敗時の自動スクリーンショット（レポートに埋め込み）
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)を使用した継続的インテグレーション（CI）設定
    - GitHub Pagesに公開された[デモSerenity BDDレポート](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Headspinクラウド（https://www.headspin.io/）でCucumber機能とページオブジェクトパターンを使用してWebdriverIOテストを実行するためのボイラープレートプロジェクト。
- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特徴
    - [Headspin](https://www.headspin.io/)とのクラウド統合
    - ページオブジェクトモデルをサポート
    - BDDの宣言型スタイルで書かれたサンプルシナリオを含む
    - cucumber HTMLレポートの統合

# v7 ボイラープレートプロジェクト
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

以下のためのWebdriverIOでAppiumテストを実行するためのボイラープレートプロジェクト：

- iOS/Android ネイティブアプリ
- iOS/Android ハイブリッドアプリ
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
PageObjectを使用したMocha、WebdriverIO v6によるATDD WEBテスト

- フレームワーク
  - WebdriverIO (v7)
  - Mocha
- 特徴
  - [ページオブジェクト](pageobjects)モデル
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)によるSauce Labs統合
  - Allureレポート
  - 失敗テスト用の自動スクリーンショットキャプチャ
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
    -   [Visual regression tests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   ページオブジェクトパターン
    -   [Commit lint](https://github.com/conventional-changelog/commitlint)と[Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions例
    -   Allureレポート（失敗時のスクリーンショット）

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

以下のための**WebdriverIO v7**テストを実行するためのボイラープレートプロジェクト：

[Cucumberフレームワークでのタイプスクリプトを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mochaフレームワークでのタイプスクリプトを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[DockerでのWDIO 7スクリプトの実行](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[ネットワークログ](https://github.com/17thSep/MonitorNetworkLogs/)

以下のためのボイラープレートプロジェクト：

- ネットワークログのキャプチャ
- すべてのGET/POSTコールまたは特定のREST APIのキャプチャ
- リクエストパラメータのアサート
- レスポンスパラメータのアサート
- すべてのレスポンスを別のファイルに保存

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

ページオブジェクトパターンを使用したcucumber v7とwdio v7でネイティブおよびモバイルブラウザのappiumテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 特徴
    - ネイティブAndroidおよびiOSアプリ
    - Android Chromeブラウザ
    - iOS Safariブラウザ
    - ページオブジェクトモデル
    - cucumberでのサンプルテストシナリオを含む
    - 複数のcucumber HTMLレポートと統合

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

これは最新のWebdriverIOとCucumberフレームワークを使用してWebアプリケーションからwebdriverioテストを実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、DockerでWebdriverIOテストを実行する方法を理解するために使用できるベースラインイメージとして機能することを目的としています。

このプロジェクトには以下が含まれます：

- DockerFile
- cucumberプロジェクト

詳細は以下で読むことができます：[Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

これはWebdriverIOを使用してelectronJSテストを実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、WebdriverIO electronJSテストの実行方法を理解するために使用できるベースラインイメージとして機能することを目的としています。

このプロジェクトには以下が含まれます：

- サンプルelectronjsアプリ
- サンプルcucumberテストスクリプト

詳細は以下で読むことができます：[Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

これはwinappドライバーとWebdriverIOを使用してWindowsアプリケーションを自動化する方法を示すテンプレートプロジェクトです。このプロジェクトは、windappdriverとWebdriverIOテストを実行する方法を理解するために使用できるベースラインイメージとして機能することを目的としています。

詳細は以下で読むことができます：[Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


これは最新のWebdriverIOとJasmineフレームワークでwebdriverio multiremote機能を実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、DockerでWebdriverIOテストを実行する方法を理解するために使用できるベースラインイメージとして機能することを目的としています。

このプロジェクトは以下を使用します：
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

ページオブジェクトパターンを使用したmochaで実際のRokuデバイス上でappiumテストを実行するためのテンプレートプロジェクト。

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

E2EマルチリモートCucumberテストおよびデータ駆動型Mochaテスト用のPoCプロジェクト

- フレームワーク:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- 特徴:
    - Cucumberベースのテスト
    - Mochaベースのデータ駆動型テスト
    - Webのみのテスト - ローカルおよびクラウドプラットフォームで
    - モバイルのみのテスト - ローカルおよびリモートクラウドエミュレータ（またはデバイス）で
    - Web + モバイルテスト - マルチリモート - ローカルおよびクラウドプラットフォームで
    - Allureを含む複数のレポートの統合
    - テストデータ（JSON / XLSX）がグローバルに処理され、テスト実行後にその場で作成されたデータをファイルに書き込む
    - テストを実行してallureレポートをアップロードするGithubワークフロー

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

これは最新のWebdriverIOを使用してappiumとchromedriver serviceでwebdriverioマルチリモートを実行する方法を示すボイラープレートプロジェクトです。

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
  - http://the-internet.herokuapp.comでのログインと[WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)のテスト例