---
id: boilerplates
title: ボイラープレートプロジェクト
---

時間の経過とともに、コミュニティは独自のテストスイートを設定するためのインスピレーションとして使用できるいくつかのプロジェクトを開発してきました。

# v9 ボイラープレートプロジェクト

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumberテストスイート用の私たち独自のボイラープレート。150以上の事前定義されたステップ定義を作成したので、プロジェクトですぐにフィーチャーファイルの作成を開始できます。

- フレームワーク:
    - Cucumber
    - WebdriverIO
- 特徴:
    - 必要なほぼすべてをカバーする150以上の事前定義されたステップ
    - WebdriverIOのMultiremote機能を統合
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

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Gherkin .featureファイルからWebdriverIO ページオブジェクトクラスとMochaテスト仕様を自動生成 — 手動作業を減らし、一貫性を向上させ、QA自動化を高速化します。このプロジェクトはwebdriver.ioと互換性のあるコードを生成するだけでなく、webdriver.ioのすべての機能を強化します。

***どのように機能するか？***
- プロセスは2段階の自動化に従います：
- ステップ1：GherkinからstepMapへ（stepMap.jsonファイルを生成）
  - stepMap.jsonファイルを生成：
    - Gherkin構文で書かれた.featureファイルを解析。
    - シナリオとステップを抽出。
    - 以下を含む構造化された.stepMap.jsonファイルを生成：
      - 実行するアクション（例：click、setText、assertVisible）
      - 論理マッピングのためのselectorName
      - DOM要素のためのセレクタ
      - 値または検証のためのノート
- ステップ2：stepMapからコードへ（WebdriverIOコードを生成）。
  stepMap.jsonを使用して以下を生成：
  - 共有メソッドとbrowser.url()セットアップを持つベースpage.jsクラスを生成。
  - test/pageobjects/内のフィーチャーごとにWebdriverIO互換のページオブジェクトモデル（POM）クラスを生成。
  - Mochaベースのテスト仕様を生成。
