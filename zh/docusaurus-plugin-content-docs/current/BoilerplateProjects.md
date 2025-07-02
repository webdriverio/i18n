---
id: boilerplates
title: 模板项目
---

随着时间的推移，我们的社区已经开发了几个项目，您可以将其用作设置自己的测试套件的灵感。

# v9 模板项目

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

我们自己的 Cucumber 测试套件模板。我们为您创建了 150 多个预定义的步骤定义，因此您可以立即开始在项目中编写功能文件。

- 框架:
    - Cucumber
    - WebdriverIO
- 特性:
    - 150 多个预定义步骤，几乎涵盖了您所需的一切
    - 集成 WebdriverIO 的 Multiremote 功能
    - 自带演示应用

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
使用 Babel 特性和页面对象模式运行 WebdriverIO 测试的模板项目。

- 框架
    - WebdriverIO
    - Jasmine
- 特性
    - 页面对象模式
    - Sauce Labs 集成

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
在最小 Electron 应用程序上运行 WebdriverIO 测试的模板项目。

- 框架
    - WebdriverIO
    - Mocha
- 特性
    - Electron API 模拟

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
从 Gherkin .feature 文件自动生成 WebdriverIO 页面对象类和 Mocha 测试规范 - 减少手动工作，提高一致性，并加速 QA 自动化。该项目不仅生成与 webdriver.io 兼容的代码，还增强了 webdriver.io 的所有功能。我们创建了两个版本，一个用于 JavaScript 用户，另一个用于 TypeScript 用户。但两个项目的工作方式相同。

***工作原理***
- 该过程遵循两步自动化：
- 步骤 1：Gherkin 到 stepMap（生成 stepMap.json 文件）
  - 生成 stepMap.json 文件：
    - 解析用 Gherkin 语法编写的 .feature 文件。
    - 提取场景和步骤。
    - 生成结构化的 .stepMap.json 文件，包含：
      - 要执行的操作（例如，click、setText、assertVisible）
      - 用于逻辑映射的 selectorName
      - DOM 元素的选择器
      - 值或断言的注释
- 步骤 2：stepMap 到代码（生成 WebdriverIO 代码）。
  使用 stepMap.json 生成：
  - 生成包含共享方法和 browser.url() 设置的基础 page.js 类。
  - 在 test/pageobjects/ 中为每个功能生成与 WebdriverIO 兼容的页面对象模型 (POM) 类。
  - 生成基于 Mocha 的测试规范。
