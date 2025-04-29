---
id: wdio-roku-service
title: ரோகு சேவை
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service) ஐப் பார்க்கவும்
இந்த சேவை WebdriverIO இன் பல பகுதிகளை மாற்றியமைக்கிறது, அவற்றை ரோகு பயன்பாடுகளுடன் பயன்படுத்த அனுமதிக்கிறது மற்றும் சோதனை செய்யும் போது ரோகுவை கட்டுப்படுத்த [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) அணுகலை வழங்குகிறது.

## தேவைகள்

### ரோகு
ஒரு சோதனை சேனல்/channel.zip மற்றும் உங்கள் மேக் போன்ற அதே நெட்வொர்க்கில் உள்ள ரோகு சாதனம் (டெவலப்பர் முறை இயக்கப்பட்டுள்ளது).

### WebdriverIO
இது ஒரு தனித்து இயங்கும் தயாரிப்பு அல்ல -- இது WebdriverIO சோதனை கட்டமைப்பு செருகுநிரலாக (அல்லது அவர்களின் சொற்கோவையில் சேவையாக) பயன்படுத்தப்படுகிறது. இதைப் பயன்படுத்துவதற்கு முன், நீங்கள் `npm init wdio@latest` ஐ இயக்குவதன் மூலம் WDIO க்கான அமைப்பை முடிக்க வேண்டும்.

அமைப்பு படிகளை செய்யும்போது, நீங்கள் அனைத்து கேள்விகள்/விருப்பங்களையும் வழிநடத்த வேண்டாம், இனிஷியல் கட்டத்தில் பின்வரும் தேர்வுகளை மட்டும் தேர்வு செய்யலாம்:
- Roku Testing (குறிப்பு: உங்கள் ரெப்போ ரோகு சோதனைக்கு மட்டுமே பயன்படுத்தப்பட்டால் இதைப் பயன்படுத்தவும், ஏனெனில் இது இயல்புநிலையாகவும் நிறுவப்பட்ட ஒரே சேவையாகவும் மாறும். இல்லையெனில், பல சேவைகளை நிறுவ முடியும் என்பதால் E2E Testing ஐப் பயன்படுத்தவும்.) 
- On my local machine (E2E மட்டும்)
- Web (E2E மட்டும்)
- Chrome (E2E மட்டும்)
- Mocha
- Typescript [modules works for TS and JS, so choose whichever]
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
சோதனைகளை எழுத Typescript ஐப் பயன்படுத்த விரும்பினால், Webdriverio ஆல் உருவாக்கப்பட்ட tsconfig.json கோப்பில் பின்வரும் விருப்பங்கள் அமைக்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்த வேண்டும்.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
பின்னர் கீழே விவரிக்கப்பட்டுள்ளபடி உங்கள் சோதனைகளில் இறக்குமதி செய்வதன் மூலம் சேவையைப் பயன்படுத்தலாம்.

### WDIO Config
தற்போது, ஒரு ரோகு சாதனத்திற்கு மட்டுமே சோதனை ஆதரிக்கப்படுகிறது. பின்வரும் கான்ஃபிக் புதுப்பிப்புகள் தேவை:
* `maxInstances` மற்றும் `maxInstancesPerCapability` 1 ஆக இருக்க வேண்டும். பல சாதனங்களில் தானாகவே சோதனை செய்வது ஆதரிக்கப்படவில்லை மற்றும் ரோகுவுக்கு நகலெடுக்கப்பட்ட கட்டளைகள் அனுப்பப்படும். ஒரு திறன் மட்டுமே இருக்க வேண்டும். 
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

* ஒவ்வொரு இடைவெளியும் ரோகுவிலிருந்து xml ஐப் பதிவிறக்குவதை உள்ளடக்கியதால், `waitforInterval` மற்றும் `waitforTimeout` ஐ அதிகரிக்க பரிந்துரைக்கப்படுகிறது. `browser.debug()` அம்சத்திலிருந்து அதிகமாகப் பெற, மேம்பாட்டு அறைக்கான mocha டெஸ்ட்ரன்னர் டைம்அவுட்டை 5+ நிமிடங்களுக்கு நீட்டிக்க விரும்பலாம்.
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

