---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Obtenha a [instância do Navegador Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
para executar comandos com Puppeteer. Observe que todos os comandos do Puppeteer são
assíncronos por padrão, então para alternar entre execução síncrona e assíncrona,
certifique-se de envolver suas chamadas Puppeteer em um comando `browser.call`
como mostrado no exemplo.

:::info

Observe que o uso do Puppeteer requer suporte ao protocolo Chrome DevTools e, por exemplo,
não pode ser usado ao executar testes automatizados na nuvem. O protocolo Chrome DevTools não é instalado por padrão,
use `npm install puppeteer-core` para instalá-lo.
Saiba mais na seção [Protocolos de Automação](/docs/automationProtocols).

:::

:::info

Nota: Puppeteer atualmente __não__ é suportado ao executar [testes de componentes](/docs/component-testing).

:::

##### Uso

```js
browser.getPuppeteer()
```

##### Exemplo

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

##### Retorna

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   instância puppeteer iniciada conectada ao navegador