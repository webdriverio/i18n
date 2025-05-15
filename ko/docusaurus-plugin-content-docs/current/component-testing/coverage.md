---
id: coverage
title: 커버리지
---

WebdriverIO의 브라우저 러너는 [`istanbul`](https://istanbul.js.org/)을 사용한 코드 커버리지 보고를 지원합니다. 테스트러너는 자동으로 코드를 계측하고 코드 커버리지를 캡처합니다.

## 설정

코드 커버리지 보고를 활성화하려면 WebdriverIO 브라우저 러너 구성을 통해 활성화하세요. 예를 들면:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

모든 [커버리지 옵션](/docs/runner#coverage-options)을 확인하여 올바르게 구성하는 방법을 알아보세요.

## 코드 무시하기

코드베이스의 일부 섹션을 커버리지 추적에서 의도적으로 제외하고 싶을 수 있습니다. 그렇게 하려면 다음과 같은 파싱 힌트를 사용할 수 있습니다:

- `/* istanbul ignore if */`: 다음 if 문을 무시합니다.
- `/* istanbul ignore else */`: if 문의 else 부분을 무시합니다.
- `/* istanbul ignore next */`: 소스 코드의 다음 항목을 무시합니다 (함수, if 문, 클래스 등).
- `/* istanbul ignore file */`: 전체 소스 파일을 무시합니다 (파일 상단에 배치해야 함).

:::info

테스트 파일은 커버리지 보고에서 제외하는 것이 좋습니다. 이는 `execute` 또는 `executeAsync` 명령을 호출할 때 오류가 발생할 수 있기 때문입니다. 보고서에 테스트 파일을 포함하고 싶다면, 다음과 같이 계측에서 제외하세요:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::