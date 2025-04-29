---
id: wdio-docker-service
title: Docker 服务
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

这个服务旨在与 [WebdriverIO](http://webdriver.io/) 一起使用，它帮助运行针对/使用容器化应用程序的功能/集成测试。它使用流行的 [Docker](https://www.docker.com/) 服务（需单独安装）来运行容器。

## 为什么要使用它？
理想情况下，您的测试会在某种CI/CD管道中运行，在那里通常没有"真实"的浏览器和应用程序依赖的其他资源。随着Docker的出现，几乎所有必要的应用依赖都可以被容器化。
使用此服务，您可以在CI中运行您的应用容器或[docker-selenium](https://github.com/SeleniumHQ/docker-selenium)，并且完全隔离
（假设CI可以安装Docker作为依赖项）。如果您的应用需要与主操作系统有一定程度的隔离，同样适用于本地开发。

## 工作原理
服务将运行现有的docker镜像，一旦准备就绪，将启动WebdriverIO测试，这些测试应该针对您的容器化应用程序运行。

## 安装

运行：

```bash
npm install wdio-docker-service --save-dev
```

关于如何安装WebdriverIO的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置
默认情况下，当安装在主机系统上时，可以使用Google Chrome、Firefox和PhantomJS。
为了使用该服务，您需要将`docker`添加到您的服务数组中：

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## 选项

### dockerOptions
运行docker容器所需的各种选项

类型：`Object`

默认值：`{ 
    options: {
        rm: true
    }
}`

示例：

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Docker容器名称标签。可以是本地的或来自Docker HUB的。

类型：`String`

必需：`true`

### dockerOptions.healthCheck
在启动测试之前检查容器就绪状态的配置。通常这将是一个localhost URL。
如果未配置healthCheck，Webdriver将在Docker容器启动后立即开始运行测试，考虑到Docker容器内启动Web服务需要时间，这可能为时过早。

类型：`String|Object`

对象使用的选项：
- *url* - 容器内运行的应用程序的URL
- *maxRetries* - 健康检查失败前的重试次数。默认值：10
- *inspectInterval* - 每次重试之间的间隔（毫秒）。默认值：500
- *startDelay* - 开始健康检查的初始延迟（毫秒）。默认值：0

示例1（字符串）：`healthCheck: 'http://localhost:4444'`

示例2（对象）：

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
`docker run`命令使用的选项映射。有关`run`命令的更多详情，请点击[这里](https://docs.docker.com/edge/engine/reference/commandline/run/)。

任何单字母选项将转换为`-[option]`（例如`d: true` -> `-d`）。

任何两个或更多字符的选项将转换为`--[option]`（例如`rm: true` -> `--rm`）。

对于可能多次使用的选项（例如`-e`、`-add-host`、`--expose`等），请使用数组表示法（例如`e: ["NODE_ENV=development", "FOO=bar"]`）。

类型：`Object`

示例：

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
您可能想要传递到容器中的任何参数。对应于Docker run CLI中的`[ARG...]`。

类型：`String`

### dockerOptions.command
您可能想要传递给容器的任何命令。对应于Docker run CLI中的`[COMMAND]`。

类型：`String`

### onDockerReady
Docker应用程序准备就绪时调用的回调方法。就绪状态由能否ping通`healthCheck` URL确定。

类型：`Function`

### dockerLogs
存储docker容器日志的路径

类型：`String`

## 测试用例/配方
更多详情请访问我们的[Wiki](https://github.com/stsvilik/wdio-docker-service/wiki)。