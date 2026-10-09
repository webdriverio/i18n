---
id: seleniumgrid
title: Selenium Grid
description: "Collega i test WebdriverIO a un'istanza esistente di Selenium Grid impostando protocol, hostname, port e path nella tua configurazione."
---

Puoi utilizzare WebdriverIO con la tua istanza esistente di Selenium Grid. Per collegare i tuoi test a Selenium Grid, devi solo aggiornare le opzioni nelle configurazioni del tuo test runner.

Ecco un frammento di codice da un esempio di wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Devi fornire i valori appropriati per protocol, hostname, port e path in base alla configurazione del tuo Selenium Grid.
Se esegui Selenium Grid sulla stessa macchina dei tuoi script di test, ecco alcune opzioni tipiche:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Autenticazione di base con Selenium Grid protetto

È vivamente consigliato proteggere il tuo Selenium Grid. Se hai un Selenium Grid protetto che richiede l'autenticazione, puoi passare gli header di autenticazione tramite le opzioni. 
Consulta la sezione [headers](https://webdriver.io/docs/configuration/#headers) nella documentazione per maggiori informazioni.

### Configurazioni dei timeout con Selenium Grid dinamico

Quando si utilizza un Selenium Grid dinamico in cui i pod dei browser vengono avviati su richiesta, la creazione della sessione potrebbe subire un cold start. In questi casi, è consigliabile aumentare i timeout di creazione della sessione. Il valore predefinito nelle opzioni è di 120 secondi, ma puoi aumentarlo se il tuo grid impiega più tempo per creare una nuova sessione. 

```ts
connectionRetryTimeout: 180000,
```

### Configurazioni avanzate

Per configurazioni avanzate, consulta il [file di configurazione](https://webdriver.io/docs/configurationfile) del Testrunner.

### Operazioni sui file con Selenium Grid

Quando esegui i casi di test con un Selenium Grid remoto, il browser viene eseguito su una macchina remota ed è necessario prestare particolare attenzione ai casi di test che prevedono upload e download di file.

### Download di file

Per i browser basati su Chromium, puoi fare riferimento alla documentazione [Download file](https://webdriver.io/docs/api/browser/downloadFile). Se i tuoi script di test devono leggere il contenuto di un file scaricato, devi scaricarlo dal nodo Selenium remoto alla macchina del test runner. Ecco un frammento di codice di esempio dalla configurazione `wdio.conf.ts` per il browser Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Upload di file con Selenium Grid remoto

[`element.setFiles()`](/docs/api/element/setFiles) imposta un input di tipo file tramite WebDriver BiDi. I percorsi che passi vengono aperti dal browser, quindi devono esistere sulla macchina che esegue il browser. WebdriverIO non trasferisce un file locale su un nodo Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Una suite che utilizzava `browser.uploadFile()` per inviare i byte al nodo deve posizionare il file dove il browser può leggerlo, quindi chiamare `setFiles`. L'endpoint Selenium [`file`](/docs/api/selenium#file) è ancora disponibile come `browser.file()` per Chromedriver, Edgedriver e Selenium Grid. Non è un comando WebDriver o WebDriver BiDi.

### Altre operazioni su file/grid

Ci sono alcune altre operazioni che puoi eseguire con Selenium Grid. Le istruzioni per Selenium Standalone dovrebbero funzionare correttamente anche con Selenium Grid. Consulta la documentazione di [Selenium Standalone](https://webdriver.io/docs/api/selenium/) per le opzioni disponibili.


### Documentazione ufficiale di Selenium Grid

Per maggiori informazioni su Selenium Grid, puoi consultare la [documentazione](https://www.selenium.dev/documentation/grid/) ufficiale di Selenium Grid. 

Se desideri eseguire Selenium Grid in Docker, Docker compose o Kubernetes, consulta il [repository GitHub](https://github.com/SeleniumHQ/docker-selenium) di Selenium-Docker.