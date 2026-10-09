---
id: customservices
title: कस्टम सर्विसेज़
description: "टेस्टरनर हुक्स का उपयोग करके WDIO टेस्टरनर के लिए एक कस्टम लॉन्चर या वर्कर सर्विस लिखें, सर्विस त्रुटियों को संभालें और इसे NPM पर प्रकाशित करें।"
---

आप अपनी आवश्यकताओं के अनुरूप WDIO टेस्ट रनर के लिए अपनी स्वयं की कस्टम सर्विस लिख सकते हैं।

सर्विसेज़ ऐसे ऐड-ऑन हैं जो पुन: उपयोग योग्य लॉजिक के लिए बनाए जाते हैं ताकि टेस्ट को सरल बनाया जा सके, आपके टेस्ट सूट को प्रबंधित किया जा सके और परिणामों को एकीकृत किया जा सके। सर्विसेज़ के पास वे सभी [हुक्स](/docs/configurationfile) उपलब्ध होते हैं जो `wdio.conf.js` में उपलब्ध हैं।

दो प्रकार की सर्विसेज़ परिभाषित की जा सकती हैं: एक लॉन्चर सर्विस जिसके पास केवल `onPrepare`, `onWorkerStart`, `onWorkerEnd` और `onComplete` हुक्स तक पहुँच होती है, जो प्रति टेस्ट रन केवल एक बार निष्पादित होते हैं, और एक वर्कर सर्विस जिसके पास अन्य सभी हुक्स तक पहुँच होती है और जो प्रत्येक वर्कर के लिए निष्पादित होती है। ध्यान दें कि आप दोनों प्रकार की सर्विसेज़ के बीच (ग्लोबल) वेरिएबल्स साझा नहीं कर सकते क्योंकि वर्कर सर्विसेज़ एक अलग (वर्कर) प्रोसेस में चलती हैं।

एक लॉन्चर सर्विस को निम्नानुसार परिभाषित किया जा सकता है:

```js
export default class CustomLauncherService {
    // यदि कोई हुक एक promise लौटाता है, तो WebdriverIO जारी रखने से पहले उस promise के resolve होने तक प्रतीक्षा करेगा।
    async onPrepare(config, capabilities) {
        // TODO: सभी वर्कर्स लॉन्च होने से पहले कुछ करें
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: वर्कर्स बंद होने के बाद कुछ करें
    }

    // कस्टम सर्विस मेथड्स ...
}
```

जबकि एक वर्कर सर्विस इस तरह दिखनी चाहिए:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` में सर्विस से संबंधित सभी विकल्प होते हैं
     * उदाहरण के लिए, यदि निम्नानुसार परिभाषित किया गया हो:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * तो `serviceOptions` पैरामीटर होगा: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * यह browser ऑब्जेक्ट यहाँ पहली बार पास किया जाता है
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: सभी टेस्ट चलने से पहले कुछ करें, उदाहरण के लिए:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: सभी टेस्ट चलने के बाद कुछ करें
    }

    beforeTest(test, context) {
        // TODO: प्रत्येक Mocha/Jasmine टेस्ट रन से पहले कुछ करें
    }

    beforeScenario(test, context) {
        // TODO: प्रत्येक Cucumber सिनेरियो रन से पहले कुछ करें
    }

    // अन्य हुक्स या कस्टम सर्विस मेथड्स ...
}
```

यह अनुशंसा की जाती है कि browser ऑब्जेक्ट को constructor में पास किए गए पैरामीटर के माध्यम से संग्रहीत किया जाए। अंत में दोनों प्रकार के वर्कर्स को निम्नानुसार एक्सपोज़ करें:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

यदि आप TypeScript का उपयोग कर रहे हैं और यह सुनिश्चित करना चाहते हैं कि हुक मेथड्स के पैरामीटर टाइप सेफ हों, तो आप अपनी सर्विस क्लास को निम्नानुसार परिभाषित कर सकते हैं:

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

## सशर्त वर्कर सर्विसेज़

एक सर्विस यह तय कर सकती है कि उसके वर्कर कोड की किसी टेस्ट रन या किसी विशेष वर्कर के लिए आवश्यकता है या नहीं। इसके लिए दो वैकल्पिक जाँचें हैं:

| जाँच | यह कहाँ चलती है | आर्ग्युमेंट्स | `false` लौटाने का प्रभाव |
| --- | --- | --- | --- |
| नामित मॉड्यूल एक्सपोर्ट `shouldLoad` | लॉन्चर प्रोसेस में, सर्विस मॉड्यूल को इम्पोर्ट करने के बाद | कॉन्फ़िगरेशन, सभी कॉन्फ़िगर की गई capabilities | सर्विस मॉड्यूल किसी भी वर्कर में इम्पोर्ट नहीं किया जाता। इसकी लॉन्चर सर्विस फिर भी चलती है। |
| स्टैटिक वर्कर सर्विस मेथड `shouldRun` | वर्कर प्रोसेस में, सर्विस को कंस्ट्रक्ट करने से पहले | सर्विस विकल्प, उस वर्कर की capabilities, कॉन्फ़िगरेशन | वर्कर सर्विस कंस्ट्रक्ट नहीं की जाती, इसलिए उस वर्कर में इसका कोई भी हुक नहीं चलता। |

