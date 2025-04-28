---
id: jenkins
title: Jenkins
---

WebdriverIO offre un'integrazione stretta con sistemi CI come [Jenkins](https://jenkins-ci.org). Con il reporter `junit`, puoi facilmente debuggare i tuoi test e tenere traccia dei risultati dei test. L'integrazione è piuttosto semplice.

1. Installa il reporter di test `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Aggiorna la tua configurazione per salvare i risultati XUnit dove Jenkins può trovarli,
    (e specifica il reporter `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

Sta a te quale framework scegliere. I report saranno simili.
Per questo tutorial, useremo Jasmine.

Dopo aver scritto un paio di test, puoi configurare un nuovo job Jenkins. Dagli un nome e una descrizione:

![Nome e Descrizione](/img/jenkins/jobname.png "Nome e Descrizione")

Poi assicurati che prenda sempre la versione più recente del tuo repository:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Ora la parte importante:** Crea uno step di `build` per eseguire comandi shell. Lo step di `build` deve compilare il tuo progetto. Poiché questo progetto demo testa solo un'app esterna, non hai bisogno di compilare nulla. Installa semplicemente le dipendenze node ed esegui il comando `npm test` (che è un alias per `node_modules/.bin/wdio test/wdio.conf.js`).

Se hai installato un plugin come AnsiColor, ma i log non sono ancora colorati, esegui i test con la variabile d'ambiente `FORCE_COLOR=1` (es., `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Dopo il tuo test, vorrai che Jenkins tenga traccia del tuo report XUnit. Per farlo, devi aggiungere un'azione post-build chiamata _"Publish JUnit test result report"_.

Potresti anche installare un plugin XUnit esterno per tracciare i tuoi report. Quello JUnit viene fornito con l'installazione base di Jenkins ed è sufficiente per ora.

Secondo il file di configurazione, i report XUnit verranno salvati nella directory root del progetto. Questi report sono file XML. Quindi, tutto ciò che devi fare per tracciare i report è indicare a Jenkins tutti i file XML nella tua directory root:

![Azione Post-build](/img/jenkins/postjob.png "Azione Post-build")

Ecco fatto! Hai configurato Jenkins per eseguire i tuoi job WebdriverIO. Il tuo job fornirà ora risultati dettagliati dei test con grafici storici, informazioni sullo stacktrace per i job falliti e un elenco di comandi con payload utilizzati in ogni test.

![Integrazione Finale Jenkins](/img/jenkins/final.png "Integrazione Finale Jenkins")