---
id: wdio-roku-service
title: रोकु सेवा
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---


> wdio-roku-service एक तृतीय-पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
यह सेवा WebdriverIO के कई भागों को ओवरराइड करती है ताकि उन्हें रोकु ऐप्स के साथ उपयोग किया जा सके और [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) तक पहुंच प्रदान करती है ताकि परीक्षण के दौरान रोकु को नियंत्रित किया जा सके।

## आवश्यकताएँ

### रोकु
एक टेस्ट चैनल/channel.zip और एक रोकु डिवाइस (डेवलपर मोड सक्षम के साथ) आपके मैक के साथ उसी नेटवर्क पर।

### WebdriverIO
यह एक स्टैंडअलोन प्रोडक्ट नहीं है -- इसका उपयोग WebdriverIO टेस्ट फ्रेमवर्क प्लगइन (या उनकी भाषा में सेवा) के रूप में किया जाता है। इसका उपयोग करने से पहले, आपको `npm init wdio@latest` चलाकर WDIO के लिए सेटअप से गुज़रना चाहिए।

सेटअप चरणों से गुज़रते समय, ताकि आपको सभी प्रश्नों/विकल्पों को नेविगेट न करना पड़े, आप इनिट फेज के दौरान निम्नलिखित चयन कर सकते हैं:
- Roku Testing (नोट: इसका उपयोग तभी करें जब आपका रेपो केवल रोकु टेस्टिंग के लिए उपयोग किया जाएगा क्योंकि यह डिफ़ॉल्ट और केवल इंस्टॉल की गई सेवा बन जाएगी। अन्यथा, E2E Testing का उपयोग करें ताकि आप कई सेवाओं को इंस्टॉल कर सकें।)
- On my local machine (केवल E2E)
- Web (केवल E2E)
- Chrome (केवल E2E)
- Mocha
- Typescript [modules TS और JS दोनों के लिए काम करते हैं, इसलिए जो भी चाहें चुनें]
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
यदि आप टेस्ट लिखने के लिए Typescript का उपयोग करना चाहते हैं, तो आपको यह सुनिश्चित करने की आवश्यकता है कि Webdriverio द्वारा जनरेट किए गए tsconfig.json फ़ाइल में निम्नलिखित विकल्प सेट हैं।
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
फिर आप सेवा का उपयोग नीचे विस्तृत रूप से अपने टेस्ट में इम्पोर्ट करके कर सकते हैं।

### WDIO Config
वर्तमान में, परीक्षण केवल एक रोकु डिवाइस के लिए समर्थित है। निम्नलिखित कॉन्फ़िग अपडेट आवश्यक हैं:
* `maxInstances` और `maxInstancesPerCapability` 1 होना चाहिए। एकाधिक डिवाइसों पर स्वचालित रूप से परीक्षण समर्थित नहीं है और इससे रोकु को डुप्लिकेट कमांड भेजे जा सकते हैं। केवल एक क्षमता होनी चाहिए।
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

* `waitforInterval` और `waitforTimeout` को बढ़ाने की सिफारिश की जाती है, क्योंकि प्रत्येक अंतराल में रोकु से XML डाउनलोड करना शामिल है। `browser.debug()` फीचर से अधिक लाभ प्राप्त करने के लिए, आप विकास कक्ष के लिए अपने mocha टेस्टरनर टाइमआउट को 5+ मिनट तक बढ़ाने का विकल्प भी चुन सकते हैं।
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

यह भी प्रोत्साहित किया जाता है कि आप wdio में `browser.debug()` फीचर का उपयोग करें ताकि डीबगिंग और टेस्ट ऑथरिंग के लिए अपने टेस्ट को रोक सकें:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // the test halts, a REPL becomes available for commands

