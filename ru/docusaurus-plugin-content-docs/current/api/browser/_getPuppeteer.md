---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Получить [экземпляр браузера Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
для выполнения команд с Puppeteer. Обратите внимание, что все команды Puppeteer
являются асинхронными по умолчанию, поэтому для переключения между синхронным и асинхронным
выполнением убедитесь, что обернули вызовы Puppeteer внутри команды `browser.call`,
как показано в примере.

:::info

Обратите внимание, что использование Puppeteer требует поддержки протокола Chrome DevTools и, например,
не может использоваться при запуске автоматизированных тестов в облаке. Chrome DevTools протокол не устанавливается по умолчанию,
используйте `npm install puppeteer-core` для его установки.
Узнайте больше в разделе [Протоколы автоматизации](/docs/automationProtocols).

:::

:::info

Примечание: Puppeteer в настоящее время __не__ поддерживается при запуске [компонентных тестов](/docs/component-testing).

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
            **<code><var>return</var></code>:**   инициализированный экземпляр puppeteer, подключенный к браузеру