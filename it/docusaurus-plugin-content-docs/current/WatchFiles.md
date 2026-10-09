---
id: watcher
title: Monitorare i File di Test
description: "Riesegui automaticamente i test quando i file spec o dell'applicazione cambiano, eseguendo il testrunner WDIO con il flag --watch e filesToWatch."
---

Con il testrunner WDIO puoi monitorare i file mentre ci stai lavorando. I test vengono rieseguiti automaticamente se modifichi qualcosa nella tua app o nei tuoi file di test. Aggiungendo il flag `--watch` quando richiami il comando `wdio`, il testrunner attenderà modifiche ai file dopo aver eseguito tutti i test, ad esempio:

```sh
wdio wdio.conf.js --watch
```

Per impostazione predefinita, monitora solo le modifiche nei tuoi file `specs`. Tuttavia, impostando una proprietà `filesToWatch` nel tuo `wdio.conf.js` che contiene un elenco di percorsi di file (globbing supportato), monitorerà anche le modifiche a questi file per rieseguire l'intera suite. Questo è utile se vuoi rieseguire automaticamente tutti i tuoi test quando hai modificato il codice della tua applicazione, ad esempio:

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // monitora tutti i file JS nella mia app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Cerca di eseguire i test in parallelo il più possibile. I test E2E sono, per natura, lenti. Rieseguire i test è utile solo se riesci a mantenere breve il tempo di esecuzione di ogni singolo test. Per risparmiare tempo, il testrunner mantiene attive le sessioni WebDriver mentre attende le modifiche ai file. Assicurati che il tuo backend WebDriver possa essere configurato in modo da non chiudere automaticamente la sessione se nessun comando è stato eseguito dopo un certo periodo di tempo.
:::