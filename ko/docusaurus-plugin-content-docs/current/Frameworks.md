---
id: frameworks
title: 프레임워크
---

WebdriverIO 러너는 [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), [Cucumber.js](https://cucumber.io/)를 기본적으로 지원합니다. 또한 [Serenity/JS](#using-serenityjs)와 같은 서드파티 오픈소스 프레임워크와도 통합할 수 있습니다.

:::tip WebdriverIO와 테스트 프레임워크 통합하기
WebdriverIO를 테스트 프레임워크와 통합하려면 NPM에서 제공하는 어댑터 패키지가 필요합니다.
어댑터 패키지는 WebdriverIO가 설치된 동일한 위치에 설치되어야 합니다.
따라서 WebdriverIO를 전역적으로 설치한 경우 어댑터 패키지도 전역적으로 설치해야 합니다.
:::

WebdriverIO를 테스트 프레임워크와 통합하면 스펙 파일이나 스텝 정의에서 전역 `browser` 변수를 통해 WebDriver 인스턴스에 접근할 수 있습니다.
WebdriverIO가 Selenium 세션의 인스턴스화와 종료를 담당하므로 사용자가 직접 처리할 필요가 없습니다.

## Mocha 사용하기

먼저 NPM에서 어댑터 패키지를 설치하세요:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

기본적으로 WebdriverIO는 바로 시작할 수 있는 내장 [어썰션 라이브러리](assertion)를 제공합니다:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO는 Mocha의 `BDD`(기본값), `TDD`, `QUnit` [인터페이스](https://mochajs.org/#interfaces)를 지원합니다.

TDD 스타일로 스펙을 작성하고 싶다면, 설정 파일의 `mochaOpts`에서 `ui` 속성을 `tdd`로 설정하세요. 이제 테스트 파일은 다음과 같이 작성됩니다:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

다른 Mocha 관련 설정을 정의하려면 설정 파일의 `mochaOpts` 키를 사용하면 됩니다. 모든 옵션 목록은 [Mocha 프로젝트 웹사이트](https://mochajs.org/api/mocha)에서 확인할 수 있습니다.

__참고:__ WebdriverIO는 Mocha에서 더 이상 사용되지 않는 `done` 콜백 사용을 지원하지 않습니다:

```js
it('should test something', (done) => {
    done() // "done is not a function" 오류 발생
})
```

### Mocha 옵션

다음 옵션들은 `wdio.conf.js`에서 Mocha 환경을 구성하기 위해 적용될 수 있습니다. __참고:__ 모든 옵션이 지원되는 것은 아닙니다. 예를 들어 `parallel` 옵션을 적용하면 WDIO 테스트러너가 자체적으로 병렬 테스트를 실행하는 방식을 갖고 있기 때문에 오류가 발생합니다. 다음과 같이 프레임워크 옵션을 인수로 전달할 수 있습니다:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

이는 다음과 같은 Mocha 옵션을 전달합니다:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

다음과 같은 Mocha 옵션들이 지원됩니다:

#### require
`require` 옵션은 기본 기능을 추가하거나 확장할 때 유용합니다(WebdriverIO 프레임워크 옵션).

타입: `string|string[]`<br />
기본값: `[]`

#### compilers
파일을 컴파일하기 위해 주어진 모듈을 사용합니다. 컴파일러는 requires 전에 포함됩니다(WebdriverIO 프레임워크 옵션).

타입: `string[]`<br />
기본값: `[]`

#### allowUncaught
캐치되지 않은 오류를 전파합니다.

타입: `boolean`<br />
기본값: `false`

#### bail
첫 번째 테스트 실패 후 종료합니다.

타입: `boolean`<br />
기본값: `false`

#### checkLeaks
전역 변수 누수를 확인합니다.

타입: `boolean`<br />
기본값: `false`

#### delay
루트 스위트 실행을 지연합니다.

타입: `boolean`<br />
기본값: `false`

#### fgrep
주어진 문자열로 테스트를 필터링합니다.

타입: `string`<br />
기본값: `null`

#### forbidOnly
`only`로 표시된 테스트가 스위트를 실패시킵니다.

타입: `boolean`<br />
기본값: `false`

#### forbidPending
보류 중인 테스트가 스위트를 실패시킵니다.

타입: `boolean`<br />
기본값: `false`

#### fullTrace
실패 시 전체 스택트레이스를 표시합니다.

타입: `boolean`<br />
기본값: `false`

#### global
전역 스코프에서 예상되는 변수들입니다.

타입: `string[]`<br />
기본값: `[]`

#### grep
주어진 정규식으로 테스트를 필터링합니다.

타입: `RegExp|string`<br />
기본값: `null`

#### invert
테스트 필터 일치를 반전시킵니다.

타입: `boolean`<br />
기본값: `false`

#### retries
실패한 테스트를 재시도하는 횟수입니다.

타입: `number`<br />
기본값: `0`

#### timeout
타임아웃 임계값(밀리초 단위)입니다.

타입: `number`<br />
기본값: `30000`

## Jasmine 사용하기

먼저 NPM에서 어댑터 패키지를 설치하세요:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

설정 파일에서 `jasmineOpts` 속성을 설정하여 Jasmine 환경을 구성할 수 있습니다. 모든 옵션 목록은 [Jasmine 프로젝트 웹사이트](https://jasmine.github.io/api/3.5/Configuration.html)에서 확인할 수 있습니다.

### Jasmine 옵션

`wdio.conf.js`에서 `jasmineOpts` 속성을 사용하여 Jasmine 환경을 구성할 수 있는 다음 옵션들을 적용할 수 있습니다. 이러한 구성 옵션에 대한 자세한 정보는 [Jasmine 문서](https://jasmine.github.io/api/edge/Configuration)를 확인하세요. 다음과 같이 프레임워크 옵션을 인수로 전달할 수 있습니다:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

이는 다음과 같은 Mocha 옵션을 전달합니다:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

다음과 같은 Jasmine 옵션들이 지원됩니다:

#### defaultTimeoutInterval
Jasmine 작업의 기본 타임아웃 간격입니다.

타입: `number`<br />
기본값: `60000`

#### helpers
Jasmine 스펙 전에 포함할 spec_dir에 상대적인 파일 경로(및 글로브) 배열입니다.

타입: `string[]`<br />
기본값: `[]`

#### requires
`requires` 옵션은 기본 기능을 추가하거나 확장할 때 유용합니다.

타입: `string[]`<br />
기본값: `[]`

#### random
스펙 실행 순서를 무작위화할지 여부입니다.

타입: `boolean`<br />
기본값: `true`

#### seed
무작위화의 기반으로 사용할 시드입니다. null이면 실행 시작 시 무작위로 시드가 결정됩니다.

타입: `Function`<br />
기본값: `null`

#### failSpecWithNoExpectations
어떤 기대(expectations)도 실행하지 않은 스펙을 실패로 처리할지 여부입니다. 기본적으로 기대가 없는 스펙은 통과한 것으로 보고됩니다. 이를 true로 설정하면 그러한 스펙을 실패로 보고합니다.

타입: `boolean`<br />
기본값: `false`

#### oneFailurePerSpec
스펙이 하나의 기대 실패만 가지도록 할지 여부입니다.

타입: `boolean`<br />
기본값: `false`

#### specFilter
스펙을 필터링하는 데 사용할 함수입니다.

타입: `Function`<br />
기본값: `(spec) => true`

#### grep
이 문자열이나 정규식과 일치하는 테스트만 실행합니다. (사용자 정의 `specFilter` 함수가 설정되지 않은 경우에만 적용됩니다)

타입: `string|Regexp`<br />
기본값: `null`

#### invertGrep
true이면 일치하는 테스트를 반전시키고 `grep`에 사용된 표현식과 일치하지 않는 테스트만 실행합니다. (사용자 정의 `specFilter` 함수가 설정되지 않은 경우에만 적용됩니다)

타입: `boolean`<br />
기본값: `false`

## Cucumber 사용하기

먼저 NPM에서 어댑터 패키지를 설치하세요:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Cucumber를 사용하려면 [설정 파일](configurationfile)에 `framework: 'cucumber'`를 추가하여 `framework` 속성을 `cucumber`로 설정하세요.

Cucumber 옵션은 설정 파일에서 `cucumberOpts`로 지정할 수 있습니다. 전체 옵션 목록은 [여기](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options)에서 확인할 수 있습니다.

Cucumber를 빠르게 시작하려면 모든 필요한 스텝 정의가 포함된 [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) 프로젝트를 살펴보세요. 이를 통해 바로 피처 파일을 작성할 수 있습니다.

### Cucumber 옵션

`wdio.conf.js`에서 `cucumberOpts` 속성을 사용하여 Cucumber 환경을 구성할 수 있는 다음 옵션들을 적용할 수 있습니다:

:::tip 명령줄을 통한 옵션 조정
`cucumberOpts`와 같은 옵션(예: 테스트 필터링을 위한 사용자 정의 `tags`)은 명령줄을 통해 지정할 수 있습니다. 이는 `cucumberOpts.{optionName}="value"` 형식을 사용하여 수행됩니다.

예를 들어, `@smoke` 태그가 있는 테스트만 실행하려면 다음 명령을 사용할 수 있습니다:

```sh
# "@smoke" 태그가 있는 테스트만 실행하려는 경우
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

이 명령은 `cucumberOpts`의 `tags` 옵션을 `@smoke`로 설정하여 이 태그가 있는 테스트만 실행되도록 합니다.

:::

#### backtrace
오류에 대한 전체 백트레이스를 표시합니다.

타입: `Boolean`<br />
기본값: `true`

#### requireModule
서포트 파일을 요구하기 전에 모듈을 요구합니다.

타입: `string[]`<br />
기본값: `[]`<br />
예시:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // 또는
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
첫 번째 실패 시 실행을 중단합니다.

타입: `boolean`<br />
기본값: `false`

#### name
표현식과 일치하는 이름을 가진 시나리오만 실행합니다(반복 가능).

타입: `RegExp[]`<br />
기본값: `[]`

#### require
기능을 실행하기 전에 스텝 정의가 포함된 파일을 요구합니다. 스텝 정의에 대한 글로브도 지정할 수 있습니다.

타입: `string[]`<br />
기본값: `[]`
예시:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
ESM을 위한 서포트 코드 경로입니다.

타입: `String[]`<br />
기본값: `[]`
예시:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
정의되지 않았거나 보류 중인 스텝이 있는 경우 실패합니다.

타입: `boolean`<br />
기본값: `false`

#### tags
표현식과 일치하는 태그가 있는 기능이나 시나리오만 실행합니다.
자세한 내용은 [Cucumber 문서](https://docs.cucumber.io/cucumber/api/#tag-expressions)를 참조하세요.

타입: `String`<br />
기본값: ``

#### timeout
스텝 정의의 타임아웃(밀리초 단위)입니다.

타입: `Number`<br />
기본값: `30000`

#### retry
실패한 테스트 케이스를 재시도하는 횟수를 지정합니다.

타입: `Number`<br />
기본값: `0`

#### retryTagFilter
표현식과 일치하는 태그가 있는 기능이나 시나리오만 재시도합니다(반복 가능). 이 옵션은 '--retry'가 지정되어야 합니다.

타입: `RegExp`

#### language
피처 파일의 기본 언어입니다.

타입: `String`<br />
기본값: `en`

#### order
정의된/무작위 순서로 테스트를 실행합니다.

타입: `String`<br />
기본값: `defined`

#### format
사용할 포매터의 이름과 출력 파일 경로입니다.
WebdriverIO는 주로 파일에 출력을 쓰는 [포매터](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md)만 지원합니다.

타입: `string[]`<br />

#### formatOptions
포매터에 제공할 옵션입니다.

타입: `object`<br />

#### tagsInTitle
기능이나 시나리오 이름에 Cucumber 태그를 추가합니다.

타입: `Boolean`<br />
기본값: `false`

***이것은 @wdio/cucumber-framework 특정 옵션이며 cucumber-js 자체에서 인식하지 않습니다***<br/>

#### ignoreUndefinedDefinitions
정의되지 않은 정의를 경고로 처리합니다.

타입: `Boolean`<br />
기본값: `false`

***이것은 @wdio/cucumber-framework 특정 옵션이며 cucumber-js 자체에서 인식하지 않습니다***<br/>

#### failAmbiguousDefinitions
모호한 정의를 오류로 처리합니다.

타입: `Boolean`<br />
기본값: `false`

***이것은 @wdio/cucumber-framework 특정 옵션이며 cucumber-js 자체에서 인식하지 않습니다***<br/>

#### tagExpression
표현식과 일치하는 태그가 있는 기능이나 시나리오만 실행합니다.
자세한 내용은 [Cucumber 문서](https://docs.cucumber.io/cucumber/api/#tag-expressions)를 참조하세요.

타입: `String`<br />
기본값: ``

***이 옵션은 향후 사용되지 않을 예정입니다. 대신 [`tags`](#tags) 설정 속성을 사용하세요***

#### profile
사용할 프로파일을 지정합니다.

타입: `string[]`<br />
기본값: `[]`

***`cucumberOpts`가 우선권을 가지므로 프로파일 내에서는 특정 값(worldParameters, name, retryTagFilter)만 지원된다는 점에 유의하세요. 또한 프로파일을 사용할 때는 `cucumberOpts` 내에 언급된 값들이 선언되지 않았는지 확인하세요.***

### Cucumber에서 테스트 건너뛰기

`cucumberOpts`에서 제공되는 일반적인 Cucumber 테스트 필터링 기능을 사용하여 테스트를 건너뛰려는 경우, 이는 구성된 모든 브라우저와 디바이스에 적용됩니다. 필요하지 않은 세션을 시작하지 않고 특정 기능 조합에 대해서만 시나리오를 건너뛸 수 있도록 webdriverio는 cucumber를 위한 다음과 같은 특정 태그 구문을 제공합니다:

`@skip([condition])`

여기서 condition은 **모두** 일치하는 경우 태그된 시나리오나 기능을 건너뛰게 하는 기능 속성과 해당 값의 선택적 조합입니다. 물론 다양한 조건에서 테스트를 건너뛰기 위해 시나리오와 기능에 여러 태그를 추가할 수 있습니다.

`tagExpression`을 변경하지 않고 테스트를 건너뛰기 위해 '@skip' 주석을 사용할 수도 있습니다. 이 경우 건너뛴 테스트는 테스트 보고서에 표시됩니다.

다음은 이 구문의 몇 가지 예입니다:
- `@skip` 또는 `@skip()`: 항상 태그된 항목을 건너뜁니다
- `@skip(browserName="chrome")`: 크롬 브라우저에서 테스트가 실행되지 않습니다.
- `@skip(browserName="firefox";platformName="linux")`: Linux에서 Firefox 실행 시 테스트를 건너뜁니다.
- `@skip(browserName=["chrome","firefox"])`: 태그된 항목은 Chrome과 Firefox 브라우저 모두에서 건너뜁니다.
- `@skip(browserName=/i.*explorer/)`: 정규식과 일치하는 브라우저를 가진 기능은 건너뜁니다(예: `iexplorer`, `internet explorer`, `internet-explorer` 등).

### 스텝 정의 헬퍼 가져오기

`Given`, `When`, `Then`과 같은 스텝 정의 헬퍼나 훅을 사용하려면 `@cucumber/cucumber`에서 가져와야 합니다:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

WebdriverIO와 관련 없는 다른 유형의 테스트에 특정 버전의 Cucumber를 이미 사용하고 있다면, e2e 테스트에서는 WebdriverIO Cucumber 패키지에서 이러한 헬퍼를 가져와야 합니다:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

이렇게 하면 WebdriverIO 프레임워크 내에서 올바른 헬퍼를 사용하고 다른 유형의 테스트에는 독립적인 Cucumber 버전을 사용할 수 있습니다.

### 보고서 게시하기

Cucumber는 `https://reports.cucumber.io/`에 테스트 실행 보고서를 게시하는 기능을 제공하며, 이는 `cucumberOpts`에서 `publish` 플래그를 설정하거나 `CUCUMBER_PUBLISH_TOKEN` 환경 변수를 구성하여 제어할 수 있습니다. 그러나 테스트 실행에 `WebdriverIO`를 사용할 때는 이 접근 방식에 제한이 있습니다. 각 기능 파일마다 별도로 보고서가 업데이트되므로 통합 보고서를 보기 어렵습니다.

이 제한을 극복하기 위해 `@wdio/cucumber-framework` 내에 `publishCucumberReport`라는 프로미스 기반 메서드를 도입했습니다. 이 메서드는 `onComplete` 훅에서 호출해야 하며, 이는 호출하기에 최적의 위치입니다. `publishCucumberReport`는 cucumber 메시지 보고서가 저장된 보고서 디렉토리의 입력이 필요합니다.

`cucumberOpts`의 `format` 옵션을 구성하여 `cucumber message` 보고서를 생성할 수 있습니다. 보고서를 덮어쓰지 않고 각 테스트 실행이 정확하게 기록되도록 하려면 `cucumber message` 포맷 옵션 내에서 동적 파일 이름을 제공하는 것이 좋습니다.

이 함수를 사용하기 전에 다음 환경 변수를 설정해야 합니다:
- CUCUMBER_PUBLISH_REPORT_URL: Cucumber 보고서를 게시할 URL입니다. 제공되지 않으면 기본 URL 'https://messages.cucumber.io/api/reports'가 사용됩니다.
- CUCUMBER_PUBLISH_REPORT_TOKEN: 보고서를 게시하는 데 필요한 인증 토큰입니다. 이 토큰이 설정되지 않으면 함수는 보고서를 게시하지 않고 종료됩니다.

다음은 구현에 필요한 구성 및 코드 샘플의 예입니다:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... 다른 구성 옵션
    cucumberOpts: {
        // ... Cucumber 옵션 구성
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

`./reports/`는 `cucumber message` 보고서가 저장될 디렉토리입니다.

## Serenity/JS 사용하기

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)는 복잡한 소프트웨어 시스템의 인수 및 회귀 테스트를 더 빠르고, 더 협업적이며, 더 쉽게 확장할 수 있도록 설계된 오픈 소스 프레임워크입니다.

WebdriverIO 테스트 스위트의 경우, Serenity/JS는 다음을 제공합니다:
- [향상된 보고](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Serenity/JS를
  기본 제공 WebdriverIO 프레임워크의 대체품으로 사용하여 프로젝트의 심층적인 테스트 실행 보고서와 살아있는 문서를 생성할 수 있습니다.
- [스크린플레이 패턴 API](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - 테스트 코드를 프로젝트와 팀 간에 이식 가능하고 재사용 가능하게 만들기 위해
  Serenity/JS는 기본 WebdriverIO API 위에 선택적 [추상화 계층](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io)을 제공합니다.
- [통합 라이브러리](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - 스크린플레이 패턴을 따르는 테스트 스위트의 경우,
  Serenity/JS는 [API 테스트](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io) 작성,
  [로컬 서버 관리](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [어설션 수행](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) 등을 돕는 선택적 통합 라이브러리도 제공합니다!

![Serenity BDD 보고서 예시](/img/serenity-bdd-reporter.png)

### Serenity/JS 설치하기

[기존 WebdriverIO 프로젝트](https://webdriver.io/docs/gettingstarted)에 Serenity/JS를 추가하려면 NPM에서 다음 Serenity/JS 모듈을 설치하세요:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Serenity/JS 모듈에 대해 자세히 알아보기:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Serenity/JS 구성하기

Serenity/JS와의 통합을 활성화하려면 WebdriverIO를 다음과 같이 구성하세요:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // WebdriverIO에 Serenity/JS 프레임워크를 사용하도록 지시합니다
    framework: '@serenity-js/webdriverio',

    // Serenity/JS 구성
    serenity: {
        // Serenity/JS가 테스트 러너에 맞는 어댑터를 사용하도록 구성합니다
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS 보고 서비스, 일명 "stage crew" 등록
        crew: [
            // 선택 사항, 테스트 실행 결과를 표준 출력에 출력합니다
            '@serenity-js/console-reporter',

            // 선택 사항, Serenity BDD 보고서 및 살아있는 문서(HTML) 생성
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // 선택 사항, 상호 작용 실패 시 자동으로 스크린샷 캡처
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumber 러너 구성
    cucumberOpts: {
        // 아래 Cucumber 구성 옵션 참조
    },


    // ... 또는 Jasmine 러너
    jasmineOpts: {
        // 아래 Jasmine 구성 옵션 참조
    },

    // ... 또는 Mocha 러너
    mochaOpts: {
        // 아래 Mocha 구성 옵션 참조
    },

    runner: 'local',

    // 다른 WebdriverIO 구성
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // WebdriverIO에 Serenity/JS 프레임워크를 사용하도록 지시합니다
    framework: '@serenity-js/webdriverio',

    // Serenity/JS 구성
    serenity: {
        // Serenity/JS가 테스트 러너에 맞는 어댑터를 사용하도록 구성합니다
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS 보고 서비스, 일명 "stage crew" 등록
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumber 러너 구성
    cucumberOpts: {
        // 아래 Cucumber 구성 옵션 참조
    },


    // ... 또는 Jasmine 러너
    jasmineOpts: {
        // 아래 Jasmine 구성 옵션 참조
    },

    // ... 또는 Mocha 러너
    mochaOpts: {
        // 아래 Mocha 구성 옵션 참조
    },

    runner: 'local',

    // 다른 WebdriverIO 구성
};
```

</TabItem>
</Tabs>

자세히 알아보기:
- [Serenity/JS Cucumber 구성 옵션](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine 구성 옵션](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha 구성 옵션](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO 구성 파일](configurationfile)

### Serenity BDD 보고서 및 살아있는 문서 생성하기

[Serenity BDD 보고서 및 살아있는 문서](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports)는 [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) 모듈에 의해 다운로드 및 관리되는 자바 프로그램인 [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli)에 의해 생성됩니다.

Serenity BDD 보고서를 생성하려면 테스트 스위트는 다음을 수행해야 합니다:
- Serenity BDD CLI를 다운로드합니다. `serenity-bdd update` 명령을 호출하면 CLI `jar`를 로컬에 캐시합니다
- 중간 Serenity BDD `.json` 보고서를 생성합니다. [구성 지침](#configuring-serenityjs)에 따라 [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)를 등록합니다
- 보고서를 생성하고 싶을 때 Serenity BDD CLI를 호출합니다. `serenity-bdd run` 명령을 호출합니다

모든 [Serenity/JS 프로젝트 템플릿](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio)에서 사용되는 패턴은 다음을 사용합니다:
- Serenity BDD CLI를 다운로드하기 위한 [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPM 스크립트
- 테스트 스위트 자체가 실패한 경우에도 보고 프로세스를 실행하기 위한 [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) (테스트 보고서가 가장 필요한 시점이 바로 이 때입니다...)
- 이전 실행에서 남은 테스트 보고서를 제거하는 편리한 방법으로 [`rimraf`](https://www.npmjs.com/package/rimraf)

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

`SerenityBDDReporter`에 대해 자세히 알아보려면 다음을 참조하세요:
- [`@serenity-js/serenity-bdd` 문서](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)의 설치 지침
- [`SerenityBDDReporter` API 문서](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)의 구성 예시
- [GitHub의 Serenity/JS 예제](https://github.com/serenity-js/serenity-js/tree/main/examples)

### Serenity/JS 스크린플레이 패턴 API 사용하기

[스크린플레이 패턴](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)은 고품질 자동화된 인수 테스트를 작성하기 위한 혁신적이고 사용자 중심적인 접근 방식입니다. 이는 추상화 계층을 효과적으로 사용하도록 안내하고, 테스트 시나리오가 도메인의 비즈니스 용어를 캡처하도록 돕고, 팀에서 좋은 테스트 및 소프트웨어 엔지니어링 습관을 장려합니다.

기본적으로 WebdriverIO `framework`로 `@serenity-js/webdriverio`를 등록하면,
Serenity/JS는 모든 배우가 다음을 할 수 있는 기본 [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io)의 [actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io)를 구성합니다:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

이는 기존 테스트 스위트에도 스크린플레이 패턴을 따르는 테스트 시나리오를 도입하는 데 도움이 될 것입니다. 예를 들면:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

스크린플레이 패턴에 대해 자세히 알아보려면 다음을 확인하세요:
- [스크린플레이 패턴](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS를 사용한 웹 테스팅](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)