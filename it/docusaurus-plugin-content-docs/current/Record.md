---
id: record
title: Registrazione dei Test
---

Chrome DevTools ha un pannello _Recorder_ che consente agli utenti di registrare e riprodurre passaggi automatizzati all'interno di Chrome. Questi passaggi possono essere [esportati in test WebdriverIO con un'estensione](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) rendendo la scrittura dei test molto semplice.

## Che cos'è Chrome DevTools Recorder

Il [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) è uno strumento che ti permette di registrare e riprodurre azioni di test direttamente nel browser ed esportarle anche come JSON (o esportarle in test e2e), oltre a misurare le prestazioni dei test.

Lo strumento è semplice e, poiché è integrato nel browser, abbiamo la comodità di non dover cambiare contesto o utilizzare strumenti di terze parti.

## Come registrare un test con Chrome DevTools Recorder

Se hai l'ultima versione di Chrome, avrai già il Recorder installato e disponibile. Basta aprire qualsiasi sito web, fare un clic destro e selezionare _"Ispeziona"_. All'interno di DevTools puoi aprire il Recorder premendo `CMD/Control` + `Shift` + `p` e digitando _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Per iniziare a registrare un percorso utente, clicca su _"Start new recording"_, dai un nome al tuo test e poi usa il browser per registrare il test:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Come passo successivo, clicca su _"Replay"_ per verificare se la registrazione è stata eseguita con successo e fa ciò che volevi fare. Se tutto è a posto, clicca sull'icona [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) e seleziona _"Export as a WebdriverIO Test Script"_:

L'opzione _"Export as a WebdriverIO Test Script"_ è disponibile solo se hai installato l'estensione [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).

![Chrome DevTools Recorder](/img/recorder/export.gif)

Ecco fatto!

## Esportazione della registrazione

Se hai esportato il flusso come script di test WebdriverIO, dovrebbe scaricare uno script che puoi copiare e incollare nella tua suite di test. Ad esempio, la registrazione precedente appare come segue:

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

Assicurati di rivedere alcuni dei localizzatori e sostituirli con [tipi di selettori](/docs/selectors) più resilienti se necessario. Puoi anche esportare il flusso come file JSON e utilizzare il pacchetto [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) per trasformarlo in uno script di test effettivo.

## Passi successivi

Puoi utilizzare questo flusso per creare facilmente test per le tue applicazioni. Chrome DevTools Recorder ha varie funzionalità aggiuntive, ad esempio:

- [Simulare una rete lenta](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) o
- [Misurare le prestazioni dei tuoi test](https://developer.chrome.com/docs/devtools/recorder/#measure)

Assicurati di consultare la loro [documentazione](https://developer.chrome.com/docs/devtools/recorder).