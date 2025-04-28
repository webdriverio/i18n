---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Hämta [Puppeteer Browser-instansen](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
för att köra kommandon med Puppeteer. Observera att alla Puppeteer-kommandon är
asynkrona som standard, så för att växla mellan synkron och asynkron
exekvering, se till att paketera dina Puppeteer-anrop inom ett `browser.call`
kommando som visas i exemplet.

:::info

Observera att användning av Puppeteer kräver stöd för Chrome DevTools-protokollet och kan t.ex.
inte användas när du kör automatiserade tester i molnet. Chrome DevTools-protokollet installeras inte som standard,
använd `npm install puppeteer-core` för att installera det.
Läs mer i avsnittet [Automation Protocols](/docs/automationProtocols).

:::

:::info

Observera: Puppeteer stöds för närvarande __inte__ när du kör [komponenttester](/docs/component-testing).

:::

##### Usage

```js
browser.getPuppeteer()
```

##### Example

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

##### Returns

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   initiated puppeteer instance connected to the browser    