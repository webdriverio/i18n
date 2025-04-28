---
id: protractor-migration
title: Z Protractora
---

Ten tutorial jest dla osób, które używają Protractora i chcą migrować swój framework do WebdriverIO. Został zainicjowany po tym, jak zespół Angular [ogłosił](https://github.com/angular/protractor/issues/5502), że Protractor nie będzie już wspierany. WebdriverIO było pod wpływem wielu decyzji projektowych Protractora, co sprawia, że jest prawdopodobnie najbliższym frameworkiem do migracji. Zespół WebdriverIO docenia pracę każdego kontrybutora Protractora i ma nadzieję, że ten tutorial uczyni przejście na WebdriverIO łatwym i prostym.

Chociaż chcielibyśmy mieć w pełni zautomatyzowany proces migracji, rzeczywistość wygląda inaczej. Każdy ma inną konfigurację i używa Protractora na różne sposoby. Każdy krok powinien być traktowany jako wskazówka, a nie jako instrukcja krok po kroku. Jeśli masz problemy z migracją, nie wahaj się [skontaktować z nami](https://github.com/webdriverio/codemod/discussions/new).

## Konfiguracja

API Protractora i WebdriverIO jest właściwie bardzo podobne, do tego stopnia, że większość poleceń może być przepisana w sposób zautomatyzowany za pomocą [codemod](https://github.com/webdriverio/codemod).

Aby zainstalować codemod, uruchom:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategia

Istnieje wiele strategii migracji. W zależności od wielkości twojego zespołu, ilości plików testowych i pilności migracji, możesz spróbować przekształcić wszystkie testy naraz lub plik po pliku. Biorąc pod uwagę, że Protractor będzie nadal utrzymywany do wersji Angular 15 (koniec 2022 roku), wciąż masz wystarczająco dużo czasu. Możesz mieć testy Protractora i WebdriverIO działające jednocześnie i zacząć pisać nowe testy w WebdriverIO. W zależności od twojego budżetu czasowego, możesz zacząć migrować najpierw najważniejsze przypadki testowe, a następnie przejść do testów, które możesz nawet usunąć.

## Najpierw plik konfiguracyjny

Po zainstalowaniu codemoda możemy zacząć transformować pierwszy plik. Najpierw zapoznaj się z [opcjami konfiguracyjnymi WebdriverIO](configuration). Pliki konfiguracyjne mogą stać się bardzo złożone i może mieć sens przeniesienie tylko podstawowych części i zobaczenie, jak reszta może zostać dodana, gdy migrowane będą odpowiednie testy, które potrzebują określonych opcji.

Dla pierwszej migracji przekształcamy tylko plik konfiguracyjny i uruchamiamy:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Twoja konfiguracja może być nazwana inaczej, jednak zasada powinna być taka sama: zacznij migrację od konfiguracji.

:::

## Zainstaluj zależności WebdriverIO

Następnym krokiem jest skonfigurowanie minimalnej konfiguracji WebdriverIO, którą zaczniemy budować podczas migracji z jednego frameworka na drugi. Najpierw instalujemy WebdriverIO CLI za pomocą:

```sh
npm install --save-dev @wdio/cli
```

Następnie uruchamiamy kreatora konfiguracji:

```sh
npx wdio config
```

To przeprowadzi Cię przez kilka pytań. W przypadku tego scenariusza migracji:
- wybierz domyślne opcje
- zalecamy, aby nie generować automatycznie przykładowych plików
- wybierz inny folder dla plików WebdriverIO
- i wybierz Mocha zamiast Jasmine.

:::info Dlaczego Mocha?
Nawet jeśli wcześniej używałeś Protractora z Jasmine, Mocha zapewnia lepsze mechanizmy powtarzania testów. Wybór należy do Ciebie!
:::

Po małym kwestionariuszu kreator zainstaluje wszystkie niezbędne pakiety i zapisze je w Twoim `package.json`.

## Migruj plik konfiguracyjny

Po przekształceniu `conf.ts` i utworzeniu nowego `wdio.conf.ts`, nadszedł czas, aby przenieść konfigurację z jednego pliku do drugiego. Upewnij się, że przenosisz tylko kod, który jest niezbędny do uruchomienia wszystkich testów. W naszym przypadku przenosimy funkcje hook i timeout frameworka.

Teraz będziemy kontynuować tylko z naszym plikiem `wdio.conf.ts` i dlatego nie będziemy już potrzebować żadnych zmian w oryginalnej konfiguracji Protractora. Możemy je przywrócić, aby oba frameworki mogły działać obok siebie, a my moglibyśmy przenosić pliki jeden po drugim.

## Migruj plik testowy

Jesteśmy teraz gotowi do przeniesienia pierwszego pliku testowego. Aby zacząć prosto, zacznijmy od takiego, który nie ma wielu zależności od pakietów zewnętrznych czy innych plików, takich jak PageObjects. W naszym przykładzie pierwszym plikiem do migracji jest `first-test.spec.ts`. Najpierw utwórz katalog, w którym nowa konfiguracja WebdriverIO oczekuje swoich plików, a następnie przenieś tam plik:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Teraz przekształćmy ten plik:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

To wszystko! Ten plik jest tak prosty, że nie potrzebujemy już żadnych dodatkowych zmian i możemy bezpośrednio spróbować uruchomić WebdriverIO za pomocą:

```sh
npx wdio run wdio.conf.ts
```

Gratulacje 🥳 właśnie zmigrowano pierwszy plik!

## Następne kroki

Od tego momentu kontynuujesz transformację testu po teście i obiekt stronowy po obiekcie stronowym. Istnieje szansa, że codemod nie powiedzie się dla niektórych plików z błędem takim jak:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Dla niektórych poleceń Protractora po prostu nie ma zamiennika w WebdriverIO. W takim przypadku codemod udzieli ci porady, jak to refaktoryzować. Jeśli zbyt często napotykasz takie komunikaty o błędach, śmiało [zgłoś problem](https://github.com/webdriverio/codemod/issues/new) i poproś o dodanie określonej transformacji. Chociaż codemod już transformuje większość API Protractora, nadal jest dużo miejsca na ulepszenia.

## Podsumowanie

Mamy nadzieję, że ten tutorial pomoże ci trochę w procesie migracji do WebdriverIO. Społeczność nadal ulepsza codemod, testując go z różnymi zespołami w różnych organizacjach. Nie wahaj się [zgłosić problemu](https://github.com/webdriverio/codemod/issues/new), jeśli masz informacje zwrotne lub [rozpocznij dyskusję](https://github.com/webdriverio/codemod/discussions/new), jeśli masz trudności podczas procesu migracji.