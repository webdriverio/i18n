---
id: cloudservices
title: 클라우드 서비스 사용하기
---

WebdriverIO에서 Sauce Labs, Browserstack, TestingBot, LambdaTest 또는 Perfecto와 같은 온디맨드 서비스를 사용하는 것은 매우 간단합니다. 옵션에 서비스의 `user`와 `key`를 설정하기만 하면 됩니다.

선택적으로, `build`와 같은 클라우드별 기능을 설정하여 테스트를 매개변수화할 수도 있습니다. Travis에서만 클라우드 서비스를 실행하려면 `CI` 환경 변수를 사용하여 Travis에 있는지 확인하고 그에 따라 구성을 수정할 수 있습니다.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

테스트를 [Sauce Labs](https://saucelabs.com)에서 원격으로 실행하도록 설정할 수 있습니다.

유일한 요구 사항은 구성에서 `user`와 `key`를 Sauce Labs 사용자 이름과 액세스 키로 설정하는 것입니다(`wdio.conf.js`에서 내보내거나 `webdriverio.remote(...)`에 전달).

또한 모든 브라우저의 capabilities에 키/값으로 선택적 [테스트 구성 옵션](https://docs.saucelabs.com/dev/test-configuration-options/)을 전달할 수도 있습니다.

### Sauce Connect

인터넷에 접근할 수 없는 서버(예: `localhost`)에 대해 테스트를 실행하려면 [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)를 사용해야 합니다.

이를 지원하는 것은 WebdriverIO의 범위를 벗어나므로 직접 시작해야 합니다.

WDIO 테스트러너를 사용하는 경우 `wdio.conf.js`에서 [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)를 다운로드하고 구성하세요. 이는 Sauce Connect를 실행하는 데 도움이 되며 테스트를 Sauce 서비스에 더 잘 통합하는 추가 기능이 제공됩니다.

### Travis CI와 함께 사용

그러나 Travis CI는 각 테스트 전에 Sauce Connect를 시작하기 위한 [지원](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)을 제공하므로, 해당 지침을 따르는 것이 옵션입니다.

그렇게 하는 경우, 각 브라우저의 `capabilities`에서 `tunnel-identifier` 테스트 구성 옵션을 설정해야 합니다. Travis는 기본적으로 이를 `TRAVIS_JOB_NUMBER` 환경 변수로 설정합니다.

또한 Sauce Labs에서 빌드 번호별로 테스트를 그룹화하려면 `build`를 `TRAVIS_BUILD_NUMBER`로 설정할 수 있습니다.

마지막으로, `name`을 설정하면 이 빌드에서 Sauce Labs의 테스트 이름이 변경됩니다. WDIO 테스트러너와 [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)를 함께 사용하는 경우 WebdriverIO는 테스트에 적절한 이름을 자동으로 설정합니다.

`capabilities` 예시:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### 타임아웃

원격으로 테스트를 실행하므로 일부 타임아웃을 늘려야 할 수도 있습니다.

테스트 구성 옵션으로 `idle-timeout`을 전달하여 [유휴 타임아웃](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout)을 변경할 수 있습니다. 이는 Sauce가 연결을 닫기 전에 명령 사이의 대기 시간을 제어합니다.

## BrowserStack

WebdriverIO에는 [Browserstack](https://www.browserstack.com) 통합도 내장되어 있습니다.

유일한 요구 사항은 구성에서 `user`와 `key`를 Browserstack 자동화 사용자 이름과 액세스 키로 설정하는 것입니다(`wdio.conf.js`에서 내보내거나 `webdriverio.remote(...)`에 전달).

또한 모든 브라우저의 capabilities에 키/값으로 선택적 [지원되는 기능](https://www.browserstack.com/automate/capabilities)을 전달할 수도 있습니다. `browserstack.debug`를 `true`로 설정하면 세션의 스크린캐스트가 녹화되어 도움이 될 수 있습니다.

### 로컬 테스팅

인터넷에 접근할 수 없는 서버(예: `localhost`)에 대해 테스트를 실행하려면 [로컬 테스팅](https://www.browserstack.com/local-testing#command-line)을 사용해야 합니다.

이를 지원하는 것은 WebdriverIO의 범위를 벗어나므로 직접 시작해야 합니다.

로컬을 사용하는 경우 capabilities에서 `browserstack.local`을 `true`로 설정해야 합니다.

WDIO 테스트러너를 사용하는 경우 `wdio.conf.js`에서 [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service)를 다운로드하고 구성하세요. 이는 BrowserStack을 실행하는 데 도움이 되며 테스트를 BrowserStack 서비스에 더 잘 통합하는 추가 기능이 제공됩니다.

### Travis CI와 함께 사용

Travis에서 로컬 테스팅을 추가하려면 직접 시작해야 합니다.

다음 스크립트는 이를 다운로드하고 백그라운드에서 시작합니다. 테스트를 시작하기 전에 Travis에서 이를 실행해야 합니다.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

또한 `build`를 Travis 빌드 번호로 설정할 수도 있습니다.

`capabilities` 예시:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

유일한 요구 사항은 구성에서 `user`와 `key`를 [TestingBot](https://testingbot.com) 사용자 이름과 비밀 키로 설정하는 것입니다(`wdio.conf.js`에서 내보내거나 `webdriverio.remote(...)`에 전달).

또한 모든 브라우저의 capabilities에 키/값으로 선택적 [지원되는 기능](https://testingbot.com/support/other/test-options)을 전달할 수도 있습니다.

### 로컬 테스팅

인터넷에 접근할 수 없는 서버(예: `localhost`)에 대해 테스트를 실행하려면 [로컬 테스팅](https://testingbot.com/support/other/tunnel)을 사용해야 합니다. TestingBot은 인터넷에서 접근할 수 없는 웹사이트를 테스트할 수 있도록 Java 기반 터널을 제공합니다.

터널 지원 페이지에는 이를 설정 및 실행하는 데 필요한 정보가 포함되어 있습니다.

WDIO 테스트러너를 사용하는 경우 `wdio.conf.js`에서 [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service)를 다운로드하고 구성하세요. 이는 TestingBot을 실행하는 데 도움이 되며 테스트를 TestingBot 서비스에 더 잘 통합하는 추가 기능이 제공됩니다.

## LambdaTest

[LambdaTest](https://www.lambdatest.com) 통합도 내장되어 있습니다.

유일한 요구 사항은 구성에서 `user`와 `key`를 LambdaTest 계정 사용자 이름과 액세스 키로 설정하는 것입니다(`wdio.conf.js`에서 내보내거나 `webdriverio.remote(...)`에 전달).

또한 모든 브라우저의 capabilities에 키/값으로 선택적 [지원되는 기능](https://www.lambdatest.com/capabilities-generator/)을 전달할 수도 있습니다. `visual`을 `true`로 설정하면 세션의 스크린캐스트가 녹화되어 도움이 될 수 있습니다.

### 로컬 테스팅을 위한 터널

인터넷에 접근할 수 없는 서버(예: `localhost`)에 대해 테스트를 실행하려면 [로컬 테스팅](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/)을 사용해야 합니다.

이를 지원하는 것은 WebdriverIO의 범위를 벗어나므로 직접 시작해야 합니다.

로컬을 사용하는 경우 capabilities에서 `tunnel`을 `true`로 설정해야 합니다.

WDIO 테스트러너를 사용하는 경우 `wdio.conf.js`에서 [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service)를 다운로드하고 구성하세요. 이는 LambdaTest를 실행하는 데 도움이 되며 테스트를 LambdaTest 서비스에 더 잘 통합하는 추가 기능이 제공됩니다.

### Travis CI와 함께 사용

Travis에서 로컬 테스팅을 추가하려면 직접 시작해야 합니다.

다음 스크립트는 이를 다운로드하고 백그라운드에서 시작합니다. 테스트를 시작하기 전에 Travis에서 이를 실행해야 합니다.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

또한 `build`를 Travis 빌드 번호로 설정할 수도 있습니다.

`capabilities` 예시:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

wdio를 [`Perfecto`](https://www.perfecto.io)와 함께 사용할 때, 각 사용자에 대한 보안 토큰을 생성하고 이를 capabilities 구조에 추가해야 합니다(다른 capabilities 외에도):

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

또한 다음과 같이 클라우드 구성을 추가해야 합니다:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```