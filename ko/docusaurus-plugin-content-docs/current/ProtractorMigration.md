---
id: protractor-migration
title: Protractor에서 전환
---

이 튜토리얼은 Protractor를 사용하고 있으며 프레임워크를 WebdriverIO로 마이그레이션하려는 사람들을 위한 것입니다. 이는 Angular 팀이 [발표한 바와 같이](https://github.com/angular/protractor/issues/5502) Protractor가 더 이상 지원되지 않을 것이라는 소식 이후에 시작되었습니다. WebdriverIO는 Protractor의 많은 디자인 결정에 영향을 받았기 때문에 마이그레이션하기에 가장 가까운 프레임워크일 것입니다. WebdriverIO 팀은 모든 Protractor 기여자들의 작업을 높이 평가하며, 이 튜토리얼이 WebdriverIO로의 전환을 쉽고 간단하게 만들어주기를 바랍니다.

완전히 자동화된 프로세스를 갖추고 싶지만 현실은 다릅니다. 모든 사람은 다른 설정을 가지고 있으며 Protractor를 다른 방식으로 사용합니다. 각 단계는 단계별 지침이 아닌 안내로 보아야 합니다. 마이그레이션에 문제가 있으면 주저하지 말고 [저희에게 연락하세요](https://github.com/webdriverio/codemod/discussions/new).

## 설정

Protractor와 WebdriverIO API는 실제로 매우 유사하여 대부분의 명령을 [codemod](https://github.com/webdriverio/codemod)를 통해 자동화된 방식으로 다시 작성할 수 있습니다.

codemod를 설치하려면 다음을 실행하세요:

```sh
npm install jscodeshift @wdio/codemod
```

## 전략

많은 마이그레이션 전략이 있습니다. 팀 규모, 테스트 파일 수, 마이그레이션 긴급성에 따라 모든 테스트를 한 번에 또는 파일별로 변환할 수 있습니다. Protractor는 Angular 버전 15(2022년 말)까지 계속 유지 관리될 예정이므로 여전히 충분한 시간이 있습니다. Protractor와 WebdriverIO 테스트를 동시에 실행하고 새 테스트를 WebdriverIO로 작성하기 시작할 수 있습니다. 시간 예산에 따라 중요한 테스트 케이스부터 마이그레이션을 시작하여 심지어 삭제할 수 있는 테스트까지 작업할 수 있습니다.

## 먼저 설정 파일

codemod를 설치한 후 첫 번째 파일 변환을 시작할 수 있습니다. 먼저 [WebdriverIO의 구성 옵션](configuration)을 살펴보세요. 구성 파일은 매우 복잡해질 수 있으므로 필수 부분만 이식하고 특정 옵션이 필요한 해당 테스트가 마이그레이션될 때 나머지를 어떻게 추가할 수 있는지 확인하는 것이 좋습니다.

첫 번째 마이그레이션에서는 구성 파일만 변환하고 다음을 실행합니다:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 구성 파일의 이름은 다를 수 있지만, 원칙은 동일해야 합니다: 먼저 구성 마이그레이션부터 시작하세요.

:::

## WebdriverIO 종속성 설치

다음 단계는 한 프레임워크에서 다른 프레임워크로 마이그레이션함에 따라 구축하기 시작할 최소한의 WebdriverIO 설정을 구성하는 것입니다. 먼저 WebdriverIO CLI를 다음과 같이 설치합니다:

```sh
npm install --save-dev @wdio/cli
```

다음으로 구성 마법사를 실행합니다:

```sh
npx wdio config
```

이것은 몇 가지 질문을 통해 안내합니다. 이 마이그레이션 시나리오에서는:
- 기본 선택을 선택하세요
- 예제 파일을 자동 생성하지 않는 것이 좋습니다
- WebdriverIO 파일에 대해 다른 폴더를 선택하세요
- 그리고 Jasmine보다 Mocha를 선택하세요.

:::info 왜 Mocha인가?
이전에 Protractor를 Jasmine과 함께 사용했을 수 있지만, Mocha는 더 나은 재시도 메커니즘을 제공합니다. 선택은 여러분의 몫입니다!
:::

짧은 질문이 끝나면 마법사는 필요한 모든 패키지를 설치하고 `package.json`에 저장합니다.

## 구성 파일 마이그레이션

변환된 `conf.ts`와 새로운 `wdio.conf.ts`가 있으면 이제 한 구성에서 다른 구성으로 구성을 마이그레이션할 때입니다. 모든 테스트가 실행될 수 있도록 필수적인 코드만 이식해야 합니다. 우리는 훅 함수와 프레임워크 타임아웃을 이식합니다.

이제 `wdio.conf.ts` 파일만 계속 사용할 것이므로 원래 Protractor 구성에 대한 변경이 더 이상 필요하지 않습니다. 두 프레임워크가 나란히 실행될 수 있도록 원래 상태로 되돌릴 수 있으며, 파일을 한 번에 하나씩 이식할 수 있습니다.

## 테스트 파일 마이그레이션

이제 첫 번째 테스트 파일을 이식할 준비가 되었습니다. 간단하게 시작하기 위해, 서드 파티 패키지나 PageObjects와 같은 다른 파일에 대한 종속성이 많지 않은 것부터 시작합시다. 우리 예제에서 마이그레이션할 첫 번째 파일은 `first-test.spec.ts`입니다. 먼저 새 WebdriverIO 구성이 파일을 기대하는 디렉토리를 만든 다음 이동합니다:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

이제 이 파일을 변환해 봅시다:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

끝입니다! 이 파일은 너무 간단해서 추가 변경이 필요 없으며 바로 WebdriverIO를 다음과 같이 실행해 볼 수 있습니다:

```sh
npx wdio run wdio.conf.ts
```

축하합니다 🥳 첫 번째 파일을 마이그레이션했습니다!

## 다음 단계

이 시점부터 테스트별, 페이지 오브젝트별로 계속 변환합니다. 특정 파일에 대해 codemod가 다음과 같은 오류로 실패할 가능성이 있습니다:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

일부 Protractor 명령의 경우 WebdriverIO에서는 대체품이 없습니다. 이 경우 codemod는 리팩토링 방법에 대한 조언을 제공합니다. 이러한 오류 메시지가 너무 자주 발생하면 [이슈를 제기](https://github.com/webdriverio/codemod/issues/new)하고 특정 변환을 추가하도록 요청하세요. codemod가 이미 Protractor API의 대부분을 변환하지만 여전히 개선의 여지가 많이 있습니다.

## 결론

이 튜토리얼이 WebdriverIO로의 마이그레이션 과정을 조금이나마 안내해 드리기를 바랍니다. 커뮤니티는 다양한 조직의 다양한 팀과 함께 테스트하면서 codemod를 계속 개선하고 있습니다. 피드백이 있으시면 [이슈를 제기](https://github.com/webdriverio/codemod/issues/new)하거나 마이그레이션 과정 중 문제가 있으시면 [토론을 시작](https://github.com/webdriverio/codemod/discussions/new)하는 것을 주저하지 마세요.