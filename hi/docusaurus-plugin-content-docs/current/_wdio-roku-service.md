---
id: wdio-roku-service
title: रोकू सर्विस
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
यह सेवा WebdriverIO के कई हिस्सों को ओवरराइड करती है ताकि उन्हें रोकू ऐप्स के साथ उपयोग किया जा सके और परीक्षण के दौरान रोकू को नियंत्रित करने के लिए [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) तक पहुंच प्रदान करती है।

## आवश्यकताएँ

### Roku
एक टेस्ट चैनल/channel.zip और एक रोकू डिवाइस (डेवलपर मोड सक्षम के साथ) जो आपके मैक के साथ एक ही नेटवर्क पर हो।

### WebdriverIO
यह एक स्टैंडअलोन प्रोडक्ट नहीं है -- इसका उपयोग WebdriverIO टेस्ट फ्रेमवर्क प्लगइन (या उनके शब्दकोष में सर्विस) के रूप में किया जाता है। इसका उपयोग करने से पहले, आपको `npm init wdio@latest` चलाकर WDIO के लिए सेटअप से गुजरना चाहिए।

सेटअप चरणों से गुजरते समय, ताकि आपको सभी प्रश्नों/विकल्पों को नेविगेट न करना पड़े, आप इनिट चरण के दौरान निम्नलिखित चयन कर सकते हैं:
- Roku Testing (नोट: इसका उपयोग करें यदि आपका रेपो केवल रोकू टेस्टिंग के लिए उपयोग किया जाएगा क्योंकि यह डिफॉल्ट और केवल इंस्टॉल की गई सेवा बन जाएगी। अन्यथा, E2E टेस्टिंग का उपयोग करें ताकि आप कई सेवाओं को इंस्टॉल कर सकें।)
- On my local machine (केवल E2E)
- Web (केवल E2E)
- Chrome (केवल E2E)
- Mocha
- Typescript [मॉड्यूल TS और JS दोनों के लिए काम करते हैं, इसलिए जो भी चाहें चुनें]
- autogenerate some test files (Y)
-- default location
- page objects (Y)
-- default location
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Typescript Config
यदि आप टेस्ट लिखने के लिए Typescript का उपयोग करना चाहते हैं, तो आपको यह सुनिश्चित करना होगा कि Webdriverio द्वारा जनरेट किए गए tsconfig.json फ़ाइल में निम्नलिखित विकल्प सेट हैं।
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
फिर आप सेवा का उपयोग नीचे दिए गए विवरण के अनुसार अपने परीक्षणों में आयात करके कर सकते हैं।

### WDIO Config
वर्तमान में, परीक्षण केवल एक रोकू डिवाइस के लिए समर्थित है। निम्नलिखित कॉन्फिग अपडेट आवश्यक हैं:
* `maxInstances` और `maxInstancesPerCapability` 1 होना चाहिए। कई डिवाइसों पर स्वचालित रूप से परीक्षण समर्थित नहीं है और इसके परिणामस्वरूप रोकू को डुप्लिकेट कमांड भेजे जाएंगे। केवल एक क्षमता होनी चाहिए।
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // or if you want headless mode:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* यह अनुशंसित है कि `waitforInterval` और `waitforTimeout` को बढ़ाया जाए, क्योंकि प्रत्येक इंटरवल में रोकू से XML डाउनलोड करना शामिल है। `browser.debug()` फीचर से अधिक प्राप्त करने के लिए, आप विकास कक्ष के लिए अपने mocha टेस्टरनर टाइमआउट को 5+ मिनट तक बढ़ाने का भी विकल्प चुन सकते हैं।
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //optional:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

आप अपना पहला टेस्ट लिखने के लिए तैयार हैं!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

यह भी प्रोत्साहित किया जाता है कि आप डीबगिंग और टेस्ट लेखन के लिए अपने टेस्ट को रोकने के लिए wdio में `browser.debug()` फीचर का उपयोग करें:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // the test halts, a REPL becomes available for commands