```
यदि क्रोम हेडलेस नहीं है, तो आप अंतिम बार देख सकते हैं जब `openRokuXML()` को कॉल किया गया था (संभवतः `waitForX` या `expect` के माध्यम से)। अपने टर्मिनल में REPL का उपयोग करके, आप किसी भी मान्य `$` कमांड का उपयोग कर सकते हैं, और कुछ मुख्य कस्टम कमांड्स जोड़े गए हैं (`browser.openRokuXML()` और `browser.saveScreenshot('path/to/ss.jpg')`) -- `controller` क्लास `browser` ऑब्जेक्ट से अटैच नहीं है, इसलिए आप वर्तमान में उनका उपयोग नहीं कर सकते। सौभाग्य से, आप शायद रोकु के बगल में बैठे हैं और आपके पास एक रिमोट है जिसका उपयोग आप नेविगेट करने के लिए कर सकते हैं और कभी-कभार `browser.openRokuXML()` को कॉल करके देख सकते हैं कि पेज स्टेट के साथ क्या हुआ! और याद रखें कि XML क्रोम ब्राउज़र में xpathing के साथ नेटिव रूप से काम करता है, इसलिए आप डीबग के दौरान सीधे क्रोम कंसोल में अपने सेलेक्टर्स का मूल्यांकन/विकास कर सकते हैं।

### .env
`.env.example` फाइल देखें। इसे कॉपी करें और अपने WebdriverIO प्रोजेक्ट में `.env` के नाम से रीनेम करें जो इस सेवा का उपयोग करता है। आप शायद इसे अपने .gitignore में भी डालना चाहेंगे।

* `ROKU_IP` आपके रोकु का IP होना चाहिए। कमांड्स इस IP का उपयोग इसके साथ संवाद करने के लिए करेंगे। यह आवश्यक है।
* `ROKU_USER` और `ROKU_PW`: लॉगिन क्रेडेंशियल्स आर्काइव इंस्टॉल करने के साथ-साथ स्क्रीनशॉट लेने के लिए भी आवश्यक हैं।
* `ROKU_APP_PATH` रोकु चैनल ज़िप फाइल का एब्सल्यूट पाथ होना चाहिए।
* `ROKU_CHANNEL_ID` आपके रोकु चैनल का चैनल ID होना चाहिए (यह आमतौर पर "dev" होता है)।
* `DEBUG=wdio-roku-service` डीबग संदेशों को सक्षम करेगा। यदि आप उन्हें चाहते हैं तो लाइन के शुरू में '#' को हटा दें।

## बदली गई फंक्शन्स
### ब्राउज़र
* `waitUntil` परिवर्तनों की जांच के लिए प्रत्येक पुनरावृत्ति पर रोकु से xml फेच करेगा।
* `saveScreenshot` रोकु से वर्तमान स्क्रीन का स्क्रीनशॉट डाउनलोड करेगा। विशेष रूप से, ये स्क्रीनशॉट .jpg फॉर्मेट में हैं, न कि .png जिसे WebdriverIO आमतौर पर उपयोग करता है।
* `openRokuXML` रोकु से xml फेच करेगा यदि आपको इसे वेट्स के बजाय मैन्युअल रूप से करने की आवश्यकता है।

### एलिमेंट्स
* सभी वेट्स ब्राउज़र के समान ही समर्थित हैं। `waitForClickable` को `waitForDisplayed` पर मैप किया गया है, और `waitForStable` को `waitForExist` पर मैप किया गया है।
* `click`, `doubleClick`, और `moveTo` समर्थित नहीं हैं। आपको ऐप को मैन्युअल रूप से नेविगेट करना होगा।
* `isFocused` एलिमेंट पर `focused` एट्रिब्यूट के सत्य होने की जांच करेगा।
* `isDisplayed` एलिमेंट पर `bounds` एट्रिब्यूट की जांच करेगा, और यह कि `visible` false पर सेट नहीं है। यदि `withinViewport` सेट है, तो बाउंड्स को रोकु के स्क्रीन साइज़ के साथ तुलना की जाएगी।
* `getSize` और `getLocation` `bounds` एट्रिब्यूट से मान लेते हैं, यदि वह मौजूद नहीं है तो साइज़ के लिए 0 और पोजिशन के लिए -Infinity लौटाते हैं।

अन्य फंक्शन्स नहीं बदले गए हैं, लेकिन कई अभी भी अपेक्षित रूप से काम करते हैं।

### मैचर्स
अधिकांश मैचर्स को इंतज़ार करते समय xml फेच करने के लिए अपडेट किया गया है। कुछ में थोड़ा अलग फंक्शनैलिटी है।
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight`, और `toHaveAttribute` सभी एलिमेंट में किए गए परिवर्तनों के साथ अपेक्षित रूप से काम करते हैं।
* `toHaveElementProperty` को `toHaveAttribute` पर मैप किया गया है।
* `toHaveElementClass` एलिमेंट के `name` एट्रिब्यूट की जांच करता है।
* `toHaveId` को `toHaveElementClass` पर मैप किया गया है।
* `toHaveText` एलिमेंट के `text` एट्रिब्यूट की जांच करता है।
* `toHaveChildren` एलिमेंट के `children` एट्रिब्यूट की जांच करता है।
* `toHaveHTML` xml को HTML के रूप में ट्रीट करेगा, हालांकि यह शायद बहुत उपयोगी नहीं है।

