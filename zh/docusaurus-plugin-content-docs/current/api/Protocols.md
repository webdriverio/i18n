---
id: protocols
title: 协议命令
---

WebdriverIO 是一个自动化框架，它依赖各种自动化协议来控制远程代理，例如浏览器、移动设备或电视。基于远程设备，不同的协议会发挥作用。这些命令根据远程服务器(例如浏览器驱动程序)的会话信息分配给[Browser](/docs/api/browser)或[Element](/docs/api/element)对象。

在内部，WebdriverIO 几乎对所有与远程代理的交互都使用协议命令。然而，分配给[Browser](/docs/api/browser)或[Element](/docs/api/element)对象的附加命令简化了WebdriverIO的使用，例如，使用协议命令获取元素的文本看起来像这样：

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

使用[Browser](/docs/api/browser)或[Element](/docs/api/element)对象的便捷命令，这可以简化为：

```js
$('#lst-ib').getText()
```

以下部分解释了每个单独的协议。

## WebDriver 协议

[WebDriver](https://w3c.github.io/webdriver/#elements)协议是用于浏览器自动化的Web标准。与其他一些端到端工具相比，它保证自动化可以在用户实际使用的浏览器上进行，例如Firefox、Safari和Chrome以及基于Chromium的浏览器如Edge，而不仅仅是在浏览器引擎(如WebKit)上，它们是非常不同的。

使用WebDriver协议而不是像[Chrome DevTools](https://w3c.github.io/webdriver/#elements)这样的调试协议的优势在于，你有一组特定的命令，允许你以相同的方式在所有浏览器中与浏览器交互，这减少了出现不稳定性的可能性。此外，该协议还提供了通过使用[Sauce Labs](https://saucelabs.com/)、[BrowserStack](https://www.browserstack.com/)和[其他](https://github.com/christian-bromann/awesome-selenium#cloud-services)等云供应商进行大规模扩展的能力。

## WebDriver Bidi 协议

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)协议是该协议的第二代，目前正由大多数浏览器厂商开发中。与其前代相比，该协议支持框架和远程设备之间的双向通信(因此称为"Bidi")。它还引入了额外的原语，用于更好地浏览器内省，以更好地自动化浏览器中的现代Web应用程序。

鉴于此协议目前正在开发中，随着时间推移将添加更多功能并得到浏览器支持。如果你使用WebdriverIO的便捷命令，对你来说不会有任何变化。一旦这些新协议功能可用并得到浏览器支持，WebdriverIO将立即使用它们。

## Appium

[Appium](https://appium.io/)项目提供了自动化移动设备、桌面和所有其他物联网设备的能力。虽然WebDriver专注于浏览器和Web，但Appium的愿景是使用相同的方法来自动化任何设备。除了WebDriver定义的命令外，它还有特殊的命令，这些命令通常特定于被自动化的远程设备。对于移动测试场景，当你想为Android和iOS应用程序编写和运行相同的测试时，这是理想的选择。

根据Appium的[文档](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)，它的设计目的是满足移动自动化需求，遵循以下四个原则：

- 你不应该需要重新编译你的应用或以任何方式修改它来实现自动化。
- 你不应该被锁定在特定的语言或框架中来编写和运行测试。
- 移动自动化框架在自动化API方面不应该重新发明轮子。
- 移动自动化框架应该是开源的，无论是在精神上、实践上还是名义上！

## Chromium

Chromium协议在WebDriver协议的基础上提供了一组超级命令集，这些命令仅在通过[Chromedriver](https://chromedriver.chromium.org/chromedriver-canary)或[Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver)运行自动化会话时才受支持。

## Firefox

Firefox协议在WebDriver协议的基础上提供了一组超级命令集，这些命令仅在通过[Geckodriver](https://github.com/mozilla/geckodriver)运行自动化会话时才受支持。

## Sauce Labs

[Sauce Labs](https://saucelabs.com/)协议在WebDriver协议的基础上提供了一组超级命令集，这些命令仅在使用Sauce Labs云运行自动化会话时才受支持。

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)协议在WebDriver协议的基础上提供了一组超级命令集，这些命令仅在使用Selenium Grid运行自动化会话时才受支持。

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/)是WebDriver协议的前身，现在已经**被废弃**。虽然某些环境中仍可能支持一些命令，但不建议使用其任何命令。

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)是JSON Wire Protocol基础上的一组移动命令超级集。鉴于JSON Wire Protocol已被废弃，Mobile JSON Wire Protocol也**被废弃**。Appium可能仍然支持其中的一些命令，但不建议使用它们。