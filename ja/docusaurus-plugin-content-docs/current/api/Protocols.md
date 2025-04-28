---
id: protocols
title: プロトコルコマンド
---

WebdriverIOは、ブラウザ、モバイルデバイス、テレビなどのリモートエージェントを制御するために、さまざまな自動化プロトコルに依存する自動化フレームワークです。リモートデバイスに応じて、異なるプロトコルが使用されます。これらのコマンドは、リモートサーバー（例：ブラウザドライバー）からのセッション情報に基づいて、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられます。

内部的に、WebdriverIOはリモートエージェントとのほぼすべての対話にプロトコルコマンドを使用しています。ただし、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられた追加コマンドにより、WebdriverIOの使用が簡素化されます。例えば、プロトコルコマンドを使用して要素のテキストを取得する場合は次のようになります：

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトの便利なコマンドを使用すると、これは次のように簡略化できます：

```js
$('#lst-ib').getText()
```

以下のセクションでは、各プロトコルについて説明します。

## WebDriverプロトコル

[WebDriver](https://w3c.github.io/webdriver/#elements)プロトコルは、ブラウザを自動化するためのWeb標準です。他のE2Eツールとは異なり、FirefoxやSafari、ChromeやEdgeなどのChromiumベースのブラウザなど、ユーザーが実際に使用しているブラウザでの自動化を保証します。WebKitなどのブラウザエンジンだけではなく、実際のブラウザで動作します。

[Chrome DevTools](https://w3c.github.io/webdriver/#elements)のようなデバッグプロトコルとは対照的に、WebDriverプロトコルを使用する利点は、すべてのブラウザで同じ方法でブラウザと対話できる特定のコマンドセットがあり、不安定性の可能性を減らすことができることです。さらに、このプロトコルは[Sauce Labs](https://saucelabs.com/)、[BrowserStack](https://www.browserstack.com/)および[その他](https://github.com/christian-bromann/awesome-selenium#cloud-services)などのクラウドベンダーを使用して大規模なスケーラビリティを提供します。

## WebDriver Bidiプロトコル

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)プロトコルは、プロトコルの第二世代であり、現在ほとんどのブラウザベンダーによって開発中です。前世代と比較して、このプロトコルはフレームワークとリモートデバイス間の双方向通信（「Bidi」の由来）をサポートしています。さらに、ブラウザでの最新Webアプリケーションの自動化を向上させるための、より良いブラウザ内部調査のための追加プリミティブを導入しています。

このプロトコルは現在開発中であるため、時間の経過とともに機能が追加され、ブラウザでサポートされるようになります。WebdriverIOの便利なコマンドを使用している場合、あなたにとって何も変わりません。WebdriverIOは、これらの新しいプロトコル機能がブラウザで利用可能でサポートされるとすぐに活用するでしょう。

## Appium

[Appium](https://appium.io/)プロジェクトは、モバイル、デスクトップ、およびその他のあらゆる種類のIoTデバイスを自動化する機能を提供します。WebDriverがブラウザとWebに焦点を当てているのに対し、Appiumのビジョンは同じアプローチを任意のデバイスに使用することです。WebDriverが定義するコマンドに加えて、自動化されるリモートデバイスに特化した特別なコマンドが用意されています。モバイルテストシナリオでは、AndroidとiOSアプリケーションの両方で同じテストを書いて実行したい場合に理想的です。

Appiumの[ドキュメント](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)によると、次の4つの原則に基づいた哲学に従ってモバイル自動化のニーズを満たすように設計されています：

- アプリを自動化するために、アプリを再コンパイルしたり、何らかの方法で変更したりする必要はありません。
- テストを書いて実行するために、特定の言語やフレームワークに縛られるべきではありません。
- モバイル自動化フレームワークは、自動化APIに関して車輪の再発明をすべきではありません。
- モバイル自動化フレームワークは、精神と実践において、名前だけでなくオープンソースであるべきです！

## Chromium

Chromiumプロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットであり、[Chromedriver](https://chromedriver.chromium.org/chromedriver-canary)または[Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Firefox

Firefoxプロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットであり、[Geckodriver](https://github.com/mozilla/geckodriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)プロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットであり、Sauce Labsクラウドを使用して自動化セッションを実行する場合にのみサポートされます。

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)プロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットであり、Selenium Gridを使用して自動化セッションを実行する場合にのみサポートされます。

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/)は、WebDriverプロトコルの前身であり、現在は__非推奨__です。一部のコマンドは特定の環境でまだサポートされている可能性がありますが、そのコマンドを使用することはお勧めしません。

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)は、JSON Wire Protocolの上に構築されたモバイルコマンドのスーパーセットです。これは非推奨となったため、Mobile JSON Wire Protocolも__非推奨__となりました。Appiumはまだいくつかのコマンドをサポートしている可能性がありますが、それらを使用することはお勧めしません。