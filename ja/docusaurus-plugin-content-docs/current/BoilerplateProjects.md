---
id: boilerplates
title: ボイラープレートプロジェクト
description: "Mocha、Jasmine、Cucumber、Electron、モバイル向けセットアップを含むWebdriverIOのコミュニティボイラープレートプロジェクトを閲覧し、独自のテストスイートを素早く立ち上げましょう。"
---

これまでに、コミュニティでは独自のテストスイートを構築する際の参考にできるプロジェクトがいくつも開発されてきました。

# v9 ボイラープレートプロジェクト

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumberテストスイート向けの公式ボイラープレートです。150以上の定義済みステップ定義を用意しているので、プロジェクトですぐにフィーチャーファイルを書き始めることができます。

- フレームワーク:
    - Cucumber
    - WebdriverIO
- 機能:
    - 必要なほぼすべてをカバーする150以上の定義済みステップ
    - WebdriverIOのマルチリモート機能を統合
    - 独自のデモアプリ

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babelの機能とページオブジェクトパターンを使用して、JasmineでWebdriverIOテストを実行するためのボイラープレートプロジェクトです。

- フレームワーク
    - WebdriverIO
    - Jasmine
- 機能
    - ページオブジェクトパターン
    - Sauce Labs統合

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
最小構成のElectronアプリケーション上でWebdriverIOテストを実行するためのボイラープレートプロジェクトです。

- フレームワーク
    - WebdriverIO
    - Mocha
- 機能
    - Electron APIのモック

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

このボイラープレートプロジェクトには、ページオブジェクトモデルパターンに従い、Cucumber、TypeScript、Appiumを使用したAndroidおよびiOSプラットフォーム向けのWebdriverIO 9モバイルテストが含まれています。包括的なロギング、レポート、モバイルジェスチャー、アプリからWebへのナビゲーション、CI/CD統合を備えています。

- フレームワーク:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- 機能:
    - マルチプラットフォームサポート
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - モバイルジェスチャー
      - スクロール
      - スワイプ
      - 長押し
      - キーボードを隠す
    - アプリからWebへのナビゲーション
      - コンテキスト切り替え
      - WebViewサポート
      - ブラウザ自動化（Chrome/Safari）
    - クリーンなアプリ状態
      - シナリオ間での自動アプリリセット
      - 設定可能なリセット動作（noReset、fullReset）
    - デバイス設定
      - 一元化されたデバイス管理
      - 簡単なプラットフォーム切り替え
    - JavaScript / TypeScript向けのディレクトリ構造の例。以下はJS版のものですが、TS版も同じ構造です。

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkinの.featureファイルからWebdriverIOのページオブジェクトクラスとMochaテストスペックを自動生成し、手作業を削減し、一貫性を向上させ、QA自動化を高速化します。このプロジェクトはwebdriver.ioと互換性のあるコードを生成するだけでなく、webdriver.ioのすべての機能を強化します。JavaScriptユーザー向けとTypeScriptユーザー向けの2つのバージョンを用意していますが、どちらのプロジェクトも同じように動作します。

***仕組み***
- このプロセスは2段階の自動化で構成されています:
- ステップ1: GherkinからstepMapへ（stepMap.jsonファイルの生成）
  - stepMap.jsonファイルの生成:
    - Gherkin構文で書かれた.featureファイルを解析します。
    - シナリオとステップを抽出します。
    - 以下を含む構造化された.stepMap.jsonファイルを生成します:
      - 実行するaction（例: click、setText、assertVisible）
      - 論理的なマッピングのためのselectorName
      - DOM要素のselector
      - 値やアサーションのためのnote
- ステップ2: stepMapからコードへ（WebdriverIOコードの生成）。
  stepMap.jsonを使用して以下を生成します:
  - 共有メソッドとbrowser.url()のセットアップを含むベースのpage.jsクラスを生成します。
  - test/pageobjects/内に、フィーチャーごとにWebdriverIO互換のページオブジェクトモデル（POM）クラスを生成します。
  - Mochaベースのテストスペックを生成します。
- JavaScript / TypeScript向けのディレクトリ構造の例。以下はJS版のものですが、TS版も同じ構造です。
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

