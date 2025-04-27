---
id: pageobjects
title: 页面对象模式
---

WebdriverIO 的第5版在设计时就考虑了页面对象模式支持。通过引入"元素作为一等公民"的原则，现在可以使用此模式构建大型测试套件。

创建页面对象不需要额外的包。事实证明，简洁、现代的类提供了我们所需的所有必要功能：

- 页面对象之间的继承
- 元素的延迟加载
- 方法和动作的封装

使用页面对象的目标是将任何页面信息从实际测试中抽象出来。理想情况下，你应该将所有特定于某个页面的选择器或特定指令存储在页面对象中，这样即使在完全重新设计页面后，你仍然可以运行测试。

## 创建页面对象

首先，我们需要一个主页面对象，我们称之为`Page.js`。它将包含所有页面对象将继承的通用选择器或方法。

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

我们始终会`export`一个页面对象的实例，而不是在测试中创建该实例。由于我们正在编写端到端测试，我们始终将页面视为无状态结构——就像每个HTTP请求是无状态结构一样。

当然，浏览器可以携带会话信息，因此可以基于不同的会话显示不同的页面，但这不应该反映在页面对象中。这类状态变化应该存在于你的实际测试中。

让我们开始测试第一个页面。出于演示目的，我们使用[Elemental Selenium](http://elementalselenium.com)的[The Internet](http://the-internet.herokuapp.com)网站作为测试对象。让我们尝试为[登录页面](http://the-internet.herokuapp.com/login)构建一个页面对象示例。

## 获取选择器

第一步是将`login.page`对象中所需的所有重要选择器编写为getter函数：

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

在getter函数中定义选择器可能看起来有点奇怪，但它非常有用。这些函数在你访问属性时被评估，而不是在生成对象时。这样，你总是在对元素执行操作之前请求该元素。

## 链式命令

WebdriverIO内部会记住命令的最后结果。如果你将元素命令与动作命令链接起来，它会从前一个命令中找到元素并使用结果执行动作。这样你可以删除选择器（第一个参数），命令看起来就像：

```js
await LoginPage.username.setValue('Max Mustermann')
```

这基本上与以下代码相同：

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

或者

```js
await $('#username').setValue('Max Mustermann')
```

## 在测试中使用页面对象

定义了页面所需的元素和方法后，你可以开始为其编写测试。要使用页面对象，你只需要`import`（或`require`）它。就这么简单！

由于你导出的是已创建的页面对象实例，导入后你可以立即开始使用它。

如果你使用断言框架，你的测试可以更具表现力：

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

从结构上讲，将规范文件和页面对象分离到不同的目录中是有意义的。此外，你可以给每个页面对象添加后缀：`.page.js`。这使得导入页面对象时更加清晰。

## 更进一步

这是使用WebdriverIO编写页面对象的基本原则。但你可以构建比这更复杂的页面对象结构！例如，你可能为模态框有特定的页面对象，或者将一个庞大的页面对象拆分成继承自主页面对象的不同类（每个类代表整个网页的不同部分）。这种模式确实提供了很多机会将页面信息与测试分离，这对于在项目和测试数量增长时保持测试套件结构清晰非常重要。

你可以在GitHub上的[`example`文件夹](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject)中找到这个示例（以及更多页面对象示例）。