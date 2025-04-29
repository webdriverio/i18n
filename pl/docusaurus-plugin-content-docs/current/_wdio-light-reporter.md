---
id: wdio-light-reporter
title: Light Reporter Reporter
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter jest pakietem zewnętrznym, aby uzyskać więcej informacji zobacz [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Zainspirowany przez HTML i Mochawesome reporter

!Filozofia:

> Ten reporter nie obsługuje regeneracji raportów cucumber i został opracowany z myślą o frameworkach bdd i mocha.
> Tutaj, sekcja `describe()` jest uważana za scenariusz testowy, a `it()` jako przypadek testowy wewnątrz scenariusza testowego.

## FUNKCJE

1. Łatwa konfiguracja
2. Ulepszone UI
3. Zrzuty ekranu osadzone w raporcie HTML
4. addLabel() do dołączania kontekstu kroków lub nazwy

## Wersje
V 0.1.9 - Pierwsza wersja
V 0.2.6 - (najnowsza)
  1. Obsługa wielu środowisk i ich segregacja na podstawie środowiska.
  2. Naprawa błędów
  3. Poprawiona wydajność.

## PRZYKŁADY

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Instalacja

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Konfiguracja

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Zrzuty ekranu

Reporter nie ma możliwości automatycznej konfiguracji do robienia zrzutów ekranu, jednak jeśli jest skonfigurowany ręcznie, nasłuchuje zdarzenia i dołącza zrzuty ekranu do raportu HTML.
**Aby dołączyć zrzuty ekranu do raportu, dodaj poniższy kod w hooku afterTest() w pliku konfiguracyjnym wdio.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Pliki wynikowe

Każde uruchomienie regeneruje raport JSON dla każdego pliku specyfikacji, aby wygenerować połączony raport JSON i HTML, dodaj poniższy kod w hooku **onComplete()** w pliku konfiguracyjnym wdio

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Jeśli uruchomisz testy bez opcji --suite, to przyjmuje domyślny jako suite
> Reporter nie działa, jeśli podasz wiele parametrów jako zestawy podczas uruchamiania.
> wdio run `wdio.conf.js --suite firstSuite` - **(DZIAŁA DOBRZE)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(NIE DZIAŁA)** :(

## Dodawanie kontekstu

> Możesz użyć `useLabel()`, aby dodać kontekst do dowolnych kroków lub dodać go jako kroki.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Aktualizacje
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Licencja

MIT
**Darmowe, O tak!**