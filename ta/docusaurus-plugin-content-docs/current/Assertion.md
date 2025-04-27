---
id: assertion
title: உறுதிப்படுத்தல்
---

[WDIO டெஸ்ட்ரன்னர்](https://webdriver.io/docs/clioptions) ஒரு உள்ளிணைந்த உறுதிப்படுத்தல் நூலகத்துடன் வருகிறது, இது உலாவியின் பல்வேறு அம்சங்கள் அல்லது உங்கள் (வலை) பயன்பாட்டில் உள்ள கூறுகளில் சக்திவாய்ந்த உறுதிப்படுத்தல்களைச் செய்ய உங்களை அனுமதிக்கிறது. இது [Jests Matchers](https://jestjs.io/docs/en/using-matchers) செயல்பாட்டை கூடுதலாக, e2e சோதனைக்கு உகந்ததாக மேம்படுத்தப்பட்ட பொருத்திகளுடன் விரிவுபடுத்துகிறது, எ.கா.:

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

## Chai இலிருந்து மாற்றுதல்

[Chai](https://www.chaijs.com/) மற்றும் [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) இரண்டும் ஒன்றாக இருக்க முடியும், மேலும் சில சிறிய சீரமைப்புகளுடன் expect-webdriverio க்கு சுமூகமான மாற்றத்தை அடைய முடியும். நீங்கள் WebdriverIO v6க்கு மேம்படுத்தியிருந்தால், முன்னிருப்பாகவே `expect-webdriverio`இலிருந்து அனைத்து உறுதிப்படுத்தல்களையும் நீங்கள் அணுக முடியும். அதாவது, உலகளாவிய அளவில் நீங்கள் `expect` ஐப் பயன்படுத்தும் போதெல்லாம் `expect-webdriverio` உறுதிப்படுத்தலை அழைப்பீர்கள். [`injectGlobals`](/docs/configuration#injectglobals) ஐ `false` என்று அமைக்காத வரை அல்லது உலகளாவிய `expect` ஐ Chai ஐப் பயன்படுத்த மேலெழுதாத வரை இது இருக்கும். இந்த சூழ்நிலையில், நீங்கள் தேவைப்படும் இடத்தில் expect-webdriverio தொகுப்பை வெளிப்படையாக இறக்குமதி செய்யாமல் எந்த expect-webdriverio உறுதிப்படுத்தல்களையும் அணுக முடியாது.

இந்த வழிகாட்டி உள்ளூர் அளவில் மேலெழுதப்பட்டிருந்தால் Chai இலிருந்து எவ்வாறு மாற்றுவது மற்றும் உலகளாவிய அளவில் மேலெழுதப்பட்டிருந்தால் Chai இலிருந்து எவ்வாறு மாற்றுவது ஆகியவற்றின் எடுத்துக்காட்டுகளைக் காட்டும்.

### உள்ளூர்

ஒரு கோப்பில் Chai வெளிப்படையாக இறக்குமதி செய்யப்பட்டதாக கருதுவோம், எ.கா.:

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

இந்த குறியீட்டை மாற்ற, Chai இறக்குமதியை அகற்றி, புதிய expect-webdriverio உறுதிப்படுத்தல் முறை `toHaveUrl` ஐப் பயன்படுத்தவும்:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

ஒரே கோப்பில் Chai மற்றும் expect-webdriverio இரண்டையும் பயன்படுத்த விரும்பினால், நீங்கள் Chai இறக்குமதியைத் தக்கவைத்துக் கொண்டு `expect` என்பது முன்னிருப்பாக expect-webdriverio உறுதிப்படுத்தலுக்கு இயல்புநிலையாக இருக்கும், எ.கா.:

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

`expect` Chai ஐப் பயன்படுத்த உலகளாவிய அளவில் மேலெழுதப்பட்டதாகக் கருதுவோம். expect-webdriverio உறுதிப்படுத்தல்களைப் பயன்படுத்த நாம் "before" ஹுக்கில் உலகளாவிய மாறியை அமைக்க வேண்டும், எ.கா.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

இப்போது Chai மற்றும் expect-webdriverio ஒன்றுக்கொன்று பயன்படுத்தப்படலாம். உங்கள் குறியீட்டில் நீங்கள் Chai மற்றும் expect-webdriverio உறுதிப்படுத்தல்களை பின்வருமாறு பயன்படுத்துவீர்கள், எ.கா.:

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

மாற்றுவதற்கு, ஒவ்வொரு Chai உறுதிப்படுத்தலையும் மெதுவாக expect-webdriverio க்கு மாற்றுவீர்கள். குறியீட்டு தளத்தில் உள்ள அனைத்து Chai உறுதிப்படுத்தல்களும் மாற்றப்பட்ட பிறகு, "before" ஹுக்கை நீக்கலாம். `wdioExpect` இன் அனைத்து நிகழ்வுகளையும் `expect` க்கு மாற்றுவதற்கான ஒரு உலகளாவிய தேடல் மற்றும் மாற்றீடு மாற்றத்தை முடிக்கும்.