---
id: testrunner
title: 测试运行器
---

WebdriverIO 自带测试运行器，帮助您尽快开始测试。它旨在为您完成所有工作，允许集成第三方服务，并帮助您尽可能高效地运行测试。

WebdriverIO 的测试运行器单独打包在 NPM 包 `@wdio/cli` 中。

安装方式如下：

```sh npm2yarn
npm install @wdio/cli
```

要查看命令行界面帮助，请在终端中输入以下命令：

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

很好！现在您需要定义一个配置文件，其中包含有关测试、功能和设置的所有信息。转到[配置文件](/docs/configuration)部分，了解该文件的结构。

使用 `wdio` 配置助手，生成配置文件非常简单。只需运行：

```sh
$ npx wdio config
```

...它会启动帮助工具。

它会向您提问并在不到一分钟的时间内为您生成配置文件。

![WDIO 配置工具](/img/config-utility.gif)

一旦配置文件设置完成，您可以通过运行以下命令启动测试：

```sh
npx wdio run wdio.conf.js
```

您还可以不使用 `run` 命令初始化测试运行：

```sh
npx wdio wdio.conf.js
```

就是这样！现在，您可以通过全局变量 `browser` 访问 Selenium 实例。

## 命令

### `wdio config`

`config` 命令运行 WebdriverIO 配置助手。这个助手会向您询问关于 WebdriverIO 项目的几个问题，并根据您的回答创建 `wdio.conf.js` 文件。

示例：

```sh
wdio config
```

选项：

```
--help            输出 WebdriverIO 帮助菜单                                [boolean]
--npm             是否使用 NPM 而不是 yarn 安装包                           [boolean]
```

### `wdio run`

> 这是运行配置的默认命令。

`run` 命令初始化您的 WebdriverIO 配置文件并运行您的测试。

示例：

```sh
wdio run ./wdio.conf.js --watch
```

选项：

```
--help                输出 WebdriverIO 帮助菜单                   [boolean]
--version             输出 WebdriverIO 版本                       [boolean]
--hostname, -h        自动化驱动程序主机地址                        [string]
--port, -p            自动化驱动程序端口                           [number]
--user, -u            使用云服务作为自动化后端时的用户名               [string]
--key, -k             与用户对应的访问密钥                           [string]
--watch               监视文件变化                                [boolean]
--logLevel, -l        日志记录的详细程度
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                在特定数量的测试失败后停止测试运行器                [number]
--baseUrl             通过设置基本 URL 缩短 URL 命令调用             [string]
--waitforTimeout, -w  所有 waitForXXX 命令的超时                   [number]
--framework, -f       定义运行规范的框架（Mocha、Jasmine 或 Cucumber）   [string]
--reporters, -r       在标准输出上打印结果的报告器                       [array]
--suite               覆盖 specs 属性并运行定义的套件                   [array]
--spec                运行特定的规范文件或通配符 - 覆盖从标准输入传递的规范  [array]
--exclude             从运行中排除规范文件 - 覆盖从标准输入传递的规范      [array]
--repeat              重复特定规范和/或套件 N 次                        [number]
--mochaOpts           Mocha 选项
--jasmineOpts         Jasmine 选项
--cucumberOpts        Cucumber 选项
```

> 注意：可以通过 `tsx` 环境变量轻松控制自动编译。另请参阅 [TypeScript 文档](/docs/typescript)。

### `wdio install`
`install` 命令允许您通过 CLI 向 WebdriverIO 项目添加报告器和服务。

示例：

```sh
wdio install service sauce # 安装 @wdio/sauce-service
wdio install reporter dot # 安装 @wdio/dot-reporter
wdio install framework mocha # 安装 @wdio/mocha-framework
```

如果您想使用 `yarn` 安装软件包，可以向命令传递 `--yarn` 标志：

```sh
wdio install service sauce --yarn
```

如果您的 WDIO 配置文件不在您正在工作的文件夹中，您还可以传递自定义配置路径：

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### 支持的服务列表

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### 支持的报告器列表

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### 支持的框架列表

```
mocha
jasmine
cucumber
```

### `wdio repl`

repl 命令允许启动交互式命令行界面来运行 WebdriverIO 命令。它可用于测试目的或快速启动 WebdriverIO 会话。

在本地 Chrome 中运行测试：

```sh
wdio repl chrome
```

或在 Sauce Labs 上运行测试：

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

您可以应用与[run 命令](#wdio-run)相同的参数。