---
id: bamboo
title: Bamboo
---

WebdriverIO oferuje ścisłą integrację z systemami CI, takimi jak [Bamboo](https://www.atlassian.com/software/bamboo). Dzięki raportom [JUnit](https://webdriver.io/docs/junit-reporter.html) lub [Allure](https://webdriver.io/docs/allure-reporter.html), możesz łatwo debugować swoje testy oraz śledzić ich wyniki. Integracja jest dość prosta.

1. Zainstaluj reporter testów JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Zaktualizuj swoją konfigurację, aby zapisać wyniki JUnit w miejscu, gdzie Bamboo może je znaleźć (i określ reporter `junit`):

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
Uwaga: *Dobrą praktyką jest przechowywanie wyników testów w osobnym folderze, a nie w folderze głównym.*

```js
// wdio.conf.js - Dla testów uruchamianych równolegle
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

Raporty będą podobne dla wszystkich frameworków i możesz używać dowolnego z nich: Mocha, Jasmine lub Cucumber.

W tym momencie zakładamy, że masz już napisane testy, a wyniki są generowane w folderze ```./testresults/``` oraz twój Bamboo jest skonfigurowany i działa.

## Zintegruj swoje testy w Bamboo

1. Otwórz swój projekt Bamboo
    > Utwórz nowy plan, połącz swoje repozytorium (upewnij się, że zawsze wskazuje na najnowszą wersję twojego repozytorium) i utwórz swoje etapy

    ![Szczegóły planu](/img/bamboo/plancreation.png "Szczegóły planu")

    Ja użyję domyślnego etapu i zadania. W twoim przypadku możesz utworzyć własne etapy i zadania

    ![Domyślny etap](/img/bamboo/defaultstage.png "Domyślny etap")
2. Otwórz swoje zadanie testowe i utwórz zadania do uruchomienia testów w Bamboo
    >**Zadanie 1:** Pobranie kodu źródłowego

    >**Zadanie 2:** Uruchom swoje testy ```npm i && npm run test```. Możesz użyć zadania *Script* i *Shell Interpreter* do uruchomienia powyższych poleceń (To wygeneruje wyniki testów i zapisze je w folderze ```./testresults/```)

    ![Uruchomienie testu](/img/bamboo/testrun.png "Uruchomienie testu")

    >**Zadanie: 3** Dodaj zadanie *jUnit Parser* do analizy zapisanych wyników testów. Określ tutaj katalog wyników testów (możesz również użyć wzorców w stylu Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Uwaga: *Upewnij się, że zadanie analizy wyników znajduje się w sekcji *Final*, aby zawsze było wykonywane, nawet jeśli twoje zadanie testowe zakończy się niepowodzeniem*

    >**Zadanie: 4** (opcjonalne) Aby upewnić się, że twoje wyniki testów nie są pomieszane ze starymi plikami, możesz utworzyć zadanie usuwające folder ```./testresults/``` po pomyślnej analizie w Bamboo. Możesz dodać skrypt powłoki, taki jak ```rm -f ./testresults/*.xml``` aby usunąć wyniki lub ```rm -r testresults``` aby usunąć cały folder

Po zakończeniu powyższej *wiedzy rakietowej*, włącz plan i uruchom go. Twój końcowy wynik będzie wyglądał jak:

## Udany test

![Udany test](/img/bamboo/successfulltest.png "Udany test")

## Nieudany test

![Nieudany test](/img/bamboo/failedtest.png "Nieudany test")

## Nieudany i naprawiony

![Nieudany i naprawiony](/img/bamboo/failedandfixed.png "Nieudany i naprawiony")

Juhu!! To wszystko. Pomyślnie zintegrowałeś swoje testy WebdriverIO z Bamboo.