---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Holen Sie sich die [Puppeteer Browser-Instanz](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser),
um Befehle mit Puppeteer auszuführen. Beachten Sie, dass alle Puppeteer-Befehle
standardmäßig asynchron sind. Um zwischen synchroner und asynchroner
Ausführung zu wechseln, stellen Sie sicher, dass Sie Ihre Puppeteer-Aufrufe innerhalb eines `browser.call`
Befehls einbetten, wie im Beispiel gezeigt.

:::info

Beachten Sie, dass die Verwendung von Puppeteer Unterstützung für das Chrome DevTools-Protokoll erfordert und z.B.
nicht verwendet werden kann, wenn automatisierte Tests in der Cloud ausgeführt werden. Chrome DevTools-Protokoll wird nicht standardmäßig installiert,
verwenden Sie `npm install puppeteer-core`, um es zu installieren.
Erfahren Sie mehr im Abschnitt [Automation Protocols](/docs/automationProtocols).

:::

:::info

Hinweis: Puppeteer wird derzeit __nicht__ unterstützt, wenn [Komponententests](/docs/component-testing) ausgeführt werden.

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
            **<code><var>return</var></code>:**   initiierte Puppeteer-Instanz, die mit dem Browser verbunden ist