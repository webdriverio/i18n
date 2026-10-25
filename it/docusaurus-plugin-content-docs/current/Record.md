---
id: record
title: Registrare Test
description: "Registra i flussi utente con il Chrome DevTools Recorder ed esportali come test WebdriverIO."
---

Chrome DevTools dispone di un pannello _Recorder_ che consente agli utenti di registrare e riprodurre passaggi automatizzati all'interno di Chrome. Questi passaggi possono essere [esportati in test WebdriverIO con un'estensione](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), rendendo la scrittura dei test molto semplice.

## Cos'è Chrome DevTools Recorder

Il [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) è uno strumento che consente di registrare e riprodurre azioni di test direttamente nel browser e anche di esportarle come JSON (o esportarle in test e2e), oltre a misurare le prestazioni dei test.

Lo strumento è semplice e, poiché è integrato nel browser, abbiamo la comodità di non dover cambiare contesto o utilizzare strumenti di terze parti.

## Come Registrare un Test con Chrome DevTools Recorder

Se hai l'ultima versione di Chrome, avrai già il Recorder installato e disponibile. Basta aprire un qualsiasi sito web, fare clic con il tasto destro e selezionare _"Ispeziona"_. All'interno di DevTools puoi aprire il Recorder premendo `CMD/Control` + `Shift` + `p` e digitando _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Per iniziare a registrare un percorso utente, clicca su _"Start new recording"_, dai un nome al tuo test e poi usa il browser per registrare il tuo test:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Come passo successivo, clicca su _"Replay"_ per verificare che la registrazione sia andata a buon fine e faccia ciò che volevi. Se tutto è ok, clicca sull'icona di [esportazione](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) e seleziona _"Export as a WebdriverIO Test Script"_:

L'opzione _"Export as a WebdriverIO Test Script"_ è disponibile solo se installi l'estensione [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).


![Chrome DevTools Recorder](/img/recorder/export.gif)

Ecco fatto!

## Esportare la Registrazione

Se hai esportato il flusso come script di test WebdriverIO, dovrebbe essere scaricato uno script che puoi copiare e incollare nella tua suite di test. Ad esempio, la registrazione precedente appare come segue:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Assicurati di rivedere alcuni dei localizzatori e di sostituirli, se necessario, con [tipi di selettori](/docs/selectors) più robusti. Puoi anche esportare il flusso come file JSON e usare il pacchetto [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) per trasformarlo in un vero e proprio script di test.

## Prossimi Passi

Puoi usare questo flusso per creare facilmente test per le tue applicazioni. Il Chrome DevTools Recorder offre diverse funzionalità aggiuntive, ad esempio:

- [Simulare una rete lenta](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) oppure
- [Misurare le prestazioni dei tuoi test](https://developer.chrome.com/docs/devtools/recorder/#measure)

Assicurati di consultare la loro [documentazione](https://developer.chrome.com/docs/devtools/recorder).