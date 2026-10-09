---
id: jenkins
title: Jenkins
description: "Esegui i test WebdriverIO in Jenkins e pubblica i risultati del reporter JUnit per eseguire il debug degli errori e tenere traccia della cronologia dei test."
---

WebdriverIO offre una stretta integrazione con sistemi CI come [Jenkins](https://jenkins-ci.org). Con il reporter `junit`, puoi facilmente eseguire il debug dei tuoi test e tenere traccia dei risultati dei test. L'integrazione è piuttosto semplice.

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

Sta a te scegliere quale framework utilizzare. I report saranno simili.
Per questo tutorial, useremo Jasmine.

Dopo aver scritto un paio di test, puoi configurare un nuovo job Jenkins. Assegnagli un nome e una descrizione:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Poi assicurati che recuperi sempre la versione più recente del tuo repository:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Ora la parte importante:** Crea uno step di `build` per eseguire comandi shell. Lo step di `build` deve compilare il tuo progetto. Poiché questo progetto demo testa solo un'app esterna, non è necessario compilare nulla. Basta installare le dipendenze node ed eseguire il comando `npm test` (che è un alias per `node_modules/.bin/wdio test/wdio.conf.js`).

Se hai installato un plugin come AnsiColor, ma i log non sono ancora colorati, esegui i test con la variabile d'ambiente `FORCE_COLOR=1` (ad esempio, `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Dopo il test, vorrai che Jenkins tenga traccia del tuo report XUnit. Per farlo, devi aggiungere un'azione post-build chiamata _"Publish JUnit test result report"_.

Potresti anche installare un plugin XUnit esterno per tenere traccia dei tuoi report. Quello JUnit è incluso nell'installazione base di Jenkins ed è sufficiente per ora.

In base al file di configurazione, i report XUnit verranno salvati nella directory principale del progetto. Questi report sono file XML. Quindi, tutto ciò che devi fare per tenere traccia dei report è indicare a Jenkins tutti i file XML nella tua directory principale:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

Ecco fatto! Hai ora configurato Jenkins per eseguire i tuoi job WebdriverIO. Il tuo job fornirà ora risultati dettagliati dei test con grafici della cronologia, informazioni sullo stacktrace dei job falliti e un elenco dei comandi con il payload utilizzati in ciascun test.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")