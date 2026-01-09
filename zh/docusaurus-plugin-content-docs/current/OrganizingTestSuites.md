---
id: organizingsuites
title: 组织测试套件
---

随着项目的增长，不可避免地会添加越来越多的集成测试。这会增加构建时间并降低生产力。

为了避免这种情况，你应该并行运行测试。WebdriverIO已经在单个会话中并行测试每个规格（或Cucumber中的_feature file_）。一般来说，尽量在每个规格文件中只测试一个功能。尝试不要在一个文件中包含太多或太少的测试。（然而，这里没有黄金法则。）

一旦你的测试有了几个规格文件，你应该开始并发运行测试。为此，在你的配置文件中调整`maxInstances`属性。WebdriverIO允许你以最大并发度运行测试——这意味着无论你有多少文件和测试，它们都可以并行运行。（这仍然受到某些限制，如计算机的CPU、并发限制等。）

> 假设你有3种不同的能力（Chrome、Firefox和Safari），并且你将`maxInstances`设置为`1`。WDIO测试运行器将产生3个进程。因此，如果你有10个规格文件并将`maxInstances`设置为`10`，_所有_规格文件将同时测试，并产生30个进程。

你可以全局定义`maxInstances`属性来为所有浏览器设置属性。

如果你运行自己的WebDriver网格，你可能（例如）对一个浏览器有比另一个更多的容量。在这种情况下，你可以在能力对象中_限制_`maxInstances`：

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## 继承主配置文件

如果你在多个环境中运行测试套件（例如，开发和集成环境），使用多个配置文件可能有助于保持可管理性。

类似于[页面对象概念](pageobjects)，你首先需要一个主配置文件。它包含所有在环境间共享的配置。

然后为每个环境创建另一个配置文件，并用环境特定的配置补充主配置：

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## 将测试规格分组到套件中

你可以将测试规格分组到套件中，并运行特定的单个套件，而不是运行所有套件。

首先，在你的WDIO配置中定义套件：

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

现在，如果你只想运行单个套件，可以将套件名称作为CLI参数传递：

```sh
wdio wdio.conf.js --suite login
```

或者，同时运行多个套件：

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## 将测试规格分组以顺序运行

如上所述，并发运行测试有很多好处。然而，在某些情况下，将测试分组在单个实例中顺序运行会更有益。这样做的例子主要是在有大型设置成本的情况下，例如转译代码或配置云实例，但也有一些高级使用模式可以从这种能力中受益。

要将测试分组在单个实例中运行，请将它们定义为specs定义中的数组。

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
在上面的例子中，测试'test_login.js'、'test_product_order.js'和'test_checkout.js'将在单个实例中顺序运行，而每个"test_b*"测试将在个别实例中并发运行。

也可以将在套件中定义的规格分组，所以你现在也可以这样定义套件：
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
在这种情况下，"end2end"套件的所有测试都将在单个实例中运行。

使用模式顺序运行测试时，它将按字母顺序运行规格文件

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

这将按以下顺序运行与上述模式匹配的文件：

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## 运行选定的测试

在某些情况下，你可能只希望执行套件中的单个测试（或测试子集）。

使用`--spec`参数，你可以指定应该运行哪个_套件_（Mocha、Jasmine）或_特性_（Cucumber）。路径是相对于你当前的工作目录解析的。

例如，只运行你的登录测试：

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

或者一次运行多个规格：

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

如果`--spec`值不指向特定的规格文件，则它被用来过滤配置中定义的规格文件名。

要运行规格文件名中包含"dialog"一词的所有规格，可以使用：

```sh
wdio wdio.conf.js --spec dialog
```

请注意，每个测试文件都在单个测试运行器进程中运行。由于我们不会提前扫描文件（请参阅下一节有关将文件名传递给`wdio`的信息），你_不能_使用（例如）`describe.only`在规格文件的顶部指示Mocha只运行该套件。

这个特性将帮助你实现相同的目标。

当提供`--spec`选项时，它将覆盖配置或能力级别的`specs`参数定义的任何模式。

## 排除选定的测试

在需要时，如果你需要从运行中排除特定的规格文件，你可以使用`--exclude`参数（Mocha、Jasmine）或特性（Cucumber）。

