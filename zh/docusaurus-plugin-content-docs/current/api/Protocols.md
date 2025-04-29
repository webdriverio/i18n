---
id: protocols
title: 协议命令
---

WebdriverIO 是一个自动化框架，它依赖各种自动化协议来控制远程代理，例如浏览器、移动设备或电视。基于远程设备的不同，会使用不同的协议。这些命令根据远程服务器（例如浏览器驱动程序）的会话信息被分配到 [Browser](/docs/api/browser) 或 [Element](/docs/api/element) 对象。

在内部，WebdriverIO 几乎对所有与远程代理的交互都使用协议命令。然而，分配给 [Browser](/docs/api/browser) 或 [Element](/docs/api/element) 对象的附加命令简化了 WebdriverIO 的使用，例如，使用协议命令获取元素的文本将如下所示：

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

使用 [Browser](/docs/api/browser) 或 [Element](/docs/api/element) 对象的便捷命令，这可以简化为：

```js
$('#lst-ib').getText()
```

以下部分解释每个单独的协议。

## WebDriver 协议

[WebDriver](https://w3c.github.io/webdriver/#elements) 协议是一个用于自动化浏览器的 Web 标准。与其他一些端到端测试工具相比，它保证可以在用户实际使用的浏览器上进行自动化，例如 Firefox、Safari 和 Chrome 以及基于 Chromium 的浏览器如 Edge，而不仅仅是浏览器引擎，例如 WebKit，它们之间存在很大差异。

使用 WebDriver 协议而不是像 [Chrome DevTools](https://w3c.github.io/webdriver/#elements) 这样的调试协议的优势在于，你有一组特定的命令，可以在所有浏览器中以相同的方式与浏览器交互，这减少了不稳定性的可能性。此外，该协议通过使用云供应商（如 [Sauce Labs](https://saucelabs.com/)、[BrowserStack](https://www.browserstack.com/) 和[其他](https://github.com/christian-bromann/awesome-selenium#cloud-services)）提供了大规模扩展的能力。

## WebDriver Bidi 协议

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) 协议是该协议的第二代，目前正由大多数浏览器厂商开发中。与其前身相比，该协议支持框架和远程设备之间的双向通信（因此称为"Bidi"）。它还引入了额外的原语，用于更好地进行浏览器内省，以更好地自动化现代 Web 应用程序。

鉴于该协议目前正在开发中，随着时间的推移，将会添加更多功能并得到浏览器的支持。如果你使用 WebdriverIO 的便捷命令，对你来说不会有任何变化。WebdriverIO 将在这些新协议功能可用并受浏览器支持时立即使用它们。

## Appium

[Appium](https://appium.io/) 项目提供了自动化移动设备、桌面设备和其他各种物联网设备的能力。虽然 WebDriver 专注于浏览器和网络，但 Appium 的愿景是使用相同的方法，但应用于任意设备。除了 WebDriver 定义的命令外，它还有特殊命令，这些命令通常特定于被自动化的远程设备。对于移动测试场景，当你想为 Android 和 iOS 应用程序编写和运行相同的测试时，这是理想的选择。

根据 Appium 的[文档](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)，它的设计旨在满足移动自动化需求，遵循以下四个原则：

- 你不应该需要重新编译或以任何方式修改你的应用程序来实现自动化。
- 你不应该被锁定在特定的语言或框架中来编写和运行测试。
- 移动自动化框架在涉及自动化 API 时不应该重新发明轮子。
- 移动自动化框架应该在精神和实践上以及名义上都是开源的！

## Chromium

Chromium 协议在 WebDriver 协议之上提供了一组超集命令，这些命令仅在通过 [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) 或 [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver) 运行自动化会话时才受支持。

## Firefox

Firefox 协议在 WebDriver 协议之上提供了一组超集命令，这些命令仅在通过 [Geckodriver](https://github.com/mozilla/geckodriver) 运行自动化会话时才受支持。

## Sauce Labs

[Sauce Labs](https://saucelabs.com/) 协议在 WebDriver 协议之上提供了一组超集命令，这些命令仅在使用 Sauce Labs 云运行自动化会话时才受支持。

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) 协议在 WebDriver 协议之上提供了一组超集命令，这些命令仅在使用 Selenium Grid 运行自动化会话时才受支持。

## JSON Wire 协议

[JSON Wire 协议](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) 是 WebDriver 协议的前身，如今已被__弃用__。虽然在某些环境中可能仍然支持一些命令，但不建议使用其任何命令。

## Mobile JSON Wire 协议

[Mobile JSON Wire 协议](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) 是在 JSON Wire 协议之上的一组移动命令超集。鉴于 JSON Wire 协议已被弃用，Mobile JSON Wire 协议也已被__弃用__。Appium 可能仍然支持其中的一些命令，但不建议使用它们。