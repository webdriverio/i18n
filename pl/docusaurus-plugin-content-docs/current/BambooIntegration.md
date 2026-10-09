---
id: bamboo
title: Bamboo
description: "Uruchamiaj testy WebdriverIO w Atlassian Bamboo i publikuj wyniki JUnit, aby śledzić testy zaliczone, niezaliczone i naprawione w każdym buildzie."
---

WebdriverIO oferuje ścisłą integrację z systemami CI, takimi jak [Bamboo](https://www.atlassian.com/software/bamboo). Dzięki reporterowi [JUnit](https://webdriver.io/docs/junit-reporter.html) lub [Allure](https://webdriver.io/docs/allure-reporter.html) możesz łatwo debugować swoje testy, a także śledzić ich wyniki. Integracja jest całkiem prosta.

1. Zainstaluj reporter testów JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Zaktualizuj swoją konfigurację, aby zapisywać wyniki JUnit w miejscu, w którym Bamboo może je znaleźć (i określ reporter `junit`):

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
Uwaga: *Dobrą praktyką jest zawsze przechowywanie wyników testów w osobnym folderze, a nie w folderze głównym.*

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

Raporty będą podobne dla wszystkich frameworków i możesz użyć dowolnego z nich: Mocha, Jasmine lub Cucumber.

Zakładamy, że w tym momencie masz już napisane testy, wyniki są generowane w folderze ```./testresults/```, a twoje Bamboo jest skonfigurowane i działa.

## Zintegruj swoje testy z Bamboo

1. Otwórz swój projekt Bamboo
    > Utwórz nowy plan, połącz swoje repozytorium (upewnij się, że zawsze wskazuje na najnowszą wersję repozytorium) i utwórz etapy (stages)

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Ja skorzystam z domyślnego etapu i zadania (job). W twoim przypadku możesz utworzyć własne etapy i zadania

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Otwórz swoje zadanie testowe i utwórz zadania (tasks), aby uruchamiać testy w Bamboo
    >**Zadanie 1:** Pobranie kodu źródłowego (Source Code Checkout)

    >**Zadanie 2:** Uruchom swoje testy ```npm i && npm run test```. Możesz użyć zadania *Script* oraz *Shell Interpreter*, aby uruchomić powyższe polecenia (spowoduje to wygenerowanie wyników testów i zapisanie ich w folderze ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Zadanie: 3** Dodaj zadanie *jUnit Parser*, aby przetworzyć zapisane wyniki testów. Określ tutaj katalog z wynikami testów (możesz również używać wzorców w stylu Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Uwaga: *Upewnij się, że zadanie parsera wyników znajduje się w sekcji *Final*, aby zawsze było wykonywane, nawet jeśli zadanie testowe zakończy się niepowodzeniem*

    >**Zadanie: 4** (opcjonalne) Aby mieć pewność, że wyniki testów nie zostaną pomieszane ze starymi plikami, możesz utworzyć zadanie usuwające folder ```./testresults/``` po pomyślnym przetworzeniu wyników przez Bamboo. Możesz dodać skrypt powłoki, taki jak ```rm -f ./testresults/*.xml```, aby usunąć wyniki, lub ```rm -r testresults```, aby usunąć cały folder

Gdy powyższa *wiedza tajemna* zostanie opanowana, włącz plan i uruchom go. Ostateczny wynik będzie wyglądał następująco:

## Udany test

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Nieudany test

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Nieudany i naprawiony

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Hurra!! To wszystko. Udało ci się zintegrować testy WebdriverIO z Bamboo.