உங்கள் முதல் சோதனையை எழுத நீங்கள் தயாராக இருக்கிறீர்கள்!

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

உங்கள் சோதனையை நிறுத்தி பிழைதிருத்தம் மற்றும் சோதனை எழுதுவதற்கு wdio இல் உள்ள `browser.debug()` அம்சத்தைப் பயன்படுத்துவதும் ஊக்குவிக்கப்படுகிறது:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // the test halts, a REPL becomes available for commands

```
chrome headless இல் இல்லை என்றால், `openRokuXML()` (`waitForX` அல்லது `expect` மூலம்) கடைசியாக அழைக்கப்பட்ட நேரத்தைக் காணலாம். உங்கள் டெர்மினலில் REPL ஐப் பயன்படுத்தி, எந்த செல்லுபடியாகும் `$` கட்டளைகளையும், சேர்க்கப்பட்ட சில முக்கிய தனிப்பயன் (`browser.openRokuXML()` மற்றும் `browser.saveScreenshot('path/to/ss.jpg')`) பயன்படுத்தலாம் -- `controller` வகுப்பு `browser` பொருளுடன் இணைக்கப்படவில்லை, எனவே நீங்கள் தற்போது அவற்றைப் பயன்படுத்த முடியாது. அதிர்ஷ்டவசமாக, நீங்கள் ரோகுவுக்கு அருகில் அமர்ந்து, வழிநடத்த பயன்படுத்தக்கூடிய ரிமோட் வைத்திருக்கிறீர்கள் மற்றும் அவ்வப்போது `browser.openRokuXML()` ஐ அழைத்து, பக்க நிலைக்கு என்ன நடந்தது என்பதைப் பார்க்கலாம்! மேலும் XML ஆனது chrome உலாவியில் xpathing உடன் இயல்பாகவே செயல்படுகிறது என்பதை நினைவில் கொள்ளுங்கள், எனவே நீங்கள் debug இன் போது chrome console இல் நேரடியாக உங்கள் தேர்வாளர்களை மதிப்பீடு செய்யலாம் / உருவாக்கலாம்.

### .env
`.env.example` கோப்பைப் பார்க்கவும். அதை நகலெடுத்து இந்த சேவையைப் பயன்படுத்தும் உங்கள் WebdriverIO திட்டத்திற்குள் `.env` என்று பெயர் மாற்றவும். அதை உங்கள் .gitignore இலும் வைக்க விரும்புவீர்கள்.

* `ROKU_IP` உங்கள் ரோகுவின் IP ஆக இருக்க வேண்டும். கட்டளைகள் இந்த IP ஐப் பயன்படுத்தி அதனுடன் தொடர்பு கொள்ளும். இது தேவைப்படுகிறது.
* `ROKU_USER` மற்றும் `ROKU_PW`: ஒரு காப்பகத்தை நிறுவுவதற்கும், ஸ்கிரீன்ஷாட்கள் எடுப்பதற்கும் உள்நுழைவு சான்றுகள் தேவை.
* `ROKU_APP_PATH` ரோகு சேனல் zip கோப்பின் முழுமையான பாதையாக இருக்க வேண்டும்.
* `ROKU_CHANNEL_ID` உங்கள் ரோகு சேனலின் சேனல் ID ஆக இருக்க வேண்டும் (இது பொதுவாக "dev").
* `DEBUG=wdio-roku-service` debug செய்திகளை இயக்கும். நீங்கள் அவற்றை விரும்பினால் வரியின் தொடக்கத்தில் உள்ள '#' ஐ அகற்றவும்.

## மாற்றப்பட்ட செயல்பாடுகள்
### Browser
* `waitUntil` மாற்றங்களைச் சரிபார்க்க ஒவ்வொரு நிகழ்ச்சியிலும் ரோகுவிலிருந்து xml ஐப் பெறும்.
* `saveScreenshot` தற்போதைய திரையிலிருந்து ரோகுவிலிருந்து ஒரு ஸ்கிரீன்ஷாட்டைப் பதிவிறக்கும். குறிப்பாக, இந்த ஸ்கிரீன்ஷாட்கள் WebdriverIO பொதுவாகப் பயன்படுத்தும் .png க்கு பதிலாக .jpg வடிவத்தில் உள்ளன.
* `openRokuXML` காத்திருப்பதற்குப் பதிலாக நீங்கள் கைமுறையாகச் செய்ய வேண்டுமென்றால் ரோகுவிலிருந்து xml ஐப் பெறும்.

### Elements
* அனைத்து காத்திருப்புகளும் Browser போலவே ஆதரிக்கப்படுகின்றன. `waitForClickable` என்பது `waitForDisplayed` க்கு மேப் செய்யப்பட்டுள்ளது, மற்றும் `waitForStable` என்பது `waitForExist` க்கு மேப் செய்யப்பட்டுள்ளது.
* `click`, `doubleClick`, மற்றும் `moveTo` ஆதரிக்கப்படவில்லை. நீங்கள் பயன்பாட்டை கைமுறையாக வழிநடத்த வேண்டும்.
* `isFocused` உறுப்படியில் `focused` பண்புக்கூறு உண்மையாக உள்ளதா என்பதைச் சரிபார்க்கும்.
* `isDisplayed` உறுப்படியில் `bounds` பண்புக்கூறு உள்ளதா என்பதையும், `visible` false ஆக அமைக்கப்படவில்லை என்பதையும் சரிபார்க்கும். `withinViewport` அமைக்கப்பட்டிருந்தால், வரம்புகள் ரோகுவின் திரை அளவுடன் ஒப்பிடப்படும்.
* `getSize` மற்றும் `getLocation` `bounds` பண்புக்கூறிலிருந்து மதிப்புகளை எடுக்கும், அளவுக்கு 0 மற்றும் நிலைக்கு -Infinity ஐத் திருப்பித் தரும், அது இல்லாவிட்டால்.

மற்ற செயல்பாடுகள் மாற்றப்படவில்லை, ஆனால் பல இன்னும் எதிர்பார்த்தபடி செயல்படுகின்றன.

### Matchers
பெரும்பாலான பொருத்திகள் காத்திருக்கும் போது xml ஐப் பெறுவதற்காக புதுப்பிக்கப்பட்டுள்ளன. சிலவற்றுக்கு சற்று வித்தியாசமான செயல்பாடு உள்ளது.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight`, மற்றும் `toHaveAttribute` ஆகியவை எல்லாம் Element இன் மாற்றங்களைக் கருத்தில் கொண்டு எதிர்பார்த்தபடி செயல்படுகின்றன.
* `toHaveElementProperty` என்பது `toHaveAttribute` க்கு மேப் செய்யப்பட்டுள்ளது.
* `toHaveElementClass` உறுப்படியின் `name` பண்புக்கூறைச் சரிபார்க்கிறது.
* `toHaveId` என்பது `toHaveElementClass` க்கு மேப் செய்யப்பட்டுள்ளது.
* `toHaveText` உறுப்படியின் `text` பண்புக்கூறைச் சரிபார்க்கிறது.
* `toHaveChildren` உறுப்படியின் `children` பண்புக்கூறைச் சரிபார்க்கிறது.
* `toHaveHTML` xml ஐ HTML போல நடத்தும், இருப்பினும் இது மிகவும் பயனுள்ளதாக இல்லாமல் இருக்கலாம்.

