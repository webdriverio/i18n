---
id: getPuppeteer
title: getPuppeteer ஐ பெறுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

[Puppeteer Browser நிகழ்நிலையை](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser) பெற்று
Puppeteer மூலம் கட்டளைகளை இயக்கவும். குறிப்பாக அனைத்து Puppeteer கட்டளைகளும்
இயல்பாகவே ஒத்திசைவற்றவை, எனவே ஒத்திசைவு மற்றும் ஒத்திசைவற்ற
செயல்பாடுகளுக்கு இடையே மாற உங்கள் Puppeteer அழைப்புகளை `browser.call`
கட்டளைகளுக்குள் சுற்றுவதை உறுதிப்படுத்தவும் எடுத்துக்காட்டில் காட்டியுள்ளபடி.

:::info

Puppeteer ஐப் பயன்படுத்துவதற்கு Chrome DevTools நெறிமுறை ஆதரவு தேவைப்படுகிறது மற்றும்
கிளவுடில் தானியங்கி சோதனைகளை இயக்கும் போது பயன்படுத்த முடியாது. Chrome DevTools நெறிமுறை இயல்பாகவே நிறுவப்படவில்லை,
அதை நிறுவ `npm install puppeteer-core` ஐப் பயன்படுத்தவும்.
[தானியக்க நெறிமுறைகள்](/docs/automationProtocols) பிரிவில் மேலும் அறியவும்.

:::

:::info

குறிப்பு: Puppeteer தற்போது [கூறு சோதனைகள்](/docs/component-testing) இயக்கும் போது __ஆதரிக்கப்படவில்லை__.

:::

##### பயன்பாடு

```js
browser.getPuppeteer()
```

##### எடுத்துக்காட்டு

```js title="getPuppeteer.test.js"
it('should allow me to use Puppeteer', async () => {
    // WebDriver command
    await browser.url('https://webdriver.io')

    const puppeteerBrowser = await browser.getPuppeteer()
    // switch to Puppeteer
    const metrics = await browser.call(async () => {
        const pages = await puppeteerBrowser.pages()
        pages[0].setGeolocation({ latitude: 59.95, longitude: 30.31667 })
        return pages[0].metrics()
    })

    console.log(metrics.LayoutCount) // returns LayoutCount value
})
```

##### திரும்பப் பெறுபவை

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   உலாவியுடன் இணைக்கப்பட்ட துவக்கிய puppeteer நிகழ்வு