- ディレクトリ構造
```
project-root/
├── features/               # 入力Gherkinフィーチャーファイル
├── stepMaps/               # 生成されるステップマップ（JSON）
├── test/
│   ├── pageobjects/        # 生成されるベースPageクラス、ページオブジェクトクラス
│   └── specs/              # 生成されるテスト仕様
├── generateStepMap.js      # StepMapジェネレータスクリプト
├── generateTestsFromMap.js # PageObject + テスト仕様ジェネレータスクリプト
├── package.json
├── README.md
└── wdio.conf.js
```
---
# v8 ボイラープレートプロジェクト

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- フレームワーク: WDIO-V8とCucumber（V8x）。
- 特徴:
    - ページオブジェクトモデルはES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用
    - 一度に複数のセレクタオプションで要素をクエリする例
    - ChromeとFirefoxを使用した複数のブラウザとヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト統合
    - E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータの読み書きの例
    - 任意のRDBMS（Oracle、MySql、TeraData、Verticaなど）へのデータベースサポート、クエリの実行/結果セットの取得などの例
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureとXunit/Junitレポートのホスティング。
    - デモアプリhttps://search.yahoo.com/とhttp://the-internet.herokuapp.comを使用した例。
    - BrowserStack、Sauce Labs、LambdaTestおよびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。iOS/AndroidのローカルマシンでのAppiumのワンクリックセットアップについては、[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- フレームワーク: WDIO-V8とMocha（V10x）。
- 特徴:
    - ページオブジェクトモデルはES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用
    - デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    - ChromeとFirefoxを使用した複数のブラウザとヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト統合
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureとXunit/Junitレポートのホスティング。
    - E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータの読み書きの例
    - E2Eテストの例としてのDB接続（Oracle、MySql、TeraData、Verticaなど）、クエリの実行/結果セットの取得などの例
    - BrowserStack、Sauce Labs、LambdaTestおよびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。iOS/AndroidのローカルマシンでのAppiumのワンクリックセットアップについては、[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- フレームワーク: WDIO-V8とJasmine（V4x）。
- 特徴:
    - ページオブジェクトモデルはES6/ES7スタイルのクラスベースアプローチとTypeScriptサポートを使用
    - デモアプリhttps://search.yahoo.comとhttp://the-internet.herokuapp.comを使用した例
    - ChromeとFirefoxを使用した複数のブラウザとヘッドレスブラウザ実行の例
    - BrowserStack、Sauce Labs、LambdaTestとのクラウドテスト統合
    - 複数のレポート（Spec、Xunit/Junit、Allure、JSON）とWebサーバー上でのAllureとXunit/Junitレポートのホスティング。
    - E2Eテスト用の外部データソースからの簡単なテストデータ管理のためのMS-Excelからのデータの読み書きの例
    - E2Eテストの例としてのDB接続（Oracle、MySql、TeraData、Verticaなど）、クエリの実行/結果セットの取得などの例
    - BrowserStack、Sauce Labs、LambdaTestおよびAppium固有の`.config`ファイル（モバイルデバイスでの再生用）。iOS/AndroidのローカルマシンでのAppiumのワンクリックセットアップについては、[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)を参照してください。

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

このボイラープレートプロジェクトには、ページオブジェクトパターンに従ったcucumberとtypescriptを使用したWebdriverIO 8テストがあります。

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
    - 各サービスの個別設定ファイル
    - ユーザータイプ別テストデータ管理と読み取り
    - レポート
      - Dot
      - Spec
      - 失敗スクリーンショット付きの複数のcucumber htmlレポート
    - Gitlabリポジトリ用のGitlabパイプライン
    - GithubリポジトリのGithubアクション
    - Dockerハブを設定するためのDockerコンポーズ
    - AXEを使用したアクセシビリティテスト
    - Applitoolsを使用した視覚的テスト
    - ログメカニズム


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- フレームワーク
    - WebdriverIO（v8）
    - Cucumber（v8）

- 特徴
    - キュウリにサンプルテストシナリオを含む
    - 失敗時の埋め込みビデオ付きのcucumber htmlレポートの統合
    - LambdatestとCircleCIサービスの統合
    - ビジュアル、アクセシビリティ、APIテストの統合
    - 電子メール機能の統合
    - テストレポートの保存と取得のためのs3バケットの統合

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトは、最新のWebdriverIO、Mocha、Serenity/JSを使用してWebアプリケーションの受け入れテストを開始するのに役立ちます。

- フレームワーク
    - WebdriverIO（v8）
    - Mocha（v10）
    - Serenity/JS（v3）
    - Serenity BDDレポート

- 特徴
    - [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - テスト失敗時の自動スクリーンショット（レポートに埋め込み）
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)を使用した継続的インテグレーション（CI）設定
    - GitHub Pagesに公開された[デモSerenity BDDレポート](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)テンプレートプロジェクトは、最新のWebdriverIO、Cucumber、Serenity/JSを使用してWebアプリケーションの受け入れテストを開始するのに役立ちます。

- フレームワーク
    - WebdriverIO（v8）
    - Cucumber（v9）
    - Serenity/JS（v3）
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
    - WebdriverIO（v8）
    - Cucumber（v8）

- 特徴
    - [Headspin](https://www.headspin.io/)とのクラウド統合
    - ページオブジェクトモデルをサポート
    - BDDの宣言型スタイルで書かれたサンプルシナリオを含む
    - cucumber htmlレポートの統合

# v7 ボイラープレートプロジェクト
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

以下のAppiumテストをWebdriverIOで実行するためのボイラープレートプロジェクト：

- iOS/Androidネイティブアプリケーションのテスト
- iOS/Androidハイブリッドアプリケーションのテスト
- Android ChromeおよびiOS Safariブラウザのテスト

このボイラープレートには以下が含まれます：

- フレームワーク: Mocha
- 特徴:
    - 設定対象:
        - iOSおよびAndroidアプリケーション
        - iOSおよびAndroidブラウザ
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
PageObjectを使用したMocha、WebdriverIO v6のATDD WEBテスト

- フレームワーク
  - WebdriverIO（v7）
  - Mocha
- 特徴
  - [ページオブジェクト](pageobjects)モデル
  - [Sauceサービス](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)を使用したSauce Labs統合
  - Allureレポート
  - 失敗テストの自動スクリーンショットキャプチャ
  - CircleCI例
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mochaを使用してE2Eテストを実行するためのボイラープレートプロジェクト。

- フレームワーク:
    - WebdriverIO（v7）
    - Mocha
- 特徴:
    - TypeScript
    - [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    - [ビジュアル回帰テスト](https://github.com/wswebcreation/wdio-image-comparison-service)
    - ページオブジェクトパターン
    - [Commit lint](https://github.com/conventional-changelog/commitlint)と[Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    - ESlint
    - Prettier
    - Husky
    - Githubアクション例
    - Allureレポート（失敗時のスクリーンショット）

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

以下のためのWebdriverIO v7テストを実行するためのボイラープレートプロジェクト：

[Cucumberフレームワークでのタイプスクリプトを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mochaフレームワークでのタイプスクリプトを使用したWDIO 7スクリプト](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[DockerでのWDIO 7スクリプトの実行](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[ネットワークログ](https://github.com/17thSep/MonitorNetworkLogs/)

以下のためのボイラープレートプロジェクト：

- ネットワークログのキャプチャ
- すべてのGET/POSTコールまたは特定のRESTAPIのキャプチャ
- リクエストパラメータのアサーション
- レスポンスパラメータのアサーション
- すべてのレスポンスを別ファイルに保存

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

ページオブジェクトパターンを使用してcucumber v7とwdio v7でネイティブおよびモバイルブラウザのappiumテストを実行するためのボイラープレートプロジェクト。

- フレームワーク
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 特徴
    - ネイティブのAndroidとiOSアプリ
    - Android Chromeブラウザ
    - iOS Safariブラウザ
    - ページオブジェクトモデル
    - cucumberでのサンプルテストシナリオを含む
    - 複数のcucumber htmlレポートと統合

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

これは、最新のWebdriverIOとCucumberフレームワークを使用してWebアプリケーションからWebdriverIOテストを実行する方法を示すためのテンプレートプロジェクトです。このプロジェクトは、DockerでWebdriverIOテストを実行する方法を理解するためのベースラインイメージとして機能することを意図しています。

このプロジェクトには以下が含まれます：

- DockerFile
- cucumberプロジェクト

詳細はこちら：[Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

これは、WebdriverIOを使用してelectronJSテストを実行する方法を示すためのテンプレートプロジェクトです。このプロジェクトは、WebdriverIO electronJSテストの実行方法を理解するためのベースラインイメージとして機能することを意図しています。

このプロジェクトには以下が含まれます：

- サンプルelectronjsアプリ
- サンプルcucumberテストスクリプト

詳細はこちら：[Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

これは、winappdriver と WebdriverIO を使用して Windows アプリケーションを自動化する方法を示すためのテンプレートプロジェクトです。このプロジェクトは、windappdriver と WebdriverIO テストの実行方法を理解するためのベースラインイメージとして機能することを意図しています。

詳細はこちら：[Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


これは、最新のWebdriverIOとJasmineフレームワークでwebdriverioマルチリモート機能を実行する方法を示すためのテンプレートプロジェクトです。このプロジェクトは、DockerでWebdriverIOテストを実行する方法を理解するためのベースラインイメージとして機能することを意図しています。

このプロジェクトは以下を使用しています：
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

ページオブジェクトパターンを使用してmochaで実際のRokuデバイスでappiumテストを実行するためのテンプレートプロジェクト。

- フレームワーク
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allureレポート

- 特徴
    - ページオブジェクトモデル
    - Typescript
    - 失敗時のスクリーンショット
    - サンプルRokuチャンネルを使用した例テスト

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2Eマルチリモートキュウカンバーテストとデータ駆動型Mochaテストのためのプロジェクト

- フレームワーク:
    - Cucumber（v8）
    - WebdriverIO（v8）
    - Mocha（v8）

- 特徴:
    - CucumberベースのE2Eテスト
    - Mochaベースのデータドリブンテスト
    - Webのみのテスト - ローカルおよびクラウドプラットフォームでの実行
    - モバイルのみのテスト - ローカルおよびリモートクラウドエミュレータ（またはデバイス）での実行
    - Web + モバイルテスト - マルチリモート - ローカルおよびクラウドプラットフォームでの実行
    - Allureを含む複数のレポートの統合
    - テストデータ（JSON / XLSX）はテスト実行後にデータ（その場で作成された）をファイルに書き込むことができるようグローバルに処理
    - テストを実行してallureレポートをアップロードするためのGithubワークフロー

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

これは、最新のWebdriverIOを使用してアピウムとクロームドライバーサービスでwebdriverioマルチリモートを実行する方法を示すためのボイラープレートプロジェクトです。

- フレームワーク
  - WebdriverIO（v9）
  - Appium（v2）
  - Mocha

- 特徴
  - [ページオブジェクト](pageobjects)モデル
  - タイプスクリプト
  - Web + モバイルテスト - マルチリモート
  - ネイティブのAndroidとiOSアプリ
  - Appium
  - Chromedriver
  - ESLint
  - [WebdriverIOネイティブデモアプリ](https://github.com/webdriverio/native-demo-app)でのログインテスト例
