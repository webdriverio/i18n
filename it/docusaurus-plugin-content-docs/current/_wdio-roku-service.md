---
id: wdio-roku-service
title: Servizio Roku
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Questo servizio sovrascrive molte parti di WebdriverIO per consentirne l'utilizzo con le app Roku e fornisce accesso all'[ECP di Roku](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) per controllare il Roku durante i test.

## Requisiti

### Roku
Un canale di test/channel.zip e un dispositivo Roku (con la Modalità Sviluppatore abilitata) sulla stessa rete del tuo mac.

### WebdriverIO
Questo non è un prodotto autonomo -- viene utilizzato come plugin del framework di test WebdriverIO (o Servizio, nel loro gergo). Prima di utilizzarlo, dovresti completare la configurazione di WDIO eseguendo `npm init wdio@latest`.

Durante la configurazione, per non dover navigare tra tutte le domande/opzioni, puoi semplicemente scegliere le seguenti selezioni durante la fase di inizializzazione:
- Roku Testing (NOTA: Usa questa opzione se il tuo repository verrà utilizzato solo per i test Roku poiché diventerà il servizio predefinito e unico installato. Altrimenti, usa E2E Testing per poter installare più servizi.)
- On my local machine (solo E2E)
- Web (solo E2E)
- Chrome (solo E2E)
- Mocha
- Typescript [i moduli funzionano sia per TS che per JS, quindi scegli quello che preferisci]
- autogenerate some test files (Y)
-- posizione predefinita
- page objects (Y)
-- posizione predefinita
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Configurazione Typescript
Se vuoi usare Typescript per scrivere i test, dovrai assicurarti che le seguenti opzioni siano impostate nel file tsconfig.json generato da Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Puoi quindi utilizzare il servizio importandolo nei tuoi test come dettagliato di seguito.

### Configurazione WDIO
Attualmente, i test sono supportati solo per un singolo dispositivo Roku. Sono necessari i seguenti aggiornamenti di configurazione:
* `maxInstances` e `maxInstancesPerCapability` dovrebbero essere 1. I test su più dispositivi automaticamente non sono supportati e comporteranno comandi duplicati inviati al Roku. Dovrebbe esserci solo una singola capacità.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // o se vuoi la modalità headless:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Si consiglia di aumentare `waitforInterval` e `waitforTimeout`, poiché ogni intervallo comporta il download dell'xml dal Roku. Per ottenere di più dalla funzionalità `browser.debug()`, puoi anche optare per estendere il timeout del testrunner mocha a 5+ minuti per lo sviluppo.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //opzionale:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

Sei pronto per scrivere il tuo primo test!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

Si incoraggia anche l'utilizzo della funzionalità `browser.debug()` in wdio per interrompere il test per il debug e la creazione dei test:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // il test si interrompe, diventa disponibile un REPL per i comandi

