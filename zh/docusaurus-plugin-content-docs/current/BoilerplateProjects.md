---
id: boilerplates
title: 样板项目
---

随着时间的推移，我们的社区开发了几个项目，您可以将它们用作设置自己的测试套件的灵感。

# v9 样板项目

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

我们自己的Cucumber测试套件样板。我们为您创建了超过150个预定义的步骤定义，因此您可以立即开始在项目中编写功能文件。

- 框架:
    - Cucumber
    - WebdriverIO
- 特性:
    - 超过150个预定义步骤，几乎涵盖了您所需的一切
    - 集成WebdriverIO的Multiremote功能
    - 自己的演示应用

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
使用Babel特性和页面对象模式运行WebdriverIO测试与Jasmine的样板项目。

- 框架
    - WebdriverIO
    - Jasmine
- 特性
    - 页面对象模式
    - Sauce Labs集成

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
在最小的Electron应用程序上运行WebdriverIO测试的样板项目。

- 框架
    - WebdriverIO
    - Mocha
- 特性
    - Electron API模拟

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

这个样板项目具有WebdriverIO 9移动测试，使用Cucumber、TypeScript和Appium，适用于Android和iOS平台，遵循页面对象模型模式。特点包括全面的日志记录、报告、移动手势、应用到网页导航以及CI/CD集成。

- 框架：
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- 特性：
    - 多平台支持
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - 移动手势
      - 滚动
      - 滑动
      - 长按
      - 隐藏键盘
    - 应用到Web导航
      - 上下文切换
      - WebView支持
      - 浏览器自动化(Chrome/Safari)
    - 新鲜应用状态
      - 场景之间自动重置应用
      - 可配置的重置行为(noReset, fullReset)
    - 设备配置
      - 集中式设备管理
      - 轻松平台切换
    - JavaScript / TypeScript的目录结构示例。以下是JS版本，TS版本也有相同的结构。

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
自动从Gherkin .feature文件生成WebdriverIO页面对象类和Mocha测试规范 - 减少手动工作，提高一致性，并加速QA自动化。该项目不仅生成与webdriver.io兼容的代码，还增强了webdriver.io的所有功能。我们创建了两个版本，一个用于JavaScript用户，另一个用于TypeScript用户。但两个项目的工作方式相同。

***它是如何工作的？***
- 该过程遵循两步自动化：
- 步骤1：Gherkin到stepMap（生成stepMap.json文件）
  - 生成stepMap.json文件：
    - 解析用Gherkin语法编写的.feature文件。
    - 提取场景和步骤。
    - 生成一个结构化的.stepMap.json文件，包含：
      - 要执行的操作（例如，click, setText, assertVisible）
      - 用于逻辑映射的selectorName
      - DOM元素的选择器
      - 值或断言的注释
- 步骤2：stepMap到代码（生成WebdriverIO代码）。
  使用stepMap.json生成：
  - 生成一个具有共享方法和browser.url()设置的基本page.js类。
  - 在test/pageobjects/中为每个功能生成WebdriverIO兼容的页面对象模型(POM)类。
  - 生成基于Mocha的测试规范。
