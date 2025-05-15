---
id: snapshot
title: 스냅샷
---

스냅샷 테스트는 컴포넌트나 로직의 다양한 측면을 동시에 검증할 때 매우 유용할 수 있습니다. WebdriverIO에서는 임의의 객체뿐만 아니라 WebElement DOM 구조나 WebdriverIO 명령 결과의 스냅샷을 만들 수 있습니다.

다른 테스트 프레임워크와 유사하게 WebdriverIO는 주어진 값의 스냅샷을 찍은 다음, 테스트와 함께 저장된 참조 스냅샷 파일과 비교합니다. 두 스냅샷이 일치하지 않으면 테스트가 실패합니다: 변경이 예상치 못한 것이거나, 참조 스냅샷을 결과의 새 버전으로 업데이트해야 합니다.

:::info 크로스 플랫폼 지원

이러한 스냅샷 기능은 Node.js 환경에서 엔드-투-엔드 테스트를 실행하는 것뿐만 아니라 브라우저나 모바일 장치에서 [유닛 및 컴포넌트](/docs/component-testing) 테스트를 실행하는 데 사용할 수 있습니다.

:::

## 스냅샷 사용하기
값의 스냅샷을 만들려면 [`expect()`](/docs/api/expect-webdriverio) API의 `toMatchSnapshot()`을 사용할 수 있습니다:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

이 테스트가 처음 실행되면 WebdriverIO는 다음과 같은 스냅샷 파일을 생성합니다:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

스냅샷 아티팩트는 코드 변경과 함께 커밋되어야 하며, 코드 리뷰 프로세스의 일부로 검토되어야 합니다. 이후 테스트 실행 시 WebdriverIO는 렌더링된 출력을 이전 스냅샷과 비교합니다. 일치하면 테스트가 통과합니다. 일치하지 않으면 테스트 러너가 수정해야 할 코드의 버그를 발견했거나, 구현이 변경되어 스냅샷을 업데이트해야 합니다.

스냅샷을 업데이트하려면 `wdio` 명령에 `-s` 플래그(또는 `--updateSnapshot`)를 전달하세요. 예:

```sh
npx wdio run wdio.conf.js -s
```

__참고:__ 여러 브라우저에서 병렬로 테스트를 실행하더라도 하나의 스냅샷만 생성되고 비교됩니다. 기능별로 별도의 스냅샷을 갖고 싶다면, [이슈를 제기](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E)하고 사용 사례를 알려주세요.

## 인라인 스냅샷

마찬가지로, `toMatchInlineSnapshot()`을 사용하여 테스트 파일 내에 스냅샷을 인라인으로 저장할 수 있습니다.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

스냅샷 파일을 생성하는 대신, Vitest는 테스트 파일을 직접 수정하여 스냅샷을 문자열로 업데이트합니다:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

이를 통해 다른 파일로 이동하지 않고도 예상 출력을 직접 확인할 수 있습니다.

## 시각적 스냅샷

요소의 DOM 스냅샷을 찍는 것은 특히 DOM 구조가 너무 크고 동적 요소 속성을 포함하는 경우 최선의 방법이 아닐 수 있습니다. 이러한 경우에는 요소에 대한 시각적 스냅샷에 의존하는 것이 좋습니다.

시각적 스냅샷을 활성화하려면 설정에 `@wdio/visual-service`를 추가하세요. [문서](/docs/visual-testing#installation)의 시각적 테스트 설정 지침을 따를 수 있습니다.

그런 다음 `toMatchElementSnapshot()`을 통해 시각적 스냅샷을 찍을 수 있습니다. 예:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

그러면 이미지가 기준 디렉토리에 저장됩니다. 자세한 내용은 [시각적 테스팅](/docs/visual-testing)을 확인하세요.