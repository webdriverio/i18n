---
id: browser-logs
title: 브라우저 로그
---

테스트를 실행할 때 브라우저는 관심이 있거나 확인하고 싶은 중요한 정보를 로그로 남길 수 있습니다.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

WebDriver Bidi를 사용할 때(WebdriverIO가 브라우저를 자동화하는 기본 방식), 브라우저에서 오는 이벤트를 구독할 수 있습니다. 로그 이벤트의 경우 `log.entryAdded'`를 수신해야 합니다. 예:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

테스트에서는 로그 이벤트를 배열에 추가하고 작업이 완료되면 배열을 검증할 수 있습니다. 예:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // add log message to the array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // trigger the browser send a message to the console
        ...

        // assert if log was captured
        expect(logs).toContain('Hello Bidi')
    })

    // clean up listener afterwards
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

WebDriver Classic을 사용하거나 `'wdio:enforceWebDriverClassic': true` 기능을 통해 Bidi 사용을 비활성화한 경우, `getLogs` JSONWire 명령을 사용하여 최신 로그를 가져올 수 있습니다. WebdriverIO는 이러한 더 이상 사용되지 않는 명령을 제거했으므로 [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service)를 사용하여 브라우저 인스턴스에 명령을 다시 추가해야 합니다.

서비스를 추가하거나 초기화한 후 다음을 통해 로그를 가져올 수 있습니다:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

참고: `getLogs` 명령은 브라우저에서 가장 최근 로그만 가져올 수 있습니다. 로그 메시지가 너무 오래되면 결국 정리될 수 있습니다.
</TabItem>

</Tabs>

이 방법을 사용하여 오류 메시지를 검색하고 애플리케이션에 오류가 발생했는지 확인할 수 있습니다.