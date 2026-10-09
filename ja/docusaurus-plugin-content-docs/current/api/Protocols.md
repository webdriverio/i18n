---
id: protocols
title: プロトコルコマンド
---

WebdriverIOは、ブラウザ、モバイルデバイス、テレビなどのリモートエージェントを制御するために、さまざまな自動化プロトコルに依存する自動化フレームワークです。リモートデバイスに応じて、異なるプロトコルが使用されます。これらのコマンドは、リモートサーバー（例：ブラウザドライバー）によるセッション情報に応じて、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられます。

内部的に、WebdriverIOはリモートエージェントとのほぼすべてのやり取りにプロトコルコマンドを使用しています。ただし、[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトに割り当てられた追加のコマンドにより、WebdriverIOの使用が簡単になります。例えば、プロトコルコマンドを使用して要素のテキストを取得する場合は次のようになります：

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

[Browser](/docs/api/browser)または[Element](/docs/api/element)オブジェクトの便利なコマンドを使用すると、これは次のように簡略化できます：

```js
$('#lst-ib').getText()
```

以下のセクションでは、各プロトコルについて個別に説明します。

## WebDriver Protocol

[WebDriver](https://w3c.github.io/webdriver/#elements)プロトコルは、ブラウザを自動化するためのWeb標準です。他の一部のE2Eツールとは異なり、WebKitのような大きく異なるブラウザエンジンだけでなく、Firefox、Safari、Chrome、およびEdgeのようなChromiumベースのブラウザなど、ユーザーが実際に使用しているブラウザで自動化を行えることを保証します。

[Chrome DevTools](https://w3c.github.io/webdriver/#elements)のようなデバッグプロトコルと比較してWebDriverプロトコルを使用する利点は、すべてのブラウザで同じ方法でブラウザを操作できる特定のコマンドセットがあるため、不安定さ（flakiness）の可能性が低減されることです。さらに、このプロトコルは[Sauce Labs](https://saucelabs.com/)、[BrowserStack](https://www.browserstack.com/)、[その他](https://github.com/christian-bromann/awesome-selenium#cloud-services)のクラウドベンダーを利用することで、大規模なスケーラビリティを実現できます。

## WebDriver Bidi Protocol

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)プロトコルは、このプロトコルの第2世代であり、現在ほとんどのブラウザベンダーによって開発が進められています。前身と比較して、このプロトコルはフレームワークとリモートデバイス間の双方向通信（そのため「Bidi」）をサポートしています。さらに、ブラウザ内の最新のWebアプリケーションをより適切に自動化するために、ブラウザのイントロスペクションを向上させる追加のプリミティブを導入しています。

このプロトコルは現在開発中であるため、時間の経過とともに機能が追加され、ブラウザでサポートされるようになります。WebdriverIOの便利なコマンドを使用している場合、何も変わりません。WebdriverIOは、これらの新しいプロトコル機能がブラウザで利用可能になり、サポートされ次第、すぐに活用します。

## Appium

[Appium](https://appium.io/)プロジェクトは、モバイル、デスクトップ、その他あらゆる種類のIoTデバイスを自動化する機能を提供します。WebDriverがブラウザとWebに焦点を当てているのに対し、Appiumのビジョンは同じアプローチを任意のデバイスに使用することです。WebDriverが定義するコマンドに加えて、自動化対象のリモートデバイスに固有であることが多い特別なコマンドを備えています。モバイルテストのシナリオでは、AndroidとiOSの両方のアプリケーションに対して同じテストを作成・実行したい場合に理想的です。

Appiumの[ドキュメント](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)によると、Appiumは次の4つの原則で示される哲学に従って、モバイル自動化のニーズを満たすように設計されています：

- 自動化のためにアプリを再コンパイルしたり、何らかの方法で変更したりする必要があってはならない。
- テストの作成・実行において、特定の言語やフレームワークに縛られるべきではない。
- モバイル自動化フレームワークは、自動化APIに関して車輪の再発明をすべきではない。
- モバイル自動化フレームワークは、名前だけでなく、精神的にも実践的にもオープンソースであるべきだ！

## Chromium

Chromiumプロトコルは、WebDriverプロトコルの上位セットとなるコマンドを提供します。これは、[Chromedriver](https://chromedriver.chromium.org/chromedriver-canary)または[Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Firefox

Firefoxプロトコルは、WebDriverプロトコルの上位セットとなるコマンドを提供します。これは、[Geckodriver](https://github.com/mozilla/geckodriver)を通じて自動化セッションを実行する場合にのみサポートされます。

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)プロトコルは、WebDriverプロトコルの上位セットとなるコマンドを提供します。これは、Sauce Labsクラウドを使用して自動化セッションを実行する場合にのみサポートされます。

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)プロトコルは、WebDriverプロトコルの上位セットとなるコマンドを提供します。これは、Selenium Gridを使用して自動化セッションを実行する場合にのみサポートされます。