```
यदि क्रोम हेडलेस नहीं है, तो आप देख सकते हैं कि आखिरी बार जब `openRokuXML()` को कॉल किया गया था (संभवतः `waitForX` या `expect` के माध्यम से)। अपने टर्मिनल में REPL का उपयोग करके, आप किसी भी वैध `$` कमांड का उपयोग कर सकते हैं, और कुछ प्रमुख कस्टम कमांड जोड़े गए हैं (`browser.openRokuXML()` और `browser.saveScreenshot('path/to/ss.jpg')`) - `controller` क्लास `browser` ऑब्जेक्ट से अटैच नहीं है, इसलिए आप वर्तमान में उनका उपयोग नहीं कर सकते। सौभाग्य से, आप शायद रोकू के पास बैठे हैं और आपके पास एक रिमोट है जिसका उपयोग आप नेविगेट करने और कभी-कभी `browser.openRokuXML()` को कॉल करके यह देखने के लिए कर सकते हैं कि पेज स्टेट का क्या हुआ! और याद रखें कि XML क्रोम ब्राउज़र में ही xpathing के साथ नेटिव रूप से काम करता है, इसलिए आप डीबग के दौरान क्रोम कंसोल में सीधे अपने सेलेक्टर्स का मूल्यांकन/विकास कर सकते हैं।

### .env
`.env.example` फ़ाइल देखें। इसे कॉपी करें और इसका नाम बदलकर `.env` रखें अपने WebdriverIO प्रोजेक्ट में जो इस सेवा का उपयोग करता है। आप शायद इसे अपने .gitignore में भी डालना चाहेंगे।

* `ROKU_IP` आपके रोकू का IP होना चाहिए। कमांड इसके साथ संवाद करने के लिए इस IP का उपयोग करेंगे। यह आवश्यक है।
* `ROKU_USER` और `ROKU_PW`: एक आर्काइव इंस्टॉल करने के साथ-साथ स्क्रीनशॉट लेने के लिए भी लॉगिन क्रेडेंशियल आवश्यक हैं।
* `ROKU_APP_PATH` रोकू चैनल ज़िप फ़ाइल का एब्सोल्यूट पाथ होना चाहिए।
* `ROKU_CHANNEL_ID` आपके रोकू चैनल की चैनल ID होनी चाहिए (यह आमतौर पर "dev" होती है)।
* `DEBUG=wdio-roku-service` डीबग मैसेज को सक्षम करेगा। यदि आप उन्हें चाहते हैं तो लाइन के शुरुआत में '#' को हटा दें।

## बदले गए फंक्शन्स
### Browser
* `waitUntil` परिवर्तनों की जांच के लिए प्रत्येक इटरेशन पर रोकू से XML फेच करेगा।
* `saveScreenshot` रोकू से वर्तमान स्क्रीन का स्क्रीनशॉट डाउनलोड करेगा। विशेष रूप से, ये स्क्रीनशॉट .jpg फॉर्मेट में होते हैं, न कि .png फॉर्मेट में जिसे WebdriverIO आमतौर पर उपयोग करता है।
* `openRokuXML` मैन्युअली रोकू से XML फेच करेगा यदि आपको इसे मैन्युअली करने की आवश्यकता है, न कि वेट्स के साथ।

### Elements
* सभी वेट्स को ब्राउज़र के समान तरीके से समर्थित किया गया है। `waitForClickable` को `waitForDisplayed` पर मैप किया गया है, और `waitForStable` को `waitForExist` पर मैप किया गया है।
* `click`, `doubleClick`, और `moveTo` समर्थित नहीं हैं। आपको मैन्युअल रूप से ऐप नेविगेट करना होगा।
* `isFocused` एलिमेंट पर `focused` एट्रिब्यूट के सत्य होने की जांच करेगा।
* `isDisplayed` एलिमेंट पर `bounds` एट्रिब्यूट की जांच करेगा, और यह कि `visible` को false पर सेट नहीं किया गया है। यदि `withinViewport` सेट है, तो बाउंड्स की तुलना रोकू के स्क्रीन साइज़ से की जाएगी।
* `getSize` और `getLocation` `bounds` एट्रिब्यूट से वैल्यू लेते हैं, साइज़ के लिए 0 और पोजीशन के लिए -Infinity रिटर्न करते हैं अगर यह मौजूद नहीं है।

अन्य फ़ंक्शन्स में परिवर्तन नहीं किया गया है, लेकिन कई अभी भी अपेक्षा के अनुसार काम करते हैं।

### Matchers
अधिकांश मैचर्स को XML फेच करने के लिए अपडेट किया गया है। कुछ में थोड़ा अलग फंक्शनैलिटी है।
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight`, और `toHaveAttribute` सभी अपेक्षा के अनुसार काम करते हैं, जिसमें एलिमेंट में परिवर्तन किए गए हैं।
* `toHaveElementProperty` को `toHaveAttribute` पर मैप किया गया है।
* `toHaveElementClass` एलिमेंट के `name` एट्रिब्यूट की जांच करता है।
* `toHaveId` को `toHaveElementClass` पर मैप किया गया है।
* `toHaveText` एलिमेंट के `text` एट्रिब्यूट की जांच करता है।
* `toHaveChildren` एलिमेंट के `children` एट्रिब्यूट की जांच करता है।
* `toHaveHTML` XML को ऐसे मानेगा जैसे कि यह HTML हो, हालांकि यह संभवतः बहुत उपयोगी नहीं है।

