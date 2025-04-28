---
id: watcher
title: Guarda i File di Test
---

Con il testrunner WDIO puoi osservare i file mentre ci stai lavorando. Vengono eseguiti automaticamente se modifichi qualcosa nella tua app o nei tuoi file di test. Aggiungendo un flag `--watch` quando chiami il comando `wdio`, il testrunner attenderà le modifiche ai file dopo aver eseguito tutti i test, ad esempio:

```sh
wdio wdio.conf.js --watch
```

Per impostazione predefinita, osserva solo le modifiche nei tuoi file `specs`. Tuttavia, impostando una proprietà `filesToWatch` nel tuo `wdio.conf.js` che contiene un elenco di percorsi di file (con supporto per il globbing), osserverà anche le modifiche a questi file per rieseguire l'intera suite. Questo è utile se vuoi rieseguire automaticamente tutti i tuoi test quando modifichi il codice dell'applicazione, ad esempio:

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Cerca di eseguire i test in parallelo il più possibile. I test E2E sono, per natura, lenti. Rieseguire i test è utile solo se puoi mantenere il tempo di esecuzione del singolo test breve. Per risparmiare tempo, il testrunner mantiene attive le sessioni WebDriver mentre attende le modifiche ai file. Assicurati che il tuo backend WebDriver possa essere modificato in modo che non chiuda automaticamente la sessione se nessun comando è stato eseguito dopo un certo periodo di tempo.
:::