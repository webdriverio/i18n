---
id: docker
title: Docker 容器
---

Docker 是一种强大的容器化技术，它允许将测试套件封装到容器中，使其在每个系统上的行为都相同。这可以避免由于不同的浏览器或平台版本导致的不稳定性。为了在容器中运行测试，在项目目录中创建一个 `Dockerfile`，例如：

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

确保不要将 `node_modules` 包含在 Docker 镜像中，并在构建镜像时安装这些模块。为此，添加一个包含以下内容的 `.dockerignore` 文件：

```
node_modules
```

:::info
我们在这里使用的 Docker 镜像预装了 Selenium 和 Google Chrome。有各种镜像可用，具有不同的浏览器设置和浏览器版本。查看 Selenium 项目在 [Docker Hub](https://hub.docker.com/u/selenium) 上维护的镜像。
:::

由于我们只能在 Docker 容器中以无头模式运行 Google Chrome，因此我们必须修改 `wdio.conf.js` 来确保这一点：

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

如[自动化协议](/docs/automationProtocols)中所述，您可以使用 WebDriver 协议或 WebDriver BiDi 协议运行 WebdriverIO。确保镜像上安装的 Chrome 版本与您在 `package.json` 中定义的 [Chromedriver](https://www.npmjs.com/package/chromedriver) 版本匹配。

要构建 Docker 容器，可以运行：

```sh
docker build -t mytest -f Dockerfile .
```

然后要运行测试，执行：

```sh
docker run -it mytest
```

有关如何配置 Docker 镜像的更多信息，请查看 [Docker 文档](https://docs.docker.com/)。