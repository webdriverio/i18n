---
id: browser-logs
title: பிரௌசர் பதிவுகள்
---

சோதனைகளை இயக்கும்போது பிரௌசர் முக்கியமான தகவல்களை பதிவு செய்யலாம், அவை உங்களுக்கு பயனுள்ளதாக இருக்கலாம் அல்லது நீங்கள் அவற்றை உறுதிப்படுத்த விரும்பலாம்.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

WebDriver Bidi ஐப் பயன்படுத்தும் போது, இது WebdriverIO பிரௌசரை தானியக்கமாக்கும் இயல்புநிலை முறையாகும், பிரௌசரிலிருந்து வரும் நிகழ்வுகளுக்கு நீங்கள் சந்தா செய்யலாம். பதிவு நிகழ்வுகளுக்கு நீங்கள் `log.entryAdded` ஐக் கேட்க விரும்புகிறீர்கள், உதாரணமாக:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

ஒரு சோதனையில் நீங்கள் பதிவு நிகழ்வுகளை ஒரு அணிக்கு மட்டும் தள்ளி உங்கள் செயல் முடிந்ததும் அந்த அணியை உறுதிப்படுத்தலாம், உதாரணமாக:

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

நீங்கள் இன்னும் WebDriver Classic ஐப் பயன்படுத்துகிறீர்கள் அல்லது `'wdio:enforceWebDriverClassic': true` திறன் மூலம் Bidi பயன்பாட்டை முடக்கியிருந்தால், சமீபத்திய பதிவுகளைப் பெற `getLogs` JSONWire கட்டளையைப் பயன்படுத்தலாம். WebdriverIO இந்த காலாவதியான கட்டளைகளை நீக்கிவிட்டதால், உங்கள் பிரௌசர் நிகழ்வில் கட்டளையை மீண்டும் சேர்க்க [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) ஐப் பயன்படுத்த வேண்டும்.

சேவையைச் சேர்த்த பின் அல்லது துவக்கிய பின், நீங்கள் பதிவுகளை பின்வருமாறு பெறலாம்:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

குறிப்பு: `getLogs` கட்டளை பிரௌசரிலிருந்து சமீபத்திய பதிவுகளை மட்டுமே பெற முடியும். அவை மிகவும் பழமையாகிவிட்டால் பதிவு செய்திகளை இறுதியில் அது சுத்தம் செய்யலாம்.
</TabItem>

</Tabs>

உங்கள் பயன்பாடு ஏதேனும் பிழைகளை சந்தித்துள்ளதா என்பதை சரிபார்க்க பிழை செய்திகளைப் பெற இந்த முறையைப் பயன்படுத்தலாம் என்பதை நினைவில் கொள்ளவும்.