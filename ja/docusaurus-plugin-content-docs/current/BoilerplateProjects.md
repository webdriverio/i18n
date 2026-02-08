---
id: boilerplates
title: ボイラープレートプロジェクト
---

長い間、私たちのコミュニティはあなた自身のテストスイートをセットアップするための参考になるいくつかのプロジェクトを開発してきました。

# v9 ボイラープレートプロジェクト

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumberテストスイート用の私たち独自のボイラープレートです。150以上の定義済みステップ定義を作成したので、プロジェクトですぐにフィーチャーファイルを書き始めることができます。

- フレームワーク:
    - Cucumber
    - WebdriverIO
- 特徴:
    - 必要なものをほぼすべてカバーする150以上の定義済みステップ
    - WebdriverIOのマルチリモート機能を統合
    - 独自のデモアプリ

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel機能とページオブジェクトパターンを使用してJasmineでWebdriverIOテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO
    - Jasmine
- 特徴
    - ページオブジェクトパターン
    - Sauce Labsとの統合

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
最小限のElectronアプリケーションでWebdriverIOテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO
    - Mocha
- 特徴
    - Electron APIモッキング

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

このボイラープレートプロジェクトは、Cucumber、TypeScript、およびAndroidとiOSプラットフォーム向けのAppiumを使用したWebdriverIO 9モバイルテストがあり、ページオブジェクトモデルパターンに従っています。包括的なロギング、レポート、モバイルジェスチャー、アプリからウェブへのナビゲーション、CI/CD統合などの機能があります。

- フレームワーク:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- 特徴:
    - マルチプラットフォームサポート
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - モバイルジェスチャー
      - スクロール
      - スワイプ
      - 長押し
      - キーボードを隠す
    - アプリからウェブへのナビゲーション
      - コンテキスト切り替え
      - WebViewサポート
      - ブラウザ自動化（Chrome/Safari）
    - 新しいアプリの状態
      - シナリオ間の自動アプリリセット
      - 設定可能なリセット動作（noReset、fullReset）
    - デバイス設定
      - 集中管理されたデバイス管理
      - 簡単なプラットフォーム切り替え
    - JavaScriptとTypeScriptのディレクトリ構造例。以下はJSバージョンのものですが、TSバージョンも同じ構造を持っています。

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkin .featureファイルからWebdriverIO Page Objectクラスとモカテスト仕様を自動生成 — 手動の作業を減らし、一貫性を向上させ、QA自動化のスピードを上げます。このプロジェクトはwebdriver.ioと互換性のあるコードを生成するだけでなく、webdriver.ioのすべての機能を強化します。JavaScript用とTypeScript用の2つのバージョンが用意されていますが、どちらのプロジェクトも同じように機能します。

***どのように機能するか？***
- プロセスは2段階の自動化に従います：
- ステップ1：GherkinからstepMap（stepMap.jsonファイルの生成）
  - stepMap.jsonファイルを生成：
    - Gherkin構文で書かれた.featureファイルを解析
    - シナリオとステップを抽出
    - 以下を含む構造化された.stepMap.jsonファイルを生成：
      - 実行するアクション（クリック、setText、assertVisibleなど）
      - 論理的マッピングのためのselectorName
      - DOM要素のセレクタ
      - 値やアサーションのためのnote
- ステップ2：stepMapからコードへ（WebdriverIOコードの生成）
  stepMap.jsonを使用して以下を生成：
  - 共有メソッドとbrowser.url()設定を含むbase page.jsクラスを生成
  - test/pageobjects/内のフィーチャごとにWebdriverIO互換のPage Object Model（POM）クラスを生成
  - Mochaベースのテスト仕様を生成
