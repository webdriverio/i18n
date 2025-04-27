---
id: cloudservices
title: 使用云服务
---

在WebdriverIO中使用按需服务，如Sauce Labs、Browserstack、TestingBot、LambdaTest或Perfecto非常简单。您只需要在配置选项中设置您的服务的`user`和`key`。

另外，您还可以通过设置特定云服务的能力（capabilities）如`build`来参数化您的测试。如果您只想在Travis中运行云服务，可以使用`CI`环境变量来检查是否在Travis环境中，并相应地修改配置。

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

您可以设置测试在[Sauce Labs](https://saucelabs.com)远程运行。

唯一的要求是在您的配置中设置`user`和`key`（可以通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为您的Sauce Labs用户名和访问密钥。

您还可以在任何浏览器的capabilities中，以键/值形式传入任何可选的[测试配置选项](https://docs.saucelabs.com/dev/test-configuration-options/)。

### Sauce Connect

如果您想对互联网无法访问的服务器（如`localhost`）运行测试，那么您需要使用[Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)。

WebdriverIO的范围不包括支持这一功能，所以您必须自己启动它。

如果您使用WDIO测试运行器，请在您的`wdio.conf.js`中下载并配置[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)。它有助于运行Sauce Connect，并带有其他功能，可以更好地将您的测试集成到Sauce服务中。

### 与Travis CI集成

不过，Travis CI[确实支持](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)在每次测试前启动Sauce Connect，所以按照他们的指示操作是一个选择。

如果这样做，您必须在每个浏览器的`capabilities`中设置`tunnel-identifier`测试配置选项。Travis默认将其设置为`TRAVIS_JOB_NUMBER`环境变量。

此外，如果您希望Sauce Labs按构建号对测试进行分组，可以将`build`设置为`TRAVIS_BUILD_NUMBER`。

最后，如果您设置了`name`，这将更改此构建在Sauce Labs中的测试名称。如果您使用WDIO测试运行器结合[`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)，WebdriverIO会自动为测试设置一个合适的名称。

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

由于您是远程运行测试，可能需要增加一些超时时间。

您可以通过传递`idle-timeout`作为测试配置选项来更改[空闲超时](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)。这控制了Sauce在命令之间等待多长时间后关闭连接。

## BrowserStack

WebdriverIO还内置了[Browserstack](https://www.browserstack.com)集成。

唯一的要求是在您的配置中设置`user`和`key`（可以通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为您的Browserstack自动化用户名和访问密钥。

您还可以在任何浏览器的capabilities中，以键/值形式传入任何可选的[支持的功能](https://www.browserstack.com/automate/capabilities)。如果您将`browserstack.debug`设置为`true`，它将记录会话的屏幕录像，这可能会有所帮助。

### 本地测试

如果您想对互联网无法访问的服务器（如`localhost`）运行测试，那么您需要使用[本地测试](https://www.browserstack.com/local-testing#command-line)。

WebdriverIO的范围不包括支持这一功能，所以您必须自己启动它。

如果您使用本地测试，应该在您的capabilities中将`browserstack.local`设置为`true`。

如果您使用WDIO测试运行器，请在您的`wdio.conf.js`中下载并配置[`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service)。它有助于运行BrowserStack，并带有其他功能，可以更好地将您的测试集成到BrowserStack服务中。

### 与Travis CI集成

如果您想在Travis中添加本地测试，您必须自己启动它。

以下脚本将下载并在后台启动它。您应该在开始测试之前在Travis中运行这个脚本。

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

此外，您可能希望将`build`设置为Travis构建号。

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

唯一的要求是在您的配置中设置`user`和`key`（可以通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为您的[TestingBot](https://testingbot.com)用户名和密钥。

您还可以在任何浏览器的capabilities中，以键/值形式传入任何可选的[支持的功能](https://testingbot.com/support/other/test-options)。

### 本地测试

如果您想对互联网无法访问的服务器（如`localhost`）运行测试，那么您需要使用[本地测试](https://testingbot.com/support/other/tunnel)。TestingBot提供基于Java的隧道，允许您测试互联网无法访问的网站。

他们的隧道支持页面包含了使其启动和运行所需的信息。

如果您使用WDIO测试运行器，请在您的`wdio.conf.js`中下载并配置[`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service)。它有助于运行TestingBot，并带有其他功能，可以更好地将您的测试集成到TestingBot服务中。

## LambdaTest

[LambdaTest](https://www.lambdatest.com)集成也是内置的。

唯一的要求是在您的配置中设置`user`和`key`（可以通过`wdio.conf.js`导出或传入`webdriverio.remote(...)`）为您的LambdaTest账户用户名和访问密钥。

您还可以在任何浏览器的capabilities中，以键/值形式传入任何可选的[支持的功能](https://www.lambdatest.com/capabilities-generator/)。如果您将`visual`设置为`true`，它将记录会话的屏幕录像，这可能会有所帮助。

### 本地测试隧道

如果您想对互联网无法访问的服务器（如`localhost`）运行测试，那么您需要使用[本地测试](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/)。

WebdriverIO的范围不包括支持这一功能，所以您必须自己启动它。

如果您使用本地测试，应该在您的capabilities中将`tunnel`设置为`true`。

如果您使用WDIO测试运行器，请在您的`wdio.conf.js`中下载并配置[`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service)。它有助于运行LambdaTest，并带有其他功能，可以更好地将您的测试集成到LambdaTest服务中。

### 与Travis CI集成

如果您想在Travis中添加本地测试，您必须自己启动它。

以下脚本将下载并在后台启动它。您应该在开始测试之前在Travis中运行这个脚本。

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

此外，您可能希望将`build`设置为Travis构建号。

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

当使用wdio与[`Perfecto`](https://www.perfecto.io)时，您需要为每个用户创建安全令牌，并将其添加到capabilities结构中（除了其他capabilities外），如下所示：

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

此外，您需要添加云配置，如下所示：

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```