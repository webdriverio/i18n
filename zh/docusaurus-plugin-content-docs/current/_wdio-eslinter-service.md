---
id: wdio-eslinter-service
title: 使用eslint服务自动检测缺失的导入
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service是一个第三方包，更多信息请查看[GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

你是否曾经运行e2e测试，结果在10、15或30分钟后才发现有缺失或拼写错误的导入，而这些问题直到测试运行到中途才出现？当这种情况发生时，测试运行器会将这些测试报告为失败。

eslint是一个很好的工具，可以在运行前捕获各种错误，而这个服务在执行WebdriverIO测试之前运行eslint工具，作为一个自动化步骤而非手动步骤。

尽早发现失败通常更好，这样我们可以更快地修复问题，而不是等到之后。

推荐的配置是使用unresolved运行器只检查缺失的导入，但如果需要，你也可以配置服务以使用npm或yarn运行器在你的项目中运行eslinter，或者通过传入一个标志，告诉系统也使用你的.eslintrc配置。

## 安装

安装wdio-eslinter-service：

```
$ npm i wdio-eslinter-service --save-dev 
```


### 快速开始 - 仅检查缺失或未解析的导入

默认情况下，这个最小配置，即"unresolved"运行器，会检查未解析的require导入，并在发现未解析的导入时抛出错误。然后服务停止执行。如果需要，你可以自定义.eslintrc.js以使用"npm"或"yarn"运行器执行更多检查。详情请参阅[eslint](https://www.npmjs.com/package/eslint)。

如果你的项目中没有`.eslintrc.js`配置，那么wdio-eslinter-service可以配置为使用默认配置，该配置仅在运行测试前检查缺失的导入。这很方便，这样你可以更早地发现不正确的导入，而不是等到之后。要配置此功能，请将以下eslinter配置添加到你的services数组中（假设你已经在使用chromedriver服务；否则，请省略该部分）：

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

此时，开始运行测试，如果有缺失或不正确的导入，WebdriverIO将记录并立即终止测试运行：

```
$ npx wdio
```


#### 可选 - 如果使用module-alias

如果你使用[module-alias](https://www.npmjs.com/package/module-alias)模块，它允许你配置别名来替换相对路径，你需要使用eslint-import-resolver-custom-alias插件将其传递到eslinter配置中。下面是一个例子：

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

在你的项目中安装插件：

```
$ npm i eslint-import-resolver-custom-alias
```

运行测试并验证系统是否能找到使用模块别名的不正确导入：

```
$ npx wdio
```

#### 实验性 - 与项目中现有的eslintrc配置一起使用

要让eslinter服务也使用你项目中现有的eslintrc配置，请在wdio.conf.js配置services数组中将`includeProjectEslintrc`设置为true。

我遇到过插件冲突的问题。如果你的项目eslint设置也在查找未解析的导入，那么这可能不起作用，并且可能需要调整你的.eslintrc.js。目前不推荐这样做。


### 高级替代方案 - 使用npm和yarn运行器

npm和yarn运行器可以帮助你对在项目中运行现有的eslinter设置进行额外控制。使用此配置，你可以在package.json的run-scripts部分定义要运行的额外命令：

在你的`package.json`中，向你的run scripts添加这个条目：

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**注意：使用npm或yarn运行器时，在package.json中添加eslint是服务运行所必需的。**

如果你尚未安装和配置eslint，你需要在项目中安装和配置它，以及你正在使用的任何插件，例如eslint-plugin-import：

```
$ npm i eslint eslint-plugin-import
```

如果你使用eslint-import-resolver-custom-alias插件将模块别名映射到它们的真实路径，那么你也需要安装它：

```
$ npm i eslint-import-resolver-custom-alias
```

如果你的项目中还没有eslintrc配置文件之一，你还需要创建一个`.eslintrc.js`文件。这里是一个基本设置，只查找未解析的导入，你可以扩展此配置以在运行测试之前验证其他代码质量检查：

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

最后，在`wdio.conf.js`中将`eslinter`服务添加到services数组中：

```javascript
    services: ['eslinter']
```

运行`npm run eslint`以验证并检查错误。

如果你使用`yarn`，你可以配置`runnerType`服务选项：

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

如果你已经有一个想要重用的linter脚本（而不是`eslint`），你可以配置`scriptName`服务选项：

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## 在WebdriverIO中使用

正常启动WebdriverIO的测试运行器。eslint将检查代码。如果发现错误，执行立即停止。

```bash
$ npx wdio
```


**示例：**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```