निम्नलिखित वर्तमान में समर्थित नहीं हैं:
* `toBeSelected` - यह जल्द ही समर्थित हो सकता है, चयनित बटनों के xml कैसे दिखते हैं यह निर्धारित करने के बाद, अगर कोई अंतर है।
* `toBeChecked` - यह जल्द ही समर्थित हो सकता है, चेक्ड चेकबॉक्स के xml कैसे दिखते हैं यह निर्धारित करने के बाद, अगर कोई अंतर है।
* `toHaveComputedLabel` - यदि आपके रोकु एलिमेंट्स पर इसका कोई समतुल्य है, तो `toHaveAttribute` के साथ एट्रिब्यूट की जांच करें।
* `toHaveComputedRole` - यदि आपके रोकु एलिमेंट्स पर इसका कोई समतुल्य है, तो `toHaveAttribute` के साथ एट्रिब्यूट की जांच करें।
* `toHaveHref` - यदि आपके रोकु एलिमेंट्स पर URL हैं, तो `toHaveAttribute` के साथ एट्रिब्यूट की जांच करें।
* `toHaveStyle` - xml एलिमेंट्स में स्टाइल नहीं होते हैं।
* `toHaveClipboardText` - यह ज्ञात नहीं है।
* `toHaveTitle` - शीर्षक xml का रैंडम जनरेट किया गया अस्थायी फ़ाइलनाम होगा।
* `toHaveUrl` - URL आपके कंप्यूटर पर xml फ़ाइल का पाथ होगा।

## उपयोग
### चैनल इंस्टॉलेशन

इसके लिए आपके चैनल को एक असाइन किया गया ID होना आवश्यक है।
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

आर्काइव इंस्टॉलेशन

पाथ को .env में स्टोर करने की सिफारिश की जाती है, खासकर यदि आपके पास कई डेवलपर्स हैं जिनके पास अलग-अलग लोकेशन और/या फ़ाइल नाम हो सकते हैं।
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

पहले से इंस्टॉल किया गया चैनल

