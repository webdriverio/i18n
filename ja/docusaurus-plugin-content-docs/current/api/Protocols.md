---
id: protocols
title: プロトコルコマンド
---

WebdriverIOは、リモートエージェント（例えば、ブラウザ、モバイルデバイス、テレビなど）を制御するために様々な自動化プロトコルに依存する自動化フレームワークです。リモートデバイスに応じて、異なるプロトコルが使用されます。これらのコマンドは、リモートサーバー（例：ブラウザドライバー）からのセッション情報に基づいて、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられます。

内部的に、WebdriverIOはリモートエージェントとのほぼすべての対話にプロトコルコマンドを使用しています。しかし、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられた追加コマンドによってWebdriverIOの使用が簡素化されます。例えば、プロトコルコマンドを使用して要素のテキストを取得する場合、以下のようになります：

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

[WebDriver](https://w3c.github.io/webdriver/#elements)プロトコルは、ブラウザの自動化のためのウェブ標準です。他のE2Eツールとは異なり、Firefox、Safari、ChromeやEdgeなどのChromiumベースのブラウザなど、実際にユーザーが使用しているブラウザでの自動化を保証し、WebKitなどのブラウザエンジンだけではなく、実際のブラウザで自動化できることを保証します。

[Chrome DevTools](https://w3c.github.io/webdriver/#elements)のようなデバッグプロトコルと比較したWebDriverプロトコルの利点は、すべてのブラウザで同じ方法でブラウザとやり取りできる特定のコマンドセットがあり、不安定性の可能性が低減されることです。さらに、このプロトコルは[Sauce Labs](https://saucelabs.com/)、[BrowserStack](https://www.browserstack.com/)および[その他](https://github.com/christian-bromann/awesome-selenium#cloud-services)などのクラウドベンダーを使用した大規模なスケーラビリティを提供します。

## WebDriver Bidiプロトコル

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)プロトコルは、プロトコルの第二世代であり、現在ほとんどのブラウザベンダーによって開発が進められています。前世代と比較して、このプロトコルはフレームワークとリモートデバイス間の双方向通信（「Bidi」という名前の由来）をサポートしています。さらに、モダンなウェブアプリケーションをブラウザでより良く自動化するための、ブラウザの詳細な把握を可能にする追加のプリミティブを導入しています。

このプロトコルは現在開発中であるため、時間の経過とともに機能が追加され、ブラウザでサポートされるようになります。WebdriverIOの便利なコマンドを使用している場合、あなたにとっては何も変わりません。WebdriverIOは、これらの新しいプロトコル機能がブラウザで利用可能になり、サポートされるとすぐに活用します。

## Appium

[Appium](https://appium.io/)プロジェクトは、モバイル、デスクトップ、その他あらゆる種類のIoTデバイスを自動化する機能を提供します。WebDriverがブラウザとウェブに焦点を当てているのに対し、Appiumのビジョンは同じアプローチを任意のデバイスに適用することです。WebDriverが定義するコマンドに加えて、自動化されるリモートデバイスに特化した特別なコマンドがあります。モバイルテストシナリオでは、AndroidとiOSアプリケーションの両方で同じテストを作成・実行したい場合に理想的です。

Appiumの[ドキュメント](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)によれば、以下の4つの原則に基づく哲学に従ってモバイル自動化のニーズを満たすように設計されています：

- アプリを自動化するために、再コンパイルしたり変更したりする必要がないようにすべきである。
- テストを書いて実行するために、特定の言語やフレームワークに縛られるべきではない。
- モバイル自動化フレームワークは、自動化APIに関して車輪の再発明をすべきではない。
- モバイル自動化フレームワークは、精神と実践において、また名前においてもオープンソースであるべきだ！

## Chromium

Chromiumプロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットを提供し、[Chromedriver](https://chromedriver.chromium.org/chromedriver-canary)または[Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Firefox

Firefoxプロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットを提供し、[Geckodriver](https://github.com/mozilla/geckodriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)プロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットを提供し、Sauce Labsクラウドを使用して自動化セッションを実行する場合にのみサポートされます。

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)プロトコルは、WebDriverプロトコルの上に構築されたコマンドのスーパーセットを提供し、Selenium Gridを使用して自動化セッションを実行する場合にのみサポートされます。

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/)はWebDriverプロトコルの前身であり、現在は__非推奨__です。一部のコマンドは特定の環境ではまだサポートされているかもしれませんが、そのコマンドの使用は推奨されません。

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)は、JSON Wire Protocolの上に構築されたモバイルコマンドのスーパーセットです。JSON Wire Protocolが非推奨となったため、Mobile JSON Wire Protocolも__非推奨__となりました。Appiumは一部のコマンドをまだサポートしているかもしれませんが、それらの使用は推奨されません。