---
id: docker
title: Docker
description: "ブラウザがプリインストールされた Docker コンテナ内で WebdriverIO のテストスイートを実行し、どのマシンでも一貫した結果を得ることができます。"
---

Docker は強力なコンテナ化技術であり、テストスイートをどのシステムでも同じように動作するコンテナにカプセル化することができます。これにより、ブラウザやプラットフォームのバージョンの違いによる不安定さ（flakiness）を回避できます。コンテナ内でテストを実行するには、プロジェクトディレクトリに `Dockerfile` を作成します。例：

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # 必要に応じてブラウザとバージョンを変更してください
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Docker イメージに `node_modules` を含めず、イメージのビルド時にインストールされるようにしてください。そのためには、次の内容で `.dockerignore` ファイルを追加します：

```
node_modules
```

:::info
ここでは Selenium と Google Chrome がプリインストールされた Docker イメージを使用しています。さまざまなブラウザ構成やブラウザバージョンを備えたイメージが用意されています。Selenium プロジェクトがメンテナンスしているイメージは [Docker Hub](https://hub.docker.com/u/selenium) で確認してください。
:::

Docker コンテナ内では Google Chrome をヘッドレスモードでしか実行できないため、そのように動作するよう `wdio.conf.js` を変更する必要があります：

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

[自動化プロトコル](/docs/automationProtocols)で説明したように、WebdriverIO は WebDriver プロトコルまたは WebDriver BiDi プロトコルを使用して実行できます。イメージにインストールされている Chrome のバージョンが、`package.json` で定義した [Chromedriver](https://www.npmjs.com/package/chromedriver) のバージョンと一致していることを確認してください。

Docker コンテナをビルドするには、次を実行します：

```sh
docker build -t mytest -f Dockerfile .
```

その後、テストを実行するには次を実行します：

```sh
docker run -it mytest
```

Docker イメージの設定方法の詳細については、[Docker のドキュメント](https://docs.docker.com/)を参照してください。

## WebdriverIO がブラウザをダウンロードするイメージ

イメージにブラウザが含まれていない場合、WebdriverIO は Chrome、Chromium、Firefox、Chromedriver を自らダウンロードします。Chrome、Chromium、Chromedriver は zip ファイルとして提供され、WebdriverIO は Linux と macOS では `unzip` コマンド（Windows では `tar.exe` または PowerShell）を使ってそれらを展開します。`node:24-slim` などのスリムイメージや最小構成の Alpine イメージには `unzip` が含まれていないため、`Dockerfile` でインストールしてください：

```Dockerfile
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
```

Alpine では `RUN apk add --no-cache unzip` を使用してください。これがないと、ダウンロードは `Extraction failed: no zip archiver is available` というエラーで失敗します。