- フレームワーク: WDIO-V8とCucumber（V8x）。
- 機能:
    - ES6 / ES7スタイルのクラスベースアプローチとTypeScriptサポートを用いたページオブジェクトモデル
    - 複数のセレクタで一度に要素を検索するマルチセレクタオプションの例
    - ChromeとFirefoxを使用したマルチブラウザおよびヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とのクラウドテスト統合
    - 外部データソースからのテストデータを簡単に管理するための、MS-Excelからのデータ読み書きの例
    - 任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのデータベースサポート、クエリの実行や結果セットの取得など、E2Eテスト向けの例
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）と、AllureおよびXunit/JunitレポートのWebサーバーでのホスティング
    - デモアプリ https://search.yahoo.com/ および http://the-internet.herokuapp.com を使用した例
    - BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）およびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。ローカルマシンでのiOSおよびAndroid向けのワンクリックAppiumセットアップについては、[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- フレームワーク: WDIO-V8とMocha（V10x）。
- 機能:
    -  ES6 / ES7スタイルのクラスベースアプローチとTypeScriptサポートを用いたページオブジェクトモデル
    -  デモアプリ https://search.yahoo.com および http://the-internet.herokuapp.com を使用した例
    -  ChromeとFirefoxを使用したマルチブラウザおよびヘッドレスブラウザ実行の例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とのクラウドテスト統合
    -  複数のレポート（Spec、Xunit/Junit、Allure、JSON）と、AllureおよびXunit/JunitレポートのWebサーバーでのホスティング
    -  外部データソースからのテストデータを簡単に管理するための、MS-Excelからのデータ読み書きの例
    -  任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリの実行や結果セットの取得など、E2Eテスト向けの例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）およびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。ローカルマシンでのiOSおよびAndroid向けのワンクリックAppiumセットアップについては、[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- フレームワーク: WDIO-V8とJasmine（V4x）。
- 機能:
    -  ES6 / ES7スタイルのクラスベースアプローチとTypeScriptサポートを用いたページオブジェクトモデル
    -  デモアプリ https://search.yahoo.com および http://the-internet.herokuapp.com を使用した例
    -  ChromeとFirefoxを使用したマルチブラウザおよびヘッドレスブラウザ実行の例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とのクラウドテスト統合
    -  複数のレポート（Spec、Xunit/Junit、Allure、JSON）と、AllureおよびXunit/JunitレポートのWebサーバーでのホスティング
    -  外部データソースからのテストデータを簡単に管理するための、MS-Excelからのデータ読み書きの例
    -  任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリの実行や結果セットの取得など、E2Eテスト向けの例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）およびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。ローカルマシンでのiOSおよびAndroid向けのワンクリックAppiumセットアップについては、[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

このボイラープレートプロジェクトには、ページオブジェクトパターンに従った、CucumberとTypeScriptを使用するWebdriverIO 8のテストが含まれています。

- フレームワーク:
    - WebdriverIO v8
    - Cucumber v8

- 機能:
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
    - BrowserStackおよびSauce Labsとのクラウドテスト統合
    - Dockerサービス
    - データ共有サービス
    - サービスごとに分離された設定ファイル
    - テストデータ管理とユーザータイプ別の読み込み
    - レポート
      - Dot
      - Spec
      - 失敗時のスクリーンショット付きMultiple cucumber htmlレポート
    - Gitlabリポジトリ向けのGitlabパイプライン
    - Githubリポジトリ向けのGithub Actions
    - Docker Hubをセットアップするためのdocker compose
    - AXEを使用したアクセシビリティテスト
    - Applitoolsを使用したビジュアルテスト
    - ログの仕組み


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 機能
    - Cucumberのサンプルテストシナリオを含む
    - 失敗時の動画が埋め込まれたCucumber htmlレポートを統合
    - LambdatestおよびCircleCIサービスを統合
    - ビジュアル、アクセシビリティ、APIテストを統合
    - メール機能を統合
    - テストレポートの保存と取得のためのs3バケットを統合

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

最新のWebdriverIO、Mocha、Serenity/JSを使用して、Webアプリケーションの受け入れテストを始めるのに役立つ[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトです。

- フレームワーク
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDDレポート

- 機能
    - [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - テスト失敗時の自動スクリーンショット（レポートに埋め込み）
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)を使用した継続的インテグレーション（CI）のセットアップ
    - GitHub Pagesで公開された[デモSerenity BDDレポート](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

最新のWebdriverIO、Cucumber、Serenity/JSを使用して、Webアプリケーションの受け入れテストを始めるのに役立つ[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトです。

- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDDレポート

- 機能
    - [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - テスト失敗時の自動スクリーンショット（レポートに埋め込み）
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)を使用した継続的インテグレーション（CI）のセットアップ
    - GitHub Pagesで公開された[デモSerenity BDDレポート](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumberのフィーチャーとページオブジェクトパターンを使用して、Headspin Cloud（https://www.headspin.io/）でWebdriverIOテストを実行するためのボイラープレートプロジェクトです。
- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 機能
    - [Headspin](https://www.headspin.io/)とのクラウド統合
    - ページオブジェクトモデルをサポート
    - 宣言的スタイルのBDDで書かれたサンプルシナリオを含む
    - Cucumber htmlレポートを統合

# v7 ボイラープレートプロジェクト
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

以下を対象に、WebdriverIOでAppiumテストを実行するためのボイラープレートプロジェクトです:

- iOS/Androidネイティブアプリ
- iOS/Androidハイブリッドアプリ
- Android ChromeおよびiOS Safariブラウザ

このボイラープレートには以下が含まれています:

- フレームワーク: Mocha
- 機能:
    - 以下の設定:
        - iOSおよびAndroidアプリ
        - iOSおよびAndroidブラウザ
    - 以下のヘルパー:
        - WebView
        - ジェスチャー
        - ネイティブアラート
        - ピッカー
     - 以下のテスト例:
        - WebView
        - ログイン
        - フォーム
        - スワイプ
        - ブラウザ

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Mocha、WebdriverIO v6とページオブジェクトを使用したATDD Webテスト

- フレームワーク
  - WebdriverIO (v7)
  - Mocha
- 機能
  - [ページオブジェクト](pageobjects)モデル
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)によるSauce Labs統合
  - Allureレポート
  - 失敗したテストのスクリーンショット自動取得
  - CircleCIの例
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

MochaでE2Eテストを実行するためのボイラープレートプロジェクトです。

- フレームワーク:
    - WebdriverIO (v7)
    - Mocha
- 機能:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [ビジュアルリグレッションテスト](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   ページオブジェクトパターン
    -   [Commit lint](https://github.com/conventional-changelog/commitlint)と[Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actionsの例
    -   Allureレポート（失敗時のスクリーンショット）

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

以下を対象に、**WebdriverIO v7**テストを実行するためのボイラープレートプロジェクトです:

[CucumberフレームワークでのTypeScriptによるWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[MochaフレームワークでのTypeScriptによるWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[DockerでのWDIO 7スクリプトの実行](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[ネットワークログ](https://github.com/17thSep/MonitorNetworkLogs/)

以下のためのボイラープレートプロジェクト:

- ネットワークログの取得
- すべてのGET/POST呼び出し、または特定のREST APIの取得
- リクエストパラメータのアサート
- レスポンスパラメータのアサート
- すべてのレスポンスを別ファイルに保存

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

ページオブジェクトパターンとともにcucumber v7とwdio v7を使用して、ネイティブおよびモバイルブラウザ向けのAppiumテストを実行するためのボイラープレートプロジェクトです。

- フレームワーク
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 機能
    - ネイティブAndroidおよびiOSアプリ
    - Android Chromeブラウザ
    - iOS Safariブラウザ
    - ページオブジェクトモデル
    - Cucumberのサンプルテストシナリオを含む
    - Multiple cucumber htmlレポートと統合

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

最新のWebdriverIOとCucumberフレームワークを使用して、WebアプリケーションでWebdriverIOテストを実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、DockerでWebdriverIOテストを実行する方法を理解するためのベースラインイメージとして機能することを目的としています。

このプロジェクトには以下が含まれます:

- DockerFile
- cucumberプロジェクト

詳細はこちら: [Mediumブログ](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

WebdriverIOを使用してelectronJSテストを実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、WebdriverIOでelectronJSテストを実行する方法を理解するためのベースラインイメージとして機能することを目的としています。

このプロジェクトには以下が含まれます:

- サンプルelectronjsアプリ
- サンプルcucumberテストスクリプト

詳細はこちら: [Mediumブログ](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

winappdriverとWebdriverIOを使用してWindowsアプリケーションを自動化する方法を示すテンプレートプロジェクトです。このプロジェクトは、winappdriverとWebdriverIOのテストを実行する方法を理解するためのベースラインイメージとして機能することを目的としています。

詳細はこちら: [Mediumブログ](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


最新のWebdriverIOとJasmineフレームワークを使用して、WebdriverIOのマルチリモート機能を実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、DockerでWebdriverIOテストを実行する方法を理解するためのベースラインイメージとして機能することを目的としています。

このプロジェクトでは以下を使用しています:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

ページオブジェクトパターンとともにmochaを使用して、実際のRokuデバイス上でAppiumテストを実行するためのテンプレートプロジェクトです。

- フレームワーク
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Allureレポート

- 機能
    - ページオブジェクトモデル
    - Typescript
    - 失敗時のスクリーンショット
    - サンプルRokuチャンネルを使用したテスト例

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2EマルチリモートCucumberテストおよびデータ駆動型Mochaテストのためのプルーフオブコンセプト（PoC）プロジェクトです。

- フレームワーク:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- 機能:
    - CucumberベースのE2Eテスト
    - Mochaベースのデータ駆動テスト
    - Webのみのテスト - ローカルおよびクラウドプラットフォーム
    - モバイルのみのテスト - ローカルおよびリモートクラウドエミュレーター（またはデバイス）
    - Web + モバイルテスト - マルチリモート - ローカルおよびクラウドプラットフォーム
    - Allureを含む複数のレポートを統合
    - テスト実行後に（その場で作成された）データをファイルに書き込めるよう、テストデータ（JSON / XLSX）をグローバルに処理
    - テストを実行し、Allureレポートをアップロードするためのgithubワークフロー

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

最新のWebdriverIOで、AppiumとChromedriverサービスを使用してWebdriverIOのマルチリモートを実行する方法を示すボイラープレートプロジェクトです。

- フレームワーク
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- 機能
  - [ページオブジェクト](pageobjects)モデル
  - Typescript
  - Web + モバイルテスト - マルチリモート
  - ネイティブAndroidおよびiOSアプリ
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com および[WebdriverIOネイティブデモアプリ](https://github.com/webdriverio/native-demo-app)でのログインのテスト例