यदि आपने परीक्षण से पहले ही चैनल को स्वयं इंस्टॉल कर लिया है, तो आप बस इसे लॉन्च कर सकते हैं।
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Close the channel if it's already open. If the channel supports instant resume, this will merely background it
    await exitChannel();
    // Using the channel ID of 'dev' will launch the sideloaded application.
    await launchChannel('dev');
}
```

### टेस्टिंग
`wdio-roku-service/controller` रोकु को बटन प्रेस भेजने की क्षमता प्रदान करता है। `keySequence` मुख्य है, जो क्रम में कई बटन प्रेस भेजता है।
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

`wdio-roku-service/controller` में बटन को होल्ड या रिलीज़ करने के साथ-साथ कीबोर्ड में टेक्स्ट टाइप करने के लिए फंक्शन्स भी हैं।
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### डीपलिंकिंग
`wdio-roku-service/channel` चैनल-संबंधित फंक्शनैलिटी प्रदान करता है। `inputChannel` आपको अपने ऐप को मनमाना जानकारी भेजने की अनुमति देता है।
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### अन्य फंक्शन्स
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

## सामान्य समस्याएँ
* रोकु एलिमेंट्स में उनका टेक्स्ट उनके टैग के बीच नहीं, 'text' एट्रिब्यूट में होता है। सेलेक्टर्स का उपयोग करते समय, `$('element=Text')` लगभग हर एलिमेंट के लिए काम नहीं करेगा। इसके बजाय, आपको `$('element[text=Text]')` करना होगा।

## फीचर रोडमैप
* जल्द ही एक PR सबमिट किया जाएगा जो `npm init wdio@latest` प्रश्नावली के दौरान इस सेवा को इंस्टॉल करने की अनुमति देता है।
* वर्तमान में रोकु के साथ सॉकेट कम्युनिकेशन का मूल्यांकन किया जा रहा है ताकि अधिक फीचर्स को टूल किया जा सके, जैसे स्लीपिंग रोकु को वेक करने का तरीका।
* नेटवर्क प्रॉक्सी फीचर जो नेटवर्क गतिविधि के आधार पर कीइंग की अनुमति देता है।

## एल्यूर रिपोर्टिंग का लाभ उठाना स्क्रीनशॉट और XML फाइलों के साथ

आउट ऑफ द बॉक्स, एल्यूर रिपोर्टिंग में ऐप के स्क्रीनशॉट या टेस्ट एक्सेक्यूशन के किसी भी बिंदु पर रोकु ऐप की वर्तमान स्थिति का प्रतिनिधित्व करने वाले XML कोड की कॉपी जनरेट करने के लिए कोई कॉन्फिगरेशन नहीं है। निम्नलिखित दस्तावेज़ीकरण इस मुद्दे को हल करने का तरीका बताता है ताकि हर बार जब `it` टेस्ट अपना रन पूरा करता है, तो ऐप की वर्तमान स्थिति का स्क्रीनशॉट जनरेट होता है और एल्यूर रिपोर्ट से जुड़ जाता है। यह आपको XML का स्रोत स्नैपशॉट भी प्राप्त करने की अनुमति देता है जो वर्तमान रोकु ऐप की स्थिति का प्रतिनिधित्व करता है जब कभी `it` टेस्ट रन विफल होता है।

एल्यूर रिपोर्टर पर पूर्ण दस्तावेज़ीकरण के लिए, कृपया @wdio/allure-reporter docs https://webdriver.io/docs/allure-reporter/ देखें

### Utils.js निर्भरता
निम्नलिखित कोड को `Utils.js` नामक फ़ाइल में जोड़ें। यह फ़ाइल आपके `/helpers` फोल्डर या इसी तरह में रह सकती है।
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

### wdio.conf.js कोड
`wdio.conf.js` फ़ाइल पर निम्नलिखित import स्टेटमेंट जोड़ें:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Replace <Utils.js file path> with actual relative path to file Utils.js

```

`wdio.conf.js` फ़ाइल पर निम्नलिखित `afterTest` हुक को परिभाषित करें। यदि आपके पास इस हुक में पहले से ही कार्यरत कोड है, तो नीचे दिए गए कोड को उसमें जोड़ें।
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
प्रोजेक्ट के कॉन्फिग में इस कोड को स्थापित करने के साथ, अपेक्षा यह है कि हर बार जब एक `it` टेस्ट चलाया जाता है, टेस्ट के परिणाम के बावजूद, रन के अंत में एक स्क्रीनशॉट लिया जाएगा और एल्यूर रिपोर्ट में उसके संबंधित अनुभाग से जोड़ा जाएगा। टेस्ट के विफल होने की विशिष्ट स्थिति में, ऐप की स्थिति का XML प्रारूप में एक स्रोत स्नैपशॉट भी एल्यूर रिपोर्ट में टेस्ट के अनुभाग से जुड़ा होगा।

### नोट्स
* आउट ऑफ द बॉक्स एल्यूर रिपोर्ट `.png` फॉर्मेट में स्क्रीनशॉट का समर्थन करते हैं। इस सेवा में मेथड ओवरराइड्स इसके बजाय `.jpg` फॉर्मेट में इमेज का समर्थन करते हैं।
* XML अटैचमेंट्स को एल्यूर रिपोर्ट में ही ब्राउज़ किया जा सकता है या ब्राउज़र में एक अलग टैब में खोला जा सकता है।