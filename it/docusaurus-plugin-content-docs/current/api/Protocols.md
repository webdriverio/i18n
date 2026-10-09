---
id: protocols
title: Comandi del Protocollo
---

WebdriverIO è un framework di automazione che si basa su vari protocolli di automazione per controllare un agente remoto, ad esempio per un browser, un dispositivo mobile o una televisione. In base al dispositivo remoto entrano in gioco protocolli diversi. Questi comandi vengono assegnati all'oggetto [Browser](/docs/api/browser) o [Element](/docs/api/element) a seconda delle informazioni di sessione fornite dal server remoto (ad esempio il driver del browser).

Internamente WebdriverIO utilizza i comandi del protocollo per quasi tutte le interazioni con l'agente remoto. Tuttavia, comandi aggiuntivi assegnati all'oggetto [Browser](/docs/api/browser) o [Element](/docs/api/element) semplificano l'utilizzo di WebdriverIO; ad esempio, ottenere il testo di un elemento utilizzando i comandi del protocollo apparirebbe così:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Utilizzando i comodi comandi dell'oggetto [Browser](/docs/api/browser) o [Element](/docs/api/element) questo può essere ridotto a:

```js
$('#lst-ib').getText()
```

La sezione seguente spiega ogni singolo protocollo.

## Protocollo WebDriver

Il protocollo [WebDriver](https://w3c.github.io/webdriver/#elements) è uno standard web per l'automazione dei browser. A differenza di alcuni altri strumenti E2E, garantisce che l'automazione possa essere eseguita sui browser effettivamente utilizzati dai tuoi utenti, ad esempio Firefox, Safari e Chrome e i browser basati su Chromium come Edge, e non solo sui motori dei browser, ad esempio WebKit, che sono molto diversi.

Il vantaggio di utilizzare il protocollo WebDriver rispetto ai protocolli di debug come [Chrome DevTools](https://w3c.github.io/webdriver/#elements) è che si dispone di un insieme specifico di comandi che permettono di interagire con il browser nello stesso modo su tutti i browser, riducendo la probabilità di instabilità (flakiness). Inoltre, questo protocollo offre possibilità di scalabilità massiva tramite l'utilizzo di fornitori cloud come [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) e [altri](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Protocollo WebDriver Bidi

Il protocollo [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) è la seconda generazione del protocollo ed è attualmente in fase di sviluppo da parte della maggior parte dei produttori di browser. Rispetto al suo predecessore, il protocollo supporta una comunicazione bidirezionale (da qui "Bidi") tra il framework e il dispositivo remoto. Introduce inoltre primitive aggiuntive per una migliore introspezione del browser, al fine di automatizzare meglio le moderne applicazioni web nel browser.

Dato che questo protocollo è attualmente in fase di sviluppo, nel tempo verranno aggiunte ulteriori funzionalità che saranno supportate dai browser. Se utilizzi i comodi comandi di WebdriverIO, per te non cambierà nulla. WebdriverIO farà uso di queste nuove capacità del protocollo non appena saranno disponibili e supportate nel browser.

## Appium

Il progetto [Appium](https://appium.io/) fornisce funzionalità per automatizzare dispositivi mobili, desktop e ogni altro tipo di dispositivo IoT. Mentre WebDriver si concentra sui browser e sul web, la visione di Appium è utilizzare lo stesso approccio ma per qualsiasi dispositivo arbitrario. Oltre ai comandi definiti da WebDriver, dispone di comandi speciali che sono spesso specifici del dispositivo remoto che viene automatizzato. Per gli scenari di test mobile, questo è ideale quando si desidera scrivere ed eseguire gli stessi test sia per applicazioni Android che iOS.

Secondo la [documentazione](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) di Appium, è stato progettato per soddisfare le esigenze di automazione mobile secondo una filosofia delineata dai seguenti quattro principi:

- Non dovresti dover ricompilare la tua app o modificarla in alcun modo per poterla automatizzare.
- Non dovresti essere vincolato a un linguaggio o framework specifico per scrivere ed eseguire i tuoi test.
- Un framework di automazione mobile non dovrebbe reinventare la ruota quando si tratta di API di automazione.
- Un framework di automazione mobile dovrebbe essere open source, nello spirito e nella pratica oltre che nel nome!

## Chromium

Il protocollo Chromium offre un insieme esteso di comandi in aggiunta al protocollo WebDriver, supportato solo quando si eseguono sessioni automatizzate tramite [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) o [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Il protocollo Firefox offre un insieme esteso di comandi in aggiunta al protocollo WebDriver, supportato solo quando si eseguono sessioni automatizzate tramite [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

Il protocollo [Sauce Labs](https://saucelabs.com/) offre un insieme esteso di comandi in aggiunta al protocollo WebDriver, supportato solo quando si eseguono sessioni automatizzate utilizzando il cloud di Sauce Labs.

## Selenium Standalone

Il protocollo [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) offre un insieme esteso di comandi in aggiunta al protocollo WebDriver, supportato solo quando si eseguono sessioni automatizzate utilizzando Selenium Grid.