```
Se chrome non è in modalità headless, puoi vedere l'ultima volta che `openRokuXML()` è stato chiamato (probabilmente tramite un `waitForX` o `expect`). Utilizzando il REPL nel tuo terminale, puoi utilizzare qualsiasi comando `$` valido e un paio di comandi personalizzati aggiunti (`browser.openRokuXML()` e `browser.saveScreenshot('path/to/ss.jpg')`) -- la classe `controller` non è collegata all'oggetto `browser`, quindi attualmente non puoi usarla. Fortunatamente, probabilmente sei seduto accanto al Roku e hai un telecomando che puoi usare per navigare e occasionalmente chiamare `browser.openRokuXML()` per vedere cosa è successo allo stato della pagina! E ricorda che XML funziona nativamente con l'xpathing nel browser chrome stesso, quindi puoi valutare/sviluppare i tuoi selettori direttamente nella console chrome durante il debug.

### .env
Vedi il file `.env.example`. Copialo e rinominalo in `.env` all'interno del tuo progetto WebdriverIO che utilizza questo servizio. Probabilmente vorrai anche metterlo nel tuo .gitignore.

* `ROKU_IP` dovrebbe essere l'IP del tuo Roku. I comandi useranno questo IP per comunicare con esso. Questo è richiesto.
* `ROKU_USER` e `ROKU_PW`: Le credenziali di accesso sono necessarie per installare un archivio, così come per fare screenshot.
* `ROKU_APP_PATH` dovrebbe essere il percorso assoluto del file zip del canale Roku.
* `ROKU_CHANNEL_ID` dovrebbe essere l'ID del canale del tuo canale Roku (di solito è "dev").
* `DEBUG=wdio-roku-service` abiliterà i messaggi di debug. Rimuovi il '#' all'inizio della riga se li desideri.

## Funzioni Modificate
### Browser
* `waitUntil` recupererà l'xml dal Roku ad ogni iterazione per verificare le modifiche.
* `saveScreenshot` scaricherà uno screenshot della schermata corrente dal Roku. In particolare, questi screenshot sono in formato .jpg, anziché .png che WebdriverIO utilizza di solito.
* `openRokuXML` recupererà l'xml dal Roku se hai bisogno di farlo manualmente anziché con le attese.

### Elementi
* Tutte le attese sono supportate allo stesso modo del Browser. `waitForClickable` è mappato a `waitForDisplayed`, e `waitForStable` è mappato a `waitForExist`.
* `click`, `doubleClick` e `moveTo` non sono supportati. Devi navigare manualmente nell'app.
* `isFocused` verificherà che un attributo `focused` sull'elemento sia vero.
* `isDisplayed` verificherà un attributo `bounds` sull'elemento, e che `visible` non sia impostato su false. Se `withinViewport` è impostato, i limiti saranno confrontati con le dimensioni dello schermo del Roku.
* `getSize` e `getLocation` prendono i valori dall'attributo `bounds`, restituendo 0 per la dimensione e -Infinity per la posizione se non è presente.

Altre funzioni non sono state modificate, ma molte funzionano ancora come previsto.

### Matcher
La maggior parte dei matcher sono stati aggiornati per recuperare l'xml durante l'attesa. Alcuni hanno una funzionalità leggermente diversa.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight` e `toHaveAttribute` funzionano tutti come previsto, con le modifiche all'Elemento considerate.
* `toHaveElementProperty` è mappato a `toHaveAttribute`.
* `toHaveElementClass` controlla l'attributo `name` dell'elemento.
* `toHaveId` è mappato a `toHaveElementClass`.
* `toHaveText` controlla l'attributo `text` dell'elemento.
* `toHaveChildren` controlla l'attributo `children` dell'elemento.
* `toHaveHTML` tratterà l'xml come se fosse HTML, anche se probabilmente non è molto utile.

I seguenti non sono attualmente supportati:
* `toBeSelected` - Potrebbe essere supportato presto dopo aver determinato come appaiono nell'xml i pulsanti selezionati, se c'è una differenza.
* `toBeChecked` - Potrebbe essere supportato presto dopo aver determinato come appaiono nell'xml le caselle di controllo selezionate, se c'è una differenza.
* `toHaveComputedLabel` - Se hai un equivalente di questo sui tuoi elementi Roku, controlla l'attributo con `toHaveAttribute`.
* `toHaveComputedRole` - Se hai un equivalente di questo sui tuoi elementi Roku, controlla l'attributo con `toHaveAttribute`.
* `toHaveHref` - Se hai URL sui tuoi elementi Roku, controlla l'attributo con `toHaveAttribute`.
* `toHaveStyle` - Gli elementi xml non hanno stili.
* `toHaveClipboardText` - Questo non è noto.
* `toHaveTitle` - Il titolo sarà il nome file temporaneo generato casualmente dell'xml.
* `toHaveUrl` - L'URL sarà il percorso al file xml sul tuo computer.

## Utilizzo
### Installazione del Canale

Questo richiede che il tuo canale abbia un ID assegnato.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Installazione da Archivio

Si consiglia di memorizzare il percorso nel file .env, specialmente se hai più sviluppatori che potrebbero avere posizioni e/o nomi di file diversi.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Canale Pre-Installato

