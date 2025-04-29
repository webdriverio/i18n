---
id: docker
title: Docker
---

Dockerは強力なコンテナ技術で、テストスイートをどのシステムでも同じように動作するコンテナにカプセル化することができます。これにより、異なるブラウザやプラットフォームのバージョンによる不安定さを避けることができます。コンテナ内でテストを実行するには、プロジェクトディレクトリに`Dockerfile`を作成します：

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # 必要に応じてブラウザとバージョンを変更してください
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Dockerイメージに`node_modules`を含めないようにし、イメージのビルド時にインストールするようにしてください。そのために、以下の内容の`.dockerignore`ファイルを追加します：

```
node_modules
```

:::info
ここではSeleniumとGoogle ChromeがプリインストールされたDockerイメージを使用しています。様々なブラウザセットアップとブラウザバージョンを持つ複数のイメージが利用可能です。Seleniumプロジェクトが管理している[Docker Hub](https://hub.docker.com/u/selenium)のイメージをチェックしてください。
:::

Dockerコンテナ内ではGoogle Chromeをヘッドレスモードでのみ実行できるため、`wdio.conf.js`を修正して確実にそうするようにします：

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

[Automation Protocols](/docs/automationProtocols)で言及されているように、WebdriverIOはWebDriverプロトコルまたはWebDriver BiDiプロトコルを使用して実行できます。イメージにインストールされているChromeのバージョンが、`package.json`で定義している[Chromedriver](https://www.npmjs.com/package/chromedriver)のバージョンと一致することを確認してください。

Dockerコンテナをビルドするには、次のコマンドを実行します：

```sh
docker build -t mytest -f Dockerfile .
```

そして、テストを実行するには、次のコマンドを実行します：

```sh
docker run -it mytest
```

Dockerイメージの設定方法の詳細については、[Docker docs](https://docs.docker.com/)を参照してください。