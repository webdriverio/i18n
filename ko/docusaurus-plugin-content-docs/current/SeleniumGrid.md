---
id: seleniumgrid
title: 셀레늄 그리드
---

WebdriverIO를 기존 Selenium Grid 인스턴스와 함께 사용할 수 있습니다. 테스트를 Selenium Grid에 연결하려면 테스트 러너 구성의 옵션을 업데이트하기만 하면 됩니다.

다음은 샘플 wdio.conf.ts의 코드 스니펫입니다.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Selenium Grid 설정에 따라 프로토콜, 호스트 이름, 포트 및 경로에 적절한 값을 제공해야 합니다.
테스트 스크립트와 동일한 머신에서 Selenium Grid를 실행하는 경우 다음과 같은 일반적인 옵션이 있습니다:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### 보호된 Selenium Grid와 기본 인증

Selenium Grid를 보호하는 것이 매우 권장됩니다. 인증이 필요한 보호된 Selenium Grid가 있는 경우 옵션을 통해 인증 헤더를 전달할 수 있습니다.
자세한 내용은 문서의 [headers](https://webdriver.io/docs/configuration/#headers) 섹션을 참조하세요.

### 동적 Selenium Grid의 타임아웃 구성

브라우저 팟이 필요에 따라 시작되는 동적 Selenium Grid를 사용하는 경우, 세션 생성이 콜드 스타트에 직면할 수 있습니다. 이러한 경우 세션 생성 타임아웃을 늘리는 것이 좋습니다. 옵션의 기본값은 120초이지만 그리드가 새 세션을 만드는 데 더 많은 시간이 걸리는 경우 증가시킬 수 있습니다.

```ts
connectionRetryTimeout: 180000,
```

### 고급 구성

고급 구성에 대해서는 Testrunner [구성 파일](https://webdriver.io/docs/configurationfile)을 참조하세요.

### Selenium Grid에서의 파일 작업

원격 Selenium Grid로 테스트 케이스를 실행할 때, 브라우저는 원격 머신에서 실행되므로 파일 업로드 및 다운로드와 관련된 테스트 케이스에 특별한 주의가 필요합니다.

### 파일 다운로드

Chromium 기반 브라우저의 경우 [파일 다운로드](https://webdriver.io/docs/api/browser/downloadFile) 문서를 참조할 수 있습니다. 테스트 스크립트가 다운로드된 파일의 내용을 읽어야 하는 경우, 원격 Selenium 노드에서 테스트 러너 머신으로 파일을 다운로드해야 합니다. 다음은 Chrome 브라우저를 위한 샘플 `wdio.conf.ts` 구성의 예시 코드 스니펫입니다:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### 원격 Selenium Grid에서 파일 업로드

원격 브라우저의 웹 앱에 파일을 업로드하려면 먼저 파일을 원격 그리드에 업로드해야 합니다. 자세한 내용은 [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) 문서를 참조하세요.

### 기타 파일/그리드 작업

Selenium Grid로 수행할 수 있는 몇 가지 더 많은 작업이 있습니다. Selenium Standalone에 대한 지침은 Selenium Grid에서도 잘 작동해야 합니다. 사용 가능한 옵션은 [Selenium Standalone](https://webdriver.io/docs/api/selenium/) 문서를 참조하세요.

### Selenium Grid 공식 문서

Selenium Grid에 대한 자세한 정보는 공식 Selenium Grid [문서](https://www.selenium.dev/documentation/grid/)를 참조할 수 있습니다.

Docker, Docker Compose 또는 Kubernetes에서 Selenium Grid를 실행하려면 Selenium-Docker [GitHub 저장소](https://github.com/SeleniumHQ/docker-selenium)를 참조하세요.