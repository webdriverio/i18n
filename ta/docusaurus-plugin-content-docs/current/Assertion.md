---
id: assertion
title: உறுதிப்படுத்தல்
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) உங்கள் உலாவியின் பல்வேறு அம்சங்களிலோ அல்லது உங்கள் (வலை) பயன்பாட்டில் உள்ள உறுப்புகளிலோ சக்திவாய்ந்த உறுதிப்படுத்தல்களைச் செய்ய உதவும் உள்ளமைக்கப்பட்ட உறுதிப்படுத்தல் நூலகத்துடன் வருகிறது. இது [Jests Matchers](https://jestjs.io/docs/en/using-matchers) செயல்பாட்டை கூடுதலாக, e2e சோதனைக்கு உகந்ததாக, பொருத்திகளுடன் விரிவுபடுத்துகிறது, எ.கா.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

அல்லது

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

முழு பட்டியலுக்கு, [expect API doc](/docs/api/expect-webdriverio) ஐப் பார்க்கவும்.

## மென்மையான உறுதிப்படுத்தல்கள்

WebdriverIO இயல்பாகவே expect-webdriver(5.2.0) இலிருந்து மென்மையான உறுதிப்படுத்தல்களைக் கொண்டுள்ளது. மென்மையான உறுதிப்படுத்தல்கள் ஒரு உறுதிப்படுத்தல் தோல்வியடைந்தாலும் உங்கள் சோதனைகள் தொடர்ந்து இயங்க அனுமதிக்கின்றன. எல்லா தோல்விகளும் சேகரிக்கப்பட்டு சோதனையின் இறுதியில் அறிக்கையிடப்படுகின்றன.

### பயன்பாடு

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Chai இலிருந்து மாற்றுதல்

[Chai](https://www.chaijs.com/) மற்றும் [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) ஒன்றாக இருக்க முடியும், மேலும் சில சிறிய சரிசெய்தல்களுடன் expect-webdriverio க்கு சுமூகமான மாற்றத்தை அடைய முடியும். WebdriverIO v6 க்கு நீங்கள் மேம்படுத்தியிருந்தால், இயல்பாகவே நீங்கள் `expect-webdriverio` இலிருந்து அனைத்து உறுதிப்படுத்தல்களையும் அப்படியே அணுகலாம். இதன் பொருள், நீங்கள் `expect` ஐப் பயன்படுத்தும் எந்த இடத்திலும் நீங்கள் `expect-webdriverio` உறுதிப்படுத்தலை அழைப்பீர்கள். [`injectGlobals`](/docs/configuration#injectglobals) ஐ `false` என அமைக்காத வரை அல்லது உலகளாவிய `expect` ஐ Chai பயன்படுத்த வேண்டாம் என மேலெழுதாத வரை இது இப்படித்தான் இருக்கும். இந்த நிலையில், தேவைப்படும் இடத்தில் expect-webdriverio தொகுப்பை வெளிப்படையாக இறக்குமதி செய்யாமல் எந்த expect-webdriverio உறுதிப்படுத்தல்களையும் நீங்கள் அணுக முடியாது.

இந்த வழிகாட்டி, Chai உள்ளூர் அளவில் மேலெழுதப்பட்டிருந்தால் எப்படி மாற்றுவது மற்றும் Chai உலகளாவிய அளவில் மேலெழுதப்பட்டிருந்தால் எப்படி மாற்றுவது போன்ற எடுத்துக்காட்டுகளைக் காட்டும்.

### உள்ளூர்

Chai ஒரு கோப்பில் வெளிப்படையாக இறக்குமதி செய்யப்பட்டதாக கருதுங்கள், எ.கா.:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

இந்த குறியீட்டை மாற்ற, Chai இறக்குமதியை அகற்றி, புதிய expect-webdriverio உறுதிப்படுத்தல் முறையான `toHaveUrl` ஐப் பயன்படுத்தவும்:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

நீங்கள் ஒரே கோப்பில் Chai மற்றும் expect-webdriverio இரண்டையும் பயன்படுத்த விரும்பினால், Chai இறக்குமதியை வைத்திருப்பீர்கள், மேலும் `expect` இயல்பாக expect-webdriverio உறுதிப்படுத்தலுக்கு இயல்புநிலையாக இருக்கும், எ.கா.:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### உலகளாவிய

`expect` உலகளாவிய அளவில் Chai ஐப் பயன்படுத்த மேலெழுதப்பட்டதாக கருதுங்கள். expect-webdriverio உறுதிப்படுத்தல்களைப் பயன்படுத்த நாம் "before" ஹுக்கில் உலகளாவிய மாறியை அமைக்க வேண்டும், எ.கா.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

இப்போது Chai மற்றும் expect-webdriverio ஒன்றாகப் பயன்படுத்தப்படலாம். உங்கள் குறியீட்டில் நீங்கள் Chai மற்றும் expect-webdriverio உறுதிப்படுத்தல்களைப் பின்வருமாறு பயன்படுத்துவீர்கள், எ.கா.:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

மாற்றுவதற்கு, நீங்கள் மெதுவாக ஒவ்வொரு Chai உறுதிப்படுத்தலையும் expect-webdriverio க்கு மாற்றுவீர்கள். குறியீட்டுத் தளத்தில் உள்ள அனைத்து Chai உறுதிப்படுத்தல்களும் மாற்றப்பட்டவுடன், "before" ஹுக்கை நீக்கலாம். `wdioExpect` இன் அனைத்து நிகழ்வுகளையும் `expect` ஆக மாற்ற உலகளாவிய தேடல் மற்றும் மாற்றம் செய்வது மாற்றத்தை முடிக்கும்.