பின்வருவன தற்போது ஆதரிக்கப்படவில்லை:
* `toBeSelected` - தேர்ந்தெடுக்கப்பட்ட பொத்தான்கள் எப்படி தோன்றும் என்பதைத் தீர்மானித்த பிறகு விரைவில் ஆதரிக்கப்படலாம், வித்தியாசம் இருந்தால்.
* `toBeChecked` - சரிபார்ப்பு பெட்டிகள் எப்படித் தோன்றும் என்பதைத் தீர்மானித்த பிறகு விரைவில் ஆதரிக்கப்படலாம், வித்தியாசம் இருந்தால்.
* `toHaveComputedLabel` - உங்கள் ரோகு உறுப்புகளில் இதற்கு சமமானது இருந்தால், `toHaveAttribute` உடன் பண்புக்கூறைச் சரிபார்க்கவும்.
* `toHaveComputedRole` - உங்கள் ரோகு உறுப்புகளில் இதற்கு சமமானது இருந்தால், `toHaveAttribute` உடன் பண்புக்கூறைச் சரிபார்க்கவும்.
* `toHaveHref` - உங்கள் ரோகு உறுப்புகளில் URL கள் இருந்தால், `toHaveAttribute` உடன் பண்புக்கூறைச் சரிபார்க்கவும்.
* `toHaveStyle` - xml உறுப்புகளுக்கு ஸ்டைல்கள் இல்லை.
* `toHaveClipboardText` - இது தெரியவில்லை.
* `toHaveTitle` - தலைப்பு என்பது xml இன் சீரற்ற முறையில் உருவாக்கப்பட்ட தற்காலிக கோப்பு பெயராக இருக்கும்.
* `toHaveUrl` - URL என்பது உங்கள் கணினியில் xml கோப்புக்கான பாதையாக இருக்கும்.

