---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Uzyskaj [instancję przeglądarki Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
aby uruchamiać polecenia za pomocą Puppeteer. Pamiętaj, że wszystkie polecenia Puppeteer są
domyślnie asynchroniczne, więc aby przełączać się między synchronicznym i asynchronicznym
wykonaniem, upewnij się, że zawijasz swoje wywołania Puppeteer wewnątrz polecenia `browser.call`,
jak pokazano w przykładzie.

:::info

Pamiętaj, że używanie Puppeteer wymaga obsługi protokołu Chrome DevTools i np.
nie może być używany podczas uruchamiania zautomatyzowanych testów w chmurze. Chrome DevTools protocol nie jest instalowany domyślnie,
użyj `npm install puppeteer-core`, aby go zainstalować.
Dowiedz się więcej w sekcji [Protokoły Automatyzacji](/docs/automationProtocols).

:::

:::info

Uwaga: Puppeteer obecnie __nie__ jest obsługiwany podczas uruchamiania [testów komponentów](/docs/component-testing).

:::

##### Użycie

```js
browser.getPuppeteer()
```

##### Przykład

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

##### Zwraca

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   zainicjowana instancja puppeteer połączona z przeglądarką