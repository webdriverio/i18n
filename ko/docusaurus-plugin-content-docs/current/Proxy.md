---
id: proxy
title: 프록시 설정
---

프록시를 통해 두 가지 다른 유형의 요청을 터널링할 수 있습니다:

- 테스트 스크립트와 브라우저 드라이버(또는 WebDriver 엔드포인트) 간의 연결
- 브라우저와 인터넷 간의 연결

## 드라이버와 테스트 간의 프록시

회사에 모든 아웃바운드 요청에 대한 기업 프록시(예: `http://my.corp.proxy.com:9090`)가 있는 경우, 아래 단계에 따라 [undici](https://github.com/nodejs/undici)를 설치하고 구성하세요.

### undici 설치하기

```bash npm2yarn
npm install undici --save-dev
```

### 구성 파일에 undici setGlobalDispatcher 추가하기

구성 파일 상단에 다음 require 문을 추가하세요.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

프록시 구성에 대한 추가 정보는 [여기](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)에서 찾을 수 있습니다.

[Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)를 사용하는 경우, 다음과 같이 시작하세요:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## 브라우저와 인터넷 간의 프록시

브라우저와 인터넷 간의 연결을 터널링하기 위해 프록시를 설정할 수 있습니다. 이는 [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy)와 같은 도구를 사용하여 네트워크 정보 및 기타 데이터를 캡처하는 데 유용할 수 있습니다.

`proxy` 매개변수는 다음과 같이 표준 capabilities를 통해 적용할 수 있습니다:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

자세한 내용은 [WebDriver 사양](https://w3c.github.io/webdriver/#proxy)을 참조하세요.