Se hai già installato il canale prima dei test, puoi semplicemente avviarlo.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Chiudi il canale se è già aperto. Se il canale supporta la ripresa istantanea, questo lo metterà semplicemente in background
    await exitChannel();
    // Usando l'ID del canale 'dev' si avvierà l'applicazione caricata lateralmente.
    await launchChannel('dev');
}
```

### Testing
`wdio-roku-service/controller` fornisce la possibilità di inviare pressioni di pulsanti al Roku. `keySequence` è il principale, inviando diverse pressioni di pulsanti in sequenza.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Naviga attraverso l'app
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Recupera l'interfaccia utente attuale dell'app dal Roku e caricala nel browser
await browser.openRokuXML();
// Oppure, usa le attese, che caricheranno ripetutamente l'XML fino al timeout o al superamento della condizione
await browser.waitUntil(condition);
await element.waitForDisplayed();
// usa i matcher WDIO sull'XML del roku come se fosse una pagina web
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` ha anche funzioni per tenere premuto o rilasciare i pulsanti e per digitare testo su una tastiera.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` fornisce funzionalità relative al canale. `inputChannel` ti permette di inviare informazioni arbitrarie alla tua app.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Altre Funzioni
`wdio-roku-service/info` fornisce funzionalità varie, come ottenere l'icona dell'app o i nodi orfani.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` è l'interfaccia diretta con l'ECP se hai bisogno di fare qualcosa di altamente specifico.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Problemi Comuni
* Gli elementi Roku hanno il loro testo in un attributo 'text', non tra i loro tag. Quando fai selettori, fare `$('element=Text')` non funzionerà per quasi tutti gli elementi. Invece, dovrai fare `$('element[text=Text]')`.

## Roadmap delle Funzionalità
* Ci sarà un PR presentato presto che permetterà a questo servizio di essere installato durante il questionario `npm init wdio@latest`.
* Attualmente stiamo valutando la comunicazione Socket con il Roku in modo che più funzionalità possano essere strumentate, come un mezzo per svegliare un Roku dormiente.
* Funzionalità di proxy di rete che permettono di basarsi sull'attività di rete.

## Sfruttare il Reporting Allure con Screenshot e file XML allegati

Di base, Allure Reporting non ha una configurazione in atto per generare screenshot dell'app o una copia del codice XML rappresentativo dello stato attuale dell'app Roku in qualsiasi punto dell'esecuzione del test. La documentazione che segue spiega come affrontare questo problema in modo che uno screenshot dello stato attuale dell'app venga generato e allegato al Report Allure ogni volta che un test `it` completa la sua esecuzione. Permette anche di ottenere uno snapshot del codice XML rappresentativo dello stato attuale dell'app Roku ogni volta che un'esecuzione del test `it` fallisce.

Per la documentazione completa su Allure Reporter, visita la documentazione di @wdio/allure-reporter su https://webdriver.io/docs/allure-reporter/

### Dipendenza Utils.js
Aggiungi il seguente codice a un file chiamato `Utils.js`. Questo file può risiedere nella tua cartella `/helpers` o simile.
```js
/**
 * Restituisce una rappresentazione in stringa del timestamp 'now' in millisecondi dall'epoca.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Restituisce una rappresentazione in stringa del timestamp 'now' seguendo il pattern: {YYYY}-{MM}-{DD}_{ora in 24H}-{Minuto}-{Secondo}-{Millisecondi}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * Un oggetto contenente le rappresentazioni in stringa delle possibili estensioni di file utilizzate per scopi di reporting.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * Un oggetto contenente le rappresentazioni in stringa dei possibili tipi MIME utilizzati per scopi di reporting.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * Una funzione per generare un nome file con un possibile prefisso, un timestamp e una delle possibili estensioni fornite.
 * @param {string} fileExtension Usa uno dei valori dall'oggetto FILE_EXTENSIONS definito in precedenza.
 * @param {string} [fileNamePrefix] Un prefisso da aggiungere all'inizio del nome file se fornito. Il valore predefinito è una stringa vuota.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### Codice wdio.conf.js
Aggiungi le seguenti dichiarazioni di importazione nel file `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Sostituisci <Utils.js file path> con il percorso relativo effettivo al file Utils.js

```

Definisci il seguente hook `afterTest` nel file `wdio.conf.js`. Se hai già del codice funzionante in questo hook, aggiungi il codice fornito di seguito.
```js
afterTest: async function (test, context, result) {
        // Logica di salvataggio e allegamento degli screenshot indipendentemente dall'esito del test.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // Logica di allegamento XML in caso di fallimento del test.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### Comportamento atteso
Con questo codice in atto nel progetto, ci si aspetta che ogni volta che viene eseguito un test `it`, indipendentemente dall'esito del test, uno screenshot venga scattato alla fine dell'esecuzione e allegato alla relativa sezione nel report Allure. Nel caso specifico in cui il test fallisca, uno snapshot del codice dello stato dell'app in formato XML verrà anch'esso allegato alla sezione del test nel report Allure.

### Note
* I report Allure supportano nativamente gli screenshot in formato `.png`. I metodi sovrascitti in questo servizio supportano l'immagine in formato `.jpg`.
* Gli allegati XML possono essere sfogliati nel report Allure stesso o aperti in una scheda separata nel browser.