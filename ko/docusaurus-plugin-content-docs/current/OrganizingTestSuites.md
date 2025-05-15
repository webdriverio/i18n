---
id: organizingsuites
title: 테스트 스위트 구성하기
---

프로젝트가 성장함에 따라, 통합 테스트의 수는 필연적으로 증가합니다. 이로 인해 빌드 시간이 늘어나고 생산성이 저하됩니다.

이를 방지하기 위해, 테스트를 병렬로 실행해야 합니다. WebdriverIO는 이미 각 스펙(또는 Cucumber의 _기능 파일_)을 단일 세션 내에서 병렬로 테스트합니다. 일반적으로 하나의 스펙 파일에서는 하나의 기능만 테스트하세요. 한 파일에 너무 많거나 너무 적은 테스트를 포함하지 않도록 하세요. (하지만 이에 대한 황금률은 없습니다.)

여러 스펙 파일이 있으면 테스트를 동시에 실행하기 시작해야 합니다. 이를 위해 구성 파일의 `maxInstances` 속성을 조정하세요. WebdriverIO를 사용하면 최대 동시성으로 테스트를 실행할 수 있습니다. 즉, 파일과 테스트가 얼마나 많든 모두 병렬로 실행할 수 있습니다. (물론 컴퓨터의 CPU, 동시성 제한 등과 같은 특정 제한에 따라 다릅니다.)

> 예를 들어 3개의 다른 기능(Chrome, Firefox 및 Safari)이 있고 `maxInstances`를 `1`로 설정했다고 가정해 보겠습니다. WDIO 테스트 러너는 3개의 프로세스를 생성합니다. 따라서 10개의 스펙 파일이 있고 `maxInstances`를 `10`으로 설정한 경우, _모든_ 스펙 파일이 동시에 테스트되며 30개의 프로세스가 생성됩니다.

모든 브라우저에 대해 속성을 설정하기 위해 `maxInstances` 속성을 전역적으로 정의할 수 있습니다.

자체 WebDriver 그리드를 실행하는 경우, 예를 들어 한 브라우저에 대해 다른 브라우저보다 더 많은 용량을 가질 수 있습니다. 이 경우 기능 객체에서 `maxInstances`를 _제한_ 할 수 있습니다:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## 메인 구성 파일에서 상속

여러 환경(예: 개발 및 통합)에서 테스트 스위트를 실행하는 경우 여러 구성 파일을 사용하면 관리하기 쉬울 수 있습니다.

[페이지 객체 개념](pageobjects)과 유사하게 먼저 메인 구성 파일이 필요합니다. 이 파일에는 환경 간에 공유하는 모든 구성이 포함됩니다.

그런 다음 각 환경에 대한 다른 구성 파일을 만들고 메인 구성을 환경별 구성으로 보완하세요:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## 스위트에서 테스트 스펙 그룹화하기

테스트 스펙을 스위트로 그룹화하고 모든 테스트 대신 특정 스위트만 실행할 수 있습니다.

먼저 WDIO 구성에서 스위트를 정의하세요:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

이제 단일 스위트만 실행하려면 CLI 인수로 스위트 이름을 전달할 수 있습니다:

```sh
wdio wdio.conf.js --suite login
```

또는 한 번에 여러 스위트를 실행할 수 있습니다:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## 순차적으로 실행할 테스트 스펙 그룹화하기

위에서 설명한 대로 테스트를 동시에 실행하면 이점이 있습니다. 그러나 테스트를 그룹화하여 단일 인스턴스에서 순차적으로 실행하는 것이 유리한 경우도 있습니다. 이에 대한 예로는 코드 변환이나 클라우드 인스턴스 프로비저닝과 같이 설정 비용이 큰 경우가 있지만, 이 기능을 활용하는 고급 사용 모델도 있습니다.

