---
id: v7-migration
title: Z v6 do v7
---

Ten poradnik jest dla osób, które nadal używają `v6` WebdriverIO i chcą przejść na `v7`. Jak wspomniano w naszym [wpisie na blogu o wydaniu](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), zmiany są głównie pod maską, a aktualizacja powinna być prostym procesem.

:::info

Jeśli używasz WebdriverIO `v5` lub starszej wersji, najpierw zaktualizuj do `v6`. Zapoznaj się z naszym [przewodnikiem migracji do v6](v6-migration).

:::

Chociaż chcielibyśmy mieć w pełni zautomatyzowany proces, rzeczywistość wygląda inaczej. Każdy ma inną konfigurację. Każdy krok powinien być traktowany jako wskazówka, a nie jako szczegółowa instrukcja. Jeśli masz problemy z migracją, nie wahaj się [skontaktować z nami](https://github.com/webdriverio/codemod/discussions/new).

## Konfiguracja

Podobnie jak w przypadku innych migracji, możemy użyć [codemod](https://github.com/webdriverio/codemod) WebdriverIO. W tym poradniku używamy [projektu boilerplate](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) przesłanego przez członka społeczności i całkowicie migrujemy go z `v6` do `v7`.

Aby zainstalować codemod, uruchom:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commity:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Aktualizacja zależności WebdriverIO

Biorąc pod uwagę, że wszystkie wersje WebdriverIO są ze sobą ściśle powiązane, najlepiej zawsze aktualizować do konkretnego taga, np. `latest`. W tym celu kopiujemy wszystkie zależności związane z WebdriverIO z naszego `package.json` i ponownie je instalujemy za pomocą:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Zazwyczaj zależności WebdriverIO są częścią zależności deweloperskich, ale w zależności od projektu może to się różnić. Po tej operacji twój `package.json` i `package-lock.json` powinny zostać zaktualizowane. __Uwaga:__ to są zależności używane przez [przykładowy projekt](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), twoje mogą się różnić.

#### Commity:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Transformacja pliku konfiguracyjnego

Dobrym pierwszym krokiem jest rozpoczęcie od pliku konfiguracyjnego. W WebdriverIO `v7` nie wymagamy już ręcznego rejestrowania żadnych kompilatorów. W rzeczywistości muszą one zostać usunięte. Można to zrobić automatycznie za pomocą codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Codemod nie obsługuje jeszcze projektów TypeScript. Zobacz [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Pracujemy nad wprowadzeniem wsparcia dla niego wkrótce. Jeśli używasz TypeScript, zapraszamy do współpracy!

:::

#### Commity:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Aktualizacja definicji kroków

Jeśli używasz Jasmine lub Mocha, to już koniec. Ostatnim krokiem jest aktualizacja importów Cucumber.js z `cucumber` na `@cucumber/cucumber`. Można to również zrobić automatycznie za pomocą codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

To wszystko! Nie ma więcej potrzebnych zmian 🎉

#### Commity:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Podsumowanie

Mamy nadzieję, że ten poradnik pomoże ci nieco w procesie migracji do WebdriverIO `v7`. Społeczność nadal ulepsza codemod, testując go z różnymi zespołami w różnych organizacjach. Nie wahaj się [zgłosić problemu](https://github.com/webdriverio/codemod/issues/new), jeśli masz uwagi lub [rozpocząć dyskusję](https://github.com/webdriverio/codemod/discussions/new), jeśli napotkasz trudności podczas procesu migracji.