नाम या पाथ द्वारा कॉन्फ़िगर किए गए सर्विस मॉड्यूल्स के लिए `shouldLoad(config, capabilities)` का उपयोग करें। यह पूरे पैकेज के लिए लिया गया निर्णय है: यदि एक ही सर्विस अलग-अलग विकल्पों के साथ एक से अधिक बार दिखाई देती है, तो परिणाम उन सभी प्रविष्टियों पर लागू होता है। उदाहरण के लिए, रिमोट क्रेडेंशियल्स की आवश्यकता वाली एक कस्टम सर्विस यह एक्सपोर्ट कर सकती है:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

प्रत्येक सर्विस प्रविष्टि और वर्कर के लिए अलग से निर्णय लेने के लिए `static shouldRun(options, capabilities, config)` का उपयोग करें। यह `services` में सीधे पास की गई कस्टम सर्विस क्लासेज़ के साथ भी काम करता है। उदाहरण के लिए, यह सर्विस अपने हुक्स को एक कॉन्फ़िगर किए गए ब्राउज़र तक सीमित कर सकती है:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // केवल उन वर्कर्स में चलता है जिन्होंने shouldRun पास किया।
    }
}
```

`services: [['custom', { browserName: 'chrome' }]]` के साथ, यह वर्कर सर्विस केवल Chrome capabilities के लिए कंस्ट्रक्ट की जाती है, बशर्ते पैकेज की `shouldLoad` जाँच भी इसकी अनुमति दे। `shouldRun` को कॉल करने के लिए वर्कर को सर्विस मॉड्यूल इम्पोर्ट करना होगा; इस मेथड से `false` लौटाने से वह इम्पोर्ट नहीं रुकता और न ही लॉन्चर सर्विस प्रभावित होती है।

दोनों जाँचें एक boolean या boolean का promise लौटा सकती हैं। WebdriverIO प्रत्येक परिणाम की प्रतीक्षा करता है, और केवल `false` ही लोडिंग या कंस्ट्रक्शन को अक्षम करता है। इन जाँचों के बिना सर्विसेज़ अपना मौजूदा व्यवहार बनाए रखती हैं। हुक्स वाले पहले से कंस्ट्रक्ट किए गए सर्विस ऑब्जेक्ट्स अपरिवर्तित रहते हैं।

यदि कोई भी जाँच त्रुटि थ्रो करती है या reject होती है, तो सर्विस इनिशियलाइज़ेशन एक ऐसी त्रुटि के साथ विफल हो जाता है जो सर्विस की पहचान करती है। यह सर्विस हुक्स द्वारा थ्रो की गई त्रुटियों से भिन्न है, जिनका वर्णन नीचे किया गया है।

## सर्विस त्रुटि प्रबंधन

किसी सर्विस हुक के दौरान थ्रो की गई Error लॉग की जाएगी जबकि रनर चलता रहेगा। यदि आपकी सर्विस में कोई हुक टेस्ट रनर के सेटअप या टियरडाउन के लिए महत्वपूर्ण है, तो रनर को रोकने के लिए `webdriverio` पैकेज से एक्सपोज़ किए गए `SevereServiceError` का उपयोग किया जा सकता है।

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: सभी वर्कर्स लॉन्च होने से पहले सेटअप के लिए कुछ महत्वपूर्ण करें

        throw new SevereServiceError('Something went wrong.')
    }

    // कस्टम सर्विस मेथड्स ...
}
```

## मॉड्यूल से सर्विस इम्पोर्ट करें

इस सर्विस का उपयोग करने के लिए अब बस इतना करना है कि इसे `services` प्रॉपर्टी को असाइन कर दें।

अपनी `wdio.conf.js` फ़ाइल को इस तरह संशोधित करें:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * इम्पोर्ट की गई सर्विस क्लास का उपयोग करें
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * सर्विस के लिए absolute पाथ का उपयोग करें
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## NPM पर सर्विस प्रकाशित करें

WebdriverIO समुदाय द्वारा सर्विसेज़ को उपयोग करने और खोजने में आसान बनाने के लिए, कृपया इन सिफारिशों का पालन करें:

* सर्विसेज़ को इस नामकरण परिपाटी का उपयोग करना चाहिए: `wdio-*-service`
* NPM कीवर्ड्स का उपयोग करें: `wdio-plugin`, `wdio-service`
* `main` एंट्री को सर्विस का एक इंस्टेंस `export` करना चाहिए
* उदाहरण सर्विसेज़: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

अनुशंसित नामकरण पैटर्न का पालन करने से सर्विसेज़ को नाम से जोड़ा जा सकता है:

```js
// wdio-custom-service जोड़ें
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### प्रकाशित सर्विस को WDIO CLI और Docs में जोड़ें

हम हर उस नए प्लगइन की वास्तव में सराहना करते हैं जो अन्य लोगों को बेहतर टेस्ट चलाने में मदद कर सकता है! यदि आपने ऐसा कोई प्लगइन बनाया है, तो कृपया इसे आसानी से खोजे जाने योग्य बनाने के लिए हमारे CLI और docs में जोड़ने पर विचार करें।

कृपया निम्नलिखित परिवर्तनों के साथ एक pull request बनाएँ:

- CLI मॉड्यूल में [समर्थित सर्विसेज़](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) की सूची में अपनी सर्विस जोड़ें
- आधिकारिक Webdriver.io पेज पर अपने docs जोड़ने के लिए [सर्विस सूची](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) को अपडेट करें