- JavaScriptとTypeScriptのディレクトリ構造例。以下はJSバージョンのものですが、TSバージョンも同じ構造を持っています。
```
project-root/
├── features/                   # Gherkin .featureファイル（ユーザー入力/ソースファイル）
├── stepMaps/                   # 自動生成された.stepMap.jsonファイル
├── test/
│   ├── pageobjects/            # 自動生成されたWebdriverIOテストPage Object Modelクラス
│   └── specs/                  # 自動生成されたMochaテスト仕様
├── src/
│   ├── cli.js                  # メインCLIロジック
│   ├── generateStepsMap.js     # フィーチャからstepMapへのジェネレータ
│   ├── generateTestsFromMap.js # stepMapからページ/仕様へのジェネレータ
│   ├── utils.js                # ヘルパーメソッド
│   └── config.js               # パス、フォールバックセレクタ、エイリアス
│   └── __tests__/              # ユニットテスト（Vitest）
├── testgen.js                  # CLIエントリーポイント
│── wdio.config.js              # WebdriverIO設定
├── package.json                # スクリプトと依存関係
├── selector-aliases.json       # オプションのユーザー定義セレクタがプライマリセレクタをオーバーライド
```
---
# v8 ボイラープレートプロジェクト

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- フレームワーク: WDIO-V8 with Cucumber (V8x).
- 特徴:
    - ES6 /ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    - 一度に複数のセレクタでエレメントをクエリする複数セレクタオプションの例
    - ChromeとFirefoxを使用した複数ブラウザとヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とのクラウドテスト統合
    - 外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータの読み書きの例
    - 任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのデータベースサポート、クエリの実行/結果セットの取得などE2Eテストの例
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureとXunit/Junitレポートのホスティング
    - デモアプリhttps://search.yahoo.com/とhttp://the-internet.herokuapp.comを使用した例
    - BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とAppium専用の`.config`ファイル（モバイルデバイスでの再生用）。iOSとAndroid用のローカルマシン上でのワンクリックAppiumセットアップは[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- フレームワーク: WDIO-V8 with Mocha (V10x).
- 特徴:
    -  ES6 /ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    -  デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    -  ChromeとFirefoxを使用した複数ブラウザとヘッドレスブラウザ実行の例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とのクラウドテスト統合
    -  複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureとXunit/Junitレポートのホスティング
    -  外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータの読み書きの例
    -  E2Eテスト用の任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリ実行/結果セット取得などの例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とAppium専用の`.config`ファイル（モバイルデバイスでの再生用）。iOSとAndroid用のローカルマシン上でのワンクリックAppiumセットアップは[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- フレームワーク: WDIO-V8 with Jasmine (V4x).
- 特徴:
    -  ES6 /ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用したページオブジェクトモデル
    -  デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    -  ChromeとFirefoxを使用した複数ブラウザとヘッドレスブラウザ実行の例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とのクラウドテスト統合
    -  複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureとXunit/Junitレポートのホスティング
    -  外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータの読み書きの例
    -  E2Eテスト用の任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのDB接続、クエリ実行/結果セット取得などの例
    -  BrowserStack、Sauce Labs、TestMu AI（旧LambdaTest）とAppium専用の`.config`ファイル（モバイルデバイスでの再生用）。iOSとAndroid用のローカルマシン上でのワンクリックAppiumセットアップは[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

このボイラープレートプロジェクトは、cucumberとtypescriptを使用したWebdriverIO 8テストを、ページオブジェクトパターンに従って提供しています。

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
      - スタンドアロン
    - クロスブラウザ並列実行
    - Appium
    - BrowserStackとSauce Labsとのクラウドテスト統合
    - Dockerサービス
    - データ共有サービス
    - 各サービスごとの個別の設定ファイル
    - ユーザータイプごとのテストデータ管理と読み込み
    - レポート
      - Dot
      - Spec
      - 失敗スクリーンショット付きの複数のcucumber htmlレポート
    - GitlabリポジトリのためのGitlabパイプライン
    - GithubリポジトリのためのGithub actions
    - Dockerハブをセットアップするためのdocker compose
    - AXEを使用したアクセシビリティテスト
    - Applitoolsを使用した視覚的テスト
    - ログメカニズム


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特徴
    - cucumberのサンプルテストシナリオを含む
    - 失敗時の埋め込みビデオ付きcucumber htmlレポートの統合
    - LambdatestとCircleCIサービスの統合
    - 視覚的、アクセシビリティ、APIテストの統合
    - メール機能の統合
    - テストレポートの保存と取得のためのs3バケットの統合

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

最新のWebdriverIO、Mocha、Serenity/JSを使用してWebアプリケーションの受け入れテストを始めるのに役立つ[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクト。

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

最新のWebdriverIO、Cucumber、Serenity/JSを使用してWebアプリケーションの受け入れテストを始めるのに役立つ[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクト。

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
Headspin Cloud (https://www.headspin.io/) でCucumber機能とページオブジェクトパターンを使用してWebdriverIOテストを実行するためのボイラープレートプロジェクト。
- フレームワーク
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特徴
    - [Headspin](https://www.headspin.io/)とのクラウド統合
    - ページオブジェクトモデルをサポート
    - BDDの宣言的スタイルで書かれたサンプルシナリオを含む
    - cucumber htmlレポートの統合

# v7 ボイラープレートプロジェクト
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

以下のためにWebdriverIOでAppiumテストを実行するためのボイラープレートプロジェクト：

- iOS/Android ネイティブアプリ
- iOS/Android ハイブリッドアプリ
- Android ChromeとiOS Safariブラウザ

このボイラープレートには以下が含まれています：

- フレームワーク: Mocha
- 特徴:
    - 以下の設定:
        - iOSとAndroidアプリ
        - iOSとAndroidブラウザ
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
PageObjectを使用したMocha、WebdriverIO v6によるATTD WEBテスト

- フレームワーク
  - WebdriverIO (v7)
  - Mocha
- 特徴
  - [Page Object](pageobjects) モデル
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)によるSauce Labs統合
  - Allureレポート
  - 失敗テストの自動スクリーンショットキャプチャ
  - CircleCIの例
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mochaを使用してE2Eテストを実行するためのボイラープレートプロジェクト。

- フレームワーク:
    - WebdriverIO (v7)
    - Mocha
- 特徴:
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

以下のための**WebdriverIO v7**テストを実行するためのボイラープレートプロジェクト：

[CucumberフレームワークでのTypeScriptを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[MochaフレームワークでのTypeScriptを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[DockerでのWDIO 7スクリプトの実行](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[ネットワークログ](https://github.com/17thSep/MonitorNetworkLogs/)

以下のためのボイラープレートプロジェクト：

- ネットワークログのキャプチャ
- すべてのGET/POSTコールまたは特定のREST APIのキャプチャ
- リクエストパラメータのアサート
- レスポンスパラメータのアサート
- すべてのレスポンスを別のファイルに保存

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

cucumber v7とwdio v7を使用し、ページオブジェクトパターンでネイティブおよびモバイルブラウザのappiumテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 特徴
    - ネイティブAndroidとiOSアプリ
    - Android Chromeブラウザ
    - iOS Safariブラウザ
    - ページオブジェクトモデル
    - cucumberでのサンプルテストシナリオを含む
    - 複数のcucumber htmlレポートとの統合

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

これは、最新のWebdriverIOとCucumberフレームワークを使用してWebアプリケーションからwebdriverioテストを実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、DockerでWebdriverIOテストを実行する方法を理解するための基本イメージとして機能することを意図しています。

このプロジェクトには以下が含まれています：

- DockerFile
- cucumberプロジェクト

詳しくは：[Mediumブログ](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

これは、WebdriverIOを使用してelectronJSテストを実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、WebdriverIO electronJSテストの実行方法を理解するための基本イメージとして機能することを意図しています。

このプロジェクトには以下が含まれています：

- サンプルelectronjsアプリ
- サンプルcucumberテストスクリプト

詳しくは：[Mediumブログ](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

これは、winappDriverとWebdriverIOを使用してWindows アプリケーションを自動化する方法を示すテンプレートプロジェクトです。このプロジェクトは、windappdriverとWebdriverIOテストの実行方法を理解するための基本イメージとして機能することを意図しています。

詳しくは：[Mediumブログ](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


これは、最新のWebdriverIOとJasmineフレームワークを使用してwebdriverioマルチリモート機能を実行する方法を示すテンプレートプロジェクトです。このプロジェクトは、Dockerでウェブドライバーのテストを実行する方法を理解するためのベースラインイメージとして機能することを目的としています。

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

E2Eマルチリモートのキュウリのテスト、およびデータ駆動型のMochaテストのためのPoCプロジェクト

- フレームワーク:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- 特徴:
    - CucumberベースのE2Eテスト
    - Mochaベースのデータドリブンテスト
    - Webのみのテスト - ローカルおよびクラウドプラットフォームでの実行
    - モバイルのみのテスト - ローカルおよびリモートクラウドエミュレータ（またはデバイス）での実行
    - Web + モバイルテスト - マルチリモート - ローカルおよびクラウドプラットフォームでの実行
    - Allureを含む複数のレポートの統合
    - テストデータ（JSON / XLSX）はグローバルに処理され、テスト実行後にその場で作成されたデータをファイルに書き込めるようになっています
    - テストを実行してallureレポートをアップロードするGithubワークフロー

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

これは、最新のWebdriverIOを使用して、appiumとchromedriverサービスでwebdriverioマルチリモートを実行する方法を示すためのボイラープレートプロジェクトです。

- フレームワーク
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- 特徴
  - [Page Object](pageobjects) モデル
  - Typescript
  - Web + モバイルテスト - マルチリモート
  - ネイティブAndroidとiOSアプリ
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.comと[WebdriverIOネイティブデモアプリ](https://github.com/webdriverio/native-demo-app)でのログインのテスト例