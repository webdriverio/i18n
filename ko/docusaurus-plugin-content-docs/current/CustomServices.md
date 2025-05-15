---
id: customservices
title: 사용자 정의 서비스
---

WDIO 테스트 러너에서 자신의 필요에 맞는 사용자 정의 서비스를 작성할 수 있습니다.

서비스는 테스트를 단순화하고, 테스트 스위트를 관리하며, 결과를 통합하기 위해 생성된 재사용 가능한 로직의 애드온입니다. 서비스는 `wdio.conf.js`에서 사용 가능한 모든 [훅](/docs/configurationfile)에 접근할 수 있습니다.

두 가지 유형의 서비스를 정의할 수 있습니다: 테스트 실행 당 한 번만 실행되는 `onPrepare`, `onWorkerStart`, `onWorkerEnd`, `onComplete` 훅에만 접근할 수 있는 런처 서비스와 다른 모든 훅에 접근할 수 있으며 각 워커마다 실행되는 워커 서비스입니다. 워커 서비스는 다른 (워커) 프로세스에서 실행되기 때문에 두 유형의 서비스 간에 (전역) 변수를 공유할 수 없습니다.

런처 서비스는 다음과 같이 정의할 수 있습니다:

```js
export default class CustomLauncherService {
    // 훅이 프로미스를 반환하면 WebdriverIO는 해당 프로미스가 해결될 때까지 기다립니다.
    async onPrepare(config, capabilities) {
        // TODO: 모든 워커가 시작되기 전에 수행할 작업
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: 워커가 종료된 후 수행할 작업
    }

    // 사용자 정의 서비스 메서드 ...
}
```

반면 워커 서비스는 다음과 같이 구성되어야 합니다:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions`는 서비스에 특정한 모든 옵션을 포함합니다
     * 예를 들어 다음과 같이 정의된 경우:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * `serviceOptions` 매개변수는 `{ foo: 'bar' }`가 됩니다
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * 브라우저 객체가 처음으로 여기에 전달됩니다
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: 모든 테스트가 실행되기 전에 수행할 작업, 예:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: 모든 테스트가 실행된 후 수행할 작업
    }

    beforeTest(test, context) {
        // TODO: 각 Mocha/Jasmine 테스트 실행 전에 수행할 작업
    }

    beforeScenario(test, context) {
        // TODO: 각 Cucumber 시나리오 실행 전에 수행할 작업
    }

    // 다른 훅이나 사용자 정의 서비스 메서드 ...
}
```

생성자에서 전달된 매개변수를 통해 브라우저 객체를 저장하는 것이 좋습니다. 마지막으로 두 유형의 워커를 다음과 같이 노출합니다:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

TypeScript를 사용하고 훅 메서드 매개변수가 타입 세이프한지 확인하려면 다음과 같이 서비스 클래스를 정의할 수 있습니다:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## 서비스 오류 처리

서비스 훅 중에 발생한 오류는 로그로 기록되지만 러너는 계속 실행됩니다. 서비스의 훅이 테스트 러너의 설정이나 해제에 중요한 경우, `webdriverio` 패키지에서 노출된 `SevereServiceError`를 사용하여 러너를 중지할 수 있습니다.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: 모든 워커가 시작되기 전에 설정에 중요한 작업

        throw new SevereServiceError('Something went wrong.')
    }

    // 사용자 정의 서비스 메서드 ...
}
```

## 모듈에서 서비스 가져오기

이 서비스를 사용하기 위해 지금 해야 할 일은 `services` 속성에 할당하는 것뿐입니다.

`wdio.conf.js` 파일을 다음과 같이 수정하세요:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * 가져온 서비스 클래스 사용
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * 서비스에 대한 절대 경로 사용
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## NPM에 서비스 게시하기

WebdriverIO 커뮤니티가 서비스를 더 쉽게 사용하고 발견할 수 있도록 다음 권장 사항을 따르세요:

* 서비스는 이 명명 규칙을 사용해야 합니다: `wdio-*-service`
* NPM 키워드 사용: `wdio-plugin`, `wdio-service`
* `main` 항목은 서비스의 인스턴스를 `export`해야 합니다
* 예시 서비스: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

권장 명명 패턴을 따르면 서비스를 이름으로 추가할 수 있습니다:

```js
// wdio-custom-service 추가
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### 게시된 서비스를 WDIO CLI 및 문서에 추가하기

다른 사람들이 더 나은 테스트를 실행하는 데 도움이 될 수 있는 새로운 플러그인이 있다면 정말 감사합니다! 그런 플러그인을 만들었다면, 더 쉽게 찾을 수 있도록 CLI와 문서에 추가하는 것을 고려해 보세요.

다음 변경 사항이 포함된 풀 리퀘스트를 제출해 주세요:

- CLI 모듈의 [지원되는 서비스 목록](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)에 서비스 추가
- 공식 Webdriver.io 페이지에 문서를 추가하기 위한 [서비스 목록](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) 확장