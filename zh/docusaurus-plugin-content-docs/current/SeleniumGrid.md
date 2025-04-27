---
id: seleniumgrid
title: Selenium Grid
---

您可以将WebdriverIO与现有的Selenium Grid实例一起使用。要将测试连接到Selenium Grid，您只需更新测试运行器配置中的选项。

以下是来自示例wdio.conf.ts的代码片段。

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
您需要根据Selenium Grid设置提供适当的协议、主机名、端口和路径值。
如果您在与测试脚本相同的机器上运行Selenium Grid，以下是一些典型选项：

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### 使用受保护的Selenium Grid进行基本身份验证

强烈建议保护您的Selenium Grid。如果您有需要身份验证的受保护Selenium Grid，可以通过选项传递身份验证头。
更多信息请参考文档中的[headers](https://webdriver.io/docs/configuration/#headers)部分。

### 动态Selenium Grid的超时配置

当使用按需启动浏览器pod的动态Selenium Grid时，会话创建可能面临冷启动问题。在这种情况下，建议增加会话创建超时时间。选项中的默认值是120秒，但如果您的网格需要更多时间来创建新会话，可以增加它。

```ts
connectionRetryTimeout: 180000,
```

### 高级配置

有关高级配置，请参考Testrunner[配置文件](https://webdriver.io/docs/configurationfile)。

### 使用Selenium Grid进行文件操作

当使用远程Selenium Grid运行测试用例时，浏览器在远程机器上运行，您需要特别注意涉及文件上传和下载的测试用例。

### 文件下载

对于基于Chromium的浏览器，您可以参考[下载文件](https://webdriver.io/docs/api/browser/downloadFile)文档。如果您的测试脚本需要读取下载文件的内容，您需要将其从远程Selenium节点下载到测试运行器机器。以下是Chrome浏览器示例`wdio.conf.ts`配置的代码片段：

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### 使用远程Selenium Grid上传文件

要向远程浏览器中的Web应用程序上传文件，您首先需要将文件上传到远程网格。详细信息请参考[uploadFile](https://webdriver.io/docs/api/browser/uploadFile)文档。

### 其他文件/网格操作

您可以使用Selenium Grid执行更多操作。Selenium Standalone的说明也应该适用于Selenium Grid。有关可用选项，请参考[Selenium Standalone](https://webdriver.io/docs/api/selenium/)文档。


### Selenium Grid官方文档

有关Selenium Grid的更多信息，您可以参考官方Selenium Grid[文档](https://www.selenium.dev/documentation/grid/)。

如果您希望在Docker、Docker compose或Kubernetes中运行Selenium Grid，请参考Selenium-Docker [GitHub存储库](https://github.com/SeleniumHQ/docker-selenium)。