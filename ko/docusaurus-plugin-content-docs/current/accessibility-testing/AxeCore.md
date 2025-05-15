---
id: axe-core
title: Axe Core
---

WebdriverIO 테스트 스위트 내에서 [Deque의 Axe라고 불리는](https://www.deque.com/axe/) 오픈 소스 접근성 도구를 사용하여 접근성 테스트를 포함할 수 있습니다. 설정은 매우 간단하며, WebdriverIO Axe 어댑터를 다음과 같이 설치하기만 하면 됩니다:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe 어댑터는 [browser 객체](/docs/api/browser)로 간단히 가져오고 초기화하여 [스탠드얼론 또는 테스트러너](/docs/setuptypes) 모드에서 사용할 수 있습니다. 예:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

Axe WebdriverIO 어댑터에 대한 자세한 문서는 [GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage)에서 찾을 수 있습니다.