## பயன்பாடு
### சேனல் நிறுவல்

இதற்கு உங்கள் சேனலுக்கு ஒரு ID ஒதுக்கப்பட்டிருக்க வேண்டும்.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

காப்பகம் நிறுவல்

பல டெவலப்பர்கள் வெவ்வேறு இடங்களிலும்/கோப்பு பெயர்களிலும் வைத்திருக்கக்கூடும் என்பதால், பாதையை .env இல் சேமிக்க பரிந்துரைக்கப்படுகிறது.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

முன்கூட்டியே நிறுவப்பட்ட சேனல்

சோதனைக்கு முன் நீங்கள் சேனலை முன்பே நிறுவியிருந்தால், நீங்கள் அதை எளிதாக தொடங்கலாம்.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Close the channel if it's already open. If the channel supports instant resume, this will merely background it
    await exitChannel();
    // Using the channel ID of 'dev' will launch the sideloaded application.
    await launchChannel('dev');
}
```

### சோதனை
`wdio-roku-service/controller` ரோகுவுக்கு பொத்தான் அழுத்தங்களை அனுப்பும் திறனை வழங்குகிறது. `keySequence` முக்கியமானது, வரிசையில் பல பொத்தான் அழுத்தங்களை அனுப்புகிறது.
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

`wdio-roku-service/controller` இல் பொத்தான்களை அழுத்திப் பிடித்தல் அல்லது விடுவிப்பதற்கான செயல்பாடுகளும், கீபோர்டில் உரையைத் தட்டச்சு செய்வதற்கான செயல்பாடுகளும் உள்ளன.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` சேனல் தொடர்பான செயல்பாட்டை வழங்குகிறது. `inputChannel` உங்கள் பயன்பாட்டிற்கு தன்னிச்சையான தகவல்களை அனுப்ப அனுமதிக்கிறது.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### பிற செயல்பாடுகள்
`wdio-roku-service/info` பயன்பாட்டு ஐகான் அல்லது அனாதை நோடுகளைப் பெறுவது போன்ற பலவிதமான செயல்பாடுகளை வழங்குகிறது.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` மிகவும் குறிப்பிட்ட எதையும் செய்ய வேண்டியிருந்தால் ECP உடன் நேரடி இடைமுகமாகும்.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## பொதுவான சிக்கல்கள்
* ரோகு உறுப்புகளில் தங்கள் டேக்குகளுக்கு இடையில் இல்லாமல் 'text' பண்புக்கூறில் உரை உள்ளது. தேர்வாளர்களைச் செய்யும்போது, `$('element=Text')` செய்வது கிட்டத்தட்ட எல்லா உறுப்புகளுக்கும் வேலை செய்யாது. அதற்குப் பதிலாக, `$('element[text=Text]')` செய்ய வேண்டும்.

## அம்ச திட்டம்
* இந்தச் சேவையை `npm init wdio@latest` கேள்வித்தாள் போது நிறுவ அனுமதிக்கும் ஒரு PR விரைவில் சமர்ப்பிக்கப்படும்.
* தற்போது ரோகுவுடன் Socket தொடர்பு மதிப்பீடு செய்யப்படுகிறது, அதனால் உறங்கும் ரோகுவை எழுப்புவதற்கான வழி போன்ற பல அம்சங்களை செயல்படுத்த முடியும்.
* நெட்வொர்க் செயல்பாட்டிலிருந்து விசைகளைப் பெற அனுமதிக்கும் நெட்வொர்க் ப்ராக்ஸி அம்சம்(கள்).

## Allure Reporting ஐப் பயன்படுத்தி ஸ்கிரீன்ஷாட்கள் மற்றும் XML கோப்புகளை இணைத்தல்

பெட்டியிலிருந்து, Allure Reporting ஆனது சோதனை இயக்கத்தின் எந்த நேரத்திலும் ரோகு பயன்பாட்டின் தற்போதைய நிலையைக் குறிக்கும் பயன்பாட்டு ஸ்கிரீன்ஷாட்களை அல்லது XML குறியீட்டின் நகலை உருவாக்க அமைப்பு இல்லை. பின்வரும் ஆவணங்கள் ஒவ்வொரு முறையும் `it` சோதனை அதன் இயக்கத்தை முடிக்கும்போது பயன்பாட்டின் தற்போதைய நிலையின் ஸ்கிரீன்ஷாட் உருவாக்கப்பட்டு Allure Report இல் இணைக்கப்படுவதை உறுதிசெய்ய இதை எவ்வாறு கையாள்வது என்பதை விளக்குகிறது. `it` சோதனை இயக்கம் தோல்வியுறும் போதெல்லாம் தற்போதைய ரோகு பயன்பாட்டின் நிலையைக் குறிக்கும் XML இன் மூல ஸ்னாப்ஷாட்டைப் பெறவும் இது அனுமதிக்கிறது.

Allure Reporter பற்றிய முழு ஆவணங்களுக்கு, @wdio/allure-reporter docs https://webdriver.io/docs/allure-reporter/ ஐப் பார்வையிடவும்

### Utils.js சார்பு
பின்வரும் குறியீட்டை `Utils.js` என்ற கோப்பில் சேர்க்கவும். இந்தக் கோப்பு உங்கள் `/helpers` கோப்புறையில் அல்லது அதற்கு இணையானதில் இருக்கலாம்.
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

### wdio.conf.js குறியீடு
`wdio.conf.js` கோப்பில் பின்வரும் import அறிக்கைகளைச் சேர்க்கவும்:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Replace <Utils.js file path> with actual relative path to file Utils.js

```

