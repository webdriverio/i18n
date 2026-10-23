---
id: customreporter
title: कस्टम रिपोर्टर
description: "@wdio/reporter के आधार पर WDIO टेस्टरनर के लिए एक कस्टम रिपोर्टर बनाएं, रनर इवेंट्स को हैंडल करें और इसे NPM पर प्रकाशित करें।"
---

आप WDIO टेस्ट रनर के लिए अपना खुद का कस्टम रिपोर्टर लिख सकते हैं जो आपकी आवश्यकताओं के अनुरूप हो। और यह आसान है!

आपको बस एक नोड मॉड्यूल बनाना है जो `@wdio/reporter` पैकेज से इनहेरिट करता हो, ताकि यह टेस्ट से संदेश प्राप्त कर सके।

बुनियादी सेटअप इस तरह दिखना चाहिए:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * रिपोर्टर को डिफ़ॉल्ट रूप से आउटपुट स्ट्रीम में लिखने के लिए सेट करें
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

इस रिपोर्टर का उपयोग करने के लिए, आपको बस इसे अपने कॉन्फ़िगरेशन में `reporter` प्रॉपर्टी को असाइन करना है।


आपकी `wdio.conf.js` फ़ाइल इस तरह दिखनी चाहिए:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * इम्पोर्ट की गई रिपोर्टर क्लास का उपयोग करें
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * रिपोर्टर के लिए एब्सोल्यूट पाथ का उपयोग करें
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

आप रिपोर्टर को NPM पर भी प्रकाशित कर सकते हैं ताकि हर कोई इसका उपयोग कर सके। पैकेज का नाम अन्य रिपोर्टर्स की तरह `wdio-<reportername>-reporter` रखें, और इसे `wdio` या `wdio-reporter` जैसे कीवर्ड्स के साथ टैग करें।

## इवेंट हैंडलर

आप टेस्टिंग के दौरान ट्रिगर होने वाले कई इवेंट्स के लिए एक इवेंट हैंडलर रजिस्टर कर सकते हैं। निम्नलिखित सभी हैंडलर्स को वर्तमान स्थिति और प्रगति के बारे में उपयोगी जानकारी के साथ पेलोड प्राप्त होंगे।

इन पेलोड ऑब्जेक्ट्स की संरचना इवेंट पर निर्भर करती है, और सभी फ्रेमवर्क्स (Mocha, Jasmine, और Cucumber) में एकीकृत है। एक बार जब आप कस्टम रिपोर्टर लागू कर लेते हैं, तो यह सभी फ्रेमवर्क्स के लिए काम करना चाहिए।

निम्नलिखित सूची में वे सभी संभावित मेथड्स शामिल हैं जिन्हें आप अपनी रिपोर्टर क्लास में जोड़ सकते हैं:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

मेथड्स के नाम काफी हद तक स्वयं-व्याख्यात्मक हैं।

किसी विशेष इवेंट पर कुछ प्रिंट करने के लिए, `this.write(...)` मेथड का उपयोग करें, जो पैरेंट `WDIOReporter` क्लास द्वारा प्रदान किया जाता है। यह कंटेंट को या तो `stdout` पर, या एक लॉग फ़ाइल में स्ट्रीम करता है (रिपोर्टर के विकल्पों के आधार पर)।

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

ध्यान दें कि आप किसी भी तरह से टेस्ट एक्जीक्यूशन को स्थगित नहीं कर सकते।

सभी इवेंट हैंडलर्स को सिंक्रोनस रूटीन एक्जीक्यूट करने चाहिए (अन्यथा आपको रेस कंडीशन्स का सामना करना पड़ेगा)।

[उदाहरण अनुभाग](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) अवश्य देखें, जहाँ आपको एक उदाहरण कस्टम रिपोर्टर मिलेगा जो प्रत्येक इवेंट के लिए इवेंट का नाम प्रिंट करता है।

यदि आपने कोई ऐसा कस्टम रिपोर्टर लागू किया है जो समुदाय के लिए उपयोगी हो सकता है, तो पुल रिक्वेस्ट बनाने में संकोच न करें ताकि हम उस रिपोर्टर को सार्वजनिक रूप से उपलब्ध करा सकें!

