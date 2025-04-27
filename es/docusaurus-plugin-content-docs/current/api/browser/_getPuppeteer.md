---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Obtenga la [instancia del Navegador Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
para ejecutar comandos con Puppeteer. Tenga en cuenta que todos los comandos de Puppeteer son
asincrónicos por defecto, por lo que para alternar entre la ejecución síncrona y asíncrona
asegúrese de envolver sus llamadas a Puppeteer dentro de un comando `browser.call`
como se muestra en el ejemplo.

:::info

Tenga en cuenta que el uso de Puppeteer requiere soporte para el protocolo Chrome DevTools y, por ejemplo,
no se puede usar cuando se ejecutan pruebas automatizadas en la nube. El protocolo Chrome DevTools no se instala por defecto,
use `npm install puppeteer-core` para instalarlo.
Encuentre más información en la sección [Protocolos de Automatización](/docs/automationProtocols).

:::

:::info

Nota: Puppeteer actualmente __no__ es compatible cuando se ejecutan [pruebas de componentes](/docs/component-testing).

:::

##### Uso

```js
browser.getPuppeteer()
```

##### Ejemplo

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

##### Devuelve

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   instancia iniciada de puppeteer conectada al navegador