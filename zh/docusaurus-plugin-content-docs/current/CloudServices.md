---
id: cloudservices
title: 使用云服务
---

在WebdriverIO中使用按需服务如Sauce Labs、Browserstack、TestingBot、TestMu AI（原LambdaTest）或Perfecto非常简单。你只需要在配置选项中设置你服务的`user`和`key`即可。

另外，你也可以通过设置特定云服务的能力（capabilities）如`build`来参数化你的测试。如果你只想在Travis中运行云服务，你可以使用`CI`环境变量来检查是否在Travis中并相应地修改配置。

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

你可以设置你的测试在[Sauce Labs](https://saucelabs.com)上远程运行。

唯一的要求是在你的配置中设置`user`和`key`（通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为你的Sauce Labs用户名和访问密钥。

你也可以在任何浏览器的capabilities中以键/值的形式传入任何可选的[测试配置选项](https://docs.saucelabs.com/dev/test-configuration-options/)。

### Sauce Connect

如果你想要运行测试的服务器不能通过互联网访问（比如在`localhost`），那么你需要使用[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)。

支持这一点超出了WebdriverIO的范围，所以你必须自己启动它。

如果你使用WDIO测试运行器，请在你的`wdio.conf.js`中下载并配置[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)。它有助于运行Sauce Connect，并带有额外的功能，可以更好地将你的测试集成到Sauce服务中。

### 与Travis CI一起使用

然而，Travis CI确实[支持](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)在每次测试前启动Sauce Connect，所以按照他们的指示是一个选择。

如果你这样做，你必须在每个浏览器的`capabilities`中设置`tunnel-identifier`测试配置选项。Travis默认将其设置为`TRAVIS_JOB_NUMBER`环境变量。

此外，如果你希望Sauce Labs按构建号对你的测试进行分组，你可以将`build`设置为`TRAVIS_BUILD_NUMBER`。

最后，如果你设置了`name`，这将在Sauce Labs中更改此构建的测试名称。如果你使用WDIO测试运行器并结合[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)，WebdriverIO会自动为测试设置一个合适的名称。

`capabilities`示例：

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### 超时

由于你是远程运行测试，可能需要增加一些超时时间。

你可以通过传递`idle-timeout`作为测试配置选项来更改[空闲超时](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)。这控制Sauce在命令之间等待多长时间后关闭连接。

## BrowserStack

WebdriverIO也内置了[Browserstack](https://www.browserstack.com)集成。

唯一的要求是在你的配置中设置`user`和`key`（通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为你的Browserstack自动化用户名和访问密钥。

你也可以在任何浏览器的capabilities中以键/值的形式传入任何可选的[支持的capabilities](https://www.browserstack.com/automate/capabilities)。如果你将`browserstack.debug`设置为`true`，它将记录会话的屏幕录像，这可能会有所帮助。

### 本地测试

如果你想要运行测试的服务器不能通过互联网访问（比如在`localhost`），那么你需要使用[本地测试](https://www.browserstack.com/local-testing#command-line)。

支持这一点超出了WebdriverIO的范围，所以你必须自己启动它。

如果你使用本地测试，你应该在capabilities中将`browserstack.local`设置为`true`。

如果你使用WDIO测试运行器，请在你的`wdio.conf.js`中下载并配置[`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service)。它有助于运行BrowserStack，并带有额外的功能，可以更好地将你的测试集成到BrowserStack服务中。

### 与Travis CI一起使用

如果你想在Travis中添加本地测试，你必须自己启动它。

以下脚本将下载并在后台启动它。你应该在启动测试之前在Travis中运行这个。

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

此外，你可能希望将`build`设置为Travis构建号。

`capabilities`示例：

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

唯一的要求是在你的配置中设置`user`和`key`（通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为你的[TestingBot](https://testingbot.com)用户名和密钥。

你也可以在任何浏览器的capabilities中以键/值的形式传入任何可选的[支持的capabilities](https://testingbot.com/support/other/test-options)。

### 本地测试

如果你想要运行测试的服务器不能通过互联网访问（比如在`localhost`），那么你需要使用[本地测试](https://testingbot.com/support/other/tunnel)。TestingBot提供了一个基于Java的隧道，允许你测试不能从互联网访问的网站。

他们的隧道支持页面包含了使其启动和运行所需的信息。

如果你使用WDIO测试运行器，请在你的`wdio.conf.js`中下载并配置[`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service)。它有助于运行TestingBot，并带有额外的功能，可以更好地将你的测试集成到TestingBot服务中。

## TestMu AI（原LambdaTest）

[TestMu AI](https://www.testmuai.com/)集成也是内置的。

唯一的要求是在你的配置中设置`user`和`key`（通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为你的TestMu AI账户用户名和访问密钥。

你也可以在任何浏览器的capabilities中以键/值的形式传入任何可选的[支持的capabilities](https://www.testmuai.com/capabilities-generator/)。如果你将`visual`设置为`true`，它将记录会话的屏幕录像，这可能会有所帮助。

### 本地测试的隧道

如果你想要运行测试的服务器不能通过互联网访问（比如在`localhost`），那么你需要使用[本地测试](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/)。

支持这一点超出了WebdriverIO的范围，所以你必须自己启动它。

如果你使用本地测试，你应该在capabilities中将`tunnel`设置为`true`。

如果你使用WDIO测试运行器，请在你的`wdio.conf.js`中下载并配置[`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service)。它有助于运行TestMu AI，并带有额外的功能，可以更好地将你的测试集成到TestMu AI服务中。

### 与Travis CI一起使用

如果你想在Travis中添加本地测试，你必须自己启动它。

以下脚本将下载并在后台启动它。你应该在启动测试之前在Travis中运行这个。

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

此外，你可能希望将`build`设置为Travis构建号。

`capabilities`示例：

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

当使用wdio与[`Perfecto`](https://www.perfecto.io)时，你需要为每个用户创建一个安全令牌，并将其添加到capabilities结构中（除了其他capabilities），如下所示：

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

此外，你需要添加云配置，如下所示：

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```