- JavaScript / TypeScript 的目录结构示例。以下是 JS 版本的结构，TS 版本的结构也相同。
```
project-root/
├── features/                   # Gherkin .feature 文件（用户输入/源文件）
├── stepMaps/                   # 自动生成的 .stepMap.json 文件
├── test/                 
│   ├── pageobjects/            # 自动生成的 WebdriverIO 测试页面对象模型类
│   └── specs/                  # 自动生成的 Mocha 测试规范
├── src/
│   ├── cli.js                  # 主要 CLI 逻辑
│   ├── generateStepsMap.js     # 功能到 stepMap 生成器
│   ├── generateTestsFromMap.js # stepMap 到页面/规范生成器
│   ├── utils.js                # 辅助方法
│   └── config.js               # 路径、备用选择器、别名
│   └── __tests__/              # 单元测试（Vitest）
├── testgen.js                  # CLI 入口点
│── wdio.config.js              # WebdriverIO 配置
├── package.json                # 脚本和依赖项
├── selector-aliases.json       # 可选的用户定义选择器覆盖主选择器
```
---
# v8 模板项目

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- 框架: WDIO-V8 with Cucumber (V8x).
- 特性:
    - 页面对象模型使用 ES6/ES7 风格的基于类的方法和 TypeScript 支持
    - 多选择器选项示例，可以同时使用多个选择器查询元素
    - 多浏览器和无头浏览器执行示例 - 使用 Chrome 和 Firefox
    - 与 BrowserStack、Sauce Labs、LambdaTest 的云测试集成
    - 从 MS-Excel 读/写数据的示例，便于从外部数据源进行测试数据管理
    - 对任何 RDBMS（Oracle、MySql、TeraData、Vertica 等）的数据库支持，执行任何查询/获取结果集等的示例，用于端到端测试
    - 多种报告（Spec、Xunit/Junit、Allure、JSON）以及在 WebServer 上托管 Allure 和 Xunit/Junit 报告
    - 使用演示应用 https://search.yahoo.com/ 和 http://the-internet.herokuapp.com 的示例
    - BrowserStack、Sauce Labs、LambdaTest 和 Appium 特定的 `.config` 文件（用于在移动设备上回放）。关于在本地机器上一键设置 iOS 和 Android 的 Appium，请参考 [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)。

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- 框架: WDIO-V8 with Mocha (V10x).
- 特性:
    -  页面对象模型使用 ES6/ES7 风格的基于类的方法和 TypeScript 支持
    -  使用演示应用 https://search.yahoo.com 和 http://the-internet.herokuapp.com 的示例
    -  多浏览器和无头浏览器执行示例 - 使用 Chrome 和 Firefox
    -  与 BrowserStack、Sauce Labs、LambdaTest 的云测试集成
    -  多种报告（Spec、Xunit/Junit、Allure、JSON）以及在 WebServer 上托管 Allure 和 Xunit/Junit 报告
    -  从 MS-Excel 读/写数据的示例，便于从外部数据源进行测试数据管理
    -  连接到任何 RDBMS（Oracle、MySql、TeraData、Vertica 等）的 DB 示例，执行任何查询/获取结果集等，用于端到端测试
    -  BrowserStack、Sauce Labs、LambdaTest 和 Appium 特定的 `.config` 文件（用于在移动设备上回放）。关于在本地机器上一键设置 iOS 和 Android 的 Appium，请参考 [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)。

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- 框架: WDIO-V8 with Jasmine (V4x).
- 特性:
    -  页面对象模型使用 ES6/ES7 风格的基于类的方法和 TypeScript 支持
    -  使用演示应用 https://search.yahoo.com 和 http://the-internet.herokuapp.com 的示例
    -  多浏览器和无头浏览器执行示例 - 使用 Chrome 和 Firefox
    -  与 BrowserStack、Sauce Labs、LambdaTest 的云测试集成
    -  多种报告（Spec、Xunit/Junit、Allure、JSON）以及在 WebServer 上托管 Allure 和 Xunit/Junit 报告
    -  从 MS-Excel 读/写数据的示例，便于从外部数据源进行测试数据管理
    -  连接到任何 RDBMS（Oracle、MySql、TeraData、Vertica 等）的 DB 示例，执行任何查询/获取结果集等，用于端到端测试
    -  BrowserStack、Sauce Labs、LambdaTest 和 Appium 特定的 `.config` 文件（用于在移动设备上回放）。关于在本地机器上一键设置 iOS 和 Android 的 Appium，请参考 [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)。

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

这个模板项目使用 cucumber 和 typescript 的 WebdriverIO 8 测试，遵循页面对象模式。

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
    - 与 BrowserStack 和 Sauce Labs 的云测试集成
    - Docker 服务
    - 共享数据服务
    - 每个服务的单独配置文件
    - 按用户类型管理和读取测试数据
    - 报告
      - Dot
      - Spec
      - 包含失败截图的多个 cucumber html 报告
    - Gitlab 仓库的 Gitlab 流水线
    - Github 仓库的 Github Actions
    - 用于设置 docker hub 的 Docker compose
    - 使用 AXE 进行无障碍测试
    - 使用 Applitools 进行视觉测试
    - 日志机制


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- 框架
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特性
    - 包含 cucumber 中的示例测试场景
    - 集成 cucumber html 报告，失败时嵌入视频
    - 集成 Lambdatest 和 CircleCI 服务
    - 集成视觉、无障碍和 API 测试
    - 集成电子邮件功能
    - 集成 s3 存储桶用于测试报告存储和检索

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) 模板项目，帮助您使用最新的 WebdriverIO、Mocha 和 Serenity/JS 开始对 Web 应用程序进行验收测试。

- 框架
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD 报告

- 特性
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - 测试失败时自动截图，嵌入报告中
    - 使用 [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) 的持续集成 (CI) 设置
    - 发布到 GitHub Pages 的 [Demo Serenity BDD 报告](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) 模板项目，帮助您使用最新的 WebdriverIO、Cucumber 和 Serenity/JS 开始对 Web 应用程序进行验收测试。

- 框架
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD 报告

