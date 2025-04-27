---
id: browser-logs
title: ब्राउज़र लॉग
---

परीक्षण चलाते समय ब्राउज़र महत्वपूर्ण जानकारी लॉग कर सकता है जिसमें आप रुचि रखते हैं या जिसके खिलाफ आप जांच करना चाहते हैं।

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

WebDriver Bidi का उपयोग करते समय, जो WebdriverIO द्वारा ब्राउज़र को स्वचालित करने का डिफ़ॉल्ट तरीका है, आप ब्राउज़र से आने वाली घटनाओं को सब्सक्राइब कर सकते हैं। लॉग इवेंट्स के लिए आप `log.entryAdded'` पर सुनना चाहेंगे, उदाहरण के लिए:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

एक परीक्षण में आप बस लॉग इवेंट्स को एक एरे में पुश कर सकते हैं और जब आपका कार्य पूरा हो जाए तो उस एरे की जांच कर सकते हैं, उदाहरण के लिए:

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

यदि आप अभी भी WebDriver Classic का उपयोग करते हैं या `'wdio:enforceWebDriverClassic': true` क्षमता के माध्यम से Bidi उपयोग को अक्षम किया है, तो आप नवीनतम लॉग प्राप्त करने के लिए `getLogs` JSONWire कमांड का उपयोग कर सकते हैं। चूंकि WebdriverIO ने इन पुराने कमांड्स को हटा दिया है, इसलिए आपको अपने ब्राउज़र इंस्टेंस में कमांड वापस जोड़ने के लिए [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) का उपयोग करना होगा।

सर्विस जोड़ने या शुरू करने के बाद आप लॉग प्राप्त कर सकते हैं:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

नोट: `getLogs` कमांड केवल ब्राउज़र से सबसे हाल के लॉग प्राप्त कर सकता है। यदि लॉग मैसेज बहुत पुराने हो जाते हैं, तो वे अंततः साफ हो सकते हैं।
</TabItem>

</Tabs>

कृपया ध्यान दें कि आप इस विधि का उपयोग त्रुटि संदेशों को प्राप्त करने और यह सत्यापित करने के लिए कर सकते हैं कि क्या आपके एप्लिकेशन में कोई त्रुटियां आई हैं।