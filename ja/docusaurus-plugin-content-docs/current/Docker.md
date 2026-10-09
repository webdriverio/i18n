---
id: docker
title: Docker
description: "ブラウザがプリインストールされたDockerコンテナ内でWebdriverIOのテストスイートを実行し、どのマシンでも一貫した結果を得られるようにします。"
---

Dockerは強力なコンテナ化技術で、テストスイートをどのシステムでも同じように動作するコンテナにカプセル化することができます。これにより、ブラウザやプラットフォームのバージョンの違いによる不安定さを回避できます。コンテナ内でテストを実行するには、プロジェクトディレクトリに`Dockerfile`を作成します。例：

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Dockerイメージに`node_modules`を含めず、イメージのビルド時にインストールされるようにしてください。そのためには、次の内容で`.dockerignore`ファイルを追加します：

```
node_modules
```

:::info
ここでは、SeleniumとGoogle Chromeがプリインストールされた Docker イメージを使用しています。さまざまなブラウザ構成やブラウザバージョンのイメージが利用可能です。Seleniumプロジェクトが管理しているイメージについては[Docker Hub](https://hub.docker.com/u/selenium)を確認してください。
:::

DockerコンテナではGoogle Chromeをヘッドレスモードでしか実行できないため、`wdio.conf.js`を変更してヘッドレスモードで実行されるようにする必要があります：

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

[自動化プロトコル](/docs/automationProtocols)で説明したように、WebdriverIOはWebDriverプロトコルまたはWebDriver BiDiプロトコルを使用して実行できます。イメージにインストールされているChromeのバージョンが、`package.json`で定義している[Chromedriver](https://www.npmjs.com/package/chromedriver)のバージョンと一致していることを確認してください。

Dockerコンテナをビルドするには、次のコマンドを実行します：

```sh
docker build -t mytest -f Dockerfile .
```

次に、テストを実行するには以下を実行します：

```sh
docker run -it mytest
```

Dockerイメージの設定方法の詳細については、[Dockerのドキュメント](https://docs.docker.com/)を確認してください。