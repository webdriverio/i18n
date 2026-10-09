---
id: customreporter
title: कस्टम रिपोर्टर
description: "@wdio/reporter के आधार पर WDIO टेस्टरनर के लिए एक कस्टम रिपोर्टर बनाएं, रनर इवेंट्स को हैंडल करें और इसे NPM पर प्रकाशित करें।"
---

आप WDIO टेस्ट रनर के लिए अपना खुद का कस्टम रिपोर्टर लिख सकते हैं जो आपकी आवश्यकताओं के अनुरूप हो। और यह आसान है!

आपको बस एक node मॉड्यूल बनाना है जो `@wdio/reporter` पैकेज से इनहेरिट करता हो, ताकि यह टेस्ट से संदेश प्राप्त कर सके।

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
         * रिपोर्टर के एब्सोल्यूट पाथ का उपयोग करें
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

इन पेलोड ऑब्जेक्ट्स की संरचना इवेंट पर निर्भर करती है, और सभी फ्रेमवर्क्स (Mocha, Jasmine, और Cucumber) में एकीकृत होती है। एक बार जब आप कस्टम रिपोर्टर इम्प्लीमेंट कर लेते हैं, तो यह सभी फ्रेमवर्क्स के लिए काम करना चाहिए।

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

मेथड्स के नाम काफी हद तक स्वतः स्पष्ट हैं।

किसी विशेष इवेंट पर कुछ प्रिंट करने के लिए, `this.write(...)` मेथड का उपयोग करें, जो पैरेंट `WDIOReporter` क्लास द्वारा प्रदान किया जाता है। यह या तो कंटेंट को `stdout` पर स्ट्रीम करता है, या एक लॉग फ़ाइल में (रिपोर्टर के विकल्पों के आधार पर)।

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

ध्यान दें कि आप किसी भी तरह से टेस्ट निष्पादन को स्थगित नहीं कर सकते।

सभी इवेंट हैंडलर्स को सिंक्रोनस रूटीन निष्पादित करने चाहिए (अन्यथा आप रेस कंडीशंस में फंस जाएंगे)।

[उदाहरण अनुभाग](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) अवश्य देखें जहां आपको एक उदाहरण कस्टम रिपोर्टर मिलेगा जो प्रत्येक इवेंट के लिए इवेंट का नाम प्रिंट करता है।

यदि आपने कोई ऐसा कस्टम रिपोर्टर इम्प्लीमेंट किया है जो समुदाय के लिए उपयोगी हो सकता है, तो Pull Request बनाने में संकोच न करें ताकि हम रिपोर्टर को सार्वजनिक रूप से उपलब्ध करा सकें!

साथ ही, यदि आप WDIO टेस्टरनर को `Launcher` इंटरफ़ेस के माध्यम से चलाते हैं, तो आप निम्नानुसार कस्टम रिपोर्टर को फ़ंक्शन के रूप में लागू नहीं कर सकते:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // यह काम नहीं करेगा, क्योंकि CustomReporter सीरियलाइज़ करने योग्य नहीं है
    reporters: ['dot', CustomReporter]
})
```

## `isSynchronised` तक प्रतीक्षा करें

यदि आपके रिपोर्टर को डेटा रिपोर्ट करने के लिए async ऑपरेशंस निष्पादित करने हैं (जैसे लॉग फ़ाइलों या अन्य एसेट्स का अपलोड), तो आप अपने कस्टम रिपोर्टर में `isSynchronised` मेथड को ओवरराइट कर सकते हैं ताकि WebdriverIO रनर तब तक प्रतीक्षा करे जब तक आप सब कुछ कंप्यूट नहीं कर लेते। इसका एक उदाहरण [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) में देखा जा सकता है:

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
             * स्थानांतरित लॉग्स को लॉग बकेट से हटाएं
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

इस तरह रनर तब तक प्रतीक्षा करेगा जब तक सभी लॉग जानकारी अपलोड नहीं हो जाती।

## NPM पर रिपोर्टर प्रकाशित करें

WebdriverIO समुदाय द्वारा रिपोर्टर को उपयोग करने और खोजने में आसान बनाने के लिए, कृपया इन सिफारिशों का पालन करें:

* सर्विसेज़ को इस नामकरण परंपरा का उपयोग करना चाहिए: `wdio-*-reporter`
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

कृपया निम्नलिखित परिवर्तनों के साथ एक pull request बनाएं:

- CLI मॉड्यूल में [समर्थित रिपोर्टर्स](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) की सूची में अपनी सर्विस जोड़ें
- आधिकारिक Webdriver.io पेज पर अपने डॉक्स जोड़ने के लिए [रिपोर्टर सूची](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) को अपडेट करें