---
id: customreporter
title: 커스텀 리포터
---

WDIO 테스트 러너를 위한 맞춤형 커스텀 리포터를 작성할 수 있습니다. 그리고 이는 쉽습니다!

필요한 것은 `@wdio/reporter` 패키지를 상속받는 노드 모듈을 만들어 테스트로부터 메시지를 받을 수 있도록 하는 것입니다.

기본 설정은 다음과 같아야 합니다:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

이 리포터를 사용하려면 설정의 `reporter` 속성에 할당하기만 하면 됩니다.


`wdio.conf.js` 파일은 다음과 같아야 합니다:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

리포터를 NPM에 게시하여 모든 사람이 사용할 수 있도록 할 수도 있습니다. 패키지 이름은 다른 리포터와 같이 `wdio-<reportername>-reporter`로 지정하고, `wdio` 또는 `wdio-reporter`와 같은 키워드로 태그하세요.

## 이벤트 핸들러

테스트 중에 트리거되는 여러 이벤트에 대한 이벤트 핸들러를 등록할 수 있습니다. 다음의 모든 핸들러는 현재 상태와 진행 상황에 대한 유용한 정보가 포함된 페이로드를 받게 됩니다.

이러한 페이로드 객체의 구조는 이벤트에 따라 다르며, 프레임워크(Mocha, Jasmine, Cucumber) 전체에서 통일되어 있습니다. 커스텀 리포터를 구현하면 모든 프레임워크에서 작동해야 합니다.

다음 목록에는 리포터 클래스에 추가할 수 있는 모든 가능한 메서드가 포함되어 있습니다:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

메서드 이름은 꽤 자명합니다.

특정 이벤트에서 무언가를 출력하려면 부모 `WDIOReporter` 클래스에서 제공하는 `this.write(...)` 메서드를 사용하세요. 이 메서드는 내용을 `stdout`으로 스트리밍하거나 로그 파일로 스트리밍합니다(리포터의 옵션에 따라 다름).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

테스트 실행을 어떤 방식으로도 지연시킬 수 없습니다.

모든 이벤트 핸들러는 동기 루틴을 실행해야 합니다(그렇지 않으면, 경쟁 조건이 발생할 수 있습니다).

각 이벤트의 이벤트 이름을 출력하는 예제 커스텀 리포터를 찾을 수 있는 [예제 섹션](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio)을 확인하세요.

커뮤니티에 유용할 수 있는 커스텀 리포터를 구현했다면, Pull Request를 통해 공개적으로 이용 가능하게 만들어 주세요!

또한, `Launcher` 인터페이스를 통해 WDIO 테스트 러너를 실행하는 경우, 다음과 같이 함수로 커스텀 리포터를 적용할 수 없습니다:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## `isSynchronised`까지 대기

리포터가 데이터를 보고하기 위해 비동기 작업을 실행해야 하는 경우(예: 로그 파일 또는 기타 자산 업로드), 커스텀 리포터에서 `isSynchronised` 메서드를 오버라이드하여 모든 것을 계산할 때까지 WebdriverIO 러너가 대기하도록 할 수 있습니다. 이에 대한 예제는 [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts)에서 볼 수 있습니다:

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

이렇게 하면 러너는 모든 로그 정보가 업로드될 때까지 기다립니다.

## NPM에 리포터 게시하기

WebdriverIO 커뮤니티가 리포터를 쉽게 사용하고 찾을 수 있도록 다음 권장 사항을 따르세요:

* 서비스는 다음 명명 규칙을 사용해야 합니다: `wdio-*-reporter`
* NPM 키워드 사용: `wdio-plugin`, `wdio-reporter`
* `main` 항목은 리포터의 인스턴스를 `export`해야 합니다
* 예제 리포터: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

권장 명명 패턴을 따르면 이름으로 서비스를 추가할 수 있습니다:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### WDIO CLI 및 Docs에 게시된 서비스 추가하기

다른 사람들이 더 나은 테스트를 실행하는 데 도움이 될 수 있는 모든 새로운 플러그인을 정말 감사히 생각합니다! 그런 플러그인을 만들었다면, 찾기 쉽도록 CLI와 문서에 추가하는 것을 고려해 주세요.

다음 변경 사항이 포함된 pull request를 제출해 주세요:

- CLI 모듈의 [지원되는 리포터 목록](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91))에 서비스를 추가하세요
- 공식 Webdriver.io 페이지에 문서를 추가하기 위해 [리포터 목록](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json)을 향상시키세요