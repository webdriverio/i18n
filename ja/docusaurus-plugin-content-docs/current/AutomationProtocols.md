---
id: automationProtocols
title: 自動化プロトコル
---

WebdriverIOでは、E2Eテストをローカルまたはクラウドで実行する際に、複数の自動化技術から選択できます。デフォルトでは、WebdriverIOは[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)プロトコルを使用してローカルの自動化セッションを開始しようとします。

## WebDriver Bidiプロトコル

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)は、双方向通信を使用してブラウザを自動化するためのプロトコルです。これは[WebDriver](https://w3c.github.io/webdriver/)プロトコルの後継であり、様々なテストユースケースのためのより多くの調査機能を提供します。

このプロトコルは現在開発中であり、将来的に新しいプリミティブが追加される可能性があります。すべてのブラウザベンダーはこのWeb標準の実装にコミットしており、多くの[プリミティブ](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned)がすでにブラウザに実装されています。

## WebDriverプロトコル

> [WebDriver](https://w3c.github.io/webdriver/)は、ユーザーエージェントの調査と制御を可能にするリモートコントロールインターフェースです。プロセス外のプログラムがリモートでWebブラウザの動作を指示する方法として、プラットフォームと言語に依存しないワイヤープロトコルを提供します。

WebDriverプロトコルは、ユーザーの視点からブラウザを自動化するように設計されており、ユーザーができることはすべてブラウザでも実行できます。アプリケーションとの一般的な対話（例：ナビゲーション、クリック、要素の状態の読み取りなど）を抽象化する一連のコマンドを提供します。Web標準であるため、すべての主要なブラウザベンダーでよくサポートされており、また[Appium](http://appium.io)を使用したモバイル自動化の基盤プロトコルとしても使用されています。

この自動化プロトコルを使用するには、すべてのコマンドを変換してターゲット環境（ブラウザやモバイルアプリなど）で実行するプロキシサーバーが必要です。

ブラウザ自動化の場合、プロキシサーバーは通常ブラウザドライバーです。すべてのブラウザで利用可能なドライバーがあります：

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

モバイル自動化を行うには、[Appium](http://appium.io)をインストールして設定する必要があります。これにより、同じWebdriverIOのセットアップを使用して、モバイル（iOS/Android）やデスクトップ（macOS/Windows）アプリケーションも自動化できます。

また、自動化テストを大規模にクラウドで実行できるサービスも多数あります。これらのドライバーをすべてローカルでセットアップする代わりに、クラウド上のこれらのサービス（例：[Sauce Labs](https://saucelabs.com)）と通信し、その結果をそのプラットフォームで確認することができます。テストスクリプトと自動化環境間の通信は次のようになります：

![WebDriver Setup](/img/webdriver.png)