निम्नलिखित वर्तमान में समर्थित नहीं हैं:
* `toBeSelected` - यह जल्द ही समर्थित हो सकता है, यह निर्धारित करने के बाद कि चयनित बटन कैसे दिखते हैं, यदि कोई अंतर है।
* `toBeChecked` - यह जल्द ही समर्थित हो सकता है, यह निर्धारित करने के बाद कि चेकबॉक्स कैसे दिखते हैं, यदि कोई अंतर है।
* `toHaveComputedLabel` - यदि आपके रोकू एलिमेंट्स पर इसके समकक्ष है, तो `toHaveAttribute` के साथ एट्रिब्यूट की जांच करें।
* `toHaveComputedRole` - यदि आपके रोकू एलिमेंट्स पर इसके समकक्ष है, तो `toHaveAttribute` के साथ एट्रिब्यूट की जांच करें।
* `toHaveHref` - यदि आपके रोकू एलिमेंट्स पर URL हैं, तो `toHaveAttribute` के साथ एट्रिब्यूट की जांच करें।
* `toHaveStyle` - XML एलिमेंट्स में स्टाइल नहीं होते।
* `toHaveClipboardText` - यह ज्ञात नहीं है।
* `toHaveTitle` - शीर्षक XML का यादृच्छिक रूप से जनरेट किया गया अस्थायी फ़ाइलनाम होगा।
* `toHaveUrl` - URL आपके कंप्यूटर पर XML फ़ाइल का पथ होगा।

## उपयोग
### Channel Installation

इसके लिए आपके चैनल को एक असाइन किया गया ID होना आवश्यक है।
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Archive Installation

यदि आपके पास कई डेवलपर हैं जिनके पास अलग-अलग स्थान और/या फ़ाइल नाम हो सकते हैं, तो .env में पथ स्टोर करने की सिफारिश की जाती है।
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Pre-Installed Channel

यदि आपने परीक्षण से पहले ही चैनल को खुद इंस्टॉल कर लिया है, तो आप सिर्फ़ इसे लॉन्च कर सकते हैं।
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Close the channel if it's already open. If the channel supports instant resume, this will merely background it
    await exitChannel();
    // Using the channel ID of 'dev' will launch the sideloaded application.
    await launchChannel('dev');
}
```

### Testing
`wdio-roku-service/controller` रोकू को बटन प्रेस भेजने की क्षमता प्रदान करता है। `keySequence` मुख्य है, जो क्रम में कई बटन प्रेस भेजता है।
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Navigate through the app
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Fetch the current app UI from the Roku and load it into the browser
await browser.openRokuXML();
// Or, use waits, which will repeatedly load the XML until it times out or the condition passes
await browser.waitUntil(condition);
await element.waitForDisplayed();
// use WDIO matchers on the roku XML as if it was a webpage
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` में बटन को होल्ड या रिलीज़ करने के साथ-साथ कीबोर्ड में टेक्स्ट टाइप करने के लिए भी फंक्शन्स हैं।
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` चैनल-संबंधित फंक्शनैलिटी प्रदान करता है। `inputChannel` आपको अपने ऐप को मनमाना जानकारी भेजने की अनुमति देता है।
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Other Functions
`wdio-roku-service/info` विविध फंक्शनैलिटी प्रदान करता है, जैसे ऐप आइकन या अनाथ नोड्स प्राप्त करना।
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` ECP के साथ सीधा इंटरफेस है यदि आपको कुछ अत्यधिक विशिष्ट करने की आवश्यकता है।
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## सामान्य गोटचा
* रोकू एलिमेंट्स का टेक्स्ट उनके टैग के बीच नहीं, बल्कि 'text' एट्रिब्यूट में होता है। सिलेक्टर्स का उपयोग करते समय, लगभग हर एलिमेंट के लिए `$('element=Text')` काम नहीं करेगा। इसके बजाय, आपको `$('element[text=Text]')` करना होगा।

