---
id: jenkins
title: Jenkins
---

WebdriverIO bietet eine enge Integration in CI-Systeme wie [Jenkins](https://jenkins-ci.org). Mit dem `junit`-Reporter können Sie Ihre Tests leicht debuggen und Ihre Testergebnisse im Auge behalten. Die Integration ist ziemlich einfach.

1. Installieren Sie den `junit`-Testberichterstatter: `$ npm install @wdio/junit-reporter --save-dev`)
1. Aktualisieren Sie Ihre Konfiguration, um Ihre XUnit-Ergebnisse dort zu speichern, wo Jenkins sie finden kann,
    (und geben Sie den `junit`-Reporter an):

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

Es liegt an Ihnen, welches Framework Sie wählen. Die Berichte werden ähnlich sein.
Für dieses Tutorial verwenden wir Jasmine.

Nachdem Sie einige Tests geschrieben haben, können Sie einen neuen Jenkins-Job einrichten. Geben Sie ihm einen Namen und eine Beschreibung:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Stellen Sie dann sicher, dass immer die neueste Version Ihres Repositories abgerufen wird:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Jetzt der wichtige Teil:** Erstellen Sie einen `build`-Schritt, um Shell-Befehle auszuführen. Der `build`-Schritt muss Ihr Projekt erstellen. Da dieses Demo-Projekt nur eine externe App testet, müssen Sie nichts erstellen. Installieren Sie einfach die Node-Abhängigkeiten und führen Sie den Befehl `npm test` aus (was ein Alias für `node_modules/.bin/wdio test/wdio.conf.js` ist).

Wenn Sie ein Plugin wie AnsiColor installiert haben, die Logs aber immer noch nicht farbig sind, führen Sie Tests mit der Umgebungsvariable `FORCE_COLOR=1` aus (z.B. `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Nach Ihrem Test möchten Sie, dass Jenkins Ihren XUnit-Bericht verfolgt. Dazu müssen Sie eine Post-Build-Aktion namens _"Publish JUnit test result report"_ hinzufügen.

Sie könnten auch ein externes XUnit-Plugin installieren, um Ihre Berichte zu verfolgen. Das JUnit-Plugin wird mit der grundlegenden Jenkins-Installation geliefert und ist vorerst ausreichend.

Gemäß der Konfigurationsdatei werden die XUnit-Berichte im Stammverzeichnis des Projekts gespeichert. Diese Berichte sind XML-Dateien. Alles, was Sie tun müssen, um die Berichte zu verfolgen, ist, Jenkins auf alle XML-Dateien in Ihrem Stammverzeichnis zu verweisen:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

Das war's! Sie haben jetzt Jenkins eingerichtet, um Ihre WebdriverIO-Jobs auszuführen. Ihr Job wird nun detaillierte Testergebnisse mit Verlaufsdiagrammen, Stacktrace-Informationen zu fehlgeschlagenen Jobs und eine Liste von Befehlen mit Nutzlast bereitstellen, die in jedem Test verwendet wurden.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")