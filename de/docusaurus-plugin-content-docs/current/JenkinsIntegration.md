---
id: jenkins
title: Jenkins
description: "Führen Sie WebdriverIO-Tests in Jenkins aus und veröffentlichen Sie die Ergebnisse des JUnit-Reporters, um Fehler zu debuggen und den Testverlauf zu verfolgen."
---

WebdriverIO bietet eine enge Integration in CI-Systeme wie [Jenkins](https://jenkins-ci.org). Mit dem `junit`-Reporter können Sie Ihre Tests einfach debuggen und Ihre Testergebnisse im Blick behalten. Die Integration ist ziemlich einfach.

1. Installieren Sie den `junit`-Test-Reporter: `$ npm install @wdio/junit-reporter --save-dev`)
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

Es liegt bei Ihnen, welches Framework Sie wählen. Die Berichte werden ähnlich sein.
Für dieses Tutorial verwenden wir Jasmine.

Nachdem Sie ein paar Tests geschrieben haben, können Sie einen neuen Jenkins-Job einrichten. Geben Sie ihm einen Namen und eine Beschreibung:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Stellen Sie dann sicher, dass er immer die neueste Version Ihres Repositorys abruft:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Jetzt der wichtige Teil:** Erstellen Sie einen `build`-Schritt, um Shell-Befehle auszuführen. Der `build`-Schritt muss Ihr Projekt bauen. Da dieses Demo-Projekt nur eine externe App testet, müssen Sie nichts bauen. Installieren Sie einfach die Node-Abhängigkeiten und führen Sie den Befehl `npm test` aus (der ein Alias für `node_modules/.bin/wdio test/wdio.conf.js` ist).

Wenn Sie ein Plugin wie AnsiColor installiert haben, die Logs aber trotzdem nicht farbig sind, führen Sie die Tests mit der Umgebungsvariable `FORCE_COLOR=1` aus (z. B. `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Nach Ihrem Test möchten Sie, dass Jenkins Ihren XUnit-Bericht verfolgt. Dazu müssen Sie eine Post-Build-Aktion namens _"Publish JUnit test result report"_ hinzufügen.

Sie könnten auch ein externes XUnit-Plugin installieren, um Ihre Berichte zu verfolgen. Das JUnit-Plugin ist in der Basisinstallation von Jenkins enthalten und reicht vorerst völlig aus.

Gemäß der Konfigurationsdatei werden die XUnit-Berichte im Stammverzeichnis des Projekts gespeichert. Diese Berichte sind XML-Dateien. Um die Berichte zu verfolgen, müssen Sie Jenkins also lediglich auf alle XML-Dateien in Ihrem Stammverzeichnis verweisen:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

Das war's! Sie haben Jenkins nun so eingerichtet, dass es Ihre WebdriverIO-Jobs ausführt. Ihr Job liefert jetzt detaillierte Testergebnisse mit Verlaufsdiagrammen, Stacktrace-Informationen zu fehlgeschlagenen Jobs sowie eine Liste der Befehle mit Payload, die in jedem Test verwendet wurden.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")