`wdio.conf.js` கோப்பில் பின்வரும் `afterTest` ஹுக்கை வரையறுக்கவும். இந்த ஹுக்கில் ஏற்கனவே செயல்படும் குறியீடு இருந்தால், கீழே வழங்கப்பட்ட குறியீட்டை அதில் சேர்க்கவும்.
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

### எதிர்பார்க்கப்படும் நடத்தை
திட்டத்தின் கட்டமைப்பில் இந்த குறியீடு இருப்பதால், சோதனையின் முடிவைப் பொருட்படுத்தாமல், ஒவ்வொரு முறையும் ஒரு `it` சோதனை இயக்கப்படும்போது, ஓட்டத்தின் முடிவில் ஒரு ஸ்கிரீன்ஷாட் எடுக்கப்பட்டு Allure அறிக்கையில் அதன் தொடர்புடைய பிரிவில் இணைக்கப்படும் என்று எதிர்பார்க்கப்படுகிறது. சோதனை தோல்வியுற்ற குறிப்பிட்ட சந்தர்ப்பத்தில், XML வடிவத்தில் பயன்பாட்டின் நிலையின் மூல ஸ்னாப்ஷாட்டும் Allure அறிக்கையில் சோதனையின் பிரிவில் இணைக்கப்படும்.

### குறிப்புகள்
* பெட்டியிலிருந்து Allure அறிக்கைகள் `.png` வடிவத்தில் ஸ்கிரீன்ஷாட்களை ஆதரிக்கின்றன. இந்த சேவையில் முறை மாற்றங்கள் அதற்கு பதிலாக `.jpg` வடிவத்தில் படத்தை ஆதரிக்கின்றன.
* XML இணைப்புகளை Allure அறிக்கையில் உலாவலாம் அல்லது உலாவியில் தனி தாவலில் திறக்கலாம்.