साथ ही, यदि आप WDIO टेस्टरनर को `Launcher` इंटरफ़ेस के माध्यम से चलाते हैं, तो आप कस्टम रिपोर्टर को निम्न प्रकार से फ़ंक्शन के रूप में लागू नहीं कर सकते:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // यह काम नहीं करेगा, क्योंकि CustomReporter सीरियलाइज़ेबल नहीं है
    reporters: ['dot', CustomReporter]
})
```

## रिपोर्टर्स और पैरेलल टेस्ट्स

[एक स्पेक फ़ाइल में पैरेलल टेस्ट्स](./ParallelTests.md) के साथ, एक स्पेक फ़ाइल के टेस्ट्स ओवरलैप होते हैं: एक टेस्ट का `onTestStart` दूसरे टेस्ट के `onTestEnd` से पहले आ सकता है, और विभिन्न टेस्ट्स के कमांड्स आपस में मिश्रित हो जाते हैं। `WDIOReporter` आपके लिए इसे संभालता है। पैरेलल मोड में फ्रेमवर्क इवेंट्स दो अतिरिक्त फ़ील्ड्स रखते हैं:

- `suite:start`, `hook:start` और `test:start` पर `parentUid`: स्वामी सूट का uid (टॉप-लेवल सूट के लिए `null`)। रिपोर्टर सूट, हुक या टेस्ट को उसी सूट में जोड़ता है, न कि उस सूट में जो सबसे अंत में शुरू हुआ था।
- टेस्ट और कमांड इवेंट्स पर `contextId`: टेस्ट का ब्राउज़िंग कॉन्टेक्स्ट। रिपोर्टर कमांड आउटपुट को उस टेस्ट में जोड़ता है जो उस कॉन्टेक्स्ट में चला था।

जब इवेंट में ये फ़ील्ड्स होते हैं, तो टेस्ट, हुक और सूट स्टैट्स इन्हें बनाए रखते हैं: `onTestEnd(test)` में, `test.contextId` टेस्ट का ब्राउज़िंग कॉन्टेक्स्ट है और `test.parentUid` उसके सूट का uid है। पैरेलल मोड के बिना, स्टैट्स में ऐसी कोई प्रॉपर्टीज़ नहीं होतीं।

इसलिए रिपोर्टर के `suites`, `tests` और `hooks` ट्री सही होते हैं। यदि आपका रिपोर्टर अपनी स्वयं की स्टेट रखता है, तो एक ही वर्तमान टेस्ट को ट्रैक करने के बजाय उसे टेस्ट या सूट के `uid` द्वारा की करें।

जो आउटपुट बिना किसी इवेंट के आता है, जैसे कंसोल आउटपुट या कस्टम `process.emit` इवेंट, उसका कोई `uid` नहीं होता। उस टेस्ट को प्राप्त करने के लिए `this.getContextTest()` को कॉल करें जिसके ब्राउज़िंग कॉन्टेक्स्ट ने इसे लिखा है। पैरेलल मोड में, जब कोई चल रहा टेस्ट उस कॉन्टेक्स्ट का स्वामी नहीं होता, तो यह `undefined` लौटाता है; पैरेलल मोड के बिना यह सबसे अंत में शुरू हुए टेस्ट को लौटाता है। पैरेलल टेस्ट के `before()` हुक्स उसके `test:start` से पहले चलते हैं, इसलिए तब तक कोई टेस्ट उस कॉन्टेक्स्ट का स्वामी नहीं होता; `this.getContextId()` रॉ कॉन्टेक्स्ट id लौटाता है, जो पूरे टेस्ट के दौरान समान रहती है।

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestStart(test) {
        this.write(`start ${test.uid} ${test.title}\n`)
    }
    onTestEnd(test) {
        this.write(`end   ${test.uid} ${test.state}\n`)
    }
}
```

## `isSynchronised` तक प्रतीक्षा करें

यदि आपके रिपोर्टर को डेटा रिपोर्ट करने के लिए async ऑपरेशन्स एक्जीक्यूट करने हैं (जैसे लॉग फ़ाइलों या अन्य एसेट्स का अपलोड), तो आप अपने कस्टम रिपोर्टर में `isSynchronised` मेथड को ओवरराइट कर सकते हैं ताकि WebdriverIO रनर तब तक प्रतीक्षा करे जब तक आप सब कुछ कंप्यूट नहीं कर लेते। इसका एक उदाहरण [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) में देखा जा सकता है:

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * isSynchronised मेथड को ओवरराइट करें
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * लॉग फ़ाइलों को सिंक करें
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * ट्रांसफर किए गए लॉग्स को लॉग बकेट से हटाएं
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

इस तरह रनर तब तक प्रतीक्षा करेगा जब तक सभी लॉग जानकारी अपलोड नहीं हो जाती।

## NPM पर रिपोर्टर प्रकाशित करें

WebdriverIO समुदाय द्वारा रिपोर्टर को उपयोग करने और खोजने में आसान बनाने के लिए, कृपया इन सिफ़ारिशों का पालन करें:

* सर्विसेज़ को इस नामकरण परिपाटी का उपयोग करना चाहिए: `wdio-*-reporter`
* NPM कीवर्ड्स का उपयोग करें: `wdio-plugin`, `wdio-reporter`
* `main` एंट्री को रिपोर्टर का एक इंस्टेंस `export` करना चाहिए
* उदाहरण रिपोर्टर: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

अनुशंसित नामकरण पैटर्न का पालन करने से सर्विसेज़ को नाम से जोड़ा जा सकता है:

```js
// wdio-custom-reporter जोड़ें
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### प्रकाशित सर्विस को WDIO CLI और डॉक्स में जोड़ें

हम हर उस नए प्लगइन की वास्तव में सराहना करते हैं जो अन्य लोगों को बेहतर टेस्ट चलाने में मदद कर सकता है! यदि आपने ऐसा कोई प्लगइन बनाया है, तो कृपया इसे हमारे CLI और डॉक्स में जोड़ने पर विचार करें ताकि इसे ढूंढना आसान हो सके।

कृपया निम्नलिखित परिवर्तनों के साथ एक पुल रिक्वेस्ट बनाएं:

- CLI मॉड्यूल में [समर्थित रिपोर्टर्स](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) की सूची में अपनी सर्विस जोड़ें
- आधिकारिक Webdriver.io पेज पर अपने डॉक्स जोड़ने के लिए [रिपोर्टर सूची](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) को अपडेट करें