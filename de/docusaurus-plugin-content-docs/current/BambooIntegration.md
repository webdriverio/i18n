---
id: bamboo
title: Bamboo
---

WebdriverIO bietet eine enge Integration in CI-Systeme wie [Bamboo](https://www.atlassian.com/software/bamboo). Mit dem [JUnit](https://webdriver.io/docs/junit-reporter.html) oder [Allure](https://webdriver.io/docs/allure-reporter.html) Reporter können Sie Ihre Tests leicht debuggen und Ihre Testergebnisse verfolgen. Die Integration ist ziemlich einfach.

1. Installieren Sie den JUnit-Testberichterstatter: `$ npm install @wdio/junit-reporter --save-dev`)
1. Aktualisieren Sie Ihre Konfiguration, um Ihre JUnit-Ergebnisse dort zu speichern, wo Bamboo sie finden kann (und geben Sie den `junit`-Reporter an):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
Hinweis: *Es ist immer ein guter Standard, die Testergebnisse in einem separaten Ordner und nicht im Stammordner zu speichern.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

Die Berichte werden für alle Frameworks ähnlich sein und Sie können jedes verwenden: Mocha, Jasmine oder Cucumber.

Zu diesem Zeitpunkt gehen wir davon aus, dass Sie die Tests geschrieben haben und die Ergebnisse im Ordner ```./testresults/``` generiert werden, und Ihr Bamboo läuft.

## Integrieren Sie Ihre Tests in Bamboo

1. Öffnen Sie Ihr Bamboo-Projekt
    > Erstellen Sie einen neuen Plan, verknüpfen Sie Ihr Repository (stellen Sie sicher, dass es immer auf die neueste Version Ihres Repositorys zeigt) und erstellen Sie Ihre Phasen

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Ich werde mit der Standardphase und dem Standardjob fortfahren. In Ihrem Fall können Sie Ihre eigenen Phasen und Jobs erstellen

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Öffnen Sie Ihren Testjob und erstellen Sie Aufgaben, um Ihre Tests in Bamboo auszuführen
    >**Aufgabe 1:** Source Code Checkout

    >**Aufgabe 2:** Führen Sie Ihre Tests aus ```npm i && npm run test```. Sie können die *Script*-Aufgabe und den *Shell Interpreter* verwenden, um die obigen Befehle auszuführen (Dies generiert die Testergebnisse und speichert sie im Ordner ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Aufgabe: 3** Fügen Sie die Aufgabe *jUnit Parser* hinzu, um Ihre gespeicherten Testergebnisse zu analysieren. Bitte geben Sie hier das Testergebnisverzeichnis an (Sie können auch Ant-Stilmuster verwenden)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Hinweis: *Stellen Sie sicher, dass Sie die Ergebnisparser-Aufgabe im Abschnitt *Final* halten, damit sie immer ausgeführt wird, auch wenn Ihre Testaufgabe fehlschlägt*

    >**Aufgabe: 4** (optional) Um sicherzustellen, dass Ihre Testergebnisse nicht mit alten Dateien durcheinander geraten, können Sie eine Aufgabe erstellen, um den Ordner ```./testresults/``` nach einer erfolgreichen Analyse in Bamboo zu entfernen. Sie können ein Shell-Skript wie ```rm -f ./testresults/*.xml``` hinzufügen, um die Ergebnisse zu entfernen, oder ```rm -r testresults```, um den gesamten Ordner zu entfernen

Sobald die obige *Raketenwissenschaft* erledigt ist, aktivieren Sie bitte den Plan und führen Sie ihn aus. Ihr endgültiges Ergebnis wird wie folgt aussehen:

## Erfolgreicher Test

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Fehlgeschlagener Test

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Fehlgeschlagen und Behoben

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Juhu!! Das ist alles. Sie haben Ihre WebdriverIO-Tests erfolgreich in Bamboo integriert.