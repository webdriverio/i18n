---
id: protocols
title: Comandi del Protocollo
---

WebdriverIO è un framework di automazione che si basa su vari protocolli di automazione per controllare un agente remoto, ad esempio per un browser, un dispositivo mobile o una televisione. In base al dispositivo remoto entrano in gioco diversi protocolli. Questi comandi sono assegnati all'oggetto [Browser](/docs/api/browser) o [Element](/docs/api/element) a seconda delle informazioni di sessione fornite dal server remoto (ad esempio, browser driver).

Internamente, WebdriverIO utilizza comandi di protocollo per quasi tutte le interazioni con l'agente remoto. Tuttavia, i comandi aggiuntivi assegnati all'oggetto [Browser](/docs/api/browser) o [Element](/docs/api/element) semplificano l'utilizzo di WebdriverIO. Ad esempio, ottenere il testo di un elemento utilizzando i comandi di protocollo apparirebbe così:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Utilizzando i comandi convenienti dell'oggetto [Browser](/docs/api/browser) o [Element](/docs/api/element), questo può essere ridotto a:

```js
$('#lst-ib').getText()
```

La seguente sezione spiega ogni singolo protocollo.

## Protocollo WebDriver

Il protocollo [WebDriver](https://w3c.github.io/webdriver/#elements) è uno standard web per l'automazione del browser. A differenza di altri strumenti E2E, garantisce che l'automazione possa essere eseguita su browser reali utilizzati dagli utenti, ad esempio Firefox, Safari e Chrome e browser basati su Chromium come Edge, e non solo su motori di browser, ad esempio WebKit, che sono molto diversi.

Il vantaggio di utilizzare il protocollo WebDriver rispetto ai protocolli di debug come [Chrome DevTools](https://w3c.github.io/webdriver/#elements) è che hai un insieme specifico di comandi che consentono di interagire con il browser allo stesso modo su tutti i browser, riducendo la probabilità di instabilità. Inoltre, questo protocollo offre possibilità di scalabilità massiccia utilizzando fornitori cloud come [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) e [altri](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Protocollo WebDriver Bidi

Il protocollo [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) è la seconda generazione del protocollo e attualmente è in fase di sviluppo dalla maggior parte dei produttori di browser. Rispetto al suo predecessore, il protocollo supporta una comunicazione bidirezionale (da cui "Bidi") tra il framework e il dispositivo remoto. Inoltre, introduce primitive aggiuntive per una migliore introspezione del browser per automatizzare meglio le applicazioni web moderne nei browser.

Dato che questo protocollo è attualmente in fase di sviluppo, nel tempo verranno aggiunte più funzionalità supportate dai browser. Se utilizzi i comandi convenienti di WebdriverIO, nulla cambierà per te. WebdriverIO utilizzerà queste nuove capacità del protocollo non appena saranno disponibili e supportate nel browser.

## Appium

Il progetto [Appium](https://appium.io/) fornisce capacità per automatizzare dispositivi mobili, desktop e tutti gli altri tipi di dispositivi IoT. Mentre WebDriver si concentra sul browser e sul web, la visione di Appium è utilizzare lo stesso approccio ma per qualsiasi dispositivo arbitrario. Oltre ai comandi definiti da WebDriver, ha comandi speciali che spesso sono specifici per il dispositivo remoto che viene automatizzato. Per scenari di test mobile, questo è ideale quando si desidera scrivere ed eseguire gli stessi test sia per applicazioni Android che iOS.

Secondo la [documentazione](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) di Appium, è stato progettato per soddisfare le esigenze di automazione mobile secondo una filosofia delineata dai seguenti quattro principi:

- Non dovresti dover ricompilare la tua app o modificarla in alcun modo per automatizzarla.
- Non dovresti essere vincolato a un linguaggio o framework specifico per scrivere ed eseguire i tuoi test.
- Un framework di automazione mobile non dovrebbe reinventare la ruota quando si tratta di API di automazione.
- Un framework di automazione mobile dovrebbe essere open source, nello spirito e nella pratica, oltre che nel nome!

## Chromium

Il protocollo Chromium offre un super set di comandi oltre al protocollo WebDriver che è supportato solo quando si eseguono sessioni automatizzate tramite [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) o [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Il protocollo Firefox offre un super set di comandi oltre al protocollo WebDriver che è supportato solo quando si eseguono sessioni automatizzate tramite [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

Il protocollo [Sauce Labs](https://saucelabs.com/) offre un super set di comandi oltre al protocollo WebDriver che è supportato solo quando si eseguono sessioni automatizzate utilizzando il cloud di Sauce Labs.

## Selenium Standalone

Il protocollo [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) offre un super set di comandi oltre al protocollo WebDriver che è supportato solo quando si eseguono sessioni automatizzate utilizzando Selenium Grid.

## JSON Wire Protocol

Il [JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) è il pre-predecessore del protocollo WebDriver ed è __obsoleto__ oggi. Sebbene alcuni comandi potrebbero essere ancora supportati in determinati ambienti, non è consigliabile utilizzare nessuno dei suoi comandi.

## Mobile JSON Wire Protocol

Il [Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) è un super set di comandi mobili oltre al JSON Wire Protocol. Dato che quest'ultimo è obsoleto, anche il Mobile JSON Wire Protocol è diventato __obsoleto__. Appium potrebbe ancora supportare alcuni dei suoi comandi, ma non è consigliabile utilizzarli.