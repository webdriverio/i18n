---
id: assertion
title: உறுதிப்படுத்தல் (Assertion)
description: "உள்ளமைக்கப்பட்ட expect-webdriverio நூலகத்தைப் பயன்படுத்தி உலாவி மற்றும் உறுப்பு நிலை மீது உறுதிப்படுத்தல்களை எழுதுங்கள், மென் உறுதிப்படுத்தல்களைப் (soft assertions) பயன்படுத்துங்கள் மற்றும் Chai-இலிருந்து இடம்பெயருங்கள்."
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) ஒரு உள்ளமைக்கப்பட்ட assertion நூலகத்துடன் வருகிறது. இது உலாவியின் பல்வேறு அம்சங்கள் அல்லது உங்கள் (வலை) பயன்பாட்டில் உள்ள உறுப்புகள் மீது சக்திவாய்ந்த உறுதிப்படுத்தல்களைச் செய்ய உங்களை அனுமதிக்கிறது. இது [Jests Matchers](https://jestjs.io/docs/en/using-matchers) செயல்பாட்டை e2e சோதனைக்கு உகந்ததாக்கப்பட்ட கூடுதல் matchers உடன் விரிவாக்குகிறது, எ.கா.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

அல்லது

```js
const selectOptions = await $$('form select>option')

// select-இல் குறைந்தது ஒரு option இருப்பதை உறுதிசெய்யவும்
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

முழுப் பட்டியலுக்கு, [expect API ஆவணத்தைப்](/docs/api/expect-webdriverio) பார்க்கவும்.

:::info Jasmine

Jasmine framework உடன், `expect` ஆனது Jasmine-இன் matchers மற்றும் WebdriverIO matchers ஆகியவற்றை ஒருங்கிணைக்கிறது. Jasmine-இன் sync matchers-க்கு `await` தேவையில்லை, மேலும் `expect.soft()` போன்ற `expect`-இன் Jest பகுதிகள் கிடைக்காது. [Jasmine-ஐப் பயன்படுத்துதல்](/docs/frameworks#assertions) என்பதைப் பார்க்கவும்.

:::

## மென் உறுதிப்படுத்தல்கள் (Soft Assertions)

WebdriverIO இயல்பாகவே `expect-webdriverio`-இலிருந்து (5.2.0 முதல்) soft assertions-ஐ உள்ளடக்கியுள்ளது. ஒரு உறுதிப்படுத்தல் தோல்வியடைந்தாலும் உங்கள் சோதனைகள் தொடர்ந்து இயங்க soft assertions அனுமதிக்கின்றன. அனைத்து தோல்விகளும் சேகரிக்கப்பட்டு சோதனையின் முடிவில் அறிக்கையிடப்படும்.

### பயன்பாடு

```js
// இவை தோல்வியடைந்தால் உடனடியாக பிழையை எறியாது
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// வழக்கமான உறுதிப்படுத்தல்கள் இன்னும் உடனடியாக பிழையை எறியும்
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Chai-இலிருந்து இடம்பெயர்தல்

[Chai](https://www.chaijs.com/) மற்றும் [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) இணைந்து இருக்க முடியும், மேலும் சில சிறிய மாற்றங்களுடன் expect-webdriverio-க்கு சீரான மாற்றத்தை அடையலாம். நீங்கள் WebdriverIO v6-க்கு மேம்படுத்தியிருந்தால், இயல்பாகவே `expect-webdriverio`-இலிருந்து அனைத்து உறுதிப்படுத்தல்களுக்கும் உடனடியாக அணுகல் கிடைக்கும். இதன் பொருள், நீங்கள் `expect`-ஐ உலகளாவிய ரீதியில் எங்கு பயன்படுத்தினாலும் ஒரு `expect-webdriverio` உறுதிப்படுத்தலை அழைப்பீர்கள். அதாவது, நீங்கள் [`injectGlobals`](/docs/configuration#injectglobals)-ஐ `false` என அமைத்திருந்தால் அல்லது Chai-ஐப் பயன்படுத்த உலகளாவிய `expect`-ஐ வெளிப்படையாக மேலெழுதியிருந்தால் தவிர. அந்நிலையில், உங்களுக்குத் தேவையான இடத்தில் expect-webdriverio தொகுப்பை வெளிப்படையாக இறக்குமதி செய்யாமல் எந்த expect-webdriverio உறுதிப்படுத்தல்களுக்கும் அணுகல் இருக்காது.

Chai உள்ளூரில் (locally) மேலெழுதப்பட்டிருந்தால் அதிலிருந்து எவ்வாறு இடம்பெயர்வது மற்றும் Chai உலகளாவிய ரீதியில் (globally) மேலெழுதப்பட்டிருந்தால் அதிலிருந்து எவ்வாறு இடம்பெயர்வது என்பதற்கான எடுத்துக்காட்டுகளை இந்த வழிகாட்டி காண்பிக்கும்.

### உள்ளூர் (Local)

ஒரு கோப்பில் Chai வெளிப்படையாக இறக்குமதி செய்யப்பட்டதாகக் கொள்வோம், எ.கா.:

```js
// myfile.js - அசல் குறியீடு
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

இந்தக் குறியீட்டை இடம்பெயர்க்க, Chai இறக்குமதியை நீக்கிவிட்டு அதற்குப் பதிலாக புதிய expect-webdriverio உறுதிப்படுத்தல் முறையான `toHaveUrl`-ஐப் பயன்படுத்தவும்:

```js
// myfile.js - இடம்பெயர்க்கப்பட்ட குறியீடு
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // புதிய expect-webdriverio API முறை https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

ஒரே கோப்பில் Chai மற்றும் expect-webdriverio இரண்டையும் பயன்படுத்த விரும்பினால், Chai இறக்குமதியை வைத்திருப்பீர்கள், மேலும் `expect` இயல்பாக expect-webdriverio உறுதிப்படுத்தலாக இருக்கும், எ.கா.:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai உறுதிப்படுத்தல்
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio உறுதிப்படுத்தல்
    })
})
```

### உலகளாவிய (Global)

Chai-ஐப் பயன்படுத்த `expect` உலகளாவிய ரீதியில் மேலெழுதப்பட்டதாகக் கொள்வோம். expect-webdriverio உறுதிப்படுத்தல்களைப் பயன்படுத்த, "before" hook-இல் ஒரு மாறியை உலகளாவிய ரீதியில் அமைக்க வேண்டும், எ.கா.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

இப்போது Chai மற்றும் expect-webdriverio இரண்டையும் ஒன்றாகப் பயன்படுத்தலாம். உங்கள் குறியீட்டில் Chai மற்றும் expect-webdriverio உறுதிப்படுத்தல்களைப் பின்வருமாறு பயன்படுத்துவீர்கள், எ.கா.:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai உறுதிப்படுத்தல்
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio உறுதிப்படுத்தல்
    });
});
```

இடம்பெயர, ஒவ்வொரு Chai உறுதிப்படுத்தலையும் படிப்படியாக expect-webdriverio-க்கு மாற்றுவீர்கள். குறியீட்டுத் தளம் முழுவதும் அனைத்து Chai உறுதிப்படுத்தல்களும் மாற்றப்பட்டவுடன், "before" hook-ஐ நீக்கலாம். பின்னர் `wdioExpect`-இன் அனைத்து நிகழ்வுகளையும் `expect` ஆக மாற்ற ஒரு உலகளாவிய find and replace செய்வது இடம்பெயர்வை நிறைவு செய்யும்.