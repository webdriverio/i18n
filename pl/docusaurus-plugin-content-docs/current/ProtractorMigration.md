---
id: protractor-migration
title: Z Protractora
description: "Przeprowadź krok po kroku migrację zestawu testów Protractor do WebdriverIO, obejmującą zależności, plik konfiguracyjny i pliki testowe, z pomocą codemoda."
---

Ten samouczek jest przeznaczony dla osób, które używają Protractora i chcą przenieść swój framework do WebdriverIO. Powstał po tym, jak zespół Angulara [ogłosił](https://github.com/angular/protractor/issues/5502), że Protractor nie będzie już wspierany. WebdriverIO powstał pod wpływem wielu decyzji projektowych Protractora, dlatego jest prawdopodobnie najbliższym frameworkiem, na który można się przenieść. Zespół WebdriverIO docenia pracę każdego współtwórcy Protractora i ma nadzieję, że ten samouczek sprawi, że przejście na WebdriverIO będzie łatwe i bezproblemowe.

Choć chcielibyśmy mieć w pełni zautomatyzowany proces, rzeczywistość wygląda inaczej. Każdy ma inną konfigurację i używa Protractora na różne sposoby. Każdy krok należy traktować raczej jako wskazówkę niż jako instrukcję krok po kroku. Jeśli masz problemy z migracją, nie wahaj się [skontaktować z nami](https://github.com/webdriverio/codemod/discussions/new).

## Konfiguracja

API Protractora i WebdriverIO są w rzeczywistości bardzo podobne, do tego stopnia, że większość poleceń można przepisać w sposób zautomatyzowany za pomocą [codemoda](https://github.com/webdriverio/codemod).

Aby zainstalować codemod, uruchom:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategia

Istnieje wiele strategii migracji. W zależności od wielkości zespołu, liczby plików testowych i pilności migracji możesz spróbować przekształcić wszystkie testy naraz lub plik po pliku. Biorąc pod uwagę, że Protractor będzie utrzymywany do wersji Angulara 15 (koniec 2022 roku), wciąż masz wystarczająco dużo czasu. Możesz jednocześnie uruchamiać testy Protractora i WebdriverIO oraz zacząć pisać nowe testy w WebdriverIO. W zależności od budżetu czasowego możesz najpierw zacząć migrować najważniejsze przypadki testowe, a następnie stopniowo przechodzić do testów, które być może nawet można usunąć.

## Najpierw plik konfiguracyjny

Po zainstalowaniu codemoda możemy zacząć przekształcać pierwszy plik. Najpierw zapoznaj się z [opcjami konfiguracyjnymi WebdriverIO](configuration). Pliki konfiguracyjne mogą stać się bardzo złożone i warto przenieść tylko najważniejsze części, a następnie sprawdzić, jak można dodać resztę, gdy migrowane będą odpowiednie testy wymagające określonych opcji.

Przy pierwszej migracji przekształcamy tylko plik konfiguracyjny i uruchamiamy:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Twój plik konfiguracyjny może mieć inną nazwę, jednak zasada powinna być taka sama: zacznij migrację od pliku konfiguracyjnego.

:::

## Instalacja zależności WebdriverIO

Kolejnym krokiem jest skonfigurowanie minimalnego środowiska WebdriverIO, które będziemy rozbudowywać w trakcie migracji z jednego frameworka do drugiego. Najpierw instalujemy WebdriverIO CLI za pomocą:

```sh
npm install --save-dev @wdio/cli
```

Następnie uruchamiamy kreator konfiguracji:

```sh
npx wdio config
```

Kreator przeprowadzi Cię przez kilka pytań. W tym scenariuszu migracji:
- wybierz opcje domyślne
- zalecamy, aby nie generować automatycznie przykładowych plików
- wybierz inny folder na pliki WebdriverIO
- oraz wybierz Mocha zamiast Jasmine.

:::info Dlaczego Mocha?
Nawet jeśli wcześniej używałeś Protractora z Jasmine, Mocha zapewnia lepsze mechanizmy ponawiania. Wybór należy do Ciebie!
:::

Po krótkiej ankiecie kreator zainstaluje wszystkie niezbędne pakiety i zapisze je w Twoim pliku `package.json`.

## Migracja pliku konfiguracyjnego

Gdy mamy już przekształcony `conf.ts` i nowy `wdio.conf.ts`, nadszedł czas na przeniesienie konfiguracji z jednego pliku do drugiego. Upewnij się, że przenosisz tylko kod niezbędny do uruchomienia wszystkich testów. W naszym przypadku przenosimy funkcję hooka i limit czasu frameworka.

Teraz będziemy kontynuować pracę wyłącznie z plikiem `wdio.conf.ts`, więc nie będziemy już potrzebować żadnych zmian w oryginalnej konfiguracji Protractora. Możemy je cofnąć, aby oba frameworki mogły działać obok siebie, a my mogli przenosić jeden plik naraz.

## Migracja pliku testowego

Jesteśmy teraz gotowi, aby przenieść pierwszy plik testowy. Aby zacząć od czegoś prostego, wybierzmy plik, który nie ma wielu zależności od pakietów zewnętrznych ani innych plików, takich jak PageObjects. W naszym przykładzie pierwszym plikiem do migracji jest `first-test.spec.ts`. Najpierw utwórz katalog, w którym nowa konfiguracja WebdriverIO oczekuje swoich plików, a następnie przenieś do niego plik:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Teraz przekształćmy ten plik:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

To wszystko! Ten plik jest tak prosty, że nie potrzebujemy już żadnych dodatkowych zmian i możemy od razu spróbować uruchomić WebdriverIO za pomocą:

```sh
npx wdio run wdio.conf.ts
```

Gratulacje 🥳 właśnie przeniosłeś pierwszy plik!

## Kolejne kroki

Od tego momentu kontynuujesz przekształcanie test po teście i page object po page object. Istnieje szansa, że codemod zakończy się niepowodzeniem dla niektórych plików z błędem takim jak:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Dla niektórych poleceń Protractora po prostu nie ma zamiennika w WebdriverIO. W takim przypadku codemod podpowie Ci, jak je zrefaktoryzować. Jeśli zbyt często napotykasz takie komunikaty o błędach, śmiało [zgłoś problem](https://github.com/webdriverio/codemod/issues/new) i poproś o dodanie określonej transformacji. Chociaż codemod przekształca już większość API Protractora, wciąż jest wiele miejsca na ulepszenia.

## Podsumowanie

Mamy nadzieję, że ten samouczek choć trochę przeprowadzi Cię przez proces migracji do WebdriverIO. Społeczność nadal ulepsza codemod, testując go z różnymi zespołami w różnych organizacjach. Nie wahaj się [zgłosić problemu](https://github.com/webdriverio/codemod/issues/new), jeśli masz uwagi, lub [rozpocząć dyskusję](https://github.com/webdriverio/codemod/discussions/new), jeśli napotkasz trudności podczas procesu migracji.