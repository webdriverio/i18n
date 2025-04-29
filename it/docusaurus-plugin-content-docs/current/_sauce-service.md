---
id: sauce-service
title: Servizio Sauce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---


Servizio WebdriverIO che fornisce una migliore integrazione con Sauce Labs. Questo servizio può essere utilizzato per:

- il Cloud di Macchine Virtuali Sauce Labs (Desktop Web/Emulatore/Simulatore)
- il Cloud di Dispositivi Reali Sauce Labs (iOS e Android)

Può aggiornare i metadati del job ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') e avviare Sauce Connect se desiderato.

Cos'altro farà questo servizio per te:

- Per impostazione predefinita, il Sauce Service aggiornerà il 'name' del job quando il job inizia. Ciò ti darà la possibilità di aggiornare il nome in qualsiasi momento.
- Puoi definire un parametro `setJobName` e personalizzare il nome del job in base alle tue capabilities, opzioni e titolo della suite
- Il Sauce Service invierà anche lo stack di errori di un test fallito alla scheda dei comandi di Sauce Labs
- Ti permetterà di configurare automaticamente e avviare [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- E imposterà punti di contesto nell'elenco dei comandi per identificare quali comandi sono stati eseguiti in quale test

## Installazione

Il modo più semplice è mantenere `@wdio/sauce-service` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/sauce-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Configurazione

Per utilizzare il servizio per la Macchina Virtuale Desktop/Emulatore/Simulatore e il cloud di Dispositivi Reali, è necessario impostare `user` e `key` nel file `wdio.conf.js`. Utilizzerà automaticamente Sauce Labs per eseguire i tuoi test di integrazione. Se esegui i tuoi test su Sauce Labs puoi specificare la regione in cui vuoi eseguire i tuoi test tramite la proprietà `region`. I gestori abbreviati disponibili per le regioni sono `us` (predefinito) e `eu`. Queste regioni vengono utilizzate per il cloud VM di Sauce Labs e il Cloud di Dispositivi Reali di Sauce Labs. Se non fornisci la regione, il valore predefinito è `us`.

Se vuoi che WebdriverIO avvii automaticamente un tunnel [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy), devi impostare `sauceConnect: true`. Se desideri cambiare il data center in EU aggiungi `region:'eu'` poiché il data center US è impostato come predefinito.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // oppure 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Se vuoi utilizzare un tunnel Sauce Connect esistente, devi solo fornire un `tunnelName`. Se stai utilizzando un tunnel condiviso e non sei l'utente che ha creato il tunnel, devi identificare l'utente Sauce Labs che ha creato il tunnel per poterlo utilizzare per il tuo test. Includi il `tunnelOwner` nelle capabilities in questo modo:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Opzioni del Servizio Sauce

Per autorizzare il servizio Sauce Labs, la tua configurazione deve contenere le opzioni [`user`](https://webdriver.io/docs/options#user) e [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Questo servizio invierà automaticamente lo stack di errori a Sauce Labs quando un test fallisce. Per impostazione predefinita, invierà solo le prime 5 righe, ma se necessario questo può essere modificato. Tieni presente che più righe comporteranno più chiamate WebDriver che potrebbero rallentare l'esecuzione.

Tipo: `number`<br />
Predefinito: `5`

### sauceConnect

Se `true`, esegue Sauce Connect e apre una connessione sicura tra una macchina virtuale Sauce Labs che esegue i tuoi test del browser.

Tipo: `Boolean`<br />
Predefinito: `false`

### sauceConnectOpts

Applica le opzioni di Sauce Connect (ad esempio per modificare il numero di porta o le impostazioni del logFile). Vedi [questo elenco](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) per ulteriori informazioni.

NOTA: Quando si specificano le opzioni, il `--` deve essere omesso. Può anche essere trasformato in camelCase (ad esempio `shared-tunnel` o `sharedTunnel`).

Tipo: `Object`<br />
Predefinito: `{ }`

### uploadLogs

Se `true`, questa opzione carica tutti i file di log WebdriverIO sulla piattaforma Sauce Labs per ulteriori ispezioni. Assicurati di avere [`outputDir`](https://webdriver.io/docs/options#outputdir) impostato nella tua configurazione wdio per scrivere i log nei file, altrimenti i dati verranno trasmessi a stdout e non potranno essere caricati.

Tipo: `Boolean`<br />
Predefinito: `true`

### setJobName

Consente agli utenti di impostare dinamicamente il nome del job in base ai parametri del worker come la configurazione WebdriverIO, le capabilities utilizzate e il titolo originale della suite.

Tipo: `Function`<br />
Predefinito: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Sovrascrivere i metadati del nome generato

Il servizio genera automaticamente un nome per ogni test dal nome della suite, dal nome del browser e da altre informazioni.

Puoi sovrascrivere questo fornendo un valore per la capability `name` desiderata, ma ciò avrà l'effetto collaterale di dare a tutti i test lo stesso nome.

----

Per ulteriori informazioni su WebdriverIO, visita la [homepage](https://webdriver.io).