단일 인스턴스에서 실행할 테스트를 그룹화하려면 specs 정의 내에서 배열로 정의하세요.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
위의 예에서 'test_login.js', 'test_product_order.js' 및 'test_checkout.js' 테스트는 단일 인스턴스에서 순차적으로 실행되며 각 "test_b*" 테스트는 개별 인스턴스에서 동시에 실행됩니다.

스위트에 정의된 스펙을 그룹화하는 것도 가능합니다. 이제 다음과 같이 스위트를 정의할 수도 있습니다:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
이 경우 "end2end" 스위트의 모든 테스트가 단일 인스턴스에서 실행됩니다.

패턴을 사용하여 순차적으로 테스트를 실행할 때는 스펙 파일을 알파벳순으로 실행합니다.

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

이렇게 하면 위의 패턴과 일치하는 파일이 다음 순서로 실행됩니다:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## 선택한 테스트 실행하기

경우에 따라 스위트의 단일 테스트(또는 테스트 하위 집합)만 실행하고 싶을 수 있습니다.

`--spec` 매개 변수를 사용하여 실행할 _스위트_(Mocha, Jasmine) 또는 _기능_(Cucumber)을 지정할 수 있습니다. 경로는 현재 작업 디렉토리에서 상대적으로 해석됩니다.

예를 들어 로그인 테스트만 실행하려면:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

또는 한 번에 여러 스펙을 실행할 수 있습니다:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

`--spec` 값이 특정 스펙 파일을 가리키지 않으면 구성에 정의된 스펙 파일 이름을 필터링하는 데 사용됩니다.

스펙 파일 이름에 "dialog"라는 단어가 포함된 모든 스펙을 실행하려면 다음을 사용할 수 있습니다:

```sh
wdio wdio.conf.js --spec dialog
```

각 테스트 파일은 단일 테스트 러너 프로세스에서 실행된다는 점에 유의하세요. 파일을 미리 스캔하지 않기 때문에 (`wdio`에 파일 이름을 파이핑하는 방법에 대한 다음 섹션 참조), 스펙 파일 맨 위에 `describe.only`를 사용하여 Mocha에게 해당 스위트만 실행하도록 지시할 수는 _없습니다_.

이 기능은 동일한 목표를 달성하는 데 도움이 됩니다.

`--spec` 옵션이 제공되면 구성 또는
 기능 레벨의 `specs` 매개 변수에 의해 정의된 모든 패턴을 재정의합니다.

## 선택한 테스트 제외하기

필요한 경우, 특정 스펙 파일을 실행에서 제외해야 할 때 `--exclude` 매개 변수를 사용할 수 있습니다 (Mocha, Jasmine) 또는 기능 (Cucumber).

예를 들어, 로그인 테스트를 테스트 실행에서 제외하려면:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

또는 여러 스펙 파일을 제외할 수 있습니다:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

또는 스위트를 사용한 필터링 시 스펙 파일을 제외할 수 있습니다:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

`--exclude` 값이 특정 스펙 파일을 가리키지 않으면 구성에 정의된 스펙 파일 이름을 필터링하는 데 사용됩니다.

스펙 파일 이름에 "dialog"라는 단어가 포함된 모든 스펙을 제외하려면 다음을 사용할 수 있습니다:

```sh
wdio wdio.conf.js --exclude dialog
```

`--exclude` 옵션이 제공되면 구성 또는 기능 레벨의 `exclude` 매개 변수에 의해 정의된 모든 패턴을 재정의합니다.

## 스위트 및 테스트 스펙 실행하기

전체 스위트와 개별 스펙을 함께 실행합니다.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## 여러 특정 테스트 스펙 실행하기

지속적 통합 및 기타 상황에서 실행할 여러 스펙 세트를 지정해야 하는 경우가 있습니다. WebdriverIO의 `wdio` 명령줄 유틸리티는 파이프로 전달된 파일 이름(`find`, `grep` 또는 다른 것에서)을 허용합니다.

파이프로 전달된 파일 이름은 구성의 `spec` 목록에 지정된 glob 또는 파일 이름 목록을 재정의합니다.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**참고:** 이는 단일 스펙을 실행하기 위한 `--spec` 플래그를 재정의하지 _않습니다_._

