---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

Obtenez l'[instance du navigateur Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
pour exécuter des commandes avec Puppeteer. Notez que toutes les commandes Puppeteer sont
asynchrones par défaut, donc pour passer de l'exécution synchrone à asynchrone,
assurez-vous d'encapsuler vos appels Puppeteer dans une commande `browser.call`
comme montré dans l'exemple.

:::info

Notez que l'utilisation de Puppeteer nécessite la prise en charge du protocole Chrome DevTools et, par exemple,
ne peut pas être utilisé lors de l'exécution de tests automatisés dans le cloud. Le protocole Chrome DevTools n'est pas installé par défaut,
utilisez `npm install puppeteer-core` pour l'installer.
En savoir plus dans la section [Protocoles d'automatisation](/docs/automationProtocols).

:::

:::info

Remarque : Puppeteer n'est actuellement __pas__ pris en charge lors de l'exécution de [tests de composants](/docs/component-testing).

:::

##### Utilisation

```js
browser.getPuppeteer()
```

##### Exemple

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

##### Retourne

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   instance puppeteer initiée connectée au navigateur