---
id: customservices
title: कस्टम सर्विसेज
---

आप अपनी आवश्यकताओं के अनुसार WDIO टेस्ट रनर के लिए अपनी कस्टम सर्विस लिख सकते हैं।

सर्विसेज ऐसे ऐड-ऑन हैं जो पुन: प्रयोज्य लॉजिक के लिए बनाए जाते हैं ताकि परीक्षण सरल हो सकें, आपके परीक्षण सूट का प्रबंधन कर सकें और परिणामों को एकीकृत कर सकें। सर्विसेज के पास `wdio.conf.js` में उपलब्ध सभी समान [हुक्स](/docs/configurationfile) तक पहुंच है।

दो प्रकार की सर्विसेज को परिभाषित किया जा सकता है: एक लॉन्चर सर्विस जिसमें केवल `onPrepare`, `onWorkerStart`, `onWorkerEnd` और `onComplete` हुक तक पहुंच होती है जो प्रति टेस्ट रन केवल एक बार निष्पादित होते हैं, और एक वर्कर सर्विस जिसमें अन्य सभी हुक्स तक पहुंच होती है और जो प्रत्येक वर्कर के लिए निष्पादित होती है। ध्यान दें कि आप दोनों प्रकार की सर्विसेज के बीच (ग्लोबल) वेरिएबल्स को साझा नहीं कर सकते हैं क्योंकि वर्कर सर्विसेज एक अलग (वर्कर) प्रोसेस में चलती हैं।

एक लॉन्चर सर्विस को इस प्रकार परिभाषित किया जा सकता है:

```js
export default class CustomLauncherService {
    // अगर कोई हुक promise रिटर्न करता है, तो WebdriverIO उस promise के resolve होने तक प्रतीक्षा करेगा।
    async onPrepare(config, capabilities) {
        // TODO: सभी वर्कर्स के लॉन्च होने से पहले कुछ करें
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: वर्कर्स के बंद होने के बाद कुछ करें
    }

    // कस्टम सर्विस मेथड्स ...
}
```

जबकि एक वर्कर सर्विस इस प्रकार दिखनी चाहिए:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` में सर्विस के लिए विशिष्ट सभी विकल्प होते हैं
     * जैसे कि यदि निम्नानुसार परिभाषित किया गया है:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * `serviceOptions` पैरामीटर होगा: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * यह ब्राउज़र ऑब्जेक्ट यहां पहली बार पास किया जाता है
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: सभी परीक्षणों के चलने से पहले कुछ करें, जैसे:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: सभी परीक्षणों के चलने के बाद कुछ करें
    }

    beforeTest(test, context) {
        // TODO: प्रत्येक Mocha/Jasmine परीक्षण चलाने से पहले कुछ करें
    }

    beforeScenario(test, context) {
        // TODO: प्रत्येक Cucumber सिनारियो चलाने से पहले कुछ करें
    }

    // अन्य हुक्स या कस्टम सर्विस मेथड्स ...
}
```

कंस्ट्रक्टर में पास किए गए पैरामीटर के माध्यम से ब्राउज़र ऑब्जेक्ट को स्टोर करने की सिफारिश की जाती है। अंत में, दोनों प्रकार के वर्कर्स को निम्नानुसार एक्सपोज़ करें:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

यदि आप TypeScript का उपयोग कर रहे हैं और यह सुनिश्चित करना चाहते हैं कि हुक मेथड्स के पैरामीटर टाइप सेफ हैं, तो आप अपनी सर्विस क्लास को इस प्रकार परिभाषित कर सकते हैं:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## सर्विस एरर हैंडलिंग

सर्विस हुक के दौरान उत्पन्न एक एरर को लॉग किया जाएगा जबकि रनर जारी रहेगा। यदि आपकी सर्विस में कोई हुक टेस्ट रनर के सेटअप या टियरडाउन के लिए महत्वपूर्ण है, तो रनर को रोकने के लिए `webdriverio` पैकेज से एक्सपोज्ड `SevereServiceError` का उपयोग किया जा सकता है।

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: सभी वर्कर्स के लॉन्च होने से पहले सेटअप के लिए कुछ महत्वपूर्ण

        throw new SevereServiceError('कुछ गलत हो गया।')
    }

    // कस्टम सर्विस मेथड्स ...
}
```

## मॉड्यूल से सर्विस इम्पोर्ट करें

इस सर्विस का उपयोग करने के लिए अब केवल एक चीज करनी है, उसे `services` प्रॉपर्टी को असाइन करना।

अपनी `wdio.conf.js` फ़ाइल को इस प्रकार संशोधित करें:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * इम्पोर्टेड सर्विस क्लास का उपयोग करें
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * सर्विस के लिए एब्सोल्यूट पाथ का उपयोग करें
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## NPM पर सर्विस प्रकाशित करें

WebdriverIO समुदाय द्वारा सर्विसेज को आसानी से उपभोग और खोजने के लिए, कृपया इन सिफारिशों का पालन करें:

* सर्विसेज को इस नामकरण परिपाटी का उपयोग करना चाहिए: `wdio-*-service`
* NPM कीवर्ड्स का उपयोग करें: `wdio-plugin`, `wdio-service`
* `main` एंट्री को सर्विस का एक इंस्टेंस `export` करना चाहिए
* उदाहरण सर्विसेज: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

अनुशंसित नामकरण पैटर्न का पालन करने से सर्विसेज को नाम से जोड़ा जा सकता है:

```js
// wdio-custom-service जोड़ें
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### WDIO CLI और डॉक्स में प्रकाशित सर्विस जोड़ें

हम वास्तव में हर नए प्लगइन की सराहना करते हैं जो अन्य लोगों को बेहतर परीक्षण चलाने में मदद कर सकते हैं! यदि आपने ऐसा प्लगइन बनाया है, तो कृपया इसे हमारे CLI और डॉक्स में जोड़ने पर विचार करें ताकि इसे आसानी से खोजा जा सके।

कृपया निम्नलिखित परिवर्तनों के साथ एक पुल रिक्वेस्ट उठाएं:

- अपनी सर्विस को CLI मॉड्यूल में [समर्थित सर्विसेज](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) की सूची में जोड़ें
- आधिकारिक Webdriver.io पृष्ठ पर अपने दस्तावेज़ जोड़ने के लिए [सर्विस सूची](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) को बढ़ाएं