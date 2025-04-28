---
id: docker
title: Docker
---

Dockerは強力なコンテナ化技術であり、テストスイートをどのシステムでも同様に動作するコンテナにカプセル化することができます。これにより、異なるブラウザやプラットフォームのバージョンによる不安定さを回避できます。コンテナ内でテストを実行するには、プロジェクトディレクトリに`Dockerfile`を作成します。例：

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # 必要に応じてブラウザとバージョンを変更してください
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Dockerイメージに`node_modules`を含めず、イメージのビルド時にインストールするようにしてください。そのために、以下の内容で`.dockerignore`ファイルを追加します：

```
node_modules
```

:::info
ここではSeleniumとGoogle ChromeがプリインストールされたDockerイメージを使用しています。さまざまなブラウザ設定やブラウザバージョンで利用可能なイメージがあります。Seleniumプロジェクトが管理している[Docker Hub上のイメージ](https://hub.docker.com/u/selenium)をチェックしてください。
:::

Dockerコンテナ内ではGoogle Chromeをヘッドレスモードでのみ実行できるため、`wdio.conf.js`を変更してそれを確実に行う必要があります：

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

[オートメーションプロトコル](/docs/automationProtocols)で言及されているように、WebdriverIOはWebDriverプロトコルまたはWebDriver BiDiプロトコルを使用して実行できます。イメージにインストールされているChromeのバージョンが`package.json`で定義されている[Chromedriver](https://www.npmjs.com/package/chromedriver)のバージョンと一致していることを確認してください。

Dockerコンテナをビルドするには、次のコマンドを実行します：

```sh
docker build -t mytest -f Dockerfile .
```

テストを実行するには、次のコマンドを実行します：

```sh
docker run -it mytest
```

Dockerイメージの設定方法の詳細については、[Docker docs](https://docs.docker.com/)をチェックしてください。