例如，从测试运行中排除你的登录测试：

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

或者，排除多个规格文件：

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

或者，在使用套件进行过滤时排除规格文件：

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

如果`--exclude`值不指向特定的规格文件，则它被用来过滤配置中定义的规格文件名。

要排除规格文件名中包含"dialog"一词的所有规格，可以使用：

```sh
wdio wdio.conf.js --exclude dialog
```

### 排除整个套件

你也可以按名称排除整个套件。如果排除值与配置中定义的套件名称匹配且不像文件路径，则整个套件将被跳过：

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

这将只运行`checkout`套件，完全跳过`login`套件。

混合排除（套件和规格模式）按预期工作：

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

在这个例子中，如果`signup`是一个定义的套件名称，那么该套件将被排除。模式`dialog`将过滤掉文件名中包含"dialog"的任何规格文件。

:::note
如果你同时指定了`--suite X`和`--exclude X`，排除优先，套件`X`将不会运行。
:::

当提供`--exclude`选项时，它将覆盖配置或能力级别的`exclude`参数定义的任何模式。

## 运行套件和测试规格

运行整个套件以及单独的规格。

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## 运行多个特定的测试规格

有时候，在持续集成和其他环境中，需要指定要运行的多组规格。WebdriverIO的`wdio`命令行工具接受通过管道传入的文件名（来自`find`、`grep`或其他工具）。

通过管道传入的文件名会覆盖配置中`spec`列表中指定的glob或文件名列表。

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**注意：**这_不会_覆盖`--spec`标志来运行单个规格。_

## 使用MochaOpts运行特定测试

你还可以通过向wdio CLI传递mocha特定参数：`--mochaOpts.grep`来过滤你想运行的特定`suite|describe`和/或`it|test`。

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**注意：**Mocha将在WDIO测试运行器创建实例后过滤测试，所以你可能会看到几个实例被生成但实际上并没有执行。_

## 使用MochaOpts排除特定测试

你还可以通过向wdio CLI传递mocha特定参数：`--mochaOpts.invert`来过滤你想排除的特定`suite|describe`和/或`it|test`。`--mochaOpts.invert`执行与`--mochaOpts.grep`相反的操作。

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**注意：**Mocha将在WDIO测试运行器创建实例后过滤测试，所以你可能会看到几个实例被生成但实际上并没有执行。_

## 失败后停止测试

使用`bail`选项，你可以告诉WebdriverIO在任何测试失败后停止测试。

当你已经知道构建会中断，但想避免完整测试运行的漫长等待时，这对于大型测试套件很有帮助。

`bail`选项期望一个数字，指定在WebDriver停止整个测试运行之前可能发生的测试失败数量。默认值为`0`，意味着它始终运行它能找到的所有测试规格。

请参阅[选项页面](configuration)获取有关bail配置的额外信息。
## 运行选项层次结构

当声明要运行的规格时，有一定的层次结构定义哪种模式将优先。目前，它的工作方式是，从最高优先级到最低：

> CLI `--spec`参数 > 能力 `specs`模式 > 配置 `specs`模式
> CLI `--exclude`参数 > 配置 `exclude`模式 > 能力 `exclude`模式

如果只给出配置参数，它将用于所有能力。但是，如果在能力级别定义模式，它将代替配置模式使用。最后，在命令行上定义的任何规格模式都将覆盖所有其他给定的模式。

### 使用能力定义的规格模式

当你在能力级别定义规格模式时，它将覆盖配置级别定义的任何模式。当需要根据不同的设备能力分离测试时，这很有用。在这种情况下，在配置级别使用通用规格模式，在能力级别使用更具体的模式更有用。

例如，假设你有两个目录，一个用于Android测试，一个用于iOS测试。

你的配置文件可能定义模式如下，用于非特定设备测试：

```js
{
    specs: ['tests/general/**/*.js']
}
```

但是，你将为Android和iOS设备使用不同的能力，其中模式可能如下所示：

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

如果你在配置文件中需要这两种能力，那么Android设备将只运行"android"命名空间下的测试，而iOS测试将只运行"ios"命名空间下的测试！

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```