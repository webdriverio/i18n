---
id: bamboo
title: Bamboo
---

WebdriverIO erbjuder en tät integration med CI-system som [Bamboo](https://www.atlassian.com/software/bamboo). Med [JUnit](https://webdriver.io/docs/junit-reporter.html) eller [Allure](https://webdriver.io/docs/allure-reporter.html) rapportören kan du enkelt felsöka dina tester samt hålla koll på dina testresultat. Integrationen är ganska enkel.

1. Installera JUnit testrapportören: `$ npm install @wdio/junit-reporter --save-dev`)
1. Uppdatera din konfiguration för att spara dina JUnit-resultat där Bamboo kan hitta dem (och ange `junit` rapportören):

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
Obs: *Det är alltid en bra standard att hålla testresultaten i en separat mapp än i rotmappen.*

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

Rapporterna kommer att vara liknande för alla ramverk och du kan använda vilket som helst: Mocha, Jasmine eller Cucumber.

Vid det här laget tror vi att du har skrivit testerna och resultaten genereras i ```./testresults/``` mappen, och att din Bamboo är igång och körs.

## Integrera dina tester i Bamboo

1. Öppna ditt Bamboo-projekt
    > Skapa en ny plan, länka din repository (se till att den alltid pekar på den senaste versionen av din repository) och skapa dina steg

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Jag kommer att gå med standardsteget och jobbet. I ditt fall kan du skapa dina egna steg och jobb

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Öppna ditt testjobb och skapa uppgifter för att köra dina tester i Bamboo
    >**Uppgift 1:** Source Code Checkout

    >**Uppgift 2:** Kör dina tester ```npm i && npm run test```. Du kan använda *Script*-uppgiften och *Shell Interpreter* för att köra ovanstående kommandon (Detta kommer att generera testresultaten och spara dem i ```./testresults/``` mappen)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Uppgift: 3** Lägg till *jUnit Parser*-uppgiften för att analysera dina sparade testresultat. Vänligen ange testresultatskatalogen här (du kan också använda Ant-stilmönster)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Obs: *Se till att du håller resultatanalyseringsuppgiften i *Final*-sektionen, så att den alltid körs även om din testuppgift misslyckas*

    >**Uppgift: 4** (valfritt) För att se till att dina testresultat inte blandas ihop med gamla filer kan du skapa en uppgift för att ta bort ```./testresults/``` mappen efter en lyckad analys till Bamboo. Du kan lägga till ett skalskript som ```rm -f ./testresults/*.xml``` för att ta bort resultaten eller ```rm -r testresults``` för att ta bort hela mappen

När ovanstående *raketvetenskap* är klar, aktivera planen och kör den. Ditt slutliga resultat kommer att se ut så här:

## Lyckat test

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Misslyckat test

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Misslyckat och åtgärdat

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Yay!! Det är allt. Du har framgångsrikt integrerat dina WebdriverIO-tester i Bamboo.