## MochaOpts로 특정 테스트 실행하기

wdio CLI에 mocha 특정 인수인 `--mochaOpts.grep`을 전달하여 실행하려는 특정 `suite|describe` 및/또는 `it|test`를 필터링할 수도 있습니다.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**참고:** Mocha는 WDIO 테스트 러너가 인스턴스를 생성한 후 테스트를 필터링하므로 여러 인스턴스가 생성되는 것을 볼 수 있지만 실제로는 실행되지 않을 수 있습니다._

## MochaOpts로 특정 테스트 제외하기

wdio CLI에 mocha 특정 인수인 `--mochaOpts.invert`를 전달하여 제외하려는 특정 `suite|describe` 및/또는 `it|test`를 필터링할 수도 있습니다. `--mochaOpts.invert`는 `--mochaOpts.grep`의 반대 기능을 수행합니다.

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**참고:** Mocha는 WDIO 테스트 러너가 인스턴스를 생성한 후 테스트를 필터링하므로 여러 인스턴스가 생성되는 것을 볼 수 있지만 실제로는 실행되지 않을 수 있습니다._

## 실패 후 테스트 중지하기

`bail` 옵션을 사용하면 WebdriverIO에게 테스트가 실패한 후 테스트를 중지하도록 지시할 수 있습니다.

이는 빌드가 중단될 것이라는 것을 이미 알고 있지만 전체 테스트 실행의 긴 대기 시간을 피하고 싶을 때 큰 테스트 스위트에서 유용합니다.

`bail` 옵션은 WebDriver가 전체 테스트 실행을 중지하기 전에 발생할 수 있는 테스트 실패 횟수를 지정하는 숫자를 기대합니다. 기본값은 `0`으로, 항상 찾을 수 있는 모든 테스트 스펙을 실행한다는 의미입니다.

bail 구성에 대한 추가 정보는 [옵션 페이지](configuration)를 참조하세요.
## 실행 옵션 계층

실행할 스펙을 선언할 때 어떤 패턴이 우선순위를 가질지 정의하는 특정 계층이 있습니다. 현재 가장 높은 우선순위에서 가장 낮은 우선순위 순으로 다음과 같이 작동합니다:

> CLI `--spec` 인수 > 기능 `specs` 패턴 > 구성 `specs` 패턴
> CLI `--exclude` 인수 > 구성 `exclude` 패턴 > 기능 `exclude` 패턴

구성 매개 변수만 제공된 경우, 모든 기능에 사용됩니다. 그러나 기능 레벨에서 패턴을 정의하면 구성 패턴 대신 사용됩니다. 마지막으로 명령줄에서 정의된 스펙 패턴은 다른 모든 패턴을 재정의합니다.

### 기능 정의 스펙 패턴 사용하기

기능 레벨에서 스펙 패턴을 정의하면 구성 레벨에서 정의된 모든 패턴을 재정의합니다. 이는 차별화된 장치 기능에 따라 테스트를 분리해야 할 때 유용합니다. 이러한 경우에는 구성 레벨에서 일반적인 스펙 패턴을 사용하고 기능 레벨에서 더 구체적인 패턴을 사용하는 것이 더 유용합니다.

예를 들어 Android 테스트용과 iOS 테스트용 두 개의 디렉토리가 있다고 가정해 보겠습니다.

구성 파일은 비특정 장치 테스트에 대해 다음과 같이 패턴을 정의할 수 있습니다:

```js
{
    specs: ['tests/general/**/*.js']
}
```

하지만 Android 및 iOS 장치에 대해 다른 기능이 있으며, 패턴은 다음과 같이 보일 수 있습니다:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

구성 파일에 이러한 기능을 모두 요구하는 경우, Android 장치는 "android" 네임스페이스 아래의 테스트만 실행하고 iOS 테스트는 "ios" 네임스페이스 아래의 테스트만 실행합니다!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```