---
id: bamboo
title: Bamboo
description: "Kör WebdriverIO-tester i Atlassian Bamboo och publicera JUnit-resultat så att du kan följa godkända, misslyckade och åtgärdade tester per bygge."
---

WebdriverIO erbjuder en nära integration med CI-system som [Bamboo](https://www.atlassian.com/software/bamboo). Med [JUnit](https://webdriver.io/docs/junit-reporter.html)- eller [Allure](https://webdriver.io/docs/allure-reporter.html)-rapportören kan du enkelt felsöka dina tester och hålla koll på dina testresultat. Integrationen är ganska enkel.

1. Installera JUnit-testrapportören: `$ npm install @wdio/junit-reporter --save-dev`)
1. Uppdatera din konfiguration så att dina JUnit-resultat sparas där Bamboo kan hitta dem (och ange `junit`-rapportören):

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
Obs: *Det är alltid god praxis att spara testresultaten i en separat mapp i stället för i rotmappen.*

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

Rapporterna blir likadana för alla ramverk och du kan använda vilket som helst: Mocha, Jasmine eller Cucumber.

Vid det här laget utgår vi från att du har skrivit dina tester, att resultaten genereras i mappen ```./testresults/``` och att din Bamboo är igång.

## Integrera dina tester i Bamboo

1. Öppna ditt Bamboo-projekt
    > Skapa en ny plan, länka ditt repository (se till att det alltid pekar på den senaste versionen av ditt repository) och skapa dina stages

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Jag använder standard-stage och standard-job. I ditt fall kan du skapa egna stages och jobs

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Öppna ditt testjobb och skapa tasks för att köra dina tester i Bamboo
    >**Task 1:** Utcheckning av källkod

    >**Task 2:** Kör dina tester ```npm i && npm run test```. Du kan använda en *Script*-task och *Shell Interpreter* för att köra kommandona ovan (detta genererar testresultaten och sparar dem i mappen ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Task: 3** Lägg till en *jUnit Parser*-task för att tolka dina sparade testresultat. Ange katalogen för testresultaten här (du kan även använda mönster i Ant-stil)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Obs: *Se till att du placerar resultattolkningstasken i sektionen *Final*, så att den alltid körs även om din testtask misslyckas*

    >**Task: 4** (valfritt) För att säkerställa att dina testresultat inte blandas ihop med gamla filer kan du skapa en task som tar bort mappen ```./testresults/``` efter en lyckad tolkning i Bamboo. Du kan lägga till ett shell-skript som ```rm -f ./testresults/*.xml``` för att ta bort resultaten eller ```rm -r testresults``` för att ta bort hela mappen

När ovanstående *raketforskning* är klar, aktivera planen och kör den. Ditt slutresultat kommer att se ut så här:

## Lyckat test

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Misslyckat test

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Misslyckat och åtgärdat

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Hurra!! Det var allt. Du har nu integrerat dina WebdriverIO-tester i Bamboo.