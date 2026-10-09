---
id: bamboo
title: Bamboo
description: "Führen Sie WebdriverIO-Tests in Atlassian Bamboo aus und veröffentlichen Sie JUnit-Ergebnisse, um bestandene, fehlgeschlagene und behobene Tests pro Build zu verfolgen."
---

WebdriverIO bietet eine enge Integration mit CI-Systemen wie [Bamboo](https://www.atlassian.com/software/bamboo). Mit dem [JUnit](https://webdriver.io/docs/junit-reporter.html)- oder [Allure](https://webdriver.io/docs/allure-reporter.html)-Reporter können Sie Ihre Tests einfach debuggen und Ihre Testergebnisse im Blick behalten. Die Integration ist ziemlich einfach.

1. Installieren Sie den JUnit-Test-Reporter: `$ npm install @wdio/junit-reporter --save-dev`)
1. Aktualisieren Sie Ihre Konfiguration, damit Ihre JUnit-Ergebnisse dort gespeichert werden, wo Bamboo sie finden kann (und geben Sie den `junit`-Reporter an):

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
Hinweis: *Es ist immer eine gute Praxis, die Testergebnisse in einem separaten Ordner statt im Stammverzeichnis abzulegen.*

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

Die Berichte sind für alle Frameworks ähnlich, und Sie können jedes davon verwenden: Mocha, Jasmine oder Cucumber.

An diesem Punkt gehen wir davon aus, dass Sie Ihre Tests geschrieben haben, die Ergebnisse im Ordner ```./testresults/``` generiert werden und Ihr Bamboo läuft.

## Integrieren Sie Ihre Tests in Bamboo

1. Öffnen Sie Ihr Bamboo-Projekt
    > Erstellen Sie einen neuen Plan, verknüpfen Sie Ihr Repository (stellen Sie sicher, dass es immer auf die neueste Version Ihres Repositorys verweist) und erstellen Sie Ihre Stages

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Ich verwende die Standard-Stage und den Standard-Job. In Ihrem Fall können Sie Ihre eigenen Stages und Jobs erstellen

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Öffnen Sie Ihren Test-Job und erstellen Sie Tasks, um Ihre Tests in Bamboo auszuführen
    >**Task 1:** Source Code Checkout

    >**Task 2:** Führen Sie Ihre Tests aus ```npm i && npm run test```. Sie können den *Script*-Task und den *Shell Interpreter* verwenden, um die oben genannten Befehle auszuführen (dadurch werden die Testergebnisse generiert und im Ordner ```./testresults/``` gespeichert)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Task: 3** Fügen Sie den *jUnit Parser*-Task hinzu, um Ihre gespeicherten Testergebnisse zu parsen. Bitte geben Sie hier das Verzeichnis der Testergebnisse an (Sie können auch Ant-Style-Patterns verwenden)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Hinweis: *Stellen Sie sicher, dass Sie den Task zum Parsen der Ergebnisse im Abschnitt *Final* platzieren, damit er immer ausgeführt wird, auch wenn Ihr Test-Task fehlschlägt*

    >**Task: 4** (optional) Um sicherzustellen, dass Ihre Testergebnisse nicht mit alten Dateien vermischt werden, können Sie einen Task erstellen, der den Ordner ```./testresults/``` nach einem erfolgreichen Parsen in Bamboo entfernt. Sie können ein Shell-Skript wie ```rm -f ./testresults/*.xml``` hinzufügen, um die Ergebnisse zu entfernen, oder ```rm -r testresults```, um den gesamten Ordner zu entfernen

Sobald die obige *Raketenwissenschaft* erledigt ist, aktivieren Sie bitte den Plan und führen Sie ihn aus. Ihre endgültige Ausgabe sieht dann so aus:

## Erfolgreicher Test

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Fehlgeschlagener Test

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Fehlgeschlagen und behoben

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Juhu!! Das ist alles. Sie haben Ihre WebdriverIO-Tests erfolgreich in Bamboo integriert.