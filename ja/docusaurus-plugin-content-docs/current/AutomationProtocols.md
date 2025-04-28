---
id: automationProtocols
title: オートメーションプロトコル
---

WebdriverIOでは、E2Eテストをローカルまたはクラウドで実行する際に、複数の自動化技術から選択できます。デフォルトでは、WebdriverIOは[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)プロトコルを使用してローカルの自動化セッションを開始しようとします。

## WebDriver Bidiプロトコル

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)は、双方向通信を使用してブラウザを自動化するためのプロトコルです。これは[WebDriver](https://w3c.github.io/webdriver/)プロトコルの後継であり、様々なテストユースケースのためにより多くの内部検査機能を提供します。

このプロトコルは現在開発中であり、将来的に新しいプリミティブが追加される可能性があります。すべてのブラウザベンダーはこのWeb標準の実装にコミットしており、多くの[プリミティブ](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned)がすでにブラウザに実装されています。

## WebDriverプロトコル

> [WebDriver](https://w3c.github.io/webdriver/)は、ユーザーエージェントの検査と制御を可能にするリモートコントロールインターフェースです。これは、プロセス外のプログラムがWebブラウザの動作をリモートで指示するための、プラットフォームと言語に依存しないワイヤープロトコルを提供します。

WebDriverプロトコルは、ユーザーの観点からブラウザを自動化するために設計されており、ユーザーができることはすべてブラウザでも行うことができます。アプリケーションとの一般的な対話（ナビゲーション、クリック、要素の状態の読み取りなど）を抽象化する一連のコマンドを提供します。Web標準であるため、すべての主要なブラウザベンダーで十分にサポートされており、[Appium](http://appium.io)を使用したモバイル自動化の基盤プロトコルとしても使用されています。

この自動化プロトコルを使用するには、すべてのコマンドを翻訳してターゲット環境（ブラウザやモバイルアプリなど）で実行するプロキシサーバーが必要です。

ブラウザ自動化の場合、プロキシサーバーは通常ブラウザドライバーです。すべてのブラウザで利用可能なドライバーがあります：

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

あらゆる種類のモバイル自動化には、[Appium](http://appium.io)のインストールとセットアップが必要です。これにより、同じWebdriverIOのセットアップを使用して、モバイル（iOS/Android）またはデスクトップ（macOS/Windows）アプリケーションを自動化できます。

また、高いスケールでクラウド上で自動化テストを実行できるサービスも多数あります。これらのドライバーをすべてローカルでセットアップする代わりに、クラウド上のこれらのサービス（例：[Sauce Labs](https://saucelabs.com)）と通信し、その結果をそのプラットフォーム上で検査することができます。テストスクリプトと自動化環境間の通信は以下のようになります：

![WebDriver Setup](/img/webdriver.png)