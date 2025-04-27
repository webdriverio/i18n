---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Отримати [екземпляр Puppeteer Browser](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
для виконання команд з Puppeteer. Зауважте, що всі команди Puppeteer за замовчуванням
асинхронні, тому для перемикання між синхронним та асинхронним
виконанням обов'язково загорніть ваші виклики Puppeteer в команду `browser.call`,
як показано в прикладі.

:::info

Зверніть увагу, що використання Puppeteer вимагає підтримки протоколу Chrome DevTools і, наприклад,
не може бути використано при запуску автоматизованих тестів у хмарі. Протокол Chrome DevTools не встановлюється за замовчуванням,
використовуйте `npm install puppeteer-core` для його встановлення.
Дізнайтеся більше в розділі [Протоколи автоматизації](/docs/automationProtocols).

:::

:::info

Примітка: Puppeteer наразі __не__ підтримується при запуску [компонентних тестів](/docs/component-testing).

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