## फीचर रोडमैप
* जल्द ही एक PR सबमिट किया जाएगा जो `npm init wdio@latest` प्रश्नावली के दौरान इस सेवा को इंस्टॉल करने की अनुमति देगा।
* वर्तमान में रोकू के साथ सॉकेट कम्युनिकेशन का मूल्यांकन किया जा रहा है ताकि अधिक फीचर्स को टूल किया जा सके, जैसे कि स्लीपिंग रोकू को जगाने का माध्यम।
* नेटवर्क प्रॉक्सी फीचर जो नेटवर्क गतिविधि के साथ-साथ चलने की अनुमति देता है।

## Allure Reporting का उपयोग स्क्रीनशॉट और XML फ़ाइलों के साथ

Allure Reporting में, बाहर से ही, ऐप के स्क्रीनशॉट या रोकू ऐप की वर्तमान स्थिति का प्रतिनिधित्व करने वाले XML कोड की एक कॉपी जनरेट करने के लिए कोई कॉन्फिगरेशन मौजूद नहीं है। निम्नलिखित दस्तावेज़ीकरण बताता है कि इस मुद्दे को कैसे हल किया जाए ताकि हर बार जब एक `it` टेस्ट पूरा होता है, तो ऐप की वर्तमान स्थिति का एक स्क्रीनशॉट जनरेट होकर Allure रिपोर्ट से जुड़ जाए। यह आपको वर्तमान रोकू ऐप की स्थिति का प्रतिनिधित्व करने वाले XML का एक सोर्स स्नैपशॉट प्राप्त करने की भी अनुमति देता है जब कभी एक `it` टेस्ट रन फेल होता है।

Allure Reporter के पूर्ण दस्तावेज़ीकरण के लिए, कृपया @wdio/allure-reporter डॉक्स https://webdriver.io/docs/allure-reporter/ देखें

### Utils.js dependency
निम्न कोड को `Utils.js` नामक फ़ाइल में जोड़ें। यह फ़ाइल आपके `/helpers` फ़ोल्डर या इसी तरह के फ़ोल्डर में रह सकती है।
```js
/**
 * Returns a string representation of the 'now' timestamp in milliseconds for the epoch.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Returns a string representation of the 'now' timestamp following the pattern: {YYYY}-{MM}-{DD}_{hour in 24H}-{Minute}-{Second}-{Milliseconds}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * An object containing the string representations of possible file extensions used for reporting purposes.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * An object containing the string representations of possible MIME types used for reporting purposes.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * A function to generate a filename with a possible prefix, a timestamp and one of the possible extensions provided.
 * @param {string} fileExtension Use one of the values from the FILE_EXTENSIONS object defined previously.
 * @param {string} [fileNamePrefix] A prefix to be appended at the beginning of the filename if provided.  Defaults to an empty string.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### wdio.conf.js code
`wdio.conf.js` फ़ाइल पर निम्न इम्पोर्ट स्टेटमेंट जोड़ें:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Replace <Utils.js file path> with actual relative path to file Utils.js

```

`wdio.conf.js` फ़ाइल पर निम्न `afterTest` हुक को परिभाषित करें। यदि आपके पास इस हुक में पहले से ही काम करने वाला कोड है, तो नीचे दिए गए कोड को उसमें जोड़ें।
```js
afterTest: async function (test, context, result) {
        // Screenshot saving and attaching logic regardless of test outcome.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // XML attaching logic on test failure.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### अपेक्षित व्यवहार
प्रोजेक्ट के कॉन्फिग में इस कोड को स्थापित करने के साथ, अपेक्षा यह है कि हर बार जब एक `it` टेस्ट चलता है, टेस्ट के परिणाम के बावजूद, रन के अंत में एक स्क्रीनशॉट लिया जाएगा और Allure रिपोर्ट में इसके प्रासंगिक अनुभाग से जोड़ा जाएगा। टेस्ट के फेल होने की विशिष्ट स्थिति में, XML प्रारूप में ऐप की स्थिति का एक सोर्स स्नैपशॉट भी Allure रिपोर्ट में टेस्ट के अनुभाग से जुड़ जाएगा।

### नोट्स
* बॉक्स से बाहर Allure रिपोर्ट स्क्रीनशॉट को `.png` फॉर्मेट में सपोर्ट करती है। इस सेवा में मेथड ओवरराइड्स इमेज को इसके बजाय `.jpg` फॉर्मेट में सपोर्ट करते हैं।
* XML अटैचमेंट्स को Allure रिपोर्ट में या ब्राउज़र में अलग टैब में खोला जा सकता है।