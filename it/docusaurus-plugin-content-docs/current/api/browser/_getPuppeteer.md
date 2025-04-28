---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Ottieni l'[istanza del Browser Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
per eseguire comandi con Puppeteer. Nota che tutti i comandi Puppeteer sono
asincroni di default, quindi per alternare tra esecuzione sincrona e asincrona
assicurati di racchiudere le chiamate Puppeteer all'interno di un comando `browser.call`
come mostrato nell'esempio.

:::info

Nota che l'utilizzo di Puppeteer richiede il supporto per il protocollo Chrome DevTools e, ad esempio,
non può essere utilizzato quando si eseguono test automatizzati nel cloud. Il protocollo Chrome DevTools non è installato di default,
usa `npm install puppeteer-core` per installarlo.
Scopri di più nella sezione [Protocolli di Automazione](/docs/automationProtocols).

:::

:::info

Nota: Puppeteer attualmente __non__ è supportato quando si eseguono [test dei componenti](/docs/component-testing).

:::

##### Utilizzo

```js
browser.getPuppeteer()
```

##### Esempio

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

##### Restituisce

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   istanza puppeteer inizializzata connessa al browser