---
id: protocols
title: プロトコルコマンド
---

WebdriverIOは、リモートエージェント（ブラウザ、モバイルデバイス、テレビなど）を制御するために様々な自動化プロトコルに依存する自動化フレームワークです。リモートデバイスに応じて、異なるプロトコルが使用されます。これらのコマンドは、リモートサーバー（例：ブラウザドライバー）からのセッション情報に基づいて、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられます。

内部的に、WebdriverIOはリモートエージェントとのほぼすべての対話にプロトコルコマンドを使用しています。ただし、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられた追加コマンドはWebdriverIOの使用を簡素化します。例えば、プロトコルコマンドを使用して要素のテキストを取得する場合は次のようになります：

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトの便利なコマンドを使用すると、これを以下のように短縮できます：

```js
$('#lst-ib').getText()
```

以下のセクションでは、各プロトコルについて説明します。

## WebDriverプロトコル

[WebDriver](https://w3c.github.io/webdriver/#elements)プロトコルは、ブラウザを自動化するためのウェブ標準です。他のE2Eツールとは異なり、Firefox、Safari、ChromeやEdgeなどのChromiumベースのブラウザなど、ユーザーが実際に使用しているブラウザで自動化を行うことを保証し、WebKitなどのブラウザエンジンだけではありません。

[Chrome DevTools](https://w3c.github.io/webdriver/#elements)のようなデバッグプロトコルとは対照的に、WebDriverプロトコルを使用する利点は、すべてのブラウザで同じ方法でブラウザと対話できる特定のコマンドセットがあり、不安定さの可能性を減らすことです。さらに、このプロトコルは[Sauce Labs](https://saucelabs.com/)、[BrowserStack](https://www.browserstack.com/)、[その他](https://github.com/christian-bromann/awesome-selenium#cloud-services)などのクラウドベンダーを使用して大規模なスケーラビリティを実現する機能を提供します。

## WebDriver Bidiプロトコル

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)プロトコルは、プロトコルの第二世代であり、現在ほとんどのブラウザベンダーによって開発されています。前世代と比較して、このプロトコルはフレームワークとリモートデバイス間の双方向通信（「Bidi」という名前の由来）をサポートしています。さらに、モダンなウェブアプリケーションをブラウザでより適切に自動化するための、ブラウザ内部検査の改善された基本機能も導入しています。

このプロトコルは現在開発中であるため、時間の経過とともに機能が追加され、ブラウザによってサポートされるようになります。WebdriverIOの便利なコマンドを使用している場合、あなたにとって変更はありません。WebdriverIOは、これらの新しいプロトコル機能が利用可能になり、ブラウザでサポートされるとすぐに活用します。

## Appium

[Appium](https://appium.io/)プロジェクトは、モバイル、デスクトップ、およびその他のあらゆる種類のIoTデバイスを自動化する機能を提供します。WebDriverがブラウザとウェブに焦点を当てているのに対し、Appiumのビジョンは同じアプローチを使用して任意のデバイスを自動化することです。WebDriverが定義するコマンドに加えて、自動化されるリモートデバイスに特化した特別なコマンドを持っています。モバイルテストシナリオでは、AndroidとiOSアプリケーションの両方に対して同じテストを作成して実行したい場合に理想的です。

Appiumの[ドキュメント](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)によれば、モバイル自動化のニーズを満たすために、次の4つの原則に基づいて設計されました：

- アプリを自動化するために、アプリを再コンパイルしたり変更したりする必要がないこと。
- テストを作成して実行するために、特定の言語やフレームワークに縛られないこと。
- モバイル自動化フレームワークは、自動化APIに関して車輪の再発明をすべきではない。
- モバイル自動化フレームワークは、精神的にも実践的にも、名前だけでなくオープンソースであるべきである。

## Chromium

Chromiumプロトコルは、WebDriverプロトコルの上に構築された拡張コマンドセットを提供し、[Chromedriver](https://chromedriver.chromium.org/chromedriver-canary)または[Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Firefox

Firefoxプロトコルは、WebDriverプロトコルの上に構築された拡張コマンドセットを提供し、[Geckodriver](https://github.com/mozilla/geckodriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)プロトコルは、WebDriverプロトコルの上に構築された拡張コマンドセットを提供し、Sauce Labsクラウドを使用して自動化セッションを実行する場合にのみサポートされます。

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)プロトコルは、WebDriverプロトコルの上に構築された拡張コマンドセットを提供し、Selenium Gridを使用して自動化セッションを実行する場合にのみサポートされます。

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/)はWebDriverプロトコルの前身であり、現在は__非推奨__です。一部のコマンドは特定の環境でまだサポートされているかもしれませんが、そのコマンドを使用することは推奨されません。

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)は、JSON Wire Protocolの上に構築されたモバイルコマンドの拡張セットです。JSON Wire Protocolが非推奨になったため、Mobile JSON Wire Protocolも__非推奨__になりました。Appiumは一部のコマンドをまだサポートしているかもしれませんが、それらを使用することは推奨されません。