- 特性
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - 测试失败时自动截图，嵌入报告中
    - 使用 [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) 的持续集成 (CI) 设置
    - 发布到 GitHub Pages 的 [Demo Serenity BDD 报告](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
在 Headspin Cloud (https://www.headspin.io/) 中运行 WebdriverIO 测试的模板项目，使用 Cucumber 功能和页面对象模式。
- 框架
    - WebdriverIO (v8)
    - Cucumber (v8)

- 特性
    - 与 [Headspin](https://www.headspin.io/) 的云集成
    - 支持页面对象模型
    - 包含用 BDD 声明式风格编写的示例场景
    - 集成 cucumber html 报告

# v7 模板项目
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

使用 WebdriverIO 运行 Appium 测试的模板项目，用于：

- iOS/Android 原生应用
- iOS/Android 混合应用
- Android Chrome 和 iOS Safari 浏览器

此模板包括以下内容：

- 框架: Mocha
- 特性:
    - 配置用于:
        - iOS 和 Android 应用
        - iOS 和 Android 浏览器
    - 辅助工具用于:
        - WebView
        - 手势
        - 原生提醒
        - 选择器
     - 测试示例用于:
        - WebView
        - 登录
        - 表单
        - 滑动
        - 浏览器

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
使用 Mocha、WebdriverIO v6 和 PageObject 的 ATDD WEB 测试

- 框架
  - WebdriverIO (v7)
  - Mocha
- 特性
  - [页面对象](pageobjects) 模型
  - 使用 [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) 的 Sauce Labs 集成
  - Allure 报告
  - 失败测试自动截图
  - CircleCI 示例
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

使用 Mocha 运行 E2E 测试的模板项目。

- 框架:
    - WebdriverIO (v7)
    - Mocha
- 特性:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [视觉回归测试](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   页面对象模式
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) 和 [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions 示例
    -   Allure 报告（失败时截图）

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

运行 **WebdriverIO v7** 测试的模板项目，适用于以下内容：

[Cucumber 框架中使用 TypeScript 的 WDIO 7 脚本](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mocha 框架中使用 TypeScript 的 WDIO 7 脚本](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[在 Docker 中运行 WDIO 7 脚本](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[网络日志](https://github.com/17thSep/MonitorNetworkLogs/)

适用于以下内容的模板项目：

- 捕获网络日志
- 捕获所有 GET/POST 调用或特定 REST API
- 断言请求参数
- 断言响应参数
- 将所有响应存储在单独的文件中

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

使用 cucumber v7 和 wdio v7 以及页面对象模式运行原生和移动浏览器 appium 测试的模板项目。

- 框架
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 特性
    - 原生 Android 和 iOS 应用
    - Android Chrome 浏览器
    - iOS Safari 浏览器
    - 页面对象模型
    - 包含 cucumber 中的示例测试场景
    - 集成多个 cucumber html 报告

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

这是一个模板项目，帮助您了解如何使用最新的 WebdriverIO 和 Cucumber 框架从 Web 应用程序运行 webdriverio 测试。该项目旨在作为基础镜像，您可以用它来理解如何在 docker 中运行 WebdriverIO 测试

该项目包括：

- DockerFile
- cucumber 项目

阅读更多：[Medium 博客](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

这是一个模板项目，帮助您了解如何使用 WebdriverIO 运行 electronJS 测试。该项目旨在作为基础镜像，您可以用它来理解如何运行 WebdriverIO electronJS 测试。

该项目包括：

- 示例 electronjs 应用
- 示例 cucumber 测试脚本

阅读更多：[Medium 博客](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

这是一个模板项目，帮助您了解如何使用 winappdriver 和 WebdriverIO 自动化 Windows 应用程序。该项目旨在作为基础镜像，您可以用它来理解如何运行 windappdriver 和 WebdriverIO 测试。

阅读更多：[Medium 博客](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


这是一个模板项目，帮助您了解如何使用最新的 WebdriverIO 和 Jasmine 框架运行 webdriverio 多远程功能。该项目旨在作为基础镜像，您可以用它来理解如何在 docker 中运行 WebdriverIO 测试

该项目使用：
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

使用页面对象模式在真实 Roku 设备上运行 appium 测试的模板项目。

- 框架
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure 报告

- 特性
    - 页面对象模型
    - Typescript
    - 失败时截图
    - 使用示例 Roku 频道的示例测试

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

用于 E2E 多远程 Cucumber 测试以及数据驱动 Mocha 测试的 PoC 项目

- 框架:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- 特性:
    - 基于 Cucumber 的 E2E 测试
    - 基于 Mocha 的数据驱动测试
    - 仅 Web 测试 - 在本地和云平台上
    - 仅移动测试 - 本地和远程云模拟器（或设备）
    - Web + 移动测试 - 多远程 - 本地和云平台
    - 集成多种报告，包括 Allure
    - 全局处理测试数据（JSON / XLSX），以便在测试执行后将动态创建的数据写入文件
    - Github 工作流运行测试并上传 allure 报告

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

这是一个模板项目，帮助展示如何使用 appium 和 chromedriver 服务与最新的 WebdriverIO 运行 webdriverio 多远程。

- 框架
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- 特性
  - [页面对象](pageobjects) 模型
  - Typescript
  - Web + 移动测试 - 多远程
  - 原生 Android 和 iOS 应用
  - Appium
  - Chromedriver
  - ESLint
  - 登录 http://the-internet.herokuapp.com 和 [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) 的测试示例