- JavaScript / TypeScript的目录结构示例。以下是JS版本，TS版本也有相同的结构。
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# v8 样板项目

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- 框架: WDIO-V8 与 Cucumber (V8x).
- 特性:
    - 页面对象模型使用ES6 /ES7风格的基于类的方法和TypeScript支持
    - 多选择器选项示例，可同时使用多个选择器查询元素
    - 多浏览器和无头浏览器执行示例 - 使用Chrome和Firefox
    - 与BrowserStack、Sauce Labs、TestMu AI（前身为LambdaTest）的云测试集成
    - 从MS-Excel读/写数据的示例，便于从外部数据源进行测试数据管理，并提供示例
    - 支持任何RDBMS（Oracle、MySql、TeraData、Vertica等）的数据库，执行任何查询/获取结果集等，并提供E2E测试示例
    - 多种报告（Spec、Xunit/Junit、Allure、JSON）和在Web服务器上托管Allure和Xunit/Junit报告
    - 使用演示应用https://search.yahoo.com/ 和 http://the-internet.herokuapp.com 的示例
    - BrowserStack、Sauce Labs、TestMu AI（前身为LambdaTest）和Appium特定的`.config`文件（用于在移动设备上回放）。有关在本地机器上一键设置iOS和Android的Appium，请参考[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)。

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- 框架: WDIO-V8 与 Mocha (V10x).
- 特性:
    -  页面对象模型使用ES6 /ES7风格的基于类的方法和TypeScript支持
    -  使用演示应用https://search.yahoo.com 和 http://the-internet.herokuapp.com 的示例
    -  多浏览器和无头浏览器执行示例 - 使用Chrome和Firefox
    -  与BrowserStack、Sauce Labs、TestMu AI（前身为LambdaTest）的云测试集成
    -  多种报告（Spec、Xunit/Junit、Allure、JSON）和在Web服务器上托管Allure和Xunit/Junit报告
    -  从MS-Excel读/写数据的示例，便于从外部数据源进行测试数据管理，并提供示例
    -  连接到任何RDBMS（Oracle、MySql、TeraData、Vertica等）的数据库示例，执行任何查询/获取结果集等，并提供E2E测试示例
    -  BrowserStack、Sauce Labs、TestMu AI（前身为LambdaTest）和Appium特定的`.config`文件（用于在移动设备上回放）。有关在本地机器上一键设置iOS和Android的Appium，请参考[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)。

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- 框架: WDIO-V8 与 Jasmine (V4x).
- 特性:
    -  页面对象模型使用ES6 /ES7风格的基于类的方法和TypeScript支持
    -  使用演示应用https://search.yahoo.com 和 http://the-internet.herokuapp.com 的示例
    -  多浏览器和无头浏览器执行示例 - 使用Chrome和Firefox
    -  与BrowserStack、Sauce Labs、TestMu AI（前身为LambdaTest）的云测试集成
    -  多种报告（Spec、Xunit/Junit、Allure、JSON）和在Web服务器上托管Allure和Xunit/Junit报告
    -  从MS-Excel读/写数据的示例，便于从外部数据源进行测试数据管理，并提供示例
    -  连接到任何RDBMS（Oracle、MySql、TeraData、Vertica等）的数据库示例，执行任何查询/获取结果集等，并提供E2E测试示例
    -  BrowserStack、Sauce Labs、TestMu AI（前身为LambdaTest）和Appium特定的`.config`文件（用于在移动设备上回放）。有关在本地机器上一键设置iOS和Android的Appium，请参考[appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)。

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

这个样板项目有WebdriverIO 8测试，使用cucumber和typescript，遵循页面对象模式。

- 框架:
    - WebdriverIO v8
    - Cucumber v8

- 特性:
    - Typescript v5
    - 页面对象模式
    - Prettier
    - 多浏览器支持
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - 跨浏览器并行执行
    - Appium
    - 与BrowserStack和Sauce Labs的云测试集成
    - Docker服务
    - 共享数据服务
    - 每个服务的单独配置文件
    - 测试数据管理和按用户类型读取
    - 报告
      - Dot
      - Spec
      - 包含失败截图的多个cucumber html报告
    - Gitlab仓库的Gitlab管道
    - Github仓库的Github actions
    - 用于设置docker hub的Docker compose
    - 使用AXE进行可访问性测试
    - 使用Applitools进行视觉测试
    - 日志机制


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- 框架
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特性
    - 包含cucumber中的示例测试场景
    - 集成cucumber html报告，失败时嵌入视频
    - 集成Lambdatest和CircleCI服务
    - 集成视觉、可访问性和API测试
    - 集成电子邮件功能
    - 集成s3存储桶用于测试报告的存储和检索

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)模板项目，帮助您开始使用最新的WebdriverIO、Mocha和Serenity/JS进行Web应用程序的验收测试。

- 框架
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD报告

- 特性
    - [Screenplay模式](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - 测试失败时自动截图，嵌入报告
    - 使用[GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)的持续集成(CI)设置
    - [Demo Serenity BDD报告](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)发布到GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)模板项目，帮助您开始使用最新的WebdriverIO、Cucumber和Serenity/JS进行Web应用程序的验收测试。

- 框架
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD报告

