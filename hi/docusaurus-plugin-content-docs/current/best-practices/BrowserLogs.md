---
id: browser-logs
title: ब्राउज़र लॉग्स
description: "WebDriver Bidi लॉग इवेंट्स के साथ टेस्ट के दौरान ब्राउज़र कंसोल लॉग्स कैप्चर करें और एकत्रित संदेशों के विरुद्ध असर्ट करें।"
---

टेस्ट चलाते समय ब्राउज़र महत्वपूर्ण जानकारी लॉग कर सकता है जिसमें आपकी रुचि हो या जिसके विरुद्ध आप असर्ट करना चाहते हों।

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

WebDriver Bidi का उपयोग करते समय, जो WebdriverIO द्वारा ब्राउज़र को ऑटोमेट करने का डिफ़ॉल्ट तरीका है, आप ब्राउज़र से आने वाले इवेंट्स को सब्सक्राइब कर सकते हैं। लॉग इवेंट्स के लिए आपको `log.entryAdded'` पर सुनना होगा, उदाहरण के लिए:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

एक टेस्ट में आप बस लॉग इवेंट्स को एक ऐरे में पुश कर सकते हैं और अपना एक्शन पूरा होने के बाद उस ऐरे पर असर्ट कर सकते हैं, उदाहरण के लिए:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // लॉग संदेश को ऐरे में जोड़ें
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // ब्राउज़र को कंसोल पर एक संदेश भेजने के लिए ट्रिगर करें
        ...

        // असर्ट करें कि लॉग कैप्चर हुआ या नहीं
        expect(logs).toContain('Hello Bidi')
    })

    // बाद में लिसनर को साफ़ करें
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

यदि `'wdio:enforceWebDriverClassic': true` कैपेबिलिटी के साथ Bidi अक्षम है, तो Chromium सेशन अभी भी `getLogs` के साथ ब्राउज़र लॉग बफ़र पढ़ सकते हैं:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

नोट: `getLogs` कमांड ब्राउज़र से केवल सबसे हाल के लॉग्स ही प्राप्त कर सकता है। यदि लॉग संदेश बहुत पुराने हो जाते हैं तो यह उन्हें अंततः हटा सकता है।
</TabItem>

</Tabs>

कृपया ध्यान दें कि आप इस विधि का उपयोग त्रुटि संदेशों को प्राप्त करने और यह सत्यापित करने के लिए कर सकते हैं कि आपके एप्लिकेशन में कोई त्रुटि हुई है या नहीं।