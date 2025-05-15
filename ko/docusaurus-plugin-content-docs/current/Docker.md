---
id: docker
title: 도커
---

Docker는 테스트 스위트를 모든 시스템에서 동일하게 작동하는 컨테이너로 캡슐화할 수 있는 강력한 컨테이너화 기술입니다. 이는 다양한 브라우저나 플랫폼 버전으로 인한 불안정성을 방지할 수 있습니다. 컨테이너 내에서 테스트를 실행하려면 프로젝트 디렉토리에 `Dockerfile`을 생성하십시오. 예를 들면:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Docker 이미지에 `node_modules`를 포함시키지 않도록 하고 이미지를 빌드할 때 이를 설치해야 합니다. 이를 위해 다음 내용으로 `.dockerignore` 파일을 추가하세요:

```
node_modules
```

:::info
여기서는 Selenium과 Google Chrome이 사전 설치된 Docker 이미지를 사용하고 있습니다. 다양한 브라우저 설정과 브라우저 버전으로 구성된 여러 이미지가 있습니다. Selenium 프로젝트에서 관리하는 이미지를 [Docker Hub](https://hub.docker.com/u/selenium)에서 확인하세요.
:::

Docker 컨테이너에서는 Google Chrome을 헤드리스 모드로만 실행할 수 있으므로 `wdio.conf.js`를 수정하여 이를 확인해야 합니다:

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

[자동화 프로토콜](/docs/automationProtocols)에서 언급했듯이 WebDriver 프로토콜 또는 WebDriver BiDi 프로토콜을 사용하여 WebdriverIO를 실행할 수 있습니다. 이미지에 설치된 Chrome 버전이 `package.json`에 정의된 [Chromedriver](https://www.npmjs.com/package/chromedriver) 버전과 일치하는지 확인하세요.

Docker 컨테이너를 빌드하려면 다음을 실행하세요:

```sh
docker build -t mytest -f Dockerfile .
```

그런 다음 테스트를 실행하려면 다음을 실행하세요:

```sh
docker run -it mytest
```

Docker 이미지 구성 방법에 대한 자세한 내용은 [Docker 문서](https://docs.docker.com/)를 참조하세요.