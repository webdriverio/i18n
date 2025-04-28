---
id: jenkins
title: Jenkins
---

WebdriverIO offre un'integrazione stretta con sistemi CI come [Jenkins](https://jenkins-ci.org). Con il reporter `junit`, puoi facilmente eseguire il debug dei tuoi test e tenere traccia dei risultati dei test. L'integrazione è abbastanza semplice.

1. Installa il test reporter `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
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

Dopo aver scritto alcuni test, puoi configurare un nuovo job Jenkins. Dagli un nome e una descrizione:

![Nome e Descrizione](/img/jenkins/jobname.png "Nome e Descrizione")

Poi assicurati che ottenga sempre la versione più recente del tuo repository:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Ora la parte importante:** Crea un passaggio di `build` per eseguire comandi shell. Il passaggio di `build` deve compilare il tuo progetto. Poiché questo progetto demo testa solo un'app esterna, non hai bisogno di compilare nulla. Basta installare le dipendenze node ed eseguire il comando `npm test` (che è un alias per `node_modules/.bin/wdio test/wdio.conf.js`).

Se hai installato un plugin come AnsiColor, ma i log non sono ancora colorati, esegui i test con la variabile d'ambiente `FORCE_COLOR=1` (ad esempio, `FORCE_COLOR=1 npm test`).

![Passaggio di Build](/img/jenkins/runjob.png "Passaggio di Build")

Dopo il test, vorrai che Jenkins tenga traccia del tuo report XUnit. Per farlo, devi aggiungere un'azione post-build chiamata _"Publish JUnit test result report"_.

Potresti anche installare un plugin XUnit esterno per tracciare i tuoi report. Quello JUnit viene fornito con l'installazione di base di Jenkins ed è sufficiente per ora.

Secondo il file di configurazione, i report XUnit verranno salvati nella directory root del progetto. Questi report sono file XML. Quindi, tutto ciò che devi fare per tracciare i report è indicare a Jenkins tutti i file XML nella tua directory root:

![Azione Post-build](/img/jenkins/postjob.png "Azione Post-build")

Ecco fatto! Hai configurato Jenkins per eseguire i tuoi job WebdriverIO. Il tuo job fornirà ora risultati dettagliati dei test con grafici storici, informazioni sullo stacktrace per i job falliti e un elenco di comandi con payload che sono stati utilizzati in ogni test.

![Integrazione Finale Jenkins](/img/jenkins/final.png "Integrazione Finale Jenkins")