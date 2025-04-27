---
id: automationProtocols
title: 自动化协议
---

使用 WebdriverIO 时，您可以在本地或云端运行 E2E 测试时选择多种自动化技术。默认情况下，WebdriverIO 将尝试使用 [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) 协议启动本地自动化会话。

## WebDriver Bidi 协议

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) 是一种使用双向通信自动化浏览器的协议。它是 [WebDriver](https://w3c.github.io/webdriver/) 协议的继任者，为各种测试用例提供了更多的内省能力。

该协议目前正在开发中，未来可能会添加新的原语。所有浏览器厂商都已承诺实现这一网络标准，许多[原语](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned)已经在浏览器中落地。

## WebDriver 协议

> [WebDriver](https://w3c.github.io/webdriver/) 是一个远程控制接口，可以对用户代理进行内省和控制。它提供了一个平台和语言中立的有线协议，作为进程外程序远程指导网络浏览器行为的方式。

WebDriver 协议设计用于从用户角度自动化浏览器，这意味着用户能够做的所有事情，您都可以通过浏览器来做。它提供了一组命令，抽象出与应用程序的常见交互（例如，导航、点击或读取元素的状态）。由于它是一个网络标准，所有主要浏览器厂商都很好地支持它，并且它还被用作使用 [Appium](http://appium.io) 进行移动自动化的底层协议。

要使用这种自动化协议，您需要一个代理服务器来转换所有命令并在目标环境中执行它们（即浏览器或移动应用）。

对于浏览器自动化，代理服务器通常是浏览器驱动程序。所有浏览器都有可用的驱动程序：

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

对于任何类型的移动自动化，您需要安装和设置 [Appium](http://appium.io)。它将允许您使用相同的 WebdriverIO 设置自动化移动（iOS/Android）甚至桌面（macOS/Windows）应用程序。

还有许多服务允许您在云中大规模运行自动化测试。您无需在本地设置所有这些驱动程序，只需与云中的这些服务（例如 [Sauce Labs](https://saucelabs.com)）通信，并在其平台上检查结果。测试脚本和自动化环境之间的通信将如下所示：

![WebDriver Setup](/img/webdriver.png)