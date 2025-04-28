---
id: watcher
title: Monitorare i File di Test
---

Con il testrunner WDIO puoi monitorare i file mentre ci lavori. Questi vengono automaticamente rieseguiti se modifichi qualcosa nella tua app o nei tuoi file di test. Aggiungendo il flag `--watch` quando chiami il comando `wdio`, il testrunner attenderà le modifiche ai file dopo aver eseguito tutti i test, ad esempio:

```sh
wdio wdio.conf.js --watch
```

Per impostazione predefinita, monitora solo le modifiche nei tuoi file `specs`. Tuttavia, impostando una proprietà `filesToWatch` nel tuo `wdio.conf.js` che contiene un elenco di percorsi di file (supporto per il globbing), monitorerà anche questi file per rilevare modifiche al fine di rieseguire l'intera suite. Questo è utile se desideri rieseguire automaticamente tutti i tuoi test quando hai modificato il codice dell'applicazione, ad esempio:

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
Cerca di eseguire i test in parallelo il più possibile. I test E2E sono, per natura, lenti. Rieseguire i test è utile solo se puoi mantenere breve il tempo di esecuzione dei singoli test. Per risparmiare tempo, il testrunner mantiene attive le sessioni WebDriver mentre attende le modifiche ai file. Assicurati che il tuo backend WebDriver possa essere modificato in modo che non chiuda automaticamente la sessione se nessun comando è stato eseguito dopo un certo periodo di tempo.
:::