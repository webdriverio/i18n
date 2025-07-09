---
id: proxy
title: 프록시 설정
---

프록시를 통해 두 가지 유형의 요청을 터널링할 수 있습니다:

- 테스트 스크립트와 브라우저 드라이버(또는 WebDriver 엔드포인트) 간의 연결
- 브라우저와 인터넷 간의 연결

## 드라이버와 테스트 간의 프록시

회사에 모든 나가는 요청에 대한 기업 프록시(예: `http://my.corp.proxy.com:9090`)가 있다면, WebdriverIO가 프록시를 사용하도록 구성하는 두 가지 옵션이 있습니다:

### 옵션 1: 환경 변수 사용 (권장)

WebdriverIO v9.12.0부터 표준 프록시 환경 변수를 간단히 설정할 수 있습니다:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# 선택 사항: 특정 호스트에 대해 프록시 우회
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

그런 다음 평소와 같이 테스트를 실행하세요. WebdriverIO는 자동으로 이러한 환경 변수를 프록시 구성에 사용합니다.

### 옵션 2: undici의 setGlobalDispatcher 사용

더 고급 프록시 구성이나 프로그래밍 방식의 제어가 필요한 경우 undici의 `setGlobalDispatcher` 메서드를 사용할 수 있습니다:

#### undici 설치

```bash npm2yarn
npm install undici --save-dev
```

#### 구성 파일에 undici setGlobalDispatcher 추가

다음 require 문을 구성 파일 상단에 추가하세요.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

프록시 구성에 대한 추가 정보는 [여기](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)에서 찾을 수 있습니다.

### 어떤 방법을 사용해야 할까요?

- **환경 변수 사용**: 다른 도구에서도 작동하고 코드 변경이 필요하지 않은 간단하고 표준적인 접근 방식을 원한다면 이 방법을 사용하세요.
- **setGlobalDispatcher 사용**: 사용자 정의 인증, 환경별 다른 프록시 구성 또는 프로그래밍 방식으로 프록시 동작을 제어해야 하는 고급 프록시 기능이 필요한 경우 이 방법을 사용하세요.

두 방법 모두 완전히 지원되며 WebdriverIO는 먼저 전역 디스패처를 확인한 후 환경 변수로 대체합니다.

### Sauce Connect 프록시

[Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)를 사용하는 경우, 다음과 같이 시작하세요:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## 브라우저와 인터넷 간의 프록시

브라우저와 인터넷 간의 연결을 터널링하기 위해 프록시를 설정할 수 있습니다. 이는 [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy)와 같은 도구로 네트워크 정보 및 기타 데이터를 캡처하는 데 유용할 수 있습니다.

`proxy` 매개변수는 다음과 같이 표준 기능을 통해 적용할 수 있습니다:

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