- 特性
    - [Screenplay模式](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - 测试失败时自动截图，嵌入报告
    - 使用[GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)的持续集成(CI)设置
    - [Demo Serenity BDD报告](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)发布到GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
在Headspin Cloud (https://www.headspin.io/)中运行WebdriverIO测试的样板项目，使用Cucumber功能和页面对象模式。
- 框架
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特性
    - 与[Headspin](https://www.headspin.io/)的云集成
    - 支持页面对象模型
    - 包含以BDD声明式风格编写的示例场景
    - 集成cucumber html报告

# v7 样板项目
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

使用WebdriverIO运行Appium测试的样板项目，用于：

- iOS/Android原生应用
- iOS/Android混合应用
- Android Chrome和iOS Safari浏览器

此样板包括以下内容：

- 框架：Mocha
- 特性：
    - 配置：
        - iOS和Android应用
        - iOS和Android浏览器
    - 助手：
        - WebView
        - 手势
        - 原生弹窗
        - 选择器
     - 测试示例：
        - WebView
        - 登录
        - 表单
        - 滑动
        - 浏览器

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
使用Mocha，WebdriverIO v6和PageObject的ATDD Web测试

- 框架
  - WebdriverIO (v7)
  - Mocha
- 特性
  - [页面对象](pageobjects)模型
  - 使用[Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)的Sauce Labs集成
  - Allure报告
  - 失败测试自动截图
  - CircleCI示例
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

使用Mocha运行E2E测试的样板项目。

- 框架:
    - WebdriverIO (v7)
    - Mocha
- 特性:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [视觉回归测试](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   页面对象模式
    -   [Commit lint](https://github.com/conventional-changelog/commitlint)和[Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions示例
    -   Allure报告（失败时截图）

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

运行**WebdriverIO v7**测试的样板项目，用于以下内容：

[在Cucumber框架中使用TypeScript的WDIO 7脚本](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[在Mocha框架中使用TypeScript的WDIO 7脚本](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[在Docker中运行WDIO 7脚本](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[网络日志](https://github.com/17thSep/MonitorNetworkLogs/)

样板项目用于：

- 捕获网络日志
- 捕获所有GET/POST调用或特定REST API
- 断言请求参数
- 断言响应参数
- 将所有响应存储在单独的文件中

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

使用cucumber v7和wdio v7以页面对象模式运行原生和移动浏览器appium测试的样板项目。

- 框架
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 特性
    - 原生Android和iOS应用
    - Android Chrome浏览器
    - iOS Safari浏览器
    - 页面对象模型
    - 包含cucumber中的示例测试场景
    - 集成多个cucumber html报告

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

这是一个模板项目，帮助您展示如何使用最新的WebdriverIO和Cucumber框架从Web应用程序运行webdriverio测试。该项目旨在作为基线镜像，帮助您了解如何在docker中运行WebdriverIO测试。

该项目包括：

- DockerFile
- cucumber项目

更多信息请阅读：[Medium博客](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

这是一个模板项目，帮助您展示如何使用WebdriverIO运行electronJS测试。该项目旨在作为基线镜像，帮助您了解如何运行WebdriverIO electronJS测试。

该项目包括：

- 示例electronjs应用
- 示例cucumber测试脚本

更多信息请阅读：[Medium博客](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

这是一个模板项目，帮助您展示如何使用winappdriver和WebdriverIO自动化Windows应用程序。该项目旨在作为基线镜像，帮助您了解如何运行windappdriver和WebdriverIO测试。

更多信息请阅读：[Medium博客](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


这是一个模板项目，帮助您展示如何使用最新的WebdriverIO和Jasmine框架运行webdriverio multiremote功能。该项目旨在作为基线镜像，帮助您了解如何在docker中运行WebdriverIO测试。

该项目使用：
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

使用页面对象模式的mocha在真实Roku设备上运行appium测试的模板项目。

- 框架
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure报告

- 特性
    - 页面对象模型
    - Typescript
    - 失败时截图
    - 使用示例Roku频道的示例测试

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

用于E2E Multiremote Cucumber测试和数据驱动Mocha测试的PoC项目

- 框架:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- 特性:
    - 基于Cucumber的E2E测试
    - 基于Mocha的数据驱动测试
    - 仅Web测试 - 在本地和云平台中
    - 仅移动测试 - 本地和远程云模拟器（或设备）
    - Web + 移动测试 - Multiremote - 本地和云平台
    - 集成多种报告，包括Allure
    - 全局处理测试数据（JSON / XLSX），以便在测试执行后将（动态创建的）数据写入文件
    - Github工作流运行测试并上传allure报告

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

这是一个样板项目，帮助展示如何使用最新的WebdriverIO通过appium和chromedriver服务运行webdriverio多远程。

- 框架
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- 特性
  - [页面对象](pageobjects)模型
  - Typescript
  - Web + 移动测试 - Multiremote
  - 原生Android和iOS应用
  - Appium
  - Chromedriver
  - ESLint
  - 登录http://the-internet.herokuapp.com和[WebdriverIO原生演示应用](https://github.com/webdriverio/native-demo-app)的测试示例